import React from 'react';
import {StatusBar, SafeAreaView, StyleSheet} from 'react-native';
import {ThemeProvider} from './context/ThemeContext';
import Calculator from './components/Calculator';

const App = () => {
  return (
    <ThemeProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
        <Calculator />
      </SafeAreaView>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
});

export default App; 