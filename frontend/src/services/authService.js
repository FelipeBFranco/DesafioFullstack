import api from './api';

export const loginRequest = async (email, password) => {

  const response = await api.post('/login', { email, password });
  return response.data;
};

export const registerRequest = async (name, email, password) => {
  const response = await api.post('/register', { name, email, password });
  return response.data;
};