#!/usr/bin/env bash

# Exit on error
set -e

# Build the project
echo "Building the project..."
npm run build

# Navigate to the dist folder
cd dist

# Create a .nojekyll file to bypass Jekyll processing
echo "Creating .nojekyll file..."
touch .nojekyll

# Initialize git and push to gh-pages branch
echo "Deploying to GitHub Pages..."
git init
git add -A
git commit -m 'Deploy to GitHub Pages'

# Force push to the gh-pages branch
git push -f https://github.com/abhisheksur/abhisheksur.github.io.git master:gh-pages

cd -

echo "Deployment complete! Your site should be live at: https://abhisheksur.github.io/"