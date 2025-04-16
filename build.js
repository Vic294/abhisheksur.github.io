/**
 * BUILD SCRIPT
 * 
 * This script builds the project for production deployment.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Create dist directory if it doesn't exist
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Copy necessary files to dist
const filesToCopy = [
  'index.html',
  'blog.html',
  'blog-ai-blockchain.html',
  'assets',
  'attached_assets',
  'server.js',
  'index.js',
  'minimal-health-server.js',
  'start-server.js',
  'AbhishekSur-Resume.pdf',
  'AbhishekSur-Resume.docx',
];

console.log('Copying files to dist directory...');

filesToCopy.forEach(file => {
  try {
    const srcPath = path.join(__dirname, file);
    const destPath = path.join(distDir, file);
    
    if (fs.existsSync(srcPath)) {
      if (fs.lstatSync(srcPath).isDirectory()) {
        // Copy directory recursively
        execSync(`cp -r "${srcPath}" "${destPath}"`);
        console.log(`✅ Copied directory: ${file}`);
      } else {
        // Copy file
        fs.copyFileSync(srcPath, destPath);
        console.log(`✅ Copied file: ${file}`);
      }
    } else {
      console.log(`⚠️ File not found, skipping: ${file}`);
    }
  } catch (error) {
    console.error(`❌ Error copying ${file}: ${error.message}`);
  }
});

// Create a minimalist package.json for deployment
const packageJson = {
  "name": "abhisheksur-portfolio",
  "version": "1.0.0",
  "description": "Personal portfolio website for Abhishek Sur",
  "main": "server.js",
  "scripts": {
    "start": "node start-server.js"
  },
  "engines": {
    "node": ">=14.0.0"
  }
};

fs.writeFileSync(
  path.join(distDir, 'package.json'),
  JSON.stringify(packageJson, null, 2)
);
console.log('✅ Created package.json');

// Create .replit file for deployment
const replitConfig = `
run = "npm start"
entrypoint = "server.js"

[env]
PORT = "5000"

[nix]
channel = "stable-22_11"

[deployment]
run = ["sh", "-c", "npm start"]
deploymentTarget = "cloudrun"
`;

fs.writeFileSync(
  path.join(distDir, '.replit'),
  replitConfig
);
console.log('✅ Created .replit config');

// Create a README.md file with deployment instructions
const readmeContent = `# Abhishek Sur Portfolio Website

This is the personal portfolio website for Abhishek Sur. The site is built to be deployed on Replit.

## Deployment

1. The server is automatically started using the \`start-server.js\` script
2. The script will find the best available server implementation
3. The server will respond to health checks at the root path (/)
4. The website is accessible at /index.html

## Server Implementations

This package includes multiple server implementations for maximum compatibility:

1. \`server.js\` - Smart server that serves the website at / for regular visitors and returns "OK" for health checks
2. \`index.js\` - Alternative server that always returns "OK" at / and serves the website at /index.html
3. \`minimal-health-server.js\` - Ultra-minimal server that only handles health checks

## Troubleshooting

If deployment fails, make sure:
1. The server is running on port 5000 (or using process.env.PORT)
2. The server responds with "OK" at the root path (/)
3. The Content-Type header is set to "text/plain" for the root path
`;

fs.writeFileSync(
  path.join(distDir, 'README.md'),
  readmeContent
);
console.log('✅ Created README.md');

console.log('\n🎉 Build completed successfully!');
console.log('The deployment package is ready in the dist directory.');
console.log('Upload the contents of the dist directory to Replit for deployment.');