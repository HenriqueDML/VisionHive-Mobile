import React, { createContext, useState, useContext } from 'react';
import api from '../services/api';

const PatioContext = createContext();

export const PatioProvider = ({ children }) => {
  const [patios, setPatios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- Funções CRUD ---

  const listarPatios = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/patios');
      setPatios(response.data.items);
    } catch (err) {
      console.error('❌ ERRO AO BUSCAR PÁTIOS:', err);
      setError('Não foi possível carregar os pátios.');
    } finally {
      setLoading(false);
    }
  };

  const adicionarPatio = async (novoPatio) => {
    try {
      setLoading(true);
      await api.post('/patios', novoPatio); // novoPatio: { nome, limiteMotos, filialId }
      await listarPatios();
    } catch (err) {
      console.error('Erro ao adicionar pátio:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const atualizarPatio = async (id, dadosPatio) => {
    try {
      setLoading(true);
      await api.put(`/patios/${id}`, dadosPatio);
      await listarPatios();
    } catch (err) {
      console.error(`Erro ao atualizar pátio ${id}:`, err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removerPatio = async (id) => {
    try {
      setLoading(true);
      await api.delete(`/patios/${id}`);
      setPatios(patios.filter(p => p.id !== id));
    } catch (err) {
      console.error(`Erro ao remover pátio ${id}:`, err);
      await listarPatios();
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <PatioContext.Provider
      value={{
        patios,
        loading,
        error,
        listarPatios,
        adicionarPatio,
        atualizarPatio,
        removerPatio,
      }}
    >
      {children}
    </PatioContext.Provider>
  );
};

// Hook customizado
export function usePatio() {
  const context = useContext(PatioContext);
  if (!context) {
    throw new Error('usePatio deve ser usado dentro de um PatioProvider');
  }
  return context;
}