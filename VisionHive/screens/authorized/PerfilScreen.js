import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { useAuth } from '../../hooks/auth';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import ScreenLayout from '../../components/ScreenLayout';  

const PerfilScreen = () => {
  const { user, logout } = useAuth();
  const navigation = useNavigation();
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const handleLogout = async () => {
    try {
      await logout();
      navigation.replace('Login');
    } catch (error) {
      Alert.alert('Erro', error.message || 'Não foi possível sair.');
    }
  };

  return (
    <ScreenLayout>
      <View style={styles.pageContainer}>
        <View style={styles.pageTitleContainer}>
          <Image source={require('../../assets/icons/person.png')} style={styles.pageTitleIcon} />
          <Text style={styles.pageTitle}>Meu Perfil</Text>
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{user?.email}</Text>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </ScreenLayout>
  );
};

const getStyles = (colors) => StyleSheet.create({
  pageContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    alignItems: 'center',
  },
  pageTitleContainer: {
    position: 'absolute',
    top: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageTitleIcon: {
    width: 32,
    height: 32,
    marginRight: 12,
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.text,
  },
  infoContainer: {
    width: '100%',
    backgroundColor: colors.cardBackground,
    borderRadius: 10,
    padding: 20,
    marginBottom: 40,
  },
  label: {
    fontSize: 14,
    color: colors.secondary,
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '600',
    marginBottom: 5,
  },
  logoutButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PerfilScreen;