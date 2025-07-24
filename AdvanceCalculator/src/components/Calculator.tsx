import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from '../context/ThemeContext';
import Display from './Display';
import BasicKeypad from './BasicKeypad';
import ScientificKeypad from './ScientificKeypad';
import FinancialKeypad from './FinancialKeypad';
import UnitConverter from './UnitConverter';
import History from './History';

type CalculatorMode = 'basic' | 'scientific' | 'financial' | 'converter';

const Calculator: React.FC = () => {
  const {theme} = useTheme();
  const [mode, setMode] = useState<CalculatorMode>('basic');
  const [displayValue, setDisplayValue] = useState('0');
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  const clearAll = () => {
    setDisplayValue('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplayValue(digit);
      setWaitingForOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? digit : displayValue + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplayValue('0.');
      setWaitingForOperand(false);
    } else if (displayValue.indexOf('.') === -1) {
      setDisplayValue(displayValue + '.');
    }
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(displayValue);

    if (previousValue === null) {
      setPreviousValue(displayValue);
    } else if (operation) {
      const currentValue = parseFloat(previousValue);
      const newValue = calculate(currentValue, inputValue, operation);
      setDisplayValue(String(newValue));
      setPreviousValue(String(newValue));
      addToHistory(`${currentValue} ${operation} ${inputValue} = ${newValue}`);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      default:
        return secondValue;
    }
  };

  const addToHistory = (calculation: string) => {
    setHistory(prev => [calculation, ...prev.slice(0, 9)]);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const renderKeypad = () => {
    switch (mode) {
      case 'basic':
        return (
          <BasicKeypad
            onDigitPress={inputDigit}
            onDecimalPress={inputDecimal}
            onOperationPress={performOperation}
            onClear={clearAll}
            onEquals={() => {
              if (operation && previousValue) {
                const inputValue = parseFloat(displayValue);
                const currentValue = parseFloat(previousValue);
                const newValue = calculate(currentValue, inputValue, operation);
                setDisplayValue(String(newValue));
                setPreviousValue(null);
                setOperation(null);
                setWaitingForOperand(true);
                addToHistory(`${currentValue} ${operation} ${inputValue} = ${newValue}`);
              }
            }}
          />
        );
      case 'scientific':
        return (
          <ScientificKeypad
            onDigitPress={inputDigit}
            onDecimalPress={inputDecimal}
            onOperationPress={performOperation}
            onClear={clearAll}
            displayValue={displayValue}
            setDisplayValue={setDisplayValue}
            addToHistory={addToHistory}
          />
        );
      case 'financial':
        return (
          <FinancialKeypad
            onDigitPress={inputDigit}
            onDecimalPress={inputDecimal}
            onOperationPress={performOperation}
            onClear={clearAll}
            displayValue={displayValue}
            setDisplayValue={setDisplayValue}
            addToHistory={addToHistory}
          />
        );
      case 'converter':
        return <UnitConverter />;
      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={styles.header}>
        <Text style={[styles.title, {color: theme.colors.text}]}>
          Advanced Calculator
        </Text>
        <View style={styles.modeSelector}>
          {(['basic', 'scientific', 'financial', 'converter'] as CalculatorMode[]).map(
            modeOption => (
              <TouchableOpacity
                key={modeOption}
                style={[
                  styles.modeButton,
                  mode === modeOption && {backgroundColor: theme.colors.primary},
                ]}
                onPress={() => setMode(modeOption)}>
                <Text
                  style={[
                    styles.modeButtonText,
                    {color: mode === modeOption ? '#fff' : theme.colors.text},
                  ]}>
                  {modeOption.charAt(0).toUpperCase() + modeOption.slice(1)}
                </Text>
              </TouchableOpacity>
            ),
          )}
        </View>
      </View>

      <Display value={displayValue} />

      {mode !== 'converter' && (
        <History
          history={history}
          onClear={clearHistory}
          onSelect={(value) => setDisplayValue(value)}
        />
      )}

      <View style={styles.keypadContainer}>{renderKeypad()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  modeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  modeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#666',
  },
  modeButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  keypadContainer: {
    flex: 1,
  },
});

export default Calculator; 