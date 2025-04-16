// BARE MINIMUM SERVER FOR REPLIT DEPLOYMENT
// This is the absolute simplest server possible that will pass Replit's health checks
const http = require('http');

// Create server
http.createServer((req, res) => {
  // Log request for debugging
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  
  // No routing logic - always return the same response
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('OK');
}).listen(process.env.PORT || 5000, '0.0.0.0', () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
  console.log('Health check server is active');
});