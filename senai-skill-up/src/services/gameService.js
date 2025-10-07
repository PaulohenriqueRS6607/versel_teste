import api from './api';

// Serviços para Salas
export const createSala = (salaData) => api.post('/salas', salaData);
export const getSala = (id) => api.get(`/salas/${id}`);
export const getSalas = () => api.get('/salas');
export const joinSala = (salaId, usuarioId) => api.post(`/salas/${salaId}/join`, { usuarioId });
export const leaveSala = (salaId, usuarioId) => api.post(`/salas/${salaId}/leave`, { usuarioId });
export const startGame = (salaId) => api.post(`/salas/${salaId}/start`);
export const endGame = (salaId) => api.post(`/salas/${salaId}/end`);

// Serviços para Ranking
export const getRanking = () => api.get('/ranking');
export const getRankingBySala = (salaId) => api.get(`/ranking/sala/${salaId}`);
export const updateRanking = (rankingData) => api.post('/ranking', rankingData);

// Serviços para Formulários
export const getFormularios = () => api.get('/formularios');
export const createFormulario = (formularioData) => api.post('/formularios', formularioData);
export const getFormulario = (id) => api.get(`/formularios/${id}`);
export const updateFormulario = (id, formularioData) => api.put(`/formularios/${id}`, formularioData);
export const deleteFormulario = (id) => api.delete(`/formularios/${id}`);

