// Array de nomes e sobrenomes para gerar nomes aleatórios
const firstNames = [
  'João', 'Maria', 'Pedro', 'Ana', 'Lucas', 'Juliana', 'Gabriel', 'Fernanda', 'Rafael', 'Amanda',
  'Matheus', 'Bruna', 'Gustavo', 'Carolina', 'Leonardo', 'Patrícia', 'Eduardo', 'Mariana', 'Rodrigo', 'Camila',
  'Felipe', 'Larissa', 'Thiago', 'Vanessa', 'Marcelo', 'Tatiane', 'Alexandre', 'Bianca', 'André', 'Priscila',
  'Carlos', 'Daniela', 'Roberto', 'Adriana', 'Diego', 'Cristina', 'Marcos', 'Aline', 'Fábio', 'Renata'
];

const lastNames = [
  'Silva', 'Santos', 'Oliveira', 'Souza', 'Pereira', 'Almeida', 'Ferreira', 'Rodrigues', 'Alves', 'Lima',
  'Araújo', 'Barbosa', 'Barros', 'Cardoso', 'Carvalho', 'Costa', 'Cunha', 'Dias', 'Duarte', 'Freitas',
  'Gomes', 'Gonçalves', 'Lima', 'Lopes', 'Martins', 'Melo', 'Monteiro', 'Moraes', 'Moura', 'Nascimento',
  'Nunes', 'Pinto', 'Ramos', 'Ribeiro', 'Rocha', 'Sales', 'Sampaio', 'Soares', 'Teixeira', 'Vieira'
];

// Função para gerar um número aleatório entre min e max
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Função para gerar um nome aleatório
const getRandomName = () => {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${firstName} ${lastName}`;
};

// Função para gerar um email baseado no nome
const generateEmail = (name) => {
  const [firstName, lastName] = name.toLowerCase().split(' ');
  const domains = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com', 'senai.br'];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  return `${firstName}.${lastName}${getRandomInt(1, 99)}@${domain}`;
};

// Níveis baseados em pontos
const getLevel = (points) => {
  if (points > 15000) return 'Diamante';
  if (points > 10000) return 'Ouro';
  if (points > 5000) return 'Prata';
  if (points > 1000) return 'Bronze';
  return 'Iniciante';
};

// Gera 80 usuários mockados
const generateMockUsers = () => {
  const users = [];
  
  // Adiciona alguns usuários com pontuações altas
  users.push({
    id: 1,
    nome: 'SENAI SKILL UP',
    email: 'admin@senai.com',
    status: 'online',
    pontos: 15750,
    nivel: 'Diamante',
    rank: 1,
    jogosJogados: 145,
    precisao: 96,
    dataCriacao: '2024-01-15',
    ultimoAcesso: new Date().toISOString().split('T')[0]
  });

  users.push({
    id: 2,
    nome: 'USER ADM',
    email: 'useradm@senai.com',
    status: 'online',
    pontos: 14230,
    nivel: 'Diamante',
    rank: 2,
    jogosJogados: 132,
    precisao: 92,
    dataCriacao: '2024-01-20',
    ultimoAcesso: new Date().toISOString().split('T')[0]
  });

  // Gera 78 usuários adicionais
  for (let i = 3; i <= 80; i++) {
    const name = getRandomName();
    const pontos = getRandomInt(500, 14000);
    const nivel = getLevel(pontos);
    
    users.push({
      id: i,
      nome: name,
      email: generateEmail(name),
      status: Math.random() > 0.7 ? 'online' : 'offline',
      pontos: pontos,
      nivel: nivel,
      rank: i,
      jogosJogados: getRandomInt(5, 150),
      precisao: getRandomInt(60, 99),
      dataCriacao: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 365).toISOString().split('T')[0],
      ultimoAcesso: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 30).toISOString().split('T')[0]
    });
  }

  // Ordena por pontos (do maior para o menor)
  return users.sort((a, b) => b.pontos - a.pontos).map((user, index) => ({
    ...user,
    rank: index + 1
  }));
};

const mockUsers = generateMockUsers();

export default mockUsers;
