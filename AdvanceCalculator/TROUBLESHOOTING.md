# Troubleshooting Guide

## Common Issues and Solutions

### 1. EMFILE: too many open files

**Symptoms:**
```
Error: EMFILE: too many open files, watch
```

**Solutions:**

#### Option A: Clear Cache and Restart
```bash
# Clear Metro cache
rm -rf ~/.metro

# Clear node_modules and reinstall
rm -rf node_modules
npm install

# Start with reduced workers
npx react-native start --reset-cache --max-workers=2
```

#### Option B: Increase File Limits (macOS)
```bash
# Check current limits
ulimit -n

# Increase limits temporarily
sudo launchctl limit maxfiles 65536 200000

# Or add to ~/.zshrc for permanent fix
echo "ulimit -n 65536" >> ~/.zshrc
source ~/.zshrc
```

#### Option C: Install Watchman
```bash
# Install Homebrew first if not installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Watchman
brew install watchman

# Clear Watchman cache
watchman watch-del-all
```

### 2. Metro Bundler Issues

**Symptoms:**
- Metro not starting
- Build errors
- Cache issues

**Solutions:**
```bash
# Clear all caches
npx react-native start --reset-cache

# Kill existing Metro processes
pkill -f "react-native start"

# Start with specific options
npx react-native start --reset-cache --max-workers=2
```

### 3. TypeScript Errors

**Symptoms:**
- Cannot find module 'react'
- Type declaration errors

**Solutions:**
```bash
# Reinstall TypeScript dependencies
npm install --save-dev typescript @types/react @types/react-native

# Clear TypeScript cache
rm -rf node_modules/.cache
```

### 4. iOS Build Issues

**Symptoms:**
- Pod install errors
- Xcode build failures

**Solutions:**
```bash
# Clean iOS build
cd ios
rm -rf build
rm -rf Pods
pod install
cd ..

# Or use the setup script
./setup.sh
```

### 5. Android Build Issues

**Symptoms:**
- Gradle build errors
- SDK not found

**Solutions:**
```bash
# Clean Android build
cd android
./gradlew clean
cd ..

# Check Android SDK
echo $ANDROID_HOME
```

## Quick Fix Scripts

### Reset Everything
```bash
#!/bin/bash
echo "🧹 Cleaning everything..."
rm -rf node_modules
rm -rf ~/.metro
npm install
npx react-native start --reset-cache --max-workers=2
```

### Development Server
```bash
#!/bin/bash
echo "🚀 Starting development server..."
npx react-native start --reset-cache --max-workers=2
```

## Environment Setup

### Prerequisites Check
```bash
# Check Node.js
node --version

# Check npm
npm --version

# Check React Native CLI
npx react-native --version

# Check Android SDK (for Android development)
echo $ANDROID_HOME

# Check Xcode (for iOS development)
xcode-select --print-path
```

### Recommended Tools
- **Node.js**: v16 or higher
- **npm**: v8 or higher
- **Watchman**: For better file watching
- **Android Studio**: For Android development
- **Xcode**: For iOS development (macOS only)

## Performance Tips

1. **Use fewer Metro workers** when experiencing file limit issues
2. **Clear cache regularly** to avoid build issues
3. **Use Watchman** for better file watching performance
4. **Restart Metro** when making configuration changes

## Getting Help

If you're still experiencing issues:

1. Check the [React Native documentation](https://reactnative.dev/docs/troubleshooting)
2. Search for similar issues on [GitHub](https://github.com/facebook/react-native/issues)
3. Check the [Metro documentation](https://facebook.github.io/metro/docs/troubleshooting)

---

**Remember**: Most issues can be resolved by clearing caches and restarting the development server! 