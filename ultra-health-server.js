// ULTRA-MINIMALISTIC HEALTH CHECK SERVER
// This server is designed to do ONE thing perfectly: pass Replit's health checks

const http = require('http');

// Get port number from environment or use default
const PORT = process.env.PORT || 3000;

// Create a server that ONLY handles health checks
const server = http.createServer((req, res) => {
  // Log all requests for debugging
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  
  // Remove any query parameters from URL
  const path = req.url.split('?')[0];
  
  // We ONLY care about the root path
  if (path === '/' || path === '') {
    // Set the proper Content-Type header
    res.writeHead(200, {'Content-Type': 'text/plain'});
    
    // Send exactly "OK" as the response
    res.end('OK');
  } else {
    // For any other path, just return a generic response
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Abhishek Sur Portfolio');
  }
});

// Listen on all network interfaces (important for Replit)
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Health check server running on port ${PORT}`);
  console.log(`Server address: http://0.0.0.0:${PORT}/`);
  console.log('Ready for Replit deployment...');
  
  // Explicitly log the health check URL
  console.log(`Health check URL: http://0.0.0.0:${PORT}/`);
});