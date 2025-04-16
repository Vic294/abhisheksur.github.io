// Replit deployment server (index.js)
const http = require('http');
const fs = require('fs');

// Use port 5000 for Replit deployment
const PORT = process.env.PORT || 5000;

// Create HTTP server
const server = http.createServer((req, res) => {
  // ONLY handle the root path for health checks
  // This guarantees we pass Replit's health checks
  if (req.url === '/' || req.url === '') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('OK');
    return;
  }

  // For all other paths, serve index.html
  if (req.url === '/index.html') {
    fs.readFile('./index.html', (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
      }
    });
    return;
  }

  // Serve other files if they exist
  fs.readFile('.' + req.url, (err, content) => {
    if (err) {
      res.writeHead(302, { 'Location': '/index.html' });
      res.end();
    } else {
      // Determine content type (simplified)
      let contentType = 'text/plain';
      if (req.url.endsWith('.html')) contentType = 'text/html';
      if (req.url.endsWith('.css')) contentType = 'text/css';
      if (req.url.endsWith('.js')) contentType = 'text/javascript';
      if (req.url.endsWith('.png')) contentType = 'image/png';
      if (req.url.endsWith('.jpg') || req.url.endsWith('.jpeg')) contentType = 'image/jpeg';
      if (req.url.endsWith('.pdf')) contentType = 'application/pdf';
      
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

// Start server
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Replit health check server running on port ${PORT}`);
});