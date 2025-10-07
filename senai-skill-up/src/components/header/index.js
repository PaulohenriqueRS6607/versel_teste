import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, logout, isAuthenticated } from '../../services/authService';
import localStorageService from '../../services/localStorageService';

export default function Header() {
    const navigate = useNavigate();
    
    // Estados para dados do usuário (mantém lógica, mas usa dados mockados na interface)
    const [userData, setUserData] = useState(null);
    const [userPoints, setUserPoints] = useState(0);

    // Dados do usuário - atualiza nome e pontos com dados reais
    const getUserData = () => {
        if (userData && userData.nome) {
            return {
                name: userData.nome,
                avatar: require("../../assets/images/user-profile 1.png"),
                isLoggedIn: true
            };
        }
        return {
            name: "USUARIO",
            avatar: require("../../assets/images/user-profile 1.png"),
            isLoggedIn: true
        };
    };

    const getPointsData = () => {
        return {
            points: userPoints || 10000,
            medalIcon: require("../../assets/images/image 33.png"),
            level: "Bronze"
        };
    };

    const currentUserData = getUserData();
    const currentPointsData = getPointsData();

    // Estado para controlar o dropdown de configurações
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const settingsDropdownRef = useRef(null);
    
    // Estado para controlar o dropdown do perfil do usuário
    const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);
    const userProfileDropdownRef = useRef(null);

    // Carrega dados do usuário logado (só para lógica interna)
    useEffect(() => {
        const loadUserData = () => {
            const authenticated = isAuthenticated();
            
            if (authenticated) {
                const currentUser = getCurrentUser();
                if (currentUser) {
                    setUserData(currentUser);
                    
                    // Busca dados completos do usuário para obter pontos atualizados
                    const fullUserData = localStorageService.getUserById(currentUser.userId);
                    if (fullUserData) {
                        setUserPoints(fullUserData.pontos);
                    }
                }
            }
        };

        loadUserData();
        
        // Listener para atualizar dados quando mudam no localStorage
        const handleStorageChange = () => {
            loadUserData();
        };
        
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    // Funções para controlar o dropdown de configurações
    const toggleSettings = () => {
        setIsSettingsOpen(!isSettingsOpen);
        setIsUserProfileOpen(false); // Fecha o dropdown do usuário
    };

    // Funções para controlar o dropdown do perfil do usuário
    const toggleUserProfile = () => {
        setIsUserProfileOpen(!isUserProfileOpen);
        setIsSettingsOpen(false); // Fecha o dropdown de configurações
    };

    const handleSettingsClick = (option) => {
        console.log(`Opção selecionada: ${option}`);
        setIsSettingsOpen(false);
        
        // Aqui você pode adicionar a lógica para cada opção
        switch(option) {
            case 'TERMOS':
                navigate('/termos');
                break;
            case 'CONTATO':
                navigate('/contato');
                break;
            case 'SAIR':
                logout();
                setUserData(null);
                setUserPoints(0);
                navigate('/login');
                console.log('Usuário deslogado');
                break;
            default:
                break;
        }
    };

    const handleUserProfileClick = (option) => {
        console.log(`Opção do perfil selecionada: ${option}`);
        setIsUserProfileOpen(false);
        
        // Aqui você pode adicionar a lógica para cada opção do perfil
        switch(option) {
            case 'MINHA CONTA':
                navigate('/perfil');
                console.log('Abrindo página de perfil');
                break;
            case 'USUÁRIOS':
                // Implementar página de usuários se necessário
                console.log('Abrindo página de usuários');
                break;
            default:
                break;
        }
    };

    // Hook para fechar dropdowns ao clicar fora
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (settingsDropdownRef.current && !settingsDropdownRef.current.contains(event.target)) {
                setIsSettingsOpen(false);
            }
            if (userProfileDropdownRef.current && !userProfileDropdownRef.current.contains(event.target)) {
                setIsUserProfileOpen(false);
            }
        };

        if (isSettingsOpen || isUserProfileOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSettingsOpen, isUserProfileOpen]);

    return (
        <header>
            <div className="header-container">
                <div className="logo-section">
                    <Link to="/" className="logo-link">
                        <span className="logo-text">SENAI SKILL-UP</span>
                    </Link>
                </div>

                <div className="right-section">
                    <div className="nav-section">
                        <Link to="/" className="nav-link">INICIO</Link>
                    </div>

                    <div className="user-profile" ref={userProfileDropdownRef} onClick={toggleUserProfile}>
                        <img 
                            src={currentUserData.avatar} 
                            alt="Avatar" 
                            className="avatar" 
                        />
                        <span className="username">{currentUserData.name}</span>
                        <span className="dropdown-arrow">▼</span>
                        
                        {/* Dropdown Menu do Perfil */}
                        {isUserProfileOpen && (
                            <div className="user-profile-dropdown">
                                <div className="user-dropdown-arrow"></div>
                                <div className="user-dropdown-content">
                                    <div 
                                        className="user-dropdown-item" 
                                        onClick={() => handleUserProfileClick('MINHA CONTA')}
                                    >
                                        MINHA CONTA
                                    </div>
                                    <div 
                                        className="user-dropdown-item" 
                                        onClick={() => handleUserProfileClick('USUÁRIOS')}
                                    >
                                        USUÁRIOS
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="points-section">
                        <img 
                            src={currentPointsData.medalIcon} 
                            alt="Medalha" 
                            className="medal-icon" 
                        />
                        <span className="points-number">{currentPointsData.points}</span>
                    </div>

                    <div className="settings-section" ref={settingsDropdownRef} onClick={toggleSettings}>
                        <img 
                            src={require("../../assets/images/settings 1.png")} 
                            alt="Configurações" 
                            className="settings-icon"
                        />
                        
                        {/* Dropdown Menu */}
                        {isSettingsOpen && (
                            <div className="settings-dropdown">
                                <div className="dropdown-arrow"></div>
                                <div className="dropdown-content">
                                    <div 
                                        className="dropdown-item" 
                                        onClick={() => handleSettingsClick('TERMOS')}
                                    >
                                        TERMOS
                                    </div>
                                    <div 
                                        className="dropdown-item" 
                                        onClick={() => handleSettingsClick('CONTATO')}
                                    >
                                        CONTATO
                                    </div>
                                    <div 
                                        className="dropdown-item" 
                                        onClick={() => handleSettingsClick('SAIR')}
                                    >
                                        SAIR
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>  
        </header>
    );
}