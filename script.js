document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('glow-container');

  function createGlowParticle() {
    if (!container) return;

    const particle = document.createElement('div');
    particle.classList.add('firefly');

    // Tamaño aleatorio pequeño (2px a 5px)
    const size = Math.random() * 3 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    // Posición horizontal aleatoria
    particle.style.left = `${Math.random() * 100}vw`;

    // Alternar entre destellos amarillos cálidos y cyan suave (como en la imagen)
    const isYellow = Math.random() > 0.4;
    const color = isYellow ? '#ffd32a' : '#64ffda';
    particle.style.backgroundColor = color;
    particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;

    // Duración suave del ascenso (6s a 12s)
    const duration = Math.random() * 6 + 6;
    particle.style.animationDuration = `${duration}s`;

    container.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, duration * 1000);
  }

  // Genera partículas continuamente
  setInterval(createGlowParticle, 350);
});