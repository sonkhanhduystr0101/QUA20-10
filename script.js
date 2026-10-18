let currentUserName = "";
let audioContext = null;
let isPlayingAudio = false;
let melodyInterval = null;

/* Định dạng tên to nhẹ nhàng nổi bật */
function formatName(name) {
    return `<span class="user-highlight-name">${name}</span>`;
}

/* Kho thư riêng cho từng người */
const customLetters = {
    "mai": {
        p1: `Nhân ngày 20/10, chúc ${formatName("Mai")} luôn rạng rỡ, xinh đẹp và tràn đầy năng lượng tích cực! 🌷`,
        p2: `Mong rằng mọi dự định sắp tới của ${formatName("Mai")} đều thành công rực rỡ và luôn gặp nhiều may mắn. 💗`,
        p3: `Hãy luôn tự tin, yêu thương bản thân và tỏa sáng theo cách riêng của mình nhé ${formatName("Mai")}. ✨`,
        p4: `Chúc ${formatName("Mai")} một ngày 20/10 thật nhiều quà và hoa! 🎁🌸`
    },
    "lan": {
        p1: `Gửi ${formatName("Lan")} thân yêu, chúc ${formatName("Lan")} một ngày 20/10 thật ấm áp và ngập tràn niềm vui! 🌸`,
        p2: `Cảm ơn ${formatName("Lan")} vì luôn là một người bạn tuyệt vời, luôn lắng nghe và chia sẻ. 💗`,
        p3: `Chúc ${formatName("Lan")} luôn giữ được sự dịu dàng, bình yên và luôn hạnh phúc với lựa chọn của mình. ✨`,
        p4: `Chúc ${formatName("Lan")} có một ngày trọn vẹn niềm vui nhé! 🎁🌷`
    },
    "trang": {
        p1: `Chúc ${formatName("Trang")} ngày 20/10 thật xinh đẹp, cá tính và luôn tràn ngập nụ cười! 🌷`,
        p2: `Mong ${formatName("Trang")} luôn vững vàng, đạt được mọi mục tiêu và luôn có những người bạn tuyệt vời đồng hành. 💗`,
        p3: `Hãy luôn tỏa sáng và sống một cuộc đời thật rực rỡ ${formatName("Trang")} nhé! ✨`,
        p4: `Happy Vietnamese Women's Day to ${formatName("Trang")}! 🎁🌸`
    }
};

const defaultLetter = {
    p1: "Nhân ngày 20/10, chúc {name} luôn vui vẻ, hạnh phúc và luôn giữ được nụ cười thật xinh trên môi. 🌷",
    p2: "Mong rằng mỗi ngày của {name} đều có thật nhiều niềm vui, những điều bất ngờ đáng yêu và thật nhiều yêu thương. 💗",
    p3: "Chúc {name} luôn tự tin, luôn tỏa sáng theo cách riêng của mình và gặp thật nhiều điều tốt đẹp trong cuộc sống. ✨",
    p4: "Chúc {name} một ngày 20/10 thật đặc biệt và trọn vẹn nhé! 🎁🌸"
};

/* Tone màu Champagne, Rose Gold, Berry, Soft Purple - Rất sang & cao cấp */
const elegantColors = [
    '#9f1239', '#be123c', '#881337', '#7e22ce', 
    '#6b21a8', '#0369a1', '#0f766e', '#991b1b'
];

let nameParticles = [];
let nameAnimationId = null;

/* MƯA TÊN TINH TẾ: Nhỏ nhắn, lướt nhẹ từ dưới lên */
function startFloatingNameEffect(name) {
    const container = document.getElementById('floatingNameContainer');
    if (!container) return;
    
    container.innerHTML = '';
    nameParticles = [];
    
    // Mật độ vừa phải, thanh thoát
    const particleCount = 28; 

    for (let i = 0; i < particleCount; i++) {
        createFloatingNameItem(container, name, true);
    }

    animateFloatingNames();
}

function createFloatingNameItem(container, name, initial = false) {
    const el = document.createElement('div');
    el.className = 'floating-name-item';
    el.textContent = name;

    const posX = Math.random() * 92 + 4;
    const posY = initial ? Math.random() * 110 : 105; 
    
    // Tốc độ lướt cực mịn và chậm
    const speed = Math.random() * 0.18 + 0.08; 
    
    // Kích thước NHỎ XÍU SANG TRỌNG (12px - 18px)
    const fontSize = Math.floor(Math.random() * 6) + 12; 
    const color = elegantColors[Math.floor(Math.random() * elegantColors.length)];
    const opacity = Math.random() * 0.4 + 0.45; // Độ trong suốt dịu nhẹ (0.45 - 0.85)

    el.style.left = `${posX}%`;
    el.style.top = `${posY}%`;
    el.style.fontSize = `${fontSize}px`;
    el.style.color = color;
    el.style.opacity = opacity;

    container.appendChild(el);

    nameParticles.push({
        element: el,
        x: posX,
        y: posY,
        speed: speed,
        wave: Math.random() * Math.PI * 2,
        waveSpeed: Math.random() * 0.02 + 0.008
    });
}

