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
import { useMoto } from '../../context/MotoContext';
import { usePatio } from '../../context/PatioContext';
import { useTheme } from '../../context/ThemeContext';

const PRIORIDADES_OPCOES = ['Baixa', 'Media', 'Alta', 'Sucata'];

const getPrioridadeTexto = (prioridadeValue) => {
  if (typeof prioridadeValue === 'number' && prioridadeValue > 0 && prioridadeValue <= PRIORIDADES_OPCOES.length) {
    return PRIORIDADES_OPCOES[prioridadeValue - 1];
  }
  if (typeof prioridadeValue === 'string' && PRIORIDADES_OPCOES.includes(prioridadeValue)) {
    return prioridadeValue;
  }
  return 'Desconhecida';
};

const MotoForm = ({ modalVisible, setModalVisible, motoSelecionada, salvarMoto, patios }) => {
  const [placa, setPlaca] = useState('');
  const [chassi, setChassi] = useState('');
  const [numeroMotor, setNumeroMotor] = useState('');
  const [prioridade, setPrioridade] = useState('Baixa');
  const [patioId, setPatioId] = useState(null);

  useEffect(() => {
    if (motoSelecionada) {
      setPlaca(motoSelecionada.placa);
      setChassi(motoSelecionada.chassi);
      setNumeroMotor(motoSelecionada.numeroMotor);
      setPrioridade(getPrioridadeTexto(motoSelecionada.prioridade));
      setPatioId(motoSelecionada.patioId);
    } else {
      setPlaca('');
      setChassi('');
      setNumeroMotor('');
      setPrioridade('Baixa');
      setPatioId(patios.length > 0 ? patios[0].id : null);
    }
  }, [motoSelecionada, modalVisible]);

  const handleSalvar = () => {
    if (!placa || !chassi || !numeroMotor || !patioId) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios!');
      return;
    }
    const prioridadeNumerica = PRIORIDADES_OPCOES.indexOf(prioridade) + 1;
    const motoData = { placa, chassi, numeroMotor, prioridade: prioridadeNumerica, patioId };
    salvarMoto(motoData);
  };

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={formStyles.centeredView}>
        <View style={formStyles.modalView}>
          <Text style={formStyles.modalText}>{motoSelecionada ? 'Editar Moto' : 'Nova Moto'}</Text>
          <TextInput style={formStyles.input} placeholder="Placa" value={placa} onChangeText={setPlaca} />
          <TextInput style={formStyles.input} placeholder="Chassi" value={chassi} onChangeText={setChassi} />
          <TextInput style={formStyles.input} placeholder="Número do Motor" value={numeroMotor} onChangeText={setNumeroMotor} />
          <Text style={formStyles.pickerLabel}>Prioridade</Text>
          <View style={formStyles.pickerContainer}>
            <Picker selectedValue={prioridade} onValueChange={setPrioridade} style={formStyles.picker}>
              {PRIORIDADES_OPCOES.map(p => <Picker.Item key={p} label={p} value={p} />)}
            </Picker>
          </View>
          <Text style={formStyles.pickerLabel}>Pátio</Text>
          <View style={formStyles.pickerContainer}>
            <Picker selectedValue={patioId} onValueChange={setPatioId} style={formStyles.picker}>
              {patios.map(p => <Picker.Item key={p.id} label={`${p.nome} (${p.filial})`} value={p.id} />)}
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

const MotoScreen = () => {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const { motos, loading, error, listarMotos, adicionarMoto, atualizarMoto, removerMoto } = useMoto();
  const { patios, listarPatios } = usePatio();

  const [modalVisible, setModalVisible] = useState(false);
  const [motoSelecionada, setMotoSelecionada] = useState(null);

  useEffect(() => {
    listarMotos();
    listarPatios();
  }, []);

  const handleAdicionar = () => { setMotoSelecionada(null); setModalVisible(true); };
  const handleEditar = (moto) => { setMotoSelecionada(moto); setModalVisible(true); };
  const handleDeletar = (id) => Alert.alert("Confirmar Exclusão", "Deseja remover esta moto?", [{ text: "Cancelar" }, { text: "Sim", onPress: () => removerMoto(id), style: 'destructive' }]);

  const handleSalvarMoto = async (motoData) => {
    try {
      if (motoSelecionada) {
        await atualizarMoto(motoSelecionada.id, motoData);
      } else {
        await adicionarMoto(motoData);
      }
      setModalVisible(false);
    } catch (e) {
      Alert.alert('Erro ao salvar', 'Não foi possível salvar os dados da moto.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View>
        <Text style={styles.itemTitle}>{item.placa}</Text>
        <Text style={styles.itemText}>Pátio: {item.patio}</Text>
        <Text style={styles.itemText}>Prioridade: {getPrioridadeTexto(item.prioridade)}</Text>
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
    <ScreenLayout title="Gerenciar Motos">
      <TouchableOpacity style={styles.addButton} onPress={handleAdicionar}>
        <Text style={styles.addButtonText}>+ Adicionar Nova Moto</Text>
      </TouchableOpacity>

      {loading ? (
        <View style={styles.centeredContent}><ActivityIndicator size="large" color={colors.text} /></View>
      ) : error ? (
        <View style={styles.centeredContent}>
          <Text style={styles.errorText}>{error}</Text>
          <Button title="Tentar Novamente" onPress={listarMotos} color={colors.primary} />
        </View>
      ) : (
        <FlatList
          data={motos}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      )}

      {modalVisible && (
        <MotoForm
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          motoSelecionada={motoSelecionada}
          salvarMoto={handleSalvarMoto}
          patios={patios}
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

export default MotoScreen;