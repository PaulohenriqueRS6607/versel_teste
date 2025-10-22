import React, { useState, useEffect } from 'react';
import PermissionTypeModal from '../PermissionTypeModal';
import './style.css';

export default function UserEditModal({ user, onSave, onClose }) {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    status: 'online',
    permissoes: 'USER',
    tipoUsuario: 'USUARIO',
    pontos: 0,
    nivel: 'Bronze',
    jogosJogados: 0,
    precisao: 0
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        nome: user.nome || '',
        email: user.email || '',
        status: user.status || 'online',
        permissoes: user.permissoes || 'USER',
        tipoUsuario: user.tipoUsuario || 'USUARIO',
        pontos: user.pontos || 0,
        nivel: user.nivel || 'Bronze',
        jogosJogados: user.jogosJogados || 0,
        precisao: user.precisao || 0
      });
    } else {
      setFormData({
        nome: '',
        email: '',
        status: 'online',
        permissoes: 'USER',
        tipoUsuario: 'USUARIO',
        pontos: 0,
        nivel: 'Bronze',
        jogosJogados: 0,
        precisao: 0
      });
    }
    setErrors({});
  }, [user]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (formData.pontos < 0) {
      newErrors.pontos = 'Pontos não podem ser negativos';
    }

    if (formData.jogosJogados < 0) {
      newErrors.jogosJogados = 'Jogos jogados não podem ser negativos';
    }

    if (formData.precisao < 0 || formData.precisao > 100) {
      newErrors.precisao = 'Precisão deve estar entre 0 e 100';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    const newValue = type === 'number' ? parseInt(value) || 0 : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSave(formData);
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handlePermissionClick = () => {
    setIsPermissionModalOpen(true);
  };

  const handlePermissionSelect = (permission) => {
    setFormData(prev => ({
      ...prev,
      permissoes: permission,
      tipoUsuario: permission === 'ADM' ? 'ADMINISTRADOR' : 
                   permission === 'CRIADOR' ? 'CRIADOR' : 'USUARIO'
    }));
  };

  const getPermissionLabel = (permission) => {
    switch (permission) {
      case 'ADM': return 'Administrador';
      case 'CRIADOR': return 'Criador';
      case 'USER': return 'Usuário';
      default: return 'Usuário';
    }
  };

  return (
    <div className="modern-modal-overlay" onClick={handleOverlayClick}>
      <div className="modern-modal-container">
        <div className="modern-modal-header">
          <h2>Editar Usuário</h2>
          <button className="modern-close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="modern-modal-content">
          <div className="user-preview-section">
            <div className="preview-header">
              <span>Nome</span>
              <span>Email</span>
              <span>Status</span>
              <span>Permissões</span>
            </div>
            
            <div className="preview-data">
              <span className="preview-name">{formData.nome || 'NOME DO USUÁRIO'}</span>
              <span className="preview-email">{formData.email || 'email@exemplo.com'}</span>
              <div className="preview-status">
                <div className={`status-dot ${formData.status === 'offline' ? 'offline' : ''}`}></div>
              </div>
              <span className={`preview-permission ${formData.permissoes?.toLowerCase()}-badge`}>
                {formData.permissoes || 'USER'}
              </span>
            </div>
          </div>

          <div className="lateral-edit-section">
            <div className="edit-form-lateral">
              <div className="form-field-lateral">
                <label>NOME</label>
                <span className="required">*</span>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  className={errors.nome ? 'error' : ''}
                  placeholder="Digite o nome do usuário"
                />
                {errors.nome && <span className="error-text">{errors.nome}</span>}
              </div>

              <div className="form-field-lateral">
                <label>EMAIL</label>
                <span className="required">*</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? 'error' : ''}
                  placeholder="Digite o email do usuário"
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>

              <div className="form-field-lateral">
                <label>PERMISSÕES</label>
                <button
                  type="button"
                  className="permission-dropdown-lateral"
                  onClick={handlePermissionClick}
                >
                  <span className={`permission-badge-lateral ${formData.permissoes?.toLowerCase()}-badge`}>
                    {getPermissionLabel(formData.permissoes)}
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="modern-modal-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={onClose}
              disabled={isSubmitting}
            >
              CANCELAR
            </button>
            <button
              type="submit"
              className="btn-update"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'SALVANDO...' : 'ATUALIZAR'}
            </button>
          </div>
        </form>
      </div>

      {isPermissionModalOpen && (
        <PermissionTypeModal
          isOpen={isPermissionModalOpen}
          onClose={() => setIsPermissionModalOpen(false)}
          onSelectPermission={handlePermissionSelect}
          currentPermission={formData.permissoes}
        />
      )}
    </div>
  );
}
