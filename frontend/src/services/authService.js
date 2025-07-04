import axios from 'axios';

const API_BASE_URL = 'http://localhost:3333/api';

export const authService = {
  async login(email, password) {
    try {
      console.log('🔐 authService.login - Enviando request para:', `${API_BASE_URL}/login`);
      console.log('📧 Email:', email);
      
      const response = await axios.post(
        `${API_BASE_URL}/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      
      console.log('📦 authService.login - Resposta completa:', response);
      console.log('📋 authService.login - Response.data:', response.data);
      console.log('👤 authService.login - User data:', response.data?.user);
      
      return response.data;
    } catch (error) {
      console.error('❌ authService.login - Erro:', error);
      console.error('📋 Erro response data:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Erro ao fazer login');
    }
  },

  async register(name, email, password) {
    try {
      console.log('📝 authService.register - Enviando request para:', `${API_BASE_URL}/register`);
      
      const response = await axios.post(
        `${API_BASE_URL}/register`,
        {
          name,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      
      console.log('📦 authService.register - Resposta:', response.data);
      
      return response.data;
    } catch (error) {
      console.error('❌ authService.register - Erro:', error);
      throw new Error(error.response?.data?.message || 'Erro ao fazer cadastro');
    }
  },

  async getCurrentUser() {
    try {
      console.log('👤 authService.getCurrentUser - Verificando usuário atual...');
      
      const response = await axios.get(`${API_BASE_URL}/me`, {
        withCredentials: true,
      });
      
      console.log('📦 authService.getCurrentUser - Resposta:', response.data);
      
      return response.data;
    } catch (error) {
      console.error('❌ authService.getCurrentUser - Erro:', error);
      throw new Error('Usuário não autenticado');
    }
  },

  async logout() {
    try {
      await axios.post(
        `${API_BASE_URL}/logout`,
        {},
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      throw new Error('Erro ao fazer logout');
    }
  },
};
