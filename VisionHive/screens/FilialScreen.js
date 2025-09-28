import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Modal,
  TextInput,
  Button,
} from 'react-native';

import ScreenLayout from '../components/ScreenLayout';
import { useFilial } from '../context/FilialContext';
import { useTheme } from '../context/ThemeContext';

const FilialForm = ({ modalVisible, setModalVisible, filialSelecionada, salvarFilial }) => {
  const [nome, setNome] = useState('');
  const [bairro, setBairro] = useState('');
  const [cnpj, setCnpj] = useState('');
  
  useEffect(() => {
    if (filialSelecionada) {
      setNome(filialSelecionada.nome);
      setBairro(filialSelecionada.bairro);
      setCnpj(filialSelecionada.cnpj);
    } else {
      setNome('');
      setBairro('');
      setCnpj('');
    }
  }, [filialSelecionada, modalVisible]);

  const handleSalvar = () => {
    if (!nome || !bairro || !cnpj) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios!');
      return;
    }

    const filialData = { nome, bairro, cnpj };
    salvarFilial(filialData);
  };
  
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={formStyles.centeredView}>
        <View style={formStyles.modalView}>
          <Text style={formStyles.modalText}>{filialSelecionada ? 'Editar Filial' : 'Nova Filial'}</Text>
          <TextInput
            style={formStyles.input}
            placeholder="Nome da Filial"
            placeholderTextColor="#888"
            value={nome}
            onChangeText={setNome}
          />
          <TextInput
            style={formStyles.input}
            placeholder="Bairro"
            placeholderTextColor="#888"
            value={bairro}
            onChangeText={setBairro}
          />
          <TextInput
            style={formStyles.input}
            placeholder="CNPJ"
            placeholderTextColor="#888"
            value={cnpj}
            onChangeText={setCnpj}
          />
          <View style={formStyles.modalButtons}>
            <Button title="Cancelar" onPress={() => setModalVisible(false)} color="#D32F2F" />
            <Button title="Salvar" onPress={handleSalvar} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const FilialScreen = () => {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const { filiais, loading, error, listarFiliais, adicionarFilial, atualizarFilial, removerFilial } = useFilial();

  const [modalVisible, setModalVisible] = useState(false);
  const [filialSelecionada, setFilialSelecionada] = useState(null);
  
  useEffect(() => {
    listarFiliais();
  }, []);

  const handleAdicionar = () => { setFilialSelecionada(null); setModalVisible(true); };
  const handleEditar = (filial) => { setFilialSelecionada(filial); setModalVisible(true); };

  const handleDeletar = (id) => {
    Alert.alert(
      "Confirmar Exclusão",
      "Você tem certeza que deseja remover esta filial?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Sim, Remover", onPress: () => removerFilial(id), style: 'destructive' },
      ]
    );
  };
  
  const handleSalvarFilial = async (filialData) => {
    try {
      if (filialSelecionada) {
        await atualizarFilial(filialSelecionada.id, filialData);
      } else {
        await adicionarFilial(filialData);
      }
      setModalVisible(false);
    } catch (e) {
      Alert.alert('Erro ao salvar', 'Não foi possível salvar os dados. Tente novamente.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View>
        <Text style={styles.itemTitle}>{item.nome}</Text>
        <Text style={styles.itemText}>Bairro: {item.bairro}</Text>
        <Text style={styles.itemText}>CNPJ: {item.cnpj}</Text>
      </View>
      <View style={styles.itemActions}>
        <TouchableOpacity onPress={() => handleEditar(item)}>
            <Text style={{ color: '#FFA000', fontWeight: 'bold' }}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeletar(item.id)}>
            <Text style={{ color: '#D32F2F', fontWeight: 'bold', marginTop: 8 }}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScreenLayout title="Gerenciar Filiais">
      <TouchableOpacity style={styles.addButton} onPress={handleAdicionar}>
        <Text style={styles.addButtonText}>+ Adicionar Nova Filial</Text>
      </TouchableOpacity>

      {loading ? (
        <View style={styles.centeredContent}><ActivityIndicator size="large" color={colors.text} /></View>
      ) : error ? (
        <View style={styles.centeredContent}>
            <Text style={styles.errorText}>{error}</Text>
            <Button title="Tentar Novamente" onPress={listarFiliais} color={colors.primary} />
        </View>
      ) : (
        <FlatList
          data={filiais}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      )}
      
      {modalVisible && (
          <FilialForm 
            modalVisible={modalVisible} 
            setModalVisible={setModalVisible}
            filialSelecionada={filialSelecionada}
            salvarFilial={handleSalvarFilial}
          />
      )}
    </ScreenLayout>
  );
};

const getStyles = (colors) => StyleSheet.create({
  centeredContent: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { color: colors.text, marginBottom: 10 },
  addButton: { backgroundColor: colors.primary, padding: 15, borderRadius: 5, margin: 10, alignItems: 'center' },
  addButtonText: { color: colors.buttonText, fontWeight: 'bold', fontSize: 16 },
  itemContainer: { backgroundColor: colors.cardBackground, padding: 15, marginVertical: 8, marginHorizontal: 10, borderRadius: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  itemTitle: { color: colors.text, fontSize: 18, fontWeight: 'bold' },
  itemText: { color: colors.secondary },
  itemActions: { flexDirection: 'column' },
});

const formStyles = StyleSheet.create({
  centeredView: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalView: { margin: 20, width: '90%', backgroundColor: "white", borderRadius: 20, padding: 35, alignItems: "center", elevation: 5 },
  modalText: { marginBottom: 15, textAlign: "center", fontSize: 20, fontWeight: 'bold', color: '#000' },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, width: '100%', marginBottom: 15, padding: 10, borderRadius: 5, color: '#000'},
  modalButtons: { flexDirection: 'row', justifyContent: 'space-around', width: '60%' },
});

export default FilialScreen;