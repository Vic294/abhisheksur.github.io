#!/bin/bash

# ===================================================
# Build Script for Abhishek Sur's Portfolio Website
# ===================================================

echo "📦 Starting build process..."

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "📥 Installing dependencies..."
  npm install
fi

# Build the project
echo "🔨 Building your website..."
npm run build

# Create .nojekyll file to prevent Jekyll processing
echo "📄 Creating .nojekyll file..."
touch dist/.nojekyll

echo "✅ Build completed successfully!"
echo "Your website is now ready for deployment."
echo "Run './deploy.sh' to deploy to GitHub Pages."