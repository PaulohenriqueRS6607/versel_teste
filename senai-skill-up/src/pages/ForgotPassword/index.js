import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header';
import './style.css';
import group51 from '../../assets/images/Group 51.png';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            setMessage('Email de recuperação enviado com sucesso!');
            
            setTimeout(() => {
                navigate('/ResetPassword', { state: { email: email } });
            }, 2000);
        } catch (error) {
            setMessage('Erro ao enviar email. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="forgot-password-container">
            <Header />
            <div className="forgot-password-content">
                <div className="illustration-section">
                    <img src={group51} alt="Illustration" className="recovery-image" />
                </div>
                <div className="form-section">
                    <div className="form-content">
                        <h2 className="form-title">COLOQUE O E-MAIL DE <br /> RECUPERAÇÃO</h2>
                        
                        <form onSubmit={handleSubmit} className="forgot-password-form">
                            <input 
                                type="email" 
                                placeholder="Digite seu email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="email-input"
                            />

                            <button 
                                type="submit" 
                                className="btn-enviar"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Enviando...' : 'ENVIAR'}
                            </button>

                            {message && (
                                <div className={`message ${message.includes('sucesso') ? 'success' : 'error'}`}>
                                    {message}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
