#!/bin/bash
# Test health check workflow for Replit

# Set environment variables
export PORT=5000
export USE_ULTRA_SIMPLE=true

# Start the ultra-simple server directly
echo "Starting ultra-simple server..."
node ultra-simple-server.js > server.log 2>&1 &
SERVER_PID=$!
echo "Server started with PID $SERVER_PID"

# Give the server time to start
sleep 2

# Run the test
echo "Running health check test..."
node test-ultra-simple.js

# Clean up
echo "Stopping test server..."
kill $SERVER_PID || true

# Show server logs
echo -e "\nServer logs:"
cat server.log

echo -e "\nTest completed."