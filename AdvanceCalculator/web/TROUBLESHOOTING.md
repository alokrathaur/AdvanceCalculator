# 🔧 Web Application Troubleshooting

## Common Issues and Solutions

### 1. Module Resolution Errors

**Error:** `Module not found: Error: Can't resolve './App'`

**Solutions:**
```bash
# Option 1: Clear cache and restart
rm -rf node_modules
npm install
npm start

# Option 2: Use the fix script
./fix-modules.sh

# Option 3: Manual restart
pkill -f "react-scripts"
npm start
```

### 2. Port Already in Use

**Error:** `EADDRINUSE: address already in use :::3000`

**Solutions:**
```bash
# Kill existing process
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm start
```

### 3. TypeScript Errors

**Error:** Type declaration errors

**Solutions:**
```bash
# Reinstall TypeScript dependencies
npm install --save-dev typescript @types/react @types/react-dom

# Clear TypeScript cache
rm -rf node_modules/.cache
```

### 4. Build Errors

**Error:** Build compilation fails

**Solutions:**
```bash
# Clear build cache
rm -rf build
rm -rf .cache

# Reinstall dependencies
rm -rf node_modules
npm install

# Restart development server
npm start
```

## Quick Fix Commands

### Reset Everything
```bash
#!/bin/bash
echo "🧹 Complete reset..."
rm -rf node_modules
rm -rf package-lock.json
rm -rf build
rm -rf .cache
npm install
npm start
```

### Development Server
```bash
#!/bin/bash
echo "🚀 Starting development server..."
npm start
```

## Environment Setup

### Prerequisites Check
```bash
# Check Node.js
node --version

# Check npm
npm --version

# Check if port 3000 is free
lsof -i:3000
```

### Recommended Tools
- **Node.js**: v16 or higher
- **npm**: v8 or higher
- **Chrome DevTools**: For debugging

## Performance Tips

1. **Use the fix script** when encountering module issues
2. **Clear cache regularly** to avoid build issues
3. **Restart the server** when making configuration changes
4. **Check browser console** for detailed error messages

## Getting Help

If you're still experiencing issues:

1. Check the browser console for detailed error messages
2. Run `./fix-modules.sh` to reset everything
3. Check the [React documentation](https://reactjs.org/docs/error-boundaries.html)
4. Verify all files are in the correct locations

---

**Remember**: Most issues can be resolved by clearing caches and restarting the development server! 