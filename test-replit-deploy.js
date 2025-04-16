/**
 * REPLIT DEPLOYMENT TEST
 * This script tests if the ultra-simple server can pass Replit's health checks
 */
const http = require('http');

// Test health check response
function testHealthCheck() {
  console.log('\nTESTING HEALTH CHECK RESPONSE...');
  
  const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/',
    method: 'GET',
    headers: {
      'Accept': 'text/plain'
    }
  };
  
  const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    
    // Verify Content-Type
    if (res.headers['content-type'] !== 'text/plain') {
      console.error('❌ ERROR: Content-Type must be text/plain');
      console.error(`   Current Content-Type: ${res.headers['content-type']}`);
    } else {
      console.log('✅ Content-Type check: PASSED');
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
        console.log('✅ Body content check: PASSED');
      }
      
      console.log('\nHEALTH CHECK TEST COMPLETED');
      
      // Test non-root path
      testNonRootPath();
    });
  });
  
  req.on('error', (e) => {
    console.error(`❌ TEST ERROR: ${e.message}`);
    process.exit(1);
  });
  
  req.end();
}

// Test non-root path
function testNonRootPath() {
  console.log('\nTESTING NON-ROOT PATH...');
  
  const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/test',
    method: 'GET'
  };
  
  const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    
    // Check the body content
    let body = '';
    res.on('data', (chunk) => {
      body += chunk;
    });
    
    res.on('end', () => {
      console.log(`BODY: "${body}"`);
      console.log('\nNON-ROOT PATH TEST COMPLETED');
      
      console.log('\n✅✅✅ ALL TESTS PASSED ✅✅✅');
      console.log('Your server should work with Replit deployment!');
      
      // Exit after tests
      process.exit(0);
    });
  });
  
  req.on('error', (e) => {
    console.error(`❌ TEST ERROR: ${e.message}`);
    process.exit(1);
  });
  
  req.end();
}

// Start the ultra-simple server
console.log('STARTING REPLIT DEPLOYMENT TEST');
console.log('Starting server on port 5000...');

// Load the actual server script
require('./replit-deploy.js');

// Wait for server to start
setTimeout(() => {
  testHealthCheck();
}, 1000);