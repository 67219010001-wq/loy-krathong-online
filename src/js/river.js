// จัดการการลอยของกระทงในแม่น้ำ และการโต้ตอบคลิกดูคำอธิษฐาน
import { KRATHONG_TYPES, DEFAULT_KRATHONGS } from './krathong.js';

const STORAGE_KEY = 'loy_krathong_data_v1';

export class RiverManager {
  constructor(riverContainer, onSelectKrathong) {
    this.container = riverContainer;
    this.onSelectKrathong = onSelectKrathong;
    this.krathongs = [];
    this.activeElements = new Map();
    this.animationFrameId = null;

    this.loadKrathongs();
  }

  loadKrathongs() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        this.krathongs = JSON.parse(saved);
      } else {
        this.krathongs = [...DEFAULT_KRATHONGS];
        this.saveKrathongs();
      }
    } catch (e) {
      this.krathongs = [...DEFAULT_KRATHONGS];
    }
    this.renderAll();
  }

  saveKrathongs() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.krathongs));
    } catch (e) {
      console.warn('Storage save failed:', e);
    }
  }

  addKrathong(data) {
    const newK = {
      id: 'k-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
      name: data.name || 'ผู้มีจิตศรัทธา',
      wish: data.wish || 'ขอขมาพระแม่คงคา และขอให้มีแต่ความสุขความเจริญ',
      typeId: data.typeId || 'banana-leaf',
      timestamp: Date.now(),
      likes: 1,
      // ตำแหน่งเริ่มต้นเมื่อปล่อย: ลอยจากกลางล่าง หรือสุ่มโซนล่าง
      xPercent: 42 + (Math.random() * 16 - 8),
      yPercent: 78,
      scale: 1.15,
      speed: 0.12 + Math.random() * 0.08,
      wobbleOffset: Math.random() * Math.PI * 2
    };

    this.krathongs.unshift(newK);
    this.saveKrathongs();
    this.createElement(newK, true);
    return newK;
  }

  renderAll() {
    this.container.innerHTML = '';
    this.activeElements.clear();

    this.krathongs.forEach(k => {
      this.createElement(k, false);
    });

    this.startAnimation();
  }

  createElement(k, isJustReleased = false) {
    const typeDef = KRATHONG_TYPES.find(t => t.id === k.typeId) || KRATHONG_TYPES[0];
    const el = document.createElement('div');
    el.className = 'river-krathong';
    el.id = k.id;
    el.setAttribute('role', 'button');
    el.setAttribute('tabindex', '0');
    el.setAttribute('aria-label', `กระทงของ ${k.name}`);

    // ขนาดพื้นฐาน
    const baseSize = 130 * (k.scale || 1);
    el.innerHTML = `
      <div class="krathong-wrapper ${isJustReleased ? 'just-released' : ''}">
        ${typeDef.renderSvg(baseSize)}
        <div class="krathong-nametag">${this.escapeHtml(k.name)}</div>
      </div>
    `;

    // คำนวณตำแหน่ง
    el.style.left = `${k.xPercent}%`;
    el.style.top = `${k.yPercent}%`;
    el.style.zIndex = Math.floor(k.yPercent * 10);

    // คลิกเพื่อดูคำอธิษฐาน
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      this.onSelectKrathong(k);
    });

    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.onSelectKrathong(k);
      }
    });

    this.container.appendChild(el);
    this.activeElements.set(k.id, {
      el,
      data: k,
      phase: k.wobbleOffset || Math.random() * 10
    });
  }

  // Animation Loop ให้กระทงลอยตามสายน้ำอย่างเป็นธรรมชาติ
  startAnimation() {
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);

    const animate = () => {
      const now = performance.now() * 0.001;

      this.activeElements.forEach(({ el, data, phase }) => {
        // ให้กระทงค่อยๆ ลอยไปทางขวาช้าๆ และไหลตามน้ำ
        data.xPercent += (data.speed || 0.1) * 0.06;

        // วนกลับมาเมื่อลอยพ้นขอบจอขวา
        if (data.xPercent > 105) {
          data.xPercent = -15;
          data.yPercent = 25 + Math.random() * 55;
          data.scale = 0.65 + (data.yPercent / 100) * 0.55;
        }

        // คลื่นไหวขึ้นลงซ้ายขวาเบาๆ (Sinusoidal bobbing)
        const wobbleY = Math.sin(now * 1.5 + phase) * 4;
        const wobbleX = Math.cos(now * 0.8 + phase) * 2;
        const wobbleRot = Math.sin(now * 1.2 + phase) * 3;

        el.style.left = `${data.xPercent}%`;
        el.style.top = `${data.yPercent}%`;
        el.style.transform = `translate(${wobbleX}px, ${wobbleY}px) rotate(${wobbleRot}deg)`;
        el.style.zIndex = Math.floor(data.yPercent * 10);
      });

      this.animationFrameId = requestAnimationFrame(animate);
    };

    animate();
  }

  likeKrathong(id) {
    const k = this.krathongs.find(item => item.id === id);
    if (k) {
      k.likes = (k.likes || 0) + 1;
      this.saveKrathongs();
      return k.likes;
    }
    return 1;
  }

  getTotalCount() {
    return this.krathongs.length;
  }

  escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
}
