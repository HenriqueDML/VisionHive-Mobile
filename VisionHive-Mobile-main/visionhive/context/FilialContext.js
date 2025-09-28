// visionhive/context/FilialContext.js - VERSÃO ATUALIZADA

// ... (todo o código do import, createContext, useState, useEffect, etc. permanece igual)
import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";

export const FilialContext = createContext();

export const FilialProvider = ({ children }) => {
  const [filiais, setFiliais] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- A parte de selecionar filial continua igual ---
  const [filialSelecionada, setFilialSelecionada] = useState(null);
  useEffect(() => {
    /*...*/
  }, []);
  const selecionarFilial = async (novaFilial) => {
    /*...*/
  };
  const limparSelecaoFilial = async () => {
    /*...*/
  };

  // --- Funções CRUD ---

  const listarFiliais = async () => {
    console.log("--- Iniciando busca de filiais... ---");
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/filiais");
      console.log("✅ SUCESSO! Dados recebidos da API:", response.data);
      setFiliais(response.data.items);
    } catch (err) {
      console.error("❌ ERRO AO BUSCAR FILIAIS:", err);
      setError("Não foi possível carregar as filiais.");
    } finally {
      setLoading(false);
      console.log("--- Fim da busca de filiais. ---");
    }
  };

  const adicionarFilial = async (novaFilial) => {
    try {
      // Inicia o loading APENAS para esta ação, deixando a lista visível
      setLoading(true);
      await api.post("/filiais", novaFilial);
      await listarFiliais(); // Atualiza a lista completa após o sucesso
    } catch (err) {
      console.error("Erro ao adicionar filial:", err);
      throw err; // Lança o erro para a tela tratar (ex: mostrar um Alert)
    } finally {
      setLoading(false);
    }
  };

  // ✅ NOVA FUNÇÃO - ATUALIZAR
  const atualizarFilial = async (id, dadosFilial) => {
    try {
      setLoading(true);
      await api.put(`/filiais/${id}`, dadosFilial);
      await listarFiliais();
    } catch (err) {
      console.error(`Erro ao atualizar filial ${id}:`, err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ✅ NOVA FUNÇÃO - REMOVER
  const removerFilial = async (id) => {
    try {
      setLoading(true);
      await api.delete(`/filiais/${id}`);
      // Opcional: atualização otimista da UI para resposta mais rápida
      setFiliais(filiais.filter((f) => f.id !== id));
    } catch (err) {
      console.error(`Erro ao remover filial ${id}:`, err);
      // Em caso de erro, busca a lista novamente para garantir a consistência
      await listarFiliais();
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <FilialContext.Provider
      value={{
        // ... (as props existentes)
        filiais,
        loading,
        error,
        listarFiliais,
        adicionarFilial,

        filialSelecionada,
        selecionarFilial,
        limparSelecaoFilial,

        // ✅ EXPOR AS NOVAS FUNÇÕES
        atualizarFilial,
        removerFilial,
      }}
    >
      {children}
    </FilialContext.Provider>
  );
};

export function useFilial() {
  const context = useContext(FilialContext);
  if (!context)
    throw new Error("useFilial must be used within a FilialProvider");
  return context;
}
