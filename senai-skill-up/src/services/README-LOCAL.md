# Sistema Local - SENAI Skill-Up

## 📝 Resumo das Implementações

Este documento descreve todas as funcionalidades que foram migradas para funcionar localmente, utilizando `localStorage` e `sessionStorage`.

## 🔧 Implementações Realizadas

### 1. Sistema de Autenticação Local
- **Login e Cadastro**: Funciona completamente local usando `sessionStorage`
- **Gerenciamento de Sessão**: Token de autenticação em `sessionStorage`
- **Proteção de Rotas**: Componente `ProtectedRoute` criado
- **Logout**: Remove dados de sessão e redireciona para login

### 2. Sistema de Usuários
- **Criação de Usuários**: Novos usuários são salvos no `localStorage`
- **Validação de Email**: Verifica duplicatas antes de cadastrar
- **Dados do Usuário**: Nome, email, pontos, biografia, nível
- **Usuários Padrão**: 25 usuários mockados para demonstração

### 3. Sistema de Pontuação
- **Pontos por Usuário**: Armazenados e atualizados localmente
- **Adição de Pontos**: Sistema para adicionar pontos após acertos
- **Histórico de Pontuação**: Todas as partidas são salvas

### 4. Sistema de Ranking
- **Ranking Global**: Ordenação automática por pontos
- **Posicionamento**: Cálculo da posição do usuário no ranking
- **Atualização em Tempo Real**: Ranking atualiza após cada partida

### 5. Sistema de Quiz/Questionários
- **Temas**: JavaScript, React, HTML/CSS pré-carregados
- **Perguntas**: Base de perguntas com alternativas
- **Respostas**: Salvamento de respostas e cálculo de pontos
- **Histórico**: Histórico completo de partidas do usuário

### 6. Interface Atualizada
- **Header Dinâmico**: Mostra nome e pontos do usuário logado
- **Login/Logout**: Botões dinâmicos baseados no estado de autenticação
- **Feedback Visual**: Mensagens de erro específicas

## 📂 Estrutura de Arquivos

```
src/services/
├── localStorageService.js    # Serviço principal para gerenciar dados locais
├── authService.js           # Serviço de autenticação atualizado
├── LoginService.js          # Serviço de login atualizado
├── rankingService.js        # Serviço de ranking atualizado
├── quizService.js          # Serviço de quiz atualizado
└── README-LOCAL.md         # Este arquivo

src/components/
└── ProtectedRoute/
    └── index.js            # Componente para proteger rotas
```

## 🎯 Funcionalidades Implementadas

### Login e Cadastro
- ✅ Login com email e senha
- ✅ Cadastro de novos usuários
- ✅ Validação de email único
- ✅ Mensagens de erro específicas
- ✅ Redirecionamento após login

### Gerenciamento de Usuários
- ✅ Criação de perfil completo
- ✅ Atualização de dados do usuário
- ✅ Sistema de pontuação individual
- ✅ Níveis de usuário (Iniciante, Intermediário, Avançado)

### Sistema de Quiz
- ✅ GET de temas disponíveis
- ✅ GET de perguntas por tema
- ✅ POST de respostas
- ✅ Cálculo automático de pontos
- ✅ Histórico de partidas

### Ranking
- ✅ GET de ranking global
- ✅ GET de pontuação do usuário
- ✅ Posicionamento automático
- ✅ Atualização em tempo real

### Interface
- ✅ Header com dados do usuário
- ✅ Exibição de pontos em tempo real
- ✅ Botão de logout funcional
- ✅ Proteção de rotas sensíveis

## 🔐 Dados Padrão

### Usuários de Teste
- **Email**: alice@teste.com, **Senha**: 123456 (1200 pontos)
- **Email**: bob@teste.com, **Senha**: 123456 (1100 pontos)
- **Email**: charlie@teste.com, **Senha**: 123456 (1000 pontos)

### Temas Disponíveis
1. **JavaScript Básico** - Conceitos fundamentais
2. **React** - Biblioteca para interfaces
3. **HTML & CSS** - Estrutura e estilização

## 🚀 Como Usar

1. **Acesse a aplicação**
2. **Faça login** com um dos usuários de teste ou **cadastre-se**
3. **Navegue para /game** para jogar
4. **Veja seu ranking** e pontos no header
5. **Acesse seu perfil** pelo dropdown do usuário

## 💾 Persistência de Dados

### localStorage
- Lista de usuários
- Temas e perguntas
- Histórico de partidas
- Configurações gerais

### sessionStorage
- Token de autenticação
- Dados do usuário atual
- Estado da sessão

## 🔄 Sincronização

O sistema atualiza automaticamente:
- Pontos no header após cada partida
- Ranking após mudanças na pontuação
- Dados do usuário em tempo real
- Estado de autenticação

## ⚡ Performance

- **Dados em Memória**: Acesso instantâneo aos dados
- **Sem Requisições HTTP**: Eliminação da latência de rede
- **Atualizações Instantâneas**: Interface sempre sincronizada
- **Offline First**: Funciona sem conexão com internet

## 🛡️ Segurança

- **Proteção de Rotas**: Páginas sensíveis protegidas
- **Validação de Dados**: Verificação antes de salvar
- **Logout Automático**: Limpeza completa da sessão
- **Tokens Temporários**: Autenticação em sessionStorage

---

**Nota**: Todos os dados são armazenados localmente no navegador e serão perdidos se o localStorage for limpo.
