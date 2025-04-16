// ULTRA-MINIMAL REPLIT DEPLOYMENT SERVER - FIXED FOR PORT 5000
// This server does ONE thing - respond to health checks with "OK"
const http = require('http');

// IMPORTANT: Replit expects exactly port 5000 for deployments
const PORT = 5000;

// Create server
const server = http.createServer((req, res) => {
  // Log all requests with timestamp for debugging
  console.log(`${new Date().toISOString()}: ${req.method} ${req.url}`);
  
  // Important: The health check MUST be at the root path
  if (req.url === '/' || req.url === '') {
    // Replit expects exactly 'OK' with Content-Type: text/plain
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('OK');
    return;
  }
  
  // Handle any other path
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Abhishek Sur - Portfolio Website');
});

// Start server - MUST bind to 0.0.0.0 and PORT 5000
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Health check server is ready for Replit deployment');
  console.log('Will respond with "OK" to root path (/) requests');
});