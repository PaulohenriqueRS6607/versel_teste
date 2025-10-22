import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

export default function Unauthorized() {
  return (
    <div className="unauthorized-container">
      <div className="unauthorized-content">
        <div className="unauthorized-icon">🚫</div>
        <h1>Acesso Negado</h1>
        <p>Você não tem permissão para acessar esta página.</p>
        <p>Entre em contato com o administrador se acredita que isso é um erro.</p>
        
        <div className="unauthorized-actions">
          <Link to="/" className="btn-home">
            Voltar ao Início
          </Link>
          <Link to="/usuarios" className="btn-users">
            Ver Usuários
          </Link>
        </div>
      </div>
    </div>
  );
}
