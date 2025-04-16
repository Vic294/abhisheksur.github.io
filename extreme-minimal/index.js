// EXTREME MINIMAL SERVER
// The ONLY purpose of this server is to pass Replit health checks
// No routing, no static files, nothing but "OK" responses

const http = require('http');
const PORT = process.env.PORT || 5000;

// Configuration 
const BIND_ADDRESS = '0.0.0.0';
const RESPONSE_TEXT = 'OK';
const CONTENT_TYPE = 'text/plain';
const STATUS_CODE = 200;

// Create the server
const server = http.createServer((req, res) => {
  // Log every request for debugging
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log(`Headers: ${JSON.stringify(req.headers)}`);
  
  // Always respond with "OK" and text/plain content type
  // This is EXACTLY what Replit health checks require
  res.writeHead(STATUS_CODE, {'Content-Type': CONTENT_TYPE});
  res.end(RESPONSE_TEXT);
});

// Handle server errors
server.on('error', (err) => {
  console.error(`[${new Date().toISOString()}] SERVER ERROR:`, err);
});

// Start listening
server.listen(PORT, BIND_ADDRESS, () => {
  console.log(`[${new Date().toISOString()}] Server started`);
  console.log(`Listening at http://${BIND_ADDRESS}:${PORT}/`);
  console.log(`PORT env variable: ${process.env.PORT || 'not set'}`);
  console.log(`Responding with "${RESPONSE_TEXT}" (Content-Type: ${CONTENT_TYPE})`);
});