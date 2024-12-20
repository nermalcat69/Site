import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import sirv from 'sirv';
import compression from 'compression';
import { formatDistanceToNow } from 'date-fns';
import { createClient } from 'redis';

const __dirname = dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 3000;
const base = process.env.BASE || '/';

const redis = createClient({
  url: process.env.REDIS_URL
});

redis.on('error', err => console.error('Redis Client Error', err));
await redis.connect();

console.log('📌 Connected to Redis');

const app = express();

// Add compression
app.use(compression());

// Serve static files
app.use(base, sirv('dist/client', { dev: !isProduction }));

const MAX_METRICS = 30;
const MAX_AGE = 24 * 60 * 60;
const METRIC_INTERVAL = 30000; // 30 seconds

// Add a function to measure server health
async function measureServerHealth() {
  const start = process.hrtime.bigint();
  
  try {
    const end = process.hrtime.bigint();
    const responseTime = Number(end - start) / 1_000_000;
    
    const now = Date.now();
    const metric = {
      timestamp: now,
      responseTime: Math.round(responseTime),
      timeAgo: 'just now',
      url: 'server-health'
    };
    
    await redis.zAdd('response_metrics', {
      score: now,
      value: JSON.stringify(metric)
    });

    // Maintain only the latest metrics
    const count = await redis.zCard('response_metrics');
    if (count > MAX_METRICS) {
      await redis.zRemRangeByRank('response_metrics', 0, count - MAX_METRICS - 1);
    }

    const oldestAllowed = now - (MAX_AGE * 1000);
    await redis.zRemRangeByScore('response_metrics', '-inf', oldestAllowed);

    console.log('📊 Auto-measured server response time:', Math.round(responseTime) + 'ms');
  } catch (error) {
    console.error('❌ Error in auto-measurement:', error);
  }
}

// Get metrics endpoint
app.get('/api/metrics', async (req, res) => {
  try {
    const now = Date.now();
    const oldestAllowed = now - (MAX_AGE * 1000);

    const rawMetrics = await redis.zRangeByScore(
      'response_metrics',
      oldestAllowed,
      '+inf',
      {
        REV: true
      }
    );

    const metrics = rawMetrics.map(raw => {
      const metric = JSON.parse(raw);
      return {
        ...metric,
        timeAgo: formatDistanceToNow(metric.timestamp, { addSuffix: true })
      };
    });
    
    res.json(metrics.slice(0, MAX_METRICS));
  } catch (error) {
    console.error('❌ Error fetching metrics:', error);
    res.status(500).json({ error: 'Failed to fetch metrics' });
  }
});

// Serve static files in production
if (isProduction) {
  app.use('*', (req, res) => {
    res.sendFile(resolve(__dirname, 'dist/client/index.html'));
  });
}

// Start the automatic measurements when the server starts
let measurementInterval;
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
  measureServerHealth(); // Initial measurement
  measurementInterval = setInterval(measureServerHealth, METRIC_INTERVAL);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  if (measurementInterval) {
    clearInterval(measurementInterval);
  }
  await redis.quit();
  process.exit(0);
});
