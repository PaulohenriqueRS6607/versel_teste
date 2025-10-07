import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Login from './pages/Login';
import Home from './pages/Home';
import Contato from './pages/Contato'; 
import Game from './pages/Game';
import CreateQuiz from './pages/CreateQuiz';
import Perfil from './pages/perfil';
import Suporte from './pages/Suporte';
import Termos from './pages/Termos';
import PinPage from './pages/PinPage';
import Correto from'./components/correto';
import Errado from'./components/errado';
import LoadHost from './pages/LoadHost';
import { ProtectedRoute } from './components';
import './assets/font/imports.css';

function ScrollToHashElement() {
    const location = useLocation();
    
    useEffect(() => {
        if (location.hash) {
            const elementId = location.hash.substring(1);
            
            const element = document.getElementById(elementId);
            
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        } else {
            window.scrollTo(0, 0);
        }
    }, [location]);
    
    return null;
}

export default function App() {
    return (
        <Router>
            <ScrollToHashElement />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/contato" element={<Contato />} />
                <Route path="/SkillHelp" element={<Contato />} />
                <Route path="/game" element={<ProtectedRoute><Game /></ProtectedRoute>} />
                <Route path="/perfil" element={<ProtectedRoute><Perfil /></ProtectedRoute>} />
                <Route path="/suporte" element={<Suporte />} />
                <Route path="/termos" element={<Termos />} />
                <Route path="/home" element={<Home />} />
                <Route path="/Correto" element={<ProtectedRoute><Correto /></ProtectedRoute>} /> 
                <Route path="/Errado" element={<ProtectedRoute><Errado /></ProtectedRoute>} />
                <Route path="/LoadHost" element={<ProtectedRoute><LoadHost /></ProtectedRoute>} />
                <Route path="/ajuda" element={<Suporte />} />
                <Route path="/pin" element={<ProtectedRoute><PinPage /></ProtectedRoute>} />
                <Route path="/create-quiz" element={<ProtectedRoute><CreateQuiz /></ProtectedRoute>} />
            </Routes>
        </Router>
    );
}
