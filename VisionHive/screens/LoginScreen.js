import React, { useState } from 'react';
import { 
    View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, Image 
} from 'react-native';

import { useTheme } from '../context/ThemeContext';

const LoginScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  
  const handleLogin = async () => {
    if (email === '' || password === '') {
        Alert.alert('Erro', 'Por favor, preencha o e-mail e a senha.');
        return;
    }
    setLoading(true);
    try {
        console.log("Simulando login com:", email, password);
        setTimeout(() => {
            navigation.replace('MainMenu'); 
            setLoading(false);
        }, 1500);
    } catch (error) {
        setLoading(false);
        Alert.alert('Erro no Login', 'Verifique suas credenciais e tente novamente.');
    }
  };
  
  return (
    <View style={styles.container}>
        <Image
            source={require('../assets/icons/logovision.jpg')}
            style={styles.logo}
        />

        <Text style={styles.title}>Vision Hive</Text>
        <Text style={styles.subtitle}>Acesse sua conta</Text>

        <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor={colors.secondary}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
        />
        <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor={colors.secondary}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
        />

        {loading ? (
            <ActivityIndicator size="large" color={colors.primary} />
        ) : (
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
        )}
        
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.linkText}>Não tem uma conta? Cadastre-se</Text>
        </TouchableOpacity>
    </View>
  );
};

const getStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: colors.secondary,
    marginBottom: 40,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: colors.cardBackground,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
    color: colors.text,
    borderColor: colors.borderColor,
    borderWidth: 1,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: colors.buttonText,
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkText: {
    color: colors.primary,
    marginTop: 20,
  },
});

export default LoginScreen;