// REPLIT DEPLOYMENT HEALTH CHECK SERVER
// This is an absolutely minimal server to pass Replit's health checks
const http = require('http');

// Use the PORT environment variable provided by Replit
const PORT = process.env.PORT || 3000;

// Create a server that responds with "OK" to all requests
const server = http.createServer((req, res) => {
  console.log(`${new Date().toISOString()}: ${req.method} ${req.url}`);
  
  // Always return 200 OK with text/plain Content-Type
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('OK');
});

// Start the server
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Health check server running on port ${PORT}`);
  console.log(`Server will respond with "OK" to all requests`);
});