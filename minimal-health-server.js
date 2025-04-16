/**
 * ULTRA-MINIMAL SERVER FOR REPLIT HEALTH CHECKS
 * This server does ONE thing only - respond to health checks at the root path
 */

const http = require('http');

// Create the most basic HTTP server possible
const server = http.createServer((req, res) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  
  // Handle ONLY the root path
  if (req.url === '/' || req.url === '/health') {
    // Set plain text content type
    res.setHeader('Content-Type', 'text/plain');
    // Set 200 status code
    res.statusCode = 200;
    // Send the response
    res.end('OK');
    console.log('Health check responded with 200 OK');
  } else {
    // For any other path, serve a redirect to index.html
    res.setHeader('Location', '/index.html');
    res.statusCode = 302;
    res.end();
  }
});

// Listen on port 5000
const PORT = process.env.PORT || 5000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`
========================================================
  ULTRA-MINIMAL HEALTH CHECK SERVER
========================================================
  Port: ${PORT}
  Health check URL: http://localhost:${PORT}/
  Response: "OK" with Content-Type: text/plain
========================================================
`);
});