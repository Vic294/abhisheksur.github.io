# Deployment Guide for Abhishek Sur's Personal Website

## Option 1: Manual Deployment to GitHub Pages

1. Download the `abhisheksur-website-latest.zip` file from this Replit
2. Extract the zip file on your local machine
3. Go to your GitHub repository at https://github.com/Vic294/abhisheksur.github.io
4. Click on "Add file" > "Upload files"
5. Drag and drop all the extracted files or use the file selector
6. Commit the changes directly to the main branch
7. Wait for GitHub Pages to build and deploy your site

## Option 2: Deploy from Replit directly (requires workflow permission)

To deploy directly from Replit, you'll need a GitHub token with workflow permission:

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Fine-grained tokens
2. Update your token to include the "workflow" permission
3. Update the GITHUB_TOKEN secret in your Replit
4. Use the auto-push.sh script to push all changes

## Post-Deployment

After deployment, your site will be available at:
- https://vic294.github.io/abhisheksur.github.io/ (with repository name in URL)
- OR, if you've set up a custom domain: https://abhisheksur.github.io/

## Troubleshooting

If you encounter errors during deployment:

1. Check that all files were properly uploaded to GitHub
2. Verify GitHub Pages is enabled in repository settings
3. Check if build and deployment workflow ran successfully
4. For custom domains, ensure DNS settings are correctly configured