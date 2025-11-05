import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Switch, Image } from 'react-native';
import Header from '../../components/Header';
import { useTheme } from '../../context/ThemeContext';

const MainMenuScreen = ({ navigation }) => {
  const { themeName, colors, toggleTheme } = useTheme();
  const isDarkMode = themeName === 'dark';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <Header title="Vision Hive" />
      <View style={[styles.content, { backgroundColor: colors.background }]}>
        <View style={styles.themeToggleContainer}>
          <Text style={{ color: colors.text }}>Modo Escuro</Text>
          <Switch
            trackColor={{ false: '#767577', true: colors.primary }}
            thumbColor={isDarkMode ? colors.primary : '#f4f3f4'}
            onValueChange={toggleTheme}
            value={isDarkMode}
          />
        </View>

        <Text style={[styles.title, { color: colors.text }]}>Gerenciamento</Text>

        <View style={styles.gridContainer}>
          <View style={styles.row}>
            <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={() => navigation.navigate('Filial')}>
              <Image source={require('../../assets/icons/filial.png')} style={styles.icon} />
              <Text style={styles.buttonText}>FILIAIS</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={() => navigation.navigate('Patio')}>
              <Image source={require('../../assets/icons/patio.png')} style={styles.icon} />
              <Text style={styles.buttonText}>PÁTIOS</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={() => navigation.navigate('Moto')}>
              <Image source={require('../../assets/icons/moto.png')} style={styles.icon} />
              <Text style={styles.buttonText}>MOTOS</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: colors.accent || colors.primary }]} onPress={() => navigation.navigate('FindMoto')}>
              <Image source={require('../../assets/icons/lupa.png')} style={styles.icon} />
              <Text style={styles.buttonText}>ENCONTRAR MOTO</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={() => navigation.navigate('Perfil')}>
              <Image source={require('../../assets/icons/person.png')} style={styles.icon} />
              <Text style={styles.buttonText}>PERFIL</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={() => navigation.navigate('About')}>
              <Image source={require('../../assets/icons/sobre.png')} style={styles.icon} />
              <Text style={styles.buttonText}>SOBRE O APP</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={[styles.footer, { backgroundColor: colors.primary }]} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  themeToggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
    top: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    marginTop: 60,
  },
  gridContainer: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    width: '48%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    padding: 10,
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 15,
    tintColor: '#FFFFFF',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  footer: {
    height: 80,
    width: '100%',
  },
});

export default MainMenuScreen;