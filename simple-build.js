const fs = require('fs');
const path = require('path');

console.log('Starting simple build process...');

// Clean and create dist directory
const distDir = path.join(__dirname, 'dist');
if (fs.existsSync(distDir)) {
  console.log('Cleaning existing dist directory...');
  fs.rmSync(distDir, { recursive: true, force: true });
}

fs.mkdirSync(distDir, { recursive: true });
console.log('Created dist directory');

// Copy our simplified server
fs.copyFileSync(
  path.join(__dirname, 'simple-server.js'),
  path.join(distDir, 'server.js')
);
console.log('Copied simplified server as server.js to dist directory');

// Create a bare-minimum package.json
const packageJson = {
  "name": "abhishek-sur-portfolio",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.17.1"
  }
};

fs.writeFileSync(
  path.join(distDir, 'package.json'),
  JSON.stringify(packageJson, null, 2)
);
console.log('Created package.json in dist directory');

// Create index.js that just imports server.js
fs.writeFileSync(
  path.join(distDir, 'index.js'),
  "// Load the server\nrequire('./server.js');\n"
);
console.log('Created index.js in dist directory');

// Copy HTML files
const htmlFiles = ['index.html', 'blog.html', 'blog-post.html', 'blog-ai-blockchain.html', 'health.html', 'redirect.html'];
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

// Create .nojekyll file for GitHub Pages compatibility
fs.writeFileSync(path.join(distDir, '.nojekyll'), '');
console.log('Created .nojekyll file');

console.log('Simple build completed successfully!');