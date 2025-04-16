/**
 * REPLIT DEPLOYMENT SERVER
 * This server properly handles health checks while also serving static content
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

// MIME types mapping
const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
};

// Create server
const server = http.createServer((req, res) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  
  // Special case: Root path for health check
  if (req.url === '/' || req.url === '') {
    // Return plain text "OK" for Replit health check
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('OK');
    return;
  }
  
  // For other routes, serve static files
  let filePath = '.' + req.url;
  
  // If URL doesn't specify a file, default to index.html
  if (filePath.endsWith('/')) {
    filePath += 'index.html';
  }
  
  // Get file extension
  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = mimeTypes[extname] || 'application/octet-stream';
  
  // Read and serve the file
  fs.readFile(filePath, (error, content) => {
    if (error) {
      // If the file doesn't exist, try serving index.html
      if (error.code === 'ENOENT') {
        fs.readFile('./index.html', (err, content) => {
          if (err) {
            res.writeHead(404);
            res.end('404 - File Not Found');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
          }
        });
      } else {
        // Server error
        res.writeHead(500);
        res.end('500 - Internal Server Error');
      }
    } else {
      // Success - serve the file
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

// Get port from environment variable or use 5000 as fallback
const PORT = process.env.PORT || 5000;

// Start server
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Serving static files with health check support');
});