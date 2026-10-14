/* ===================================================================
   AUDIO ENGINE (REACT EDITION)
   Background Music: Rước Nàng (Remix)
   Web Audio API - Wax crack, paper unseal, Asian chimes & Coin drops
   =================================================================== */

class AudioManager {
  constructor() {
    this.ctx = null;
    this.isPlayingMusic = false;
    this.masterGain = null;
    this.bgMusic = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.85, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.initAudio();
  }

  initAudio() {
    if (!this.bgMusic) {
      // Primary clean URI in public/assets/audio/
      this.bgMusic = new Audio('/assets/audio/Rước Nàng (Remix).mp3');
      this.bgMusic.loop = true;
      this.bgMusic.volume = 0.6;
      this.bgMusic.preload = 'auto';

      // Fallback in case of path issue
      this.bgMusic.addEventListener('error', () => {
        console.warn('Audio primary path error, falling back to root mp3 path');
        if (this.bgMusic.src.includes('ruoc_nang_remix.mp3')) {
          this.bgMusic.src = encodeURI('/Rước Nàng (Remix. ).mp3');
          this.bgMusic.load();
        }
      });
    }
  }

  playWaxCrack() {
    this.init();
    const t = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 0.15;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.18));
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1400, t);
    filter.Q.setValueAtTime(3, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.9, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    noise.start(t);
  }

  playPaperSlide() {
    this.init();
    const t = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 0.4;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.sin((i / bufferSize) * Math.PI);
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, t);
    filter.frequency.linearRampToValueAtTime(1400, t + 0.2);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, t);
    gain.gain.linearRampToValueAtTime(0.4, t + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    noise.start(t);
  }

  playCelebrationChime() {
    this.init();
    const notes = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50];
    const t = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t + idx * 0.08);

      gain.gain.setValueAtTime(0.001, t + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.35, t + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.08 + 1.2);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t + idx * 0.08);
      osc.stop(t + idx * 0.08 + 1.3);
    });
  }

  playChime() {
    this.playCelebrationChime();
  }

  playCoinSound() {
    this.init();
    const t = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sine';
    osc2.type = 'triangle';
    osc1.frequency.setValueAtTime(1975.53, t);
    osc2.frequency.setValueAtTime(2637.02, t + 0.08);

    gain.gain.setValueAtTime(0.4, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.8);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.masterGain);

    osc1.start(t);
    osc2.start(t + 0.08);
    osc1.stop(t + 0.8);
    osc2.stop(t + 0.8);
  }

  startAmbientMusic() {
    this.init();
    this.isPlayingMusic = true;

    if (this.bgMusic) {
      const playPromise = this.bgMusic.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn('Audio play was prevented by browser autoplay policy:', error);
        });
      }
    }
  }

  stopAmbientMusic() {
    this.isPlayingMusic = false;
    if (this.bgMusic) {
      this.bgMusic.pause();
    }
  }

  toggleMusic() {
    if (this.isPlayingMusic) {
      this.stopAmbientMusic();
      return false;
    } else {
      this.startAmbientMusic();
      return true;
    }
  }
}

export const audioManager = new AudioManager();
