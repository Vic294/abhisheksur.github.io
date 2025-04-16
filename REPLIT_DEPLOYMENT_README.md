# Abhishek Sur Portfolio - Replit Deployment Guide

## 🚀 Quickstart Deployment Instructions

1. **Set the Run Command**:
   - Set to `./run` in the Replit configuration

2. **Add Environment Variable**:
   - Add `USE_ULTRA_SIMPLE` with value `true`

3. **Deploy**:
   - Click the "Deploy" button in Replit

## 📋 What's Included

This repository contains multiple server implementations optimized for Replit deployment:

- **ultra-simple-server.js** - The most minimal server that passes health checks (**RECOMMENDED**)
- **ultra-health-server.js** - A lightweight server focused on health checks
- **express-server.js** - An Express-based server
- **pure-server.js** - A pure Node.js server

## ⚙️ How It Works

The `run` script automatically selects the appropriate server based on environment variables:

- `USE_ULTRA_SIMPLE=true` - Uses the ultra-simple server (recommended)
- `USE_ULTRA=true` - Uses the ultra-minimal health check server
- `USE_EXPRESS=true` - Uses the Express server
- No variables - Falls back to the pure Node.js server

## 🔍 Testing and Verification

To test the server locally:

1. Start the server: `./ultra-simple-deploy.sh`
2. Run the test: `node test-ultra-simple.js`

This verifies that the server returns the correct response for Replit's health checks.

## 🛠️ Troubleshooting

If deployment fails:

1. Ensure the `PORT` environment variable is correctly set (Replit typically uses 3000 or 5000)
2. Verify the server returns exactly "OK" with Content-Type: text/plain at the root path
3. Check deployment logs for any errors

## 📚 More Details

For more detailed instructions, see:
- `REPLIT_ULTRA_SIMPLE_DEPLOY.md` - Comprehensive deployment guide
- `REPLIT_CONFIG_REFERENCE.md` - Reference for configuration settings

## 🔧 Advanced Configuration

You can customize the deployment by editing these files:
- `ultra-simple-server.js` - The server implementation
- `run` - The main entry point script
- `ultra-simple-deploy.sh` - The deployment script