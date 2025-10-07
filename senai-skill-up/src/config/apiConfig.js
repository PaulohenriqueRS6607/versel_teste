// Configurações da API
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:8080',
  TIMEOUT: 10000,
  
  // Endpoints
  ENDPOINTS: {
    // Usuários
    USUARIOS: {
      BASE: '/usuarios',
      LOGIN: '/usuarios/login',
      CADASTRO: '/usuarios/cadastro',
      PERFIL: (id) => `/usuarios/${id}`,
      BIOGRAFIA: (id) => `/usuarios/${id}/biografia`,
      LISTA: '/usuarios'
    },
    
    // Temas
    TEMAS: {
      BASE: '/temas',
      BY_ID: (id) => `/temas/${id}`
    },
    
    // Perguntas
    PERGUNTAS: {
      BASE: '/perguntas',
      BY_ID: (id) => `/perguntas/${id}`,
      BY_TEMA: (temaId) => `/perguntas/tema/${temaId}`
    },
    
    // Alternativas
    ALTERNATIVAS: {
      BASE: '/alternativas',
      BY_ID: (id) => `/alternativas/${id}`,
      BY_PERGUNTA: (perguntaId) => `/alternativas/pergunta/${perguntaId}`
    },
    
    // Salas
    SALAS: {
      BASE: '/salas',
      BY_ID: (id) => `/salas/${id}`,
      JOIN: (salaId) => `/salas/${salaId}/join`,
      LEAVE: (salaId) => `/salas/${salaId}/leave`,
      START: (salaId) => `/salas/${salaId}/start`,
      END: (salaId) => `/salas/${salaId}/end`
    },
    
    // Ranking
    RANKING: {
      BASE: '/ranking',
      BY_SALA: (salaId) => `/ranking/sala/${salaId}`
    },
    
    // Respostas
    RESPOSTAS: {
      BASE: '/respostas',
      BY_USUARIO: (usuarioId) => `/respostas/usuario/${usuarioId}`
    },
    
    // Formulários
    FORMULARIOS: {
      BASE: '/formularios',
      BY_ID: (id) => `/formularios/${id}`
    }
  }
};

export default API_CONFIG;

