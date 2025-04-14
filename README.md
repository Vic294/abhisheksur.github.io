# Abhishek Sur - Personal Portfolio Website

A modern, responsive personal portfolio website for Abhishek Sur that showcases professional experience, academic achievements, and technical expertise through an interactive and engaging web interface.

## Features

- Responsive design that works on mobile, tablet, and desktop
- Modern React.js frontend with interactive elements
- Tailwind CSS styling for a clean, professional look
- Content sections highlighting education, work experience, and skills
- Optimized for fast loading and SEO performance

## Tech Stack

- React.js frontend with Vite configuration
- TypeScript for type-safe development
- Tailwind CSS for responsive styling
- DaisyUI components for enhanced UI elements
- FontAwesome icons for visual elements

## Project Structure

```
├── src/              # Source code
│   ├── assets/       # Static assets
│   ├── components/   # Reusable UI components
│   ├── App.jsx       # Main application component
│   ├── index.css     # Global styles
│   └── main.jsx      # Application entry point
├── public/           # Public assets
├── dist/             # Production build output
└── attached_assets/  # Original assets for the project
```

## Development

To start the development server:

```bash
./dev.sh
```

## Deployment

To build and deploy the website:

```bash
./deploy.sh
```

This will guide you through the deployment process with options for:
1. Manual deployment to GitHub Pages
2. Automatic deployment (with proper GitHub token permissions)

See `DEPLOYMENT_GUIDE.md` for detailed deployment instructions.

## Scripts

- `build.sh` - Builds the website and creates a deployment package
- `dev.sh` - Starts the development server
- `deploy.sh` - Interactive deployment tool