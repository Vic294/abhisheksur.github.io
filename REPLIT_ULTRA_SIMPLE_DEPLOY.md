# Ultra-Simple Replit Deployment Guide

This guide provides the simplest possible process to successfully deploy on Replit.

## Step 1: Prepare your Replit for deployment

1. In your Replit, go to the Shell tab and run:
   ```
   chmod +x deploy.sh
   ```

## Step 2: Configure the Run Button

1. Click on the "..." menu in the top-right corner of Replit
2. Select "Secrets"
3. Add a new secret:
   - Key: `RUN_COMMAND`
   - Value: `bash deploy.sh`

## Step 3: Deploy

1. Click the "Deploy" button at the top of the Replit interface
2. Wait for Replit to complete the deployment process
3. If successful, you'll see a URL to your deployed application

## Troubleshooting

If deployment fails, check these common issues:

1. **Port Issue**: Make sure the server listens on the port specified by the environment variable PORT or fallback to 5000
2. **Health Check**: The server must respond with "OK" (text/plain) at the root path (/)
3. **Process Exit**: The server process must not exit prematurely

Use the `replit-deploy.js` file which contains the absolute minimum code needed to pass health checks.

## Replit Deployment Requirements

1. The server must listen on the port specified by the `PORT` environment variable
2. The server must respond to GET requests at the root path (/) with:
   - Status code: 200
   - Content-Type: text/plain
   - Body: "OK"
3. The server must be accessible on 0.0.0.0, not just localhost
4. The server must not exit - it should run indefinitely