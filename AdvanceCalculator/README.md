# Advanced Calculator - React Native

A comprehensive calculator application built with React Native featuring multiple calculation modes, scientific functions, financial tools, and unit conversion capabilities.

## 🚀 Features

### 📱 Multiple Calculator Modes
- **Basic Calculator**: Standard arithmetic operations
- **Scientific Calculator**: Trigonometric functions, logarithms, exponentials, and more
- **Financial Calculator**: EMI, compound interest, tax calculations, ROI
- **Unit Converter**: Length, weight, temperature, area, volume conversions

### 🎨 Advanced UI Features
- **Dark/Light Theme**: Toggle between themes
- **Responsive Design**: Optimized for different screen sizes
- **Modern UI**: Clean, intuitive interface with smooth animations
- **History**: Track and reuse previous calculations

### 🔬 Scientific Functions
- Trigonometric functions (sin, cos, tan)
- Logarithmic functions (log, ln)
- Exponential functions (x², x³)
- Square root, cube root
- Factorial calculations
- Mathematical constants (π, e)

### 💰 Financial Tools
- **EMI Calculator**: Loan payment calculations
- **Compound Interest**: Investment growth calculations
- **Tax Calculator**: Income tax estimation
- **ROI Calculator**: Return on investment analysis

### 📏 Unit Conversion
- **Length**: meters, kilometers, miles, yards, feet, inches
- **Weight**: kilograms, grams, pounds, ounces, tons
- **Temperature**: Celsius, Fahrenheit, Kelvin
- **Area**: square meters, acres, hectares
- **Volume**: liters, gallons, cubic meters

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AdvancedCalculator
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **iOS Setup** (macOS only)
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Start Metro bundler**
   ```bash
   npm start
   # or
   yarn start
   ```

5. **Run the application**

   **For Android:**
   ```bash
   npm run android
   # or
   yarn android
   ```

   **For iOS:**
   ```bash
   npm run ios
   # or
   yarn ios
   ```

## 📁 Project Structure

```
src/
├── components/
│   ├── Calculator.tsx          # Main calculator component
│   ├── Display.tsx             # Calculator display
│   ├── BasicKeypad.tsx         # Basic calculator keypad
│   ├── ScientificKeypad.tsx    # Scientific calculator keypad
│   ├── FinancialKeypad.tsx     # Financial calculator keypad
│   ├── UnitConverter.tsx       # Unit conversion component
│   └── History.tsx             # Calculation history
├── context/
│   └── ThemeContext.tsx        # Theme management
└── App.tsx                     # Main app component
```

## 🎯 Key Features Implementation

### Theme System
- Context-based theme management
- Dark and light theme support
- Dynamic color scheme application

### Calculation Engine
- Robust mathematical operations
- Error handling for invalid inputs
- Precision handling for floating-point calculations

### History Management
- Persistent calculation history
- Tap to reuse previous results
- Clear history functionality

### Responsive Design
- Flexible layout system
- Adaptive keypad sizing
- Cross-platform compatibility

## 🔧 Customization

### Adding New Scientific Functions
1. Add the function to `ScientificKeypad.tsx`
2. Implement the mathematical logic
3. Add to the `scientificFunctions` array

### Adding New Unit Conversions
1. Define conversion factors in `UnitConverter.tsx`
2. Add units to the `conversionData` object
3. Update the conversion logic

### Theme Customization
1. Modify colors in `ThemeContext.tsx`
2. Add new theme variants
3. Update component styles

## 📱 Screenshots

*[Screenshots will be added here]*

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Built with ❤️ using React Native** 