import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, Image } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const Header = ({ title }) => {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ backgroundColor: colors.primary }}>
      {/* O container agora usa 'center' para o justifyContent */}
      <View style={[styles.headerContainer, { backgroundColor: colors.primary }]}>
        
        {/* Usamos o seu logo JPG, que não precisa de tintColor */}
        <Image
            source={require('../assets/icons/logovision.jpg')} 
            style={styles.logo}
        />

        <Text style={[styles.title, { color: colors.buttonText }]}>{title}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 80,
    width: '100%',
    flexDirection: 'row',   // Itens lado a lado
    justifyContent: 'center', // << Centraliza horizontalmente
    alignItems: 'center',   // << Centraliza verticalmente
    paddingTop: StatusBar.currentHeight > 30 ? 0 : StatusBar.currentHeight,
  },
  logo: {
      width: 40,
      height: 40,
      resizeMode: 'contain',
      marginRight: 10, // << Adiciona um espaço entre o logo e o título
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default Header;