// ULTRA-SIMPLE SERVER FOR REPLIT DEPLOYMENT
// This is the most minimal server possible that will pass Replit's health checks

const http = require('http');

// Get port from environment or use 3000
const PORT = process.env.PORT || 3000;

// Create the simplest possible server
const server = http.createServer((req, res) => {
  // Log request for debugging
  console.log(`Request: ${req.method} ${req.url}`);
  
  // Check if this is a root path request
  if (req.url === '/' || req.url.startsWith('/?')) {
    // Set the exact content-type header required by Replit
    res.writeHead(200, {'Content-Type': 'text/plain'});
    
    // Send the exact response required for health checks
    res.end('OK');
  } else {
    // For any other route, just return something
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Abhishek Sur Portfolio');
  }
});

// Start server on the specified port AND bind to all network interfaces
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}/`);
  console.log(`Root health check URL: http://0.0.0.0:${PORT}/`);
});