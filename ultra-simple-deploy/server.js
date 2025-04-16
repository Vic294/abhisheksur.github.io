// ULTRA MINIMAL SERVER FOR REPLIT DEPLOYMENT
// This does ONLY one thing - respond with "OK" to health checks
// This is the absolute minimum required for a successful Replit deployment

const http = require('http');
const PORT = process.env.PORT || 5000;

http.createServer((req, res) => {
  console.log(`${new Date().toISOString()}: ${req.method} ${req.url}`);
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('OK');
}).listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});