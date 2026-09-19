document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. CONTENIDO DE CADA CARTA
  // ==========================================
  const cartas = {
    1: {
      titulo: 'Para cuando me extrañes',
      mensaje: `Para cuando me extrañes, quisiera regalarte la fantasía de que, cada vez que mires al cielo por la noche y veas las estrellas titilando, recuerdes como en <em>El Principito</em> que todas ellas ríen porque en una de tantas estoy yo.
      
Sabrás que, desde algún rincón del universo, te estoy saludando: tal vez saltando de asteroide en planeta, tal vez aprendiendo o componiendo alguna nueva letra, estrofa o prosa que en algún futuro te podré enseñar y dedicar; tal vez leyendo algún cuento o persiguiendo fantasías de otros mundos.

Pero quiero que tengas por seguro que no importa lo que haga, escriba, sueñe o diga: no saldrás jamás de mi mente.`
    },
    2: {
      titulo: '¿Por qué flores?',
      mensaje: `Para serte sincero, por mucha inteligencia o indicios de sabiduría que logre alcanzar hasta hoy, no te podría dar una respuesta exacta... Pero para mí, el hecho de dar o recibir flores representa una enorme muestra de afecto mutuo: el que las da entrega un pedacito de su corazón, y quien las recibe acepta cuidar con ternura esa parte de la que el otro se está despojando.

No sabría decirte con total certeza qué me impulsa; te diría de golpe que tal vez la pura inercia, pero sería mentirte. Mientras más lo pienso, más motivos encuentro (y menos digo para no sonar tan intenso) pero aqui va mi mejor intento de enumerar algunos de ellos:

1. ¿Será tu sonrisa, que ilumina hasta mi día más oscuro?
2. Tal vez tu cabello: no importa si está largo o corto, bien arreglado o despeinado tras un día largo, recogido o suelto... siempre luce precioso cuando lo acaricia el viento.
3. ¿Serán tus ojos, que leen con facilidad los míos y calman cada colapso mientras me pierdo en tu mirada?
4. Tal vez sea tu manera de amar y servir a Dios. Créeme que cuando te digo que lo que más me cautiva es tu fe sincera, es verdad; eres un ejemplo que a veces me cuesta alcanzar, pero que me inspira a seguir orando y creyendo en lo que más amo en este mundo: Dios.
5. Quizá tu falta de cordura y lo bien que complementa mi locura. Cada vez que bromeamos, charlamos o simplemente compartimos un silencio, me parece increíble cómo, sin importar lo mal que pinte mi día, termino riendo a carcajadas a tu lado.
6. Puede ser por cada recuerdo que aún no existe y por cada sueño que, por alguna linda razón, siento en el fondo que se hará realidad.
7. Por esas y por unas <span style="color: #ffd32a; font-weight: 700;">6 o 7</span>  mil razones más, tengo este sentimiento tan claro de querer llenarte de flores, solo por ser esa personita tan especial.`
    },
    3: {
      titulo: 'En todos lados',
      mensaje: `Jajajaja, ¿recuerdas lo que te contesté la primera vez que me preguntaste si me gustabas? Yo sí: «Estás en todos lados... hasta en mi corazón».

Pues desde antes de esa pregunta ha sido así, y sigue siéndolo. Es casi imposible no recordarte a cada instante; a veces no sé si soy yo buscándote a propósito para no soltarte, o si simplemente el destino hace que siempre coincida contigo.`
    },
    4: {
      titulo: 'Mi locura personal',
      mensaje: `Puede que suene a locura, la verdad, pero necesito sacar este sentir de mi cabeza: te quiero, por más que a veces intente disimularlo. Y te prometo que, por muy difícil o empinado que se ponga el camino, siempre lo cruzaré a tu lado; y por muy altas que tengas tus expectativas, siempre pondré todo de mí para superarlas.

No soy un superhombre ni mucho menos, pero si es por ti, daré lo mejor de mí. Sé de sobra que has podido y puedes sola con todo, pero no tienes por qué estarlo: Dios y yo estamos aquí para apoyarte en cada paso. Donde no te alcancen las fuerzas, sumaremos las mías; y donde no alcancen ni las tuyas ni las mías, siempre estará Él sosteniéndonos a los dos.

Incluso en la distancia, sabes bien que dejaría lo que estuviera haciendo con tal de correr a tu lado y darte una mano.`
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
        modalBody.innerHTML = cartas[id].mensaje.replace(/\n/g, '<br>');
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