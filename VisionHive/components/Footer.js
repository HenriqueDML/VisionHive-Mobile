import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const navItems = [
    {
      label: 'Menu',
      icon: require('../assets/icons/voltar.png'),
      target: 'MainMenu',
    },
    {
      label: 'Filiais',
      icon: require('../assets/icons/filial.png'),
      target: 'Filial',
    },
    {
      label: 'Pátios',
      icon: require('../assets/icons/patio.png'),
      target: 'Patio',
    },
    {
      label: 'Motos',
      icon: require('../assets/icons/moto.png'),
      target: 'Moto',
    },
    {
      label: 'Encontrar',
      icon: require('../assets/icons/lupa.png'),
      target: 'FindMoto',
    },
    {
      label: 'Perfil',
      icon: require('../assets/icons/person.png'),
      target: 'Perfil',
    },
  ];

  return (
    <View style={[styles.footer, { backgroundColor: colors.primary, paddingBottom: insets.bottom === 0 ? 10 : insets.bottom }]}>
      {navItems.map(item => {
        const isActive = route.name === item.target;
        const iconColor = isActive ? '#FFFFFF' : '#A9D8A9';

        return (
          <TouchableOpacity
            key={item.target}
            style={styles.navButton}
            onPress={() => navigation.navigate(item.target)}
          >
            <Image
              source={item.icon}
              style={[styles.icon, { tintColor: iconColor }]}
            />
            <Text style={[styles.label, { color: iconColor }]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    height: 80,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 28,
    height: 28,
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default Footer;