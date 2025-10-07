import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import image from '../../assets/images/bagulho.svg';
import "./style.css";
import Header from '../../components/header';
import loginService from '../../services/LoginService';
import PasswordField from '../../components/PasswordField';

export default function Login() {
    const [isSignUpMode, setIsSignUpMode] = useState(false);
    const navigate = useNavigate();

    // Estados para o formulário de login
    const [loginEmail, setLoginEmail] = useState('');
    const [loginSenha, setLoginSenha] = useState('');

    // Estados para o formulário de cadastro
    const [cadastroNome, setCadastroNome] = useState('');
    const [cadastroEmail, setCadastroEmail] = useState('');
    const [cadastroSenha, setCadastroSenha] = useState('');

    const handleSignUpClick = () => {
        setIsSignUpMode(true);
    };

    const handleSignInClick = () => {
        setIsSignUpMode(false);
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginService.login(loginEmail, loginSenha);
            console.log("Login realizado com sucesso:", response);
            navigate('/game');
        } catch (error) {
            console.error("Erro no login:", error);
            alert(error.message || "Erro no login. Verifique suas credenciais.");
        }
    };
    
    const handleSignUpSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await loginService.cadastrar(cadastroNome, cadastroEmail, cadastroSenha);
            console.log("Cadastro realizado com sucesso:", response);
            alert("Cadastro realizado com sucesso! Faça login para continuar.");
            setIsSignUpMode(false);
            // Limpar campos do cadastro
            setCadastroNome('');
            setCadastroEmail('');
            setCadastroSenha('');
        } catch (error) {
            console.error("Erro no cadastro:", error);
            alert(error.message || "Erro no cadastro. Tente novamente.");
        }
    };

    return (
        <>
        <Header />
        <div className={`container ${isSignUpMode ? 'sign-up-mode' : ''}`}>
            <div className="forms-container">
                <div className="signin-signup">
                    <form className="sign-in-form" onSubmit={handleLoginSubmit}>
                        <h2 className="title">LOGIN</h2>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input 
                                type="email" 
                                placeholder="Email" 
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                                required
                            />
                        </div>
                        <PasswordField 
                            placeholder="Senha"
                            value={loginSenha}
                            onChange={(e) => setLoginSenha(e.target.value)}
                            required
                        />
                        <input type="submit" value="Login" className="btn solid" />
                    </form>

                    <form className="sign-up-form" onSubmit={handleSignUpSubmit}>
                        <h2 className="title">CADASTRE-SE</h2>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input 
                                type="text" 
                                placeholder="Nome completo" 
                                value={cadastroNome}
                                onChange={(e) => setCadastroNome(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-envelope"></i>
                            <input 
                                type="email" 
                                placeholder="Email" 
                                value={cadastroEmail}
                                onChange={(e) => setCadastroEmail(e.target.value)}
                                required
                            />
                        </div>
                        <PasswordField 
                            placeholder="Senha"
                            value={cadastroSenha}
                            onChange={(e) => setCadastroSenha(e.target.value)}
                            required
                        />
                        <input type="submit" className="btn" value="Cadastrar" />
                    </form>
                </div>
            </div>

            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="content">
                        <h3>Já tem uma conta?</h3>
                        <p></p>
                        <button className="btn transparent" id="sign-up-btn" onClick={handleSignUpClick}>
                            CADASTRE-SE
                        </button>
                    </div>
                    <img src={image} className="image" alt="" />
                </div>
                <div className="panel right-panel">
                    <div className="content">
                        <h3>Não está cadastrado?</h3>
                        <p></p>
                        <button className="btn transparent" id="sign-in-btn" onClick={handleSignInClick}>
                            LOGIN
                        </button>
                    </div>
                    <img src={image} className="image" alt="" />
                </div>
            </div>
        </div>
        </>
    );
}
