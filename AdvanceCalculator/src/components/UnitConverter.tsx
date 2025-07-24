import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import {useTheme} from '../context/ThemeContext';

type ConversionType = 'length' | 'weight' | 'temperature' | 'area' | 'volume';

const UnitConverter: React.FC = () => {
  const {theme} = useTheme();
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
      <View style={styles.unitContainer}>
        <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>From Unit:</Text>
        <View style={styles.unitGrid}>
          {units.map(unit => (
            <TouchableOpacity
              key={unit}
              style={[
                styles.unitButton,
                {backgroundColor: theme.colors.surface},
                fromUnit === unit && {backgroundColor: theme.colors.primary},
              ]}
              onPress={() => setFromUnit(unit)}>
              <Text
                style={[
                  styles.unitButtonText,
                  {color: fromUnit === unit ? '#fff' : theme.colors.text},
                ]}>
                {unit}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>To Unit:</Text>
        <View style={styles.unitGrid}>
          {units.map(unit => (
            <TouchableOpacity
              key={unit}
              style={[
                styles.unitButton,
                {backgroundColor: theme.colors.surface},
                toUnit === unit && {backgroundColor: theme.colors.accent},
              ]}
              onPress={() => setToUnit(unit)}>
              <Text
                style={[
                  styles.unitButtonText,
                  {color: toUnit === unit ? '#fff' : theme.colors.text},
                ]}>
                {unit}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.typeSelector}>
        {(['length', 'weight', 'temperature', 'area', 'volume'] as ConversionType[]).map(
          type => (
            <TouchableOpacity
              key={type}
              style={[
                styles.typeButton,
                {backgroundColor: theme.colors.surface},
                conversionType === type && {backgroundColor: theme.colors.primary},
              ]}
              onPress={() => {
                setConversionType(type);
                setFromUnit('');
                setToUnit('');
                setResult('');
              }}>
              <Text
                style={[
                  styles.typeButtonText,
                  {color: conversionType === type ? '#fff' : theme.colors.text},
                ]}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Text>
            </TouchableOpacity>
          ),
        )}
      </View>

      <View style={styles.inputContainer}>
        <Text style={[styles.label, {color: theme.colors.text}]}>Value:</Text>
        <TextInput
          style={[styles.input, {backgroundColor: theme.colors.surface, color: theme.colors.text}]}
          value={fromValue}
          onChangeText={setFromValue}
          placeholder="Enter value"
          placeholderTextColor={theme.colors.textSecondary}
          keyboardType="numeric"
        />
      </View>

      {renderUnitButtons()}

      <TouchableOpacity
        style={[styles.convertButton, {backgroundColor: theme.colors.accent}]}
        onPress={convert}>
        <Text style={[styles.convertButtonText, {color: '#fff'}]}>Convert</Text>
      </TouchableOpacity>

      {result && (
        <View style={[styles.resultContainer, {backgroundColor: theme.colors.surface}]}>
          <Text style={[styles.resultText, {color: theme.colors.text}]}>
            {fromValue} {fromUnit} = {result} {toUnit}
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  typeSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  typeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#666',
  },
  typeButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 18,
  },
  unitContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 16,
  },
  unitGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  unitButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#666',
  },
  unitButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  convertButton: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 20,
  },
  convertButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },
  resultContainer: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default UnitConverter; 