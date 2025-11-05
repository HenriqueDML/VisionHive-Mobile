import React from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView, Switch } from 'react-native';
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
        <View style={styles.buttonContainer}>
          <Button title="Filiais" onPress={() => navigation.navigate('Filial')} color={colors.primary} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Pátios" onPress={() => navigation.navigate('Patio')} color={colors.primary} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Motos" onPress={() => navigation.navigate('Moto')} color={colors.primary} />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Encontrar Moto"
            onPress={() => navigation.navigate('FindMoto')}
            color={colors.accent || colors.primary}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Perfil" onPress={() => navigation.navigate('Perfil')} color={colors.primary} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Sobre o App" onPress={() => navigation.navigate('About')} color={colors.primary} />
        </View>
      </View>

      <View style={[styles.footer, { backgroundColor: colors.primary }]} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 40 },
  buttonContainer: { width: '80%', marginVertical: 10 },
  themeToggleContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '80%', position: 'absolute', top: 20 },
  footer: { height: 80, width: '100%' },
});

export default MainMenuScreen;