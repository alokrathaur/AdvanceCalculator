# 🚀 Quick Start Guide

## Development Server Commands

### Start Development Server
```bash
# Normal start
npm start

# Start with cache reset
npm run start-clean

# Fix port conflicts and start
npm run start-fix
```

### Fix Common Issues
```bash
# Fix port conflicts
./fix-port.sh

# Clear all caches
rm -rf ~/.metro
rm -rf node_modules
npm install
```

## Running the App

### Android
```bash
npm run android
```

### iOS (macOS only)
```bash
npm run ios
```

## Development Workflow

1. **Start the development server:**
   ```bash
   npm run start-fix
   ```

2. **In another terminal, run the app:**
   ```bash
   # For Android
   npm run android
   
   # For iOS
   npm run ios
   ```

3. **Make changes to your code** - they will automatically reload

4. **If you encounter issues:**
   - Run `./fix-port.sh` to clear port conflicts
   - Run `npm run start-clean` to reset cache
   - Check `TROUBLESHOOTING.md` for more solutions

## Available Scripts

- `npm start` - Start Metro bundler
- `npm run start-clean` - Start with cache reset
- `npm run start-fix` - Fix port conflicts and start
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `./fix-port.sh` - Fix port conflicts
- `./setup.sh` - Initial project setup

## Metro Bundler Interface

When Metro is running, you can use these keyboard shortcuts:
- `r` - Reload app
- `d` - Open Dev Menu
- `i` - Run on iOS
- `a` - Run on Android

---

**Happy coding! 🎉** 