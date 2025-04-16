/**
 * DEPLOYMENT TEST SCRIPT
 * 
 * This script tests if the server properly handles health checks
 * exactly as Replit expects.
 */

const http = require('http');

// Configuration
const HOST = 'localhost';
const PORT = process.env.PORT || 5000;
const SERVER_URL = `http://${HOST}:${PORT}`;

console.log(`Testing server at ${SERVER_URL}...`);

// Function to make HTTP requests
function makeRequest(path, headers = {}) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: HOST,
      port: PORT,
      path: path,
      method: 'GET',
      headers: headers
    };

    const req = http.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    req.end();
  });
}

// Main test function
async function runTests() {
  try {
    // Test 1: Health check at root path
    console.log('\nTest 1: Health check at root path');
    const result1 = await makeRequest('/', {
      'User-Agent': 'Replit-Healthcheck-v1'
    });
    
    console.log(`Status: ${result1.statusCode}`);
    console.log(`Content-Type: ${result1.headers['content-type']}`);
    console.log(`Body: ${result1.body}`);
    
    const healthCheckPassed = 
      result1.statusCode === 200 && 
      result1.body === 'OK' &&
      (result1.headers['content-type'] || '').includes('text/plain');
    
    console.log(`Health check test: ${healthCheckPassed ? 'PASSED ✓' : 'FAILED ✗'}`);
    
    if (!healthCheckPassed) {
      console.log('\nNote: For a successful deployment, the server MUST:');
      console.log('1. Respond with status code 200 at the root path (/)');
      console.log('2. Return exactly "OK" (no quotes) in the response body');
      console.log('3. Set Content-Type to "text/plain" or include "text/plain" in it');
    }
    
    // Test 2: Static file serving
    try {
      console.log('\nTest 2: Static file serving (index.html)');
      const result2 = await makeRequest('/index.html');
      console.log(`Status: ${result2.statusCode}`);
      console.log(`Content-Type: ${result2.headers['content-type'] || 'none'}`);
      console.log(`Body length: ${result2.body.length} characters`);
      console.log(`Static file serving: ${result2.statusCode === 200 ? 'WORKS ✓' : 'FAILS ✗'}`);
    } catch (error) {
      console.log('Static file serving test failed with error:', error.message);
    }
    
    // Overall result
    console.log('\nOverall deployment readiness:');
    if (healthCheckPassed) {
      console.log('✅ Your server is READY for Replit deployment!');
    } else {
      console.log('❌ Your server is NOT ready for Replit deployment.');
      console.log('Please fix the health check issues before deploying.');
    }
    
  } catch (error) {
    console.error('Test error:', error.message);
  }
}

// Run the tests
runTests();