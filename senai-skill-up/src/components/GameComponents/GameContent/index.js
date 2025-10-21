import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RankingSection from '../RankingSection';
import QuizSection from '../QuizSection';
import { getRankingGlobal } from '../../../services/rankingService';
import "./style.css";

export default function GameContent() {
    const [ranking, setRanking] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Carregar dados do ranking
    useEffect(() => {
        const loadRankingData = async () => {
            try {
                setLoading(true);
                
                // Carregar ranking
                const rankingResponse = await getRankingGlobal();
                if (rankingResponse.success) {
                    setRanking(rankingResponse.data);
                }

            } catch (error) {
                console.error("Erro ao carregar ranking:", error);
                setRanking([]);
            } finally {
                setLoading(false);
            }
        };

        // Removido verificação de autenticação para permitir acesso livre

        loadRankingData();

        // Atualizar quando localStorage mudar
        const handleStorageChange = () => {
            loadRankingData();
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [navigate]);

    const handleQuizSelect = (questionario) => {
        // Navegar para a página do jogo/quiz com o tema selecionado
        navigate('/jogo', { state: { temaId: questionario?.id } });
    };

    // O fluxo de conclusão do quiz agora é tratado em `GameQuiz` na rota `/jogo`

    if (loading) {
        return (
            <div className="game-content-wrapper">
                <div style={{ padding: '20px', textAlign: 'center' }}>
                    <p>Carregando dados do jogo...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="game-content-wrapper">
                <RankingSection />
                <QuizSection onQuizSelect={handleQuizSelect} />
            </div>
            <div className="game-spacing"></div>
        </>
    );
}