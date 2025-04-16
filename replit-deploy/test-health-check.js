/**
 * HEALTH CHECK TEST SCRIPT
 * 
 * This script verifies that your server properly responds to health checks
 * exactly as Replit expects.
 */

const http = require('http');

// Configuration
const PORT = 5000;
const HOST = 'localhost';

console.log(`Testing health check on http://${HOST}:${PORT}/...`);

// Create a request with the Replit health check user agent
const options = {
  hostname: HOST,
  port: PORT,
  path: '/',
  method: 'GET',
  headers: {
    'User-Agent': 'Replit-Healthcheck-v1'
  }
};

// Make the request
const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  
  let body = '';
  res.on('data', (chunk) => {
    body += chunk;
  });
  
  res.on('end', () => {
    console.log(`BODY: "${body}"`);
    
    // Check if the response is valid
    const isValid = 
      res.statusCode === 200 && 
      body === 'OK' &&
      (res.headers['content-type'] || '').includes('text/plain');
    
    if (isValid) {
      console.log('\n✅ SUCCESS: Your server correctly responds to health checks!');
      console.log('This server will work with Replit deployment.');
    } else {
      console.log('\n❌ FAILURE: Your server does not correctly respond to health checks.');
      console.log('Issues detected:');
      
      if (res.statusCode !== 200) {
        console.log(`- Status code should be 200, got ${res.statusCode}`);
      }
      
      if (body !== 'OK') {
        console.log(`- Body should be exactly "OK" (without quotes), got "${body}"`);
      }
      
      if (!(res.headers['content-type'] || '').includes('text/plain')) {
        console.log(`- Content-Type should include "text/plain", got "${res.headers['content-type'] || 'none'}"`);
      }
    }
  });
});

req.on('error', (e) => {
  console.error(`❌ ERROR: ${e.message}`);
  console.log('\nMake sure your server is running on port 5000 before running this test.');
});

// Set timeout
req.setTimeout(5000, () => {
  console.error('❌ ERROR: Request timed out after 5 seconds');
  req.destroy();
});

req.end();