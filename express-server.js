// EXPRESS SERVER FOR REPLIT DEPLOYMENT
// Using Express.js for better compatibility

const express = require('express');
const app = express();
const path = require('path');

// Get port from environment or use 3000
const PORT = process.env.PORT || 3000;

// Special middleware to handle health checks at root path
app.get('/', (req, res) => {
  console.log('Health check received');
  res.set('Content-Type', 'text/plain');
  res.send('OK');
});

// Serve static files from current directory
app.use(express.static('.'));

// Fallback route to serve index.html for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Express server running at http://0.0.0.0:${PORT}/`);
  console.log('Ready for health checks and serving static files');
});