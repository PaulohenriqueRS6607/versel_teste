import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

export default function GameOptions() {
    const navigate = useNavigate();

    const handleJoinPrivateRoom = () => {
        navigate('/pin');
    };

    const handleCreateRoom = () => {
        navigate('/criarsala');
    };

    return (
        <>
            <img src={require("../../../assets/images/Group 13.png")} alt="Background gráfico" className="game-background" />
            <div className="jogue-agora-container">
                <img src={require("../../../assets/images/slogan (1).svg").default} alt="Jogue Agora" className="jogue-agora-slogan" />
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
            </div>
        </>
    );
}
