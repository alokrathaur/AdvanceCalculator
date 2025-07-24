import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme} from '../context/ThemeContext';

interface DisplayProps {
  value: string;
}

const Display: React.FC<DisplayProps> = ({value}) => {
  const {theme} = useTheme();

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.surface}]}>
      <Text style={[styles.text, {color: theme.colors.text}]} numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
  },
  text: {
    fontSize: 36,
    fontWeight: '300',
  },
});

export default Display; 