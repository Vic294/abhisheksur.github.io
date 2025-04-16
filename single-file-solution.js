// SINGLE FILE HEALTH CHECK SERVER FOR REPLIT
// COPY THIS ENTIRE FILE TO YOUR REPLIT PROJECT
// USE THE RUN COMMAND: node single-file-solution.js

const http = require('http');
const PORT = process.env.PORT || 5000;

console.log('=== REPLIT HEALTH CHECK SERVER ===');
console.log(`PORT: ${PORT}`);
console.log('This server responds with "OK" to all requests');
console.log('===================================');

http.createServer((req, res) => {
  console.log(`Request: ${req.method} ${req.url}`);
  
  // Always respond with OK and text/plain
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('OK');
}).listen(PORT, '0.0.0.0', () => {
  console.log(`Server started at http://0.0.0.0:${PORT}/`);
});