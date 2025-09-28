import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importe suas telas
import LoginScreen from '../screens/LoginScreen';
import MainMenuScreen from '../screens/MainMenuScreen';
import FilialScreen from '../screens/FilialScreen';
import PatioScreen from '../screens/PatioScreen';
import MotoScreen from '../screens/MotoScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login" // A primeira tela é Login
        screenOptions={{
          headerShown: false, // Vamos usar nosso próprio Header
        }}
      >
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MainMenu" component={MainMenuScreen} />
        <Stack.Screen name="Filiais" component={FilialScreen} />
        <Stack.Screen name="Patios" component={PatioScreen} />
        <Stack.Screen name="Motos" component={MotoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;