const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Starting build process...');

try {
  // Clean or create the dist directory
  const distDir = path.join(__dirname, 'dist');
  if (fs.existsSync(distDir)) {
    console.log('Cleaning existing dist directory...');
    fs.rmSync(distDir, { recursive: true, force: true });
  }
  
  fs.mkdirSync(distDir, { recursive: true });
  console.log('Created dist directory');

  // Create a package.json in the dist folder
  const packageJson = {
    "name": "abhishek-sur-portfolio",
    "version": "1.0.0",
    "description": "Personal portfolio website for Abhishek Sur",
    "main": "index.js",
    "scripts": {
      "start": "node index.js"
    },
    "engines": {
      "node": ">=14.0.0"
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

  // Copy server.js and index.js to root of dist folder
  fs.copyFileSync(
    path.join(__dirname, 'server.js'),
    path.join(distDir, 'server.js')
  );
  console.log('Copied server.js to dist directory');

  fs.copyFileSync(
    path.join(__dirname, 'index.js'),
    path.join(distDir, 'index.js')
  );
  console.log('Copied index.js to dist directory');

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

  // Copy PDF and DOCX files (resume)
  const documentFiles = ['AbhishekSur-Resume.pdf', 'AbhishekSur-Resume.docx'];
  documentFiles.forEach(file => {
    const sourcePath = path.join(__dirname, file);
    if (fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, path.join(distDir, file));
      console.log(`Copied ${file} to dist directory`);
    } else {
      console.log(`Warning: ${file} not found, skipping`);
    }
  });

  // Copy assets folders recursively
  const copyDirectoryRecursive = (source, target) => {
    if (!fs.existsSync(source)) {
      console.log(`Warning: Source directory ${source} does not exist, skipping`);
      return;
    }

    if (!fs.existsSync(target)) {
      fs.mkdirSync(target, { recursive: true });
    }

    const entries = fs.readdirSync(source, { withFileTypes: true });

    for (const entry of entries) {
      const sourcePath = path.join(source, entry.name);
      const targetPath = path.join(target, entry.name);

      if (entry.isDirectory()) {
        copyDirectoryRecursive(sourcePath, targetPath);
      } else {
        fs.copyFileSync(sourcePath, targetPath);
      }
    }
  };

  // Copy assets folders
  const assetFolders = ['assets', 'attached_assets'];
  assetFolders.forEach(folder => {
    const sourcePath = path.join(__dirname, folder);
    const targetPath = path.join(distDir, folder);
    
    if (fs.existsSync(sourcePath)) {
      copyDirectoryRecursive(sourcePath, targetPath);
      console.log(`Copied ${folder} folder to dist directory`);
    } else {
      console.log(`Warning: ${folder} directory not found, skipping`);
    }
  });

  // Detect if we need to create a .nojekyll file
  const nojekyllPath = path.join(__dirname, '.nojekyll');
  if (fs.existsSync(nojekyllPath)) {
    fs.writeFileSync(path.join(distDir, '.nojekyll'), '');
    console.log('Created .nojekyll file in dist directory');
  }

  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed with error:', error);
  process.exit(1);
}