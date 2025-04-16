const fs = require('fs');
const path = require('path');

console.log('Starting ultra-simple build process...');

// Clean and create dist directory
const distDir = path.join(__dirname, 'dist');
if (fs.existsSync(distDir)) {
  console.log('Cleaning existing dist directory...');
  fs.rmSync(distDir, { recursive: true, force: true });
}

fs.mkdirSync(distDir, { recursive: true });
console.log('Created dist directory');

// Copy our ultra-simple server as both index.js and server.js
fs.copyFileSync(
  path.join(__dirname, 'ultra-simple-server.js'),
  path.join(distDir, 'index.js')
);
console.log('Copied ultra-simple-server as index.js to dist directory');

fs.copyFileSync(
  path.join(__dirname, 'ultra-simple-server.js'),
  path.join(distDir, 'server.js')
);
console.log('Copied ultra-simple-server as server.js to dist directory');

// Create a bare-minimum package.json
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

// Create a minimal index.html to test if the server works
const minimalHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Abhishek Sur Portfolio</title>
</head>
<body>
  <h1>Abhishek Sur Portfolio</h1>
  <p>This is a minimal test page.</p>
</body>
</html>`;

fs.writeFileSync(path.join(distDir, 'index.html'), minimalHtml);
console.log('Created minimal index.html in dist directory');

// Copy the real resources after server is verified to work
const copyOriginalHtmlFiles = [
  'index.html', 
  'blog.html', 
  'blog-post.html', 
  'blog-ai-blockchain.html'
];

copyOriginalHtmlFiles.forEach(file => {
  const sourcePath = path.join(__dirname, file);
  if (fs.existsSync(sourcePath)) {
    // Create a backup first
    fs.copyFileSync(sourcePath, path.join(distDir, file + '.backup'));
    console.log(`Created backup of ${file} in dist directory`);
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

console.log('Ultra-simple build completed successfully!');