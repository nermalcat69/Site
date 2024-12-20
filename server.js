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

const USER_METRICS_KEY = 'user_latency_metrics';
const MAX_USER_METRICS = 30;

// Simple health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Start the server and monitoring
app.listen(port, async () => {
  console.log(`Server started at http://localhost:${port}`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  await redis.quit();
  process.exit(0);
});

app.post('/api/user-latency', async (req, res) => {
  try {
    const { responseTime } = req.body;
    const now = Date.now();
    
    const metric = {
      timestamp: now,
      responseTime: Math.round(responseTime),
      timeAgo: 'just now'
    };

    // Store in Redis
    await redis.zAdd(USER_METRICS_KEY, {
      score: now,
      value: JSON.stringify(metric)
    });

    // Cleanup old metrics
    const count = await redis.zCard(USER_METRICS_KEY);
    if (count > MAX_USER_METRICS) {
      await redis.zRemRangeByRank(USER_METRICS_KEY, 0, count - MAX_USER_METRICS - 1);
    }

    res.json({ success: true });
  } catch (error) {
    console.error('❌ Error storing user latency:', error);
    res.status(500).json({ error: 'Failed to store latency' });
  }
});

app.get('/api/user-latency', async (req, res) => {
  try {
    const rawMetrics = await redis.zRange(USER_METRICS_KEY, 0, -1, { REV: true });
    
    const metrics = rawMetrics.map(raw => {
      const metric = JSON.parse(raw);
      return {
        ...metric,
        timeAgo: formatDistanceToNow(metric.timestamp, { addSuffix: true })
      };
    });
    
    res.json(metrics);
  } catch (error) {
    console.error('❌ Error fetching user latency metrics:', error);
    res.status(500).json({ error: 'Failed to fetch metrics' });
  }
});
