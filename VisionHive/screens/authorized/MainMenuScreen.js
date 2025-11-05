import React from 'react';
// import { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Switch, Image } from 'react-native';
// import { PermissionsAndroid, Platform } from 'react-native';
import Header from '../../components/Header';
import { useTheme } from '../../context/ThemeContext';
// import messaging from '@react-native-firebase/messaging';
import { useTranslation } from 'react-i18next';

// async function requestUserPermission() {
//   if (Platform.OS === 'android') {
//     await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
//     );
//   }
//   const authStatus = await messaging().requestPermission();
//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   if (enabled) {
//     console.log('Authorization status:', authStatus);
//     getFcmToken(); // Se a permissão for concedida, busca o token.
//   }
// }
// async function getFcmToken() {
//   try {
//     const token = await messaging().getToken();
//     console.log("Seu token FCM é:", token);
//   } catch (error) {
//     console.log("Erro ao obter o token FCM", error);
//   }
// }

const MainMenuScreen = ({ navigation }) => {
  const { themeName, colors, toggleTheme } = useTheme();
  const isDarkMode = themeName === 'dark';
  const { t } = useTranslation();

  // useEffect(() => {
  //   requestUserPermission();
  // }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <Header title={t('mainMenu:header')} />
      <View style={[styles.content, { backgroundColor: colors.background }]}>
        <View style={styles.themeToggleContainer}>
          <Text style={{ color: colors.text }}>{t('mainMenu:darkMode')}</Text>
          <Switch
            trackColor={{ false: '#767577', true: colors.primary }}
            thumbColor={isDarkMode ? colors.primary : '#f4f3f4'}
            onValueChange={toggleTheme}
            value={isDarkMode}
          />
        </View>

        <Text style={[styles.title, { color: colors.text }]}>{t('mainMenu:title')}</Text>

        <View style={styles.gridContainer}>
          <View style={styles.row}>
            <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={() => navigation.navigate('Filial')}>
              <Image source={require('../../assets/icons/filial.png')} style={styles.icon} />
              <Text style={styles.buttonText}>{t('mainMenu:branches')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={() => navigation.navigate('Patio')}>
              <Image source={require('../../assets/icons/patio.png')} style={styles.icon} />
              <Text style={styles.buttonText}>{t('mainMenu:yards')}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={() => navigation.navigate('Moto')}>
              <Image source={require('../../assets/icons/moto.png')} style={styles.icon} />
              <Text style={styles.buttonText}>{t('mainMenu:motorcycles')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: colors.accent || colors.primary }]} onPress={() => navigation.navigate('FindMoto')}>
              <Image source={require('../../assets/icons/lupa.png')} style={styles.icon} />
              <Text style={styles.buttonText}>{t('mainMenu:findMotorcycle')}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={() => navigation.navigate('Perfil')}>
              <Image source={require('../../assets/icons/person.png')} style={styles.icon} />
              <Text style={styles.buttonText}>{t('mainMenu:profile')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={() => navigation.navigate('About')}>
              <Image source={require('../../assets/icons/sobre.png')} style={styles.icon} />
              <Text style={styles.buttonText}>{t('mainMenu:about')}</Text>
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