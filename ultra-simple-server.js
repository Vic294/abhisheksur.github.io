const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Detailed logging for debugging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log('Headers:', JSON.stringify(req.headers, null, 2));
  next();
});

// ONLY handle the root path for Replit health checks
// This is the simplest possible implementation
app.get('/', (req, res) => {
  console.log('ROOT PATH HIT');
  // Simply return 200 OK with text/plain
  res.status(200)
     .set('Content-Type', 'text/plain')
     .send('OK');
});

// Add an extra handler for health check paths
app.get('/health', (req, res) => {
  console.log('HEALTH PATH HIT');
  res.status(200)
     .set('Content-Type', 'text/plain')
     .send('OK');
});

// All other routes handled after health checks
app.use(express.static(__dirname));

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Ultra-simple server running on port ${PORT}`);
  console.log(`Root path (health check): http://0.0.0.0:${PORT}/`);
});