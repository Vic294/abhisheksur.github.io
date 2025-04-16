// MINIMAL REPLIT DEPLOYMENT SERVER
// Designed specifically to pass Replit health checks

const http = require('http');
const PORT = process.env.PORT || 5000;

// Create the simplest possible server
http.createServer((req, res) => {
  // Root path handler (for health checks)
  if (req.url === '/' || req.url.startsWith('/?')) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('OK');
  } else {
    // All other paths
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Abhishek Sur Portfolio');
  }
}).listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}/`);
});
