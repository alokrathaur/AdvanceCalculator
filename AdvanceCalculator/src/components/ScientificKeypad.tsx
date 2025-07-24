import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import {useTheme} from '../context/ThemeContext';

interface ScientificKeypadProps {
  onDigitPress: (digit: string) => void;
  onDecimalPress: () => void;
  onOperationPress: (operation: string) => void;
  onClear: () => void;
  displayValue: string;
  setDisplayValue: (value: string) => void;
  addToHistory: (calculation: string) => void;
}

const ScientificKeypad: React.FC<ScientificKeypadProps> = ({
  onDigitPress,
  onDecimalPress,
  onOperationPress,
  onClear,
  displayValue,
  setDisplayValue,
  addToHistory,
}) => {
  const {theme} = useTheme();

  const scientificFunctions = [
    {text: 'sin', func: () => {
      const value = Math.sin(parseFloat(displayValue) * Math.PI / 180);
      setDisplayValue(value.toString());
      addToHistory(`sin(${displayValue}°) = ${value}`);
    }},
    {text: 'cos', func: () => {
      const value = Math.cos(parseFloat(displayValue) * Math.PI / 180);
      setDisplayValue(value.toString());
      addToHistory(`cos(${displayValue}°) = ${value}`);
    }},
    {text: 'tan', func: () => {
      const value = Math.tan(parseFloat(displayValue) * Math.PI / 180);
      setDisplayValue(value.toString());
      addToHistory(`tan(${displayValue}°) = ${value}`);
    }},
    {text: 'log', func: () => {
      const value = Math.log10(parseFloat(displayValue));
      setDisplayValue(value.toString());
      addToHistory(`log(${displayValue}) = ${value}`);
    }},
    {text: 'ln', func: () => {
      const value = Math.log(parseFloat(displayValue));
      setDisplayValue(value.toString());
      addToHistory(`ln(${displayValue}) = ${value}`);
    }},
    {text: '√', func: () => {
      const value = Math.sqrt(parseFloat(displayValue));
      setDisplayValue(value.toString());
      addToHistory(`√(${displayValue}) = ${value}`);
    }},
    {text: 'x²', func: () => {
      const value = Math.pow(parseFloat(displayValue), 2);
      setDisplayValue(value.toString());
      addToHistory(`${displayValue}² = ${value}`);
    }},
    {text: 'x³', func: () => {
      const value = Math.pow(parseFloat(displayValue), 3);
      setDisplayValue(value.toString());
      addToHistory(`${displayValue}³ = ${value}`);
    }},
    {text: '1/x', func: () => {
      const value = 1 / parseFloat(displayValue);
      setDisplayValue(value.toString());
      addToHistory(`1/${displayValue} = ${value}`);
    }},
    {text: 'π', func: () => {
      setDisplayValue(Math.PI.toString());
    }},
    {text: 'e', func: () => {
      setDisplayValue(Math.E.toString());
    }},
    {text: 'n!', func: () => {
      const n = parseInt(displayValue);
      let factorial = 1;
      for (let i = 2; i <= n; i++) {
        factorial *= i;
      }
      setDisplayValue(factorial.toString());
      addToHistory(`${displayValue}! = ${factorial}`);
    }},
  ];

  const basicButtons = [
    {text: 'C', type: 'clear', onPress: onClear},
    {text: '±', type: 'operation', onPress: () => {
      setDisplayValue((-parseFloat(displayValue)).toString());
    }},
    {text: '%', type: 'operation', onPress: () => {
      const value = parseFloat(displayValue) / 100;
      setDisplayValue(value.toString());
    }},
    {text: '÷', type: 'operation', onPress: () => onOperationPress('÷')},
    {text: '7', type: 'digit', onPress: () => onDigitPress('7')},
    {text: '8', type: 'digit', onPress: () => onDigitPress('8')},
    {text: '9', type: 'digit', onPress: () => onDigitPress('9')},
    {text: '×', type: 'operation', onPress: () => onOperationPress('×')},
    {text: '4', type: 'digit', onPress: () => onDigitPress('4')},
    {text: '5', type: 'digit', onPress: () => onDigitPress('5')},
    {text: '6', type: 'digit', onPress: () => onDigitPress('6')},
    {text: '-', type: 'operation', onPress: () => onOperationPress('-')},
    {text: '1', type: 'digit', onPress: () => onDigitPress('1')},
    {text: '2', type: 'digit', onPress: () => onDigitPress('2')},
    {text: '3', type: 'digit', onPress: () => onDigitPress('3')},
    {text: '+', type: 'operation', onPress: () => onOperationPress('+')},
    {text: '0', type: 'digit', onPress: () => onDigitPress('0'), flex: 2},
    {text: '.', type: 'digit', onPress: onDecimalPress},
    {text: '=', type: 'equals', onPress: () => {}},
  ];

  const getButtonStyle = (type: string) => {
    switch (type) {
      case 'clear':
        return {backgroundColor: theme.colors.error};
      case 'operation':
        return {backgroundColor: theme.colors.primary};
      case 'equals':
        return {backgroundColor: theme.colors.accent};
      case 'scientific':
        return {backgroundColor: theme.colors.secondary};
      default:
        return {backgroundColor: theme.colors.surface};
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.scientificContainer}>
        {scientificFunctions.map((button, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.scientificButton, getButtonStyle('scientific')]}
            onPress={button.func}>
            <Text style={[styles.buttonText, {color: '#fff'}]}>
              {button.text}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <View style={styles.basicContainer}>
        {basicButtons.map((button, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.button,
              getButtonStyle(button.type),
              button.flex && {flex: button.flex},
            ]}
            onPress={button.onPress}>
            <Text
              style={[
                styles.buttonText,
                {color: button.type === 'digit' ? theme.colors.text : '#fff'},
              ]}>
              {button.text}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scientificContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  scientificButton: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    minWidth: 60,
  },
  basicContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  button: {
    flex: 1,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    minWidth: 60,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ScientificKeypad; 