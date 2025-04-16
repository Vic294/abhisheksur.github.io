/**
 * ULTRA-SIMPLE SERVER TEST
 * 
 * This script specifically tests the ultra-simple server to ensure
 * it meets Replit's deployment requirements.
 */

const http = require('http');

// Default to port 5000 if not specified (Replit typically uses port 5000)
const PORT = process.env.PORT || 5000;

// Test the ultra-simple server's health check response
function testUltraSimpleServer() {
  console.log('\n🔬 TESTING ULTRA-SIMPLE SERVER 🔬');
  console.log('This test verifies that the server properly responds to Replit health checks\n');
  
  // Create options for the HTTP request
  const options = {
    hostname: 'localhost',
    port: PORT,
    path: '/',
    method: 'GET',
    headers: {
      'User-Agent': 'Ultra-Simple-Test/1.0',
    }
  };
  
  console.log(`Making request to http://localhost:${PORT}/`);
  
  // Make the request
  const req = http.request(options, (res) => {
    let responseData = '';
    
    // Collect response data
    res.on('data', (chunk) => {
      responseData += chunk;
    });
    
    // Process response when complete
    res.on('end', () => {
      console.log('\n📊 HEALTH CHECK RESULTS:');
      console.log(`Status Code: ${res.statusCode}`);
      console.log(`Content-Type: ${res.headers['content-type']}`);
      console.log(`Response Body: "${responseData}"`);
      
      // Validate the response
      let pass = true;
      
      if (res.statusCode !== 200) {
        console.log('❌ FAIL: Status code must be 200');
        pass = false;
      }
      
      if (res.headers['content-type'] !== 'text/plain') {
        console.log('❌ FAIL: Content-Type must be "text/plain"');
        pass = false;
      }
      
      if (responseData !== 'OK') {
        console.log('❌ FAIL: Response body must be exactly "OK"');
        pass = false;
      }
      
      // Show final result
      if (pass) {
        console.log('\n✅ SUCCESS! The ultra-simple server passes Replit health checks.');
        console.log('This server should deploy successfully on Replit.');
      } else {
        console.log('\n❌ FAIL: The server does not meet Replit health check requirements.');
        console.log('Please fix the issues above and try again.');
      }
    });
  });
  
  // Handle request errors
  req.on('error', (error) => {
    console.error(`\n❌ ERROR: ${error.message}`);
    console.log('Make sure the ultra-simple server is running on port', PORT);
  });
  
  // Complete the request
  req.end();
}

// Start the test
testUltraSimpleServer();