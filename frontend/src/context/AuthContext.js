import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setLoading(true);
      console.log('🔍 Verificando status de autenticação...');
      const userData = await authService.getCurrentUser();
      console.log('✅ Usuário autenticado:', userData);
      setUser(userData);
    } catch (error) {
      console.log('❌ Usuário não autenticado:', error.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email, password) => {
    try {
      console.log('🔐 Tentando fazer login...');
      const response = await authService.login(email, password);
      console.log('✅ Login bem-sucedido:', response);
      
      // O backend retorna os dados do usuário diretamente, não dentro de uma propriedade 'user'
      if (response && response.id && response.email && response.name) {
        // Criar objeto de usuário limpo (sem a senha)
        const userData = {
          id: response.id,
          name: response.name,
          email: response.email,
          createdAt: response.createdAt,
          updatedAt: response.updatedAt
        };
        
        setUser(userData);
        console.log('👤 Usuário definido no estado:', userData);
        return response;
      } else {
        console.error('❌ Resposta inválida do backend:', response);
        throw new Error('Resposta do login não contém dados válidos do usuário');
      }
    } catch (error) {
      console.log('❌ Erro no login:', error);
      throw error;
    }
  };

  const signUp = async (name, email, password) => {
    try {
      console.log('📝 Tentando fazer cadastro...');
      const response = await authService.register(name, email, password);
      console.log('✅ Cadastro bem-sucedido:', response);
      
      // Mesmo tratamento para o registro
      if (response && response.id && response.email && response.name) {
        const userData = {
          id: response.id,
          name: response.name,
          email: response.email,
          createdAt: response.createdAt,
          updatedAt: response.updatedAt
        };
        
        setUser(userData);
        console.log('👤 Usuário definido no estado após cadastro:', userData);
        return response;
      } else {
        throw new Error('Resposta do cadastro não contém dados válidos do usuário');
      }
    } catch (error) {
      console.log('❌ Erro no cadastro:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await authService.logout();
      setUser(null);
    } catch (error) {
      setUser(null);
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    checkAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
