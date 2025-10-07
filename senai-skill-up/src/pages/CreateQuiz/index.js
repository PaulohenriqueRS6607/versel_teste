import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import Header from '../../components/header';
import { createTema, createPergunta } from '../../services/quizService';
import { getCurrentUser } from '../../services/authService';

import verifiedIcon from '../../assets/images/verified 1.png';
import cancelIcon from '../../assets/images/cancel 1.png';

function RespostaInput({ value, onChange, isCorrect, isFalse, onSelectCorrect, onSelectFalse }) {
  return (
    <div className="answer-item">
      <input
        className="answer-input"
        type="text"
        placeholder="INSERIR RESPOSTA"
        value={value}
        onChange={onChange}
      />
      <span className={`icon correct${isCorrect ? ' selected' : ''}`} onClick={onSelectCorrect}>
        <img src={verifiedIcon} alt="Correta" />
      </span>
      <span className={`icon wrong${isFalse ? ' selected' : ''}`} onClick={onSelectFalse}>
        <img src={cancelIcon} alt="Falsa" />
      </span>
    </div>
  );
}

function MiniCard({ selected, onClick, index, pergunta }) {
  return (
    <div className={`question-thumb${selected ? ' selected' : ''}`} onClick={onClick}>
      <div className="mini-question-header">
        <span className="mini-question-number">Pergunta {index + 1}</span>
      </div>
      
      <div className="mini-question-content">
        <div className="mini-question-text">
          {pergunta.pergunta || "Pergunta sem texto"}
        </div>
        
        <div className="mini-answers">
          {pergunta.respostas.map((resposta, idx) => (
            <div 
              key={idx} 
              className={`mini-answer ${
                resposta.correta ? 'correct' : 
                resposta.falsa ? 'incorrect' : 
                'neutral'
              }`}
            >
              <span className="mini-answer-text">
                {resposta.texto || `Resposta ${idx + 1}`}
              </span>
              {resposta.correta && <span className="mini-answer-indicator correct">✓</span>}
              {resposta.falsa && <span className="mini-answer-indicator incorrect">✗</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CreateQuiz() {
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState('');
  const [materia, setMateria] = useState('');
  const [descricao, setDescricao] = useState('');
  const [loading, setLoading] = useState(false);
  const [perguntas, setPerguntas] = useState([
    {
      pergunta: '',
      respostas: [
        { texto: '', correta: false, falsa: false },
        { texto: '', correta: false, falsa: false },
        { texto: '', correta: false, falsa: false },
        { texto: '', correta: false, falsa: false },
      ],
    },
  ]);
  const [perguntaAtual, setPerguntaAtual] = useState(0);

  const handlePerguntaChange = (value) => {
    const novas = [...perguntas];
    novas[perguntaAtual].pergunta = value;
    setPerguntas(novas);
  };

  const handleRespostaChange = (rIdx, value) => {
    const novas = [...perguntas];
    novas[perguntaAtual].respostas[rIdx].texto = value;
    setPerguntas(novas);
  };

  const handleSelectResposta = (rIdx, tipo) => {
    const novas = [...perguntas];
    novas[perguntaAtual].respostas = novas[perguntaAtual].respostas.map((r, idx) => {
      if (idx === rIdx) {
        return {
          ...r,
          correta: tipo === 'correta',
          falsa: tipo === 'falsa',
        };
      }
      return { ...r, correta: false, falsa: false };
    });
    setPerguntas(novas);
  };

  const handleAddPergunta = () => {
    setPerguntas([
      ...perguntas,
      {
        pergunta: '',
        respostas: [
          { texto: '', correta: false, falsa: false },
          { texto: '', correta: false, falsa: false },
          { texto: '', correta: false, falsa: false },
          { texto: '', correta: false, falsa: false },
        ],
      },
    ]);
    setPerguntaAtual(perguntas.length);
  };

  const handleSelectPergunta = (idx) => {
    setPerguntaAtual(idx);
  };

  const validateQuiz = () => {
    // Validação básica
    if (!titulo.trim()) {
      alert('Por favor, adicione um título para o quiz.');
      return false;
    }
    
    if (!materia.trim()) {
      alert('Por favor, adicione uma matéria para o quiz.');
      return false;
    }

    if (!descricao.trim()) {
      alert('Por favor, adicione uma descrição para o quiz.');
      return false;
    }

    // Validar perguntas
    for (let i = 0; i < perguntas.length; i++) {
      const pergunta = perguntas[i];
      
      if (!pergunta.pergunta.trim()) {
        alert(`Por favor, adicione texto para a pergunta ${i + 1}.`);
        return false;
      }

      // Verificar se tem pelo menos uma resposta correta
      const hasCorrectAnswer = pergunta.respostas.some(r => r.correta);
      if (!hasCorrectAnswer) {
        alert(`Por favor, marque pelo menos uma resposta correta para a pergunta ${i + 1}.`);
        return false;
      }

      // Verificar se todas as respostas têm texto
      for (let j = 0; j < pergunta.respostas.length; j++) {
        if (!pergunta.respostas[j].texto.trim()) {
          alert(`Por favor, adicione texto para todas as respostas da pergunta ${i + 1}.`);
          return false;
        }
      }
    }

    return true;
  };

  const handleFinalizarQuiz = async () => {
    if (!validateQuiz()) {
      return;
    }

    try {
      setLoading(true);
      
      // Obter usuário atual
      const currentUser = getCurrentUser();
      if (!currentUser) {
        alert('Você precisa estar logado para criar um quiz.');
        navigate('/login');
        return;
      }

      // 1. Criar ou encontrar tema
      let temaId;
      try {
        const temaData = {
          nome: materia,
          descricao: `Tema: ${materia}`,
          cor: '#007bff'
        };
        const temaResponse = await createTema(temaData);
        temaId = temaResponse.data.id;
      } catch (error) {
        console.log('Tema já existe ou erro ao criar, usando matéria como ID');
        temaId = materia.toLowerCase().replace(/\s+/g, '_');
      }

      // 2. Criar perguntas
      const perguntasCriadas = [];
      for (const pergunta of perguntas) {
        const alternativas = pergunta.respostas.map((resposta, index) => ({
          id: `alt${index + 1}`,
          texto: resposta.texto,
          correta: resposta.correta
        }));

        const perguntaData = {
          temaId: temaId,
          titulo: pergunta.pergunta,
          alternativas: alternativas
        };

        try {
          const perguntaResponse = await createPergunta(perguntaData);
          perguntasCriadas.push(perguntaResponse.data);
        } catch (error) {
          console.error('Erro ao criar pergunta:', error);
        }
      }

      console.log('Quiz criado com sucesso!', {
        titulo,
        materia,
        descricao,
        temaId,
        perguntasCriadas: perguntasCriadas.length
      });

      alert(`Questionário "${titulo}" criado com sucesso!\n${perguntasCriadas.length} perguntas adicionadas.`);
      
      // Resetar formulário
      setTitulo('');
      setMateria('');
      setDescricao('');
      setPerguntas([
        {
          pergunta: '',
          respostas: [
            { texto: '', correta: false, falsa: false },
            { texto: '', correta: false, falsa: false },
            { texto: '', correta: false, falsa: false },
            { texto: '', correta: false, falsa: false },
          ],
        },
      ]);
      setPerguntaAtual(0);

      // Redirecionar para a página de quiz
      navigate('/game');

    } catch (error) {
      console.error('Erro ao criar quiz:', error);
      alert('Erro ao criar questionário. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="quiz-container">
        <div className="sidebar-left">
          <input
            type="text"
            placeholder="TITULO..."
            className="quiz-title"
            value={titulo}
            onChange={e => setTitulo(e.target.value)}
          />
          <input
            type="text"
            placeholder="Matéria "
            className="quiz-materia"
            value={materia}
            onChange={e => setMateria(e.target.value)}
          />
          <textarea
            placeholder="INSERIR DESCRICAO"
            className="quiz-description"
            value={descricao}
            onChange={e => setDescricao(e.target.value)}
          />
        </div>
        <div className="main-content">
          <div className="question-card" style={{ position: 'relative' }}>
            <input
              className="question-h2-input"
              type="text"
              value={perguntas[perguntaAtual].pergunta}
              onChange={e => handlePerguntaChange(e.target.value)}
              placeholder="INSERIR PERGUNTA"
              spellCheck={false}
              autoComplete="off"
            />
            <div className="answers-list">
              {perguntas[perguntaAtual].respostas.map((resposta, idx) => (
                <RespostaInput
                  key={idx}
                  value={resposta.texto}
                  onChange={e => handleRespostaChange(idx, e.target.value)}
                  isCorrect={resposta.correta}
                  isFalse={resposta.falsa}
                  onSelectCorrect={() => handleSelectResposta(idx, 'correta')}
                  onSelectFalse={() => handleSelectResposta(idx, 'falsa')}
                />
              ))}
              <button 
                className="finalize-quiz-btn" 
                onClick={handleFinalizarQuiz}
                disabled={loading}
              >
                {loading ? 'Criando Quiz...' : 'Finalizar Questionário'}
              </button>
            </div>
          </div>
        </div>
        <div className="sidebar-right">
          {perguntas.map((pergunta, idx) => (
            <MiniCard
              key={idx}
              selected={perguntaAtual === idx}
              onClick={() => handleSelectPergunta(idx)}
              index={idx}
              pergunta={pergunta}
            />
          ))}
          <div className="add-question" onClick={handleAddPergunta}>+</div>
        </div>
      </div>
    </>
  );
}
