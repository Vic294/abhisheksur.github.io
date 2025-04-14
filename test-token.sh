#!/bin/bash

echo "Testing GitHub token with workflow permissions..."

# Create a test workflow file
mkdir -p .github/workflows
cat > .github/workflows/test.yml << 'EOF'
name: Test Workflow

on:
  workflow_dispatch:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3
      
      - name: Run test command
        run: echo "Token test successful!"
EOF

# Commit and push the test workflow file
git add .github/workflows/test.yml
git commit -m "Add test workflow file"

echo "Pushing test workflow file to GitHub..."
git push "https://${GITHUB_TOKEN}@github.com/Vic294/abhisheksur.github.io.git" main

if [ $? -eq 0 ]; then
  echo "✅ Success! Your token has the workflow permission."
  echo "You can now use the automatic deployment options."
else
  echo "❌ Failed to push workflow file."
  echo "Please check your token permissions and try again."
fi

# Clean up by removing the test workflow file
git rm .github/workflows/test.yml
git commit -m "Remove test workflow file"