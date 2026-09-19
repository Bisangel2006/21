const musicPlayer = document.getElementById('musicPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const disc = document.querySelector('.disc');

let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        musicPlayer.pause();
        disc.style.animationPlayState = 'paused';
        playPauseBtn.classList.add('paused');
    } else {
        musicPlayer.play().catch(() => {});
        disc.style.animationPlayState = 'running';
        playPauseBtn.classList.remove('paused');
    }
    isPlaying = !isPlaying;
}

playPauseBtn.addEventListener('click', togglePlay);

window.addEventListener('DOMContentLoaded', () => {
    musicPlayer.play().then(() => {
        isPlaying = true;
        disc.style.animationPlayState = 'running';
        playPauseBtn.classList.remove('paused');
    }).catch(() => {
        isPlaying = false;
        disc.style.animationPlayState = 'paused';
        playPauseBtn.classList.add('paused');
    });
});

// Partículas en el fondo (grano de polvo analógico / destellos nocturnos)
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

class Particle {
    constructor(x, y, minRadius, maxRadius, color, speed) {
        this.x = x;
        this.y = y;
        this.radius = Math.random() * (maxRadius - minRadius) + minRadius;
        this.color = color;
        this.speed = speed;
        this.maxRadius = maxRadius;
        this.minRadius = minRadius;
        this.alpha = Math.random() * 0.6 + 0.2;
    }

    update() {
        this.radius += this.speed;
        if (this.radius > this.maxRadius || this.radius < this.minRadius) {
            this.speed = -this.speed;
        }
        this.draw();
    }

    draw() {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 6;
        ctx.globalAlpha = this.alpha;
        ctx.fill();
        ctx.restore();
    }
}

const particles = [];
const particleColors = ['#82cd21', '#eee776', '#ffffff', '#a0e442'];

function initParticles() {
    particles.length = 0;
    const totalParticles = Math.floor((canvas.width * canvas.height) / 13000);
    for (let i = 0; i < totalParticles; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const color = particleColors[Math.floor(Math.random() * particleColors.length)];
        const speed = (Math.random() * 0.035) + 0.01;
        particles.push(new Particle(x, y, 0.8, 2.5, color, speed));
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
    }
    requestAnimationFrame(animateParticles);
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
animateParticles();