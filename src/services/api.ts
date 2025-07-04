// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000', 
   headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');
  if (token) {
    if (!config.headers) {
      config.headers = {};
    }
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
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
  },
  
);

// ao logar:
export function setToken(token: string) {
  localStorage.setItem("access_token", token);
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

// ao iniciar a aplicação, se já houver token:
const token = localStorage.getItem("access_token");
if (token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default api;