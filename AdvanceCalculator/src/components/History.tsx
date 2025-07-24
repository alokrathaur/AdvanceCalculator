import React from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {useTheme} from '../context/ThemeContext';

interface HistoryProps {
  history: string[];
  onClear: () => void;
  onSelect: (value: string) => void;
}

const History: React.FC<HistoryProps> = ({history, onClear, onSelect}) => {
  const {theme} = useTheme();

  if (history.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, {color: theme.colors.text}]}>History</Text>
        <TouchableOpacity onPress={onClear}>
          <Text style={[styles.clearButton, {color: theme.colors.error}]}>Clear</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.historyList} showsVerticalScrollIndicator={false}>
        {history.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.historyItem, {backgroundColor: theme.colors.surface}]}
            onPress={() => {
              const result = item.split('=').pop()?.trim();
              if (result) {
                onSelect(result);
              }
            }}>
            <Text style={[styles.historyText, {color: theme.colors.text}]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: 150,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  clearButton: {
    fontSize: 14,
    fontWeight: '600',
  },
  historyList: {
    maxHeight: 120,
  },
  historyItem: {
    padding: 8,
    borderRadius: 8,
    marginBottom: 4,
  },
  historyText: {
    fontSize: 14,
    fontWeight: '400',
  },
});

export default History; 