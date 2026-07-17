const page = document.getElementById('page');
const loader = document.getElementById('loader');
const beginButton = document.getElementById('beginButton');
const musicSection = document.getElementById('musicSection');
const countdownSection = document.getElementById('countdownSection');
const envelopeSection = document.getElementById('envelopeSection');
const letterSection = document.getElementById('letterSection');
const messageSection = document.getElementById('messageSection');
const heroSection = document.getElementById('heroSection');
const gallerySection = document.getElementById('gallerySection');
const reasonsSection = document.getElementById('reasonsSection');
const cakeSection = document.getElementById('cakeSection');
const fireworksSection = document.getElementById('fireworksSection');
const promiseSection = document.getElementById('promiseSection');
const secretSection = document.getElementById('secretSection');
const progressBar = document.getElementById('progressBar');
const backToTop = document.getElementById('backToTop');
const confettiCanvas = document.getElementById('confettiCanvas');
const particleLayer = document.querySelector('.particle-layer');
const envelope = document.getElementById('envelope');
const openEnvelopeBtn = document.getElementById('openEnvelopeBtn');
const letterText = document.getElementById('letterText');
const messageTitle = document.getElementById('messageTitle');
const messageText = document.getElementById('messageText');
const galleryGrid = document.getElementById('galleryGrid');
const reasonsGrid = document.getElementById('reasonsGrid');
const blowButton = document.getElementById('blowButton');
const knife = document.getElementById('knife');
const cakeScene = document.getElementById('cakeScene');
const secretCopy = document.getElementById('secretCopy');
const musicToggle = document.getElementById('musicToggle');
const volumeRange = document.getElementById('volumeRange');
const musicTrack = document.getElementById('musicTrack');
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

let audioContext;
let oscillator;
let gainNode;
let musicPlaying = false;
let countdownInterval;
let cakeCut = false;
let knifeDragging = false;
let knifeStartX = 0;
let knifeOffset = 0;

const letterLines = [
  'Every moment with you feels like a story written just for us.',
  'Your laugh warms my days and your love makes everything brighter.',
  'Even when we are apart, I carry the smallest details of you with me.',
  'Distance only proves how strong what we share really is.',
  'Today is your day, and I want you to feel how much I cherish you.',
  'Happy Birthday, Shree. I love you today, tomorrow, and every day after.'
];

const birthdayMessage = [
  'Today I celebrate the most beautiful person in my life.',
  'You are the joy that makes ordinary days feel extraordinary.',
  'I believe every wish you make tonight will come true.',
  'Our love is closer than any distance and It is forever.'
];

const galleryItems = [
  { src: 'assets/images/gallery-1.jpg', label: 'Warm moment' },
  { src: 'assets/images/gallery-2.jpg', label: 'She' },
  { src: 'assets/images/gallery-3.jpg', label: 'Her kiss' },
  { src: 'assets/images/gallery-4.jpg', label: 'Together time' },
  { src: 'assets/images/gallery-5.jpg', label: 'Sweet memory' },
  { src: 'assets/images/gallery-6.jpg', label: 'Heartfelt day' }
];

const reasons = [
  'Your smile brightens every room.',
  'Your kindness is effortless.',
  'You make ordinary moments magical.',
  'Your laughter is my favorite sound.',
  'You are stronger than any challenge.',
  'Your curiosity inspires me.',
  'You love with all your heart.',
  'You make me feel safe.',
  'Your presence make me feel happy',
  'You are endlessly thoughtful.',
  'Your grace is unforgettable.',
  'You create warmth wherever you go.',
  'Your joy floods my heart.',
  'You are beautifully genuine.',
  'Your eyes light up the night.',
  'Talking with you feels like home.',
  'Your creativity surprises me.',
  'You make me a better person.',
  'Your courage looks effortless.',
  'You are the kindest soul.',
  'Your dreams are worth chasing.',
  'You laugh like sunshine.',
  'Your voice is my favorite melody.',
  'You make every memory special.',
  'Your hugs feel like magic.',
  'You inspire me every day.',
  'Your heart is wildly beautiful.',
  'You are gentle and fierce.',
  'Your trust means everything.',
  'You make our love feel infinite.',
  'Your warmth is my comfort.',
  'You are precious to me.',
  'Your goodness shines bright.',
  'You are my favorite adventure.',
  'Your spirit feels so free.',
  'You are my sweetest thought.',
  'Your Lovableness never ends.',
  'You are a wonder to behold.',
  'Your presence is a gift.',
  'You sparkle in every moment.',
  'Your love is my anchor.',
  'You make the world softer.',
  'Your bravery inspires me.',
  'You are beautiful inside and out as well.',
  'Your laughter heals me.',
  'You bring color to my life.',
  'Your patience is precious.',
  'You are exactly who I need.',
  'Your trust feels sacred.',
  'You are the warmth of my soul.'
];

