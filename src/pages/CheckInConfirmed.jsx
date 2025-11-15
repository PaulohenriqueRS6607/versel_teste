import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Avatar,
  Divider,
  AppBar,
  Toolbar,
  IconButton,
  useMediaQuery,
  useTheme
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import QRCode from 'react-qr-code';

// Mock data
const eventData = {
  1: {
    eventName: 'Festival de Música 2024',
    date: '25/03/2024',
    time: '20:00',
    location: 'Parque Ibirapuera - São Paulo, SP'
  },
  2: {
    eventName: 'Show de Rock Nacional',
    date: '15/04/2024',
    time: '19:30',
    location: 'Arena Anhembi - São Paulo, SP'
  },
  3: {
    eventName: 'Conferência de Tecnologia',
    date: '10/05/2024',
    time: '09:00',
    location: 'Centro de Convenções - São Paulo, SP'
  }
};

const CheckInConfirmed = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [user, setUser] = useState(null);
  const [event, setEvent] = useState(null);
  const [checkInTime, setCheckInTime] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      // Mock user para visualização
      setUser({ email: 'usuario@exemplo.com', name: 'Usuário Demo', photo: 'https://via.placeholder.com/200' });
    }

    const eventInfo = eventData[ticketId] || eventData[1];
    setEvent(eventInfo);

    // Registrar check-in
    const now = new Date();
    setCheckInTime({
      date: now.toLocaleDateString('pt-BR'),
      time: now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    });

    // Salvar check-in no localStorage (simulação)
    const checkIns = JSON.parse(localStorage.getItem('checkIns') || '[]');
    const newCheckIn = {
      id: Date.now() + Math.random(), // ID único
      ticketId,
      userId: user?.email || 'user',
      userName: user?.name || user?.email,
      eventName: eventInfo.eventName,
      checkInTime: now.toISOString(),
      status: 'aprovado',
      photo: user?.photo || null
    };
    checkIns.push(newCheckIn);
    localStorage.setItem('checkIns', JSON.stringify(checkIns));
  }, [ticketId, navigate]);

  if (!user || !event) {
    return null;
  }

  const qrCodeData = JSON.stringify({
    ticketId,
    userId: user.email || 'user',
    checkInTime: checkInTime?.time,
    eventName: event.eventName
  });

  return (
    <Box sx={{ minHeight: '100vh', width: '100%', bgcolor: 'background.default' }}>
      <AppBar position="static" sx={{ background: 'linear-gradient(135deg, #9c27b0 0%, #e91e63 100%)', width: '100%' }}>
        <Toolbar sx={{ width: '100%' }}>
          <CheckCircleIcon sx={{ mr: { xs: 1, sm: 2 }, fontSize: { xs: 20, sm: 24 } }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
            Check-in Confirmado
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ py: { xs: 2, sm: 4 }, px: { xs: 2, sm: 3 }, width: '100%' }}>
        <Paper
          elevation={10}
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: { xs: 3, sm: 4 },
            background: 'linear-gradient(135deg, rgba(156, 39, 176, 0.1) 0%, rgba(233, 30, 99, 0.1) 100%)'
          }}
        >
          {/* Ícone de Sucesso */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box
              sx={{
                width: { xs: 80, sm: 100 },
                height: { xs: 80, sm: 100 },
                borderRadius: '50%',
                bgcolor: 'success.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                mb: 2,
                boxShadow: 3
              }}
            >
              <CheckCircleIcon sx={{ fontSize: { xs: 50, sm: 60 }, color: 'white' }} />
            </Box>
            <Typography variant="h4" component="h1" fontWeight="bold" color="success.main" gutterBottom sx={{ fontSize: { xs: '1.5rem', sm: '2.125rem' } }}>
              Check-in Realizado!
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Seu ingresso foi validado com sucesso
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Informações do Usuário */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PersonIcon color="primary" sx={{ mr: 2, fontSize: 30 }} />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Participante
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {user.name || user.email}
                </Typography>
              </Box>
            </Box>

            {user.photo && (
              <Box sx={{ textAlign: 'center', my: 3 }}>
                <Avatar
                  src={user.photo}
                  sx={{ width: 120, height: 120, margin: '0 auto', border: '4px solid #9c27b0' }}
                />
              </Box>
            )}
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Informações do Evento */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <EventIcon color="secondary" sx={{ mr: 2, fontSize: 30 }} />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Evento
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {event.eventName}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ ml: 6, mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                {event.date} às {event.time}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {event.location}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* QR Code */}
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <QrCode2Icon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Código de Confirmação
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                p: 2,
                bgcolor: 'background.paper',
                borderRadius: 2,
                mb: 2
              }}
            >
              <QRCode value={qrCodeData} size={isMobile ? 150 : 200} />
            </Box>
            <Typography variant="caption" color="text.secondary">
              Apresente este código na entrada do evento
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Data e Hora do Check-in */}
          {checkInTime && (
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Check-in realizado em
              </Typography>
              <Typography variant="h6" fontWeight="bold">
                {checkInTime.date} às {checkInTime.time}
              </Typography>
            </Box>
          )}

          {/* Botão Voltar */}
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<HomeIcon />}
              onClick={() => navigate('/ingressos')}
              sx={{
                px: 6,
                py: 1.5,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #9c27b0 0%, #e91e63 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #7b1fa2 0%, #c2185b 100%)',
                }
              }}
            >
              Voltar para Meus Ingressos
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default CheckInConfirmed;
