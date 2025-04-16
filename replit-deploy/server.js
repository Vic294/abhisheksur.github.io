// Ultra simple server for Replit deployment
const http = require('http');
const fs = require('fs');
const path = require('path');

// Define port (default to 5000 for Replit deployment)
const PORT = process.env.PORT || 5000;

// Simple MIME type lookup
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
};

// Create HTTP server
const server = http.createServer((req, res) => {
  // Log all requests
  console.log(`${new Date().toISOString()}: ${req.method} ${req.url}`);

  // ALWAYS respond with "OK" for the root path - NO EXCEPTIONS
  if (req.url === '/' || req.url === '') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('OK');
    return;
  }

  // For all other paths, try to serve files
  let filePath = '.' + req.url;
  
  // If request ends with '/', serve index.html
  if (filePath.endsWith('/')) {
    filePath += 'index.html';
  }

  // Get file extension and content type
  const extname = path.extname(filePath);
  const contentType = MIME_TYPES[extname] || 'application/octet-stream';

  // Read file and serve it
  fs.readFile(filePath, (error, content) => {
    if (error) {
      // If file not found, try serving index.html
      if (error.code === 'ENOENT') {
        fs.readFile('./index.html', (err, indexContent) => {
          if (err) {
            res.writeHead(404);
            res.end('Not Found');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(indexContent);
          }
        });
      } else {
        // Server error
        res.writeHead(500);
        res.end('Internal Server Error');
      }
    } else {
      // Success - serve the file
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

// Start server
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check endpoint: http://0.0.0.0:${PORT}/`);
});