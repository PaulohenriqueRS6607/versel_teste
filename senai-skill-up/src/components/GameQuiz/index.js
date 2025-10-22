import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Correto from '../correto';
import Errado from '../errado';
import './style.css';

// Mock data
const mockQuizzes = {
  1: {
    id: 'quiz-1',
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
  },
  2: {
    id: 'quiz-2',
    tema: 'Tecnologia',
    perguntas: [
      {
        id: 4,
        texto: 'Qual linguagem é usada para desenvolvimento web front-end?',
        alternativas: [
          { id: 1, texto: 'Python', correta: false },
          { id: 2, texto: 'JavaScript', correta: true },
          { id: 3, texto: 'Java', correta: false },
          { id: 4, texto: 'C++', correta: false },
        ]
      },
      {
        id: 5,
        texto: 'O que significa HTML?',
        alternativas: [
          { id: 1, texto: 'HyperText Markup Language', correta: true },
          { id: 2, texto: 'High Tech Modern Language', correta: false },
          { id: 3, texto: 'Home Tool Markup Language', correta: false },
          { id: 4, texto: 'Hyperlink and Text Markup Language', correta: false },
        ]
      }
    ]
  }
};

const mockGameQuizService = {
  iniciarQuiz: async (temaId) => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simular delay
    const quiz = mockQuizzes[temaId];
    if (!quiz) throw new Error('Quiz não encontrado');
    
    return {
      id: quiz.id,
      perguntaAtual: {
        ...quiz.perguntas[0],
        tema: quiz.tema,
        totalPerguntas: quiz.perguntas.length,
        numeroPergunta: 1
      }
    };
  },

  getPerguntaAtual: async (quizId) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const quiz = Object.values(mockQuizzes).find(q => q.id === quizId);
    if (!quiz) throw new Error('Quiz não encontrado');
    
    return {
      ...quiz.perguntas[0],
      tema: quiz.tema,
      totalPerguntas: quiz.perguntas.length,
      numeroPergunta: 1
    };
  },

  submeterResposta: async (quizId, perguntaId, alternativaId) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const quiz = Object.values(mockQuizzes).find(q => q.id === quizId);
    if (!quiz) throw new Error('Quiz não encontrado');
    
    const perguntaAtualIndex = quiz.perguntas.findIndex(p => p.id === perguntaId);
    const proximoIndex = perguntaAtualIndex + 1;
    
    if (proximoIndex < quiz.perguntas.length) {
      return {
        proximaPergunta: {
          ...quiz.perguntas[proximoIndex],
          tema: quiz.tema,
          totalPerguntas: quiz.perguntas.length,
          numeroPergunta: proximoIndex + 1
        }
      };
    } else {
      return { proximaPergunta: null };
    }
  },

  finalizarQuiz: async (quizId) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
      quizId,
      pontuacao: Math.floor(Math.random() * 3) + 1,
      totalPerguntas: 3,
      tempoGasto: '2:30'
    };
  },

  abandonarQuiz: async (quizId) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return { success: true };
  }
};

