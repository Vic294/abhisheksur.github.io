#!/bin/bash

echo "===== Fixing GitHub Pages Deployment ====="
echo "This script will update the GitHub workflow file and push."
echo 

# Make sure the token is available
if [ -z "$GITHUB_TOKEN" ]; then
  echo "⚠️ GitHub token not found."
  echo "Please set the GITHUB_TOKEN environment variable with workflow scope permission."
  exit 1
fi

# Set up Git configuration
git config --global user.name "GitHub Actions Bot"
git config --global user.email "actions@github.com"

# Add only the workflow file
echo "Adding workflow file to Git..."
git add .github/workflows/deploy.yml -f

# Commit with timestamp
echo "Committing changes..."
git commit -m "Fix GitHub workflow file: $(date)"

# Push to GitHub
echo "Pushing to GitHub..."
REPO_URL="https://${GITHUB_TOKEN}@github.com/Vic294/abhisheksur.github.io.git"
git push "$REPO_URL" main

# Check if the push was successful
if [ $? -eq 0 ]; then
  echo
  echo "✅ Successfully pushed updated workflow to GitHub!"
  echo "GitHub Actions will now attempt to build and deploy your site."
  echo "You can check the deployment status at:"
  echo "https://github.com/Vic294/abhisheksur.github.io/actions"
  echo
  echo "If this doesn't work, consider trying a simpler approach:"
  echo "1. Go to GitHub repository Settings"
  echo "2. Navigate to Pages"
  echo "3. Set branch to 'main' and folder to '/docs' or '/'"
  echo "4. Push your built files directly to the main branch in that folder"
else
  echo
  echo "❌ Failed to push to GitHub."
  echo "Please check your token permissions and try again."
fi