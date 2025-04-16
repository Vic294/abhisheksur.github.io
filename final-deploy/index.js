/**
 * ULTRA-SIMPLE INDEX.JS FOR REPLIT DEPLOYMENT
 * 
 * This file is identical to server.js and serves as a fallback
 * in case Replit looks for index.js instead of server.js
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
  
  // Default to index.html
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
      if (ext === '.pdf') contentType = 'application/pdf';
      if (ext === '.docx') contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      
      res.writeHead(200, {'Content-Type': contentType});
      res.end(content);
    } else {
      // File not found, redirect to index.html
      res.writeHead(302, {'Location': '/index.html'});
      res.end();
    }
  } catch (error) {
    console.error('Error serving file:', error);
    res.writeHead(500);
    res.end('Internal Server Error');
  }
});

// CRITICAL: Determine port for running
// Use PORT env var or 3000 (Replit default) for preview, with 5000 as fallback for production
const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`
=======================================================
  SERVER RUNNING ON PORT ${PORT}
=======================================================
  - Root path (/) responding with "OK" for health checks
  - All website content being served from static files
  - Using pure Node.js HTTP server for maximum compatibility
=======================================================
  `);
});