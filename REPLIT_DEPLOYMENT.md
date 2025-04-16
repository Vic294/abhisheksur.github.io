# REPLIT DEPLOYMENT GUIDE

## ISSUE FIXED: Missing server.js and Health Check Issues

The deployment issues have been resolved by creating a direct `server.js` file at the root level that specifically:
1. Handles health checks at root path (/)
2. Returns plain text "OK" with status 200
3. Runs on port 5000 as required by Replit

## DEPLOYMENT INSTRUCTIONS

### Option 1: Direct Upload to Replit (Recommended)

1. Create a new Node.js Repl on Replit
2. Delete any auto-generated files (index.js, etc.)
3. Manually upload these individual files to the root directory of your Repl:
   - `server.js` (CRITICAL - this must be at the root level)
   - `index.js` (backup copy of server.js)
   - `index.html` and other HTML files
   - All assets and resources
   - Rename `replit-package.json` to `package.json`

4. Set the Run button command to: `node server.js`
5. Click Run

### Option 2: ZIP Upload

If direct file uploading doesn't work:
1. Create a new ZIP file with:
   - `server.js` at the root level
   - All website files
   - Rename `replit-package.json` to `package.json` 
2. Upload this ZIP file to Replit
3. Set the Run button command to: `node server.js`

## VERIFICATION

Before deploying, verify locally that:
1. The server returns "OK" with status 200 for requests to the root path (/)
2. The Content-Type is set to "text/plain" for health checks
3. The server is running on port 5000

You can test this by running:
```
node server.js & sleep 2 && curl -v http://localhost:5000/ && kill $!
```

## TROUBLESHOOTING

If deployment still fails:
1. Ensure that `server.js` is at the root level of your Replit project
2. Verify the file path: `/server.js` (not in any subdirectory)
3. Check Replit logs for specific errors

## ACCESSING YOUR WEBSITE

The main website will be accessible at:
- `https://yourrepl.replit.app/index.html`

Note that the root path (/) is reserved for health checks and will only return "OK".