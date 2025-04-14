#!/bin/bash

# Set the repository URL with the token for authentication
REPO_URL="https://${GITHUB_TOKEN}@github.com/Vic294/abhisheksur.github.io.git"

# Create a temporary branch
git checkout -b temp-branch

# Add only the important files
git add src/
git add public/
git add index.html
git add vite.config.js
git add tailwind.config.js
git add postcss.config.js
git add package.json
git add DEPLOYMENT.md

# Commit with timestamp
git commit -m "Auto update: $(date)"

# Push to the temp branch
git push "$REPO_URL" temp-branch --force

# Switch back to main
git checkout main

echo "Pushed to temp-branch. Please merge on GitHub."