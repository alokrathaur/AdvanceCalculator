import React, { useState } from 'react';
import Display from './Display';
import BasicKeypad from './BasicKeypad';
import ScientificKeypad from './ScientificKeypad';
import FinancialKeypad from './FinancialKeypad';
import UnitConverter from './UnitConverter';
import History from './History';

type CalculatorMode = 'basic' | 'scientific' | 'financial' | 'converter';

const Calculator: React.FC = () => {
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
    <div className="calculator-container">
      <div className="calculator-header">
        <h1 className="calculator-title">Advanced Calculator</h1>
        <div className="mode-selector">
          {(['basic', 'scientific', 'financial', 'converter'] as CalculatorMode[]).map(
            modeOption => (
              <button
                key={modeOption}
                className={`mode-button ${mode === modeOption ? 'active' : ''}`}
                onClick={() => setMode(modeOption)}>
                {modeOption.charAt(0).toUpperCase() + modeOption.slice(1)}
              </button>
            ),
          )}
        </div>
      </div>

      <Display value={displayValue} />

      {mode !== 'converter' && (
        <History
          history={history}
          onClear={clearHistory}
          onSelect={(value) => setDisplayValue(value)}
        />
      )}

      <div className="keypad-container">
        {renderKeypad()}
      </div>
    </div>
  );
};

export default Calculator; 