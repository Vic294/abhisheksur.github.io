# Deployment Guide for GitHub Pages

This repository is configured for deployment on GitHub Pages. To deploy your changes:

1. Make sure all your changes are committed to the `main` branch
2. Go to the GitHub repository settings
3. Navigate to the Pages section
4. Set the build source to "GitHub Actions"
5. Wait for GitHub to build and deploy your site

Your site will be available at https://abhisheksur.github.io/

## Setting Up GitHub Actions (Optional)

If you want to use GitHub Actions for a more automated deployment, you can add a workflow file:

1. Create a `.github/workflows/deploy.yml` file in your repository
2. Copy the following content to the file:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

# Allow only one concurrent deployment
concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Setup Pages
        uses: actions/configure-pages@v3
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: './dist'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```

Note: To add this workflow, you'll need a GitHub token with workflow scope or need to manually add this file through the GitHub web interface.