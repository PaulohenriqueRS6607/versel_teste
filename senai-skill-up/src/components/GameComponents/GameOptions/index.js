import React from "react";
import "./style.css";

export default function GameOptions() {
    return (
        <>
            <img src={require("../../../assets/images/Group 13.png")} alt="Background gráfico" className="game-background" />
            <div className="jogue-agora-container">
                <div className="opcoes-container">
                    <div className="opcao-card" style={{ backgroundColor: '#E5CFB7' }}>
                        <h3>RANQUEADO</h3>
                        <p>Jogue contra outros <br/> jogadores em busca do topo <br/> do rank</p>
                        <img src={require("../../../assets/images/image 31.svg").default} alt="Ranqueado" className="card-img" />
                        <div className="btn-container">
                            <img src={require("../../../assets/images/Vector.svg").default} alt="Botão Ranqueado" className="card-btn" />
                            <span className="btn-text">PLAY</span>
                        </div>
                    </div>
                    <div className="opcao-card" style={{ backgroundColor: '#A4DCAB' }}>
                        <h3>SALA PRIVADA</h3>
                        <p>Divirta-se com seus <br/> colegas de classe</p>
                        <img src={require("../../../assets/images/image 2.svg").default} alt="Sala Privada" className="card-img" />
                        <div className="btn-container">
                            <img src={require("../../../assets/images/Vector (1).svg").default} alt="Botão Sala Privada" className="card-btn" />
                            <span className="btn-text">ENTRAR</span>
                        </div>
                    </div>
                    <div className="opcao-card" style={{ backgroundColor: '#A3BFDD' }}>
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