const secretLines = [
  'Look up at the sky tonight...',
  'Even though 1500 km separates us...',
  'We\'re still beneath the same stars.',
  'Distance can separate our hands...',
  'But never our hearts.',
  'I Love You Forever ❤️'
];

function fadeOutLoader() {
  loader.style.opacity = '0';
  setTimeout(() => {
    loader.style.display = 'none';
    page.classList.remove('hidden');
  }, 700);
}

function setupAudio() {
  if (!musicTrack) return;
  musicTrack.volume = parseFloat(volumeRange.value);
  musicTrack.addEventListener('ended', () => {
    musicTrack.currentTime = 0;
    musicTrack.play();
  });
  musicTrack.addEventListener('error', () => {
    if (!musicPlaying) {
      createTone();
      updateMusicButton();
    }
  });
}

function createTone() {
  if (audioContext) return;
  audioContext = new (window.AudioContext || window.webkitAudioContext)();
  oscillator = audioContext.createOscillator();
  gainNode = audioContext.createGain();
  oscillator.type = 'triangle';
  oscillator.frequency.value = 220;
  gainNode.gain.value = 0;
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  oscillator.start();
  gainNode.gain.exponentialRampToValueAtTime(0.15, audioContext.currentTime + 1.2);
}

function playAudio() {
  if (musicTrack && !musicTrack.error) {
    musicTrack.play().catch(() => {});
  } else {
    createTone();
  }
  musicPlaying = true;
  updateMusicButton();
}

function pauseAudio() {
  if (musicTrack && !musicTrack.error) {
    musicTrack.pause();
  }
  if (gainNode) {
    gainNode.gain.setTargetAtTime(0.0001, audioContext.currentTime, 0.2);
  }
  musicPlaying = false;
  updateMusicButton();
}

function toggleMusic() {
  if (!musicPlaying) {
    playAudio();
  } else {
    pauseAudio();
  }
}

function updateMusicButton() {
  if (musicPlaying) {
    musicToggle.innerHTML = '<i class="fa-solid fa-pause"></i> Pause';
  } else {
    musicToggle.innerHTML = '<i class="fa-solid fa-play"></i> Play';
  }
}

function setVolume(value) {
  if (musicTrack && !musicTrack.error) {
    musicTrack.volume = value;
  }
  if (gainNode) {
    gainNode.gain.setTargetAtTime(value * 0.18, audioContext.currentTime, 0.05);
  }
}

function launchConfetti(amount = 120) {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: amount,
      spread: 100,
      startVelocity: 30,
      gravity: 0.8,
      ticks: 180,
      origin: { y: 0.65 }
    });
  }
}

function createGallery() {
  galleryItems.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'gallery-item';
    card.innerHTML = `<img src="${item.src}" alt="${item.label}" loading="lazy"><div class="gallery-label">${item.label}</div>`;
    card.addEventListener('click', () => openLightbox(item));
    galleryGrid.appendChild(card);
  });
}

