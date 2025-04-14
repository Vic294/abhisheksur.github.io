# Deployment Guide for Abhishek Sur's Personal Website

This guide provides step-by-step instructions for deploying the website to GitHub Pages.

## Prerequisites

- A GitHub account
- Git installed on your local machine
- Node.js and npm installed on your local machine

## Setting Up GitHub Repository

1. Create a new repository on GitHub named `username.github.io`, where `username` is your GitHub username. For example, `abhisheksur.github.io`.

2. This special repository name tells GitHub that this is your personal website.

## Preparing Your Project for Deployment

The project has been configured with GitHub Pages deployment in mind:

1. The `vite.config.js` file is already configured with:
   ```javascript
   base: './' // This enables relative paths for assets
   ```

2. React Router is configured to use HashRouter which works well with GitHub Pages.

3. All image and asset references use relative paths.

## Deployment Steps

### Method 1: Manual Deployment

1. Build your project locally:
   ```
   npm run build
   ```

2. The build process will create a `dist` directory with your compiled site.

3. Create a new branch named `gh-pages`:
   ```
   git checkout -b gh-pages
   ```

4. Move the contents of the `dist` directory to the root of your repository:
   ```
   cp -r dist/* .
   ```

5. Add, commit, and push the changes:
   ```
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin gh-pages
   ```

6. On GitHub, go to your repository settings, scroll down to the "GitHub Pages" section, and select the `gh-pages` branch as the source.

### Method 2: Using GitHub Actions (Recommended)

1. Create a `.github/workflows` directory in your repository:
   ```
   mkdir -p .github/workflows
   ```

2. Create a file named `deploy.yml` in this directory with the following content:

   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches:
         - main  # Set this to the branch you want to deploy from

   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - name: Checkout
           uses: actions/checkout@v2

         - name: Set up Node.js
           uses: actions/setup-node@v2
           with:
             node-version: '16'

         - name: Install dependencies
           run: npm ci

         - name: Build
           run: npm run build

         - name: Deploy
           uses: JamesIves/github-pages-deploy-action@4.1.4
           with:
             branch: gh-pages  # The branch the action should deploy to
             folder: dist      # The folder the action should deploy
   ```

3. Commit and push this file to your repository:
   ```
   git add .github/workflows/deploy.yml
   git commit -m "Add GitHub Actions workflow"
   git push origin main
   ```

4. GitHub Actions will automatically build and deploy your site whenever you push changes to the main branch.

## Verifying Your Deployment

1. Go to your GitHub repository settings.

2. Scroll down to the "GitHub Pages" section.

3. You should see a message saying "Your site is published at https://yourusername.github.io".

4. Click on the link to verify that your site is deployed correctly.

## Troubleshooting

If your site is not displaying correctly, check the following:

1. Ensure all asset paths use relative URLs (starting with `./` rather than `/`).

2. Make sure the `base` option in `vite.config.js` is set to `'./'`.

3. Confirm that the React Router is using `HashRouter` instead of `BrowserRouter`.

4. Check the GitHub Actions tab in your repository to see if there were any errors during deployment.

5. Verify that images and assets are properly bundled in the `dist` directory.

## Updating Your Website

To update your website:

1. Make your changes locally.

2. Test your changes with `npm run dev`.

3. Commit and push your changes to the main branch.

4. If using GitHub Actions, the deployment will happen automatically.

5. If using manual deployment, repeat the deployment steps above.

## Custom Domain (Optional)

If you want to use a custom domain instead of `username.github.io`:

1. Purchase a domain from a domain registrar (like Namecheap, GoDaddy, etc.).

2. In your GitHub repository, go to Settings > Pages.

3. Under "Custom domain", enter your domain name and click "Save".

4. Follow the instructions to configure your domain's DNS settings.

For more information, refer to [GitHub's documentation on custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).