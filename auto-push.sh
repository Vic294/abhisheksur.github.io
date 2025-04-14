#!/bin/bash

# Auto-push script for GitHub

# Configure git with token-based authentication
git_push() {
  # Set the repository URL with the token for authentication
  REPO_URL="https://${GITHUB_TOKEN}@github.com/Vic294/abhisheksur.github.io.git"
  
  # Add all changes except workflow files
  git add .
  
  # Remove .github/workflows from staging
  git reset -- .github/workflows
  
  # Commit with timestamp
  git commit -m "Auto update: $(date)"
  
  # Push to GitHub
  git push "$REPO_URL" main
}

echo "Starting GitHub auto-push..."
git_push
echo "Push completed!"