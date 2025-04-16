// Test script to verify health check functionality

const http = require('http');

const PORT = process.env.PORT || 5000;
const HOST = 'localhost';

console.log('Testing health check on the server...');
console.log(`Making request to http://${HOST}:${PORT}/`);

const req = http.request({
  hostname: HOST,
  port: PORT,
  path: '/',
  method: 'GET',
}, (res) => {
  console.log('========= RESPONSE =========');
  console.log(`Status: ${res.statusCode}`);
  console.log(`Headers: ${JSON.stringify(res.headers)}`);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log(`Body: "${data}"`);
    console.log('==========================');
    
    // Check if the response meets Replit's requirements
    if (
      res.statusCode === 200 &&
      res.headers['content-type'].includes('text/plain') &&
      data === 'OK'
    ) {
      console.log('✅ SUCCESS: The server should pass Replit health checks!');
    } else {
      console.log('❌ FAILURE: The server may not pass Replit health checks.');
      console.log('Required: Status 200, Content-Type text/plain, Body "OK"');
    }
  });
});

req.on('error', (e) => {
  console.error(`❌ ERROR: ${e.message}`);
});

req.end();