#!/bin/bash

echo "===== Deploying React App to GitHub Pages ====="
echo "This script builds and deploys the React application to the gh-pages branch."

# Check if GitHub token is available
if [ -z "$GITHUB_TOKEN" ]; then
  echo "⚠️ GitHub token not found."
  echo "Please set the GITHUB_TOKEN environment variable."
  exit 1
fi

# First copy the static HTML and blog files
echo "Step 1: Preparing static HTML files..."
cp index.html blog.html blog-post.html blog-ai-blockchain.html dist/

# Copy Resume and other assets
echo "Step 2: Copying assets and resume..."
mkdir -p dist/assets
# If assets directory exists and has files, copy them
if [ -d "./assets" ] && [ "$(ls -A ./assets 2>/dev/null)" ]; then
  cp -r ./assets/* ./dist/assets/ || true
fi
# Copy directly from attached_assets
if [ -d "./attached_assets" ]; then
  cp -r ./attached_assets/* ./dist/assets/ || true
fi
cp AbhishekSur-Resume.pdf dist/
cp AbhishekSur-Resume.docx dist/

# Create a .nojekyll file to prevent GitHub from processing with Jekyll
touch dist/.nojekyll

# Create a temporary directory for the GitHub Pages branch
echo "Step 3: Preparing the gh-pages branch..."

# Create and move to a temp directory
mkdir -p temp_deploy
cp -r dist/* temp_deploy/

# Create a .nojekyll file to prevent GitHub from processing with Jekyll
touch temp_deploy/.nojekyll

# Setup git in the temp_deploy directory
cd temp_deploy
git init
git checkout -b gh-pages

# Configure git
git config user.name "GitHub Pages Deployment"
git config user.email "deployment@example.com"

# Add all files
git add .

# Commit
git commit -m "Deploy: $(date)"

# Set the remote using the token
REPO_URL="https://${GITHUB_TOKEN}@github.com/Vic294/abhisheksur.github.io.git"
git remote add origin "$REPO_URL"

# Force push to gh-pages branch
echo "Step 4: Pushing to gh-pages branch..."
git push -f origin gh-pages

if [ $? -eq 0 ]; then
  echo "✅ Successfully deployed to GitHub Pages!"
  echo "Your site should be available at: https://vic294.github.io/abhisheksur.github.io/"
  echo "Note: It may take a few minutes for the changes to appear."
else
  echo "❌ Deployment failed. Check your GitHub token and permissions."
fi

# Clean up
cd ..
rm -rf temp_deploy

echo "===== Deployment process completed ====="