import localStorageService from './localStorageService';

// Serviços de autenticação local
export const login = async (email, password) => {
  try {
    const authResult = localStorageService.authenticateUser(email, password);
    if (authResult) {
      return { data: authResult };
    } else {
      throw new Error('Credenciais inválidas');
    }
  } catch (error) {
    throw error;
  }
};

export const register = async (userData) => {
  try {
    // Verifica se o email já existe
    const existingUser = localStorageService.getUserByEmail(userData.email);
    if (existingUser) {
      throw new Error('Email já cadastrado');
    }
    
    const newUser = localStorageService.createUser(userData);
    return { data: newUser };
  } catch (error) {
    throw error;
  }
};

export const getProfile = async (id) => {
  try {
    const user = localStorageService.getUserById(id);
    if (user) {
      // Remove a senha dos dados retornados
      const { senha, ...userWithoutPassword } = user;
      return { data: userWithoutPassword };
    } else {
      throw new Error('Usuário não encontrado');
    }
  } catch (error) {
    throw error;
  }
};

// Serviços adicionais de usuário
export const updateBiografia = async (id, biografia) => {
  try {
    const updatedUser = localStorageService.updateUser(id, { biografia });
    if (updatedUser) {
      const { senha, ...userWithoutPassword } = updatedUser;
      return { data: userWithoutPassword };
    } else {
      throw new Error('Usuário não encontrado');
    }
  } catch (error) {
    throw error;
  }
};

export const getUsuarios = async () => {
  try {
    const users = localStorageService.getUsers();
    // Remove as senhas dos dados retornados
    const usersWithoutPassword = users.map(({ senha, ...user }) => user);
    return { data: usersWithoutPassword };
  } catch (error) {
    throw error;
  }
};

// Novos métodos para gerenciar autenticação
export const getCurrentUser = () => {
  return localStorageService.getCurrentUser();
};

export const logout = () => {
  localStorageService.logout();
};

export const isAuthenticated = () => {
  return localStorageService.isAuthenticated();
}; 