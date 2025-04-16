#!/bin/bash
# Ultra-Simple Deployment Script for Replit

echo "Starting Abhishek Sur Portfolio website deployment..."
echo "Using PORT: $PORT"
echo "Using ultra-simple server for maximum compatibility with Replit"

# Run the ultra-simple server first to verify deployment works
node replit-deploy.js

# Once deployment is working with the ultra-simple server,
# you can switch to the full server by uncommenting this line:
# node final-deploy.js