#!/bin/bash

echo "🌐 Setting up Advanced Calculator Web Application"
echo "=============================================="

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

# Create web directory if it doesn't exist
mkdir -p web
cd web

# Copy package.json for web
cp ../package-web.json package.json

# Install dependencies
echo "📦 Installing web dependencies..."
npm install

echo ""
echo "🎉 Web setup completed successfully!"
echo ""
echo "To start the web application:"
echo "1. cd web"
echo "2. npm start"
echo ""
echo "The app will open in your browser at http://localhost:3000" 