// BARE MINIMUM HEALTH CHECK SERVER
// This is the absolute minimum code needed to pass Replit health checks

const http = require('http');
const PORT = process.env.PORT || 5000;

http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('OK');
}).listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
});