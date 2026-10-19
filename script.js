let currentUserName = "";
let audioContext = null;
let isPlayingAudio = false;
let melodyInterval = null;
let nameRainInterval = null;

// Danh sách các bức thư riêng biệt dành cho từng người
const lettersData = {
    mai: {
        keys: ["phạm thị ngọc mai", "pham thi ngoc mai", "ngọc mai", "ngoc mai", "mai"],
        header: "Gửi Ngọc Mai 💐",
        preview: "Gửi Ngọc Mai",
        content: `
            <p class="font-bold text-pink-600">𝐃𝐞𝐚𝐫 𝐍𝐠ọ𝐜 𝐌𝐚𝐢 🌷,</p>
            <p>𝐇ô𝐦 𝐧𝐚𝐲 𝐥à 𝐧𝐠à𝐲 𝐠ì 𝐭𝐚𝐚𝐚 , 𝐥à 𝟐𝟎/𝟏𝟎 á𝐚𝐚𝐚𝐚, 𝐪𝐮𝐚 𝐥á 𝐭𝐡ư 𝐧à𝐲 𝐭𝐮𝐢 𝐜𝐡ú𝐜 𝐛à 𝐥ú𝐜 𝐧à𝐨 𝐜ũ𝐧𝐠 𝐩𝐡ả𝐢 𝐯𝐮𝐢 𝐯ẻ 𝐡ạ𝐧𝐡 𝐩𝐡ú𝐜 𝐧ă𝐧𝐠 𝐥ượ𝐧𝐠 𝟏𝟎𝟎% 𝐥𝐮ô𝐧 , 𝐥𝐮ô𝐧 𝐥𝐮ô𝐧 𝐩𝐡ả𝐢 𝐱𝐢𝐧𝐡 đẹ𝐩 𝐭ự 𝐭𝐢𝐧 𝐥à 𝐜𝐡í𝐧𝐡 𝐦ì𝐧𝐡, 𝐤𝐡ô𝐧𝐠 𝐜ó 𝐜𝐡𝐮𝐲ệ𝐧 𝐠ì 𝐜ó 𝐭𝐡ể 𝐥à𝐦 𝐛ả𝐧 𝐭𝐡â𝐧 𝐛𝐮ồ𝐧 𝐡ế𝐭 𝐭𝐫ơ𝐧 ✨.</p>
            <p>𝐓𝐫ả𝐢 𝐪𝐮𝐚 𝐧𝐡ữ𝐧𝐠 𝐤ỷ 𝐧𝐢ệ𝐦 𝐜ù𝐧𝐠 𝐧𝐡𝐚𝐮 𝐫ồ𝐢 𝐛𝐢ế𝐭 𝐌𝐚𝐢 𝐜ố 𝐠ắ𝐧𝐠 𝐧𝐡𝐢ề𝐮 𝐥ắ𝐦 𝐧ê𝐧 𝐦𝐨𝐧𝐠 𝐛ạ𝐧 𝐭𝐡à𝐧𝐡 𝐜ô𝐧𝐠 𝐱ứ𝐧𝐠 𝐯ớ𝐢 𝐧𝐡ữ𝐧𝐠 𝐠ì 𝐦à 𝐛ả𝐧 𝐭𝐡â𝐧 𝐛ỏ 𝐫𝐚 𝐧𝐡𝐚 🌟.</p>
            <p>𝐂𝐡ú𝐜 𝐛ạ𝐧 𝐬ẽ 𝐠ặ𝐩 đượ𝐜 𝐭𝐡ê𝐦 𝐧𝐡ữ𝐧𝐠 𝐧𝐠ườ𝐢 𝐦à 𝐛ả𝐧 𝐭𝐡â𝐧 𝐢ê𝐮 𝐭𝐡ươ𝐧𝐠 𝐯à 𝐧𝐠ườ𝐢 𝐢ê𝐮 𝐭𝐡ươ𝐧𝐠 𝐛ả𝐧 𝐭𝐡â𝐧 💞. 𝐂𝐡ú𝐜 𝟐𝟎/𝟏𝟎 𝐃𝐮𝐢 𝐝ẻ 🎉.</p>
            <p class="font-bold text-pink-500 text-right mt-2">𝐁ạ𝐧 𝐜ủ𝐚 𝐌𝐚𝐢</p>
        `
    },
    ngoc: {
        keys: ["trịnh thị bảo ngọc", "trinh thi bao ngoc", "bảo ngọc", "bao ngoc", "chị ngọc", "chi ngoc", "ngọc", "ngoc"],
        header: "Gửi Chị Ngọc 💐",
        preview: "Gửi Chị Ngọc",
        content: `
            <p class="font-bold text-pink-600">𝐆ử𝐢 𝐂𝐡ị 𝐍𝐠ọ𝐜,</p>
            <p>𝐍𝐡â𝐧 𝐧𝐠à𝐲 𝟐𝟎/𝟏𝟎 𝐧à𝐲 𝐥á 𝐭𝐡ư 𝐠ử𝐢 đế𝐧 𝐜𝐡ị , 𝐥â𝐮 𝐫ồ𝐢 𝐤𝐡ô𝐧𝐠 𝐜ó 𝐠ặ𝐩 𝐧𝐡ớ 𝐪𝐮á 𝐭𝐫ờ𝐢 𝐦à 𝐤𝐡ô𝐧𝐠 𝐛𝐢ế𝐭 𝐜ó 𝐧𝐡ớ 𝐭𝐮𝐢 𝐤𝐡ô𝐧𝐠 ✨. 𝐂𝐡ú𝐜 𝐜𝐡ị 𝐥𝐮ô𝐧 𝐥𝐮ô𝐧 𝐬𝐮ô𝐧 𝐬ẻ 𝐭𝐫𝐨𝐧𝐠 𝐜ô𝐧𝐠 𝐯𝐢ệ𝐜 💼, 𝐧𝐡ữ𝐧𝐠 𝐭𝐡ứ 𝐦𝐚𝐲 𝐦ắ𝐧 𝐥𝐮ô𝐧 đế𝐧 𝐯ớ𝐢 𝐜𝐡ị 𝐯à 𝐡ạ𝐧𝐡 𝐩𝐡ú𝐜 𝐯ớ𝐢 𝐧𝐠ườ𝐢 𝐦ì𝐧𝐡 𝐢ê𝐮 𝐧𝐡𝐞𝐧 ❤️.</p>
            <p>𝐓𝐫𝐨𝐧𝐠 𝐭ươ𝐧𝐠 𝐥𝐚𝐢 𝐬ẽ đạ𝐭 đượ𝐜 𝐧𝐡𝐢ề𝐮 𝐭𝐡à𝐧𝐡 𝐜ô𝐧𝐠 𝐭𝐨 𝐛ự 🌟, 𝐥ú𝐜 𝐧à𝐨 𝐜ũ𝐧𝐠 𝐯𝐮𝐢 𝐯ẻ 𝐤𝐡ô𝐧𝐠 𝐜ó đượ𝐜 𝐛𝐮ồ𝐧 𝐯à 𝐬ẽ đượ𝐜 𝐦ọ𝐢 𝐧𝐠ườ𝐢 𝐢ê𝐮 𝐭𝐡ươ𝐧𝐠 🤗. 𝐂𝐡ú𝐜 𝐜𝐡ị 𝐧𝐠à𝐲 𝟐𝟎/𝟏𝟎 𝐯𝐮𝐢 𝐯ẻ 💐💐</p>
            <p class="font-bold text-pink-500 text-right mt-2">𝐓ừ 𝐧𝐠ườ𝐢 𝐞𝐦 𝐊𝐡á𝐧𝐡 𝐃𝐮𝐲 𝐭𝐮𝐲ệ𝐭 𝐯ờ𝐢.</p>
        `
    },
    my: {
        keys: ["la đặng thảo my", "la dang thao my", "thảo my", "thao my", "my"],
        header: "Thân gửi Thảo My 💐",
        preview: "Gửi Thảo My",
        content: `
            <p class="font-bold text-pink-600">𝐓𝐡â𝐧 𝐠ử𝐢 𝐓𝐡ả𝐨 𝐌𝐲 🌞,</p>
            <p>𝐋á 𝐭𝐡ư 𝐧à𝐲 𝐠ử𝐢 𝐭𝐫𝐚𝐨 𝐌𝐲 𝐧𝐡â𝐧 𝐧𝐠à𝐲 𝟐𝟎/𝟏𝟎 𝐧ă𝐦 𝐧𝐚𝐲 á , 𝐭𝐮𝐢 𝐦𝐨𝐧𝐠 𝐥à 𝐌𝐲 𝐬ẽ 𝐩𝐡ả𝐢 𝐦ạ𝐧𝐡 𝐤𝐡ỏ𝐞 𝐡ạ𝐧𝐡 𝐩𝐡ú𝐜 𝐭𝐡𝐢ệ𝐭 𝐥à 𝐧𝐡𝐢ề𝐮, 𝐧𝐠à𝐲 𝐜à𝐧𝐠 𝐱𝐢𝐧𝐡 đẹ𝐩 𝐧𝐡ư 𝐡𝐨𝐚 𝐥𝐮ô𝐧 💐.</p>
            <p>𝐓𝐮𝐢 ướ𝐜 𝐦ì𝐧𝐡 𝐜ó 𝐭𝐡ể 𝐪𝐮𝐚𝐲 𝐥ạ𝐢 𝐧ă𝐦 𝐜ấ𝐩 𝟑 để 𝐜𝐡ú𝐜 𝐛à 𝐦ỗ𝐢 𝐧ă𝐦 𝐥𝐮ô𝐧 𝐦à 𝐡ỏ𝐧𝐠 đượ𝐜 𝐧𝐡ư𝐧𝐠 𝐦à 𝐦𝐨𝐧𝐠 𝐫ằ𝐧𝐠 𝐭ươ𝐧𝐠 𝐥𝐚𝐢 𝐌𝐲 𝐬ẽ 𝐠ặ𝐩 đượ𝐜 𝐧𝐡𝐢ề𝐮 𝐧𝐡𝐢ề𝐮 𝐡ạ𝐧𝐡 𝐩𝐡ú𝐜 𝐦𝐚𝐲 𝐦ắ𝐧 𝐯à 𝐦ọ𝐢 đ𝐢ề𝐮 𝐭ố𝐭 đẹ𝐩 𝐬ẽ 𝐥𝐮ô𝐧 𝐭ì𝐦 đế𝐧 𝐌𝐲 𝐧𝐡𝐚𝐚 ✨.</p>
            <p>𝐂𝐡ú𝐜 𝐌𝐲 𝐧𝐠à𝐲 𝟐𝟎/𝟏𝟎 𝐭𝐡ậ𝐭 𝐥à 𝐩𝐞𝐚𝐤 🔥.</p>
            <p class="font-bold text-pink-500 text-right mt-2">𝐊𝐡á𝐧𝐡 𝐃𝐮𝐲 𝐛ạ𝐧 𝐭𝐡â𝐧 𝐌𝐲.</p>
        `
    },
    ly: {
        keys: ["thạch như lý", "thach nhu ly", "như lý", "nhu ly", "lý", "ly"],
        header: "Dear Như Lý 💐",
        preview: "Gửi Như Lý",
        content: `
            <p class="font-bold text-pink-600">𝐃𝐞𝐚𝐫 𝐍𝐡ư 𝐋ý 🍀,</p>
            <p>𝐇𝐞𝐲 𝐝𝐨𝐨𝐨 𝐡ô𝐦 𝐧𝐚𝐲 𝐥à 𝟐𝟎/𝟏𝟎 á 𝐜𝐡ề𝐧 , 𝐋â𝐮 𝐫ồ𝐢 𝐭ụ𝐢 𝐦ì𝐧𝐡 𝐡𝐨𝐧𝐠 𝐠ặ𝐩 𝐧𝐡𝐚𝐮 á 𝐛à, 𝐦à 𝐧𝐡â𝐧 𝐝ị𝐩 𝐧à𝐲 𝐭𝐮𝐢 𝐠ử𝐢 𝐧𝐡ữ𝐧𝐠 𝐥ờ𝐢 𝐜𝐡ú𝐜 𝐭𝐮𝐲ệ𝐭 𝐥à 𝐯ờ𝐢 đế𝐧 𝐛à. 𝐂𝐡ú𝐜 𝐛à 𝐥𝐮ô𝐧 𝐥𝐮ô𝐧 𝐥𝐮ô𝐧 𝐱𝐢𝐧𝐡 đẹ𝐩 𝐧𝐡ó 💖, 𝐤𝐡ỏ𝐞 𝐤𝐡ắ𝐧 𝐧ữ𝐚 ⚡.</p>
            <p>𝐓𝐫𝐨𝐧𝐠 𝐭ươ𝐧𝐠 𝐥𝐚𝐢 𝐡𝐚𝐲 𝐡𝐢ệ𝐧 𝐭ạ𝐢 𝐭𝐡ì 𝐡ọ𝐜 𝐭ậ𝐩 𝐥𝐮ô𝐧 𝐬𝐮ô𝐧 𝐬ẻ 𝐠𝐢ỏ𝐢 𝐠𝐢𝐚𝐧𝐠 🎓, 𝐧𝐡ữ𝐧𝐠 𝐭𝐡ứ 𝐭𝐮𝐲ệ𝐭 𝐯ờ𝐢 𝐯à 𝐭𝐡à𝐧𝐡 𝐜ô𝐧𝐠 𝐬ẽ 𝐛𝐚𝐲 𝐯ề 𝐩𝐡í𝐚 𝐛à ✨, 𝐜ò𝐧 𝐧𝐡ữ𝐧𝐠 𝐭𝐡ứ 𝐤𝐡ô𝐧𝐠 𝐨𝐤𝐥𝐚 𝐭𝐡ì 𝐜ú𝐭 𝐜ú𝐭 𝐡ế𝐭 🚀.</p>
            <p>𝐍ó𝐢 𝐜𝐡𝐮𝐧𝐠 𝐥à 𝐜𝐡ú𝐜 𝐦ộ𝐭 𝐧𝐠à𝐲 𝟐𝟎/𝟏𝟎 𝐯𝐮𝐢 𝐯ẻ 𝐧𝐡𝐚𝐚 🎉.</p>
            <p class="font-bold text-pink-500 text-right mt-2">𝐊𝐡á𝐧𝐡 𝐃𝐮𝐲 𝐧𝐠ườ𝐢 𝐛ạ𝐧 𝐭𝐮𝐲ệ𝐭 𝐯ờ𝐢.</p>
        `
    }
};

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

