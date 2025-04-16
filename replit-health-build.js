/**
 * REPLIT DEPLOYMENT BUILD PROCESS
 * 
 * This script builds the deployment package for Replit
 * with a focus on ensuring health checks work properly.
 */

const fs = require('fs');
const path = require('path');

console.log('Starting Replit health-optimized build...');

// Clean and create dist directory
const distDir = path.join(__dirname, 'dist');
if (fs.existsSync(distDir)) {
  console.log('Cleaning existing dist directory...');
  fs.rmSync(distDir, { recursive: true, force: true });
}

fs.mkdirSync(distDir, { recursive: true });
console.log('Created dist directory');

// Copy our health-optimized server as both index.js and server.js
// This ensures the server will run regardless of which name Replit expects
fs.copyFileSync(
  path.join(__dirname, 'replit-health-server.js'),
  path.join(distDir, 'index.js')
);
console.log('Copied replit-health-server.js as index.js');

fs.copyFileSync(
  path.join(__dirname, 'replit-health-server.js'),
  path.join(distDir, 'server.js')
);
console.log('Copied replit-health-server.js as server.js');

// Also include the minimal server as a fallback
fs.copyFileSync(
  path.join(__dirname, 'minimal-health-server.js'),
  path.join(distDir, 'minimal-health-server.js')
);
console.log('Copied minimal-health-server.js');

// Create a minimal package.json
const packageJson = {
  "name": "abhishek-sur-portfolio",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "minimal": "node minimal-health-server.js"
  }
};

fs.writeFileSync(
  path.join(distDir, 'package.json'),
  JSON.stringify(packageJson, null, 2)
);
console.log('Created package.json');

// Copy HTML files
const htmlFiles = ['index.html', 'blog.html', 'blog-post.html', 'blog-ai-blockchain.html'];
htmlFiles.forEach(file => {
  const sourcePath = path.join(__dirname, file);
  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, path.join(distDir, file));
    console.log(`Copied ${file}`);
  } else {
    console.log(`Warning: ${file} not found, skipping`);
  }
});

// Copy resume files
const resumeFiles = ['AbhishekSur-Resume.pdf', 'AbhishekSur-Resume.docx'];
resumeFiles.forEach(file => {
  const sourcePath = path.join(__dirname, file);
  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, path.join(distDir, file));
    console.log(`Copied ${file}`);
  } else {
    console.log(`Warning: ${file} not found, skipping`);
  }
});

// Recursively copy directories
const copyDirectory = (source, target) => {
  if (!fs.existsSync(source)) return;
  if (!fs.existsSync(target)) fs.mkdirSync(target, { recursive: true });
  
  const entries = fs.readdirSync(source, { withFileTypes: true });
  
  for (const entry of entries) {
    const sourcePath = path.join(source, entry.name);
    const targetPath = path.join(target, entry.name);
    
    if (entry.isDirectory()) {
      copyDirectory(sourcePath, targetPath);
    } else {
      fs.copyFileSync(sourcePath, targetPath);
    }
  }
};

// Copy assets folders
['assets', 'attached_assets'].forEach(dir => {
  const source = path.join(__dirname, dir);
  const target = path.join(distDir, dir);
  
  if (fs.existsSync(source)) {
    copyDirectory(source, target);
    console.log(`Copied ${dir} directory`);
  } else {
    console.log(`Warning: ${dir} directory not found, skipping`);
  }
});

// Create deployment instructions
const readmeContent = `# Abhishek Sur Portfolio - Replit Deployment

## IMPORTANT: Health Check Configuration

This package has been specifically designed to pass Replit health checks:

1. The server listens on port 5000
2. The root path (/) returns a 200 OK with plain text "OK" response
3. The server uses the pure Node.js http module to ensure maximum compatibility

## Deployment Options

### Standard Deployment
Use the \`server.js\` file as your main entry point:
\`\`\`
node server.js
\`\`\`

### Fallback (Minimal) Deployment
If the standard deployment fails health checks, try the minimal server:
\`\`\`
node minimal-health-server.js
\`\`\`

## Accessing the Website

After deploying, the website content is available at:
https://yourdomain.replit.app/index.html

## Debugging

If deployment still fails:
1. Check Replit logs for specific errors
2. Test the health check locally: \`curl http://localhost:5000/\`
3. Try the minimal server as a last resort
`;

fs.writeFileSync(path.join(distDir, 'README.md'), readmeContent);
console.log('Created README.md');

console.log('Health-optimized build completed successfully!');