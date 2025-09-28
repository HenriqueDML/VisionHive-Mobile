import React from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './navigation/AppNavigator';

// Importe TODOS os seus providers
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { FilialProvider } from './context/FilialContext';
import { PatioProvider } from './context/PatioContext';
import { MotoProvider } from './context/MotoContext';

// Criamos este pequeno componente para que a StatusBar possa usar o hook useTheme()
const AppContent = () => {
    const { themeName } = useTheme();
    return (
        <>
            <StatusBar barStyle={themeName === 'dark' ? 'light-content' : 'dark-content'} />
            <AppNavigator />
        </>
    );
};

export default function App() {
  return (
    // O ThemeProvider deve ficar por fora de todos, para que todos os outros
    // contextos e telas possam usar o tema se precisarem.
    <ThemeProvider> 
      <FilialProvider>
        <PatioProvider>
          <MotoProvider>
            <AppContent />
          </MotoProvider>
        </PatioProvider>
      </FilialProvider>
    </ThemeProvider>
  );
}