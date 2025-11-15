import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  IconButton,
  AppBar,
  Toolbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Chip,
  Avatar
} from '@mui/material';
import { Grid } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const OrganizerEvents = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    time: '',
    location: '',
    address: '',
    latitude: '',
    longitude: '',
    radius: 100,
    maxAttendees: 100,
    image: ''
  });

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = () => {
    const savedEvents = JSON.parse(localStorage.getItem('organizerEvents') || '[]');
    if (savedEvents.length === 0) {
      // Eventos mock
      const mockEvents = [
        {
          id: 1,
          name: 'Festival de Música 2024',
          description: 'O maior festival de música do ano',
          date: '2024-03-25',
          time: '20:00',
          location: 'Parque Ibirapuera',
          address: 'Parque Ibirapuera - São Paulo, SP',
          latitude: -23.5874,
          longitude: -46.6576,
          radius: 100,
          maxAttendees: 5000,
          image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800',
          attendees: 187,
          status: 'ativo'
        },
        {
          id: 2,
          name: 'Show de Rock Nacional',
          description: 'Os maiores nomes do rock brasileiro',
          date: '2024-04-15',
          time: '19:30',
          location: 'Arena Anhembi',
          address: 'Arena Anhembi - São Paulo, SP',
          latitude: -23.5106,
          longitude: -46.6333,
          radius: 150,
          maxAttendees: 3000,
          image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
          attendees: 92,
          status: 'ativo'
        }
      ];
      setEvents(mockEvents);
      localStorage.setItem('organizerEvents', JSON.stringify(mockEvents));
    } else {
      setEvents(savedEvents);
    }
  };

  const handleOpenDialog = (event = null) => {
    if (event) {
      setEditingEvent(event);
      setFormData({
        name: event.name,
        description: event.description,
        date: event.date,
        time: event.time,
        location: event.location,
        address: event.address,
        latitude: event.latitude,
        longitude: event.longitude,
        radius: event.radius,
        maxAttendees: event.maxAttendees,
        image: event.image
      });
    } else {
      setEditingEvent(null);
      setFormData({
        name: '',
        description: '',
        date: '',
        time: '',
        location: '',
        address: '',
        latitude: '',
        longitude: '',
        radius: 100,
        maxAttendees: 100,
        image: ''
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingEvent(null);
  };

  const handleSaveEvent = () => {
    if (!formData.name || !formData.date || !formData.time) {
      alert('Preencha os campos obrigatórios');
      return;
    }

    const updatedEvents = [...events];
    if (editingEvent) {
      const index = updatedEvents.findIndex(e => e.id === editingEvent.id);
      updatedEvents[index] = {
        ...editingEvent,
        ...formData,
        latitude: parseFloat(formData.latitude) || -23.5505,
        longitude: parseFloat(formData.longitude) || -46.6333,
        radius: parseInt(formData.radius) || 100,
        maxAttendees: parseInt(formData.maxAttendees) || 100
      };
    } else {
      const newEvent = {
        id: Date.now(),
        ...formData,
        latitude: parseFloat(formData.latitude) || -23.5505,
        longitude: parseFloat(formData.longitude) || -46.6333,
        radius: parseInt(formData.radius) || 100,
        maxAttendees: parseInt(formData.maxAttendees) || 100,
        attendees: 0,
        status: 'ativo'
      };
      updatedEvents.push(newEvent);
    }

    setEvents(updatedEvents);
    localStorage.setItem('organizerEvents', JSON.stringify(updatedEvents));
    handleCloseDialog();
  };

  const handleDeleteEvent = (eventId) => {
    if (window.confirm('Tem certeza que deseja excluir este evento?')) {
      const updatedEvents = events.filter(e => e.id !== eventId);
      setEvents(updatedEvents);
      localStorage.setItem('organizerEvents', JSON.stringify(updatedEvents));
    }
  };

  const handleViewDashboard = (eventId) => {
    navigate(`/painel?eventId=${eventId}`);
  };

  return (
    <Box sx={{ minHeight: '100vh', width: '100%', bgcolor: 'background.default' }}>
      <AppBar position="static" sx={{ background: 'linear-gradient(135deg, #9c27b0 0%, #e91e63 100%)' }}>
        <Toolbar sx={{ width: '100%' }}>
          <IconButton edge="start" color="inherit" onClick={() => navigate('/home')}>
            <ArrowBackIcon />
          </IconButton>
          <EventIcon sx={{ mr: { xs: 1, sm: 2 }, fontSize: { xs: 24, sm: 28 } }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
            Meus Eventos
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
            sx={{
              background: 'rgba(255, 255, 255, 0.2)',
              '&:hover': { background: 'rgba(255, 255, 255, 0.3)' }
            }}
          >
            Novo Evento
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: { xs: 3, sm: 5 }, px: { xs: 2, sm: 3 }, width: '100%' }}>
        {events.length === 0 ? (
          <Paper sx={{ p: 6, textAlign: 'center', borderRadius: 3 }}>
            <EventIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Nenhum evento criado ainda
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog()}
              sx={{
                mt: 3,
                background: 'linear-gradient(135deg, #9c27b0 0%, #e91e63 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #7b1fa2 0%, #c2185b 100%)',
                }
              }}
            >
              Criar Primeiro Evento
            </Button>
          </Paper>
        ) : (
          <Grid container spacing={{ xs: 2, sm: 3 }}>
            {events.map((event) => (
              <Grid xs={12} sm={6} md={4} key={event.id}>
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
                    image={event.image || 'https://via.placeholder.com/400x200'}
                    alt={event.name}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                      <Typography variant="h6" component="h2" fontWeight="bold" sx={{ flex: 1 }}>
                        {event.name}
                      </Typography>
                      <Chip
                        label={event.status === 'ativo' ? 'Ativo' : 'Inativo'}
                        color={event.status === 'ativo' ? 'success' : 'default'}
                        size="small"
                      />
                    </Box>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: 40 }}>
                      {event.description}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
                      <CalendarTodayIcon fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {new Date(event.date).toLocaleDateString('pt-BR')}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
                      <AccessTimeIcon fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {event.time}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
                      <LocationOnIcon fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>
                        {event.location}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <PeopleIcon fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {event.attendees || 0} / {event.maxAttendees} participantes
                      </Typography>
                    </Box>

                    <Box sx={{ mt: 2 }}>
                      <Box sx={{ mb: 1 }}>
                        <Typography variant="caption" color="text.secondary">
                          Progresso de Check-in
                        </Typography>
                        <Box
                          sx={{
                            height: 8,
                            bgcolor: 'grey.200',
                            borderRadius: 4,
                            overflow: 'hidden',
                            mt: 0.5
                          }}
                        >
                          <Box
                            sx={{
                              height: '100%',
                              bgcolor: 'primary.main',
                              width: `${((event.attendees || 0) / event.maxAttendees) * 100}%`,
                              transition: 'width 0.3s'
                            }}
                          />
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>

                  <CardActions sx={{ p: 2, pt: 0, gap: 1 }}>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => handleViewDashboard(event.id)}
                      sx={{
                        flex: 1,
                        background: 'linear-gradient(135deg, #9c27b0 0%, #e91e63 100%)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #7b1fa2 0%, #c2185b 100%)',
                        }
                      }}
                    >
                      Dashboard
                    </Button>
                    <IconButton
                      size="small"
                      onClick={() => handleOpenDialog(event)}
                      sx={{ color: 'primary.main' }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteEvent(event.id)}
                      sx={{ color: 'error.main' }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* Dialog para Criar/Editar Evento */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingEvent ? 'Editar Evento' : 'Criar Novo Evento'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid xs={12}>
              <TextField
                fullWidth
                label="Nome do Evento *"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                fullWidth
                label="Descrição"
                multiline
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <TextField
                fullWidth
                label="Data *"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <TextField
                fullWidth
                label="Horário *"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <TextField
                fullWidth
                label="Local"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <TextField
                fullWidth
                label="Endereço Completo"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </Grid>
            <Grid xs={12} sm={4}>
              <TextField
                fullWidth
                label="Latitude"
                type="number"
                value={formData.latitude}
                onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                placeholder="-23.5505"
              />
            </Grid>
            <Grid xs={12} sm={4}>
              <TextField
                fullWidth
                label="Longitude"
                type="number"
                value={formData.longitude}
                onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                placeholder="-46.6333"
              />
            </Grid>
            <Grid xs={12} sm={4}>
              <TextField
                fullWidth
                label="Raio (metros)"
                type="number"
                value={formData.radius}
                onChange={(e) => setFormData({ ...formData, radius: e.target.value })}
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <TextField
                fullWidth
                label="Máximo de Participantes"
                type="number"
                value={formData.maxAttendees}
                onChange={(e) => setFormData({ ...formData, maxAttendees: e.target.value })}
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                fullWidth
                label="URL da Imagem"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://exemplo.com/imagem.jpg"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button
            onClick={handleSaveEvent}
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #9c27b0 0%, #e91e63 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #7b1fa2 0%, #c2185b 100%)',
              }
            }}
          >
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OrganizerEvents;

