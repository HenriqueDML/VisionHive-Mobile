import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, Button } from 'react-native';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useTheme } from '../../context/ThemeContext';
import CustomAlert from '../../components/CustomAlert';

const FindMotoScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('placa');
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setAlertTitle('Atenção');
      setAlertMessage('Por favor, digite um valor para a busca.');
      setIsAlertVisible(true);
      return;
    }
    
    setAlertTitle('IoT Ativado!');
    setAlertMessage(`A busca por ${searchType.toUpperCase()} "${searchQuery}" foi ativada.\nO dispositivo IoT está respondendo.`);
    setIsAlertVisible(true);
  };

  const handleEndSearch = () => {
    setSearchQuery('');
    setIsAlertVisible(false);
  };

  const handleDismissAlert = () => {
    setIsAlertVisible(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <Header title="Encontrar Moto" showBackButton={true} navigation={navigation} />
      
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.title, { color: colors.text }]}>Buscar pelo:</Text>
        
        <View style={styles.searchTypeContainer}>
          <TouchableOpacity
            style={[
              styles.searchTypeButton,
              { borderColor: colors.border },
              searchType === 'placa' && { backgroundColor: colors.primary, borderColor: colors.primary }
            ]}
            onPress={() => setSearchType('placa')}
          >
            <Text style={[styles.searchTypeButtonText, searchType === 'placa' && { color: colors.buttonText || colors.text }]}>Placa</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.searchTypeButton,
              { borderColor: colors.border },
              searchType === 'chassi' && { backgroundColor: colors.primary, borderColor: colors.primary }
            ]}
            onPress={() => setSearchType('chassi')}
          >
            <Text style={[styles.searchTypeButtonText, searchType === 'chassi' && { color: colors.buttonText || colors.text }]}>Chassi</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.searchTypeButton,
              { borderColor: colors.border },
              searchType === 'iot Id' && { backgroundColor: colors.primary, borderColor: colors.primary }
            ]}
            onPress={() => setSearchType('iot Id')}
          >
            <Text style={[styles.searchTypeButtonText, searchType === 'iotId' && { color: colors.buttonText || colors.text }]}>ID IOT</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={[styles.input, { borderColor: colors.border, color: colors.text, backgroundColor: colors.cardBackground }]}
          placeholder={`Digite o(a) ${searchType} da moto`}
          placeholderTextColor={colors.text}
          value={searchQuery}
          onChangeText={setSearchQuery}
          keyboardType={searchType === 'iot Id' ? 'numeric' : 'default'}
          autoCapitalize="characters"
        />

        <View style={styles.buttonActionContainer}>
          <Button title="BUSCAR" onPress={handleSearch} color={colors.primary} />
        </View>
      </View>

      <Footer />

      <CustomAlert
        isVisible={isAlertVisible}
        title={alertTitle}
        message={alertMessage}
        buttons={[
          { text: 'ENCERRAR BUSCA', onPress: handleEndSearch, style: 'outline' },
        ]}
        onClose={handleDismissAlert}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  searchTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  searchTypeButton: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
    borderWidth: 1,
    minWidth: 90,
    alignItems: 'center',
  },
  searchTypeButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#999',
  },
  input: {
    width: '90%',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
  },
  buttonActionContainer: {
    width: '90%',
  },
});

export default FindMotoScreen;