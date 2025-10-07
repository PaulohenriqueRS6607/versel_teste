import React, { useState, useEffect } from "react";
import SearchIcon from "../../../assets/images/search 1.svg";
import image6 from "../../../assets/images/image 6.svg";
import image7 from "../../../assets/images/image 7.svg";
import image8 from "../../../assets/images/image 8.svg";
import image31 from "../../../assets/images/image 31.svg";
import { getGlobalRanking } from "../../../services/rankingService";
import "./style.css";

export default function RankingSection() {
    const [ranking, setRanking] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    // Carrega ranking do localStorage
    useEffect(() => {
        const loadRanking = async () => {
            try {
                setLoading(true);
                const response = await getGlobalRanking();
                setRanking(response.data || []);
            } catch (error) {
                console.error('Erro ao carregar ranking:', error);
                setRanking([]);
            } finally {
                setLoading(false);
            }
        };

        loadRanking();

        // Atualiza ranking quando localStorage muda
        const handleStorageChange = () => {
            loadRanking();
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    // Filtra usuários com base na pesquisa
    const filteredRanking = ranking.filter(user =>
        user.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const getRankIcon = (iconPath) => {
        switch (iconPath) {
            case '/assets/images/image 6.svg':
                return image6;
            case '/assets/images/image 7.svg':
                return image7;
            case '/assets/images/image 8.svg':
                return image8;
            default:
                return null;
        }
    };

    return (
        <div className="ranking-container">
            <div className="ranking-pesquisa-container">
                <input 
                    placeholder="Pesquisar..." 
                    className="ranking-pesquisa-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img src={SearchIcon} alt="Pesquisar" className="ranking-pesquisa-icon" />
            </div>
            <div className="ranking-lista">
                {loading ? (
                    <p>Carregando ranking...</p>
                ) : filteredRanking.length > 0 ? (
                    filteredRanking.map((user, idx) => (
                        <div
                            key={user.id || idx}
                            className="ranking-item"
                            onClick={() => {
                                alert(`Visualizar perfil de ${user.nome} - ${user.pontos} pontos`);
                            }}
                        >
                            {idx < 3 && user.avatar ? (
                                <img src={getRankIcon(user.avatar)} alt={`Rank ${idx + 1}`} className="ranking-pos-icon" /> 
                            ) : (
                                <span className="ranking-pos">{user.posicao || idx + 1}</span>
                            )}
                            <img 
                                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.nome)}&background=random`} 
                                alt="avatar" 
                                className="ranking-avatar" 
                            />
                            <span className="ranking-nome">{user.nome}</span>
                            <img src={image31} alt="Medalha" className="ranking-medal-icon" />
                            <span className="ranking-pontos">{user.pontos}</span>
                        </div>
                    ))
                ) : (
                    <p>{searchTerm ? 'Nenhum usuário encontrado.' : 'Nenhum usuário no ranking ainda.'}</p>
                )}
            </div>
        </div>
    );
}
