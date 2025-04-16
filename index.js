const express = require('express');
const path = require('path');

// Create express app with strict focus on health checks
const app = express();
const PORT = process.env.PORT || 3000;

// HEALTH CHECK HANDLER - THE ABSOLUTE MINIMAL VERSION
// Replit specifically expects this exact handler
app.get('/', (req, res) => {
  console.log('Health check at root path');
  return res.status(200).type('text/plain').end('OK');
});

// Also handle /health explicitly
app.get('/health', (req, res) => {
  return res.status(200).type('text/plain').end('OK');
});

// Static files - but only after health checks
app.use(express.static(__dirname));

// Print diagnostic information
console.log(`
------------------------------------------------------------
HEALTH CHECK OPTIMIZED SERVER
------------------------------------------------------------
- Root path (/) handler: Plain 200 OK text/plain response
- Static content served from HTML files
- Listening on port ${PORT} as required by Replit
------------------------------------------------------------
`);

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});