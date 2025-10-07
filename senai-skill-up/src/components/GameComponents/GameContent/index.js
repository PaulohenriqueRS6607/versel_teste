import React, { useState } from "react";
import RankingSection from '../RankingSection';
import QuizSection from '../QuizSection';
import { ModalQuestionario } from '../../';
import "./style.css";

export default function GameContent() {
    const [modalOpen, setModalOpen] = useState(false);
    const [questionarioSelecionado, setQuestionarioSelecionado] = useState(null);

    const handleQuizSelect = (question) => {
        setQuestionarioSelecionado(question);
        setModalOpen(true);
    };

    return (
        <>
            <div className="game-content-wrapper">
                <RankingSection />
                <QuizSection onQuizSelect={handleQuizSelect} />
            </div>
            <div className="game-spacing"></div>
            <ModalQuestionario 
                open={modalOpen} 
                onClose={() => setModalOpen(false)} 
                questionario={questionarioSelecionado || {}} 
            />
        </>
    );
}
