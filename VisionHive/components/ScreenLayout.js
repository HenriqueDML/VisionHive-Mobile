import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import Header from './Header';
import Footer from './Footer';
import { useTheme } from '../context/ThemeContext';

const ScreenLayout = ({ children, title, showFooter = true }) => {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <Header title={title} />
      <View style={styles.contentContainer}>
        {children}
      </View>
      {showFooter && <Footer />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
});

export default ScreenLayout;