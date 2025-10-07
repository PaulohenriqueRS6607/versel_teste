// Serviço para gerenciar dados locais da aplicação
class LocalStorageService {
  constructor() {
    this.initializeData();
  }

  // Inicializa dados padrão se não existirem
  initializeData() {
    // Usuários mockados para testes
    if (!localStorage.getItem('users')) {
      const defaultUsers = [
        {
          id: 'user1',
          nome: 'Alice Silva',
          email: 'alice@teste.com',
          senha: '123456',
          pontos: 1200,
          avatar: '/assets/images/image 6.svg',
          biografia: 'Desenvolvedora apaixonada por tecnologia',
          nivel: 'Avançado',
          dataRegistro: new Date().toISOString()
        },
        {
          id: 'user2',
          nome: 'Bob Santos',
          email: 'bob@teste.com',
          senha: '123456',
          pontos: 1100,
          avatar: '/assets/images/image 7.svg',
          biografia: 'Estudante de programação',
          nivel: 'Intermediário',
          dataRegistro: new Date().toISOString()
        },
        {
          id: 'user3',
          nome: 'Charlie Oliveira',
          email: 'charlie@teste.com',
          senha: '123456',
          pontos: 1000,
          avatar: '/assets/images/image 8.svg',
          biografia: 'Entusiasta de quiz',
          nivel: 'Iniciante',
          dataRegistro: new Date().toISOString()
        }
      ];

      // Adiciona mais usuários para o ranking
      for (let i = 4; i <= 25; i++) {
        defaultUsers.push({
          id: `user${i}`,
          nome: `Usuario${i}`,
          email: `usuario${i}@teste.com`,
          senha: '123456',
          pontos: 1000 - (i * 20),
          avatar: '/assets/images/default-avatar.png',
          biografia: '',
          nivel: 'Iniciante',
          dataRegistro: new Date().toISOString()
        });
      }

      localStorage.setItem('users', JSON.stringify(defaultUsers));
    }

    // Temas e perguntas padrão
    if (!localStorage.getItem('temas')) {
      const defaultTemas = [
        {
          id: 'tema1',
          nome: 'JavaScript Básico',
          descricao: 'Conceitos fundamentais de JavaScript',
          cor: '#f7df1e'
        },
        {
          id: 'tema2',
          nome: 'React',
          descricao: 'Biblioteca para interfaces de usuário',
          cor: '#61dafb'
        },
        {
          id: 'tema3',
          nome: 'HTML & CSS',
          descricao: 'Estrutura e estilização web',
          cor: '#e34c26'
        }
      ];
      localStorage.setItem('temas', JSON.stringify(defaultTemas));
    }

    if (!localStorage.getItem('perguntas')) {
      const defaultPerguntas = [
        {
          id: 'pergunta1',
          temaId: 'tema1',
          titulo: 'O que é uma variável em JavaScript?',
          alternativas: [
            { id: 'alt1', texto: 'Um espaço na memória para armazenar dados', correta: true },
            { id: 'alt2', texto: 'Uma função que executa código', correta: false },
            { id: 'alt3', texto: 'Um elemento HTML', correta: false },
            { id: 'alt4', texto: 'Um estilo CSS', correta: false }
          ]
        },
        {
          id: 'pergunta2',
          temaId: 'tema1',
          titulo: 'Qual operador é usado para comparação estrita em JavaScript?',
          alternativas: [
            { id: 'alt1', texto: '==', correta: false },
            { id: 'alt2', texto: '===', correta: true },
            { id: 'alt3', texto: '=', correta: false },
            { id: 'alt4', texto: '!=', correta: false }
          ]
        },
        {
          id: 'pergunta3',
          temaId: 'tema2',
          titulo: 'O que é JSX em React?',
          alternativas: [
            { id: 'alt1', texto: 'Uma extensão de sintaxe para JavaScript', correta: true },
            { id: 'alt2', texto: 'Uma biblioteca de CSS', correta: false },
            { id: 'alt3', texto: 'Um banco de dados', correta: false },
            { id: 'alt4', texto: 'Um servidor web', correta: false }
          ]
        }
      ];
      localStorage.setItem('perguntas', JSON.stringify(defaultPerguntas));
    }

    // Histórico de partidas
    if (!localStorage.getItem('partidas')) {
      localStorage.setItem('partidas', JSON.stringify([]));
    }
  }

