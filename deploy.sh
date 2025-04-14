#!/bin/bash

# ===================================================
# Automated GitHub Pages Deployment Script
# ===================================================

echo "📦 Starting deployment process..."

# Build the project
echo "🔨 Building your website..."
npm run build

# Create .nojekyll file to prevent Jekyll processing
touch dist/.nojekyll

# Add all changes to git
echo "📝 Adding changes to git..."
git add dist -f

# Commit changes
echo "💾 Committing changes..."
COMMIT_MESSAGE="Deployment: $(date)"
git commit -m "$COMMIT_MESSAGE"

# Push to GitHub
echo "🚀 Pushing to GitHub..."
git push origin main:gh-pages -f

echo "✅ Deployment completed successfully!"
echo "Your website should be available at https://YOUR_USERNAME.github.io/"