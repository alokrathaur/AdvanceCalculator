import React, { useState } from 'react';

type ConversionType = 'length' | 'weight' | 'temperature' | 'area' | 'volume';

const UnitConverter: React.FC = () => {
  const [conversionType, setConversionType] = useState<ConversionType>('length');
  const [fromValue, setFromValue] = useState('');
  const [fromUnit, setFromUnit] = useState('');
  const [toUnit, setToUnit] = useState('');
  const [result, setResult] = useState('');

  const conversionData = {
    length: {
      units: ['m', 'km', 'cm', 'mm', 'mi', 'yd', 'ft', 'in'],
      conversions: {
        m: 1,
        km: 1000,
        cm: 0.01,
        mm: 0.001,
        mi: 1609.34,
        yd: 0.9144,
        ft: 0.3048,
        in: 0.0254,
      },
    },
    weight: {
      units: ['kg', 'g', 'mg', 'lb', 'oz', 'ton'],
      conversions: {
        kg: 1,
        g: 0.001,
        mg: 0.000001,
        lb: 0.453592,
        oz: 0.0283495,
        ton: 1000,
      },
    },
    temperature: {
      units: ['°C', '°F', 'K'],
      conversions: {
        '°C': (value: number, toUnit: string) => {
          switch (toUnit) {
            case '°F':
              return (value * 9/5) + 32;
            case 'K':
              return value + 273.15;
            default:
              return value;
          }
        },
        '°F': (value: number, toUnit: string) => {
          switch (toUnit) {
            case '°C':
              return (value - 32) * 5/9;
            case 'K':
              return (value - 32) * 5/9 + 273.15;
            default:
              return value;
          }
        },
        'K': (value: number, toUnit: string) => {
          switch (toUnit) {
            case '°C':
              return value - 273.15;
            case '°F':
              return (value - 273.15) * 9/5 + 32;
            default:
              return value;
          }
        },
      },
    },
    area: {
      units: ['m²', 'km²', 'cm²', 'mm²', 'ac', 'ha'],
      conversions: {
        'm²': 1,
        'km²': 1000000,
        'cm²': 0.0001,
        'mm²': 0.000001,
        'ac': 4046.86,
        'ha': 10000,
      },
    },
    volume: {
      units: ['L', 'mL', 'm³', 'cm³', 'gal', 'qt'],
      conversions: {
        'L': 1,
        'mL': 0.001,
        'm³': 1000,
        'cm³': 0.001,
        'gal': 3.78541,
        'qt': 0.946353,
      },
    },
  };

  const convert = () => {
    if (!fromValue || !fromUnit || !toUnit) return;

    const value = parseFloat(fromValue);
    const data = conversionData[conversionType];

    if (conversionType === 'temperature') {
      const result = data.conversions[fromUnit as keyof typeof data.conversions](
        value,
        toUnit,
      ) as number;
      setResult(result.toFixed(2));
    } else {
      const fromFactor = data.conversions[fromUnit as keyof typeof data.conversions] as number;
      const toFactor = data.conversions[toUnit as keyof typeof data.conversions] as number;
      const result = (value * fromFactor) / toFactor;
      setResult(result.toFixed(4));
    }
  };

  const renderUnitButtons = () => {
    const units = conversionData[conversionType].units;
    return (
      <div className="unit-container">
        <div className="input-label">From Unit:</div>
        <div className="unit-grid">
          {units.map(unit => (
            <button
              key={unit}
              className={`unit-button ${fromUnit === unit ? 'selected' : ''}`}
              onClick={() => setFromUnit(unit)}>
              {unit}
            </button>
          ))}
        </div>

        <div className="input-label">To Unit:</div>
        <div className="unit-grid">
          {units.map(unit => (
            <button
              key={unit}
              className={`unit-button ${toUnit === unit ? 'selected' : ''}`}
              onClick={() => setToUnit(unit)}>
              {unit}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="mode-selector">
        {(['length', 'weight', 'temperature', 'area', 'volume'] as ConversionType[]).map(
          type => (
            <button
              key={type}
              className={`mode-button ${conversionType === type ? 'active' : ''}`}
              onClick={() => {
                setConversionType(type);
                setFromUnit('');
                setToUnit('');
                setResult('');
              }}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ),
        )}
      </div>

      <div className="input-container">
        <div className="input-label">Value:</div>
        <input
          className="input-field"
          value={fromValue}
          onChange={(e) => setFromValue(e.target.value)}
          placeholder="Enter value"
          type="number"
        />
      </div>

      {renderUnitButtons()}

      <button
        className="convert-button"
        onClick={convert}>
        Convert
      </button>

      {result && (
        <div className="result-container">
          <div className="result-text">
            {fromValue} {fromUnit} = {result} {toUnit}
          </div>
        </div>
      )}
    </div>
  );
};

export default UnitConverter; 