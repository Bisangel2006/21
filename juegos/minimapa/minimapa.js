document.addEventListener('DOMContentLoaded', () => {
  // 1. Partículas de luciérnagas
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
  setInterval(createFirefly, 380);

  // 2. Comprobación del progreso guardado en localStorage
  let completedCount = 0;

  for (let i = 1; i <= 4; i++) {
    const isCompleted = localStorage.getItem(`juego_${i}_completado`);
    const node = document.getElementById(`node-${i}`);

    if (isCompleted === 'true' && node) {
      completedCount++;
      node.classList.add('completed');
      const flag = node.querySelector('.status-flag');
      if (flag) flag.textContent = '⭐';
    }
  }

  // Actualizar contador del header
  const counterEl = document.getElementById('cleared-count');
  if (counterEl) {
    counterEl.textContent = `${completedCount}/4`;
  }

  // Mensaje en la caja inferior
  const statusBox = document.getElementById('footer-status-text');
  if (completedCount === 4) {
    statusBox.innerHTML = '🎉 ¡Increíble jefecita! Has desbloqueado todas las claves maestras.';
  } else if (completedCount > 0) {
    statusBox.innerHTML = `Llevas <strong>${completedCount}</strong> de 4 niveles superados. ¡Sigue adelante!`;
  }
});