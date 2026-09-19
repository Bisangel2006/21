document.addEventListener('DOMContentLoaded', () => {
  // 1. Luciérnagas de fondo
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

  // 2. Configuración clara de las 3 Rondas
  const roundsConfig = [
    { 
      round: 1, 
      name: 'Ronda 1: Fácil', 
      desc: 'Secuencia corta de 3 tulipanes',
      sequenceLength: 3, 
      speed: 750 
    },
    { 
      round: 2, 
      name: 'Ronda 2: Media', 
      desc: 'Sube el ritmo con 4 tulipanes',
      sequenceLength: 4, 
      speed: 650 
    },
    { 
      round: 3, 
      name: 'Ronda 3: Memoria', 
      desc: 'El reto final: 6 tulipanes seguidos',
      sequenceLength: 6, 
      speed: 550 
    }
  ];

  let currentRoundIndex = 0;
  let currentSequence = [];
  let playerSequence = [];
  let isDisplayingSequence = false;

  const tulipButtons = document.querySelectorAll('.tulip-card');
  const startBtn = document.getElementById('start-btn');
  const turnBanner = document.getElementById('turn-banner');
  const turnIcon = document.getElementById('turn-icon');
  const turnText = document.getElementById('turn-text');
  const feedbackMsg = document.getElementById('feedback-msg');

  const roundAlert = document.getElementById('round-alert');
  const alertBadge = document.getElementById('alert-badge');
  const alertTitle = document.getElementById('alert-title');
  const alertDesc = document.getElementById('alert-desc');
  const victoryModal = document.getElementById('victory-modal');

  // Inicializar estado bloqueado
  setTulipsClickable(false);

  function setTulipsClickable(enabled) {
    tulipButtons.forEach(btn => {
      btn.disabled = !enabled;
    });
  }

  // Actualizar la interfaz de los pasos de las rondas (Stepper)
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

  // Anuncio estilo popup de entrada a la ronda
  function showRoundAnnouncement(config) {
    return new Promise((resolve) => {
      alertBadge.textContent = `RONDA ${config.round} DE 3`;
      alertTitle.textContent = config.name;
      alertDesc.textContent = config.desc;

      roundAlert.classList.remove('hidden');
      setTimeout(() => {
        roundAlert.classList.add('hidden');
        resolve();
      }, 1500);
    });
  }

  // Iluminar un tulipán
  function lightUpTulip(index, duration = 400) {
    return new Promise((resolve) => {
      const tulip = tulipButtons[index];
      tulip.classList.add('lit');
      setTimeout(() => {
        tulip.classList.remove('lit');
        setTimeout(resolve, 150);
      }, duration);
    });
  }

  // Generar secuencia
  function generateSequence(length) {
    const seq = [];
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * tulipButtons.length);
      seq.push(randomIndex);
    }
    return seq;
  }

  // Reproducir la secuencia para que la memorice
  async function playSequence() {
    isDisplayingSequence = true;
    setTulipsClickable(false);
    startBtn.disabled = true;

    // Cambiar estado a "Observando"
    turnBanner.className = 'turn-banner memorize';
    turnIcon.textContent = '👀';
    turnText.textContent = `MEMORIZA: Observa el orden de los ${currentSequence.length} tulipanes...`;
    feedbackMsg.textContent = '';

    const currentConfig = roundsConfig[currentRoundIndex];
    await new Promise(r => setTimeout(r, 600));

    for (const index of currentSequence) {
      await lightUpTulip(index, currentConfig.speed);
    }

    // Cambiar estado a "Turno de la jugadora"
    isDisplayingSequence = false;
    playerSequence = [];
    setTulipsClickable(true);

    turnBanner.className = 'turn-banner player';
    turnIcon.textContent = '💧';
    updatePlayerTurnProgress();
  }

  // Mostrar el avance de los clics que va haciendo
  function updatePlayerTurnProgress() {
    const current = playerSequence.length;
    const total = currentSequence.length;
    turnText.textContent = `¡TU TURNO! Riega los tulipanes en orden (Llevas ${current}/${total})`;
  }

  // Iniciar la ronda
  async function startCurrentRound() {
    updateRoundsStepper();
    const config = roundsConfig[currentRoundIndex];

    await showRoundAnnouncement(config);

    currentSequence = generateSequence(config.sequenceLength);
    playSequence();
  }

  // Clics en los tulipanes
  tulipButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (isDisplayingSequence) return;

      const clickedIndex = parseInt(btn.getAttribute('data-index'), 10);
      playerSequence.push(clickedIndex);

      btn.classList.add('lit');
      setTimeout(() => btn.classList.remove('lit'), 220);

      const currentStep = playerSequence.length - 1;

      // Si falla
      if (playerSequence[currentStep] !== currentSequence[currentStep]) {
        btn.classList.add('error');
        setTimeout(() => btn.classList.remove('error'), 500);

        setTulipsClickable(false);
        turnBanner.className = 'turn-banner waiting';
        turnIcon.textContent = '🥀';
        turnText.textContent = '¡Ese no era el orden! Toca intentarlo de nuevo.';

        feedbackMsg.textContent = 'Tranquila, memorízalo con calma y dale al botón:';
        feedbackMsg.style.color = '#ff7675';

        startBtn.textContent = `Reintentar Ronda ${roundsConfig[currentRoundIndex].round} 🔄`;
        startBtn.disabled = false;
        return;
      }

      // Si acertó el clic
      updatePlayerTurnProgress();

      // Completó la ronda actual
      if (playerSequence.length === currentSequence.length) {
        setTulipsClickable(false);
        turnBanner.className = 'turn-banner player';
        turnIcon.textContent = '✨';
        turnText.textContent = `¡Ronda ${roundsConfig[currentRoundIndex].round} superada con éxito!`;

        currentRoundIndex++;
        updateRoundsStepper();

        if (currentRoundIndex < roundsConfig.length) {
          feedbackMsg.textContent = '¡Excelente memoria! Preparando la siguiente ronda...';
          feedbackMsg.style.color = '#55efc4';
          setTimeout(() => {
            feedbackMsg.textContent = '';
            startCurrentRound();
          }, 1500);
        } else {
          // Ganó el juego entero
          handleGameVictory();
        }
      }
    });
  });

  // Victoria final
  function handleGameVictory() {
    turnBanner.className = 'turn-banner player';
    turnIcon.textContent = '🎉';
    turnText.textContent = '¡Completaste todas las rondas!';

    // Guarda el progreso en localStorage para el minimapa
    localStorage.setItem('juego_1_completado', 'true');

    setTimeout(() => {
      victoryModal.classList.remove('hidden');
    }, 900);
  }

  // Listener botón de inicio
  startBtn.addEventListener('click', () => {
    startCurrentRound();
  });
});