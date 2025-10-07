// Utilitário para testar a conexão com o backend
import api from '../services/api';

export const testBackendConnection = async () => {
  try {
    console.log('🔄 Testando conexão com o backend...');
    
    // Teste básico de conectividade
    const response = await api.get('/usuarios');
    
    if (response.status === 200) {
      console.log('✅ Conexão com backend estabelecida com sucesso!');
      console.log('📊 Dados recebidos:', response.data);
      return { success: true, data: response.data };
    }
  } catch (error) {
    console.error('❌ Erro na conexão com o backend:', error);
    
    if (error.code === 'ECONNREFUSED') {
      console.error('🚫 Backend não está rodando na porta 8080');
    } else if (error.response?.status === 404) {
      console.error('🔍 Endpoint não encontrado');
    } else if (error.response?.status >= 500) {
      console.error('🔥 Erro interno do servidor');
    }
    
    return { success: false, error: error.message };
  }
};

export const testLogin = async (email = 'test@gmail.com', password = 'test123') => {
  try {
    console.log('🔐 Testando login...');
    
    const response = await api.post('/usuarios/login', { email, password });
    
    if (response.status === 200) {
      console.log('✅ Login realizado com sucesso!');
      return { success: true, data: response.data };
    }
  } catch (error) {
    console.error('❌ Erro no login:', error);
    return { success: false, error: error.message };
  }
};

// Função para executar todos os testes
export const runAllTests = async () => {
  console.log('🧪 Iniciando testes de conexão...\n');
  
  const connectionTest = await testBackendConnection();
  const loginTest = await testLogin();
  
  console.log('\n📋 Resumo dos testes:');
  console.log('Conexão:', connectionTest.success ? '✅' : '❌');
  console.log('Login:', loginTest.success ? '✅' : '❌');
  
  return {
    connection: connectionTest,
    login: loginTest
  };
};

