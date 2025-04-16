#!/bin/bash
# Create Replit deployment package with all necessary files

# Setup
PACKAGE_NAME="abhisheksur-replit-deploy"
ULTRA_SIMPLE_DIR="ultra-simple-deploy"

# Remove previous package if exists
rm -rf $ULTRA_SIMPLE_DIR
rm -f ${PACKAGE_NAME}.zip

# Create directory
mkdir -p $ULTRA_SIMPLE_DIR

# Copy essential files for Replit deployment
cp ultra-simple-server.js $ULTRA_SIMPLE_DIR/
cp run $ULTRA_SIMPLE_DIR/
cp ultra-simple-deploy.sh $ULTRA_SIMPLE_DIR/
cp test-ultra-simple.js $ULTRA_SIMPLE_DIR/
cp test-health-workflow.sh $ULTRA_SIMPLE_DIR/
cp index.html $ULTRA_SIMPLE_DIR/ 2>/dev/null || echo "Warning: No index.html found"
cp REPLIT_DEPLOYMENT_README.md $ULTRA_SIMPLE_DIR/README.md
cp REPLIT_CONFIG_REFERENCE.md $ULTRA_SIMPLE_DIR/
cp REPLIT_ULTRA_SIMPLE_DEPLOY.md $ULTRA_SIMPLE_DIR/

# Make scripts executable
chmod +x $ULTRA_SIMPLE_DIR/run
chmod +x $ULTRA_SIMPLE_DIR/ultra-simple-deploy.sh
chmod +x $ULTRA_SIMPLE_DIR/test-health-workflow.sh

# Create deployment instructions
cat > $ULTRA_SIMPLE_DIR/DEPLOY_INSTRUCTIONS.txt << EOF
ABHISHEK SUR PORTFOLIO - REPLIT DEPLOYMENT INSTRUCTIONS
=====================================================

QUICK SETUP:
1. Set the Run command to: ./run
2. Set environment variable: USE_ULTRA_SIMPLE=true
3. Click Deploy

FOR DETAILED INSTRUCTIONS:
- See README.md and REPLIT_ULTRA_SIMPLE_DEPLOY.md

TESTING THE SERVER:
- Run: ./test-health-workflow.sh
EOF

# Create server.js to ensure compatibility
cat > $ULTRA_SIMPLE_DIR/server.js << EOF
// Compatibility redirect to ultra-simple-server
// This ensures any automated systems looking for server.js will find it

console.log('Loading compatibility server.js');
console.log('Redirecting to ultra-simple-server.js');
require('./ultra-simple-server.js');
EOF

# Create zip package
zip -r ${PACKAGE_NAME}.zip $ULTRA_SIMPLE_DIR

echo "Deployment package created: ${PACKAGE_NAME}.zip"
echo "Directory created: $ULTRA_SIMPLE_DIR"
ls -la $ULTRA_SIMPLE_DIR