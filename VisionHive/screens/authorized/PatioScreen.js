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
import { Picker } from '@react-native-picker/picker';
import ScreenLayout from '../../components/ScreenLayout';
import { usePatio } from '../../context/PatioContext';
import { useFilial } from '../../context/FilialContext';
import { useTheme } from '../../context/ThemeContext';

const PatioForm = ({ modalVisible, setModalVisible, patioSelecionado, salvarPatio, filiais }) => {
  const [nome, setNome] = useState('');
  const [limiteMotos, setLimiteMotos] = useState('');
  const [filialId, setFilialId] = useState(null);

  useEffect(() => {
    if (patioSelecionado) {
      setNome(patioSelecionado.nome);
      setLimiteMotos(patioSelecionado.limiteMotos.toString());
      setFilialId(patioSelecionado.filialId);
    } else {
      setNome('');
      setLimiteMotos('');
      setFilialId(filiais.length > 0 ? filiais[0].id : null);
    }
  }, [patioSelecionado, modalVisible]);

  const handleSalvar = () => {
    if (!nome || !limiteMotos || !filialId) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios!');
      return;
    }

    const patioData = {
      nome,
      limiteMotos: parseInt(limiteMotos, 10),
      filialId,
    };
    salvarPatio(patioData);
  };

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={formStyles.centeredView}>
        <View style={formStyles.modalView}>
          <Text style={formStyles.modalText}>{patioSelecionado ? 'Editar Pátio' : 'Novo Pátio'}</Text>
          <TextInput
            style={formStyles.input}
            placeholder="Nome do Pátio"
            placeholderTextColor="#888"
            value={nome}
            onChangeText={setNome}
          />
          <TextInput
            style={formStyles.input}
            placeholder="Limite de Motos"
            placeholderTextColor="#888"
            value={limiteMotos}
            onChangeText={setLimiteMotos}
            keyboardType="numeric"
          />
          <Text style={formStyles.pickerLabel}>Filial</Text>
          <View style={formStyles.pickerContainer}>
            <Picker
              selectedValue={filialId}
              onValueChange={(itemValue) => setFilialId(itemValue)}
              style={formStyles.picker}
            >
              {filiais.map(filial => (
                <Picker.Item key={filial.id} label={filial.nome} value={filial.id} />
              ))}
            </Picker>
          </View>
          <View style={formStyles.modalButtons}>
            <Button title="Cancelar" onPress={() => setModalVisible(false)} color="#D32F2F" />
            <Button title="Salvar" onPress={handleSalvar} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const PatioScreen = () => {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const { patios, loading, error, listarPatios, adicionarPatio, atualizarPatio, removerPatio } = usePatio();
  const { filiais, listarFiliais: carregarFiliais } = useFilial();

  const [modalVisible, setModalVisible] = useState(false);
  const [patioSelecionado, setPatioSelecionado] = useState(null);

  useEffect(() => {
    listarPatios();
    carregarFiliais();
  }, []);

  const handleAdicionar = () => {
    setPatioSelecionado(null);
    setModalVisible(true);
  };

  const handleEditar = (patio) => {
    setPatioSelecionado(patio);
    setModalVisible(true);
  };

  const handleDeletar = (id) => {
    Alert.alert("Confirmar Exclusão", "Remover este pátio também removerá todas as motos nele. Deseja continuar?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Sim, Remover", onPress: () => removerPatio(id), style: 'destructive' },
    ]);
  };

  const handleSalvarPatio = async (patioData) => {
    try {
      if (patioSelecionado) {
        await atualizarPatio(patioSelecionado.id, patioData);
      } else {
        await adicionarPatio(patioData);
      }
      setModalVisible(false);
    } catch (e) {
      Alert.alert('Erro ao salvar', 'Não foi possível salvar os dados do pátio.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View>
        <Text style={styles.itemTitle}>{item.nome}</Text>
        <Text style={styles.itemText}>Filial: {item.filial}</Text>
        <Text style={styles.itemText}>Limite: {item.limiteMotos} motos</Text>
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
    <ScreenLayout title="Gerenciar Pátios">
      <TouchableOpacity style={styles.addButton} onPress={handleAdicionar}>
        <Text style={styles.addButtonText}>+ Adicionar Novo Pátio</Text>
      </TouchableOpacity>
      {loading ? (
        <View style={styles.centeredContent}><ActivityIndicator size="large" color={colors.text} /></View>
      ) : error ? (
        <View style={styles.centeredContent}>
          <Text style={styles.errorText}>{error}</Text>
          <Button title="Tentar Novamente" onPress={listarPatios} color={colors.primary} />
        </View>
      ) : (
        <FlatList
          data={patios}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      )}

      {modalVisible && (
        <PatioForm
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          patioSelecionado={patioSelecionado}
          salvarPatio={handleSalvarPatio}
          filiais={filiais}
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
  input: { height: 40, borderColor: 'gray', borderWidth: 1, width: '100%', marginBottom: 15, padding: 10, borderRadius: 5, color: '#000' },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-around', width: '60%' },
  pickerLabel: { alignSelf: 'flex-start', color: '#333', marginBottom: 5 },
  pickerContainer: { height: 50, width: '100%', borderColor: 'gray', borderWidth: 1, borderRadius: 5, marginBottom: 15, justifyContent: 'center' },
  picker: { height: 50, width: '100%', color: '#000' },
});

export default PatioScreen;