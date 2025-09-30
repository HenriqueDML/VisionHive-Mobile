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

const adicionarMoto = async (novaMoto) => {
    try {
      setLoading(true);
      console.log('➡️ Enviando dados para criar moto:', JSON.stringify(novaMoto, null, 2));
      await api.post('/motos', novaMoto);
      await listarMotos();
    } catch (err) {
      console.error(' ERRO ao adicionar moto!');
      if (err.response) {
        console.error('Dados do erro:', err.response.data);
        console.error('Status do erro:', err.response.status);
        Alert.alert('Erro ao Adicionar', `Erro ${err.response.status}: ${JSON.stringify(err.response.data)}`);
      } else if (err.request) {
        console.error('Requisição do erro:', err.request);
      } else {
        console.error('Mensagem de Erro:', err.message);
      }
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

export function useMoto() {
  const context = useContext(MotoContext);
  if (!context) {
    throw new Error('useMoto deve ser usado dentro de um MotoProvider');
  }
  return context;
}