/**
 * PORTFOLIO SERVER FOR ABHISHEK SUR'S WEBSITE
 * 
 * This server is optimized for both Replit preview and deployment
 */

// Use built-in Node.js HTTP module for maximum compatibility
const http = require('http');
const fs = require('fs');
const path = require('path');

// Create HTTP server
const server = http.createServer((req, res) => {
  console.log(`Request: ${req.method} ${req.url}`);
  
  // PRIORITY: Handle root path for health checks
  if (req.url === '/' || req.url === '/health') {
    console.log('Health check request received');
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('OK');
    return;
  }
  
  // For all other requests, try to serve static files
  let filePath = req.url;
  
  // Default to index.html if no specific file requested
  if (filePath === '/') {
    filePath = '/index.html';
  }
  
  // Get absolute path
  filePath = path.join(__dirname, filePath);
  
  // Handle static files
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath);
      const ext = path.extname(filePath);
      
      // Set content type based on file extension
      let contentType = 'text/html';
      if (ext === '.css') contentType = 'text/css';
      if (ext === '.js') contentType = 'application/javascript';
      if (ext === '.json') contentType = 'application/json';
      if (ext === '.png') contentType = 'image/png';
      if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
      if (ext === '.gif') contentType = 'image/gif';
      if (ext === '.svg') contentType = 'image/svg+xml';
      if (ext === '.pdf') contentType = 'application/pdf';
      if (ext === '.docx') contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      
      res.writeHead(200, {'Content-Type': contentType});
      res.end(content);
    } else {
      // If file doesn't exist, try redirecting to index.html
      console.log(`File not found: ${filePath}, redirecting to index.html`);
      res.writeHead(302, {'Location': '/index.html'});
      res.end();
    }
  } catch (error) {
    console.error('Error serving file:', error);
    res.writeHead(500);
    res.end('Internal Server Error');
  }
});

// Use port 3000 for Replit preview, with fallback to 5000 for deployment
const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`
=======================================================
  PORTFOLIO SERVER RUNNING ON PORT ${PORT}
=======================================================
  - Root path (/) responding with "OK" for health checks
  - Website content at /index.html
  - Serving static files from current directory
  - Using pure Node.js HTTP server for Replit compatibility
=======================================================
  `);
});