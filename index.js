// REPLIT DEPLOYMENT SERVER
// Serves static files while properly handling health checks
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 5000;

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
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
};

const server = http.createServer((req, res) => {
  console.log(`${new Date().toISOString()}: ${req.method} ${req.url}`);
  
  // ROOT PATH HANDLER: Replit health check - MOST CRITICAL part for deployment
  if (req.url === '/' || req.url === '') {
    // Check if this is a health check
    const userAgent = req.headers['user-agent'] || '';
    
    if (userAgent.includes('Replit-Healthcheck') || req.headers['x-replit-healthcheck']) {
      // This is a health check - return "OK" as plain text
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('OK');
      console.log('Replied to health check with OK');
      return;
    }
    
    // Regular request to index.html
    serveFile('./index.html', res);
    return;
  }
  
  // Handle other file requests
  let filePath = '.' + req.url;
  
  // Check if file exists
  fs.stat(filePath, (err, stats) => {
    if (err) {
      // File not found, serve index.html instead
      console.log(`File not found: ${filePath}, serving index.html instead`);
      serveFile('./index.html', res);
      return;
    }
    
    // If it's a directory, try to serve index.html from it
    if (stats.isDirectory()) {
      serveFile(path.join(filePath, 'index.html'), res);
      return;
    }
    
    // Otherwise serve the requested file
    serveFile(filePath, res);
  });
});

// Helper function to serve files
function serveFile(filePath, res) {
  const extname = path.extname(filePath);
  const contentType = mimeTypes[extname] || 'text/plain';
  
  fs.readFile(filePath, (err, content) => {
    if (err) {
      // If file read fails, try index.html
      if (filePath !== './index.html') {
        console.log(`Error reading ${filePath}, trying index.html`);
        serveFile('./index.html', res);
        return;
      }
      
      // If index.html also fails, return server error
      res.writeHead(500);
      res.end('Server Error: Could not read file');
      return;
    }
    
    // Success - return the file
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  });
}

// Start server
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}/`);
  console.log('To test health check, run: curl -H "User-Agent: Replit-Healthcheck-v1" http://localhost:5000/');
});