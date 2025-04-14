#!/bin/bash

echo "Building Abhishek Sur's website for deployment..."

# Run the build process
npm run build

if [ $? -ne 0 ]; then
  echo "Build failed. Please check the errors above."
  exit 1
fi

echo "Build successful! Creating deployment package..."

# Create a zip of the dist folder (the built website)
cd dist && zip -r ../abhisheksur-website-dist.zip . && cd ..

echo "✅ Deployment package created: abhisheksur-website-dist.zip"
echo "Follow the instructions in DEPLOYMENT_GUIDE.md to deploy the website."