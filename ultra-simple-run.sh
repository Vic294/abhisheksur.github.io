#!/bin/bash
# ULTRA-SIMPLE RUN SCRIPT
# This script is designed to be the main entry point for Replit deployment

# Export environment variables
export PORT=5000
export USE_ULTRA_SIMPLE=true

# Run the ultra-simple server directly
echo "Starting Abhishek Sur Portfolio - Ultra Simple Server"
echo "PORT: $PORT"
echo "Optimized for Replit deployment"

# Execute the ultra-simple server
exec node ultra-simple-server.js