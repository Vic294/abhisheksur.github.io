#!/bin/bash

# ===================================================
# Development Script for Abhishek Sur's Portfolio Website
# ===================================================

echo "🚀 Starting development server..."

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "📥 Installing dependencies..."
  npm install
fi

# Start development server
echo "💻 Running Vite development server..."
npx vite --host 0.0.0.0

echo "✅ Development server stopped."