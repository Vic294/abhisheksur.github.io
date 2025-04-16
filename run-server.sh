#!/bin/bash

# Kill any existing server processes
pkill -f "node server.js" || true
sleep 1

# Start the server
echo "Starting server..."
node server.js