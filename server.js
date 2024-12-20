import { readFile } from 'node:fs/promises';
import express from 'express';
import { formatDistanceToNow } from 'date-fns';

// Constants
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 3000;
const base = process.env.BASE || '/';

// Cached production assets
const templateHtml = isProduction
  ? await readFile('./dist/client/index.html', 'utf-8')
  : '';
const ssrManifest = isProduction
  ? await readFile('./dist/client/.vite/ssr-manifest.json', 'utf-8')
  : undefined;

// Create http server
const app = express();

// Add these imports at the top
import { formatDistanceToNow } from 'date-fns';

// Add this before your existing routes
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

// Add Vite or respective production middlewares
let vite;
if (!isProduction) {
  const { createServer } = await import('vite');
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base
  });
  app.use(vite.middlewares);
} else {
  const compression = (await import('compression')).default;
  const sirv = (await import('sirv')).default;

  // Disable caching for all files
  app.use(base, sirv('./dist/client', {
    extensions: [],
    setHeaders: (res, path) => {
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
    }
  }));
}

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
