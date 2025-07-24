import React, {createContext, useContext, useState, ReactNode} from 'react';

export interface Theme {
  name: 'dark' | 'light';
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    accent: string;
    error: string;
    success: string;
    warning: string;
    border: string;
  };
}

const darkTheme: Theme = {
  name: 'dark',
  colors: {
    primary: '#6200ee',
    secondary: '#03dac6',
    background: '#1a1a1a',
    surface: '#2d2d2d',
    text: '#ffffff',
    textSecondary: '#b3b3b3',
    accent: '#bb86fc',
    error: '#cf6679',
    success: '#4caf50',
    warning: '#ff9800',
    border: '#404040',
  },
};

const lightTheme: Theme = {
  name: 'light',
  colors: {
    primary: '#6200ee',
    secondary: '#03dac6',
    background: '#f5f5f5',
    surface: '#ffffff',
    text: '#000000',
    textSecondary: '#666666',
    accent: '#bb86fc',
    error: '#b00020',
    success: '#4caf50',
    warning: '#ff9800',
    border: '#e0e0e0',
  },
};

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({children}) => {
  const [theme, setTheme] = useState<Theme>(darkTheme);

  const toggleTheme = () => {
    setTheme(theme.name === 'dark' ? lightTheme : darkTheme);
  };

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
}; 