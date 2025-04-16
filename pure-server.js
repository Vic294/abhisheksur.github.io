// ABSOLUTE PURE SERVER
// Only handles health checks with no extras
const http = require('http');

// Constants
const PORT = process.env.PORT || 5000;

// Create the simplest possible server
const server = http.createServer((req, res) => {
  // Only interested in the root path
  if (req.url === '/' || req.url === '') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('OK');
    return;
  }
  
  // Any other path
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Not found');
});

// Start server - listen on all interfaces
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Health check handler active');
});