# 🔧 Solução para Erro de CORS

## ❌ Problema Identificado
```
Access to XMLHttpRequest at 'http://localhost:8080/usuarios/cadastro' from origin 'http://localhost:3000' has been blocked by CORS policy
```

## ✅ Correções Implementadas

### 1. **SecurityConfig.java** - Configuração CORS no Spring Security
- ✅ Adicionada configuração CORS completa
- ✅ Permitidas todas as origens com `allowedOriginPatterns("*")`
- ✅ Todos os métodos HTTP permitidos
- ✅ Headers e credenciais configurados

### 2. **WebConfig.java** - Configuração CORS global
- ✅ Atualizada para usar `allowedOriginPatterns("*")`
- ✅ Cache de preflight configurado para 1 hora

## 🚀 Para Resolver o Problema:

### **Passo 1: Reiniciar o Backend**
```bash
# No terminal, navegue até o diretório do backend:
cd "C:/Users/SEDUC DEST1/Documents/senai-skillup.backend-teste-no-security"

# Pare o servidor se estiver rodando (Ctrl+C)
# Depois execute:
mvn clean install
mvn spring-boot:run
```

**Ou no IDE:**
1. Pare a aplicação (botão vermelho)
2. Execute novamente a classe `DrakesApplication.java`

### **Passo 2: Verificar se Backend Subiu**
- ✅ Backend deve estar em: `http://localhost:8080`
- ✅ Swagger UI: `http://localhost:8080/swagger-ui.html`
- ✅ Console deve mostrar: "Started DrakesApplication"

### **Passo 3: Testar no Frontend**
```bash
# Terminal do frontend:
cd "C:/Users/SEDUC DEST1/Documents/senai-skill-up"
npm start
```

## 🧪 Teste Rápido

### No Console do Navegador (F12):
```javascript
// Teste de conectividade
fetch('http://localhost:8080/usuarios')
  .then(response => console.log('Status:', response.status))
  .catch(error => console.error('Erro:', error));

// Teste de cadastro
fetch('http://localhost:8080/usuarios/cadastro', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    nome: 'Teste',
    email: 'teste@gmail.com', 
    senha: '123456'
  })
})
.then(response => console.log('Cadastro Status:', response.status))
.catch(error => console.error('Erro cadastro:', error));
```

## 🔍 Verificações Importantes

### ✅ **Backend deve mostrar no console:**
```
INFO 12345 --- [main] com.tcc.drakes.DrakesApplication: Started DrakesApplication
INFO 12345 --- [main] o.s.b.w.embedded.tomcat.TomcatWebServer: Tomcat started on port(s): 8080
```

### ✅ **MySQL deve estar rodando:**
- Porta: 3306
- Database: `tcc`
- User: `root`
- Password: `root`

## 🚨 Se o Problema Persistir

1. **Verificar portas ocupadas:**
   ```bash
   netstat -an | findstr :8080
   netstat -an | findstr :3306
   ```

2. **Logs detalhados:**
   - Backend: Verificar console do Spring Boot
   - Frontend: Console do navegador (F12)

3. **Teste manual da API:**
   - Use Postman ou Insomnia
   - Teste: `POST http://localhost:8080/usuarios/cadastro`

## 📞 Status das Correções
- ✅ CORS configurado no Spring Security
- ✅ CORS configurado globalmente
- ✅ Preflight requests habilitados
- ✅ Todas as origens permitidas
- ✅ Headers e métodos corretos

