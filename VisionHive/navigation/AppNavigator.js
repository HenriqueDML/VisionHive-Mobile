import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import LoginScreen from '../screens/unauthorized/LoginScreen';
import RegisterScreen from '../screens/unauthorized/RegisterScreen';
import MainMenuScreen from '../screens/authorized/MainMenuScreen';
import FilialScreen from '../screens/authorized/FilialScreen';
import PatioScreen from '../screens/authorized/PatioScreen';
import MotoScreen from '../screens/authorized/MotoScreen';
import PerfilScreen from '../screens/authorized/PerfilScreen';
import FindMotoScreen from '../screens/authorized/FindMoto';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <SafeAreaProvider>
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
          <Stack.Screen name="Filial" component={FilialScreen} />
          <Stack.Screen name="Patio" component={PatioScreen} />
          <Stack.Screen name="Moto" component={MotoScreen} />
          <Stack.Screen name="Perfil" component={PerfilScreen} />
          <Stack.Screen name="FindMoto" component={FindMotoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default AppNavigator;