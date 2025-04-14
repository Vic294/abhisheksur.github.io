#!/bin/bash

echo "===== Abhishek Sur Website Deployment Tool ====="
echo "This script will build and deploy the React application to GitHub Pages."
echo 

# Check for required tools
if ! command -v git &> /dev/null; then
  echo "Error: git command not found. Please install git."
  exit 1
fi

# Check if we're in the right repository
REPO_URL=$(git config --get remote.origin.url)
if [[ ! $REPO_URL == *"abhisheksur.github.io"* ]]; then
  echo "Warning: This doesn't appear to be the abhisheksur.github.io repository."
  read -p "Continue anyway? (y/n): " CONTINUE
  if [[ $CONTINUE != "y" ]]; then
    exit 1
  fi
fi

# Build the website
echo "Step 1: Building the React application..."
npm run build

if [ $? -ne 0 ]; then
  echo "Build failed. Deployment aborted."
  exit 1
fi

echo "Build successful!"

# Create .nojekyll file to disable Jekyll processing
echo "Creating .nojekyll file..."
touch dist/.nojekyll

# Create a copy of index.html as 404.html for SPA routing
echo "Creating 404.html for SPA routing..."
cp dist/index.html dist/404.html

# Check for GitHub token
if [ -z "$GITHUB_TOKEN" ]; then
  echo
  echo "GitHub token not found. Proceeding with manual deployment."
  echo
  echo "✅ React application build is ready in the 'dist' directory"
  echo "Please follow these steps to deploy manually:"
  echo
  echo "1. Download the contents of the 'dist' directory"
  echo "2. Upload all files to your GitHub repository"
  echo "3. Make sure GitHub Pages is configured to deploy from the correct branch"
  echo
  echo "Alternatively, push the changes to GitHub and let the GitHub Actions workflow handle the deployment."
  exit 0
fi

# Proceed with automatic deployment
echo
echo "GitHub token found. Proceeding with automatic deployment..."

# Create a temporary directory for deployment
TEMP_DIR=$(mktemp -d)
echo "Copying build files to temporary directory..."
cp -r dist/* $TEMP_DIR/

# Switch to gh-pages branch or create it if it doesn't exist
if git rev-parse --verify gh-pages >/dev/null 2>&1; then
  echo "Switching to gh-pages branch..."
  git checkout gh-pages
else
  echo "Creating gh-pages branch..."
  git checkout --orphan gh-pages
  git rm -rf .
fi

# Copy build files to root directory
echo "Copying build files to root directory..."
cp -r $TEMP_DIR/* .

# Add all files to git
echo "Adding files to git..."
git add .

# Commit changes
echo "Committing changes..."
git commit -m "Deploy React application: $(date)"

# Push changes
echo "Pushing changes to GitHub..."
git push "https://${GITHUB_TOKEN}@github.com/Vic294/abhisheksur.github.io.git" gh-pages

if [ $? -ne 0 ]; then
  echo
  echo "⚠️ Automatic deployment failed."
  echo "Please check the error message above or try manual deployment."
  exit 1
fi

# Return to main branch
echo "Returning to main branch..."
git checkout main

echo
echo "✅ Deployment successful!"
echo "Your website will be available soon at https://vic294.github.io/abhisheksur.github.io/"
echo "Please check GitHub Pages settings to ensure it's configured to deploy from the gh-pages branch."