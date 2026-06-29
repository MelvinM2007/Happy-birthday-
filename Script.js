// 1. OPEN ENVELOPE INTRO SCREEN
function openEnvelope() {
    const envelope = document.querySelector('.envelope');
    envelope.classList.add('open');
    
    // Smooth transition into the main dashboard after the letter slide effect
    setTimeout(() => {
        document.getElementById('intro-screen').classList.add('hidden');
        document.getElementById('main-content').classList.remove('hidden');
        // Start spawning balloons silently in the background game panel
        initGame();
    }, 1200);
}

// 2. TAB SYSTEM NAVIGATION OPTIONS
function switchTab(tabId) {
    // Hide all tabs
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => {
        content.classList.add('hidden-tab');
        content.classList.remove('active-tab');
    });
    
    // Show selected tab
    const activeTab = document.getElementById(tabId);
    activeTab.classList.remove('hidden-tab');
    activeTab.classList.add('active-tab');
}

// 3. LIGHTBOX GALLERY POPUP
function openLightbox(src, captionText) {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');
    
    lightbox.style.display = 'flex';
    img.src = src;
    caption.textContent = captionText;
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

// 4. REASONS MATRIX SELECTOR
function showReason(title, message) {
    const displayBox = document.getElementById('reason-display-box');
    const titleElement = document.getElementById('reason-title');
    const textElement = document.getElementById('reason-text');
    
    titleElement.textContent = title;
    textElement.textContent = message;
    
    // Visual update bounce animation
    displayBox.style.transform = 'scale(1.02)';
    setTimeout(() => displayBox.style.transform = 'scale(1)', 200);
}

// 5. BALLOON GAME & FINAL WISH TRIGGER
let score = 0;
const targetScore = 5;
const colors = ['#ff477e', '#ff758f', '#ff85a1', '#fbb1bd', '#ff99c8'];

function initGame() {
    const container = document.getElementById('balloon-container');
    
    // Spawn a balloon automatically every 1.2 seconds
    setInterval(() => {
        if(score < targetScore) {
            createBalloon(container);
        }
    }, 1200);
}

function createBalloon(container) {
    const balloon = document.createElement('div');
    balloon.classList.add('balloon');
    
    // Custom random setup for styling variety
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomLeft = Math.floor(Math.random() * 85); // stay within bounding box
    const randomSpeed = (Math.random() * 2) + 3; // between 3s and 5s
    
    balloon.style.backgroundColor = randomColor;
    balloon.style.left = randomLeft + '%';
    balloon.style.animationDuration = randomSpeed + 's';
    
    // Interaction Event
    balloon.addEventListener('click', () => {
        popBalloon(balloon);
    });
    
    container.appendChild(balloon);
    
    // Remove if it floats away entirely without getting clicked
    setTimeout(() => {
        if(balloon.parentNode) {
            balloon.remove();
        }
    }, randomSpeed * 1000);
}

function popBalloon(balloon) {
    balloon.remove();
    score++;
    document.getElementById('score').textContent = score;
    
    if (score === targetScore) {
        triggerFinalSurprise();
    }
}

function triggerFinalSurprise() {
    document.getElementById('final-modal').classList.remove('hidden');
}

function closeFinalModal() {
    document.getElementById('final-modal').classList.add('hidden');
}
