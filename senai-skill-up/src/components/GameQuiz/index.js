import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../header';
import './style.css';

// Mock quiz data
const mockQuiz = {
  id: 'mock-quiz-123',
  tema: 'Conhecimentos Gerais',
  perguntas: [
    {
      id: 1,
      texto: 'Qual é a capital do Brasil?',
      alternativas: [
        { id: 1, texto: 'Rio de Janeiro', correta: false },
        { id: 2, texto: 'São Paulo', correta: false },
        { id: 3, texto: 'Brasília', correta: true },
        { id: 4, texto: 'Belo Horizonte', correta: false },
      ]
    },
    {
      id: 2,
      texto: 'Quem pintou a Mona Lisa?',
      alternativas: [
        { id: 1, texto: 'Vincent van Gogh', correta: false },
        { id: 2, texto: 'Pablo Picasso', correta: false },
        { id: 3, texto: 'Leonardo da Vinci', correta: true },
        { id: 4, texto: 'Michelangelo', correta: false },
      ]
    },
    {
      id: 3,
      texto: 'Qual é o maior planeta do sistema solar?',
      alternativas: [
        { id: 1, texto: 'Terra', correta: false },
        { id: 2, texto: 'Júpiter', correta: true },
        { id: 3, texto: 'Saturno', correta: false },
        { id: 4, texto: 'Marte', correta: false },
      ]
    }
  ]
};

