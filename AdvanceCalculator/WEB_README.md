# 🌐 Advanced Calculator Web Application

A beautiful, modern web calculator with advanced features including scientific functions, financial calculations, and unit conversions.

## 🚀 Features

### 📱 Multiple Calculator Modes
- **Basic Calculator**: Standard arithmetic operations
- **Scientific Calculator**: Trigonometric functions, logarithms, exponentials
- **Financial Calculator**: EMI, tax calculations, ROI
- **Unit Converter**: Length, weight, temperature, area, volume

### 🎨 Modern UI Features
- **Glassmorphism Design**: Beautiful glass-like interface
- **Responsive Design**: Works on all devices
- **Smooth Animations**: Hover effects and transitions
- **Calculation History**: Track and reuse previous calculations

### 🔬 Scientific Functions
- Trigonometric functions (sin, cos, tan)
- Logarithmic functions (log, ln)
- Exponential functions (x², x³)
- Square root, cube root
- Factorial calculations
- Mathematical constants (π, e)

### 💰 Financial Tools
- **EMI Calculator**: Loan payment calculations
- **Tax Calculator**: Income tax estimation
- **ROI Calculator**: Return on investment analysis

### 📏 Unit Conversion
- **Length**: meters, kilometers, miles, yards, feet, inches
- **Weight**: kilograms, grams, pounds, ounces, tons
- **Temperature**: Celsius, Fahrenheit, Kelvin
- **Area**: square meters, acres, hectares
- **Volume**: liters, gallons, cubic meters

## 🛠️ Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Run the setup script:**
   ```bash
   ./setup-web.sh
   ```

2. **Or manually:**
   ```bash
   cd web
   npm install
   npm start
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
web/
├── public/
│   └── index.html          # Main HTML file
├── src/
│   ├── components/
│   │   ├── Calculator.tsx      # Main calculator component
│   │   ├── Display.tsx         # Calculator display
│   │   ├── BasicKeypad.tsx     # Basic calculator keypad
│   │   ├── ScientificKeypad.tsx # Scientific calculator keypad
│   │   ├── FinancialKeypad.tsx  # Financial calculator keypad
│   │   ├── UnitConverter.tsx    # Unit conversion component
│   │   └── History.tsx          # Calculation history
│   ├── App.tsx              # Main app component
│   ├── index.tsx            # Entry point
│   └── index.css            # Main styles
└── package.json            # Dependencies
```

## 🎯 Usage

### Basic Calculator
- Click number buttons to input values
- Use operation buttons (+, -, ×, ÷) for calculations
- Press = to see the result

### Scientific Calculator
- Switch to "Scientific" mode
- Use advanced functions like sin, cos, tan, log, ln
- Access mathematical constants (π, e)
- Calculate factorials and powers

### Financial Calculator
- Switch to "Financial" mode
- Enter loan details (amount, interest rate, term)
- Calculate EMI, tax, and ROI
- Get instant financial insights

### Unit Converter
- Switch to "Converter" mode
- Select conversion type (length, weight, etc.)
- Choose from and to units
- Enter value and get instant conversion

## 🎨 Design Features

### Glassmorphism UI
- Semi-transparent glass-like interface
- Backdrop blur effects
- Subtle shadows and borders
- Modern gradient backgrounds

### Responsive Design
- Works on desktop, tablet, and mobile
- Adaptive layouts for different screen sizes
- Touch-friendly buttons on mobile

### Interactive Elements
- Hover effects on buttons
- Smooth transitions
- Visual feedback for user actions

## 🔧 Development

### Available Scripts
```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
npm run eject      # Eject from Create React App
```

### Customization
- Modify `src/index.css` for styling changes
- Update components in `src/components/`
- Add new features by extending existing components

## 🌟 Key Features

### Real-time Calculations
- Instant results as you type
- No page refreshes needed
- Smooth user experience

### History Management
- View previous calculations
- Click to reuse results
- Clear history when needed

### Error Handling
- Input validation
- Graceful error messages
- Robust calculation engine

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 🚀 Deployment

### Build for Production
```bash
cd web
npm run build
```

### Deploy Options
- **Netlify**: Drag and drop the `build` folder
- **Vercel**: Connect your GitHub repository
- **GitHub Pages**: Use `gh-pages` package
- **AWS S3**: Upload build files to S3 bucket

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ using React and TypeScript**

🎉 **Ready to use! Open http://localhost:3000 to start calculating!** 