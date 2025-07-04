import React from 'react';
import { useAuth } from '../context/AuthContext.js';
import { useNavigate } from 'react-router-dom';

import { Button, Container, Typography, Box, Paper } from '@mui/material';

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate('/login');
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
        <Typography component="h1" variant="h4" align="center">
          Perfil do Usuário
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">
            <strong>Nome:</strong> {user?.name}
          </Typography>
          <Typography variant="h6" sx={{ mt: 1 }}>
            <strong>Email:</strong> {user?.email}
          </Typography>
          <Button
            fullWidth
            variant="contained"
            color="error"
            sx={{ mt: 4 }}
            onClick={handleLogout}
          >
            Sair (Logout)
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}