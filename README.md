# Abhishek Sur Portfolio Website

This repository contains the personal portfolio website for Abhishek Sur, an MBA (XLRI Jamshedpur) and B.Tech (NIT Durgapur) graduate with leadership experience in supply chain strategy, finance, and wealth management.

## Deployment Instructions

### Option 1: Deploy on Replit

1. Click the **Run** button in Replit to start the server
2. For manual deployment, use the "Deploy" button in Replit

The website is configured to automatically handle Replit's health checks by:
- Responding to the root path `/` with a 200 OK status and `text/plain` content type
- Serving the main website content at `/index.html`

### Option 2: Manual Deployment

For deployment on other platforms:

1. Run the build script: `node simple-build.js`
2. This will create a `dist` directory with all required files
3. Deploy the contents of the `dist` directory
4. Make sure the server is started with: `node index.js` or `node server.js`
5. Alternatively, you can use the zipped deployment package: `abhisheksur-website-deploy.zip`

### Development

To run the server locally:

```bash
./run-server.sh
```

This will start the server on port 5000 (or the value of the PORT environment variable).

## Health Check Verification

To verify that the health check is working properly:

1. Start the server
2. Access the health check page at: `/health.html`
3. This tool will test both the root path and the dedicated health endpoint

## Key Features

- Resume download in both PDF and DOCX formats
- Blog with thought leadership content, including research on AI and blockchain in life insurance
- Responsive design for all devices
- Optimized server configuration for reliable hosting

## Directory Structure

- `simple-server.js` - The production server optimized for deployment
- `index.js` - The entry point that loads the server
- `health.html` - A tool to verify the health check functionality
- `simple-build.js` - Script to build the deployment package