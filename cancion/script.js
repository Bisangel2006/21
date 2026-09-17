// Configuración
const flowerSettings = [
    { 
      x: 25, 
      height: 280, 
      flowerSize: 70, 
      curve: 120, 
      petals: 8, 
      delay: 0.2,
      curveDirection: 1
    },
    { 
      x: 45, 
      height: 320, 
      flowerSize: 80, 
      curve: 140, 
      petals: 8, 
      delay: 0.6,
      curveDirection: -1
    },
    { 
      x: 65, 
      height: 300, 
      flowerSize: 75, 
      curve: 130, 
      petals: 8, 
      delay: 1.0,
      curveDirection: 1
    },
    { 
      x: 85, 
      height: 260, 
      flowerSize: 65, 
      curve: 110, 
      petals: 8, 
      delay: 1.4,
      curveDirection: -1
    },
    { 
      x: 15, 
      height: 240, 
      flowerSize: 60, 
      curve: 100, 
      petals: 8, 
      delay: 1.8,
      curveDirection: 1
    }
  ];
  
  // Crear estrellas
  function createStars() {
    const night = document.getElementById('night');
    const numStars = 150;
    
    // Añadir luz ambiental
    const ambientLight = document.createElement('div');
    ambientLight.className = 'ambient-light';
    night.appendChild(ambientLight);
    
    for (let i = 0; i < numStars; i++) {
      const star = document.createElement('div');
      
      // Tipo de estrella (diferentes colores)
      if (Math.random() < 0.15) {
        star.className = 'star yellow';
      } else if (Math.random() < 0.3) {
        star.className = 'star blue';
      } else {
        star.className = 'star';
      }
      
      // Tamaño aleatorio
      const size = Math.random() * 2 + 1;
      star.style.width = size + 'px';
      star.style.height = size + 'px';
      
      // Posición aleatoria
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';
      
      // Brillo parpadeante
      star.style.animation = `twinkle ${Math.random() * 5 + 3}s ease-in-out infinite alternate`;
      star.style.opacity = Math.random() * 0.5 + 0.3;
      
      night.appendChild(star);
    }
  }
  
  // Crear plantas base
  function createBasePlants() {
    const basePlants = document.getElementById('base-plants');
    
    // Crear hojas de base (turquesa)
    for (let i = 0; i < 15; i++) {
      const leaf = document.createElement('div');
      leaf.className = 'base-leaf';
      
      // Tamaño y posición
      const width = Math.random() * 100 + 100;
      const height = Math.random() * 50 + 50;
      leaf.style.width = width + 'px';
      leaf.style.height = height + 'px';
      
      // Posición
      leaf.style.left = (Math.random() * 80 + 10) + '%';
      leaf.style.bottom = (Math.random() * 5) + '%';
      
      // Rotación
      const rotate = (Math.random() * 30 - 15);
      leaf.style.setProperty('--rotate', rotate + 'deg');
      
      // Retraso
      leaf.style.animationDelay = (Math.random() * 2) + 's';
      
      basePlants.appendChild(leaf);
    }
  }
  
  // Crear flores
  function createFlowers() {
    const flowersContainer = document.getElementById('flowers');
    
    flowerSettings.forEach(settings => {
      // Crear flor
      const flower = document.createElement('div');
      flower.className = 'flower';
      flower.style.left = settings.x + '%';
      
      // Crear camino para el tallo (curva)
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute('width', '100');
      svg.setAttribute('height', settings.height);
      svg.style.position = 'absolute';
      svg.style.bottom = '0';
      svg.style.left = '0';
      svg.style.overflow = 'visible';
      
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      
      // Crear una curva Bezier para el tallo
      const controlX = settings.curve * settings.curveDirection;
      const d = `M0,${settings.height} C${controlX},${settings.height * 0.6} ${controlX/2},${settings.height * 0.3} 0,0`;
      
      path.setAttribute('d', d);
      path.classList.add('stem-path');
      
      // Calcular la longitud del camino para la animación
      const length = Math.sqrt(Math.pow(settings.height, 2) + Math.pow(controlX, 2)) * 1.2; // aproximado
      path.style.setProperty('--length', length);
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
      path.style.animation = `drawStem 2s ease-out ${settings.delay}s forwards`;
      
      svg.appendChild(path);
      flower.appendChild(svg);
      
      // Crear hojas a lo largo del tallo
      const numLeaves = 4;
      for (let i = 0; i < numLeaves; i++) {
        const leafPos = i / (numLeaves - 1); // 0 a 1
        
        // Calcular posición en la curva
        const leafY = settings.height * (1 - leafPos * 0.8);
        const leafX = Math.sin(leafPos * Math.PI) * controlX * 0.8;
        
        const leaf = document.createElement('div');
        leaf.className = 'leaf';
        leaf.style.width = (30 + Math.random() * 20) + 'px';
        leaf.style.height = (12 + Math.random() * 8) + 'px';
        leaf.style.bottom = leafY + 'px';
        leaf.style.left = leafX + 'px';
        
        // Lado alternante para las hojas
        const side = i % 2 === 0 ? 1 : -1;
        const angle = (side * (20 + Math.random() * 20)) + 'deg';
        leaf.style.setProperty('--angle', angle);
        leaf.style.setProperty('--origin', side > 0 ? 'left center' : 'right center');
        leaf.style.setProperty('--delay', (settings.delay + 1 + i * 0.2) + 's');
        
        flower.appendChild(leaf);
        
        // Añadir espiral decorativa cerca de algunas hojas (no todas)
        if (i % 2 === 0) {
          const spiral = document.createElement('div');
          spiral.className = 'spiral';
          spiral.style.bottom = (leafY - 5) + 'px';
          spiral.style.left = (leafX + (side * 15)) + 'px';
          spiral.style.setProperty('--delay', (settings.delay + 1.2 + i * 0.2) + 's');
          flower.appendChild(spiral);
        }
      }
      
      // Crear cabeza de flor
      const flowerHead = document.createElement('div');
      flowerHead.className = 'flower-head';
      flowerHead.style.setProperty('--flower-size', settings.flowerSize + 'px');
      flowerHead.style.bottom = settings.height + 'px';
      flowerHead.style.left = '0px';
      flowerHead.style.setProperty('--delay', (settings.delay + 2) + 's');
      
      // Añadir brillo
      const glow = document.createElement('div');
      glow.className = 'glow';
      glow.style.setProperty('--delay', (settings.delay + 2.5) + 's');
      flowerHead.appendChild(glow);
      
      // Crear pétalos
      const petals = document.createElement('div');
      petals.className = 'petals';
      
      for (let i = 0; i < settings.petals; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        
        // Distribuir los pétalos en círculo
        const angle = i * (360 / settings.petals);
        petal.style.transform = `rotate(${angle}deg) translate(50%, 0)`;
        
        petals.appendChild(petal);
      }
      
      flowerHead.appendChild(petals);
      
      // Crear centro
      const center = document.createElement('div');
      center.className = 'center';
      flowerHead.appendChild(center);
      
      flower.appendChild(flowerHead);
      flowersContainer.appendChild(flower);
      
      // Añadir partículas brillantes con retraso
      setTimeout(() => {
        const particleInterval = setInterval(() => {
          if (document.body.contains(flowerHead)) {
            createParticle(flowerHead, settings.flowerSize);
          } else {
            clearInterval(particleInterval);
          }
        }, 800);
      }, (settings.delay + 3) * 1000);
    });
  }
  
  // Crear partícula brillante
  function createParticle(parent, size) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Posición inicial aleatoria cerca del centro
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * (size / 4) + (size / 4);
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    
    particle.style.left = `calc(50% + ${x}px)`;
    particle.style.top = `calc(50% + ${y}px)`;
    
    // Dirección de movimiento aleatoria (principalmente hacia arriba)
    const moveX = (Math.random() - 0.5) * 40;
    const moveY = -(Math.random() * 40 + 20);
    
    particle.style.setProperty('--x', moveX + 'px');
    particle.style.setProperty('--y', moveY + 'px');
    
    // Animación
    particle.style.animation = `float ${Math.random() * 2 + 3}s ease-out forwards`;
    
    parent.appendChild(particle);
    
    // Eliminar la partícula después de la animación
    setTimeout(() => {
      if (parent.contains(particle)) {
        parent.removeChild(particle);
      }
    }, 5000);
  }
  
  // Añadir estilos de animación de parpadeo
  function addTwinkleAnimation() {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes twinkle {
        0% { opacity: 0.3; }
        100% { opacity: 1; }
      }
    `;
    document.head.appendChild(style);
  }
  
  // Inicializar
  window.addEventListener('DOMContentLoaded', () => {
    addTwinkleAnimation();
    createStars();
    createBasePlants();
    createFlowers();
  });