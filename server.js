import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { readFile } from 'fs/promises';
import sirv from 'sirv';
import compression from 'compression';
import { formatDistanceToNow } from 'date-fns';

const __dirname = dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 3000;
const base = process.env.BASE || '/';

// Create express app
const app = express();

// Add compression
app.use(compression());

// Serve static files
app.use(base, sirv('dist/client', { dev: !isProduction }));

// Initialize metrics storage
const responseMetrics = [];
const MAX_METRICS = 25;
const MAX_AGE = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Store new metric
app.post('/api/metrics', express.json(), (req, res) => {
  const now = Date.now();
  console.log('📥 Received new metric:', req.body);
  
  // Clean old metrics
  const validTime = now - MAX_AGE;
  while (responseMetrics.length > 0 && responseMetrics[0].timestamp < validTime) {
    responseMetrics.shift();
  }
  
  // Add new metric
  responseMetrics.push({
    timestamp: now,
    responseTime: req.body.responseTime,
    timeAgo: 'just now'
  });
  
  // Keep only last 25 entries
  if (responseMetrics.length > MAX_METRICS) {
    responseMetrics.shift();
  }
  
  console.log('📊 Current metrics count:', responseMetrics.length);
  res.json({ success: true });
});

// Get metrics
app.get('/api/metrics', (req, res) => {
  const now = Date.now();
  const metrics = responseMetrics
    .filter(m => (now - m.timestamp) <= MAX_AGE)
    .map(m => ({
      ...m,
      timeAgo: formatDistanceToNow(m.timestamp, { addSuffix: true })
    }));
  
  console.log('📤 Sending metrics to client:', metrics.length);
  res.json(metrics);
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

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
