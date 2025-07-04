import axios from 'axios';

// Determina a URL base da API baseada no ambiente
const getBaseURL = () => {
  if (process.env.NODE_ENV === 'production') {
    // Em produção, usa o mesmo domínio do frontend
    return `${window.location.protocol}//${window.location.host}/api`;
  }
  // Em desenvolvimento, usa localhost
  return process.env.REACT_APP_API_URL || 'http://localhost:3333/api';
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
