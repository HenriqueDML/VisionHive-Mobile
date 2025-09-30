import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import Header from './Header'; 
import Footer from './Footer'; 
import { useTheme } from '../context/ThemeContext';

const ScreenLayout = ({ children, title, showHeader = true, showFooter = true }) => {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>

      {showHeader && <Header title={title} />}
      
      <View style={styles.content}>
        {children}
      </View>
      
      {showFooter && <Footer />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

export default ScreenLayout;