#!/bin/bash

echo "🔧 Fixing React Native port conflicts..."
echo "======================================"

# Check if port 8081 is in use
PORT=8081
PID=$(lsof -ti:$PORT)

if [ ! -z "$PID" ]; then
    echo "⚠️  Port $PORT is in use by process $PID"
    echo "🔄 Killing process..."
    kill -9 $PID
    echo "✅ Process killed successfully"
else
    echo "✅ Port $PORT is free"
fi

# Also kill any existing Metro processes
echo "🧹 Cleaning up Metro processes..."
pkill -f "react-native start" 2>/dev/null || true
pkill -f "metro" 2>/dev/null || true

echo "🚀 Ready to start development server!"
echo ""
echo "Run: npm start"
echo "Or: npx react-native start --reset-cache" 