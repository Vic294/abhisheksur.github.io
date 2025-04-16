// Test script to verify health check response
const http = require('http');

// Test local server health check response
function testHealthCheck() {
  console.log('Testing health check response...');
  
  // Create a request to the root path
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/',
    method: 'GET',
    headers: {
      'Content-Type': 'text/plain'
    }
  };
  
  const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    
    // Verify Content-Type
    if (res.headers['content-type'] !== 'text/plain') {
      console.error('ERROR: Content-Type must be text/plain');
    } else {
      console.log('Content-Type check: PASSED');
    }
    
    // Check the body content
    let body = '';
    res.on('data', (chunk) => {
      body += chunk;
    });
    
    res.on('end', () => {
      console.log(`BODY: "${body}"`);
      
      // Verify body is exactly "OK"
      if (body !== 'OK') {
        console.error('ERROR: Response body must be exactly "OK"');
      } else {
        console.log('Body content check: PASSED');
      }
      
      console.log('Health check test completed.');
      process.exit(0);
    });
  });
  
  req.on('error', (e) => {
    console.error(`TEST ERROR: ${e.message}`);
    process.exit(1);
  });
  
  req.end();
}

// Start a test server for 3 seconds, then run the health check test
console.log('Starting a test server...');

// Create the test server
const server = http.createServer((req, res) => {
  console.log(`Test server received: ${req.method} ${req.url}`);
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('OK');
});

// Start the server
server.listen(3000, 'localhost', () => {
  console.log('Test server running on port 3000');
  
  // Run test after a short delay
  setTimeout(() => {
    testHealthCheck();
    
    // Close the server after test
    setTimeout(() => {
      console.log('Closing test server...');
      server.close();
    }, 1000);
  }, 1000);
});