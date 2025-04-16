/**
 * REPLIT DEPLOYMENT SERVER
 * 
 * This server is specifically designed to pass Replit health checks
 * while serving the static website files.
 */

const express = require('express');
const app = express();

// CRITICAL: Port MUST be 3000 for Replit
const PORT = process.env.PORT || 3000;

/**
 * HEALTH CHECK HANDLER - ROOT PATH
 * 
 * This handler satisfies Replit health checks by:
 * 1. Responding to GET requests at the root path (/)
 * 2. Returning a plain text "OK" with status 200
 */
app.get('/', (req, res) => {
  console.log(`[${new Date().toISOString()}] Health check at root path`);
  return res.status(200).type('text/plain').end('OK');
});

// Static file serving
app.use(express.static(__dirname));

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`
===============================================================
  REPLIT DEPLOYMENT SERVER RUNNING
===============================================================
  → Health check endpoint: http://localhost:${PORT}/
  → Website content: http://localhost:${PORT}/index.html
  → Port: ${PORT} (required by Replit)
===============================================================
`);
});