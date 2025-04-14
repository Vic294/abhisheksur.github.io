#!/bin/bash

echo "===== Abhishek Sur Website Deployment Tool ====="
echo "This script will help deploy your website."
echo 

# Build the website
echo "Step 1: Building the website..."
./build.sh

if [ $? -ne 0 ]; then
  echo "Build failed. Deployment aborted."
  exit 1
fi

echo
echo "Step 2: Choose deployment method"
echo "1) GitHub Pages (manual upload)"
echo "2) GitHub Pages (auto push - requires token with workflow scope)"
echo "3) Cancel deployment"
read -p "Select option (1-3): " option

case $option in
  1)
    echo
    echo "Manual GitHub Pages deployment selected."
    echo "✅ Website build is ready in abhisheksur-website-dist.zip"
    echo "Please follow these steps:"
    echo "1. Download the zip file"
    echo "2. Extract the contents"
    echo "3. Upload all files to your GitHub repository"
    echo "See DEPLOYMENT_GUIDE.md for detailed instructions."
    ;;
  2)
    echo
    echo "Automatic GitHub Pages deployment selected."
    
    # Check if GitHub token has the right permission
    if [ -z "$GITHUB_TOKEN" ]; then
      echo "⚠️ GitHub token not found."
      echo "Please set the GITHUB_TOKEN environment variable with workflow scope permission."
      exit 1
    fi
    
    echo "Attempting to push to GitHub..."
    git add dist -f
    git commit -m "Auto deployment: $(date)"
    git push "https://${GITHUB_TOKEN}@github.com/Vic294/abhisheksur.github.io.git" main
    
    if [ $? -ne 0 ]; then
      echo
      echo "⚠️ Automatic deployment failed."
      echo "Your token may not have workflow scope permission."
      echo "Please use the manual method (option 1) instead."
    else
      echo
      echo "✅ Deployment successful!"
      echo "Your website will be available soon at https://vic294.github.io/abhisheksur.github.io/"
    fi
    ;;
  *)
    echo
    echo "Deployment cancelled."
    ;;
esac