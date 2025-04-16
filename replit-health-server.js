/**
 * REPLIT DEPLOYMENT SERVER WITH STRICT HEALTH CHECK PRIORITIZATION
 * 
 * This server prioritizes health checks at the root path while also
 * serving static content for the website.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

// Map of content types
const CONTENT_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.pdf': 'application/pdf',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.txt': 'text/plain'
};

// Create HTTP server
const server = http.createServer((req, res) => {
  const now = new Date().toISOString();
  console.log(`[${now}] ${req.method} ${req.url}`);
  
  // PRIORITY #1: Handle health check at root path
  if (req.url === '/' || req.url === '/health') {
    console.log(`[${now}] HEALTH CHECK at ${req.url}`);
    res.setHeader('Content-Type', 'text/plain');
    res.statusCode = 200;
    res.end('OK');
    return;
  }
  
  // For other paths, serve static files
  let filePath = req.url;
  
  // Default to index.html for root path
  if (filePath === '/') {
    filePath = '/index.html';
  }
  
  // Resolve file path
  filePath = path.join(__dirname, filePath);
  
  // Check if file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // File not found, serve index.html
      console.log(`[${now}] File not found: ${filePath}`);
      res.statusCode = 302;
      res.setHeader('Location', '/index.html');
      res.end();
      return;
    }
    
    // Get file extension and content type
    const ext = path.extname(filePath);
    const contentType = CONTENT_TYPES[ext] || 'application/octet-stream';
    
    // Read and serve the file
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end('Internal Server Error');
        return;
      }
      
      // Serve the file
      res.setHeader('Content-Type', contentType);
      res.statusCode = 200;
      res.end(data);
    });
  });
});

// Listen on port 5000
const PORT = process.env.PORT || 5000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`
=========================================================
  REPLIT DEPLOYMENT SERVER
=========================================================
  Running on port: ${PORT}
  Health check at: /
  Website content at: /index.html
=========================================================
`);
});