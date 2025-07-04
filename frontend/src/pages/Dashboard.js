import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext.js';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  Avatar,
  IconButton,
  AppBar,
  Toolbar,
  Chip,
  LinearProgress,
  ThemeProvider,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  TrendingUp,
  AttachMoney,
  LocalDrink,
  Star,
  ExitToApp,
  MoreVert,
  EmojiEvents,
  ShowChart,
  Inventory,
  LocalBar,
  Coffee,
  Opacity,
  WineBar,
} from '@mui/icons-material';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { beverageTheme } from '../theme/beverageTheme.js';

const salesData = [
  { month: 'Jan', vendas: 45000, meta: 50000 },
  { month: 'Fev', vendas: 52000, meta: 50000 },
  { month: 'Mar', vendas: 48000, meta: 50000 },
  { month: 'Abr', vendas: 61000, meta: 55000 },
  { month: 'Mai', vendas: 55000, meta: 55000 },
  { month: 'Jun', vendas: 67000, meta: 60000 },
];

const topProducts = [
  { name: 'Conti-Cola 2L', vendas: 1250, crescimento: 15.2 },
  { name: 'Água 500ml', vendas: 980, crescimento: 8.7 },
  { name: 'Suco Natural Laranja', vendas: 745, crescimento: 22.1 },
  { name: 'Cerveja', vendas: 690, crescimento: -3.2 },
  { name: 'Energético Big Power', vendas: 420, crescimento: 45.8 },
];

