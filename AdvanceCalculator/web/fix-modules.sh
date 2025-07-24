#!/bin/bash

echo "🔧 Fixing web application module issues..."
echo "=========================================="

# Clear node_modules and reinstall
echo "🧹 Clearing and reinstalling dependencies..."
rm -rf node_modules
rm -rf package-lock.json
npm install

# Clear cache
echo "🗑️  Clearing cache..."
rm -rf .cache
rm -rf build

# Restart development server
echo "🚀 Restarting development server..."
npm start 