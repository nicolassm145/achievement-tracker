// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000', // URL do seu backend
  timeout: 10000, // timeout de 10 segundos
});

// Interceptor para tratar erros globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // O servidor respondeu com um status fora do range 2xx
      return Promise.reject({
        message: `Erro ${error.response.status}: ${error.response.data?.detail || 'Erro desconhecido'}`,
        status: error.response.status,
        data: error.response.data,
      });
    } else if (error.request) {
      // A requisição foi feita mas não houve resposta
      return Promise.reject({
        message: 'Sem resposta do servidor',
      });
    } else {
      // Algo aconteceu na configuração da requisição
      return Promise.reject({
        message: error.message,
      });
    }
  }
);

export default api;