#!/bin/bash

# Build the static site for deployment
echo "Building project for deployment..."
node build.js

# Make sure the script exits on any command failure
set -e

# Go to the dist directory
cd dist

echo "Current directory: $(pwd)"
echo "Files in dist:"
ls -la

# Start the server with proper port for Replit deployment
echo "Ready for deployment - run 'node server.js' to start the server"