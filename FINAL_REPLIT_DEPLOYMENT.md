# FINAL REPLIT DEPLOYMENT INSTRUCTIONS

This document contains complete instructions for deploying your portfolio website on Replit.

## Step 1: Setup Your Run Command

In your Replit, do the following:

1. Go to the Shell tab
2. Make your deploy script executable:
   ```
   chmod +x deploy.sh
   ```
3. Set a Run button secret:
   - Click the lock icon (Secrets) in your Replit
   - Add a new secret:
     - Key: `RUN_COMMAND`
     - Value: `bash deploy.sh`

## Step 2: Choose Your Deployment Server

We've created multiple server options for your deployment:

1. **Ultra-Simple Server** (replit-deploy.js):
   - Bare minimum required for health checks
   - No static file serving (just passes health checks)
   - Very stable but limited functionality

2. **Final Deployment Server** (final-deploy.js):
   - Handles health checks at root path
   - Serves static files for your website
   - Full functionality but slightly more complex

To use the ultra-simple server, modify `deploy.sh` to use `node replit-deploy.js` instead.

## Step 3: Deploy

1. Click the "Deploy" button at the top of your Replit interface
2. Wait for the deployment process to complete
3. If successful, you'll see a URL to your deployed site

## Troubleshooting

If deployment fails, check these issues:

1. **Health Check Failures**:
   - Replit requires your server to return "OK" with Content-Type: text/plain at the root path
   - The server must listen on the port specified by the PORT environment variable
   - Try using the ultra-simple server (replit-deploy.js) first to verify health checks pass

2. **Port Issues**:
   - Ensure your server is binding to 0.0.0.0 (not localhost)
   - The PORT environment variable must be used (with 5000 as fallback)

3. **Process Termination**:
   - Your server must not exit prematurely
   - Check for any unhandled exceptions that might crash the server

## Testing Your Deployment

Use these commands to test your deployment locally:

```bash
# Kill any running Node processes
pkill -f node

# Start your deployment server
PORT=5000 node replit-deploy.js
# or PORT=5000 node final-deploy.js

# In another terminal, test the health check
curl -i http://localhost:5000/
```

The response should show:
- Status: 200
- Content-Type: text/plain
- Body: OK