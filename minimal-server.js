// MINIMAL SERVER FOR REPLIT DEPLOYMENT
// Only handles health checks - nothing else
const http = require('http');
const PORT = process.env.PORT || 5000;

console.log('Starting minimal health check server...');

http.createServer((req, res) => {
  // Log request
  console.log(`${new Date().toISOString()}: ${req.method} ${req.url}`);
  
  // ALWAYS return "OK" with text/plain content type
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('OK');
}).listen(PORT, '0.0.0.0', () => {
  console.log(`Minimal server running on port ${PORT}`);
});