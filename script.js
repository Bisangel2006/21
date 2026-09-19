document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('glow-container');

  // 1. Efecto de Luciérnagas continuas
  function createGlowParticle() {
    if (!container) return;

    const particle = document.createElement('div');
    particle.classList.add('firefly');

    const size = Math.random() * 3 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}vw`;

    const isYellow = Math.random() > 0.4;
    const color = isYellow ? '#ffd32a' : '#64ffda';
    particle.style.backgroundColor = color;
    particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;

    const duration = Math.random() * 6 + 6;
    particle.style.animationDuration = `${duration}s`;

    container.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, duration * 1000);
  }

  setInterval(createGlowParticle, 350);

  // 2. Comprobación y Persistencia Permanente del Estado
  const params = new URLSearchParams(window.location.search);
  const justUnlocked = params.get('unlocked') === 'true';

  let isUnlocked = localStorage.getItem('cards_unlocked_forever') === 'true' || 
                   localStorage.getItem('all_levels_completed') === 'true';

  // Si proviene de la cinemática o ya tenía la marca, fijar permanente
  if (justUnlocked) {
    isUnlocked = true;
    localStorage.setItem('cards_unlocked_forever', 'true');
    localStorage.setItem('all_levels_completed', 'true');
  }

  // Si los 4 niveles fueron marcados individualmente
  if (!isUnlocked) {
    let completedLevels = 0;
    for (let i = 1; i <= 4; i++) {
      if (localStorage.getItem(`juego_${i}_completado`) === 'true') {
        completedLevels++;
      }
    }
    if (completedLevels >= 4) {
      isUnlocked = true;
      localStorage.setItem('cards_unlocked_forever', 'true');
      localStorage.setItem('all_levels_completed', 'true');
    }
  }

  const rewardCards = document.querySelectorAll('.reward-card');
  const banner = document.getElementById('unlock-banner');

  if (isUnlocked) {
    // Quitar candados y difuminado permanentemente
    rewardCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.remove('locked');
        card.classList.add('unlocked');
      }, justUnlocked ? index * 180 : 0);
    });

    // Mostrar banner solo al volver de la cinemática
    if (banner && justUnlocked) {
      banner.style.display = 'block';
      setTimeout(() => {
        banner.style.transition = 'opacity 1s ease';
        banner.style.opacity = '0';
        setTimeout(() => banner.remove(), 1000);
      }, 5500);

      window.history.replaceState({}, document.title, window.location.pathname);
    }
  } else {
    // Bloquear tarjetas si no se han completado los niveles
    rewardCards.forEach(card => {
      card.classList.add('locked');
      card.classList.remove('unlocked');

      card.addEventListener('click', (e) => {
        if (card.classList.contains('locked')) {
          e.preventDefault();
          alert('🔒 ¡Nivel Bloqueado! Supera los 4 mundos en el Minimapa para desbloquear este regalo.');
        }
      });
    });
  }
});