#!/bin/bash
# EXPRESS DEPLOYMENT SCRIPT

echo "Starting Express server for Replit deployment..."
echo "Using PORT: $PORT"

# Run Express server
exec node express-server.js