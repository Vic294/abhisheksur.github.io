# Simple Replit Deployment Guide for Abhishek Sur's Portfolio

This guide provides simple steps to deploy Abhishek Sur's portfolio website on Replit.

## Deployment Steps

1. **Create a new Replit project**
   - Choose Node.js as the template

2. **Upload Files**
   - Upload all the HTML files (index.html, blog.html, blog-ai-blockchain.html, etc.)
   - Upload the assets folder
   - Upload the resume files (AbhishekSur-Resume.pdf, AbhishekSur-Resume.docx)
   - Upload pure-server.js and start.sh

3. **Setup Replit Configuration**
   - In the Replit Shell, run: `chmod +x start.sh`
   - Set the Run command to: `bash start.sh`

4. **Deploy the Website**
   - Click the "Deploy" button in Replit
   - Verify deployment by visiting the provided URL

## Health Check Details

The server is configured to properly respond to Replit's health checks:
- It returns "OK" with Content-Type: text/plain at the root path (/)
- All other paths serve the static website content

## Files Included

- **pure-server.js**: Minimal Node.js server that passes health checks
- **start.sh**: Start script for the server
- HTML files: index.html, blog.html, blog-ai-blockchain.html, etc.
- Resume files: PDF and DOCX formats 
- Assets: Images and other resources

## Troubleshooting

If deployment fails:
1. Check the logs for any errors
2. Verify that the server is correctly responding to health checks
3. Ensure that the PORT environment variable is being read correctly