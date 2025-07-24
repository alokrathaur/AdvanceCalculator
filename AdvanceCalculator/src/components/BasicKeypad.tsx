import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useTheme} from '../context/ThemeContext';

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
  const {theme} = useTheme();

  const buttons = [
    {text: 'C', type: 'clear', onPress: onClear},
    {text: '±', type: 'operation', onPress: () => {}},
    {text: '%', type: 'operation', onPress: () => {}},
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
    {text: '=', type: 'equals', onPress: onEquals},
  ];

  const getButtonStyle = (type: string) => {
    switch (type) {
      case 'clear':
        return {backgroundColor: theme.colors.error};
      case 'operation':
        return {backgroundColor: theme.colors.primary};
      case 'equals':
        return {backgroundColor: theme.colors.accent};
      default:
        return {backgroundColor: theme.colors.surface};
    }
  };

  return (
    <View style={styles.container}>
      {buttons.map((button, index) => (
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
  );
};

const styles = StyleSheet.create({
  container: {
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
    fontSize: 24,
    fontWeight: '600',
  },
});

export default BasicKeypad; 