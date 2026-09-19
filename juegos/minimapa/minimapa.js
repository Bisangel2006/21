document.addEventListener('DOMContentLoaded', () => {
  // 1. Efecto de Luciérnagas
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

  // 2. Comprobar niveles superados
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

  // Actualizar contador
  const counterEl = document.getElementById('cleared-count');
  if (counterEl) {
    counterEl.textContent = `${completedCount}/4`;
  }

  const statusBox = document.getElementById('footer-status-text');
  const cutsceneOverlay = document.getElementById('cutscene-overlay');
  const btnClaim = document.getElementById('btn-claim-rewards');

  if (completedCount === 4) {
    // Almacenamiento blindado
    localStorage.setItem('all_levels_completed', 'true');
    localStorage.setItem('cards_unlocked_forever', 'true');

    if (statusBox) {
      statusBox.innerHTML = '🎉 ¡Increíble jefecita! Has desbloqueado todas las claves maestras. <button id="rever-cinematica" style="margin-left:8px;background:none;border:1px solid #ffd32a;color:#ffd32a;border-radius:12px;padding:3px 10px;cursor:pointer;">Ver Cinemática ✨</button>';
      
      const reverBtn = document.getElementById('rever-cinematica');
      if (reverBtn) {
        reverBtn.addEventListener('click', launchCutscene);
      }
    }

    const hasSeenCutscene = localStorage.getItem('cinematica_mostrada');
    if (!hasSeenCutscene) {
      setTimeout(() => {
        launchCutscene();
      }, 700);
    }
  } else if (completedCount > 0) {
    if (statusBox) {
      statusBox.innerHTML = `Llevas <strong>${completedCount}</strong> de 4 niveles superados. ¡Sigue adelante!`;
    }
  }

  function launchCutscene() {
    if (!cutsceneOverlay) return;
    cutsceneOverlay.style.display = 'flex';
    localStorage.setItem('cinematica_mostrada', 'true');
    localStorage.setItem('cards_unlocked_forever', 'true');

    if (btnClaim) {
      btnClaim.onclick = () => {
        window.location.href = '../../index.html?unlocked=true';
      };
    }

    // Auto-redirección de respaldo
    setTimeout(() => {
      window.location.href = '../../index.html?unlocked=true';
    }, 9000);
  }
});