import React, { useState, useRef, useEffect } from 'react';
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
  IconButton,
  Avatar
} from '@mui/material';
import FaceIcon from '@mui/icons-material/Face';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CameraEnhanceIcon from '@mui/icons-material/CameraEnhance';

const FaceVerification = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const [status, setStatus] = useState('idle'); // idle, cameraReady, processing, success, error
  const [error, setError] = useState('');
  const [userPhoto, setUserPhoto] = useState(null);

  useEffect(() => {
    // Carregar foto do usuário do localStorage
    const savedPhoto = localStorage.getItem('userPhoto');
    if (savedPhoto) {
      setUserPhoto(savedPhoto);
    } else {
      // Foto mock para visualização
      setUserPhoto('https://via.placeholder.com/200');
    }

    return () => {
      // Limpar stream ao desmontar
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: 640, height: 480 }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setStatus('cameraReady');
        setError('');
      }
    } catch (err) {
      setError('Não foi possível acessar a câmera. Por favor, verifique as permissões.');
      setStatus('error');
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0);

      // Parar a câmera
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }

      verifyFace(canvas.toDataURL());
    }
  };

  const verifyFace = (capturedPhoto) => {
    setStatus('processing');
    setError('');

    // Simulação de verificação facial (em produção, seria feita via API)
    setTimeout(() => {
      // Comparação simples simulada
      const similarity = Math.random() > 0.2 ? 0.85 + Math.random() * 0.15 : Math.random() * 0.7;
      
      if (similarity >= 0.75) {
        setStatus('success');
        setTimeout(() => {
          navigate(`/checkin-confirmado/${ticketId}`);
        }, 2000);
      } else {
        setStatus('error');
        setError('Não foi possível verificar seu rosto. Por favor, tente novamente.');
      }
    }, 2000);
  };

  const retryVerification = () => {
    setStatus('idle');
    setError('');
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', width: '100%', bgcolor: 'background.default' }}>
      <AppBar position="static" sx={{ background: 'linear-gradient(135deg, #9c27b0 0%, #e91e63 100%)', width: '100%' }}>
        <Toolbar sx={{ width: '100%' }}>
          <IconButton edge="start" color="inherit" onClick={() => navigate(`/verificacao-local/${ticketId}`)}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
            Verificação Facial
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
            <FaceIcon sx={{ fontSize: { xs: 60, sm: 80 }, color: 'primary.main', mb: 2 }} />
            <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom sx={{ fontSize: { xs: '1.5rem', sm: '2.125rem' } }}>
              Reconhecimento Facial
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
              Posicione seu rosto na frente da câmera
            </Typography>
          </Box>

          {userPhoto && (
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Foto cadastrada:
              </Typography>
              <Avatar
                src={userPhoto}
                  sx={{ width: 100, height: 100, margin: '0 auto', border: '3px solid #9c27b0' }}
              />
            </Box>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {status === 'idle' && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<CameraAltIcon />}
                onClick={startCamera}
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
                Iniciar Câmera
              </Button>
            </Box>
          )}

          {status === 'cameraReady' && (
            <Box>
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: { xs: '100%', sm: 640 },
                  margin: '0 auto',
                  mb: 3,
                  borderRadius: 2,
                  overflow: 'hidden',
                  bgcolor: '#000'
                }}
              >
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  style={{ width: '100%', display: 'block' }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '250px',
                    height: '300px',
                    border: '3px solid #9c27b0',
                    borderRadius: 2,
                    pointerEvents: 'none'
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    position: 'absolute',
                    bottom: 10,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    color: 'white',
                    bgcolor: 'rgba(0,0,0,0.5)',
                    px: 2,
                    py: 1,
                    borderRadius: 1
                  }}
                >
                  Posicione seu rosto no retângulo
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<CameraEnhanceIcon />}
                  onClick={capturePhoto}
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
                  Capturar Foto
                </Button>
              </Box>
            </Box>
          )}

          {status === 'processing' && (
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <CircularProgress size={60} sx={{ mb: 3 }} />
              <Typography variant="h6" color="text.secondary">
                Verificando seu rosto...
              </Typography>
            </Box>
          )}

          {status === 'success' && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <CheckCircleIcon sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
              <Typography variant="h5" fontWeight="bold" color="success.main" gutterBottom>
                Verificação Aprovada!
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Redirecionando...
              </Typography>
            </Box>
          )}

          {status === 'error' && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Button
                variant="outlined"
                size="large"
                onClick={retryVerification}
                sx={{
                  px: 6,
                  py: 1.5,
                  borderRadius: 2
                }}
              >
                Tentar Novamente
              </Button>
            </Box>
          )}

          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </Paper>
      </Container>
    </Box>
  );
};

export default FaceVerification;
