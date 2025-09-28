import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ backgroundColor: colors.primary }}>
      <View style={[styles.footer, { backgroundColor: colors.primary }]}>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#FFFFFF' }]} onPress={() => navigation.navigate('MainMenu')}>
          <Text style={[styles.buttonText, { color: colors.primary }]}>Voltar ao Menu Principal</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  footer: { height: 80, width: '100%', justifyContent: 'center', alignItems: 'center', paddingTop: 10, paddingBottom: 20 },
  button: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20 },
  buttonText: { fontSize: 16, fontWeight: 'bold' },
});

export default Footer;