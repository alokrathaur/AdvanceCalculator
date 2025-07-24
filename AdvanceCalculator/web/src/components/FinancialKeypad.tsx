import React, { useState } from 'react';
import BasicKeypad from './BasicKeypad';

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
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');

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
    { text: 'EMI', onClick: calculateEMI },
    { text: 'Tax', onClick: calculateTax },
    { text: 'ROI', onClick: () => {
      const profit = parseFloat(displayValue);
      const cost = parseFloat(loanAmount);
      if (profit && cost) {
        const roi = ((profit - cost) / cost) * 100;
        setDisplayValue(roi.toFixed(2));
        addToHistory(`ROI: ${roi.toFixed(2)}%`);
      }
    }},
  ];

  return (
    <div>
      <div className="input-container">
        <div className="input-label">Loan Amount:</div>
        <input
          className="input-field"
          value={loanAmount}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLoanAmount(e.target.value)}
          placeholder="Enter loan amount"
          type="number"
        />
        
        <div className="input-label">Interest Rate (%):</div>
        <input
          className="input-field"
          value={interestRate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInterestRate(e.target.value)}
          placeholder="Enter interest rate"
          type="number"
        />
        
        <div className="input-label">Loan Term (Years):</div>
        <input
          className="input-field"
          value={loanTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLoanTerm(e.target.value)}
          placeholder="Enter loan term"
          type="number"
        />
      </div>

      <div className="scientific-keypad">
        {financialFunctions.map((button, index) => (
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

export default FinancialKeypad; 