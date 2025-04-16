# Replit Deployment Guide - Abhishek Sur's Portfolio

## Successful Deployment Requirements
For Replit deployment to succeed, your server must:

1. Listen on the PORT environment variable (typically 5000)
2. Respond to root path ("/") requests with exactly "OK" and Content-Type: text/plain
3. Be written with minimal dependencies (pure Node.js is best)

## How to Deploy
These files have been configured for successful deployment:

- `index.js`: Ultra-minimal server that only responds to health checks
- `test-health.js`: Verifies your server's health check response is correct

### Steps for Deployment:

1. First test the health check locally:
   ```
   node test-health.js
   ```
   Verify you see "Content-Type check: PASSED" and "Body content check: PASSED"

2. Click the "Deploy" button in Replit
   - Make sure index.js is your main entry point
   - The server binds to PORT from environment variables
   - The server binds to 0.0.0.0 (not localhost)

3. When deployed, your site will be available at:
   `https://yourreplusername.replit.app`

## Troubleshooting
If deployment fails:

1. Double-check index.js responds with exactly "OK" (case-sensitive)
2. Make sure Content-Type is exactly "text/plain" 
3. Verify the server is binding to the PORT environment variable
4. Make sure there are no syntax errors in your code

## Testing Deployment
Once deployment is successful, verify by visiting your deployed site's URL.
The root path should display just "OK".

Remember: This server is optimized purely for deployment and health checks.
Once deployment is working, you can enhance it to serve your actual website content.