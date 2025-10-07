import localStorageService from './localStorageService';

// Serviços para Temas
export const getTemas = async () => {
  try {
    const temas = localStorageService.getTemas();
    return { data: temas };
  } catch (error) {
    console.error('Erro ao buscar temas:', error);
    throw error;
  }
};

export const createTema = async (temaData) => {
  try {
    const newTema = localStorageService.createTema(temaData);
    return { data: newTema };
  } catch (error) {
    console.error('Erro ao criar tema:', error);
    throw error;
  }
};

export const updateTema = async (id, temaData) => {
  try {
    // Implementar atualização de tema se necessário
    console.log(`Atualizando tema ${id}:`, temaData);
    return { data: { id, ...temaData } };
  } catch (error) {
    console.error('Erro ao atualizar tema:', error);
    throw error;
  }
};

export const deleteTema = async (id) => {
  try {
    // Implementar exclusão de tema se necessário
    console.log(`Deletando tema ${id}`);
    return { data: { success: true } };
  } catch (error) {
    console.error('Erro ao deletar tema:', error);
    throw error;
  }
};

// Serviços para Perguntas
export const getPerguntas = async () => {
  try {
    const perguntas = localStorageService.getPerguntas();
    return { data: perguntas };
  } catch (error) {
    console.error('Erro ao buscar perguntas:', error);
    throw error;
  }
};

export const getPerguntasByTema = async (temaId) => {
  try {
    const perguntas = localStorageService.getPerguntasByTema(temaId);
    return { data: perguntas };
  } catch (error) {
    console.error('Erro ao buscar perguntas por tema:', error);
    throw error;
  }
};

export const createPergunta = async (perguntaData) => {
  try {
    const newPergunta = localStorageService.createPergunta(perguntaData);
    return { data: newPergunta };
  } catch (error) {
    console.error('Erro ao criar pergunta:', error);
    throw error;
  }
};

export const updatePergunta = async (id, perguntaData) => {
  try {
    // Implementar atualização de pergunta se necessário
    console.log(`Atualizando pergunta ${id}:`, perguntaData);
    return { data: { id, ...perguntaData } };
  } catch (error) {
    console.error('Erro ao atualizar pergunta:', error);
    throw error;
  }
};

export const deletePergunta = async (id) => {
  try {
    // Implementar exclusão de pergunta se necessário
    console.log(`Deletando pergunta ${id}`);
    return { data: { success: true } };
  } catch (error) {
    console.error('Erro ao deletar pergunta:', error);
    throw error;
  }
};

// Serviços para Alternativas (já incluídas nas perguntas)
export const getAlternativas = async (perguntaId) => {
  try {
    const perguntas = localStorageService.getPerguntas();
    const pergunta = perguntas.find(p => p.id === perguntaId);
    return { data: pergunta ? pergunta.alternativas : [] };
  } catch (error) {
    console.error('Erro ao buscar alternativas:', error);
    throw error;
  }
};

export const createAlternativa = async (alternativaData) => {
  try {
    // Implementar criação de alternativa se necessário
    console.log('Criando alternativa:', alternativaData);
    return { data: alternativaData };
  } catch (error) {
    console.error('Erro ao criar alternativa:', error);
    throw error;
  }
};

export const updateAlternativa = async (id, alternativaData) => {
  try {
    // Implementar atualização de alternativa se necessário
    console.log(`Atualizando alternativa ${id}:`, alternativaData);
    return { data: { id, ...alternativaData } };
  } catch (error) {
    console.error('Erro ao atualizar alternativa:', error);
    throw error;
  }
};

export const deleteAlternativa = async (id) => {
  try {
    // Implementar exclusão de alternativa se necessário
    console.log(`Deletando alternativa ${id}`);
    return { data: { success: true } };
  } catch (error) {
    console.error('Erro ao deletar alternativa:', error);
    throw error;
  }
};

// Serviços para Respostas e Partidas
export const submitResposta = async (respostaData) => {
  try {
    // Salvar partida no histórico
    const partida = localStorageService.savePartida(respostaData);
    
    // Adicionar pontos ao usuário se acertou
    if (respostaData.acertos > 0) {
      const pontosGanhos = respostaData.acertos * 10; // 10 pontos por acerto
      localStorageService.addPointsToUser(respostaData.userId, pontosGanhos);
    }
    
    return { data: partida };
  } catch (error) {
    console.error('Erro ao submeter resposta:', error);
    throw error;
  }
};

export const getRespostas = async (usuarioId) => {
  try {
    const partidas = localStorageService.getPartidasByUser(usuarioId);
    return { data: partidas };
  } catch (error) {
    console.error('Erro ao buscar respostas do usuário:', error);
    throw error;
  }
};

