document.addEventListener('DOMContentLoaded', () => {
  // 1. Efecto de luciérnagas
  const glowContainer = document.getElementById('glow-container');
  function createFirefly() {
    if (!glowContainer) return;
    const firefly = document.createElement('div');
    firefly.classList.add('firefly');
    const size = Math.random() * 3 + 2;
    firefly.style.width = `${size}px`;
    firefly.style.height = `${size}px`;
    firefly.style.left = `${Math.random() * 100}vw`;

    const isYellow = Math.random() > 0.45;
    const color = isYellow ? '#ffd32a' : '#64ffda';
    firefly.style.backgroundColor = color;
    firefly.style.boxShadow = `0 0 ${size * 2.5}px ${color}`;

    const duration = Math.random() * 6 + 7;
    firefly.style.animationDuration = `${duration}s`;
    glowContainer.appendChild(firefly);

    setTimeout(() => firefly.remove(), duration * 1000);
  }
  setInterval(createFirefly, 400);

  // 2. Configuración de preguntas y opciones
  const roundsData = [
    {
      round: 1,
      name: 'Ronda 1: Cine',
      desc: 'Película pendiente (6 opciones)',
      category: 'CINE & PALOMITAS 🎬',
      question: '¿Cuál es la película que tenemos pendiente de ver?',
      correct: 'Spider-Man',
      options: [
        'Spider-Man',
        'Harry Potter',
        'John Wick',
        'Shrek',
        'Interstellar',
        'Batman'
      ]
    },
    {
      round: 2,
      name: 'Ronda 2: Frases',
      desc: 'Frase favorita (8 opciones)',
      category: 'PALABRAS & LENGUAJES 💬',
      question: '¿Cuál es mi frase favorita para ti?',
      correct: 'Tuktan mairin nais',
      options: [
        'Tuktan mairin nais',                 // Miskito
        'Tudo bem com você',                  // Portugués
        'Você é incrível',                    // Portugués
        'C’est la vie',                       // Francés
        'La vie est belle',                   // Francés
        'Always by your side',                // Inglés
        'Better together',                    // Inglés
        'Saudades de você'                    // Portugués
      ]
    },
    {
      round: 3,
      name: 'Ronda 3: El Momento',
      desc: 'Fecha del primer beso (10 opciones)',
      category: 'CALENDARIO & RECUERDOS 🗓️',
      question: '¿Cuál fue la fecha exacta de nuestro primer beso?',
      correct: '18/05/2026',
      options: [
        '04/05/2026',
        '08/05/2026',
        '12/05/2026',
        '15/05/2026',
        '18/05/2026',
        '20/05/2026',
        '22/05/2026',
        '25/05/2026',
        '28/05/2026',
        '31/05/2026'
      ]
    }
  ];

  let currentRoundIndex = 0;
  let isAnswerLocked = false;

  const roundIndicator = document.getElementById('round-indicator');
  const questionCategory = document.getElementById('question-category');
  const questionText = document.getElementById('question-text');
  const optionsContainer = document.getElementById('options-container');
  const feedbackMsg = document.getElementById('feedback-msg');

  const roundAlert = document.getElementById('round-alert');
  const alertBadge = document.getElementById('alert-badge');
  const alertTitle = document.getElementById('alert-title');
  const alertDesc = document.getElementById('alert-desc');
  const victoryModal = document.getElementById('victory-modal');

  function updateRoundsStepper() {
    for (let i = 1; i <= 3; i++) {
      const stepEl = document.getElementById(`step-${i}`);
      const iconEl = stepEl.querySelector('.step-icon');
      stepEl.classList.remove('active', 'cleared');

      if (i - 1 < currentRoundIndex) {
        stepEl.classList.add('cleared');
        iconEl.textContent = '⭐';
      } else if (i - 1 === currentRoundIndex) {
        stepEl.classList.add('active');
      }
    }
  }

  function showRoundAnnouncement(roundData) {
    return new Promise((resolve) => {
      alertBadge.textContent = `RONDA ${roundData.round} DE 3`;
      alertTitle.textContent = roundData.name;
      alertDesc.textContent = roundData.desc;

      roundAlert.classList.remove('hidden');
      setTimeout(() => {
        roundAlert.classList.add('hidden');
        resolve();
      }, 1500);
    });
  }

  async function loadRound(index) {
    currentRoundIndex = index;
    isAnswerLocked = false;
    updateRoundsStepper();

    const data = roundsData[currentRoundIndex];
    await showRoundAnnouncement(data);

    roundIndicator.textContent = `${data.round}/3`;
    questionCategory.textContent = data.category;
    questionText.textContent = data.question;
    feedbackMsg.textContent = '';

    optionsContainer.innerHTML = '';
    optionsContainer.className = 'options-container grid-cols-2';

    // Barajar opciones para que no siempre aparezca en la misma posición
    const shuffledOptions = [...data.options].sort(() => Math.random() - 0.5);

    shuffledOptions.forEach((optionText) => {
      const btn = document.createElement('button');
      btn.classList.add('option-btn');
      btn.textContent = optionText;
      btn.addEventListener('click', () => handleOptionSelection(btn, optionText, data.correct));
      optionsContainer.appendChild(btn);
    });
  }

  function handleOptionSelection(button, selectedText, correctText) {
    if (isAnswerLocked) return;

    if (selectedText === correctText) {
      isAnswerLocked = true;
      button.classList.add('correct');
      feedbackMsg.textContent = '✨ ¡Exacto! Lo recordaste a la perfección.';
      feedbackMsg.style.color = '#2ecc71';

      // Deshabilitar el resto
      const allButtons = optionsContainer.querySelectorAll('.option-btn');
      allButtons.forEach(b => b.disabled = true);

      setTimeout(() => {
        if (currentRoundIndex + 1 < roundsData.length) {
          loadRound(currentRoundIndex + 1);
        } else {
          currentRoundIndex++;
          updateRoundsStepper();
          handleVictory();
        }
      }, 1300);
    } else {
      button.classList.add('incorrect');
      feedbackMsg.textContent = '🤔 Casi, pero no es esa. ¡Vuelve a intentarlo!';
      feedbackMsg.style.color = '#ff7675';

      setTimeout(() => {
        button.classList.remove('incorrect');
      }, 500);
    }
  }

  function handleVictory() {
    // Guarda el progreso en localStorage para el minimapa
    localStorage.setItem('juego_3_completado', 'true');

    setTimeout(() => {
      victoryModal.classList.remove('hidden');
    }, 700);
  }

  // Iniciar en la primera ronda
  loadRound(0);
});