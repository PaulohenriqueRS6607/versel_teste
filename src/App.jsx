import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ptBR } from 'date-fns/locale';

// Import pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MyTickets from './pages/MyTickets';
import LocationVerification from './pages/LocationVerification';
import FaceVerification from './pages/FaceVerification';
import CheckInConfirmed from './pages/CheckInConfirmed';
import OrganizerDashboard from './pages/OrganizerDashboard';
import OrganizerEvents from './pages/OrganizerEvents';

// Create theme
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#9c27b0', // Roxo
      light: '#ba68c8',
      dark: '#7b1fa2',
    },
    secondary: {
      main: '#e91e63', // Rosa
      light: '#f06292',
      dark: '#c2185b',
    },
    success: {
      main: '#4caf50',
    },
    error: {
      main: '#f44336', // Vermelho
      light: '#e57373',
      dark: '#d32f2f',
    },
    warning: {
      main: '#ff9800',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Register />} />
          <Route path="/ingressos" element={<MyTickets />} />
          <Route path="/verificacao-local/:ticketId" element={<LocationVerification />} />
          <Route path="/verificacao-facial/:ticketId" element={<FaceVerification />} />
          <Route path="/checkin-confirmado/:ticketId" element={<CheckInConfirmed />} />
          <Route path="/painel" element={<OrganizerDashboard />} />
          <Route path="/organizador-eventos" element={<OrganizerEvents />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
