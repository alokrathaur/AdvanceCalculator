#!/bin/bash

echo "🔍 Checking web application status..."
echo "==================================="

# Check if port 3000 is in use
if lsof -i:3000 > /dev/null 2>&1; then
    echo "✅ Web server is running on port 3000"
    echo "🌐 Open http://localhost:3000 in your browser"
else
    echo "❌ Web server is not running"
    echo "🚀 Starting web server..."
    npm start
fi

# Check if build is successful
if [ -d "build" ]; then
    echo "✅ Production build exists"
else
    echo "📦 Building for production..."
    npm run build
fi

echo ""
echo "📋 Quick Commands:"
echo "npm start          # Start development server"
echo "npm run build      # Build for production"
echo "./fix-modules.sh   # Fix module issues"
echo ""
echo "🌐 Access: http://localhost:3000" 