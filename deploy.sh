#!/bin/bash
# Final deployment script for Replit

echo "Starting Abhishek Sur Portfolio website deployment..."
echo "Using PORT: $PORT"

# Run the final deployment server which handles both health checks and static files
node final-deploy.js