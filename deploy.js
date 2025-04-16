/**
 * REPLIT DEPLOYMENT SCRIPT
 * 
 * This script:
 * 1. Runs the build script to create the deployment package
 * 2. Verifies that the server correctly handles health checks
 * 3. Sets up everything needed for Replit deployment
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Set up error handling
process.on('unhandledRejection', (error) => {
  console.error('Unhandled rejection:', error);
  process.exit(1);
});

// Main function
async function deploy() {
  try {
    console.log('🚀 Starting deployment process...');
    
    // Step 1: Run build script
    console.log('\n📦 Building deployment package...');
    execSync('node build.js', { stdio: 'inherit' });
    
    // Step 2: Verify health check compatibility
    console.log('\n🔍 Verifying health check compatibility...');
    try {
      execSync('node verify-replit-compatibility.js', { stdio: 'inherit' });
      console.log('✅ Health check verification passed!');
    } catch (error) {
      console.error('❌ Health check verification failed!');
      console.error('Please fix the issues before deploying.');
      return;
    }
    
    // Step 3: Update current directory to be deployment-ready
    console.log('\n🔄 Updating current directory for deployment...');
    
    // Ensure we have the minimal-health-server.js in case everything else fails
    if (!fs.existsSync('minimal-health-server.js')) {
      fs.copyFileSync(
        path.join(__dirname, 'dist', 'minimal-health-server.js'),
        path.join(__dirname, 'minimal-health-server.js')
      );
      console.log('✅ Added minimal-health-server.js as fallback');
    }
    
    // Ensure we have start-server.js
    if (!fs.existsSync('start-server.js')) {
      fs.copyFileSync(
        path.join(__dirname, 'dist', 'start-server.js'),
        path.join(__dirname, 'start-server.js')
      );
      console.log('✅ Added start-server.js');
    }
    
    console.log('\n🎉 Deployment preparation complete!');
    console.log('Your site is ready to be deployed to Replit.');
    console.log('To deploy, do one of the following:');
    console.log('1. Use the "Deploy" button in the Replit interface');
    console.log('2. Run "node start-server.js" to start the server');
    
  } catch (error) {
    console.error('Deployment failed:', error);
    process.exit(1);
  }
}

// Run the deployment
deploy();