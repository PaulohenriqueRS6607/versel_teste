# 🏆 Como Adicionar Pontos aos Usuários

## 📋 **Métodos Disponíveis**

### 1. **Automático (Recomendado)**
Os pontos são adicionados automaticamente quando o usuário joga quiz:
- **10 pontos por pergunta correta**
- Sistema já configurado no `quizService.js`

### 2. **Manual (Para Testes)**

#### 🔧 **No Console do Navegador**

Abra o **DevTools** (F12) e cole os comandos no **Console**:

```javascript
// Importar funções helper
import { addPointsToUser, setUserPoints, listAllUsers, getUserByEmail, addPointsToAlice } from './src/utils/pointsHelper.js';

// 1. Listar todos os usuários e seus IDs
listAllUsers();

// 2. Adicionar pontos a um usuário específico
addPointsToUser('user1', 100); // Adiciona 100 pontos à Alice

// 3. Definir pontos específicos
setUserPoints('user2', 1500); // Define Bob com 1500 pontos

// 4. Buscar usuário por email
getUserByEmail('alice@teste.com');

// 5. Funções rápidas para usuários de teste
addPointsToAlice(200);    // Adiciona 200 pontos à Alice
addPointsToBob(150);      // Adiciona 150 pontos ao Bob
addPointsToCharlie(300);  // Adiciona 300 pontos ao Charlie
```

#### 🎯 **IDs dos Usuários Padrão**
- **user1** - Alice Silva (alice@teste.com)
- **user2** - Bob Santos (bob@teste.com)  
- **user3** - Charlie Oliveira (charlie@teste.com)
- **user4** até **user25** - Usuários gerados automaticamente

#### ⚡ **Comandos Rápidos**

```javascript
// Adicionar 500 pontos à Alice
localStorageService.addPointsToUser('user1', 500);

// Definir Bob com 2000 pontos
localStorageService.updateUserPoints('user2', 2000);

// Ver ranking atualizado
localStorageService.getGlobalRanking();
```

## 🔥 **Método Mais Simples**

### **Direto no Console:**

```javascript
// 1. Obter serviço
const storage = JSON.parse(localStorage.getItem('users'));

// 2. Encontrar usuário (por exemplo, Alice)
const alice = storage.find(u => u.email === 'alice@teste.com');
console.log('Alice antes:', alice.pontos);

// 3. Adicionar pontos
alice.pontos += 500;

// 4. Salvar de volta
localStorage.setItem('users', JSON.stringify(storage));

// 5. Atualizar interface
window.dispatchEvent(new Event('storage'));

console.log('Alice depois:', alice.pontos);
```

## 🎮 **Através do Sistema de Quiz**

1. **Faça login** com qualquer usuário
2. **Vá para /game**
3. **Clique em um quiz** para jogar
4. **Responda às perguntas**
5. **Pontos são adicionados automaticamente**

## 📊 **Verificar Mudanças**

Após adicionar pontos, você verá as mudanças:
- **Header** - pontos atualizados em tempo real
- **Ranking** - posições reorganizadas automaticamente
- **Perfil** - dados atualizados

## ⚠️ **Observações**

- **Mudanças são persistentes** - ficam salvas no localStorage
- **Interface atualiza automaticamente** - sem necessidade de refresh
- **Ranking reordena sozinho** - usuário com mais pontos fica no topo
- **Dados seguros** - validações impedem valores inválidos

## 🧪 **Exemplo Prático**

```javascript
// Console do navegador:

// Ver usuários atuais
console.table(JSON.parse(localStorage.getItem('users')).map(u => ({
  nome: u.nome, 
  email: u.email, 
  pontos: u.pontos
})));

// Adicionar 1000 pontos ao seu usuário
const users = JSON.parse(localStorage.getItem('users'));
const meuUsuario = users.find(u => u.email === 'SEU_EMAIL_AQUI');
meuUsuario.pontos += 1000;
localStorage.setItem('users', JSON.stringify(users));
window.dispatchEvent(new Event('storage'));
```

---

**💡 Dica**: Use o método automático jogando quiz para uma experiência mais realista!
