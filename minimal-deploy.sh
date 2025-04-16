#!/bin/bash
# ULTRA-MINIMAL DEPLOYMENT SCRIPT 
# This script only runs the health check server with no other process

echo "Starting minimal health check server for Replit deployment..."
echo "PORT: $PORT"
echo "====== REPLIT DEPLOYMENT SERVER ======"

# Run the absolute minimal server
exec node minimal-health-server.js