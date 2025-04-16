// ULTRA-MINIMAL REPLIT DEPLOYMENT SERVER
// This server does ONE thing - respond to health checks with "OK"
const http = require('http');

// Get port from environment variable
const PORT = process.env.PORT || 3000;

// Create server
const server = http.createServer((req, res) => {
  // Log all requests
  console.log(`${new Date().toISOString()}: ${req.method} ${req.url}`);
  
  // Respond with OK to all requests
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('OK');
});

// Start server
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});