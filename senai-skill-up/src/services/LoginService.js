import localStorageService from './localStorageService';

const loginService = {
  // ✅ Método para fazer login com email e senha
  login: async (email, senha) => {
    try {
      const authResult = localStorageService.authenticateUser(email, senha);
      if (authResult) {
        return authResult;
      } else {
        throw new Error('Credenciais inválidas');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  },

  // ✅ Método para cadastrar usuário com nome, email e senha
  cadastrar: async (nome, email, senha) => {
    try {
      // Verifica se o email já existe
      const existingUser = localStorageService.getUserByEmail(email);
      if (existingUser) {
        throw new Error('Email já cadastrado');
      }

      const usuarioDTO = { nome, email, senha };
      const newUser = localStorageService.createUser(usuarioDTO);
      
      // Remove a senha do retorno
      const { senha: _, ...userWithoutPassword } = newUser;
      return userWithoutPassword;
    } catch (error) {
      console.error('Erro no cadastro:', error);
      throw error;
    }
  },
};

export default loginService;
