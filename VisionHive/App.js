import React from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import { AuthProvider } from "./hooks/auth";
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { FilialProvider } from './context/FilialContext';
import { PatioProvider } from './context/PatioContext';
import { MotoProvider } from './context/MotoContext';

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
    <AuthProvider>
      <ThemeProvider> 
        <FilialProvider>
          <PatioProvider>
            <MotoProvider>
              <AppContent />
            </MotoProvider>
          </PatioProvider>
        </FilialProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}