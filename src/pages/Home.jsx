import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Avatar,
  AppBar,
  Toolbar,
  IconButton,
  Chip
} from '@mui/material';
import { Grid } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FaceIcon from '@mui/icons-material/Face';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventIcon from '@mui/icons-material/Event';
import LogoutIcon from '@mui/icons-material/Logout';

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userPhoto');
    navigate('/login');
  };

  const menuCards = [
    {
      id: 1,
      title: 'Login',
      description: 'Acesse sua conta',
      icon: <LoginIcon sx={{ fontSize: 60 }} />,
      color: '#9c27b0',
      path: '/login',
      gradient: 'linear-gradient(135deg, #9c27b0 0%, #e91e63 100%)',
      available: true
    },
    {
      id: 2,
      title: 'Cadastro',
      description: 'Crie sua conta',
      icon: <PersonAddIcon sx={{ fontSize: 60 }} />,
      color: '#e91e63',
      path: '/cadastro',
      gradient: 'linear-gradient(135deg, #e91e63 0%, #9c27b0 100%)',
      available: true
    },
    {
      id: 3,
      title: 'Meus Ingressos',
      description: 'Visualize seus ingressos',
      icon: <ConfirmationNumberIcon sx={{ fontSize: 60 }} />,
      color: '#4caf50',
      path: '/ingressos',
      gradient: 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)',
      available: true,
      requiresAuth: false
    },
    {
      id: 4,
      title: 'Verificação de Localização',
      description: 'Valide sua localização',
      icon: <LocationOnIcon sx={{ fontSize: 60 }} />,
      color: '#ff9800',
      path: '/verificacao-local/1',
      gradient: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)',
      available: true,
      requiresAuth: false
    },
    {
      id: 5,
      title: 'Verificação Facial',
      description: 'Reconhecimento facial',
      icon: <FaceIcon sx={{ fontSize: 60 }} />,
      color: '#2196f3',
      path: '/verificacao-facial/1',
      gradient: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
      available: true,
      requiresAuth: false
    },
    {
      id: 6,
      title: 'Check-in Confirmado',
      description: 'Confirmação de check-in',
      icon: <CheckCircleIcon sx={{ fontSize: 60 }} />,
      color: '#4caf50',
      path: '/checkin-confirmado/1',
      gradient: 'linear-gradient(135deg, #4caf50 0%, #388e3c 100%)',
      available: true,
      requiresAuth: false
    },
    {
      id: 7,
      title: 'Painel do Organizador',
      description: 'Dashboard administrativo',
      icon: <DashboardIcon sx={{ fontSize: 60 }} />,
      color: '#9c27b0',
      path: '/painel',
      gradient: 'linear-gradient(135deg, #f44336 0%, #e91e63 100%)',
      available: true
    },
    {
      id: 8,
      title: 'Meus Eventos',
      description: 'Gerenciar eventos',
      icon: <EventIcon sx={{ fontSize: 60 }} />,
      color: '#e91e63',
      path: '/organizador-eventos',
      gradient: 'linear-gradient(135deg, #f44336 0%, #e91e63 100%)',
      available: true
    }
  ];

  const handleCardClick = (card) => {
    navigate(card.path);
  };

  return (
    <Box sx={{ minHeight: '100vh', width: '100%', bgcolor: 'background.default' }}>
      <AppBar position="static" sx={{ background: 'linear-gradient(135deg, #9c27b0 0%, #e91e63 100%)' }}>
        <Toolbar sx={{ width: '100%' }}>
          <DashboardIcon sx={{ mr: { xs: 1, sm: 2 }, fontSize: { xs: 24, sm: 28 } }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
            Sistema de Check-in
          </Typography>
          {user && (
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 2, mr: 2 }}>
              <Avatar src={user.photo} sx={{ width: 32, height: 32 }} />
              <Typography variant="body2" sx={{ display: { xs: 'none', md: 'block' } }}>
                {user.name || user.email}
              </Typography>
            </Box>
          )}
          {user && (
            <IconButton color="inherit" onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: { xs: 3, sm: 5 }, px: { xs: 2, sm: 3 }, width: '100%' }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 4, sm: 6 } }}>
          <Typography
            variant="h3"
            component="h1"
            fontWeight="bold"
            sx={{
              fontSize: { xs: '2rem', sm: '3rem' },
              background: 'linear-gradient(135deg, #9c27b0 0%, #e91e63 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2
            }}
          >
            Bem-vindo ao Sistema
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
            Escolha uma opção para começar
          </Typography>
        </Box>

        {/* Cards Grid */}
        <Grid container spacing={{ xs: 2, sm: 3 }}>
          {menuCards.map((card) => (
            <Grid xs={12} sm={6} md={4} lg={3} key={card.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 3,
                  boxShadow: 4,
                  transition: 'all 0.3s ease',
                  cursor: card.available ? 'pointer' : 'not-allowed',
                  opacity: card.available ? 1 : 0.6,
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: card.available ? 'translateY(-8px)' : 'none',
                    boxShadow: card.available ? 8 : 4
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    background: card.gradient
                  }
                }}
                onClick={() => handleCardClick(card)}
              >
                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    p: { xs: 2, sm: 3 },
                    '&:last-child': {
                      pb: { xs: 2, sm: 3 }
                    }
                  }}
                >
                  {/* Icon */}
                  <Box
                    sx={{
                      width: 120,
                      height: 120,
                      borderRadius: '50%',
                      background: card.gradient,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                      color: 'white',
                      boxShadow: 3
                    }}
                  >
                    {card.icon}
                  </Box>

                  {/* Title */}
                  <Typography
                    variant="h5"
                    component="h2"
                    fontWeight="bold"
                    gutterBottom
                    sx={{
                      fontSize: { xs: '1.25rem', sm: '1.5rem' },
                      color: 'text.primary',
                      mb: 1
                    }}
                  >
                    {card.title}
                  </Typography>

                  {/* Description */}
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      fontSize: { xs: '0.875rem', sm: '0.9375rem' },
                      mb: 2,
                      minHeight: 40
                    }}
                  >
                    {card.description}
                  </Typography>

                  {/* Status Chip */}
                  {!card.available && card.requiresAuth && (
                    <Chip
                      label="Requer Login"
                      size="small"
                      sx={{
                        bgcolor: '#ff9800',
                        color: 'white',
                        fontWeight: 'bold',
                        mt: 'auto'
                      }}
                    />
                  )}

                  {/* Action Button */}
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      mt: card.available ? 'auto' : 1,
                      background: card.gradient,
                      color: 'white',
                      fontWeight: 'bold',
                      py: 1.5,
                      borderRadius: 2,
                      textTransform: 'none',
                      '&:hover': {
                        background: card.gradient,
                        opacity: 0.9,
                        transform: 'scale(1.02)'
                      }
                    }}
                    disabled={!card.available}
                  >
                    Acessar
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Footer Info */}
        <Box sx={{ textAlign: 'center', mt: { xs: 4, sm: 6 }, pt: 4, borderTop: '1px solid rgba(0,0,0,0.1)' }}>
          <Typography variant="body2" color="text.secondary">
            Sistema de Check-in de Eventos - Versão 1.0
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;