export default function GameQuiz() {
  const navigate = useNavigate();
  const location = useLocation();
  const [timeLeft, setTimeLeft] = useState(90); // 1 minuto e 30 segundos
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quizId, setQuizId] = useState(null);
  const [error, setError] = useState(null);
  const [showResultScreen, setShowResultScreen] = useState(false);
  

  // Carregar pergunta inicial
  useEffect(() => {
    const iniciarQuiz = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Pegar temaId da navegação (se vier de outra página) ou usar padrão
        const temaId = location.state?.temaId || 1; // Usar tema 1 como padrão
        
        if (!temaId && !location.state?.quizId) {
          setError('Quiz não encontrado');
          setLoading(false);
          return;
        }
        
        if (temaId) {
          // Iniciar novo quiz
          const quizData = await mockGameQuizService.iniciarQuiz(temaId);
          setQuizId(quizData.id);
          setCurrentQuestion(quizData.perguntaAtual);
        } else if (location.state?.quizId) {
          // Continuar quiz existente
          const quizIdExistente = location.state.quizId;
          setQuizId(quizIdExistente);
          const pergunta = await mockGameQuizService.getPerguntaAtual(quizIdExistente);
          setCurrentQuestion(pergunta);
        }
      } catch (err) {
        console.error('Erro ao carregar quiz:', err);
        setError('Erro ao conectar com backend');
      } finally {
        setLoading(false);
      }
    };

    iniciarQuiz();
  }, [location.state]);

  // Timer
  useEffect(() => {
    if (timeLeft > 0 && currentQuestion && !loading) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            // Finalizar o questionário quando o tempo acabar
            if (quizId) {
              mockGameQuizService.finalizarQuiz(quizId);
              setShowResultScreen(true);
              setShowResult(true);
              setIsCorrect(false); // Considera como resposta errada por tempo esgotado
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      // Tempo esgotado
      alert('Tempo esgotado! O quiz será finalizado.');
      navigate('/game');
    }
  }, [timeLeft, currentQuestion, loading, navigate]);

  // Bloquear scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleAnswerSelect = (alternativa) => {
    if (showResult || !quizId || !currentQuestion || showResultScreen) return;
    
    setSelectedAnswer(alternativa.id);
    setIsCorrect(alternativa.correta);
    setShowResultScreen(true);
  };

  // Effect para controlar o timer de resultado
  useEffect(() => {
    if (showResultScreen) {
      console.log('Timer iniciado para resultado');
      const timer = setTimeout(() => {
        console.log('Timer finalizado, avançando pergunta');
        setShowResultScreen(false);
        handleNextQuestion();
      }, 4000);
      
      return () => {
        console.log('Timer cancelado');
        clearTimeout(timer);
      };
    }
  }, [showResultScreen]);

  const handleNextQuestion = async () => {
    try {
      console.log('handleNextQuestion chamada', { quizId, currentQuestion: currentQuestion?.id, selectedAnswer });
      if (!quizId || !currentQuestion || !selectedAnswer) {
        console.log('Condições não atendidas para avançar pergunta');
        return;
      }
      
      // Submeter resposta e obter próxima pergunta
      const response = await mockGameQuizService.submeterResposta(
        quizId,
        currentQuestion.id,
        selectedAnswer
      );

      console.log('Resposta do service:', response);

      if (response.proximaPergunta) {
        console.log('Carregando próxima pergunta:', response.proximaPergunta);
        // Resetar estado e carregar próxima pergunta
        setCurrentQuestion(response.proximaPergunta);
        setSelectedAnswer(null);
        setShowResult(false);
        setIsCorrect(false);
        setShowResultScreen(false);
      } else {
        console.log('Quiz finalizado, indo para resultados');
        // Quiz finalizado, ir para tela de resultados
        const resultados = await mockGameQuizService.finalizarQuiz(quizId);
        navigate('/fim', { state: resultados });
      }
    } catch (err) {
      console.error('Erro ao avançar pergunta:', err);
      setError('Erro ao carregar próxima pergunta');
    }
  };

  const handleExit = () => {
    setShowExitModal(true);
  };

  const closeExitModal = () => setShowExitModal(false);

  const confirmExit = async () => {
    if (quizId) {
      try {
        await mockGameQuizService.abandonarQuiz(quizId);
      } catch (err) {
        console.error('Erro ao abandonar quiz:', err);
      }
    }
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

  // Renderizar tela de resultado (correto/errado)
  if (showResultScreen) {
    return isCorrect ? <Correto /> : <Errado />;
  }

  return (
    <div className="game-quiz-container">
      <div className="quiz-wrapper">
        <div className="quiz-paper-container">
          <div className="question-theme">{currentQuestion.tema || '-'}</div>
          <div className="question-text">{currentQuestion.texto || 'Nenhuma pergunta disponível'}</div>
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
              </>
            )}
          </div>
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