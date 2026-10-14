/* ===================================================================
   CANVAS PARTICLE ENGINE (REACT EDITION)
   60 FPS Lightweight Physics for Cherry Blossoms, Gold Stardust & Confetti
   =================================================================== */

export class ParticleEngine {
  constructor(canvas) {
    this.canvas = canvas;
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.petals = [];
    this.goldDust = [];
    this.confetti = [];
    this.maxPetals = 28;
    this.maxGoldDust = 35;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.wind = 0;
    this.isDestroyed = false;

    this.resize();
    this.handleResize = () => this.resize();
    window.addEventListener('resize', this.handleResize);
    this.initParticles();
    this.animate = this.animate.bind(this);
    this.animationFrameId = requestAnimationFrame(this.animate);
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    if (this.canvas) {
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    }
  }

  initParticles() {
    for (let i = 0; i < this.maxPetals; i++) {
      this.petals.push(this.createPetal(true));
    }
    for (let i = 0; i < this.maxGoldDust; i++) {
      this.goldDust.push(this.createGoldDust(true));
    }
  }

  createPetal(randomY = false) {
    return {
      x: Math.random() * this.width,
      y: randomY ? Math.random() * this.height : -30,
      size: 10 + Math.random() * 12,
      speedY: 1.0 + Math.random() * 1.5,
      speedX: -0.5 + Math.random() * 1.0,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.03,
      flip: Math.random() * Math.PI,
      flipSpeed: 0.02 + Math.random() * 0.03,
      color: Math.random() > 0.4 ? 'rgba(235, 110, 120, ' : 'rgba(215, 60, 80, ',
      opacity: 0.55 + Math.random() * 0.35,
    };
  }

  createGoldDust(randomY = false) {
    return {
      x: Math.random() * this.width,
      y: randomY ? Math.random() * this.height : this.height + 20,
      radius: 1.0 + Math.random() * 2.2,
      speedY: -0.3 - Math.random() * 0.7,
      speedX: (Math.random() - 0.5) * 0.6,
      opacity: 0.2 + Math.random() * 0.6,
      pulseSpeed: 0.02 + Math.random() * 0.03,
      pulse: Math.random() * Math.PI,
    };
  }

  burstConfetti(originX, originY) {
    const colors = ['#D4AF37', '#DC2626', '#F59E0B', '#EF4444', '#FDE047', '#FFF'];
    const count = 70;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 4 + Math.random() * 10;
      this.confetti.push({
        x: originX || this.width / 2,
        y: originY || this.height / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3,
        size: 5 + Math.random() * 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 12,
        opacity: 1,
        decay: 0.015 + Math.random() * 0.015,
        gravity: 0.25,
      });
    }
  }

  drawPetal(p) {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.scale(Math.cos(p.flip), 1);

    ctx.fillStyle = p.color + p.opacity + ')';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-p.size / 2, -p.size / 2, -p.size, p.size / 3, 0, p.size);
    ctx.bezierCurveTo(p.size, p.size / 3, p.size / 2, -p.size / 2, 0, 0);
    ctx.fill();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(0, 2);
    ctx.lineTo(0, p.size * 0.8);
    ctx.stroke();

    ctx.restore();
  }

  animate() {
    if (this.isDestroyed || !this.ctx) return;
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.wind += 0.005;
    const currentWind = Math.sin(this.wind) * 0.6;

    for (let i = 0; i < this.goldDust.length; i++) {
      const g = this.goldDust[i];
      g.y += g.speedY;
      g.x += g.speedX + currentWind * 0.4;
      g.pulse += g.pulseSpeed;
      const currentOpacity = g.opacity * (0.6 + 0.4 * Math.sin(g.pulse));

      this.ctx.fillStyle = `rgba(212, 175, 55, ${currentOpacity})`;
      this.ctx.beginPath();
      this.ctx.arc(g.x, g.y, g.radius, 0, Math.PI * 2);
      this.ctx.fill();

      this.ctx.fillStyle = `rgba(253, 224, 71, ${currentOpacity * 0.35})`;
      this.ctx.beginPath();
      this.ctx.arc(g.x, g.y, g.radius * 2.2, 0, Math.PI * 2);
      this.ctx.fill();

      if (g.y < -20) {
        this.goldDust[i] = this.createGoldDust(false);
      }
    }

    for (let i = 0; i < this.petals.length; i++) {
      const p = this.petals[i];
      p.y += p.speedY;
      p.x += p.speedX + currentWind;
      p.rot += p.rotSpeed;
      p.flip += p.flipSpeed;

      this.drawPetal(p);

      if (p.y > this.height + 30 || p.x < -30 || p.x > this.width + 30) {
        this.petals[i] = this.createPetal(false);
      }
    }

    for (let i = this.confetti.length - 1; i >= 0; i--) {
      const c = this.confetti[i];
      c.x += c.vx;
      c.y += c.vy;
      c.vy += c.gravity;
      c.rotation += c.rotSpeed;
      c.opacity -= c.decay;

      if (c.opacity <= 0) {
        this.confetti.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.translate(c.x, c.y);
      this.ctx.rotate((c.rotation * Math.PI) / 180);
      this.ctx.fillStyle = c.color;
      this.ctx.globalAlpha = c.opacity;
      this.ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size * 0.6);
      this.ctx.restore();
    }

    this.animationFrameId = requestAnimationFrame(this.animate);
  }

  destroy() {
    this.isDestroyed = true;
    window.removeEventListener('resize', this.handleResize);
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}
