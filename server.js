import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { readFile } from 'fs/promises';
import sirv from 'sirv';
import compression from 'compression';
import { formatDistanceToNow } from 'date-fns';
import { createClient } from 'redis';
import { WebSocketServer } from 'ws';
import { createServer } from 'http';

const __dirname = dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 3000;
const base = process.env.BASE || '/';

// Create Redis client
const redis = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redis.on('error', err => console.error('Redis Client Error', err));
await redis.connect();

console.log('📌 Connected to Redis');

// Create express app
const app = express();

// Add compression
app.use(compression());

// Serve static files
app.use(base, sirv('dist/client', { dev: !isProduction }));

const MAX_METRICS = 35;
const MAX_AGE = 2 * 60 * 60; // 2 hours in seconds

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Store new metric
app.post('/api/metrics', express.json(), async (req, res) => {
  try {
    const now = Date.now();
    console.log('📥 Received new metric:', req.body);
    
    const metric = {
      timestamp: now,
      responseTime: req.body.responseTime,
      timeAgo: 'just now',
      sessionId: req.body.sessionId
    };

    // Store in Redis with expiration
    await redis.zAdd('response_metrics', {
      score: now,
      value: JSON.stringify(metric)
    });

    // Trim to keep only latest 25 entries
    const count = await redis.zCard('response_metrics');
    if (count > MAX_METRICS) {
      await redis.zRemRangeByRank('response_metrics', 0, count - MAX_METRICS - 1);
    }

    // Remove entries older than 2 hours
    const oldestAllowed = now - (MAX_AGE * 1000);
    await redis.zRemRangeByScore('response_metrics', '-inf', oldestAllowed);
    
    console.log('📊 Metric stored in Redis');
    res.json({ success: true });
  } catch (error) {
    console.error('❌ Error storing metric:', error);
    res.status(500).json({ error: 'Failed to store metric' });
  }
});

// Get metrics
app.get('/api/metrics', async (req, res) => {
  try {
    const now = Date.now();
    const oldestAllowed = now - (MAX_AGE * 1000);

    // Get all valid metrics
    const rawMetrics = await redis.zRangeByScore(
      'response_metrics',
      oldestAllowed,
      '+inf'
    );

    const metrics = rawMetrics.map(raw => {
      const metric = JSON.parse(raw);
      return {
        ...metric,
        timeAgo: formatDistanceToNow(metric.timestamp, { addSuffix: true })
      };
    });
    
    console.log('📤 Sending metrics to client:', metrics.length);
    res.json(metrics);
  } catch (error) {
    console.error('❌ Error fetching metrics:', error);
    res.status(500).json({ error: 'Failed to fetch metrics' });
  }
});

// Serve HTML
app.use('*', async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, '');

    let template;
    let render;
    if (!isProduction) {
      // Always read fresh template in development
      template = await readFile('./index.html', 'utf-8');
      template = await vite.transformIndexHtml(url, template);
      render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render;
    } else {
      template = templateHtml;
      render = (await import('./dist/server/entry-server.js')).render;
    }

    const rendered = await render(url, ssrManifest);

    const html = template
      .replace(`<!--app-head-->`, rendered.head ?? '')
      .replace(`<!--app-html-->`, rendered.html ?? '');

    res.status(200).set({ 'Content-Type': 'text/html' }).send(html);
  } catch (e) {
    vite?.ssrFixStacktrace(e);
    console.log(e.stack);
    res.status(500).end(e.stack);
  }
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  await redis.quit();
  process.exit(0);
});

const server = createServer(app);
const wss = new WebSocketServer({ server });

// Handle WebSocket connections
wss.on('connection', (ws) => {
  console.log('🔌 New WebSocket client connected');
  
  ws.on('close', () => {
    console.log('🔌 Client disconnected');
  });
});

// Broadcast metrics to all connected clients
function broadcastMetrics(metric) {
  wss.clients.forEach(client => {
    client.send(JSON.stringify({
      type: 'new_metric',
      data: metric
    }));
  });
}

// Modify the POST metrics endpoint
app.post('/api/metrics', express.json(), async (req, res) => {
  try {
    const now = Date.now();
    const metric = {
      timestamp: now,
      responseTime: req.body.responseTime,
      timeAgo: 'just now'
    };

    // Store in Redis
    await redis.zAdd('response_metrics', {
      score: now,
      value: JSON.stringify(metric)
    });
    
    // Broadcast to all clients
    broadcastMetrics(metric);
    
    // ... rest of the code ...
  } catch (error) {
    console.error('❌ Error storing metric:', error);
    res.status(500).json({ error: 'Failed to store metric' });
  }
});

// Use server.listen instead of app.listen
server.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
