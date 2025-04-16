// BARE MINIMUM SERVER FOR REPLIT DEPLOYMENT
// This is the absolute simplest server possible that will pass Replit's health checks
const http = require('http');

// Get port from environment or fallback to 5000
const PORT = process.env.PORT || 5000;

// Create server
const server = http.createServer((req, res) => {
  // Log request for debugging
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  
  // Explicitly check root path for health check
  if (req.url === '/' || req.url === '') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('OK');
    return;
  }
  
  // For any other path, return a different response
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Abhishek Sur Portfolio - Page Loading');
});

// Start server with explicit host binding
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Server address: http://0.0.0.0:${PORT}`);
  console.log('Health check server is active');
});