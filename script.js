let currentUserName = "";
let audioContext = null;
let isPlayingAudio = false;
let melodyInterval = null;

// 1. Particle Simulation Canvas
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleIcons = ['🌸', '🫧', '💗', '✨', '🎀', '⭐', '🌷', '💖'];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor(x, y) {
        this.x = x || Math.random() * canvas.width;
        this.y = y || Math.random() * canvas.height;
        this.size = Math.random() * 18 + 10;
        this.speedX = Math.random() * 1.5 - 0.75;
        this.speedY = Math.random() * -1.5 - 0.5;
        this.icon = particleIcons[Math.floor(Math.random() * particleIcons.length)];
        this.opacity = Math.random() * 0.7 + 0.3;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 2;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;

        if (this.y < -30) {
            this.y = canvas.height + 20;
            this.x = Math.random() * canvas.width;
        }
        if (this.x < -30) this.x = canvas.width + 20;
        if (this.x > canvas.width + 30) this.x = -20;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.globalAlpha = this.opacity;
        ctx.font = `${this.size}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.icon, 0, 0);
        ctx.restore();
    }
}

function initParticles() {
    particles = [];
    const count = Math.min(Math.floor(window.innerWidth / 18), 35);
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// Tạo thêm hiệu ứng hoa nở theo con trỏ chuột
window.addEventListener('mousemove', (e) => {
    if (Math.random() < 0.15) {
        const p = new Particle(e.clientX, e.clientY);
        p.size = Math.random() * 14 + 10;
        p.speedY = Math.random() * -2 - 0.5;
        particles.push(p);
        if (particles.length > 50) particles.shift();
    }
});

// 2. Web Audio API Nhạc Nền + Âm Thanh Tương Tác
function initAudio() {
    if (!audioContext) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioContext = new AudioContext();
    }
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
}

function playPopSound() {
    if (!audioContext) return;
    try {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, audioContext.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1);
        
        gain.gain.setValueAtTime(0.1, audioContext.currentTime);
        gain.gain.linearRampToValueAtTime(0.001, audioContext.currentTime + 0.1);

        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.start();
        osc.stop(audioContext.currentTime + 0.1);
    } catch(e){}
}

function playTone(freq, duration, delay = 0) {
    setTimeout(() => {
        if (!isPlayingAudio || !audioContext) return;
        try {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, audioContext.currentTime);

            gain.gain.setValueAtTime(0, audioContext.currentTime);
            gain.gain.linearRampToValueAtTime(0.07, audioContext.currentTime + 0.1);
            gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + duration);

            osc.connect(gain);
            gain.connect(audioContext.destination);

            osc.start();
            osc.stop(audioContext.currentTime + duration);
        } catch(e) {
            console.error(e);
        }
    }, delay * 1000);
}

const melodyNotes = [
    261.63, 329.63, 392.00, 523.25,
    349.23, 440.00, 523.25, 698.46,
    392.00, 493.88, 587.33, 783.99,
    329.63, 392.00, 523.25, 659.25
];

function startMelodyLoop() {
    if (melodyInterval) clearInterval(melodyInterval);
    let index = 0;
    isPlayingAudio = true;
    
    melodyInterval = setInterval(() => {
        if (!isPlayingAudio) return;
        const note = melodyNotes[index % melodyNotes.length];
        playTone(note, 2.5, 0);
        if (index % 2 === 0) {
            playTone(note * 1.25, 2.0, 0.2);
        }
        index++;
    }, 800);
}

function toggleAudio() {
    const musicIcon = document.getElementById('musicIcon');
    if (isPlayingAudio) {
        isPlayingAudio = false;
        if (melodyInterval) clearInterval(melodyInterval);
        musicIcon.className = 'fas fa-music-slash text-gray-400';
    } else {
        initAudio();
        isPlayingAudio = true;
        startMelodyLoop();
        musicIcon.className = 'fas fa-music text-pink-500 animate-spin';
        setTimeout(() => {
            musicIcon.className = 'fas fa-music text-pink-500';
        }, 1000);
    }
}

// 3. Xử Lý Submit Tên người nhận
function handleNameSubmit(event) {
    event.preventDefault();
    const input = document.getElementById('recipientName');
    const name = input.value.trim();

    if (!name) return;

    currentUserName = name;

    initAudio();
    playPopSound();
    if (!isPlayingAudio) {
        toggleAudio();
    }

    document.getElementById('personalGreeting').textContent = `${currentUserName} ơi, có một điều đặc biệt dành cho bạn... 💗`;
    document.getElementById('letterPreviewName').textContent = `Gửi ${currentUserName}`;
    document.getElementById('envelopeSubtext').textContent = `Có một lá thư dành riêng cho ${currentUserName} 💌`;
    document.getElementById('letterHeader').textContent = `Gửi ${currentUserName} 💐`;

    const nameElements = document.querySelectorAll('.userNameText');
    nameElements.forEach(el => el.textContent = currentUserName);

    const screen1 = document.getElementById('screen1');
    const screen2 = document.getElementById('screen2');

    screen1.classList.add('opacity-0', 'scale-95');
    
    setTimeout(() => {
        screen1.classList.add('hidden');
        screen2.classList.remove('hidden');
        
        setTimeout(() => {
            screen2.classList.remove('opacity-0', 'scale-95');
            screen2.classList.add('opacity-100', 'scale-100');
        }, 50);
    }, 600);
}

// 4. Mở Phong Thư Rực Rỡ với Pháo Hoa
function openEnvelope() {
    const wrapper = document.getElementById('envelopeWrapper');
    if (wrapper.classList.contains('open')) return;

    wrapper.classList.add('open');
    playPopSound();

    // Bắn pháo hoa đợt 1
    if (typeof confetti === 'function') {
        setTimeout(() => {
            confetti({
                particleCount: 60,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#ffb6c1', '#ffd1dc', '#fff0f5', '#e1f5fe', '#f3d5ea']
            });
        }, 300);
    }

    // Bắn pháo hoa đợt 2 khi thư bung mở
    setTimeout(() => {
        const modal = document.getElementById('letterModal');
        const card = document.getElementById('letterContentCard');

        modal.classList.remove('opacity-0', 'pointer-events-none');
        card.classList.remove('scale-90');
        card.classList.add('scale-100');

        if (typeof confetti === 'function') {
            confetti({
                particleCount: 100,
                spread: 120,
                origin: { y: 0.5 },
                colors: ['#ff758c', '#ff7eb3', '#fecfef', '#ffffff', '#ffd1dc']
            });
        }
    }, 1100);
}

// 5. Reset Form
function resetForm() {
    playPopSound();
    const modal = document.getElementById('letterModal');
    const card = document.getElementById('letterContentCard');
    const screen1 = document.getElementById('screen1');
    const screen2 = document.getElementById('screen2');
    const wrapper = document.getElementById('envelopeWrapper');

    card.classList.remove('scale-100');
    card.classList.add('scale-90');
    modal.classList.add('opacity-0', 'pointer-events-none');

    setTimeout(() => {
        wrapper.classList.remove('open');

        screen2.classList.remove('opacity-100', 'scale-100');
        screen2.classList.add('opacity-0', 'scale-95');

        setTimeout(() => {
            screen2.classList.add('hidden');
            document.getElementById('recipientName').value = '';
            currentUserName = "";
            screen1.classList.remove('hidden');

            setTimeout(() => {
                screen1.classList.remove('opacity-0', 'scale-95');
                screen1.classList.add('opacity-100', 'scale-100');
            }, 50);
        }, 500);
    }, 400);
}
