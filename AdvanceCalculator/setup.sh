#!/bin/bash

echo "🚀 Setting up Advanced Calculator React Native Project"
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if React Native CLI is installed globally
if ! command -v react-native &> /dev/null; then
    echo "📦 Installing React Native CLI globally..."
    npm install -g react-native-cli
fi

# iOS setup (macOS only)
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "🍎 Setting up iOS dependencies..."
    cd ios && pod install && cd ..
    echo "✅ iOS setup completed"
else
    echo "ℹ️  Skipping iOS setup (not on macOS)"
fi

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "Next steps:"
echo "1. Start Metro bundler: npm start"
echo "2. Run on Android: npm run android"
echo "3. Run on iOS (macOS): npm run ios"
echo ""
echo "For more information, check the README.md file" 