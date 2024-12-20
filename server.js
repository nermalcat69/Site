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

// Add a function to measure server health with actual HTTP request
async function measureServerHealth() {
  const start = process.hrtime.bigint();
  
  try {
    // Make an actual HTTP request to self to measure real response time
    const healthCheck = await fetch(`http://localhost:${port}/health`);
    const end = process.hrtime.bigint();
    const responseTime = Number(end - start) / 1_000_000;
    
    const now = Date.now();
    const metric = {
      timestamp: now,
      responseTime: Math.round(responseTime),
      timeAgo: 'just now'
    };
    
    // Store in Redis
    await redis.zAdd('server_metrics', {
      score: now,
      value: JSON.stringify(metric)
    });

    // Cleanup old metrics
    const count = await redis.zCard('server_metrics');
    if (count > MAX_METRICS) {
      await redis.zRemRangeByRank('server_metrics', 0, count - MAX_METRICS - 1);
    }

    const oldestAllowed = now - (MAX_AGE * 1000);
    await redis.zRemRangeByScore('server_metrics', '-inf', oldestAllowed);

    console.log('📊 Server health measured:', Math.round(responseTime) + 'ms');
  } catch (error) {
    console.error('❌ Error measuring server health:', error);
  }
}

// Simple health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Get metrics endpoint
app.get('/api/metrics', async (req, res) => {
  try {
    const now = Date.now();
    const oldestAllowed = now - (MAX_AGE * 1000);

    const rawMetrics = await redis.zRangeByScore(
      'server_metrics',
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

// Initialize server monitoring
let measurementInterval;

async function startMonitoring() {
  try {
    // Check if we already have a monitoring process running
    const isRunning = await redis.get('monitoring_active');
    
    if (!isRunning) {
      await redis.set('monitoring_active', 'true', {
        EX: 60 // Expire after 60 seconds if server crashes
      });
      
      console.log('🚀 Starting server monitoring');
      await measureServerHealth(); // Initial measurement
      measurementInterval = setInterval(measureServerHealth, METRIC_INTERVAL);
    }
  } catch (error) {
    console.error('Error starting monitoring:', error);
  }
}

// Refresh monitoring active status
async function keepMonitoringAlive() {
  try {
    await redis.set('monitoring_active', 'true', {
      EX: 60
    });
  } catch (error) {
    console.error('Error refreshing monitoring status:', error);
  }
}

// Start the server and monitoring
app.listen(port, async () => {
  console.log(`Server started at http://localhost:${port}`);
  await startMonitoring();
  
  // Keep monitoring status alive
  setInterval(keepMonitoringAlive, 30000);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  if (measurementInterval) {
    clearInterval(measurementInterval);
  }
  await redis.del('monitoring_active');
  await redis.quit();
  process.exit(0);
});
