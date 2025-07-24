import React from 'react';

interface BasicKeypadProps {
  onDigitPress: (digit: string) => void;
  onDecimalPress: () => void;
  onOperationPress: (operation: string) => void;
  onClear: () => void;
  onEquals: () => void;
}

const BasicKeypad: React.FC<BasicKeypadProps> = ({
  onDigitPress,
  onDecimalPress,
  onOperationPress,
  onClear,
  onEquals,
}) => {
  const buttons = [
    { text: 'C', type: 'clear', onClick: onClear },
    { text: '±', type: 'operation', onClick: () => {} },
    { text: '%', type: 'operation', onClick: () => {} },
    { text: '÷', type: 'operation', onClick: () => onOperationPress('÷') },
    { text: '7', type: 'digit', onClick: () => onDigitPress('7') },
    { text: '8', type: 'digit', onClick: () => onDigitPress('8') },
    { text: '9', type: 'digit', onClick: () => onDigitPress('9') },
    { text: '×', type: 'operation', onClick: () => onOperationPress('×') },
    { text: '4', type: 'digit', onClick: () => onDigitPress('4') },
    { text: '5', type: 'digit', onClick: () => onDigitPress('5') },
    { text: '6', type: 'digit', onClick: () => onDigitPress('6') },
    { text: '-', type: 'operation', onClick: () => onOperationPress('-') },
    { text: '1', type: 'digit', onClick: () => onDigitPress('1') },
    { text: '2', type: 'digit', onClick: () => onDigitPress('2') },
    { text: '3', type: 'digit', onClick: () => onDigitPress('3') },
    { text: '+', type: 'operation', onClick: () => onOperationPress('+') },
    { text: '0', type: 'digit', onClick: () => onDigitPress('0'), style: { gridColumn: 'span 2' } },
    { text: '.', type: 'digit', onClick: onDecimalPress },
    { text: '=', type: 'equals', onClick: onEquals },
  ];

  return (
    <div className="keypad">
      {buttons.map((button, index) => (
        <button
          key={index}
          className={`button ${button.type}`}
          onClick={button.onClick}
          style={button.style}>
          {button.text}
        </button>
      ))}
    </div>
  );
};

export default BasicKeypad; 