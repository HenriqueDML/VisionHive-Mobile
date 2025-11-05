import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../hooks/auth';
import MailIcon from '../../assets/mail-01.svg';
import LockUnlocked from '../../assets/lock-unlocked-04.svg';
import { Input } from '../../components/Inputs/Input';
import { Button } from '../../components/Buttons/Button';
import CustomAlert from '../../components/CustomAlert';
import { useTranslation } from 'react-i18next';

const LoginScreen = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const { login } = useAuth();
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAlertVisible, setAlertVisible] = useState(false);
  const [alertInfo, setAlertInfo] = useState({ title: '', message: '' });

  const validateEmail = (text) => {
    setEmail(text);
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(!regex.test(text) ? t('login:emailInvalid') : '');
  };

  const validatePassword = (text) => {
    setPassword(text);
    setPasswordError(text.length < 6 ? t('login:passwordLength') : '');
  };
  
  const closeAlert = () => {
    setAlertVisible(false);
    if (alertInfo.title === t('login:alertSuccessTitle')) {
      navigation.replace('MainMenu');
    }
  };

  const handleLogin = async () => {
    let valid = true;
    if (!email) {
      setEmailError(t('login:fillEmail'));
      valid = false;
    } else if (emailError) valid = false;
    if (!password) {
      setPasswordError(t('login:fillPassword'));
      valid = false;
    } else if (passwordError) valid = false;
    if (!valid) return;

    setLoading(true);
    try {
      await login({ email, password });
      setAlertInfo({ title: t('login:alertSuccessTitle'), message: t('login:alertSuccessMessage') });
      setAlertVisible(true);
    } catch (error) {
      let errorMessage = t('login:alertGenericError');
      if (error?.code === 'auth/user-not-found' || error?.code === 'auth/invalid-credential') {
        errorMessage = t('login:alertInvalidCredentials');
      } else if (error?.code === 'auth/wrong-password') {
        errorMessage = t('login:alertWrongPassword');
      }
      setAlertInfo({ title: t('login:alertErrorTitle'), message: errorMessage });
      setAlertVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 20 }} keyboardShouldPersistTaps="handled">
        <Image source={require('../../assets/icons/logovision.jpg')} style={styles.logo} />
        <Text style={styles.title}>Vision Hive</Text>
        <Text style={styles.subtitle}>{t('login:subtitle')}</Text>
        <Input
          title={t('login:emailLabel')}
          icon={MailIcon}
          placeholder={t('login:emailPlaceholder')}
          value={email}
          onChangeText={validateEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#666"
          titleStyle={{ color: '#000' }}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        <Input
          title={t('login:passwordLabel')}
          icon={LockUnlocked}
          placeholder={t('login:passwordPlaceholder')}
          value={password}
          onChangeText={validatePassword}
          secureTextEntry
          placeholderTextColor="#666"
          titleStyle={{ color: '#000' }}
        />
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
        <Button label={loading ? '' : t('login:button')} onPress={handleLogin} style={styles.button}>
          {loading && <ActivityIndicator color="#fff" />}
        </Button>
        <View style={styles.registerRedirect}>
          <Text style={styles.noAccountText}>{t('login:noAccount')}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerText}>{t('login:register')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <CustomAlert
        isVisible={isAlertVisible}
        title={alertInfo.title}
        message={alertInfo.message}
        onClose={closeAlert}
        buttons={[{ text: t('common:ok'), onPress: closeAlert }]}
      />
    </>
  );
};

const getStyles = (colors) => StyleSheet.create({
  logo: { width: 100, height: 100, marginBottom: 20, resizeMode: 'contain', alignSelf: 'center' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#333', marginBottom: 4, textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 20, textAlign: 'center' },
  button: { backgroundColor: '#008000', borderRadius: 10, paddingVertical: 14, alignItems: 'center', justifyContent: 'center', marginTop: 12 },
  registerRedirect: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 4, marginTop: 14 },
  noAccountText: { color: '#333', fontSize: 12 },
  registerText: { color: '#008000', fontWeight: '600', fontSize: 12 },
  errorText: { color: 'red', fontSize: 12, marginTop: -4, marginBottom: 8 },
});

export default LoginScreen;