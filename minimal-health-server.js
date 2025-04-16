// ABSOLUTE MINIMAL SERVER FOR REPLIT HEALTH CHECKS
// This server does ONLY one thing - respond with 'OK' to root path requests
const http = require('http');

// Get port from environment or use 5000
const PORT = process.env.PORT || 5000;

// Create server
http.createServer((req, res) => {
  // Log for debugging
  console.log(`REQUEST: ${req.method} ${req.url}`);
  
  // Only handle GET requests to root path
  if (req.method === 'GET' && (req.url === '/' || req.url === '')) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('OK');
  } else {
    // For any other request
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Not root path');
  }
}).listen(PORT, '0.0.0.0', () => {
  console.log(`Health check server running at http://0.0.0.0:${PORT}/`);
});