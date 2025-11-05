import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Text } from 'react-native';
import Header from '../../components/Header';
import Footer from '../../components/Footer'; 
import { useTheme } from '../../context/ThemeContext';

const AboutScreen = () => {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Sobre o App" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Descrição do Projeto</Text>
        <Text style={[styles.sectionText, { color: colors.text }]}>
          O VisionHive é um aplicativo mobile desenvolvido para automatizar e otimizar a gestão das motos nos pátios da empresa. O sistema permite o controle completo do fluxo de motos, desde o cadastro até a saída, com uma interface intuitiva e responsiva que funciona em qualquer dispositivo.
        </Text>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>Objetivos</Text>
        <Text style={[styles.listItem, { color: colors.text }]}>• Facilitar o cadastro e localização de motos no pátio</Text>
        <Text style={[styles.listItem, { color: colors.text }]}>• Permitir a visualização rápida do status de cada moto</Text>
        <Text style={[styles.listItem, { color: colors.text }]}>• Gerenciar múltiplas filiais com diferentes layouts de pátio</Text>
        <Text style={[styles.listItem, { color: colors.text }]}>• Oferecer uma interface intuitiva, acessível por dispositivos móveis</Text>
        <Text style={[styles.listItem, { color: colors.text }]}>• Agilizar os processos de movimentação e liberação de motos</Text>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>Problema Resolvido</Text>
        <Text style={[styles.sectionText, { color: colors.text }]}>
          Com centenas de motos distribuídas em diversos pátios, a empresa enfrenta dificuldades operacionais para localizar rapidamente veículos específicos, gerando atrasos logísticos e desperdício de tempo da equipe.
        </Text>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>Nossa Solução</Text>
        <Text style={[styles.sectionText, { color: colors.text }]}>
          O VisionHive propõe um sistema mobile completo que permite:
        </Text>
        <Text style={[styles.listItem, { color: colors.text }]}>• Cadastro detalhado de motos com informações de chassi, placa e motor</Text>
        <Text style={[styles.listItem, { color: colors.text }]}>• Controle de movimentação entre diferentes áreas</Text>
        <Text style={[styles.listItem, { color: colors.text }]}>• Gerenciamento de múltiplas filiais</Text>
        <Text style={[styles.listItem, { color: colors.text }]}>• Interface amigável e responsiva para uso em campo</Text>
      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
  },
  listItem: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 5,
  },
});

export default AboutScreen;