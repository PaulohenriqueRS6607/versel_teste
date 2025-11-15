import React, { useState, useEffect } from 'react';
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
  Chip,
  CircularProgress,
  AppBar,
  Toolbar,
  IconButton
} from '@mui/material';
import { Grid } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import LogoutIcon from '@mui/icons-material/Logout';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const MyTickets = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      // Mock user para visualização
      setUser({ email: 'usuario@exemplo.com', name: 'Usuário Demo' });
    }

    // Simulação de carregamento de ingressos
    setTimeout(() => {
      const mockTickets = [
        {
          id: 1,
          eventName: 'Festival de Música 2024',
          date: '25/03/2024',
          time: '20:00',
          location: 'Parque Ibirapuera - São Paulo, SP',
          image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800',
          status: 'pendente',
          eventLocation: { lat: -23.5874, lng: -46.6576 }
        },
        {
          id: 2,
          eventName: 'Show de Rock Nacional',
          date: '15/04/2024',
          time: '19:30',
          location: 'Arena Anhembi - São Paulo, SP',
          image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
          status: 'pendente',
          eventLocation: { lat: -23.5106, lng: -46.6333 }
        },
        {
          id: 3,
          eventName: 'Conferência de Tecnologia',
          date: '10/05/2024',
          time: '09:00',
          location: 'Centro de Convenções - São Paulo, SP',
          image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800',
          status: 'concluido',
          eventLocation: { lat: -23.5505, lng: -46.6333 }
        }
      ];
      setTickets(mockTickets);
      setLoading(false);
    }, 1000);
  }, [navigate]);

  const handleCheckIn = (ticketId) => {
    navigate(`/verificacao-local/${ticketId}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', width: '100%', bgcolor: 'background.default' }}>
      <AppBar position="static" sx={{ background: 'linear-gradient(135deg, #9c27b0 0%, #e91e63 100%)' }}>
        <Toolbar sx={{ flexWrap: { xs: 'wrap', sm: 'nowrap' }, width: '100%' }}>
          <EventIcon sx={{ mr: { xs: 1, sm: 2 }, fontSize: { xs: 20, sm: 24 } }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
            Meus Ingressos
          </Typography>
          {user && (
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 2 }}>
              <Avatar src={user.photo} sx={{ width: 32, height: 32 }} />
              <Typography variant="body2" sx={{ display: { xs: 'none', md: 'block' } }}>{user.name || user.email}</Typography>
            </Box>
          )}
          <IconButton color="inherit" onClick={handleLogout} sx={{ ml: { xs: 'auto', sm: 0 } }}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 }, px: { xs: 2, sm: 3 }, width: '100%' }}>
        {tickets.length === 0 ? (
          <Box textAlign="center" py={8}>
            <QrCode2Icon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              Você ainda não possui ingressos
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={{ xs: 2, sm: 3 }}>
            {tickets.map((ticket) => (
              <Grid xs={12} sm={6} md={4} key={ticket.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 3,
                    boxShadow: 3,
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 6
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={ticket.image}
                    alt={ticket.eventName}
                  />
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h6" component="h2" fontWeight="bold" gutterBottom>
                      {ticket.eventName}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <EventIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                      <Typography variant="body2" color="text.secondary">
                        {ticket.date} às {ticket.time}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <LocationOnIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                      <Typography variant="body2" color="text.secondary">
                        {ticket.location}
                      </Typography>
                    </Box>

                    <Box sx={{ mt: 'auto', pt: 2 }}>
                      <Chip
                        icon={ticket.status === 'concluido' ? <CheckCircleIcon /> : null}
                        label={ticket.status === 'concluido' ? 'Check-in Realizado' : 'Pendente'}
                        color={ticket.status === 'concluido' ? 'success' : 'default'}
                        sx={{ mb: 2 }}
                      />

                      {ticket.status === 'pendente' && (
                        <Button
                          fullWidth
                          variant="contained"
                          onClick={() => handleCheckIn(ticket.id)}
                          sx={{
                            background: 'linear-gradient(135deg, #9c27b0 0%, #e91e63 100%)',
                            '&:hover': {
                              background: 'linear-gradient(135deg, #7b1fa2 0%, #c2185b 100%)',
                            }
                          }}
                        >
                          Fazer Check-in
                        </Button>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default MyTickets;
