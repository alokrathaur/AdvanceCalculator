#!/bin/bash

echo "🚀 Starting Advanced Calculator Development Server"
echo "================================================"

# Clear Metro cache
echo "🧹 Clearing Metro cache..."
npx react-native start --reset-cache

# Alternative: Start with specific options
# npx react-native start --reset-cache --max-workers=2 