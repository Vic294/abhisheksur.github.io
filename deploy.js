const express = require('express');
const path = require('path');
const fs = require('fs');

// Create the server app
const app = express();
// CRITICAL: Replit expects port 3000, not 5000
const PORT = process.env.PORT || 3000;

// Logging middleware for debugging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log('Headers:', JSON.stringify(req.headers, null, 2));
  next();
});

// CRITICAL: Root path for Replit health checks, must be the first route
// Made even simpler for maximum compatibility
app.get('/', (req, res) => {
  console.log('ROOT PATH ACCESSED');
  
  // Plain text response with 200 OK for health checks
  return res.status(200)
     .set('Content-Type', 'text/plain')
     .end('OK');
});

// Explicit health check route
app.get('/health', (req, res) => {
  return res.status(200).end('OK');
});

// Serve static files only AFTER handling the health check
app.use(express.static(__dirname));

// Print startup message
console.log(`
=======================================================
ABHISHEK SUR PORTFOLIO DEPLOYMENT SERVER
=======================================================

This server is optimized for Replit Deployment:
- The root path (/) will always return 200 OK text/plain
- Now listening on port ${PORT} (required by Replit)
- Website content is served from static files

Test the server manually with:
- curl http://localhost:${PORT}/
- Browse to http://localhost:${PORT}/index.html for content

=======================================================
`);

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});