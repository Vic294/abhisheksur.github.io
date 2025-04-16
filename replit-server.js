// REPLIT DEPLOYMENT SERVER WITH HEALTH CHECK
// This server responds with "OK" to the root path for health checks
// and serves the static website files for all other paths

const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

// Log all requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()}: ${req.method} ${req.url}`);
  next();
});

// IMPORTANT: Health check endpoint at root path
// This must return "OK" with Content-Type: text/plain for Replit deployment
app.get('/', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send('OK');
});

// Serve static files
app.use(express.static(__dirname));

// Fallback for HTML files
app.get('*.html', (req, res) => {
  const htmlFile = path.join(__dirname, req.path);
  res.sendFile(htmlFile, { root: '.' });
});

// Default fallback
app.use((req, res) => {
  res.sendFile('index.html', { root: '.' });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}/`);
  console.log('Health check configured at root path "/"');
});