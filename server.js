/**
 * REPLIT DEPLOYMENT-READY SERVER
 * 
 * This server is designed to work with Replit's deployment requirements:
 * 1. Returns "OK" at the root path for health checks
 * 2. Serves static files from the current directory
 * 3. Handles both development (port 3000) and production (port 5000) environments
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

// Define the port: use environment PORT or default to 3000
const PORT = process.env.PORT || 3000;

// MIME type mapping
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
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
};

// Create HTTP server
const server = http.createServer((req, res) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  
  // Handle root path for health checks
  // Special case for Replit health checks - they expect a plain text "OK" response
  if ((req.url === '/' || req.url === '') && req.headers['user-agent'] && req.headers['user-agent'].includes('Replit')) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('OK');
    return;
  }
  
  // For normal visitors to the root path, serve the index.html file
  if (req.url === '/' || req.url === '') {
    fs.readFile('./index.html', (error, content) => {
      if (error) {
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end('Error loading index.html');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content, 'utf-8');
      }
    });
    return;
  }
  
  // Redirect /index.html requests to / for cleaner URLs
  if (req.url === '/index.html') {
    res.writeHead(302, { 'Location': '/' });
    res.end();
    return;
  }
  
  // Determine file path
  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './index.html';
  }
  
  // Get file extension to determine content type
  const extname = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[extname] || 'application/octet-stream';
  
  // Read and serve the file
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        // File not found, try to serve index.html
        fs.readFile('./index.html', (err, indexContent) => {
          if (err) {
            // Cannot even serve index.html, return 404
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('404 Not Found');
          } else {
            // Serve index.html as fallback
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(indexContent, 'utf-8');
          }
        });
      } else {
        // Server error
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end(`Server Error: ${error.code}`);
      }
    } else {
      // Success - serve the file
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`Server running at http://0.0.0.0:${PORT}/`);
  console.log(`Server mode: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Health check endpoint: http://0.0.0.0:${PORT}/ (responds with "OK")`);
});

// Handle server errors
server.on('error', (error) => {
  console.error(`Server error: ${error.message}`);
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Try a different port.`);
    process.exit(1);
  }
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('Server shutting down...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});