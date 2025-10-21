import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header';
import lockIcon from '../../assets/images/image 47.png'; 
import './style.css';

export default function ResetPassword() {
    const [newPassword, setNewPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (newPassword.length < 6) {
            setMessage('A senha deve ter no mínimo 6 caracteres!');
            return;
        }

        setIsLoading(true);
        setMessage('');

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            setMessage('Senha alterada com sucesso!');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            setMessage('Erro ao alterar senha. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
       <div className="reset-password-container">
    <Header />
    
    <div className="reset-content">
        <img src={lockIcon} alt="Lock Icon" className="lock-icon" />
        <h2 className="form-title">INSIRA A SUA NOVA SENHA</h2>

        <form onSubmit={handleSubmit} className="reset-password-form">
            <input
                type="password"
                placeholder="Nova senha (mínimo 6)"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength="6"
                className="reset-input"
            />

            <button 
                type="submit" 
                disabled={isLoading} 
                className="reset-btn"
            >
                {isLoading ? 'Alterando...' : 'ENVIAR'}
            </button>

            {message && <div className="message">{message}</div>}
        </form>
    </div>
</div>

    );
}
