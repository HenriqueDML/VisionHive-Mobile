import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightTheme, darkTheme } from '../themes/colors'; // Confirme se o caminho está correto

// 1. Criar o Contexto
export const ThemeContext = createContext();

// 2. Criar o Provedor
export const ThemeProvider = ({ children }) => {
  const systemScheme = useColorScheme(); // Pega o tema do sistema operacional ('light' ou 'dark')
  const [themeName, setThemeName] = useState(systemScheme); // O estado guarda o NOME do tema ('light' ou 'dark')

  // Efeito para carregar a preferência do usuário salva no dispositivo
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

  // Função para trocar o tema e salvar a preferência
  const toggleTheme = async () => {
    const newThemeName = themeName === 'light' ? 'dark' : 'light';
    setThemeName(newThemeName);
    try {
      await AsyncStorage.setItem('@theme', newThemeName);
    } catch (error) {
      console.error("Erro ao salvar tema no AsyncStorage", error);
    }
  };
  
  // Com base no NOME do tema, selecionamos o OBJETO de cores correto
  const colors = themeName === 'light' ? lightTheme : darkTheme;

  // Disponibilizamos tudo que os componentes filhos precisam
  const value = {
    themeName, // O nome: 'light' ou 'dark'
    colors,    // O objeto com as cores
    toggleTheme, // A função para trocar
  };
  
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

// 3. Criar o Hook customizado para facilitar o uso
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
  }
  return context;
};