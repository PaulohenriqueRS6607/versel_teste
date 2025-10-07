import localStorageService from './localStorageService';

export const getGlobalRanking = async () => {
  try {
    const ranking = localStorageService.getGlobalRanking();
    return { data: ranking };
  } catch (error) {
    console.error('Erro ao buscar ranking:', error);
    throw error;
  }
};

export const getUserScore = async (userId) => {
  try {
    const user = localStorageService.getUserById(userId);
    if (user) {
      return { data: { score: user.pontos } };
    } else {
      return { data: { score: 0 } };
    }
  } catch (error) {
    console.error('Erro ao buscar pontuação do usuário:', error);
    throw error;
  }
};

export const updateScore = async (userId, score) => {
  try {
    const updatedUser = localStorageService.updateUserPoints(userId, score);
    if (updatedUser) {
      return { data: { success: true, userId, score: updatedUser.pontos } };
    } else {
      throw new Error('Usuário não encontrado');
    }
  } catch (error) {
    console.error('Erro ao atualizar pontuação:', error);
    throw error;
  }
};

export const addPoints = async (userId, pontos) => {
  try {
    const updatedUser = localStorageService.addPointsToUser(userId, pontos);
    if (updatedUser) {
      return { data: { success: true, userId, totalPoints: updatedUser.pontos, addedPoints: pontos } };
    } else {
      throw new Error('Usuário não encontrado');
    }
  } catch (error) {
    console.error('Erro ao adicionar pontos:', error);
    throw error;
  }
};

export const getUserRanking = async (userId) => {
  try {
    const userRanking = localStorageService.getUserRanking(userId);
    return { data: userRanking };
  } catch (error) {
    console.error('Erro ao buscar ranking do usuário:', error);
    throw error;
  }
}; 