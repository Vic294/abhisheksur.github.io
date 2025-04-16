#!/bin/bash

# Kill any existing node processes
pkill -f "node server.js" || true

# Run the server
node server.js