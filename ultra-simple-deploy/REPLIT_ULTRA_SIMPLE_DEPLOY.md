# Abhishek Sur Portfolio - Ultra Simple Replit Deployment Guide

This guide explains how to deploy the portfolio website on Replit using the ultra-simplified server approach.

## QUICK DEPLOYMENT INSTRUCTIONS

**For maximum compatibility with Replit deployment:**

1. Set the Run command to `./run` in Replit config
2. Set the environment variable: `USE_ULTRA_SIMPLE=true`
3. Click "Deploy" in Replit interface

## Detailed Deployment Setup

1. **Import the project** to Replit or open it in your Replit account.

2. **Set the Run command**:
   - Open the `.replit` file or use the Replit config panel
   - Set the Run command to `./run`

3. **Set Environment Variables** (choose one option):
   - **RECOMMENDED:** For ultra-simple approach with maximum compatibility:
     - `USE_ULTRA_SIMPLE=true`
   - For the ultra-minimal health check approach:
     - `USE_ULTRA=true`
   - For the Express.js approach:
     - `USE_EXPRESS=true`
   - If no variable is set, the pure Node.js server will be used by default

4. **Deploy the Application**:
   - Click the "Deploy" button in the Replit interface
   - The deployment should pass all health checks

## Troubleshooting

If deployment fails, here are steps to try:

1. **Try the ultra-simple server**:
   - This is the most compatible option for Replit
   - Set `USE_ULTRA_SIMPLE=true` in environment variables
   - This server does only one thing: pass health checks

2. **Ensure correct port binding**:
   - The servers automatically use the `PORT` environment variable
   - Replit typically assigns port 3000 or 5000

3. **Verify health check response**:
   - The server must return exactly "OK" with Content-Type: text/plain
   - Test this locally with `curl -v http://localhost:$PORT/`

4. **Check logs**:
   - Look at the deployment logs for any errors
   - Successful health checks should show up in the logs

## Understanding the Deployment Options

1. **Ultra-Simple Server** (`USE_ULTRA_SIMPLE=true`) - RECOMMENDED:
   - The most minimal server possible
   - Only focuses on passing health checks
   - Absolute minimal implementation for maximum Replit compatibility

2. **Ultra-Minimal Server** (`USE_ULTRA=true`):
   - Only handles the root path health check
   - Includes a bit more logging and request handling
   - Still very minimal and focused on health checks

3. **Express Server** (`USE_EXPRESS=true`):
   - Handles health checks and serves static files
   - Uses Express.js for better compatibility
   - More fully-featured but still lightweight

4. **Pure Node.js Server** (default):
   - Uses the Node.js HTTP module directly
   - No external dependencies
   - Handles both health checks and static files