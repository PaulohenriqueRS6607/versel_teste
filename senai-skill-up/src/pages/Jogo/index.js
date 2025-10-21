import React from "react";
import { Header, Footer } from '../../components';
import GameQuiz from '../../components/GameQuiz';
import "./style.css";

export default function Jogo() {
    return (
        <div className="no-scroll">
            <Header />
            <GameQuiz />
        </div>
    );
}
