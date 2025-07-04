import axios from 'axios';

// Determina a URL base da API baseada no ambiente
const getBaseURL = () => {
  // Se estiver rodando em desenvolvimento (localhost:3000)
  if (window.location.hostname === 'localhost' && window.location.port === '3000') {
    return process.env.REACT_APP_API_URL || 'http://localhost:3333/api';
  }
  
  // Se estiver em produção, usa o mesmo host/domínio atual
  return `${window.location.protocol}//${window.location.host}/api`;
};

const api = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
