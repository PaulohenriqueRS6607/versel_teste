import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import authService from '../../services/authService';
import { useAuth } from '../../hooks/useAuth';

const ProtectedRoute = ({ children, requiredPermission = null }) => {
  const location = useLocation();
  const { userData, isLoggedIn } = useAuth();
  
  // Verificar se usuário está autenticado
  if (!authService.isAuthenticated() || !isLoggedIn) {
    // Redirecionar para login com o caminho atual salvo
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  
  // Se uma permissão específica é requerida, verificar
  if (requiredPermission) {
    const userPermission = userData?.permissoes || userData?.tipoUsuario;
    
    console.log('Verificando permissão:', {
      required: requiredPermission,
      user: userPermission,
      userData: userData
    });
    
    // Verificar se o usuário tem a permissão necessária
    if (userPermission !== requiredPermission) {
      console.log('Acesso negado - permissão insuficiente');
      // Redirecionar para página não autorizada
      return <Navigate to="/unauthorized" replace />;
    }
  }
  
  // Usuário autenticado e autorizado - permitir acesso
  return children;
};

export default ProtectedRoute;
