import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightTheme, darkTheme } from '../themes/colors';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemScheme = useColorScheme();
  const [themeName, setThemeName] = useState(systemScheme);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('@theme');
        if (savedTheme) {
          setThemeName(savedTheme);
        }
      } catch (error) {
        console.error("Erro ao carregar tema do AsyncStorage", error);
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newThemeName = themeName === 'light' ? 'dark' : 'light';
    setThemeName(newThemeName);
    try {
      await AsyncStorage.setItem('@theme', newThemeName);
    } catch (error) {
      console.error("Erro ao salvar tema no AsyncStorage", error);
    }
  };
  
  const colors = themeName === 'light' ? lightTheme : darkTheme;

  const value = {
    themeName,
    colors,
    toggleTheme,
  };
  
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
  }
  return context;
};