import React from 'react';
import './style.css';

export default function UsersRankingTable({ 
  users, 
  searchTerm, 
  onSearch, 
  onViewProfile,
  loading
}) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return '#28a745';
      case 'offline': return '#6c757d';
      default: return '#28a745';
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Carregando usuários...</p>
      </div>
    );
  }

  return (
    <div className="users-ranking-container">
      {/* Barra de pesquisa */}
      <div className="search-section">
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar usuários..."
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            className="search-input"
          />
          <div className="search-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="#718096" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Cabeçalho da tabela */}
      <div className="table-header">
        <div className="header-cell">Pontos</div>
        <div className="header-cell">Nome</div>
        <div className="header-cell">Posição</div>
        <div className="header-cell">Status</div>
        <div className="header-cell">Perfil</div>
      </div>

      {/* Lista de usuários */}
      <div className="users-list">
        {users.length === 0 ? (
          <div className="no-users">
            <p>Nenhum usuário encontrado</p>
          </div>
        ) : (
          users.map((user) => (
            <div key={user.id} className="user-row">
              <div className="user-cell">
                <span className="user-points">{user.pontos || 0}</span>
              </div>
              <div className="user-cell">
                <span className="user-name">{user.nome}</span>
              </div>
              <div className="user-cell">
                <span className="user-position">{user.rank}°</span>
              </div>
              <div className="user-cell">
                <div className="status-indicator">
                  <div 
                    className={`status-dot ${user.status === 'online' ? '' : 'offline'}`}
                  />
                </div>
              </div>
              <div className="user-cell actions-cell">
                <button
                  className="action-btn view-profile-btn"
                  onClick={() => onViewProfile && onViewProfile(user)}
                  title="Ver perfil"
                >
                  Perfil
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
