let currentUserName = "";
let audioContext = null;
let isPlayingAudio = false;
let melodyInterval = null;
let nameRainInterval = null;

// 1. Particle Simulation Canvas
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleIcons = ['🌸', '🫧', '💗', '✨', '🎀', '⭐', '🌷'];

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
        this.size = Math.random() * 16 + 12;
        this.speedX = Math.random() * 1.5 - 0.75;
        this.speedY = Math.random() * -1.5 - 0.5;
        this.icon = particleIcons[Math.floor(Math.random() * particleIcons.length)];
        this.opacity = Math.random() * 0.7 + 0.3;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 1.5;
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
    const count = Math.min(Math.floor(window.innerWidth / 20), 40);
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

// 2. HIỆU ỨNG TÊN BAY TỪ DƯỚI LÊN TRÊN HEADER XONG BIẾN MẤT
const nameDecorationIcons = ['🌸', '✨', '💗', '🌷', '🎀', '💖'];
let nameTimeouts = [];

function clearNameTimeouts() {
    nameTimeouts.forEach(t => clearTimeout(t));
    nameTimeouts = [];
}

function getNameRainContainer() {
    let container = document.getElementById('nameRainContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'nameRainContainer';
        document.body.appendChild(container);
    }
    return container;
}

// Thẻ tên chính giữa bay lên nổi bật qua header rồi biến mất
function createFloatingHeroName() {
    const displayName = currentUserName || "Bạn";
    const container = getNameRainContainer();

    const item = document.createElement('div');
    item.className = 'floating-name-item hero-item';
    item.innerHTML = `<span>💐</span> <span>${displayName}</span> <span>💖</span>`;
    item.style.animationDuration = '4.5s';

    container.appendChild(item);

    setTimeout(() => {
        if (item && item.parentNode) {
            item.parentNode.removeChild(item);
        }
    }, 4500);
}

// Các nhãn tên đồng hành bay từ dưới lên trên header xong biến mất
function createFloatingName(customLeft = null) {
    const displayName = currentUserName || "Bạn";
    const container = getNameRainContainer();

    const item = document.createElement('div');
    const isAlt = Math.random() > 0.5;
    item.className = 'floating-name-item' + (isAlt ? ' alt-anim' : '');

    const randomIcon1 = nameDecorationIcons[Math.floor(Math.random() * nameDecorationIcons.length)];
    const randomIcon2 = nameDecorationIcons[Math.floor(Math.random() * nameDecorationIcons.length)];
    item.innerHTML = `<span>${randomIcon1}</span> <span>${displayName}</span> <span>${randomIcon2}</span>`;

    const leftPos = customLeft !== null ? customLeft : (Math.random() * 75 + 12);
    item.style.left = `${leftPos}%`;

    const fontSize = Math.floor(Math.random() * 4) + 16;
    item.style.fontSize = `${fontSize}px`;

    const duration = Math.random() * 0.8 + 3.8;
    item.style.animationDuration = `${duration}s`;

    container.appendChild(item);

    setTimeout(() => {
        if (item && item.parentNode) {
            item.parentNode.removeChild(item);
        }
    }, duration * 1000);
}

// Kích hoạt làn sóng tên bay lên qua header rồi biến mất
function triggerFloatingNames() {
    stopNameRain();

    // 1. Thẻ tên chính giữa bay lên ngay
    const heroTimeout = setTimeout(() => {
        createFloatingHeroName();
    }, 150);
    nameTimeouts.push(heroTimeout);

    // 2. Làn sóng các thẻ tên vệ tinh bay lên trên header xong biến mất
    const positions = [18, 76, 28, 68, 45, 82, 14];
    positions.forEach((pos, idx) => {
        const t = setTimeout(() => {
            createFloatingName(pos);
        }, 300 + idx * 220);
        nameTimeouts.push(t);
    });
}

function stopNameRain() {
    clearNameTimeouts();
    if (nameRainInterval) {
        clearInterval(nameRainInterval);
        nameRainInterval = null;
    }
    const container = document.getElementById('nameRainContainer');
    if (container) {
        container.innerHTML = '';
    }
}

// 3. Web Audio API Synth Piano
function initAudio() {
    if (!audioContext) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioContext = new AudioContext();
    }
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
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
            gain.gain.linearRampToValueAtTime(0.08, audioContext.currentTime + 0.1);
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

// 4. Submit Tên & Chuyển màn hình
function handleNameSubmit(event) {
    event.preventDefault();
    const input = document.getElementById('recipientName');
    const name = input.value.trim();

    if (!name) return;

    currentUserName = name;

    initAudio();
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
            // Bay một đợt tên khi vào màn hình phong thư
            triggerFloatingNames();
        }, 50);
    }, 600);
}

// 5. Mở Thư & Pháo hoa
function openEnvelope() {
    const wrapper = document.getElementById('envelopeWrapper');
    if (wrapper.classList.contains('open')) return;

    wrapper.classList.add('open');

    // Kích hoạt hiệu ứng tên người nhận bay từ dưới lên trên header xong biến mất khi mở phong thư
    triggerFloatingNames();

    if (typeof confetti === 'function') {
        setTimeout(() => {
            confetti({
                particleCount: 50,
                spread: 60,
                origin: { y: 0.6 },
                colors: ['#ffb6c1', '#ffd1dc', '#fff0f5', '#e1f5fe', '#f3d5ea']
            });
        }, 400);
    }

    setTimeout(() => {
        const modal = document.getElementById('letterModal');
        const card = document.getElementById('letterContentCard');

        modal.classList.remove('opacity-0', 'pointer-events-none');
        card.classList.remove('scale-90');
        card.classList.add('scale-100');

        // Kích hoạt đợt tên bay lên rực rỡ vượt qua header khi bức thư bung mở
        triggerFloatingNames();

        if (typeof confetti === 'function') {
            confetti({
                particleCount: 80,
                spread: 100,
                origin: { y: 0.5 },
                colors: ['#ff758c', '#ff7eb3', '#fecfef', '#ffffff', '#ffd1dc']
            });
        }
    }, 1200);
}

// 6. Reset về màn hình ban đầu
function resetForm() {
    stopNameRain();

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
