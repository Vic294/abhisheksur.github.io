const fs = require('fs');
const path = require('path');

console.log('Starting Replit-optimized build process...');

// Clean and create dist directory
const distDir = path.join(__dirname, 'dist');
if (fs.existsSync(distDir)) {
  console.log('Cleaning existing dist directory...');
  fs.rmSync(distDir, { recursive: true, force: true });
}

fs.mkdirSync(distDir, { recursive: true });
console.log('Created dist directory');

// Copy our ultra-minimal server files
fs.copyFileSync(
  path.join(__dirname, 'index.js'),
  path.join(distDir, 'index.js')
);
console.log('Copied index.js to dist directory');

fs.copyFileSync(
  path.join(__dirname, 'index.js'),
  path.join(distDir, 'server.js')
);
console.log('Copied index.js as server.js to dist directory');

// Create a minimal package.json
const packageJson = {
  "name": "abhishek-sur-portfolio",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
};

fs.writeFileSync(
  path.join(distDir, 'package.json'),
  JSON.stringify(packageJson, null, 2)
);
console.log('Created package.json in dist directory');

// Copy HTML files
const htmlFiles = ['index.html', 'blog.html', 'blog-post.html', 'blog-ai-blockchain.html'];
htmlFiles.forEach(file => {
  const sourcePath = path.join(__dirname, file);
  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, path.join(distDir, file));
    console.log(`Copied ${file} to dist directory`);
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
    console.log(`Copied ${file} to dist directory`);
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
    console.log(`Copied ${dir} directory to dist`);
  } else {
    console.log(`Warning: ${dir} directory not found, skipping`);
  }
});

// Create a health-check test HTML file
const healthCheckHtml = `<!DOCTYPE html>
<html>
<head>
  <title>Health Check Passed</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; text-align: center; }
    .success { color: green; }
    .message { border: 1px solid #ddd; padding: 20px; margin: 20px 0; }
  </style>
</head>
<body>
  <h1 class="success">✓ Health Check Passed</h1>
  <div class="message">
    <p>This means the server is correctly responding to health checks.</p>
    <p>Go to <a href="index.html">the main page</a> to view the actual website.</p>
  </div>
  <hr>
  <p>Abhishek Sur - Portfolio Website</p>
</body>
</html>`;

fs.writeFileSync(path.join(distDir, 'health-check.html'), healthCheckHtml);
console.log('Created health-check.html in dist directory');

// Create a README for deployment instructions
const readmeContent = `# Abhishek Sur Portfolio - Replit Deployment

## IMPORTANT DEPLOYMENT INSTRUCTIONS

This server is specifically optimized for Replit deployment:

1. The server MUST listen on port 3000 (not 5000) as required by Replit
2. The root path (/) MUST return a plain text "OK" response with status 200
3. Do not modify the health check handling in index.js

## How this works:

- The server first handles health checks at the root path (/)
- After passing health checks, it serves the actual website content
- To view the website, navigate to /index.html after deployment

## Testing locally:

\`\`\`
node index.js
curl http://localhost:3000/   # Should return "OK"
\`\`\`

## Deployment checks:

1. Verify port 3000 is used
2. Verify root path returns text/plain "OK"
3. Website content is at /index.html
`;

fs.writeFileSync(path.join(distDir, 'README.md'), readmeContent);
console.log('Created README.md in dist directory');

console.log('Replit-optimized build completed successfully!');