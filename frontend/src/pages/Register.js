import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext.js';
import { useNavigate, Link } from 'react-router-dom';
import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  Alert,
  Paper,
  InputAdornment,
  IconButton,
  Divider,
  ThemeProvider,
} from '@mui/material';
import {
  Email,
  Lock,
  Person,
  Visibility,
  VisibilityOff,
  LocalDrink,
  Nature,
} from '@mui/icons-material';
import { beverageTheme } from '../theme/beverageTheme.js';

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

const floatingAnimation = {
  y: [-10, 10, -10],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    if (!name || !email || !password) {
      setError('Todos os campos são obrigatórios.');
      setLoading(false);
      return;
    }

    try {
      await signUp(name, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Falha ao realizar o cadastro.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={beverageTheme}>
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #4CAF50 0%, #8BC34A 50%, #FF6B35 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 2,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <motion.div
          animate={floatingAnimation}
          style={{
            position: 'absolute',
            top: '15%',
            right: '10%',
            opacity: 0.1,
            fontSize: '7rem',
            color: 'white',
          }}
        >
          <Nature />
        </motion.div>

        <motion.div
          animate={{
            y: [20, -20, 20],
            transition: {
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
          style={{
            position: 'absolute',
            bottom: '10%',
            left: '15%',
            opacity: 0.1,
            fontSize: '5rem',
            color: 'white',
          }}
        >
          <LocalDrink />
        </motion.div>

        <Container component="main" maxWidth="sm">
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <Paper
              elevation={0}
              sx={{
                padding: { xs: 3, sm: 6 },
                borderRadius: 4,
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
              }}
            >
              <motion.div variants={itemVariants}>
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <LocalDrink
                      sx={{
                        fontSize: '4rem',
                        color: 'secondary.main',
                        mb: 2,
                        filter: 'drop-shadow(0 4px 8px rgba(76, 175, 80, 0.3))',
                      }}
                    />
                  </motion.div>
                  <Typography
                    variant="h3"
                    component="h1"
                    sx={{
                      fontWeight: 700,
                      background: 'linear-gradient(45deg, #4CAF50, #FF6B35)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      mb: 1,
                    }}
                  >
                    Junte-se ao DrinkFlow
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    Crie sua conta de vendedor
                  </Typography>
                </Box>
              </motion.div>

              <Divider sx={{ mb: 4, bgcolor: 'rgba(76, 175, 80, 0.2)' }} />

              <Box component="form" onSubmit={handleSubmit} noValidate>
                {error && (
                  <motion.div
                    variants={itemVariants}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    <Alert
                      severity="error"
                      sx={{
                        mb: 3,
                        borderRadius: 2,
                        '& .MuiAlert-icon': {
                          fontSize: '1.5rem',
                        },
                      }}
                    >
                      {error}
                    </Alert>
                  </motion.div>
                )}

                <motion.div variants={itemVariants}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Nome Completo"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person color="secondary" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      mb: 2,
                      '& .MuiOutlinedInput-root': {
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 4px 12px rgba(76, 175, 80, 0.2)',
                        },
                        '&.Mui-focused': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 4px 12px rgba(76, 175, 80, 0.3)',
                        },
                      },
                    }}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="E-mail"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email color="secondary" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      mb: 2,
                      '& .MuiOutlinedInput-root': {
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 4px 12px rgba(76, 175, 80, 0.2)',
                        },
                        '&.Mui-focused': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 4px 12px rgba(76, 175, 80, 0.3)',
                        },
                      },
                    }}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Senha"
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock color="secondary" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                            sx={{ color: 'secondary.main' }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      mb: 3,
                      '& .MuiOutlinedInput-root': {
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 4px 12px rgba(76, 175, 80, 0.2)',
                        },
                        '&.Mui-focused': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 4px 12px rgba(76, 175, 80, 0.3)',
                        },
                      },
                    }}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      disabled={loading}
                      sx={{
                        py: 1.5,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        background: 'linear-gradient(45deg, #4CAF50, #8BC34A)',
                        boxShadow: '0 4px 15px rgba(76, 175, 80, 0.4)',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #388E3C, #4CAF50)',
                          boxShadow: '0 6px 20px rgba(76, 175, 80, 0.6)',
                          transform: 'translateY(-2px)',
                        },
                        '&:disabled': {
                          opacity: 0.7,
                        },
                      }}
                    >
                      {loading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        >
                          ⟳
                        </motion.div>
                      ) : (
                        'Criar Conta'
                      )}
                    </Button>
                  </motion.div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Box sx={{ textAlign: 'center', mt: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                      Já tem uma conta?{' '}
                      <Link
                        to="/login"
                        style={{
                          color: beverageTheme.palette.secondary.main,
                          textDecoration: 'none',
                          fontWeight: 600,
                          transition: 'color 0.3s ease',
                        }}
                      >
                        Faça login aqui
                      </Link>
                    </Typography>
                  </Box>
                </motion.div>
              </Box>
            </Paper>
          </motion.div>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
