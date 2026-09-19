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

  // 2. Configuración de fases: zona dorada amplia, media y precisa
  const roundsConfig = [
    {
      round: 1,
      name: 'Fase 1: Sintonía Inicial',
      desc: 'Zona dorada amplia y ritmo pausado',
      zoneWidthPercent: 40,
      speed: 1.1
    },
    {
      round: 2,
      name: 'Fase 2: El Primer Compás',
      desc: 'Zona intermedia a velocidad estándar',
      zoneWidthPercent: 26,
      speed: 1.6
    },
    {
      round: 3,
      name: 'Fase 3: El Gran Acorde',
      desc: 'Acierta en el surco exacto para activar la canción',
      zoneWidthPercent: 18,
      speed: 2.1
    }
  ];

  let currentRoundIndex = 0;
  let needlePosition = 0;
  let needleDirection = 1;
  let isMoving = true;
  let animFrameId = null;

  let currentZoneLeft = 30;
  let currentZoneWidth = 40;

  const vinylPlatter = document.getElementById('vinyl-platter');
  const targetZone = document.getElementById('target-zone');
  const armNeedle = document.getElementById('arm-needle');
  const armTrack = document.getElementById('arm-track');
  const dropBtn = document.getElementById('drop-btn');
  const feedbackMsg = document.getElementById('feedback-msg');
  const hitsCount = document.getElementById('hits-count');

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
      alertBadge.textContent = `FASE ${config.round} DE 3`;
      alertTitle.textContent = config.name;
      alertDesc.textContent = config.desc;

      roundAlert.classList.remove('hidden');
      setTimeout(() => {
        roundAlert.classList.add('hidden');
        resolve();
      }, 1500);
    });
  }

  // Animación continua de vaivén de la aguja
  function animateNeedle() {
    if (!isMoving) return;

    const config = roundsConfig[currentRoundIndex];
    needlePosition += needleDirection * config.speed;

    if (needlePosition >= 100) {
      needlePosition = 100;
      needleDirection = -1;
    } else if (needlePosition <= 0) {
      needlePosition = 0;
      needleDirection = 1;
    }

    armNeedle.style.left = `${needlePosition}%`;
    animFrameId = requestAnimationFrame(animateNeedle);
  }

  async function startRound(index) {
    currentRoundIndex = index;
    updateRoundsStepper();

    const config = roundsConfig[currentRoundIndex];
    await showRoundAnnouncement(config);

    feedbackMsg.textContent = '';
    dropBtn.disabled = false;
    dropBtn.textContent = '¡Soltar Aguja! 🎶';

    hitsCount.textContent = `${currentRoundIndex}/3`;

    // Posicionar la zona dorada de forma aleatoria (con margen para no salir del borde)
    currentZoneWidth = config.zoneWidthPercent;
    const maxLeft = 100 - currentZoneWidth - 10;
    currentZoneLeft = Math.floor(Math.random() * (maxLeft - 10)) + 10;

    targetZone.style.width = `${currentZoneWidth}%`;
    targetZone.style.left = `${currentZoneLeft}%`;

    // Reiniciar aguja
    needlePosition = 0;
    needleDirection = 1;
    isMoving = true;

    if (animFrameId) cancelAnimationFrame(animFrameId);
    animateNeedle();
  }

  dropBtn.addEventListener('click', () => {
    if (!isMoving) return;

    // Frenar la aguja para evaluar
    isMoving = false;
    cancelAnimationFrame(animFrameId);
    dropBtn.disabled = true;

    const zoneStart = currentZoneLeft;
    const zoneEnd = currentZoneLeft + currentZoneWidth;

    // Comprobar si la aguja cayó dentro de la zona dorada
    if (needlePosition >= zoneStart && needlePosition <= zoneEnd) {
      feedbackMsg.textContent = '✨ ¡Acertaste en el surco!';
      feedbackMsg.style.color = '#2ecc71';

      // Giro breve del disco como señal de éxito
      vinylPlatter.classList.add('spinning');

      setTimeout(() => {
        if (currentRoundIndex + 1 < roundsConfig.length) {
          vinylPlatter.classList.remove('spinning');
          startRound(currentRoundIndex + 1);
        } else {
          currentRoundIndex++;
          updateRoundsStepper();
          hitsCount.textContent = '3/3';
          handleVictory();
        }
      }, 1200);
    } else {
      feedbackMsg.textContent = '🥀 Pasó de largo. ¡Inténtalo de nuevo!';
      feedbackMsg.style.color = '#ff7675';

      setTimeout(() => {
        isMoving = true;
        dropBtn.disabled = false;
        animateNeedle();
      }, 900);
    }
  });

  function handleVictory() {
    vinylPlatter.classList.add('spinning');
    feedbackMsg.textContent = '🎉 ¡El vinilo está sonando!';
    feedbackMsg.style.color = '#ffd32a';

    // Guarda el progreso en localStorage para completar el minimapa a 4/4
    localStorage.setItem('juego_4_completado', 'true');

    setTimeout(() => {
      victoryModal.classList.remove('hidden');
    }, 800);
  }

  // Iniciar en la Fase 1
  startRound(0);
});