/**
 * REPLIT COMPATIBILITY VERIFICATION SCRIPT
 * 
 * This script checks if your server meets Replit's deployment requirements:
 * 1. It must return "OK" at the root path with Content-Type: text/plain
 * 2. It should listen on the port specified by the PORT environment variable
 */

const http = require('http');
const fs = require('fs');
const { spawn } = require('child_process');

// Configuration
const TEST_PORT = 5000; // Use 5000 for testing
const HOST = 'localhost';
const REQUEST_TIMEOUT = 5000; // 5 seconds
const MAX_RETRIES = 5;
const RETRY_DELAY = 1000; // 1 second

// Required server files
const SERVER_FILES = [
  'server.js',
  'index.js',
  'minimal-health-server.js'
];

// Main verification function
async function verifyReplitCompatibility() {
  console.log('🔍 Checking Replit deployment compatibility...\n');
  
  // Step 1: Check if at least one server implementation exists
  console.log('Step 1: Checking for server implementation files');
  const existingFiles = SERVER_FILES.filter(file => fs.existsSync(file));
  
  if (existingFiles.length === 0) {
    console.error('❌ No server implementation found!');
    console.error('   Your project must include at least one of:');
    SERVER_FILES.forEach(file => console.error(`   - ${file}`));
    return false;
  }
  
  console.log('✅ Found server implementation(s):');
  existingFiles.forEach(file => console.log(`   - ${file}`));
  
  // Step 2: Test the first available server implementation
  const serverFile = existingFiles[0];
  console.log(`\nStep 2: Testing ${serverFile} for health check compatibility`);
  
  // Start the server
  console.log(`   Starting server from ${serverFile}...`);
  const serverProcess = spawn('node', [serverFile], {
    env: {
      ...process.env,
      PORT: TEST_PORT.toString()
    },
    stdio: 'pipe' // Capture output
  });
  
  let serverOutput = '';
  
  serverProcess.stdout.on('data', (data) => {
    serverOutput += data.toString();
    console.log(`   Server: ${data.toString().trim()}`);
  });
  
  serverProcess.stderr.on('data', (data) => {
    serverOutput += data.toString();
    console.error(`   Server error: ${data.toString().trim()}`);
  });
  
  // Wait for server to start
  console.log('   Waiting for server to start...');
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Test health check
  let healthCheckPassed = false;
  let retries = 0;
  
  while (!healthCheckPassed && retries < MAX_RETRIES) {
    try {
      console.log(`   Attempt ${retries + 1}/${MAX_RETRIES}: Testing health check at http://${HOST}:${TEST_PORT}/`);
      const response = await makeRequest('/', {
        'User-Agent': 'Replit-Healthcheck-v1'
      });
      
      console.log(`   Response status: ${response.statusCode}`);
      console.log(`   Content-Type: ${response.headers['content-type'] || 'none'}`);
      console.log(`   Body: "${response.body}"`);
      
      healthCheckPassed = 
        response.statusCode === 200 && 
        response.body === 'OK' &&
        (response.headers['content-type'] || '').includes('text/plain');
      
      if (healthCheckPassed) {
        console.log('   ✅ Health check passed!');
        break;
      } else {
        console.log('   ❌ Health check failed!');
        if (retries < MAX_RETRIES - 1) {
          console.log(`   Retrying in ${RETRY_DELAY/1000} seconds...`);
          await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        }
      }
    } catch (error) {
      console.error(`   Request error: ${error.message}`);
      if (retries < MAX_RETRIES - 1) {
        console.log(`   Retrying in ${RETRY_DELAY/1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      }
    }
    
    retries++;
  }
  
  // Clean up
  serverProcess.kill();
  
  // Final results
  console.log('\n📋 COMPATIBILITY RESULTS:');
  
  if (healthCheckPassed) {
    console.log('✅ Your project is ready for Replit deployment!');
    return true;
  } else {
    console.log('❌ Your project is NOT compatible with Replit deployment.');
    console.log('\nTo fix this issue:');
    console.log('1. Ensure your server returns exactly "OK" (no quotes) at the root path (/)');
    console.log('2. Set Content-Type header to "text/plain"');
    console.log('3. Return status code 200');
    console.log('\nExample code:');
    console.log('  if (req.url === "/" || req.url === "") {');
    console.log('    res.writeHead(200, { "Content-Type": "text/plain" });');
    console.log('    res.end("OK");');
    console.log('    return;');
    console.log('  }');
    return false;
  }
}

// Function to make HTTP requests
function makeRequest(path, headers = {}) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: HOST,
      port: TEST_PORT,
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
    
    // Set timeout
    req.setTimeout(REQUEST_TIMEOUT, () => {
      req.abort();
      reject(new Error(`Request timed out after ${REQUEST_TIMEOUT/1000} seconds`));
    });
    
    req.end();
  });
}

// Run the verification
verifyReplitCompatibility().then(result => {
  process.exit(result ? 0 : 1);
});