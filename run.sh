#!/bin/bash
# Script to start the server for Replit deployment

# Make this script executable
chmod +x run.sh

# Print debug information
echo "Starting server for Replit deployment"
echo "Current directory: $(pwd)"
echo "Environment PORT: $PORT"

# Start the server - it will listen on port 5000
echo "Starting server on port 5000..."
node index.js