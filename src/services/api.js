const API_BASE_URL = 'http://localhost:8080';

async function handleResponse(response) {
  const text = await response.text();
  let data = null;

  if (text) {
    try {
      data = JSON.parse(text);
    } catch (e) {
      data = text;
    }
  }

  if (!response.ok) {
    const message = data && data.message ? data.message : typeof data === 'string' ? data : 'Erro na requisição';
    throw new Error(message);
  }

  return data;
}

export async function login(email, password) {
  const response = await fetch(`${API_BASE_URL}/auth/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, senha: password }),
  });

  const data = await handleResponse(response);

  if (data && data.tokenAcesso) {
    localStorage.setItem('authToken', data.tokenAcesso);
  }

  return data;
}

export async function registerUser({ nome, email, senha, cpf, dataNascimento }) {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nome,
      email,
      senha,
      cpf,
      dataNascimento,
    }),
  });

  return handleResponse(response);
}
