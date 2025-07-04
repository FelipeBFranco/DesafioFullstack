import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  console.log('🛡️ PrivateRoute - loading:', loading, 'user:', user);

  if (loading) {
    console.log('⏳ PrivateRoute - Ainda carregando...');
    return <h1>Carregando...</h1>;
  }

  if (!user) {
    console.log('🚫 PrivateRoute - Usuário não autenticado, redirecionando para login');
    return <Navigate to="/login" />;
  }

  console.log('✅ PrivateRoute - Usuário autenticado, permitindo acesso');
  return children;
}
