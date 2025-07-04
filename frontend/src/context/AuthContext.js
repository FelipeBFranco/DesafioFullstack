import React, { createContext, useState, useContext, useEffect } from 'react';
import { loginRequest, registerRequest } from '../services/authService.js';
import api from '../services/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const storagedUser = localStorage.getItem('@App:user');
      const storagedToken = localStorage.getItem('@App:token');

      if (storagedUser && storagedToken) {
        setUser(JSON.parse(storagedUser));
        api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
      }
      setLoading(false);
    }
    loadStorageData();
  }, []);

  const signIn = async (email, password) => {
  try {
    const userData = await loginRequest(email, password);
    setUser(userData);
  } catch (error) {
    console.error("Erro no serviço de login:", error);
    throw new Error('Email ou senha inválidos.');
  }
};

  const signUp = async (name, email, password) => {
    try {
      await registerRequest(name, email, password);
      await signIn(email, password);
    } catch (error) {
      console.error("Falha no cadastro", error);
      throw new Error("Não foi possível realizar o cadastro. O e-mail já pode estar em uso.");
    }
  };

  const signOut = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, loading, signIn, signOut, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
};




export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}