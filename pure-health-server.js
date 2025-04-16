// PURE HEALTH CHECK SERVER
// This server ONLY handles the root path health check
// exactly as required by Replit

const http = require('http');
const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  
  // ONLY handle root path exactly as required
  if (req.url === '/' || req.url === '/?') {
    console.log('Responding to health check with OK');
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('OK');
  } else {
    // For any other path, still return OK to be safe
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('OK');
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Pure health check server running at http://0.0.0.0:${PORT}/`);
  console.log(`Listening for health checks on port ${PORT}`);
});