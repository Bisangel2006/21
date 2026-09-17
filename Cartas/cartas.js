document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. CONTENIDO DE CADA CARTA
  // Puedes editar o ampliar el texto de cada una libremente
  // ==========================================
  const cartas = {
    1: {
      titulo: 'Para cuando me extrañes',
      mensaje: `Sé que a veces los días se sienten pesados o la rutina nos separa un poco, pero quiero que recuerdes esto: cada pensamiento bonito de mi día lleva tu nombre.

No importa qué tan lejos o qué tan ocupados estemos, en mi mente siempre hay un lugar seguro esperándote. Siempre estoy a una llamada o a un recuerdo de ti.`
    },
    2: {
      titulo: 'Por qué flores amarillas',
      mensaje: `Dicen que regalar flores amarillas cada 21 de septiembre es una promesa sincera de quedarse y de iluminar la vida de la otra persona.

No quería darte solo flores de esas que se marchitan a los días; quise regalarte este rinconcito digital, hecho línea por línea pensando en ti, para recordarte lo especial y radiante que eres en mi camino.`
    },
    3: {
      titulo: 'A mi jefecita consentida',
      mensaje: `A veces mandona, a veces dulce, pero siempre auténtica. Me encanta tu risa, me encanta cuando te pones en tu papel de jefecita y me encanta la calma tan bonita que me das.

Gracias por ser tú, sin filtros y con toda esa energía que lo cambia todo a tu alrededor.`
    },
    4: {
      titulo: 'Una promesa',
      mensaje: `Te prometo escuchar tus historias incluso cuando sean largas o repetidas. Te prometo acompañarte en tus días buenos y sostenerte la mano en los difíciles.

Pero sobre todo, te prometo no dar nunca por sentada la dicha de tenerte en mi vida, tuktan mairin nais.`
    }
  };

  // ==========================================
  // 2. MODAL Y EVENTOS DE APERTURA
  // ==========================================
  const modal = document.getElementById('letter-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const closeBtn = document.getElementById('modal-close');
  const overlay = modal.querySelector('.modal-overlay');
  const cards = document.querySelectorAll('.letter-card');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-letter');
      if (cartas[id]) {
        modalTitle.textContent = cartas[id].titulo;
        modalBody.textContent = cartas[id].mensaje;
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
      }
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (overlay) overlay.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // ==========================================
  // 3. LUCIÉRNAGAS FLOTANTES
  // ==========================================
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

    setTimeout(() => {
      firefly.remove();
    }, duration * 1000);
  }

  setInterval(createFirefly, 380);
});