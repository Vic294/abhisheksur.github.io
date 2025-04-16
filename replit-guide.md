# Abhishek Sur Portfolio - Replit Deployment Guide

## Important: Port and Health Check Configuration

Based on the latest error message from Replit, we've discovered:

1. **Port Configuration**: Replit expects this application to run on port 5000 (not 3000)
2. **Health Check**: Replit checks for a healthy response at the root path (/)

## Deployment Package

The correct deployment package is: **abhisheksur-replit-deploy-fixed.zip**

This package includes:
- Server configured to listen on port 5000
- Root path (/) handler returning "OK" with text/plain content type
- All website content accessible via /index.html and other paths

## How to Deploy

1. Upload the **abhisheksur-replit-deploy-fixed.zip** file to Replit
2. Set the run command to: `node server.js`
3. The server will automatically:
   - Listen on port 5000
   - Respond to health checks at the root path
   - Serve all website content

## Troubleshooting

If deployment continues to fail:
1. Ensure the server is running on port 5000
2. Verify the root path (/) returns a 200 OK with text/plain response
3. Check Replit logs for any errors

## Important Files

- `server.js` - The main server file
- `index.js` - An identical copy for redundancy
- `index.html` - The main website content (accessed at /index.html)

## Manual Testing

You can manually verify the server is working correctly with:

```
node server.js
curl http://localhost:5000/  # Should return "OK"
curl -I http://localhost:5000/index.html  # Should return 200 OK
```

The website will be accessible at: `https://yourdomain.replit.app/index.html`