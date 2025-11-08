// import './services/i18n';
import React from 'react';
// import { useEffect } from 'react';
// import { Alert } from 'react-native';
import { StatusBar } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import { AuthProvider } from "./hooks/auth";
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { FilialProvider } from './context/FilialContext';
import { PatioProvider } from './context/PatioContext';
import { MotoProvider } from './context/MotoContext';
// import messaging from '@react-native-firebase/messaging';

const AppContent = () => {
    const { themeName } = useTheme();

    // useEffect(() => {
    //     const unsubscribe = messaging().onMessage(async remoteMessage => {
    //         Alert.alert(
    //             remoteMessage.notification.title,
    //             remoteMessage.notification.body
    //         );
    //     });
    //     messaging().onNotificationOpenedApp(remoteMessage => {
    //         console.log('Notification caused app to open from background state:', remoteMessage.notification);
    //     });
    //     messaging().getInitialNotification().then(remoteMessage => {
    //         if (remoteMessage) {
    //             console.log('Notification caused app to open from quit state:', remoteMessage.notification);
    //         }
    //     });
        
    //     return unsubscribe;
    // }, []);

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