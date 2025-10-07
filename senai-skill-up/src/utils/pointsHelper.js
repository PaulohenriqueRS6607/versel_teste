import localStorageService from '../services/localStorageService';

// Helper para adicionar pontos manualmente (útil para testes)
export const addPointsToUser = (userId, pontos) => {
  try {
    const updatedUser = localStorageService.addPointsToUser(userId, pontos);
    if (updatedUser) {
      console.log(`✅ ${pontos} pontos adicionados ao usuário ${updatedUser.nome}`);
      console.log(`📊 Total de pontos: ${updatedUser.pontos}`);
      
      // Dispara evento para atualizar interface
      window.dispatchEvent(new Event('storage'));
      
      return updatedUser;
    } else {
      console.error('❌ Usuário não encontrado');
      return null;
    }
  } catch (error) {
    console.error('❌ Erro ao adicionar pontos:', error);
    return null;
  }
};

// Helper para definir pontos específicos
export const setUserPoints = (userId, pontos) => {
  try {
    const updatedUser = localStorageService.updateUserPoints(userId, pontos);
    if (updatedUser) {
      console.log(`✅ Pontos do usuário ${updatedUser.nome} definidos para ${pontos}`);
      
      // Dispara evento para atualizar interface
      window.dispatchEvent(new Event('storage'));
      
      return updatedUser;
    } else {
      console.error('❌ Usuário não encontrado');
      return null;
    }
  } catch (error) {
    console.error('❌ Erro ao definir pontos:', error);
    return null;
  }
};

// Helper para listar todos os usuários e seus IDs
export const listAllUsers = () => {
  try {
    const users = localStorageService.getUsers();
    console.log('👥 Lista de usuários:');
    users.forEach(user => {
      console.log(`📋 ID: ${user.id} | Nome: ${user.nome} | Pontos: ${user.pontos} | Email: ${user.email}`);
    });
    return users;
  } catch (error) {
    console.error('❌ Erro ao listar usuários:', error);
    return [];
  }
};

// Helper para buscar usuário por email
export const getUserByEmail = (email) => {
  try {
    const user = localStorageService.getUserByEmail(email);
    if (user) {
      console.log(`👤 Usuário encontrado:`, user);
      return user;
    } else {
      console.log(`❌ Usuário com email ${email} não encontrado`);
      return null;
    }
  } catch (error) {
    console.error('❌ Erro ao buscar usuário:', error);
    return null;
  }
};

// Funções pré-configuradas para usuários de teste
export const addPointsToAlice = (pontos) => addPointsToUser('user1', pontos);
export const addPointsToBob = (pontos) => addPointsToUser('user2', pontos);
export const addPointsToCharlie = (pontos) => addPointsToUser('user3', pontos);