  // Métodos para usuários
  getUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]');
  }

  getUserById(id) {
    const users = this.getUsers();
    return users.find(user => user.id === id);
  }

  getUserByEmail(email) {
    const users = this.getUsers();
    return users.find(user => user.email === email);
  }

  createUser(userData) {
    const users = this.getUsers();
    const newUser = {
      id: `user${Date.now()}`,
      nome: userData.nome,
      email: userData.email,
      senha: userData.senha,
      pontos: 0,
      avatar: '/assets/images/default-avatar.png',
      biografia: '',
      nivel: 'Iniciante',
      dataRegistro: new Date().toISOString()
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    return newUser;
  }

  updateUser(id, userData) {
    const users = this.getUsers();
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...userData };
      localStorage.setItem('users', JSON.stringify(users));
      return users[userIndex];
    }
    return null;
  }

  // Métodos para autenticação
  authenticateUser(email, senha) {
    const user = this.getUserByEmail(email);
    if (user && user.senha === senha) {
      const token = `token_${user.id}_${Date.now()}`;
      const authData = {
        token,
        userId: user.id,
        email: user.email,
        nome: user.nome
      };
      sessionStorage.setItem('authToken', token);
      sessionStorage.setItem('currentUser', JSON.stringify(authData));
      return { token, user: authData };
    }
    return null;
  }

  getCurrentUser() {
    const currentUserData = sessionStorage.getItem('currentUser');
    return currentUserData ? JSON.parse(currentUserData) : null;
  }

  logout() {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('currentUser');
  }

  isAuthenticated() {
    return !!sessionStorage.getItem('authToken');
  }

  // Métodos para pontuação
  updateUserPoints(userId, pontos) {
    const users = this.getUsers();
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex !== -1) {
      users[userIndex].pontos = pontos;
      localStorage.setItem('users', JSON.stringify(users));
      
      // Atualiza também os dados do usuário atual se for o mesmo
      const currentUser = this.getCurrentUser();
      if (currentUser && currentUser.userId === userId) {
        currentUser.pontos = pontos;
        sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
      }
      
      return users[userIndex];
    }
    return null;
  }

  addPointsToUser(userId, pontosAdicionais) {
    const user = this.getUserById(userId);
    if (user) {
      const novosPontos = user.pontos + pontosAdicionais;
      return this.updateUserPoints(userId, novosPontos);
    }
    return null;
  }

  // Métodos para ranking
  getGlobalRanking() {
    const users = this.getUsers();
    return users
      .sort((a, b) => b.pontos - a.pontos)
      .map((user, index) => ({
        posicao: index + 1,
        id: user.id,
        nome: user.nome,
        pontos: user.pontos,
        avatar: user.avatar,
        nivel: user.nivel
      }));
  }

  getUserRanking(userId) {
    const ranking = this.getGlobalRanking();
    return ranking.find(user => user.id === userId);
  }

  // Métodos para temas
  getTemas() {
    return JSON.parse(localStorage.getItem('temas') || '[]');
  }

  createTema(temaData) {
    const temas = this.getTemas();
    const newTema = {
      id: `tema${Date.now()}`,
      ...temaData
    };
    temas.push(newTema);
    localStorage.setItem('temas', JSON.stringify(temas));
    return newTema;
  }

  // Métodos para perguntas
  getPerguntas() {
    return JSON.parse(localStorage.getItem('perguntas') || '[]');
  }

  getPerguntasByTema(temaId) {
    const perguntas = this.getPerguntas();
    return perguntas.filter(pergunta => pergunta.temaId === temaId);
  }

  createPergunta(perguntaData) {
    const perguntas = this.getPerguntas();
    const newPergunta = {
      id: `pergunta${Date.now()}`,
      ...perguntaData
    };
    perguntas.push(newPergunta);
    localStorage.setItem('perguntas', JSON.stringify(perguntas));
    return newPergunta;
  }

  // Métodos para partidas/histórico
  savePartida(partidaData) {
    const partidas = JSON.parse(localStorage.getItem('partidas') || '[]');
    const newPartida = {
      id: `partida${Date.now()}`,
      userId: partidaData.userId,
      temaId: partidaData.temaId,
      pontuacao: partidaData.pontuacao,
      totalPerguntas: partidaData.totalPerguntas,
      acertos: partidaData.acertos,
      data: new Date().toISOString()
    };
    partidas.push(newPartida);
    localStorage.setItem('partidas', JSON.stringify(partidas));
    return newPartida;
  }

  getPartidasByUser(userId) {
    const partidas = JSON.parse(localStorage.getItem('partidas') || '[]');
    return partidas.filter(partida => partida.userId === userId);
  }
}

// Instância singleton
const localStorageService = new LocalStorageService();
export default localStorageService;
