# Sistema de Autenticação e Autorização - Frontend

Este documento explica como o backend deve implementar o sistema de autenticação e autorização para funcionar corretamente com o frontend.

## 📋 Visão Geral

O sistema implementa controle de acesso baseado em permissões com 3 tipos de usuários:
- **ADM** - Administradores do sistema
- **CRIADOR** - Usuários que podem criar quizzes
- **USER** - Usuários padrão

## 🔐 Estrutura do Token JWT

### Payload do Token
O token JWT deve conter as seguintes informações no payload:

```json
{
  "id": "user_id_123",
  "nome": "Nome do Usuário",
  "email": "usuario@exemplo.com",
  "permissoes": "ADM", // ou "CRIADOR" ou "USER"
  "tipoUsuario": "ADM", // campo alternativo (opcional)
  "pontuacao": 1500,
  "avatar": "url_do_avatar.jpg", // opcional
  "iat": 1635724800,
  "exp": 1635811200
}
```

### Campos Obrigatórios
- `id` - ID único do usuário
- `nome` - Nome completo do usuário
- `email` - Email do usuário
- `permissoes` - Nível de permissão do usuário

### Campos Opcionais
- `tipoUsuario` - Campo alternativo para permissões
- `pontuacao` - Pontos do usuário no sistema
- `avatar` - URL da foto do perfil

## 🚀 Endpoints do Backend

### 1. Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@exemplo.com",
  "password": "senha123"
}
```

**Resposta de Sucesso:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_123",
    "nome": "Administrador",
    "email": "admin@exemplo.com",
    "permissoes": "ADM",
    "pontuacao": 2500
  }
}
```

### 2. Verificação de Token
```http
GET /api/auth/verify
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Resposta:**
```json
{
  "valid": true,
  "user": {
    "id": "user_123",
    "nome": "Administrador",
    "email": "admin@exemplo.com",
    "permissoes": "ADM",
    "pontuacao": 2500
  }
}
```

## 🛡️ Rotas Protegidas

### Rotas que Requerem Permissão ADM
- `GET /api/admin/users` - Listar todos os usuários
- `PUT /api/admin/users/:id` - Editar usuário
- `DELETE /api/admin/users/:id` - Deletar usuário
- `POST /api/admin/users` - Criar usuário

### Rotas que Requerem Permissão CRIADOR
- `POST /api/quiz/create` - Criar novo quiz
- `PUT /api/quiz/:id` - Editar quiz
- `DELETE /api/quiz/:id` - Deletar quiz

### Middleware de Autorização (Exemplo Node.js)
```javascript
const jwt = require('jsonwebtoken');

// Middleware de autenticação
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token de acesso requerido' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }
    req.user = user;
    next();
  });
};

// Middleware de autorização
const requirePermission = (requiredPermission) => {
  return (req, res, next) => {
    const userPermission = req.user.permissoes || req.user.tipoUsuario;
    
    if (userPermission !== requiredPermission) {
      return res.status(403).json({ 
        error: 'Permissão insuficiente',
        required: requiredPermission,
        current: userPermission
      });
    }
    
    next();
  };
};

// Exemplo de uso
app.get('/api/admin/users', 
  authenticateToken, 
  requirePermission('ADM'), 
  (req, res) => {
    // Lógica para listar usuários
  }
);

app.post('/api/quiz/create', 
  authenticateToken, 
  requirePermission('CRIADOR'), 
  (req, res) => {
    // Lógica para criar quiz
  }
);
```

## 📱 Como o Frontend Usa

### 1. Armazenamento do Token
```javascript
// Após login bem-sucedido
localStorage.setItem('token', response.data.token);
localStorage.setItem('userData', JSON.stringify(response.data.user));
```

### 2. Verificação de Permissões
```javascript
// O frontend verifica automaticamente as permissões
const userPermission = userData?.permissoes || userData?.tipoUsuario;

// Rotas protegidas no React Router
<Route path="/admin/usuarios" element={
  <ProtectedRoute requiredPermission="ADM">
    <AdminUsers />
  </ProtectedRoute>
} />

<Route path="/createquiz" element={
  <ProtectedRoute requiredPermission="CRIADOR">
    <CreateQuiz />
  </ProtectedRoute>
} />
```

### 3. Headers de Requisição
```javascript
// Todas as requisições incluem o token
const token = localStorage.getItem('token');
const headers = {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
};
```

## 🔄 Fluxo de Autenticação

1. **Login**: Usuário envia credenciais
2. **Verificação**: Backend valida e retorna token JWT
3. **Armazenamento**: Frontend salva token e dados do usuário
4. **Navegação**: Frontend verifica permissões antes de renderizar rotas
5. **Requisições**: Todas as chamadas incluem token no header
6. **Renovação**: Token deve ser renovado antes de expirar

## ⚠️ Considerações de Segurança

### Backend
- Use HTTPS em produção
- Defina tempo de expiração adequado para tokens
- Implemente refresh tokens para sessões longas
- Valide todas as permissões no servidor
- Use variáveis de ambiente para chaves secretas

### Frontend
- Nunca confie apenas na validação do frontend
- Limpe tokens ao fazer logout
- Redirecione para login quando token expira
- Não armazene informações sensíveis no localStorage

## 🧪 Exemplos de Usuários para Teste

### Usuário Administrador
```json
{
  "email": "admin@senai.com",
  "password": "admin123",
  "permissoes": "ADM"
}
```

### Usuário Criador
```json
{
  "email": "criador@senai.com",
  "password": "criador123",
  "permissoes": "CRIADOR"
}
```

### Usuário Padrão
```json
{
  "email": "usuario@senai.com",
  "password": "user123",
  "permissoes": "USER"
}
```

## 📋 Checklist de Implementação

### Backend
- [ ] Endpoint de login retorna token JWT
- [ ] Token contém campo `permissoes` ou `tipoUsuario`
- [ ] Middleware de autenticação implementado
- [ ] Middleware de autorização por permissão
- [ ] Rotas protegidas configuradas
- [ ] Endpoint de verificação de token

### Frontend
- [ ] Sistema de login salva token
- [ ] ProtectedRoute verifica permissões
- [ ] Rotas sensíveis protegidas
- [ ] Headers de autorização em requisições
- [ ] Logout limpa dados armazenados
- [ ] Redirecionamento para página não autorizada

## 🐛 Troubleshooting

### Problema: Usuário não consegue acessar rota protegida
- Verifique se o token contém o campo `permissoes`
- Confirme se o valor da permissão está correto ("ADM", "CRIADOR", "USER")
- Verifique se o token não expirou

### Problema: Token não é aceito pelo backend
- Confirme se o header Authorization está correto
- Verifique se a chave secreta é a mesma no frontend e backend
- Teste se o token está sendo enviado corretamente

### Logs de Debug
O frontend inclui logs no console para debug:
```javascript
console.log('Verificando permissão:', {
  required: requiredPermission,
  user: userPermission,
  userData: userData
});
```

---

**Desenvolvido para SENAI Skill-Up**  
*Sistema de Autenticação e Autorização v1.0*
