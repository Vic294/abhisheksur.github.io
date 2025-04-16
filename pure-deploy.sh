#!/bin/bash
# PURE DEPLOYMENT SCRIPT 
# No extra processes, no background tasks

echo "Starting pure deployment server..."
echo "PORT: $PORT"

# Execute the pure server
exec node pure-server.js