#!/bin/bash

# To make it use able
# > chmod +x build.sh
# To run
# > ./build.sh

set -e

echo "🚀 Starting build process..."

# Ask for build type
read -p "Choose build type (development / production): " BUILD_TYPE

# Normalize input
BUILD_TYPE=$(echo "$BUILD_TYPE" | tr '[:upper:]' '[:lower:]')

if [ "$BUILD_TYPE" != "development" ] && [ "$BUILD_TYPE" != "production" ]; then
  echo "❌ Invalid build type! Please use 'development' or 'production'."
  exit 1
fi

# Set environment variables
if [ "$BUILD_TYPE" == "development" ]; then
  export APP_VARIANT=dev
  export APP_URL="http://192.168.1.10:3000"
  PROFILE=development
  echo "📱 Building Development version..."
else
  export APP_VARIANT=production
  export APP_URL="https://tawredaat.com"
  PROFILE=production
  echo "🏗️ Building Production version..."
fi

# Write to .env file so the app can read it
echo "APP_VARIANT=$APP_VARIANT" > .env
echo "APP_URL=$APP_URL" >> .env

# Run EAS Build
echo "➡️ Running EAS Build for $PROFILE profile..."
eas build -p android --profile $PROFILE

echo "✅ Build completed successfully!"
echo "--------------------------------------------"
echo "📦 Build Type: $BUILD_TYPE"
echo "🔧 EAS Profile: $PROFILE"
echo "🌍 APP_VARIANT: $APP_VARIANT"
echo "🔗 APP_URL: $APP_URL"
echo "--------------------------------------------"