function openLightbox(item) {
  let lightbox = document.querySelector('.lightbox');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <div class="lightbox-content">
        <img alt="Memory">
        <button class="lightbox-close"><i class="fa-solid fa-xmark"></i></button>
      </div>`;
    document.body.appendChild(lightbox);
    lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.classList.remove('active'));
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) lightbox.classList.remove('active');
    });
  }
  const img = lightbox.querySelector('img');
  img.src = item.src;
  img.alt = item.label;
  lightbox.classList.add('active');
}

function createReasons() {
  reasons.forEach((text, index) => {
    const card = document.createElement('div');
    card.className = 'reason-card';
    card.innerHTML = `<h3>${String(index + 1).padStart(2, '0')}</h3><p>${text}</p>`;
    reasonsGrid.appendChild(card);
  });
}

function updateCountdown() {
  const now = new Date();
  const year = now.getFullYear();
  let target = new Date(`${year}-07-18T00:00:00`);
  if (target <= now) {
    target = new Date(`${year + 1}-07-18T00:00:00`);
  }
  const diff = target - now;
  if (diff <= 0) {
    daysEl.textContent = '00';
    hoursEl.textContent = '00';
    minutesEl.textContent = '00';
    secondsEl.textContent = '00';
    countdownFinished();
    return;
  }
  const seconds = Math.floor((diff / 1000) % 60);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  daysEl.textContent = String(days).padStart(2, '0');
  hoursEl.textContent = String(hours).padStart(2, '0');
  minutesEl.textContent = String(minutes).padStart(2, '0');
  secondsEl.textContent = String(seconds).padStart(2, '0');
}

function countdownFinished() {
  document.body.classList.add('countdown-finished');
  launchConfetti(220);
  const title = countdownSection.querySelector('h2');
  title.textContent = '🎉 Happy Birthday Shree 🎉';
  if (typeof gsap !== 'undefined') {
    gsap.fromTo(countdownSection, { x: -8 }, { x: 8, duration: 0.08, yoyo: true, repeat: 8, ease: 'power2.inOut' });
  }
}

function revealLetter() {
  letterText.innerHTML = '';
  letterLines.forEach((line, index) => {
    const row = document.createElement('p');
    row.textContent = line;
    row.style.opacity = '0';
    row.style.transform = 'translateY(8px)';
    row.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    letterText.appendChild(row);
    setTimeout(() => {
      row.style.opacity = '1';
      row.style.transform = 'translateY(0)';
    }, 140 * index + 220);
  });
  showSection(letterSection);
  showSection(messageSection);
  setTimeout(() => typeMessage(), 900);
}

function typeMessage() {
  messageText.textContent = '';
  const text = birthdayMessage.join(' ');
  let index = 0;
  const interval = setInterval(() => {
    if (index >= text.length) {
      clearInterval(interval);
      return;
    }
    messageText.textContent += text[index];
    index += 1;
  }, 28);
}

function showSection(element) {
  if (!element) return;
  element.classList.remove('hidden');
}

function scrollProgress() {
  const scrollTop = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = `${(scrollTop / maxScroll) * 100}%`;
  backToTop.classList.toggle('visible', scrollTop > 300);
}

function createParticle(x, y) {
  const particle = document.createElement('div');
  particle.className = 'ui-particle';
  particle.style.left = `${x}px`;
  particle.style.top = `${y}px`;
  particleLayer.appendChild(particle);
  particle.animate([
    { opacity: 1, transform: 'translateY(0) scale(1)' },
    { opacity: 0, transform: 'translateY(-46px) scale(0.2)' }
  ], { duration: 650, easing: 'ease-out' }).onfinish = () => particle.remove();
}

function setupPointerEffects() {
  window.addEventListener('pointermove', (event) => {
    if (window.innerWidth < 900) return;
    if (Math.random() > 0.93) createParticle(event.clientX, event.clientY);
  });
  window.addEventListener('touchstart', (event) => {
    const touch = event.touches[0];
    if (!touch) return;
    createParticle(touch.clientX, touch.clientY);
  }, { passive: true });
}

function setupKnifeDrag() {
  knife.addEventListener('pointerdown', (event) => {
    if (cakeCut) return;
    knifeDragging = true;
    knifeStartX = event.clientX;
    knife.setPointerCapture(event.pointerId);
  });

  knife.addEventListener('pointermove', (event) => {
    if (!knifeDragging) return;
    knifeOffset = Math.min(Math.max(event.clientX - knifeStartX, -40), 150);
    knife.style.transform = `translateX(${knifeOffset}px)`;
  });

  knife.addEventListener('pointerup', () => {
    if (!knifeDragging) return;
    knifeDragging = false;
    if (knifeOffset > 100) {
      cutCakeInteraction();
    }
    knife.style.transform = 'translateX(0px)';
  });
}

function cutCakeInteraction() {
  if (cakeCut) return;
  cakeCut = true;
  cakeScene.classList.add('cake-cut');
  document.querySelector('.candles').classList.add('candles-blown');
  blowButton.disabled = true;
  blowButton.textContent = 'Wish Made!';
  generateSmoke();
  showFloatingHearts();
  launchConfetti(180);
  if (!musicPlaying) playAudio();
  setTimeout(() => {
    renderPromise();
    updateSecret();
  }, 900);
}

function generateSmoke() {
  for (let i = 0; i < 6; i += 1) {
    setTimeout(() => {
      const smoke = document.createElement('div');
      smoke.className = 'smoke-puff';
      smoke.style.left = `${160 + Math.random() * 40}px`;
      smoke.style.bottom = '128px';
      cakeScene.appendChild(smoke);
      smoke.addEventListener('animationend', () => smoke.remove());
    }, i * 140);
  }
}

function showFloatingHearts() {
  for (let i = 0; i < 8; i += 1) {
    const heart = document.createElement('div');
    heart.className = 'balloon';
    heart.style.width = '36px';
    heart.style.height = '36px';
    heart.style.left = `${40 + Math.random() * 40}%`;
    heart.style.bottom = '80px';
    heart.style.background = 'radial-gradient(circle at 30% 20%, #fff 30%, transparent 31%), radial-gradient(circle at 70% 20%, #fff 30%, transparent 31%), #ff4d88';
    heart.style.borderRadius = '52% 52% 48% 48%';
    heart.style.opacity = '1';
    heart.style.transform = `rotate(${Math.random() * 40 - 20}deg)`;
    cakeScene.appendChild(heart);
    heart.animate([
      { transform: heart.style.transform, opacity: 1 },
      { transform: `translateY(-140px) ${heart.style.transform}`, opacity: 0 }
    ], { duration: 1500 + Math.random() * 300, easing: 'ease-out' }).onfinish = () => heart.remove();
  }
}

function renderPromise() {
  promiseSection.querySelector('.promise-text').innerHTML = `
    <p>No matter how many kilometres separate us,</p>
    <p>my heart will always find its way to you.</p>
    <p>Happy Birthday My Shree ❤️</p>`;
}

function renderSecretEnding() {
  secretCopy.innerHTML = '';
  secretLines.forEach((line, index) => {
    const p = document.createElement('p');
    p.textContent = line;
    p.style.opacity = '0';
    p.style.transform = 'translateY(18px)';
    p.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    secretCopy.appendChild(p);
    setTimeout(() => {
      p.style.opacity = '1';
      p.style.transform = 'translateY(0)';
    }, 500 + index * 700);
  });
}

function updateSecret() {
  secretSection.classList.remove('hidden');
  renderSecretEnding();
}

function animateSectionsOnStart() {
  [musicSection, countdownSection, envelopeSection, heroSection, gallerySection, reasonsSection, cakeSection, fireworksSection, promiseSection, secretSection].forEach((section, idx) => {
    setTimeout(() => section.classList.remove('hidden'), 220 * idx);
  });
}

function init() {
  setupAudio();
  createGallery();
  createReasons();
  setupPointerEffects();
  setupKnifeDrag();
  fadeOutLoader();
  countdownInterval = setInterval(updateCountdown, 1000);
  updateCountdown();
  animateSectionsOnStart();
}

beginButton.addEventListener('click', () => {
  showSection(musicSection);
  if (!musicPlaying) playAudio();
});

openEnvelopeBtn.addEventListener('click', () => {
  envelope.classList.toggle('open');
  if (envelope.classList.contains('open')) {
    openEnvelopeBtn.textContent = 'Close the Envelope';
    revealLetter();
    showSection(letterSection);
    showSection(messageSection);
  } else {
    openEnvelopeBtn.textContent = 'Open the Envelope';
  }
});

blowButton.addEventListener('click', () => {
  if (!cakeCut) {
    document.querySelector('.candles').classList.add('candles-blown');
    generateSmoke();
    setTimeout(() => {
      cutCakeInteraction();
    }, 800);
  }
});

volumeRange.addEventListener('input', (event) => setVolume(event.target.value));
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
window.addEventListener('scroll', scrollProgress);
window.addEventListener('load', init);
