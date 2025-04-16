#!/bin/bash

echo "Starting Abhishek Sur portfolio website server..."
echo "The server will run continuously. Press Ctrl+C to stop."
echo "======================"
echo "IMPORTANT: This server is configured specifically to handle Replit's health checks."
echo "It will respond to the root path '/' with a 200 OK and content-type text/plain."
echo "For website content, access /index.html instead."
echo "======================"
echo ""

node index.js