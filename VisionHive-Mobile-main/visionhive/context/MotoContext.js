import React, { createContext, useState, useContext } from 'react';
import api from '../services/api';

const MotoContext = createContext();

export const MotoProvider = ({ children }) => {
  const [motos, setMotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const listarMotos = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/motos');
      setMotos(response.data.items);
    } catch (err) {
      console.error('❌ ERRO AO BUSCAR MOTOS:', err);
      setError('Não foi possível carregar as motos.');
    } finally {
      setLoading(false);
    }
  };

  // Dentro de visionhive/context/MotoContext.js

const adicionarMoto = async (novaMoto) => {
    try {
      setLoading(true);
      // Espião 1: Vamos ver EXATAMENTE o que estamos enviando para a API
      console.log('➡️ Enviando dados para criar moto:', JSON.stringify(novaMoto, null, 2));
      await api.post('/motos', novaMoto);
      await listarMotos();
    } catch (err) {
      console.error('❌ ERRO ao adicionar moto!');
      // Espião 2: Vamos investigar a resposta do erro em detalhes
      if (err.response) {
        // A requisição foi feita e o servidor respondeu com um status code
        // que não é da faixa 2xx
        console.error('Dados do erro:', err.response.data);
        console.error('Status do erro:', err.response.status);
        Alert.alert('Erro ao Adicionar', `Erro ${err.response.status}: ${JSON.stringify(err.response.data)}`);
      } else if (err.request) {
        // A requisição foi feita mas nenhuma resposta foi recebida
        console.error('Requisição do erro:', err.request);
      } else {
        // Algo aconteceu na configuração da requisição que acionou um erro
        console.error('Mensagem de Erro:', err.message);
      }
      throw err; // Re-lança o erro para a tela tratar se necessário
    } finally {
      setLoading(false);
    }
  };

  const atualizarMoto = async (id, dadosMoto) => {
    try {
      setLoading(true);
      await api.put(`/motos/${id}`, dadosMoto);
      await listarMotos();
    } catch (err) {
      console.error(`Erro ao atualizar moto ${id}:`, err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removerMoto = async (id) => {
    try {
      setLoading(true);
      await api.delete(`/motos/${id}`);
      setMotos(motos.filter(m => m.id !== id));
    } catch (err) {
      console.error(`Erro ao remover moto ${id}:`, err);
      await listarMotos();
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <MotoContext.Provider
      value={{
        motos,
        loading,
        error,
        listarMotos,
        adicionarMoto,
        atualizarMoto,
        removerMoto,
      }}
    >
      {children}
    </MotoContext.Provider>
  );
};

// Hook customizado
export function useMoto() {
  const context = useContext(MotoContext);
  if (!context) {
    throw new Error('useMoto deve ser usado dentro de um MotoProvider');
  }
  return context;
}