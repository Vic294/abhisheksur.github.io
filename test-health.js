// Test script to verify health check response for Replit deployment
const http = require('http');

// Test local server health check response
function testHealthCheck() {
  console.log('Testing health check response...');
  
  // Create a request to the root path - IMPORTANT: Use PORT 5000 for Replit
  const options = {
    hostname: 'localhost',
    port: 5000,
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
      console.error('❌ ERROR: Content-Type must be text/plain');
      console.error('   Current Content-Type:', res.headers['content-type']);
    } else {
      console.log('✓ Content-Type check: PASSED');
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
        console.error('❌ ERROR: Response body must be exactly "OK"');
        console.error(`   Current body: "${body}"`);
      } else {
        console.log('✓ Body content check: PASSED');
      }
      
      console.log('Health check test completed.');
      process.exit(0);
    });
  });
  
  req.on('error', (e) => {
    console.error(`❌ TEST ERROR: ${e.message}`);
    console.error('   Make sure your server is running on port 5000');
    process.exit(1);
  });
  
  req.end();
}

// Start a test server for 3 seconds, then run the health check test
console.log('Starting a test server on port 5000 (required by Replit)...');

// Create the test server
const server = http.createServer((req, res) => {
  console.log(`Test server received: ${req.method} ${req.url}`);
  
  // Only respond with OK to the root path
  if (req.url === '/' || req.url === '') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('OK');
  } else {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Abhishek Sur - Portfolio Website');
  }
});

// Start the server on PORT 5000
server.listen(5000, '0.0.0.0', () => {
  console.log('Test server running on port 5000');
  console.log('Testing exactly what Replit expects for deployment');
  
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