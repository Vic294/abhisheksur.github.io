/**
 * START SERVER SCRIPT
 * 
 * This script starts the server and ensures it stays running
 */

const { spawn } = require('child_process');
const fs = require('fs');

// Define server configuration
const DEFAULT_SERVER = 'server.js';
const FALLBACK_SERVER = 'index.js';
const MINIMAL_SERVER = 'minimal-health-server.js';

// Determine which server file to use
let serverFile = DEFAULT_SERVER;

// Check if the default server file exists
if (!fs.existsSync(serverFile)) {
  console.log(`Warning: ${serverFile} not found, trying fallback server...`);
  serverFile = FALLBACK_SERVER;
  
  // Check if the fallback server exists
  if (!fs.existsSync(serverFile)) {
    console.log(`Warning: ${serverFile} not found, using minimal health check server...`);
    serverFile = MINIMAL_SERVER;
    
    // If even the minimal server doesn't exist, we're in trouble
    if (!fs.existsSync(serverFile)) {
      console.error('Error: No server implementation found!');
      process.exit(1);
    }
  }
}

console.log(`Starting server from: ${serverFile}`);

// Start the server process
const serverProcess = spawn('node', [serverFile], {
  stdio: 'inherit',
  env: {
    ...process.env,
    PORT: process.env.PORT || '5000'
  }
});

// Handle server process events
serverProcess.on('error', (error) => {
  console.error(`Failed to start server: ${error.message}`);
  process.exit(1);
});

serverProcess.on('close', (code) => {
  console.log(`Server process exited with code ${code}`);
  
  if (code !== 0) {
    console.log('Server crashed, restarting in 5 seconds...');
    setTimeout(() => {
      console.log('Restarting server...');
      process.exit(1); // Exit with error to trigger Replit to restart the process
    }, 5000);
  }
});

// Handle process termination signals
process.on('SIGINT', () => {
  console.log('Received SIGINT, shutting down...');
  serverProcess.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log('Received SIGTERM, shutting down...');
  serverProcess.kill('SIGTERM');
});