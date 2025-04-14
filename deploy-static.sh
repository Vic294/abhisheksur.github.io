#!/bin/bash

echo "===== Static Site Deployment to GitHub Pages ====="
echo "This script will deploy your website without using GitHub Actions."
echo 

# Build the website
echo "Step 1: Building the website..."
./build.sh

if [ $? -ne 0 ]; then
  echo "Build failed. Deployment aborted."
  exit 1
fi

# Make sure the token is available
if [ -z "$GITHUB_TOKEN" ]; then
  echo "⚠️ GitHub token not found."
  echo "Please set the GITHUB_TOKEN environment variable."
  exit 1
fi

# Create docs directory for GitHub Pages
echo "Step 2: Preparing files for GitHub Pages..."
rm -rf docs
mkdir -p docs
cp -R dist/* docs/

# Add a .nojekyll file to prevent Jekyll processing
touch docs/.nojekyll

# Set up Git configuration
git config --global user.name "GitHub Pages Bot"
git config --global user.email "pages@github.com"

# Add the docs directory
echo "Step 3: Adding files to Git..."
git add docs

# Commit with timestamp
echo "Step 4: Committing changes..."
git commit -m "Deploy to GitHub Pages: $(date)"

# Push to GitHub
echo "Step 5: Pushing to GitHub..."
REPO_URL="https://${GITHUB_TOKEN}@github.com/Vic294/abhisheksur.github.io.git"
git push "$REPO_URL" main

# Check if the push was successful
if [ $? -eq 0 ]; then
  echo
  echo "✅ Successfully pushed to GitHub!"
  echo "Go to GitHub repository settings, then Pages section."
  echo "Set the source to 'Deploy from a branch', select 'main' branch and '/docs' folder."
  echo "Your website will be available at https://vic294.github.io/abhisheksur.github.io/ soon."
else
  echo
  echo "❌ Failed to push to GitHub."
  echo "Please check your token permissions and try again."
fi