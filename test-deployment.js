/**
 * DEPLOYMENT TEST SCRIPT
 * 
 * This script tests if the server properly handles health checks
 * exactly as Replit expects.
 */

const http = require('http');

console.log('Starting deployment test...');

// Test if the server responds correctly to health checks
const testHealthCheck = () => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: '/',
      method: 'GET',
      headers: {
        'User-Agent': 'Replit-Health-Check-Simulator/1.0'
      }
    };

    console.log('Testing health check at root path (/)...');
    const req = http.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        console.log(`Status code: ${res.statusCode}`);
        console.log(`Content-Type: ${res.headers['content-type'] || 'not set'}`);
        console.log(`Response body: ${data}`);
        
        // Check if the response meets Replit's requirements
        const isSuccess = 
          res.statusCode === 200 && 
          (res.headers['content-type'] || '').includes('text/plain') &&
          data.trim() === 'OK';
        
        if (isSuccess) {
          console.log('✅ PASS: Health check at root path (/) is working correctly');
          resolve(true);
        } else {
          console.log('❌ FAIL: Health check at root path (/) is not working correctly');
          console.log('Expected: Status 200, Content-Type: text/plain, Body: OK');
          resolve(false);
        }
      });
    });
    
    req.on('error', (error) => {
      console.error(`❌ ERROR: ${error.message}`);
      reject(error);
    });
    
    req.end();
  });
};

// Test if we can access static content
const testStaticContent = () => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: '/index.html',
      method: 'HEAD'
    };

    console.log('Testing static content access at /index.html...');
    const req = http.request(options, (res) => {
      console.log(`Status code: ${res.statusCode}`);
      console.log(`Content-Type: ${res.headers['content-type'] || 'not set'}`);
      
      const isSuccess = 
        res.statusCode === 200 && 
        (res.headers['content-type'] || '').includes('text/html');
      
      if (isSuccess) {
        console.log('✅ PASS: Static content is being served correctly');
        resolve(true);
      } else {
        console.log('❌ FAIL: Static content is not being served correctly');
        console.log('Expected: Status 200, Content-Type: text/html');
        resolve(false);
      }
    });
    
    req.on('error', (error) => {
      console.error(`❌ ERROR: ${error.message}`);
      reject(error);
    });
    
    req.end();
  });
};

// Run tests
const runAllTests = async () => {
  try {
    console.log('\n===== REPLIT DEPLOYMENT TEST =====\n');
    
    const healthCheckPassed = await testHealthCheck();
    console.log();
    
    if (healthCheckPassed) {
      const contentPassed = await testStaticContent();
      
      console.log('\n===== TEST RESULTS =====\n');
      if (healthCheckPassed && contentPassed) {
        console.log('✅ ALL TESTS PASSED! Your server should work on Replit.');
        console.log('Health check and static content serving are working correctly.');
      } else {
        console.log('❌ SOME TESTS FAILED. Your server might not work on Replit.');
        console.log('Review the test results above and fix any issues.');
      }
    } else {
      console.log('\n===== TEST RESULTS =====\n');
      console.log('❌ CRITICAL TEST FAILED. Your server will not pass Replit health checks.');
      console.log('The root path (/) must return "OK" with status 200 and Content-Type: text/plain.');
    }
    
    console.log('\nMake sure server.js exists at the root level of your Replit project!');
    
  } catch (error) {
    console.error('Error running tests:', error);
    console.log('Make sure your server is running on port 5000');
  }
};

// Wait for server to start, then run tests
console.log('Waiting for server to start...');
setTimeout(runAllTests, 1000);