import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/unauthorized/LoginScreen';
import MainMenuScreen from '../screens/authorized/MainMenuScreen';
import FilialScreen from '../screens/authorized/FilialScreen';
import PatioScreen from '../screens/authorized/PatioScreen';
import MotoScreen from '../screens/authorized/MotoScreen';
import RegisterScreen from '../screens/unauthorized/RegisterScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
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