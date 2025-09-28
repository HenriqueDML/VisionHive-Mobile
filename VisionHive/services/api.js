import axios from "axios";

// =========================================================================
// ATENÇÃO: Substitua 'SEU_IP_LOCAL' pelo IP da sua máquina na sua rede Wi-Fi
// Para descobrir seu IP no Windows: abra o cmd e digite 'ipconfig'
// Para descobrir no Mac/Linux: abra o terminal e digite 'ifconfig' ou 'ip a'
// NÃO USE 'localhost' ou '127.0.0.1', pois o emulador/celular não conseguirá acessar.
// =========================================================================
const API_BASE_URL = "http://192.168.1.64:8080/api/v1"; // Ex: http://192.168.1.5:5288/api/v1

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