const beverageTypes = [
  { name: 'Refrigerantes', value: 35, color: '#FF6B35' },
  { name: 'Águas', value: 25, color: '#2196F3' },
  { name: 'Sucos', value: 20, color: '#4CAF50' },
  { name: 'Energéticos', value: 12, color: '#FF9800' },
  { name: 'Outros', value: 8, color: '#9C27B0' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const FloatingDrink = ({
  icon: Icon,
  delay,
  duration,
  startX,
  endX,
  startY,
  endY,
  size = 40,
  opacity = 0.15,
  color = '#FF6B35',
}) => (
  <motion.div
    initial={{ x: startX, y: startY, opacity: 0, scale: 0.5 }}
    animate={{
      x: endX,
      y: endY,
      opacity: [0, opacity, opacity, opacity, 0],
      rotate: [0, 360, 720],
      scale: [0.5, 1.2, 1, 1.2, 0.5],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
    style={{
      position: 'absolute',
      color,
      fontSize: size,
      zIndex: 0,
      pointerEvents: 'none',
      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
    }}
  >
    <Icon sx={{ fontSize: 'inherit' }} />
  </motion.div>
);

const drinkAnimations = [
  {
    icon: LocalDrink,
    delay: 0,
    duration: 15,
    startX: -80,
    endX: window.innerWidth + 80,
    startY: 80,
    endY: 100,
    size: 60,
    opacity: 0.2,
    color: '#FF6B35',
  },
  {
    icon: Coffee,
    delay: 3,
    duration: 18,
    startX: -90,
    endX: window.innerWidth + 90,
    startY: 160,
    endY: 140,
    size: 55,
    opacity: 0.18,
    color: '#8B4513',
  },
  {
    icon: LocalBar,
    delay: 6,
    duration: 16,
    startX: -70,
    endX: window.innerWidth + 70,
    startY: 240,
    endY: 260,
    size: 65,
    opacity: 0.22,
    color: '#FFD700',
  },

  {
    icon: WineBar,
    delay: 2,
    duration: 20,
    startX: -100,
    endX: window.innerWidth + 100,
    startY: 320,
    endY: 300,
    size: 58,
    opacity: 0.19,
    color: '#722F37',
  },
  {
    icon: Opacity,
    delay: 8,
    duration: 17,
    startX: -60,
    endX: window.innerWidth + 60,
    startY: 400,
    endY: 420,
    size: 62,
    opacity: 0.16,
    color: '#2196F3',
  },
  {
    icon: LocalDrink,
    delay: 5,
    duration: 19,
    startX: -85,
    endX: window.innerWidth + 85,
    startY: 480,
    endY: 460,
    size: 56,
    opacity: 0.21,
    color: '#4CAF50',
  },

  {
    icon: Coffee,
    delay: 1,
    duration: 25,
    startX: -120,
    endX: window.innerWidth + 120,
    startY: 560,
    endY: 580,
    size: 70,
    opacity: 0.15,
    color: '#FF5722',
  },
  {
    icon: LocalBar,
    delay: 7,
    duration: 22,
    startX: -75,
    endX: window.innerWidth + 75,
    startY: 640,
    endY: 620,
    size: 68,
    opacity: 0.17,
    color: '#9C27B0',
  },

  {
    icon: WineBar,
    delay: 4,
    duration: 28,
    startX: -150,
    endX: window.innerWidth + 150,
    startY: 120,
    endY: 200,
    size: 45,
    opacity: 0.12,
    color: '#FF9800',
  },
  {
    icon: Opacity,
    delay: 9,
    duration: 24,
    startX: -110,
    endX: window.innerWidth + 110,
    startY: 380,
    endY: 300,
    size: 48,
    opacity: 0.14,
    color: '#00BCD4',
  },

  {
    icon: LocalDrink,
    delay: 12,
    duration: 30,
    startX: -200,
    endX: window.innerWidth + 200,
    startY: 200,
    endY: 250,
    size: 40,
    opacity: 0.1,
    color: '#E91E63',
  },
  {
    icon: Coffee,
    delay: 15,
    duration: 26,
    startX: -160,
    endX: window.innerWidth + 160,
    startY: 500,
    endY: 450,
    size: 42,
    opacity: 0.13,
    color: '#607D8B',
  },
];

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const totalVendas = salesData.reduce((acc, month) => acc + month.vendas, 0);
  const metaTotal = salesData.reduce((acc, month) => acc + month.meta, 0);
  const percentualMeta = Math.round((totalVendas / metaTotal) * 100);
  const vendaMesAtual = salesData[salesData.length - 1].vendas;
  const crescimentoMensal = 12.5;

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    signOut();
    navigate('/login');
  };

  return (
    <ThemeProvider theme={beverageTheme}>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          minHeight: '100vh',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        >
          {drinkAnimations.map((drink, index) => (
            <FloatingDrink
              key={index}
              icon={drink.icon}
              delay={drink.delay}
              duration={drink.duration}
              startX={drink.startX}
              endX={drink.endX}
              startY={drink.startY}
              endY={drink.endY}
              size={drink.size}
              opacity={drink.opacity}
            />
          ))}
        </Box>

        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <AppBar
            position="static"
            elevation={0}
            sx={{
              background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
              mb: 4,
              position: 'relative',
              zIndex: 2,
            }}
          >
            <Toolbar>
              <LocalDrink sx={{ mr: 2, fontSize: '2rem' }} />
              <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
                DrinkFlow Dashboard
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Chip
                  icon={<EmojiEvents />}
                  label={`${percentualMeta}% da Meta`}
                  color={percentualMeta >= 100 ? 'success' : 'warning'}
                  variant="filled"
                  sx={{ fontWeight: 600 }}
                />

                <Avatar
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                  }}
                >
                  {user?.name?.charAt(0)?.toUpperCase()}
                </Avatar>

                <IconButton color="inherit" onClick={handleMenuOpen}>
                  <MoreVert />
                </IconButton>

                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <ExitToApp fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Sair</ListItemText>
                  </MenuItem>
                </Menu>
              </Box>
            </Toolbar>
          </AppBar>

          <Container maxWidth="xl">
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <motion.div variants={cardVariants}>
                <Paper
                  sx={{
                    p: 4,
                    mb: 4,
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 107, 53, 0.2)',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  <Typography
                    variant="h4"
                    gutterBottom
                    sx={{ fontWeight: 700, color: 'primary.main' }}
                  >
                    Olá, {user?.name?.split(' ')[0]}! 👋
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    Aqui está o resumo das suas vendas hoje
                  </Typography>
                </Paper>
              </motion.div>

              <Grid container spacing={3} sx={{ mb: 4, position: 'relative', zIndex: 1 }}>
                <Grid item xs={12} sm={6} md={3}>
                  <motion.div variants={cardVariants}>
                    <Card
                      sx={{
                        background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                        color: 'white',
                        height: '100%',
                      }}
                    >
                      <CardContent>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Box>
                            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                              R$ {vendaMesAtual.toLocaleString()}
                            </Typography>
                            <Typography variant="body2" sx={{ opacity: 0.9 }}>
                              Vendas do Mês
                            </Typography>
                          </Box>
                          <AttachMoney sx={{ fontSize: '3rem', opacity: 0.8 }} />
                        </Box>
                        <Box sx={{ mt: 2 }}>
                          <LinearProgress
                            variant="determinate"
                            value={percentualMeta}
                            sx={{
                              height: 8,
                              borderRadius: 4,
                              backgroundColor: 'rgba(255, 255, 255, 0.3)',
                              '& .MuiLinearProgress-bar': {
                                backgroundColor: 'white',
                              },
                            }}
                          />
                          <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
                            {percentualMeta}% da meta mensal
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <motion.div variants={cardVariants}>
                    <Card
                      sx={{
                        height: '100%',
                        background: 'linear-gradient(135deg, #4CAF50 0%, #8BC34A 100%)',
                        color: 'white',
                      }}
                    >
                      <CardContent>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Box>
                            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                              +{crescimentoMensal}%
                            </Typography>
                            <Typography variant="body2" sx={{ opacity: 0.9 }}>
                              Crescimento
                            </Typography>
                          </Box>
                          <TrendingUp sx={{ fontSize: '3rem', opacity: 0.8 }} />
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <motion.div variants={cardVariants}>
                    <Card
                      sx={{
                        height: '100%',
                        background: 'linear-gradient(135deg, #2196F3 0%, #64B5F6 100%)',
                        color: 'white',
                      }}
                    >
                      <CardContent>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Box>
                            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                              {topProducts.reduce((acc, product) => acc + product.vendas, 0)}
                            </Typography>
                            <Typography variant="body2" sx={{ opacity: 0.9 }}>
                              Produtos Vendidos
                            </Typography>
                          </Box>
                          <Inventory sx={{ fontSize: '3rem', opacity: 0.8 }} />
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <motion.div variants={cardVariants}>
                    <Card
                      sx={{
                        height: '100%',
                        background: 'linear-gradient(135deg, #FF9800 0%, #FFB74D 100%)',
                        color: 'white',
                      }}
                    >
                      <CardContent>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Box>
                            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                              4.8
                            </Typography>
                            <Typography variant="body2" sx={{ opacity: 0.9 }}>
                              Avaliação Média
                            </Typography>
                          </Box>
                          <Star sx={{ fontSize: '3rem', opacity: 0.8 }} />
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              </Grid>

              <Grid container spacing={3} sx={{ mb: 4, position: 'relative', zIndex: 1 }}>
                <Grid item xs={12} md={6} sx={{ height: '520px' }}>
                  <motion.div variants={cardVariants} style={{ height: '100%', width: '100%' }}>
                    <Card sx={{ height: '100%', width: '100%' }}>
                      <CardContent
                        sx={{
                          height: '100%',
                          width: '100%',
                          p: 2,
                          display: 'flex',
                          flexDirection: 'column',
                          '&:last-child': { pb: 2 },
                        }}
                      >
                        <Typography
                          variant="h6"
                          gutterBottom
                          sx={{
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            mb: 1,
                            height: '40px',
                            flexShrink: 0,
                          }}
                        >
                          <ShowChart sx={{ mr: 1, color: 'primary.main' }} />
                          Evolução das Vendas
                        </Typography>
                        <Box
                          sx={{
                            flex: 1,
                            width: '100%',
                            height: 'calc(100% - 50px)',
                            minHeight: 400,
                            position: 'relative',
                          }}
                        >
                          <div style={{ width: '100%', height: '100%' }}>
                            <ResponsiveContainer width="100%" height="100%">
                              <AreaChart
                                data={salesData}
                                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                              >
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis
                                  dataKey="month"
                                  stroke="#666"
                                  fontSize={10}
                                  tickLine={false}
                                  axisLine={false}
                                  interval={0}
                                  height={30}
                                />
                                <YAxis
                                  stroke="#666"
                                  fontSize={10}
                                  tickLine={false}
                                  axisLine={false}
                                  width={40}
                                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                                  domain={['dataMin - 5000', 'dataMax + 5000']}
                                />
                                <Tooltip
                                  contentStyle={{
                                    backgroundColor: 'white',
                                    border: '1px solid #e0e0e0',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                    fontSize: '11px',
                                  }}
                                  formatter={(value, name) => [
                                    `R$ ${value.toLocaleString()}`,
                                    name === 'vendas' ? 'Vendas' : 'Meta',
                                  ]}
                                />
                                <Area
                                  type="monotone"
                                  dataKey="vendas"
                                  stroke="#FF6B35"
                                  fill="url(#colorVendas)"
                                  strokeWidth={2}
                                  name="vendas"
                                />
                                <Area
                                  type="monotone"
                                  dataKey="meta"
                                  stroke="#4CAF50"
                                  fill="url(#colorMeta)"
                                  strokeWidth={2}
                                  strokeDasharray="5 5"
                                  name="meta"
                                />
                                <defs>
                                  <linearGradient id="colorVendas" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#FF6B35" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#FF6B35" stopOpacity={0} />
                                  </linearGradient>
                                  <linearGradient id="colorMeta" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="#4CAF50" stopOpacity={0} />
                                  </linearGradient>
                                </defs>
                              </AreaChart>
                            </ResponsiveContainer>
                          </div>
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>

                <Grid item xs={12} md={6}>
                  <motion.div variants={cardVariants}>
                    <Card sx={{ height: '520px' }}>
                      <CardContent
                        sx={{ height: '100%', p: 3, display: 'flex', flexDirection: 'column' }}
                      >
                        <Typography
                          variant="h6"
                          gutterBottom
                          sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', mb: 3 }}
                        >
                          <LocalDrink sx={{ mr: 1, color: 'primary.main' }} />
                          Categorias Vendidas
                        </Typography>

                        <Box
                          sx={{
                            flex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minHeight: 300,
                            width: '100%',
                          }}
                        >
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={beverageTypes}
                                cx="50%"
                                cy="50%"
                                outerRadius="60%"
                                innerRadius="30%"
                                fill="#8884d8"
                                dataKey="value"
                                label={({ value }) => `${value}%`}
                                labelLine={false}
                                fontSize={12}
                                fontWeight="600"
                              >
                                {beverageTypes.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                              <Tooltip
                                formatter={(value, name) => [`${value}%`, name]}
                                contentStyle={{
                                  backgroundColor: 'white',
                                  border: '1px solid #e0e0e0',
                                  borderRadius: '8px',
                                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                  fontSize: '12px',
                                }}
                              />
                            </PieChart>
                          </ResponsiveContainer>
                        </Box>

                        <Box sx={{ mt: 1, pt: 2, borderTop: '1px solid #f0f0f0' }}>
                          <Grid container spacing={1}>
                            {beverageTypes.map((item, index) => (
                              <Grid item xs={6} key={index}>
                                <Box
                                  sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}
                                >
                                  <Box
                                    sx={{
                                      width: 12,
                                      height: 12,
                                      borderRadius: '50%',
                                      backgroundColor: item.color,
                                      flexShrink: 0,
                                    }}
                                  />
                                  <Typography
                                    variant="caption"
                                    sx={{ fontSize: '0.75rem', fontWeight: 500 }}
                                  >
                                    {item.name}
                                  </Typography>
                                </Box>
                              </Grid>
                            ))}
                          </Grid>
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              </Grid>

              <motion.div variants={cardVariants}>
                <Card sx={{ position: 'relative', zIndex: 1 }}>
                  <CardContent>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}
                    >
                      <EmojiEvents sx={{ mr: 1, color: 'primary.main' }} />
                      Top 5 Produtos Mais Vendidos
                    </Typography>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                      {topProducts.map((product, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                          >
                            <Paper
                              elevation={2}
                              sx={{
                                p: 2,
                                textAlign: 'center',
                                background:
                                  index === 0
                                    ? 'linear-gradient(135deg, #FFD700 0%, #FFA000 100%)'
                                    : 'white',
                                color: index === 0 ? 'white' : 'inherit',
                              }}
                            >
                              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                                #{index + 1}
                              </Typography>
                              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                                {product.name}
                              </Typography>
                              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                                {product.vendas}
                              </Typography>
                              <Chip
                                label={`${product.crescimento > 0 ? '+' : ''}${product.crescimento}%`}
                                color={product.crescimento > 0 ? 'success' : 'error'}
                                size="small"
                                sx={{ fontWeight: 600 }}
                              />
                            </Paper>
                          </motion.div>
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
