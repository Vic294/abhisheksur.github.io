const fs = require('fs');
const path = require('path');

console.log('Starting final build process...');

// Clean and create dist directory
const distDir = path.join(__dirname, 'dist');
if (fs.existsSync(distDir)) {
  console.log('Cleaning existing dist directory...');
  fs.rmSync(distDir, { recursive: true, force: true });
}

fs.mkdirSync(distDir, { recursive: true });
console.log('Created dist directory');

// Copy our deploy.js as both index.js and server.js
fs.copyFileSync(
  path.join(__dirname, 'deploy.js'),
  path.join(distDir, 'index.js')
);
console.log('Copied deploy.js as index.js to dist directory');

fs.copyFileSync(
  path.join(__dirname, 'deploy.js'),
  path.join(distDir, 'server.js')
);
console.log('Copied deploy.js as server.js to dist directory');

// Create a package.json
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

// Create deployment README 
const readmeContent = `# Abhishek Sur Portfolio Deployment

## IMPORTANT: This version is optimized for Replit deployment

This server has been specially modified to:
1. Always respond to the root path (/) with a 200 OK plain text response to satisfy health checks
2. The actual website content is served from static files

## To deploy:

1. Ensure port 5000 is set in the environment variables (PORT=5000)
2. Start the server with: \`node index.js\` or \`node server.js\`
3. The server will:
   - Respond to health checks at the root path
   - Serve website content from HTML files

## Accessing the website:

- Access the site content at: /index.html
- All static files (resumes, etc.) are available in their original paths

`;

fs.writeFileSync(path.join(distDir, 'README.md'), readmeContent);
console.log('Created README.md in dist directory');

console.log('Final build completed successfully!');