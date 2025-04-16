// This is a simple script to test if health checks are working
// Directly returns "OK" without any other logic

const http = require('http');
const PORT = 5000;

console.log('Starting server to test health checks...');

const server = http.createServer((req, res) => {
  console.log(`${new Date().toISOString()}: ${req.method} ${req.url}`);
  
  // Always return OK for the root path
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('OK');
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running at http://0.0.0.0:${PORT}/`);
  console.log('Test with: curl -H "User-Agent: Replit-Healthcheck-v1" http://localhost:5000/');
});