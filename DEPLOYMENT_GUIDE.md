# Deployment Guide for Abhishek Sur's Portfolio

Follow these steps to deploy your website to GitHub Pages.

## One-Time Setup (Already Completed)

1. ✅ Created GitHub repository named "abhisheksur.github.io"
2. ✅ Configured repository settings for GitHub Pages
3. ✅ Set main branch as the source for GitHub Pages

## Deployment Steps

### Option 1: Deploy using GitHub Actions (Recommended)

1. **Push Your Code to GitHub**
   ```
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Check Deployment Status**
   - Go to your GitHub repository
   - Click on "Actions" tab to see deployment progress
   - Wait for the workflow to complete (usually takes 1-3 minutes)

3. **View Your Live Website**
   - Once deployed, your website will be available at:
   - https://abhisheksur.github.io/

### Option 2: Manual Deployment

If GitHub Actions isn't working for any reason, you can deploy manually:

1. **Build your website locally**
   ```
   ./build.sh
   ```

2. **Deploy to GitHub Pages**
   ```
   ./deploy.sh
   ```

## Troubleshooting

- **404 Page Not Found**: It may take a few minutes for GitHub Pages to reflect changes after deployment
- **Deployment Errors**: Check the GitHub Actions tab for error details
- **Asset Loading Issues**: Make sure all file paths in your code use relative paths

## Making Updates

After your initial deployment, any time you want to update your website:

1. Make your changes
2. Commit and push to GitHub:
   ```
   git add .
   git commit -m "Your update description"
   git push origin main
   ```
3. GitHub Actions will automatically deploy your updates

## Need Help?

If you encounter any issues during deployment, check GitHub's documentation on GitHub Pages:
https://docs.github.com/en/pages