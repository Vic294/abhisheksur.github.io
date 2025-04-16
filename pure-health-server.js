// ULTRA MINIMAL - PURE HEALTH CHECK SERVER
// This only responds to health checks and redirects everything else to index.html
const http = require('http');
const fs = require('fs');

// Port for Replit deployment
const PORT = process.env.PORT || 5000;

// Create server
const server = http.createServer((req, res) => {
  // Log every request
  console.log(`${new Date().toISOString()}: ${req.method} ${req.url}`);
  
  // ROOT PATH: ALWAYS return "OK" - this is critical for deployment
  if (req.url === '/' || req.url === '') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('OK');
    return;
  }
  
  // Everything else gets index.html
  fs.readFile('./index.html', (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end('Server Error');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(content);
    }
  });
});

// Start server
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Health check server running on port ${PORT}`);
});