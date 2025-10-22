#!/bin/bash

# 🛠️ Make it executable once:
# chmod +x build-local.sh
# 🚀 Run it:
# ./build-local.sh

set -e

echo "🚀 Starting local build..."
read -p "Choose build type (development / production): " BUILD_TYPE

BUILD_TYPE=$(echo "$BUILD_TYPE" | tr '[:upper:]' '[:lower:]')

if [ "$BUILD_TYPE" != "development" ] && [ "$BUILD_TYPE" != "production" ]; then
  echo "❌ Invalid build type! Please use 'development' or 'production'."
  exit 1
fi

if [ "$BUILD_TYPE" == "development" ]; then
  export APP_VARIANT=dev
  export APP_URL=http://192.168.1.10:3000
  export CUSTOM_APP_ID=com.3ardelyoum.dev
  echo "📱 Building DEVELOPMENT (local) APK..."
else
  export APP_VARIANT=prod
  export APP_URL=https://3ardelyoum.com
  export CUSTOM_APP_ID=com.3ardelyoum.release
  echo "🏗️ Building PRODUCTION (release) APK..."
fi

echo "➡️ Cleaning previous build..."
rm -rf android/app/build

echo "➡️ Running Expo prebuild..."
npx expo prebuild --platform android

echo "➡️ Moving to android folder..."
cd android

echo "➡️ Building APK..."
./gradlew assembleRelease -PcustomApplicationId=$CUSTOM_APP_ID

echo "✅ APK built successfully!"
echo "--------------------------------------------"
echo "📦 Build Type: $BUILD_TYPE"
echo "🌍 APP_URL: $APP_URL"
echo "🔧 APP_VARIANT: $APP_VARIANT"
echo "📦 Custom Application ID: $CUSTOM_APP_ID"
echo "--------------------------------------------"
echo "📍 APK Path:"
echo "android/app/build/outputs/apk/release/app-release.apk"
