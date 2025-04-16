#!/bin/bash
# Test script to verify health check server

# Start server in background
export PORT=5000
echo "Starting server in background..."
node index.js > server.log 2>&1 &
SERVER_PID=$!

# Wait for server to start
echo "Waiting for server to start..."
sleep 2

# Test with curl
echo "Testing with curl..."
curl -i http://localhost:5000/

# Test with dedicated test script
echo -e "\nRunning test script..."
node test-health.js

# Kill server
echo -e "\nStopping server..."
kill $SERVER_PID

# Show server logs
echo -e "\nServer logs:"
cat server.log