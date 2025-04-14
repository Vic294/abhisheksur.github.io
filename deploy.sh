#!/bin/bash

# ===================================================
# Automated GitHub Pages Deployment Script for Vic294
# ===================================================

echo "📦 Starting deployment process..."

# Configure Git (if needed)
if [ -z "$(git config --get user.name)" ]; then
  echo "⚙️ Setting up Git configuration..."
  git config --global user.name "GitHub Actions"
  git config --global user.email "actions@github.com"
fi

# Make sure we're on the main branch
echo "🔄 Switching to main branch..."
git checkout main || { echo "❌ Failed to switch to main branch"; exit 1; }

# Save any uncommitted changes
echo "💾 Saving any uncommitted changes..."
git add .
git commit -m "Save changes before deployment" || echo "No changes to commit"

# Build the project
echo "🔨 Building your website..."
npm run build || { echo "❌ Build failed"; exit 1; }

# Create .nojekyll file to prevent Jekyll processing
touch dist/.nojekyll

# Create a CNAME file if you have a custom domain
# echo "your-custom-domain.com" > dist/CNAME

# Prepare for deployment
echo "📝 Preparing files for deployment..."
rm -rf .deploy_temp
mkdir -p .deploy_temp
cp -r dist/* .deploy_temp/
cp dist/.nojekyll .deploy_temp/

# Deploy to main branch (since we're using the main branch for GitHub Pages)
echo "🚀 Pushing to GitHub..."
cd .deploy_temp
git init
git add .
COMMIT_MESSAGE="Deployment: $(date)"
git commit -m "$COMMIT_MESSAGE"
git branch -M main
git remote add origin https://github.com/Vic294/Vic294.github.io.git
git push -f origin main

# Clean up
cd ..
rm -rf .deploy_temp

echo "✅ Deployment completed successfully!"
echo "Your website should be available at https://vic294.github.io/"
echo "Note: It may take a few minutes for changes to appear online."