function triggerFloatingNames() {
    stopNameRain();

    const heroTimeout = setTimeout(() => {
        createFloatingHeroName();
    }, 150);
    nameTimeouts.push(heroTimeout);

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
    const lowerName = name.toLowerCase();

    // Kiểm tra tên người nhập thuộc về bức thư nào
    let matchedLetter = null;
    for (const key in lettersData) {
        if (lettersData[key].keys.some(k => lowerName.includes(k))) {
            matchedLetter = lettersData[key];
            break;
        }
    }

    initAudio();
    if (!isPlayingAudio) {
        toggleAudio();
    }

    // Đổi giao diện tùy theo tên
    document.getElementById('personalGreeting').textContent = `${currentUserName} ơi, có một điều đặc biệt dành cho bạn... 💗`;
    document.getElementById('envelopeSubtext').textContent = `Có một lá thư dành riêng cho ${currentUserName} 💌`;

    if (matchedLetter) {
        document.getElementById('letterPreviewName').textContent = matchedLetter.preview;
        document.getElementById('letterHeader').textContent = matchedLetter.header;
        document.getElementById('letterContainer').innerHTML = matchedLetter.content;
    } else {
        document.getElementById('letterPreviewName').textContent = `Gửi ${currentUserName}`;
        document.getElementById('letterHeader').textContent = `Gửi ${currentUserName} 💐`;
        document.getElementById('letterContainer').innerHTML = `
            <p>Nhân ngày 20/10, chúc <span class="userNameText text-pink-600 font-bold">${currentUserName}</span> luôn vui vẻ, hạnh phúc và luôn giữ được nụ cười thật xinh. 🌷</p>
            <p>Mong rằng mỗi ngày của <span class="userNameText text-pink-600 font-bold">${currentUserName}</span> đều có thật nhiều niềm vui, những điều bất ngờ đáng yêu và thật nhiều yêu thương. 💗</p>
            <p>Chúc <span class="userNameText text-pink-600 font-bold">${currentUserName}</span> luôn tự tin, luôn tỏa sáng theo cách riêng của mình và gặp thật nhiều điều tốt đẹp trong cuộc sống. ✨</p>
            <p class="font-bold text-pink-500">Chúc <span class="userNameText text-pink-600">${currentUserName}</span> một ngày 20/10 thật đặc biệt nhé! 🎁🌸</p>
        `;
    }

    const screen1 = document.getElementById('screen1');
    const screen2 = document.getElementById('screen2');

    screen1.classList.add('opacity-0', 'scale-95');
    
    setTimeout(() => {
        screen1.classList.add('hidden');
        screen2.classList.remove('hidden');
        
        setTimeout(() => {
            screen2.classList.remove('opacity-0', 'scale-95');
            screen2.classList.add('opacity-100', 'scale-100');
            triggerFloatingNames();
        }, 50);
    }, 600);
}

// 5. Mở Thư & Pháo hoa
function openEnvelope() {
    const wrapper = document.getElementById('envelopeWrapper');
    if (wrapper.classList.contains('open')) return;

    wrapper.classList.add('open');
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
