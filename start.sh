#!/bin/bash
# Quick start script for 3ardElYoum mobile app

cd "$(dirname "$0")/client"

echo "🚀 Starting 3ardElYoum mobile app..."
echo ""
echo "Make sure you have configured .env with your Firebase credentials!"
echo ""
echo "Choose a platform:"
echo "1) iOS Simulator"
echo "2) Android Emulator"
echo "3) Web Preview"
echo ""
read -p "Enter choice (1-3): " choice

case $choice in
  1)
    echo "Starting iOS..."
    npm run ios
    ;;
  2)
    echo "Starting Android..."
    npm run android
    ;;
  3)
    echo "Starting Web..."
    npm run web
    ;;
  *)
    echo "Invalid choice. Please run again and select 1, 2, or 3."
    exit 1
    ;;
esac
