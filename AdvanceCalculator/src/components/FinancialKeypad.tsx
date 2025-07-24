import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput} from 'react-native';
import {useTheme} from '../context/ThemeContext';

interface FinancialKeypadProps {
  onDigitPress: (digit: string) => void;
  onDecimalPress: () => void;
  onOperationPress: (operation: string) => void;
  onClear: () => void;
  displayValue: string;
  setDisplayValue: (value: string) => void;
  addToHistory: (calculation: string) => void;
}

const FinancialKeypad: React.FC<FinancialKeypadProps> = ({
  onDigitPress,
  onDecimalPress,
  onOperationPress,
  onClear,
  displayValue,
  setDisplayValue,
  addToHistory,
}) => {
  const {theme} = useTheme();
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');

  const calculateEMI = () => {
    const P = parseFloat(loanAmount);
    const r = parseFloat(interestRate) / 100 / 12;
    const n = parseFloat(loanTerm) * 12;
    
    if (P && r && n) {
      const emi = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      setDisplayValue(emi.toFixed(2));
      addToHistory(`EMI: ₹${P} @ ${interestRate}% for ${loanTerm} years = ₹${emi.toFixed(2)}`);
    }
  };

  const calculateCompoundInterest = () => {
    const P = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);
    
    if (P && r && t) {
      const A = P * Math.pow(1 + r, t);
      const CI = A - P;
      setDisplayValue(CI.toFixed(2));
      addToHistory(`CI: ₹${P} @ ${rate}% for ${time} years = ₹${CI.toFixed(2)}`);
    }
  };

  const calculateTax = () => {
    const income = parseFloat(displayValue);
    let tax = 0;
    
    if (income <= 250000) {
      tax = 0;
    } else if (income <= 500000) {
      tax = (income - 250000) * 0.05;
    } else if (income <= 1000000) {
      tax = 12500 + (income - 500000) * 0.2;
    } else {
      tax = 112500 + (income - 1000000) * 0.3;
    }
    
    setDisplayValue(tax.toFixed(2));
    addToHistory(`Tax on ₹${income} = ₹${tax.toFixed(2)}`);
  };

  const financialFunctions = [
    {text: 'EMI', func: calculateEMI},
    {text: 'CI', func: calculateCompoundInterest},
    {text: 'Tax', func: calculateTax},
    {text: 'ROI', func: () => {
      const profit = parseFloat(displayValue);
      const cost = parseFloat(principal);
      if (profit && cost) {
        const roi = ((profit - cost) / cost) * 100;
        setDisplayValue(roi.toFixed(2));
        addToHistory(`ROI: ${roi.toFixed(2)}%`);
      }
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
      case 'financial':
        return {backgroundColor: theme.colors.warning};
      default:
        return {backgroundColor: theme.colors.surface};
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={[styles.label, {color: theme.colors.text}]}>Loan Amount:</Text>
        <TextInput
          style={[styles.input, {backgroundColor: theme.colors.surface, color: theme.colors.text}]}
          value={loanAmount}
          onChangeText={setLoanAmount}
          placeholder="Enter loan amount"
          placeholderTextColor={theme.colors.textSecondary}
          keyboardType="numeric"
        />
        
        <Text style={[styles.label, {color: theme.colors.text}]}>Interest Rate (%):</Text>
        <TextInput
          style={[styles.input, {backgroundColor: theme.colors.surface, color: theme.colors.text}]}
          value={interestRate}
          onChangeText={setInterestRate}
          placeholder="Enter interest rate"
          placeholderTextColor={theme.colors.textSecondary}
          keyboardType="numeric"
        />
        
        <Text style={[styles.label, {color: theme.colors.text}]}>Loan Term (Years):</Text>
        <TextInput
          style={[styles.input, {backgroundColor: theme.colors.surface, color: theme.colors.text}]}
          value={loanTerm}
          onChangeText={setLoanTerm}
          placeholder="Enter loan term"
          placeholderTextColor={theme.colors.textSecondary}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.financialContainer}>
        {financialFunctions.map((button, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.financialButton, getButtonStyle('financial')]}
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
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  financialContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  financialButton: {
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

export default FinancialKeypad; 