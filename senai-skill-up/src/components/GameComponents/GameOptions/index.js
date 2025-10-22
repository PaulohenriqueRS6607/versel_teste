import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./style.css";

export default function GameOptions() {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    // Atualiza o estado de isMobile quando a janela for redimensionada
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleJoinPrivateRoom = () => {
        navigate('/pin');
    };

    const handleCreateRoom = () => {
        navigate('/criarsala');
    };

    const nextSlide = () => {
        setCurrentSlide(prev => {
            const next = prev + 1;
            return next > 1 ? 0 : next;
        });
    };

    const prevSlide = () => {
        setCurrentSlide(prev => {
            const next = prev - 1;
            return next < 0 ? 1 : next;
        });
    };
    
    // Verifica se as setas devem estar desabilitadas
    const isFirstSlide = currentSlide === 0;
    const isLastSlide = currentSlide === 1;

    // Estilo para o container dos slides
    const slideContainerStyle = {
        display: 'flex',
        transition: 'transform 0.5s ease-in-out',
        transform: `translateX(${-currentSlide * 100}%)`,
        width: '200%',
    };

    const renderDesktopView = () => (
        <div className="opcoes-container">
            <div className="opcao-card" style={{ backgroundColor: '#A4DCAB' }} onClick={handleJoinPrivateRoom}>
                <h3>SALA PRIVADA</h3>
                <p>Divirta-se com seus <br/> colegas de classe</p>
                <img src={require("../../../assets/images/image 2.svg").default} alt="Sala Privada" className="card-img" />
                <div className="btn-container">
                    <img src={require("../../../assets/images/Vector (1).svg").default} alt="Botão Sala Privada" className="card-btn" />
                    <span className="btn-text">ENTRAR</span>
                </div>
            </div>

            <img src={require("../../../assets/images/add.svg").default} alt="Separador" className="middle-add-icon" />

            <div className="opcao-card" style={{ backgroundColor: '#A3BFDD' }} onClick={handleCreateRoom}>
                <h3>CRIAR SALA</h3>
                <p>Crie uma sala para você e <br/> seus amigos</p>
                <img src={require("../../../assets/images/add.svg").default} alt="Criar Sala" className="card-img" />
                <div className="btn-container">
                    <img src={require("../../../assets/images/Vector (2).svg").default} alt="Botão Criar Sala" className="card-btn" />
                    <span className="btn-text">CRIAR</span>
                </div>
            </div>
        </div>
    );

    const renderMobileView = () => (
        <div className="carousel-container">
            <button 
                className="nav-arrow left-arrow" 
                onClick={prevSlide}
                disabled={isFirstSlide}
                aria-label="Slide anterior"
            >
                <FaChevronLeft />
            </button>
            
            <div className="slides-wrapper">
                <div className="slides-container" style={slideContainerStyle}>
                    {/* Card Sala Privada */}
                    <div className="mobile-slide">
                        <div className="opcao-card" style={{ backgroundColor: '#A4DCAB' }} onClick={handleJoinPrivateRoom}>
                            <h3>SALA PRIVADA</h3>
                            <p>Divirta-se com seus <br/>colegas de classe</p>
                            <img src={require("../../../assets/images/image 2.svg").default} alt="Sala Privada" className="card-img" />
                            <div className="btn-container">
                                <img src={require("../../../assets/images/Vector (1).svg").default} alt="Botão Sala Privada" className="card-btn" />
                                <span className="btn-text">ENTRAR</span>
                            </div>
                        </div>
                    </div>

                    {/* Card Criar Sala */}
                    <div className="mobile-slide">
                        <div className="opcao-card" style={{ backgroundColor: '#A3BFDD' }} onClick={handleCreateRoom}>
                            <h3>CRIAR SALA</h3>
                            <p>Crie uma sala para você e <br/>seus amigos</p>
                            <img src={require("../../../assets/images/add.svg").default} alt="Criar Sala" className="card-img" />
                            <div className="btn-container">
                                <img src={require("../../../assets/images/Vector (2).svg").default} alt="Botão Criar Sala" className="card-btn" />
                                <span className="btn-text">CRIAR</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <button 
                className="nav-arrow right-arrow" 
                onClick={nextSlide}
                disabled={isLastSlide}
                aria-label="Próximo slide"
            >
                <FaChevronRight />
            </button>
            
            {/* Indicadores de slide (pontos) */}
            <div className="slide-indicators">
                <button 
                    className={`indicator ${currentSlide === 0 ? 'active' : ''}`} 
                    onClick={() => setCurrentSlide(0)}
                    aria-label="Ir para slide 1"
                    aria-current={currentSlide === 0}
                ></button>
                <button
                    className={`indicator ${currentSlide === 1 ? 'active' : ''}`}
                    onClick={() => setCurrentSlide(1)}
                    aria-label="Ir para slide 2"
                    aria-current={currentSlide === 1}
                ></button>
            </div>
        </div>
    );

    return (
        <>
            <img src={require("../../../assets/images/Group 13.png")} alt="Background gráfico" className="game-background" />
            <div className="jogue-agora-container">
                <img src={require("../../../assets/images/slogan (1).svg").default} alt="Jogue Agora" className="jogue-agora-slogan" />
                {isMobile ? renderMobileView() : renderDesktopView()}
            </div>
        </>
    );
}
