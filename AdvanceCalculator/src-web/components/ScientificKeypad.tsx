import React from 'react';
import BasicKeypad from './BasicKeypad';

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
  const scientificFunctions = [
    { text: 'sin', onClick: () => {
      const value = Math.sin(parseFloat(displayValue) * Math.PI / 180);
      setDisplayValue(value.toString());
      addToHistory(`sin(${displayValue}°) = ${value}`);
    }},
    { text: 'cos', onClick: () => {
      const value = Math.cos(parseFloat(displayValue) * Math.PI / 180);
      setDisplayValue(value.toString());
      addToHistory(`cos(${displayValue}°) = ${value}`);
    }},
    { text: 'tan', onClick: () => {
      const value = Math.tan(parseFloat(displayValue) * Math.PI / 180);
      setDisplayValue(value.toString());
      addToHistory(`tan(${displayValue}°) = ${value}`);
    }},
    { text: 'log', onClick: () => {
      const value = Math.log10(parseFloat(displayValue));
      setDisplayValue(value.toString());
      addToHistory(`log(${displayValue}) = ${value}`);
    }},
    { text: 'ln', onClick: () => {
      const value = Math.log(parseFloat(displayValue));
      setDisplayValue(value.toString());
      addToHistory(`ln(${displayValue}) = ${value}`);
    }},
    { text: '√', onClick: () => {
      const value = Math.sqrt(parseFloat(displayValue));
      setDisplayValue(value.toString());
      addToHistory(`√(${displayValue}) = ${value}`);
    }},
    { text: 'x²', onClick: () => {
      const value = Math.pow(parseFloat(displayValue), 2);
      setDisplayValue(value.toString());
      addToHistory(`${displayValue}² = ${value}`);
    }},
    { text: 'x³', onClick: () => {
      const value = Math.pow(parseFloat(displayValue), 3);
      setDisplayValue(value.toString());
      addToHistory(`${displayValue}³ = ${value}`);
    }},
    { text: '1/x', onClick: () => {
      const value = 1 / parseFloat(displayValue);
      setDisplayValue(value.toString());
      addToHistory(`1/${displayValue} = ${value}`);
    }},
    { text: 'π', onClick: () => {
      setDisplayValue(Math.PI.toString());
    }},
    { text: 'e', onClick: () => {
      setDisplayValue(Math.E.toString());
    }},
    { text: 'n!', onClick: () => {
      const n = parseInt(displayValue);
      let factorial = 1;
      for (let i = 2; i <= n; i++) {
        factorial *= i;
      }
      setDisplayValue(factorial.toString());
      addToHistory(`${displayValue}! = ${factorial}`);
    }},
  ];

  return (
    <div>
      <div className="scientific-keypad">
        {scientificFunctions.map((button, index) => (
          <button
            key={index}
            className="scientific-button"
            onClick={button.onClick}>
            {button.text}
          </button>
        ))}
      </div>
      
      <BasicKeypad
        onDigitPress={onDigitPress}
        onDecimalPress={onDecimalPress}
        onOperationPress={onOperationPress}
        onClear={onClear}
        onEquals={() => {}}
      />
    </div>
  );
};

export default ScientificKeypad; 