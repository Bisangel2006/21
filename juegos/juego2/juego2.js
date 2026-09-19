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

  // 2. Banco de 10 momentos temáticos (solo iconos)
  const allMoments = [
    { id: 1, icon: '☕' },
    { id: 2, icon: '🍕' },
    { id: 3, icon: '🎧' },
    { id: 4, icon: '🌙' },
    { id: 5, icon: '🎬' },
    { id: 6, icon: '📍' },
    { id: 7, icon: '🍦' },
    { id: 8, icon: '✨' },
    { id: 9, icon: '🚗' },
    { id: 10, icon: '📱' }
  ];

  // 3. Configuración de dificultad: 6, 8 y 10 pares
  const roundsConfig = [
    { 
      round: 1, 
      name: 'Ronda 1: Fácil', 
      desc: 'Encuentra 6 parejas (12 cartas)', 
      pairs: 6, 
      gridClass: 'grid-ronda-1' 
    },
    { 
      round: 2, 
      name: 'Ronda 2: Media', 
      desc: 'Encuentra 8 parejas (16 cartas)', 
      pairs: 8, 
      gridClass: 'grid-ronda-2' 
    },
    { 
      round: 3, 
      name: 'Ronda 3: Reto de Memoria', 
      desc: 'El baúl completo: 10 parejas (20 cartas)', 
      pairs: 10, 
      gridClass: 'grid-ronda-3' 
    }
  ];

  let currentRoundIndex = 0;
  let flippedCards = [];
  let matchedPairs = 0;
  let lockBoard = false;

  const grid = document.getElementById('memory-grid');
  const pairsCounter = document.getElementById('pairs-count');
  const turnText = document.getElementById('turn-text');
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

  async function startRound(index) {
    currentRoundIndex = index;
    updateRoundsStepper();

    const config = roundsConfig[currentRoundIndex];
    await showRoundAnnouncement(config);

    matchedPairs = 0;
    flippedCards = [];
    lockBoard = false;
    pairsCounter.textContent = `0/${config.pairs}`;
    turnText.textContent = `Encuentra las ${config.pairs} parejas`;

    const selected = allMoments.slice(0, config.pairs);
    let deck = [...selected, ...selected];
    deck.sort(() => Math.random() - 0.5);

    grid.className = `memory-grid ${config.gridClass}`;
    grid.innerHTML = '';

    deck.forEach(item => {
      const card = document.createElement('div');
      card.classList.add('card-item');
      card.dataset.id = item.id;

      card.innerHTML = `
        <div class="card-face card-back">
          <span class="card-back-icon">❓</span>
        </div>
        <div class="card-face card-front">
          <span class="memory-icon">${item.icon}</span>
        </div>
      `;

      card.addEventListener('click', () => onCardClicked(card));
      grid.appendChild(card);
    });
  }

  function onCardClicked(card) {
    if (lockBoard) return;
    if (card === flippedCards[0]) return;
    if (card.classList.contains('matched')) return;

    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      checkForMatch();
    }
  }

  function checkForMatch() {
    lockBoard = true;
    const [card1, card2] = flippedCards;
    const isMatch = card1.dataset.id === card2.dataset.id;
    const config = roundsConfig[currentRoundIndex];

    if (isMatch) {
      setTimeout(() => {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
        pairsCounter.textContent = `${matchedPairs}/${config.pairs}`;
        resetBoard();

        if (matchedPairs === config.pairs) {
          handleRoundComplete();
        }
      }, 350);
    } else {
      setTimeout(() => {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        resetBoard();
      }, 800);
    }
  }

  function resetBoard() {
    flippedCards = [];
    lockBoard = false;
  }

  function handleRoundComplete() {
    turnText.textContent = `¡Ronda ${currentRoundIndex + 1} completada!`;

    if (currentRoundIndex + 1 < roundsConfig.length) {
      setTimeout(() => {
        startRound(currentRoundIndex + 1);
      }, 1200);
    } else {
      currentRoundIndex++;
      updateRoundsStepper();
      handleVictory();
    }
  }

  function handleVictory() {
    localStorage.setItem('juego_2_completado', 'true');

    setTimeout(() => {
      victoryModal.classList.remove('hidden');
    }, 700);
  }

  startRound(0);
});