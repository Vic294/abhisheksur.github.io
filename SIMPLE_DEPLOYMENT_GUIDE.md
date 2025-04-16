# Simple Replit Deployment Guide

## Pre-Deployment Checklist
Before trying to deploy on Replit, ensure:

1. You have a proper server file (we created `replit-server.js`) that:
   - Listens on the PORT environment variable
   - Returns "OK" with Content-Type: text/plain for health checks
   - Binds to 0.0.0.0 (not localhost)

2. You have a start script (we created `start.sh`) that:
   - Correctly starts your server
   - Has proper execute permissions

## Steps to Deploy on Replit

### 1. Verify Server Functionality
First, test your server locally to make sure it works:
```
node replit-server.js
```
You should see output like:
```
Health check server running on port 3000
Server will respond with "OK" to all requests
```

### 2. Deploy Steps
1. When in Replit, click the "Deploy" button in the interface
2. Replit will use `replit-server.js` to handle requests
3. If deployment fails, check the error message and logs

### 3. Troubleshooting Deployment Errors
If you see a "Promotion failed" error:

1. Make sure your server responds with exactly "OK" (text/plain) to root path requests
2. Check that your server listens on the PORT environment variable
3. Ensure no syntax errors exist in your server code
4. Try running the server locally first to confirm it works

## Key Files for Deployment
- `replit-server.js`: Minimal server that passes Replit health checks
- `start.sh`: Script to start the server

## Common Issues
1. Server not binding to correct port (use `process.env.PORT || 3000`)
2. Server not binding to correct IP (use `0.0.0.0` not `localhost`)
3. Not returning proper Content-Type for health checks (must be `text/plain`)
4. Not returning exactly "OK" for health checks (case sensitive)