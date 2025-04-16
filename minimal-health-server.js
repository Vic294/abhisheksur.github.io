/**
 * ULTRA-MINIMAL SERVER FOR REPLIT HEALTH CHECKS
 * This server does ONE thing only - respond to health checks at the root path
 */

const http = require('http');
const PORT = process.env.PORT || 5000;

// Create HTTP server
const server = http.createServer((req, res) => {
  // Only respond to the root path
  if (req.url === '/' || req.url === '') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('OK');
  } else {
    res.writeHead(404);
    res.end();
  }
});

// Start server
server.listen(PORT, () => {
  console.log(`Health check server running at http://0.0.0.0:${PORT}/`);
});