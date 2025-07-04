import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';

export default function PrivateRoute({ children }) {
  const { signed, loading } = useAuth();

  if (loading) {
    return <h1>Carregando...</h1>;
  }

  if (!signed) {
    return <Navigate to="/login" />;
  }

  return children;
}