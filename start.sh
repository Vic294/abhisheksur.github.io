#!/bin/bash
# Start script for Replit deployment

# Set permissions
chmod +x start.sh

# Log environment variables (for debugging)
echo "Environment variables:"
echo "PORT=${PORT}"

# Start the deployment-optimized server
echo "Starting replit-server.js..."
node replit-server.js