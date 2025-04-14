#!/bin/bash

echo "===== GitHub Pages Deployment Script ====="
echo "This script will deploy your website to GitHub Pages."
echo 

# Build the website
echo "Step 1: Building the website..."
./build.sh

if [ $? -ne 0 ]; then
  echo "Build failed. Deployment aborted."
  exit 1
fi

echo
echo "Step 2: Setting up GitHub Pages workflow..."

# Make sure the token is available
if [ -z "$GITHUB_TOKEN" ]; then
  echo "⚠️ GitHub token not found."
  echo "Please set the GITHUB_TOKEN environment variable with workflow scope permission."
  exit 1
fi

# Set up Git configuration
git config --global user.name "GitHub Actions Bot"
git config --global user.email "actions@github.com"

# Add all the files including the workflow and built files
echo "Adding files to Git..."
git add .github/workflows/deploy.yml -f
git add dist -f

# Commit with timestamp
echo "Committing changes..."
git commit -m "Auto deployment: $(date)"

# Push to GitHub
echo "Pushing to GitHub..."
REPO_URL="https://${GITHUB_TOKEN}@github.com/Vic294/abhisheksur.github.io.git"
git push "$REPO_URL" main

# Check if the push was successful
if [ $? -eq 0 ]; then
  echo
  echo "✅ Successfully pushed to GitHub!"
  echo "GitHub Actions will now build and deploy your site."
  echo "Your website will be available at https://vic294.github.io/abhisheksur.github.io/ in a few minutes."
  echo
  echo "You can check the deployment status at:"
  echo "https://github.com/Vic294/abhisheksur.github.io/actions"
else
  echo
  echo "❌ Failed to push to GitHub."
  echo "Please check your token permissions and try again."
fi