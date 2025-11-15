import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  Avatar,
  Card,
  CardContent,
  Chip,
  TextField,
  InputAdornment,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import { Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterIcon from '@mui/icons-material/FilterList';
import RefreshIcon from '@mui/icons-material/Refresh';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PeopleIcon from '@mui/icons-material/People';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import TimelineIcon from '@mui/icons-material/Timeline';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { DataGrid } from '@mui/x-data-grid';

const OrganizerDashboard = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get('eventId');
  const [checkIns, setCheckIns] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [filteredData, setFilteredData] = useState([]);
  const [stats, setStats] = useState({
    totalAttendees: 250,
    checkedIn: 0,
    pending: 0,
    denied: 0,
    checkInRate: 0
  });

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    if (eventId && events.length > 0) {
      const event = events.find(e => e.id === parseInt(eventId));
      if (event) setSelectedEvent(event);
    } else if (events.length > 0 && !selectedEvent) {
      setSelectedEvent(events[0]);
    }
  }, [eventId, events]);

  useEffect(() => {
    loadCheckIns();
    // Simular atualização em tempo real
    const interval = setInterval(loadCheckIns, 5000);
    return () => clearInterval(interval);
  }, [selectedEvent]);

  useEffect(() => {
    let filtered = checkIns.filter(item => {
      const matchesSearch = item.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.eventName?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      const matchesEvent = !selectedEvent || item.eventName === selectedEvent.name;
      return matchesSearch && matchesStatus && matchesEvent;
    });
    setFilteredData(filtered);
  }, [searchTerm, checkIns, statusFilter, selectedEvent]);

  const loadEvents = () => {
    const savedEvents = JSON.parse(localStorage.getItem('organizerEvents') || '[]');
    if (savedEvents.length === 0) {
      // Criar eventos mock se não existirem
      const mockEvents = [
        {
          id: 1,
          name: 'Festival de Música 2024',
          maxAttendees: 5000,
          attendees: 187
        },
        {
          id: 2,
          name: 'Show de Rock Nacional',
          maxAttendees: 3000,
          attendees: 92
        }
      ];
      setEvents(mockEvents);
      localStorage.setItem('organizerEvents', JSON.stringify(mockEvents));
      setSelectedEvent(mockEvents[0]);
    } else {
      setEvents(savedEvents);
      setSelectedEvent(savedEvents[0]);
    }
  };

  const loadCheckIns = () => {
    // Carregar check-ins do localStorage (em produção viria de uma API)
    const savedCheckIns = JSON.parse(localStorage.getItem('checkIns') || '[]');
    
    // Adicionar dados mockados para demonstração
    const mockCheckIns = [
      {
        id: 1,
        ticketId: '1',
        userId: 'user1@example.com',
        userName: 'João Silva',
        eventName: 'Festival de Música 2024',
        checkInTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        status: 'aprovado',
        photo: null
      },
      {
        id: 2,
        ticketId: '2',
        userId: 'user2@example.com',
        userName: 'Maria Santos',
        eventName: 'Show de Rock Nacional',
        checkInTime: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        status: 'aprovado',
        photo: null
      },
      {
        id: 3,
        ticketId: '1',
        userId: 'user3@example.com',
        userName: 'Carlos Oliveira',
        eventName: 'Festival de Música 2024',
        checkInTime: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        status: 'negado',
        photo: null
      }
    ];

    // Garantir que todos os check-ins tenham ID único
    const allCheckIns = [...mockCheckIns, ...savedCheckIns].map((checkIn, index) => ({
      ...checkIn,
      id: checkIn.id || `checkin-${Date.now()}-${index}`
    }));
    
    // Filtrar por evento selecionado
    const filteredCheckIns = selectedEvent 
      ? allCheckIns.filter(c => c.eventName === selectedEvent.name)
      : allCheckIns;
    
    setCheckIns(allCheckIns); // Guardar todos para filtros

    // Calcular estatísticas baseado no evento selecionado
    const total = selectedEvent ? selectedEvent.maxAttendees : 250;
    const checkedIn = filteredCheckIns.filter(c => c.status === 'aprovado').length;
    const denied = filteredCheckIns.filter(c => c.status === 'negado').length;
    const pending = total - checkedIn - denied;

    setStats({
      totalAttendees: total,
      checkedIn,
      pending: Math.max(0, pending),
      denied,
      checkInRate: total > 0 ? (checkedIn / total) * 100 : 0
    });
  };

  const handleRefresh = () => {
    loadCheckIns();
  };

  const columns = [
    {
      field: 'userName',
      headerName: 'Participante',
      width: 200,
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            src={params.row.photo}
            sx={{ width: 40, height: 40 }}
          >
            {params.value?.charAt(0)}
          </Avatar>
          <Typography variant="body2" fontWeight="medium">
            {params.value}
          </Typography>
        </Box>
      )
    },
    {
      field: 'eventName',
      headerName: 'Evento',
      width: 250,
      flex: 1,
      minWidth: 180
    },
    {
      field: 'checkInTime',
      headerName: 'Horário',
      width: 200,
      flex: 1,
      minWidth: 150,
      renderCell: (params) => {
        const date = new Date(params.value);
        return (
          <Typography variant="body2">
            {date.toLocaleDateString('pt-BR')} às {date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
          </Typography>
        );
      }
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => {
        const status = params.value;
        const color = status === 'aprovado' ? 'success' : 'error';
        const icon = status === 'aprovado' ? <CheckCircleIcon fontSize="small" /> : <CancelIcon fontSize="small" />;
        
        return (
          <Chip
            icon={icon}
            label={status === 'aprovado' ? 'Aprovado' : 'Negado'}
            color={color}
            size="small"
            variant="outlined"
          />
        );
      }
    }
  ];

  const StatCard = ({ icon, title, value, color, progress }) => (
    <Card sx={{ height: '100%', borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box
            sx={{
              bgcolor: `${color}.light`,
              color: `${color}.main`,
              borderRadius: 2,
              p: 2,
              mr: 2
            }}
          >
            {icon}
          </Box>
          <Box>
            <Typography variant="h4" fontWeight="bold">
              {value}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {title}
            </Typography>
          </Box>
        </Box>
        {progress !== undefined && (
          <Box sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Progresso
              </Typography>
              <Typography variant="caption" fontWeight="bold" color={`${color}.main`}>
                {progress.toFixed(1)}%
              </Typography>
            </Box>
            <Box
              sx={{
                height: 8,
                bgcolor: `${color}.light`,
                borderRadius: 4,
                overflow: 'hidden'
              }}
            >
              <Box
                sx={{
                  height: '100%',
                  bgcolor: `${color}.main`,
                  width: `${progress}%`,
                  transition: 'width 0.3s ease'
                }}
              />
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ minHeight: '100vh', width: '100%', bgcolor: 'background.default' }}>
      <AppBar position="static" sx={{ background: 'linear-gradient(135deg, #9c27b0 0%, #e91e63 100%)', width: '100%' }}>
        <Toolbar sx={{ width: '100%' }}>
          <IconButton edge="start" color="inherit" onClick={() => navigate('/home')}>
            <ArrowBackIcon />
          </IconButton>
          <EventAvailableIcon sx={{ mr: { xs: 1, sm: 2 }, fontSize: { xs: 20, sm: 24 } }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
            Painel do Organizador
          </Typography>
          <Button
            variant="outlined"
            startIcon={<EventIcon />}
            onClick={() => navigate('/organizador-eventos')}
            sx={{
              mr: 2,
              color: 'white',
              borderColor: 'rgba(255, 255, 255, 0.5)',
              '&:hover': { borderColor: 'white', bgcolor: 'rgba(255, 255, 255, 0.1)' },
              display: { xs: 'none', sm: 'flex' }
            }}
          >
            Meus Eventos
          </Button>
          <IconButton color="inherit" onClick={handleRefresh}>
            <RefreshIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 4 }, px: { xs: 2, sm: 3 }, width: '100%' }}>
        {/* Seletor de Evento */}
        {events.length > 0 && (
          <Paper sx={{ p: 2, mb: 3, borderRadius: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Selecionar Evento</InputLabel>
              <Select
                value={selectedEvent?.id || ''}
                label="Selecionar Evento"
                onChange={(e) => {
                  const event = events.find(ev => ev.id === e.target.value);
                  setSelectedEvent(event);
                }}
              >
                {events.map((event) => (
                  <MenuItem key={event.id} value={event.id}>
                    {event.name} - {new Date(event.date).toLocaleDateString('pt-BR')}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Paper>
        )}

        {/* Estatísticas */}
        <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: { xs: 3, sm: 4 } }}>
          <Grid xs={12} sm={6} md={3}>
            <StatCard
              icon={<PeopleIcon sx={{ fontSize: 30 }} />}
              title="Total de Participantes"
              value={stats.totalAttendees}
              color="primary"
            />
          </Grid>
          <Grid xs={12} sm={6} md={3}>
            <StatCard
              icon={<CheckCircleIcon sx={{ fontSize: 30 }} />}
              title="Check-ins Realizados"
              value={`${stats.checkedIn} (${stats.checkInRate.toFixed(1)}%)`}
              color="success"
              progress={stats.checkInRate}
            />
          </Grid>
          <Grid xs={12} sm={6} md={3}>
            <StatCard
              icon={<TimelineIcon sx={{ fontSize: 30 }} />}
              title="Pendentes"
              value={stats.pending}
              color="warning"
              progress={(stats.pending / stats.totalAttendees) * 100}
            />
          </Grid>
          <Grid xs={12} sm={6} md={3}>
            <StatCard
              icon={<CancelIcon sx={{ fontSize: 30 }} />}
              title="Negados"
              value={stats.denied}
              color="error"
              progress={(stats.denied / stats.totalAttendees) * 100}
            />
          </Grid>
        </Grid>

        {/* Busca e Filtros */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', mb: { xs: 2, sm: 3 }, gap: 2 }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Buscar participantes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ flexGrow: 1, maxWidth: { xs: '100%', sm: 400 } }}
          />
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="all">Todos</MenuItem>
              <MenuItem value="aprovado">Aprovado</MenuItem>
              <MenuItem value="negado">Negado</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ display: 'flex', gap: 2, width: { xs: '100%', sm: 'auto' } }}>
            <Button
              variant="contained"
              startIcon={<PersonAddIcon />}
              sx={{
                flex: { xs: 1, sm: 'none' },
                background: 'linear-gradient(135deg, #9c27b0 0%, #e91e63 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #7b1fa2 0%, #c2185b 100%)',
                }
              }}
            >
              <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>Check-in Manual</Box>
              <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>Manual</Box>
            </Button>
          </Box>
        </Box>

        {/* Tabela de Check-ins */}
        <Paper sx={{ borderRadius: 3, boxShadow: 3, overflow: 'hidden' }}>
          <Box sx={{ width: '100%', overflowX: 'auto' }}>
            <DataGrid
              rows={filteredData}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10, 25, 50]}
              autoHeight
              disableSelectionOnClick
              getRowId={(row) => {
                if (row.id) return row.id;
                // Criar ID único baseado nos dados
                const uniqueKey = `${row.ticketId}-${row.userId}-${row.checkInTime || Date.now()}`;
                return uniqueKey;
              }}
              sx={{
                border: 'none',
                minWidth: { xs: 600, sm: '100%' },
                '& .MuiDataGrid-cell': {
                  borderBottom: '1px solid rgba(224, 224, 224, 0.5)',
                  fontSize: { xs: '0.75rem', sm: '0.875rem' }
                },
                '& .MuiDataGrid-columnHeaders': {
                  bgcolor: 'background.paper',
                  borderBottom: '2px solid rgba(224, 224, 224, 0.5)',
                  fontSize: { xs: '0.75rem', sm: '0.875rem' }
                },
              }}
            />
          </Box>
        </Paper>

        {/* Mapa de Calor (Placeholder) */}
        <Paper
          sx={{
            mt: 4,
            p: 3,
            borderRadius: 3,
            boxShadow: 3,
            background: 'linear-gradient(135deg, rgba(156, 39, 176, 0.05) 0%, rgba(233, 30, 99, 0.05) 100%)'
          }}
        >
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Mapa de Calor de Check-ins
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {selectedEvent ? `Mostrando check-ins do evento: ${selectedEvent.name}` : 'Visualização geral de todos os eventos'}
          </Typography>
          <Box
            sx={{
              height: 400,
              bgcolor: 'background.paper',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mt: 2,
              position: 'relative',
              background: 'linear-gradient(45deg, #2a2a2a 25%, transparent 25%), linear-gradient(-45deg, #2a2a2a 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #2a2a2a 75%), linear-gradient(-45deg, transparent 75%, #2a2a2a 75%)',
              backgroundSize: '20px 20px',
              backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
            }}
          >
            {selectedEvent && (
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  bgcolor: 'primary.main',
                  color: 'white',
                  p: 3,
                  borderRadius: 2,
                  textAlign: 'center',
                  boxShadow: 3
                }}
              >
                <LocationOnIcon sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="body2" fontWeight="bold">
                  Local do Evento
                </Typography>
                <Typography variant="caption">
                  {selectedEvent.address}
                </Typography>
              </Box>
            )}
            <Typography variant="body1" color="text.secondary" sx={{ mt: 30 }}>
              {selectedEvent ? 'Mapa de calor será exibido aqui' : 'Selecione um evento para ver o mapa'}
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default OrganizerDashboard;
