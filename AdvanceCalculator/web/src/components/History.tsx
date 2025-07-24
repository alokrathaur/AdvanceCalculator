import React from 'react';

interface HistoryProps {
  history: string[];
  onClear: () => void;
  onSelect: (value: string) => void;
}

const History: React.FC<HistoryProps> = ({ history, onClear, onSelect }) => {
  if (history.length === 0) {
    return null;
  }

  return (
    <div className="history">
      <div className="history-header">
        <div className="history-title">History</div>
        <div className="clear-history" onClick={onClear}>
          Clear
        </div>
      </div>
      
      <div className="history-list">
        {history.map((item, index) => (
          <div
            key={index}
            className="history-item"
            onClick={() => {
              const result = item.split('=').pop()?.trim();
              if (result) {
                onSelect(result);
              }
            }}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default History; 