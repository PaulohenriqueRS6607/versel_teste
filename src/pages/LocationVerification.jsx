import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Alert,
  CircularProgress,
  AppBar,
  Toolbar,
  IconButton
} from '@mui/material';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Mock data para eventos
const eventLocations = {
  1: {
    name: 'Festival de Música 2024',
    location: { lat: -23.5874, lng: -46.6576 },
    address: 'Parque Ibirapuera - São Paulo, SP',
    radius: 100 // metros
  },
  2: {
    name: 'Show de Rock Nacional',
    location: { lat: -23.5106, lng: -46.6333 },
    address: 'Arena Anhembi - São Paulo, SP',
    radius: 150
  },
  3: {
    name: 'Conferência de Tecnologia',
    location: { lat: -23.5505, lng: -46.6333 },
    address: 'Centro de Convenções - São Paulo, SP',
    radius: 80
  }
};

const LocationVerification = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isWithinRadius, setIsWithinRadius] = useState(false);
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    const event = eventLocations[ticketId] || eventLocations[1];
    setEventData(event);

    if (!navigator.geolocation) {
      setError('Geolocalização não é suportada pelo seu navegador');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setUserLocation({ lat, lng });

        // Calcular distância (fórmula Haversine)
        const distance = calculateDistance(
          lat,
          lng,
          event.location.lat,
          event.location.lng
        );

        const withinRadius = distance <= event.radius;
        setIsWithinRadius(withinRadius);
        setLoading(false);
      },
      (error) => {
        setError('Não foi possível obter sua localização. Por favor, verifique as permissões do navegador.');
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, [ticketId, navigate]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371000; // Raio da Terra em metros
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distância em metros
  };

  const handleVerifyFace = () => {
    navigate(`/verificacao-facial/${ticketId}`);
  };

  if (!eventData) {
    return null;
  }

  return (
    <Box sx={{ minHeight: '100vh', width: '100%', bgcolor: 'background.default' }}>
      <AppBar position="static" sx={{ background: 'linear-gradient(135deg, #9c27b0 0%, #e91e63 100%)', width: '100%' }}>
        <Toolbar sx={{ width: '100%' }}>
          <IconButton edge="start" color="inherit" onClick={() => navigate('/ingressos')}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
            Verificação de Localização
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: { xs: 2, sm: 4 }, px: { xs: 2, sm: 3 }, width: '100%' }}>
        <Paper
          elevation={3}
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: 3,
            background: 'linear-gradient(135deg, rgba(156, 39, 176, 0.1) 0%, rgba(233, 30, 99, 0.1) 100%)'
          }}
        >
          <Box sx={{ textAlign: 'center', mb: { xs: 3, sm: 4 } }}>
            <LocationOnIcon sx={{ fontSize: { xs: 60, sm: 80 }, color: 'primary.main', mb: 2 }} />
            <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom sx={{ fontSize: { xs: '1.5rem', sm: '2.125rem' } }}>
              {eventData.name}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
              {eventData.address}
            </Typography>
          </Box>

          {loading ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 6 }}>
              <CircularProgress size={60} sx={{ mb: 3 }} />
              <Typography variant="h6" color="text.secondary">
                Verificando sua localização...
              </Typography>
            </Box>
          ) : error ? (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          ) : (
            <>
              {userLocation && (
                <Box sx={{ mb: 4 }}>
                  <Paper sx={{ p: 3, bgcolor: 'background.paper', mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <GpsFixedIcon color="primary" sx={{ mr: 2, fontSize: 40 }} />
                      <Box>
                        <Typography variant="h6" fontWeight="bold">
                          Sua Localização
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Lat: {userLocation.lat.toFixed(6)}, Lng: {userLocation.lng.toFixed(6)}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LocationOnIcon color="secondary" sx={{ mr: 2, fontSize: 40 }} />
                      <Box>
                        <Typography variant="h6" fontWeight="bold">
                          Local do Evento
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Lat: {eventData.location.lat.toFixed(6)}, Lng: {eventData.location.lng.toFixed(6)}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>

                  {/* Mapa Simulado */}
                  <Box
                    sx={{
                      height: { xs: 250, sm: 400 },
                      bgcolor: 'background.paper',
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                      position: 'relative',
                      background: 'linear-gradient(45deg, #2a2a2a 25%, transparent 25%), linear-gradient(-45deg, #2a2a2a 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #2a2a2a 75%), linear-gradient(-45deg, transparent 75%, #2a2a2a 75%)',
                      backgroundSize: '20px 20px',
                      backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        top: '45%',
                        left: '55%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'error.main',
                        color: 'white',
                        p: 2,
                        borderRadius: '50%',
                        boxShadow: 3
                      }}
                    >
                      <LocationOnIcon sx={{ fontSize: 40 }} />
                    </Box>
                    <Box
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '45%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'primary.main',
                        color: 'white',
                        p: 2,
                        borderRadius: '50%',
                        boxShadow: 3
                      }}
                    >
                      <GpsFixedIcon sx={{ fontSize: 40 }} />
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 30 }}>
                      Mapa do Evento (Visualização simplificada)
                    </Typography>
                  </Box>

                  {isWithinRadius ? (
                    <Alert
                      severity="success"
                      icon={<CheckCircleIcon />}
                      sx={{ mb: 3 }}
                    >
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Você está no local do evento!
                      </Typography>
                      <Typography variant="body2">
                        Prosseguindo para verificação facial...
                      </Typography>
                    </Alert>
                  ) : (
                    <Alert severity="warning" sx={{ mb: 3 }}>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Você não está no local do evento
                      </Typography>
                      <Typography variant="body2">
                        Por favor, vá até o local do evento para realizar o check-in.
                      </Typography>
                    </Alert>
                  )}
                </Box>
              )}

              <Box sx={{ textAlign: 'center' }}>
                <Button
                  variant="contained"
                  size="large"
                  disabled={!isWithinRadius}
                  onClick={handleVerifyFace}
                  startIcon={<CheckCircleIcon />}
                  sx={{
                    px: 6,
                    py: 1.5,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #9c27b0 0%, #e91e63 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #7b1fa2 0%, #c2185b 100%)',
                    },
                    '&:disabled': {
                      background: '#ccc'
                    }
                  }}
                >
                  Validar Rosto
                </Button>
              </Box>
            </>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default LocationVerification;
