/**
 * REPLIT DEPLOYMENT TEST
 * This script tests if the ultra-simple server can pass Replit's health checks
 */

const http = require('http');

// Use the PORT environment variable or default to 3000
const PORT = process.env.PORT || 3000;

function testHealthCheck() {
  console.log(`\n🔍 Testing health check at http://localhost:${PORT}/...`);
  
  const options = {
    hostname: 'localhost',
    port: PORT,
    path: '/',
    method: 'GET',
    headers: {
      'User-Agent': 'Health-Check-Test/1.0',
    }
  };
  
  const req = http.request(options, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      console.log(`Status code: ${res.statusCode}`);
      console.log(`Content-Type: ${res.headers['content-type']}`);
      console.log(`Response body: "${data}"`);
      
      // Verify requirements
      let success = true;
      
      if (res.statusCode !== 200) {
        console.log('❌ Failed: Status code must be 200');
        success = false;
      }
      
      if (res.headers['content-type'] !== 'text/plain') {
        console.log('❌ Failed: Content-Type must be text/plain');
        success = false;
      }
      
      if (data !== 'OK') {
        console.log('❌ Failed: Response must be exactly "OK"');
        success = false;
      }
      
      if (success) {
        console.log('✅ Health check passed! The server meets Replit\'s requirements.');
      } else {
        console.log('❌ Health check failed to meet Replit\'s requirements.');
      }
      
      // Now test a non-root path
      testNonRootPath();
    });
  });
  
  req.on('error', (error) => {
    console.error(`❌ Error: ${error.message}`);
    console.log('Make sure the server is running on the correct port.');
  });
  
  req.end();
}

function testNonRootPath() {
  console.log(`\n🔍 Testing a non-root path at http://localhost:${PORT}/some/path...`);
  
  const options = {
    hostname: 'localhost',
    port: PORT,
    path: '/some/path',
    method: 'GET'
  };
  
  const req = http.request(options, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      console.log(`Status code: ${res.statusCode}`);
      console.log(`Content-Type: ${res.headers['content-type']}`);
      console.log(`Response length: ${data.length} characters`);
      console.log(`Response starts with: "${data.substring(0, 30)}${data.length > 30 ? '...' : ''}"`);
      
      console.log('\n📋 SUMMARY:');
      if (res.statusCode === 200) {
        console.log('✅ Non-root path is handled.');
      } else {
        console.log('❓ Non-root path returned non-200 status code.');
      }
      
      console.log('\n🚀 FINAL VERDICT:');
      console.log('The server should pass Replit\'s health checks if:');
      console.log('1. The root path (/) returns "OK" with Content-Type: text/plain');
      console.log('2. The server is listening on the PORT specified by Replit');
      console.log('\nTo test yourself: curl -v http://localhost:' + PORT + '/');
    });
  });
  
  req.on('error', (error) => {
    console.error(`❌ Error: ${error.message}`);
  });
  
  req.end();
}

// Start the tests
console.log('🧪 TESTING REPLIT DEPLOYMENT COMPATIBILITY 🧪');
console.log('This test checks if the server meets Replit\'s health check requirements.');
testHealthCheck();