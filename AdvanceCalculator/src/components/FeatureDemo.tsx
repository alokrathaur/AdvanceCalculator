import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useTheme} from '../context/ThemeContext';

const FeatureDemo: React.FC = () => {
  const {theme} = useTheme();

  const features = [
    {
      title: '🔢 Basic Calculator',
      description: 'Standard arithmetic operations with a clean interface',
      features: ['Addition, subtraction, multiplication, division', 'Percentage calculations', 'Clear and equals functionality'],
    },
    {
      title: '🔬 Scientific Calculator',
      description: 'Advanced mathematical functions for complex calculations',
      features: ['Trigonometric functions (sin, cos, tan)', 'Logarithmic functions (log, ln)', 'Exponential functions (x², x³)', 'Square root and cube root', 'Factorial calculations', 'Mathematical constants (π, e)'],
    },
    {
      title: '💰 Financial Calculator',
      description: 'Financial tools for loans, investments, and tax calculations',
      features: ['EMI Calculator for loan payments', 'Compound Interest calculations', 'Income Tax estimation', 'ROI (Return on Investment) analysis'],
    },
    {
      title: '📏 Unit Converter',
      description: 'Convert between different units of measurement',
      features: ['Length: meters, kilometers, miles, yards, feet, inches', 'Weight: kilograms, grams, pounds, ounces, tons', 'Temperature: Celsius, Fahrenheit, Kelvin', 'Area: square meters, acres, hectares', 'Volume: liters, gallons, cubic meters'],
    },
    {
      title: '🎨 Advanced UI Features',
      description: 'Modern interface with enhanced user experience',
      features: ['Dark/Light theme toggle', 'Calculation history with tap-to-reuse', 'Responsive design for all screen sizes', 'Smooth animations and transitions'],
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={[styles.title, {color: theme.colors.text}]}>
        Advanced Calculator Features
      </Text>
      
      {features.map((feature, index) => (
        <View key={index} style={[styles.featureCard, {backgroundColor: theme.colors.surface}]}>
          <Text style={[styles.featureTitle, {color: theme.colors.text}]}>
            {feature.title}
          </Text>
          <Text style={[styles.featureDescription, {color: theme.colors.textSecondary}]}>
            {feature.description}
          </Text>
          <View style={styles.featureList}>
            {feature.features.map((item, itemIndex) => (
              <Text key={itemIndex} style={[styles.featureItem, {color: theme.colors.text}]}>
                • {item}
              </Text>
            ))}
          </View>
        </View>
      ))}
      
      <View style={[styles.infoCard, {backgroundColor: theme.colors.accent}]}>
        <Text style={[styles.infoTitle, {color: '#fff'}]}>
          🚀 Ready to Use
        </Text>
        <Text style={[styles.infoText, {color: '#fff'}]}>
          This calculator app is production-ready with comprehensive features, modern UI, and robust error handling. Perfect for both personal and professional use.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  featureCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20,
  },
  featureList: {
    marginTop: 8,
  },
  featureItem: {
    fontSize: 13,
    marginBottom: 4,
    lineHeight: 18,
  },
  infoCard: {
    padding: 20,
    borderRadius: 12,
    marginTop: 16,
    marginBottom: 32,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default FeatureDemo; 