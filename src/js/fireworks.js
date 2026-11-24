// ระบบพลุดอกไม้ไฟด้วย HTML5 Canvas
export class FireworksEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.rockets = [];
    this.isRunning = false;
    this.resize();

    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.loop();
  }

  stop() {
    this.isRunning = false;
  }

  // จุดพลุขึ้นมาจากด้านล่างไปจุดเป้าหมาย
  launch(startX, startY, targetX, targetY, color = null) {
    const colors = ['#ff007f', '#ffd700', '#00f0ff', '#ff5400', '#70e000', '#b5179e', '#ffffff'];
    const selectedColor = color || colors[Math.floor(Math.random() * colors.length)];
    
    this.rockets.push({
      x: startX || Math.random() * this.canvas.width,
      y: startY || this.canvas.height,
      targetX: targetX || Math.random() * (this.canvas.width * 0.8) + (this.canvas.width * 0.1),
      targetY: targetY || Math.random() * (this.canvas.height * 0.35) + 60,
      color: selectedColor,
      speed: 7 + Math.random() * 4,
      trail: []
    });
  }

  // ระเบิดพลุเป็นประกายดาว
  explode(x, y, color) {
    const particleCount = 45 + Math.floor(Math.random() * 30);
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 / particleCount) * i + (Math.random() * 0.2 - 0.1);
      const speed = Math.random() * 5 + 1.5;
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: color,
        alpha: 1,
        decay: Math.random() * 0.018 + 0.012,
        gravity: 0.07,
        size: Math.random() * 2.5 + 1.5
      });
    }
  }

  loop() {
    if (!this.isRunning) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // วาดและอัปเดตจรวด
    for (let i = this.rockets.length - 1; i >= 0; i--) {
      const r = this.rockets[i];
      const dx = r.targetX - r.x;
      const dy = r.targetY - r.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      r.trail.push({ x: r.x, y: r.y });
      if (r.trail.length > 5) r.trail.shift();

      // วาดหางประกายไฟ
      this.ctx.beginPath();
      this.ctx.strokeStyle = r.color;
      this.ctx.lineWidth = 2.5;
      for (let j = 0; j < r.trail.length - 1; j++) {
        this.ctx.moveTo(r.trail[j].x, r.trail[j].y);
        this.ctx.lineTo(r.trail[j + 1].x, r.trail[j + 1].y);
      }
      this.ctx.stroke();

      if (dist < r.speed || r.y <= r.targetY) {
        this.explode(r.targetX, r.targetY, r.color);
        this.rockets.splice(i, 1);
      } else {
        const angle = Math.atan2(dy, dx);
        r.x += Math.cos(angle) * r.speed;
        r.y += Math.sin(angle) * r.speed;
      }
    }

    // วาดและอัปเดตสะเก็ดประกายไฟ
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, p.alpha);
      this.ctx.fillStyle = p.color;
      this.ctx.shadowBlur = 8;
      this.ctx.shadowColor = p.color;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    requestAnimationFrame(() => this.loop());
  }
}