function animateFloatingNames() {
    nameParticles.forEach((p) => {
        p.y -= p.speed;
        p.wave += p.waveSpeed;
        const xOffset = Math.sin(p.wave) * 0.5;
        
        p.element.style.top = `${p.y}%`;
        p.element.style.left = `${p.x + xOffset}%`;

        if (p.y < -10) {
            p.y = 105;
            p.x = Math.random() * 92 + 4;
        }
    });

    nameAnimationId = requestAnimationFrame(animateFloatingNames);
}

function stopFloatingNameEffect() {
    if (nameAnimationId) cancelAnimationFrame(nameAnimationId);
    const container = document.getElementById('floatingNameContainer');
    if (container) container.innerHTML = '';
    nameParticles = [];
}

/* CANVAS BACKGROUND PARTICLES */
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
        this.size = Math.random() * 14 + 10;
        this.speedX = Math.random() * 1.2 - 0.6;
        this.speedY = Math.random() * -1.2 - 0.4;
        this.icon = particleIcons[Math.floor(Math.random() * particleIcons.length)];
        this.opacity = Math.random() * 0.6 + 0.3;
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
    const count = Math.min(Math.floor(window.innerWidth / 22), 28);
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

/* WEB AUDIO API MUSIC */
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
            gain.gain.linearRampToValueAtTime(0.06, audioContext.currentTime + 0.1);
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
        if (index % 2 === 0) playTone(note * 1.25, 2.0, 0.2);
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

/* XỬ LÝ SỰ KIỆN VÀ MỞ THƯ */
function handleNameSubmit(event) {
    event.preventDefault();
    const input = document.getElementById('recipientName');
    const name = input.value.trim();

    if (!name) return;
    currentUserName = name;

    initAudio();
    if (!isPlayingAudio) toggleAudio();

    document.getElementById('personalGreeting').textContent = `${currentUserName} ơi, có một điều đặc biệt dành cho bạn... 💗`;
    document.getElementById('letterPreviewName').textContent = `Gửi ${currentUserName}`;
    document.getElementById('envelopeSubtext').textContent = `Có một lá thư dành riêng cho ${currentUserName} 💌`;
    document.getElementById('letterHeader').innerHTML = `Gửi ${formatName(currentUserName)} 💐`;

    const formattedName = formatName(currentUserName);
    const key = currentUserName.toLowerCase();

    const letterData = customLetters[key] || {
        p1: defaultLetter.p1.replace(/{name}/g, formattedName),
        p2: defaultLetter.p2.replace(/{name}/g, formattedName),
        p3: defaultLetter.p3.replace(/{name}/g, formattedName),
        p4: defaultLetter.p4.replace(/{name}/g, formattedName)
    };

    document.getElementById('letterPara1').innerHTML = letterData.p1;
    document.getElementById('letterPara2').innerHTML = letterData.p2;
    document.getElementById('letterPara3').innerHTML = letterData.p3;
    document.getElementById('letterPara4').innerHTML = letterData.p4;

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

function openEnvelope() {
    const wrapper = document.getElementById('envelopeWrapper');
    if (wrapper.classList.contains('open')) return;

    wrapper.classList.add('open');

    if (typeof confetti === 'function') {
        setTimeout(() => {
            confetti({
                particleCount: 45,
                spread: 60,
                origin: { y: 0.6 },
                colors: ['#ffb6c1', '#ffd1dc', '#fff0f5', '#e1f5fe', '#f3d5ea']
            });
        }, 350);
    }

    setTimeout(() => {
        const modal = document.getElementById('letterModal');
        const card = document.getElementById('letterContentCard');

        modal.classList.remove('opacity-0', 'pointer-events-none');
        card.classList.remove('scale-90');
        card.classList.add('scale-100');

        startFloatingNameEffect(currentUserName);

        if (typeof confetti === 'function') {
            confetti({
                particleCount: 70,
                spread: 100,
                origin: { y: 0.5 },
                colors: ['#ff758c', '#ff7eb3', '#fecfef', '#ffffff', '#ffd1dc']
            });
        }
    }, 1100);
}

function resetForm() {
    const modal = document.getElementById('letterModal');
    const card = document.getElementById('letterContentCard');
    const screen1 = document.getElementById('screen1');
    const screen2 = document.getElementById('screen2');
    const wrapper = document.getElementById('envelopeWrapper');

    stopFloatingNameEffect();

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
            screen1.classList.remove('hidden');

            setTimeout(() => {
                screen1.classList.remove('opacity-0', 'scale-95');
                screen1.classList.add('opacity-100', 'scale-100');
            }, 50);
        }, 500);
    }, 400);
}