export default function GameQuiz() {
  const navigate = useNavigate();
  const location = useLocation();
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutos para mock
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quizId, setQuizId] = useState(null);
  const [error, setError] = useState(null);

  // Timer
  useEffect(() => {
    const timer = timeLeft > 0 && setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Carregar pergunta inicial
  useEffect(() => {
    const iniciarQuiz = () => {
      try {
        setLoading(true);
        setError(null);
        
        // Usar dados mockados
        setQuizId(mockQuiz.id);
        loadQuestion(0);
        
        setLoading(false);
      } catch (err) {
        console.error('Erro ao carregar quiz:', err);
        setError('Erro ao carregar o quiz');
        setLoading(false);
      }
    };

    iniciarQuiz();
  }, []);
  
  const loadQuestion = (index) => {
    if (index >= 0 && index < mockQuiz.perguntas.length) {
      setCurrentQuestion({
        ...mockQuiz.perguntas[index],
        tema: mockQuiz.tema,
        totalPerguntas: mockQuiz.perguntas.length,
        numeroPergunta: index + 1
      });
      setCurrentQuestionIndex(index);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  // Bloquear scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Finalizar quiz quando o tempo acabar
  useEffect(() => {
    if (timeLeft === 0) {
      alert(`Tempo esgotado!\nVocê acertou ${score} de ${mockQuiz.perguntas.length} perguntas.`);
      navigate('/game');
    }
  }, [timeLeft, score]);

  const handleAnswerSelect = (alternativa) => {
    if (selectedAnswer !== null) return; // Prevenir múltiplos cliques
    
    try {
      setSelectedAnswer(alternativa.id);
      
      // Verificar se a resposta está correta
      const respostaCorreta = alternativa.correta;
      
      if (respostaCorreta) {
        setScore(prevScore => prevScore + 1);
      }
      
      setShowResult(true);
      setIsCorrect(respostaCorreta);
    } catch (error) {
      console.error('Erro ao processar resposta:', error);
    }
  };

  const handleExit = () => {
    setShowExitModal(true);
  };

  const closeExitModal = () => setShowExitModal(false);

  const confirmExit = () => {
    // No need to call the service since we're using mock data
    navigate('/game');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Renderizar estado de loading
  if (loading) {
    return (
      <div className="game-quiz-container">
        <div className="quiz-wrapper">
          <div className="quiz-paper-container">
            <div className="loading-message">Carregando...</div>
          </div>
        </div>
      </div>
    );
  }

  // Renderizar estado de erro
  if (error) {
    return (
      <div className="game-quiz-container">
        <div className="quiz-wrapper">
          <div className="quiz-paper-container">
            <div className="empty-state">
              <div className="empty-title">{error}</div>
              <div className="empty-desc">Verifique o tema selecionado ou tente novamente mais tarde.</div>
              <div className="empty-actions">
                <button className="next-btn" onClick={() => navigate('/game')}>VOLTAR</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Renderizar estado vazio (sem dados)
  if (!currentQuestion) {
    return (
      <div className="game-quiz-container">
        <div className="quiz-wrapper">
          <div className="quiz-paper-container">
            <div className="empty-state">
              <div className="empty-title">Quiz não encontrado</div>
              <div className="empty-desc">Não conseguimos carregar as perguntas deste quiz.</div>
              <div className="empty-actions">
                <button className="next-btn" onClick={() => navigate('/game')}>VOLTAR</button>
              </div>
            </div>
          </div>
          <div className="quiz-controls">
            <div className="timer">
              <span className="timer-text">{formatTime(timeLeft)}</span>
            </div>
            <button className="exit-btn" onClick={handleExit}>SAIR</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="game-quiz-container">
      <div className="quiz-wrapper">
        <div className="quiz-paper-container">
          <div className="question-theme">{currentQuestion.tema || '-'}</div>
          <div className="question-text">{currentQuestion.pergunta || 'Nenhuma pergunta disponível'}</div>
          <div className="alternatives-container">
            {currentQuestion.alternativas && currentQuestion.alternativas.length > 0 ? (
              currentQuestion.alternativas.map((alternativa) => (
                <button
                  key={alternativa.id}
                  className={`alternative-btn ${
                    selectedAnswer === alternativa.id
                      ? (alternativa.correta ? 'correct' : 'incorrect')
                      : ''
                  } ${showResult && alternativa.correta ? 'show-correct' : ''}`}
                  onClick={() => handleAnswerSelect(alternativa)}
                  disabled={showResult}
                >
                  {alternativa.texto || '-'}
                </button>
              ))
            ) : (
              <>
                <button className="alternative-btn" disabled>-</button>
                <button className="alternative-btn" disabled>-</button>
                <button className="alternative-btn" disabled>-</button>
                <button className="alternative-btn" disabled>-</button>
              </>
            )}
          </div>
          {showResult && (
            <div className="result-section">
              <div className={`result-message ${isCorrect ? 'correct' : 'incorrect'}`}>
                {isCorrect ? '✅ RESPOSTA CORRETA!' : '❌ RESPOSTA INCORRETA!'}
              </div>
              <button 
                className="next-btn" 
                onClick={() => {
                  if (currentQuestionIndex < mockQuiz.perguntas.length - 1) {
                    loadQuestion(currentQuestionIndex + 1);
                  } else {
                    // End of quiz
                    console.log('Fim do quiz! Pontuação:', score, 'de', mockQuiz.perguntas.length);
                    // You can add navigation to results page here
                    alert(`Quiz finalizado!\nVocê acertou ${score} de ${mockQuiz.perguntas.length} perguntas.`);
                    navigate('/game');
                  }
                }}
              >
                {currentQuestionIndex < mockQuiz.perguntas.length - 1 ? 'PRÓXIMA PERGUNTA' : 'VER RESULTADO'}
              </button>
            </div>
          )}
        </div>
        <div className="quiz-controls">
          <div className="timer">
            <span className="timer-text">{formatTime(timeLeft)}</span>
          </div>
          <button className="exit-btn" onClick={handleExit}>SAIR</button>
        </div>
      </div>
      {showExitModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <button className="modal-close" onClick={closeExitModal}>×</button>
            <div className="modal-title">Deseja Mesmo<br/>Sair Da Partida?</div>
            <button className="modal-exit-btn" onClick={confirmExit}>SAIR</button>
          </div>
        </div>
      )}
    </div>
  );
}