# Abhishek Sur - Personal Portfolio

A modern, responsive personal portfolio website showcasing Abhishek Sur's professional experience, academic achievements, and technical expertise.

## Deployment

This website is automatically deployed to GitHub Pages whenever changes are pushed to the main branch.

### Deployment URLs

- Live website: [https://abhisheksur.github.io](https://abhisheksur.github.io)

### GitHub Actions Deployment

The project is configured with GitHub Actions for continuous integration and deployment:

- Automatic deployments when changes are pushed to the main branch
- The site is deployed to the `gh-pages` branch using GitHub Actions
- Manual deployment option using the GitHub Actions interface

### Manual Deployment

If you need to manually deploy the website:

1. Make sure you have access to the GitHub repository
2. Run the build and deployment scripts:
   ```
   ./build.sh
   ./deploy.sh
   ```

### Repository Structure

- `main` branch: Contains the source code
- `gh-pages` branch: Contains the built website deployed to GitHub Pages
- GitHub Pages: Serves the built website from the `gh-pages` branch of the [abhisheksur.github.io](https://github.com/abhisheksur/abhisheksur.github.io) repository

## Local Development

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

## Tech Stack

- React.js frontend
- Vite build system
- Responsive design
- Dynamic content rendering

## GitHub Pages Configuration

This portfolio is set up as a user site (username.github.io), which means:

1. The repository name is `abhisheksur.github.io`
2. The site is deployed to the `gh-pages` branch
3. The site will be accessible at `https://abhisheksur.github.io/`