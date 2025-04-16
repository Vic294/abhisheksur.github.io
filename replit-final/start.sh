#!/bin/bash
# Start script for Replit deployment

# Set the PORT environment variable if not set
export PORT=${PORT:-5000}

# Start the server
node pure-server.js