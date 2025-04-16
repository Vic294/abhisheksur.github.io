const http = require('http');

console.log('Verifying Replit compatibility...');

// Test that the server responds to health checks at the root path
const checkHealthAtRoot = () => {
  return new Promise((resolve, reject) => {
    console.log('\nTesting health check at root path (/)...');
    
    const req = http.request({
      hostname: 'localhost',
      port: 3000,
      path: '/',
      method: 'GET',
      timeout: 3000,
      headers: {
        'User-Agent': 'Replit-Health-Check/1.0'
      }
    }, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        console.log(`Status code: ${res.statusCode}`);
        console.log(`Content-Type: ${res.headers['content-type'] || 'not set'}`);
        console.log(`Response body: ${data}`);
        
        if (res.statusCode === 200 && 
            (res.headers['content-type'] || '').includes('text/plain') && 
            data.trim() === 'OK') {
          console.log('✅ PASS: Health check successful');
          resolve(true);
        } else {
          console.log('❌ FAIL: Health check failed');
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

// Start the test
const runTests = async () => {
  try {
    console.log('Starting server compatibility verification...');
    console.log('Note: Server must be running on port 3000');
    
    // Run tests
    const healthCheckPassed = await checkHealthAtRoot();
    
    // Summary
    console.log('\n--- COMPATIBILITY TEST RESULTS ---');
    if (healthCheckPassed) {
      console.log('✅ PASSED: Root path health check');
      console.log('Server should be compatible with Replit deployment!');
    } else {
      console.log('❌ FAILED: Root path health check');
      console.log('Server will likely NOT pass Replit deployment health checks.');
    }
    
  } catch (error) {
    console.error('Error during tests:', error);
    console.log('Make sure server is running on port 3000');
  }
};

// Run the tests
runTests();