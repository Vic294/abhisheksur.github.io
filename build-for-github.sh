#!/bin/bash

echo "===== Deploying React App to GitHub Pages ====="
echo "This script builds and deploys the React application to the gh-pages branch."

# Check if GitHub token is available
if [ -z "$GITHUB_TOKEN" ]; then
  echo "⚠️ GitHub token not found."
  echo "Please set the GITHUB_TOKEN environment variable."
  exit 1
fi

# First, ensure we copy all assets to src/assets
echo "Step 1: Copying assets to src/assets directory..."
mkdir -p src/assets
cp -r ./attached_assets/* ./src/assets/

# Copy Resume to public directory for direct access
echo "Step 2: Ensuring public directory has necessary files..."
mkdir -p public
echo "Adding PDF files to public directory..."
find ./attached_assets -name "*.pdf" -exec cp {} ./public/ \;

# Make sure public assets get copied to the build
echo "Step 3: Building the React application..."
npm run build

if [ $? -ne 0 ]; then
  echo "❌ Build failed. Please check the errors above."
  exit 1
fi

echo "✅ React application built successfully!"

# Create a temporary directory for the GitHub Pages branch
echo "Step 4: Preparing the gh-pages branch..."

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
echo "Step 5: Pushing to gh-pages branch..."
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