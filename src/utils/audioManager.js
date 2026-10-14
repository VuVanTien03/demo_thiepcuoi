/* ===================================================================
   AUDIO ENGINE (REACT EDITION)
   Web Audio API - Wax crack, paper unseal, Asian chimes & Guzheng melody
   =================================================================== */

class AudioManager {
  constructor() {
    this.ctx = null;
    this.isPlayingMusic = false;
    this.musicTimer = null;
    this.masterGain = null;
    this.musicGain = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.8, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      this.musicGain.connect(this.masterGain);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
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
    if (this.isPlayingMusic) return;
    this.isPlayingMusic = true;

    const scale = [
      261.63, 293.66, 329.63, 392.00, 440.00,
      523.25, 587.33, 659.25, 783.99, 880.00,
      1046.50
    ];

    const melody = [
      { n: 5, d: 0.6 }, { n: 6, d: 0.6 }, { n: 8, d: 0.8 }, { n: 7, d: 0.6 },
      { n: 8, d: 1.2 }, { n: 4, d: 0.6 }, { n: 5, d: 0.6 }, { n: 7, d: 0.8 },
      { n: 6, d: 1.4 }, { n: 7, d: 0.5 }, { n: 8, d: 0.5 }, { n: 9, d: 0.8 },
      { n: 8, d: 0.6 }, { n: 6, d: 0.6 }, { n: 5, d: 1.5 }
    ];

    let noteIdx = 0;
    const playNext = () => {
      if (!this.isPlayingMusic) return;

      const item = melody[noteIdx];
      const freq = scale[item.n];
      const duration = item.d;

      this.pluckGuzheng(freq, duration);

      if (noteIdx % 4 === 0) {
        this.pluckGuzheng(scale[item.n % 3], duration * 1.5, 0.15);
      }

      noteIdx = (noteIdx + 1) % melody.length;
      this.musicTimer = setTimeout(playNext, duration * 850);
    };

    playNext();
  }

  pluckGuzheng(freq, duration, customGain = 0.28) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, t);

    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.linearRampToValueAtTime(customGain, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + duration * 1.6);

    osc.connect(gain);
    gain.connect(this.musicGain);

    osc.start(t);
    osc.stop(t + duration * 1.7);
  }

  stopAmbientMusic() {
    this.isPlayingMusic = false;
    if (this.musicTimer) {
      clearTimeout(this.musicTimer);
      this.musicTimer = null;
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
