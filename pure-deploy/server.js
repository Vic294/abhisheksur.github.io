// PURE HEALTH CHECK SERVER
// This server ONLY handles health checks at the root path

const http = require('http');
const PORT = process.env.PORT || 5000;

// Create server with minimal functionality
const server = http.createServer((req, res) => {
  // Always return "OK" with Content-Type: text/plain
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('OK');
});

// Listen on all interfaces (0.0.0.0) as required by Replit
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Health check server running on port ${PORT}`);
});
