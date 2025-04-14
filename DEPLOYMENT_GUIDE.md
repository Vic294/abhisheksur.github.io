# Deployment Guide for Abhishek Sur's Personal Website

## Current Deployment Status

Your website has been successfully deployed to the GitHub repository. There are two ways to enable it:

1. **GitHub Actions** (currently experiencing issues): We've set up a workflow file but it's showing an error.

2. **Static Site Deployment** (recommended): We've pushed your website files to the `/docs` folder.

## To Enable GitHub Pages:

1. Go to your repository: https://github.com/Vic294/abhisheksur.github.io
2. Click on "Settings"
3. Navigate to "Pages" in the left sidebar
4. Under "Build and deployment" section, change the following:
   - Source: "Deploy from a branch"
   - Branch: select "main" branch
   - Folder: select "/docs" folder
5. Click "Save"

Your site will be available in a few minutes at:
- https://vic294.github.io/abhisheksur.github.io/

## Deployment Scripts

Several deployment scripts have been created to help you:

- `build.sh` - Builds the website and creates a ZIP package
- `deploy-static.sh` - Deploys directly to the /docs folder for GitHub Pages
- `github-pages-deploy.sh` - Attempts to deploy using GitHub Actions
- `fix-github-deploy.sh` - Updates the GitHub workflow file

## Troubleshooting

If you encounter errors during deployment:

1. Try the static deployment method (`deploy-static.sh`) which is more reliable
2. Make sure your GitHub token has the right permissions if using GitHub Actions
3. Check the GitHub repository settings for proper Pages configuration
4. For a custom domain, add a CNAME file to the docs folder with your domain name