import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, Image } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const Header = ({ title }) => {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ backgroundColor: colors.primary }}>
      <View style={[styles.headerContainer, { backgroundColor: colors.primary }]}>
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight > 30 ? 0 : StatusBar.currentHeight,
  },
  logo: {
      width: 40,
      height: 40,
      resizeMode: 'contain',
      marginRight: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default Header;