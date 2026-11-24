import { KRATHONG_TYPES, PRESET_WISHES } from './krathong.js';
import { SoundEngine } from './audio.js';
import { FireworksEngine } from './fireworks.js';
import { RiverManager } from './river.js';

document.addEventListener('DOMContentLoaded', () => {
  // เริ่มต้นเอนจินต่างๆ
  const fireworksCanvas = document.getElementById('fireworksCanvas');
  const fireworks = new FireworksEngine(fireworksCanvas);
  fireworks.start();

  const sound = new SoundEngine();

  const riverContainer = document.getElementById('riverContainer');
  const riverManager = new RiverManager(riverContainer, handleSelectKrathong);

  // สเตต
  let selectedTypeId = KRATHONG_TYPES[0].id;
  let currentViewedKrathong = null;

  // DOM Elements
  const totalCountEl = document.getElementById('totalCount');
  const btnToggleMusic = document.getElementById('btnToggleMusic');
  const musicIcon = document.getElementById('musicIcon');
  const btnOpenCreate = document.getElementById('btnOpenCreate');
  const btnCloseModal = document.getElementById('btnCloseModal');
  const modalCreate = document.getElementById('modalCreate');
  const formCreateKrathong = document.getElementById('formCreateKrathong');
  const krathongPicker = document.getElementById('krathongPicker');
  const presetWishesWrap = document.getElementById('presetWishesWrap');
  const inputName = document.getElementById('inputName');
  const textareaWish = document.getElementById('textareaWish');
  
  // Modals อื่นๆ
  const modalWishDetail = document.getElementById('modalWishDetail');
  const btnCloseWish = document.getElementById('btnCloseWish');
  const btnLike = document.getElementById('btnLike');
  const likeCountEl = document.getElementById('likeCount');
  const wishOwnerName = document.getElementById('wishOwnerName');
  const wishQuote = document.getElementById('wishQuote');
  const wishAvatar = document.getElementById('wishAvatar');
  const wishTime = document.getElementById('wishTime');

  // Modal Souvenir
  const modalSouvenir = document.getElementById('modalSouvenir');
  const btnCloseSouvenir = document.getElementById('btnCloseSouvenir');
  const btnDownloadCard = document.getElementById('btnDownloadCard');
  const souvenirCard = document.getElementById('souvenirCard');

  // Modal About
  const btnOpenAbout = document.getElementById('btnOpenAbout');
  const modalAbout = document.getElementById('modalAbout');
  const btnCloseAbout = document.getElementById('btnCloseAbout');

  // อัปเดตสถิติจำนวนกระทง
  function updateCounter() {
    if (totalCountEl) {
      totalCountEl.textContent = riverManager.getTotalCount().toLocaleString('th-TH');
    }
  }
  updateCounter();

  // สร้างดาวในท้องฟ้า
  initStars();
  // สร้างโคมลอยประดับ
  initSkyLanterns();

  // สร้างการ์ดเลือกแบบกระทง
  function renderKrathongPicker() {
    krathongPicker.innerHTML = '';
    KRATHONG_TYPES.forEach(type => {
      const card = document.createElement('div');
      card.className = `krathong-choice-card ${type.id === selectedTypeId ? 'selected' : ''}`;
      card.innerHTML = `
        <div style="height: 75px; display: flex; align-items: center; justify-content: center;">
          ${type.renderSvg(80)}
        </div>
        <div class="choice-name">${type.name}</div>
        <div class="choice-meaning">${type.meaning}</div>
      `;
      card.addEventListener('click', () => {
        selectedTypeId = type.id;
        document.querySelectorAll('.krathong-choice-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
      });
      krathongPicker.appendChild(card);
    });
  }
  renderKrathongPicker();

  // สร้างชิปคำอธิษฐานยอดนิยม
  function renderPresetWishes() {
    presetWishesWrap.innerHTML = '';
    PRESET_WISHES.forEach(wish => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'wish-chip';
      chip.textContent = wish.length > 35 ? wish.substring(0, 35) + '...' : wish;
      chip.title = wish;
      chip.addEventListener('click', () => {
        textareaWish.value = wish;
        textareaWish.focus();
      });
      presetWishesWrap.appendChild(chip);
    });
  }
  renderPresetWishes();

  // เปิด/ปิด Modal สร้างกระทง
  btnOpenCreate.addEventListener('click', () => {
    modalCreate.classList.add('active');
    inputName.focus();
  });

  btnCloseModal.addEventListener('click', () => {
    modalCreate.classList.remove('active');
  });

  modalCreate.addEventListener('click', (e) => {
    if (e.target === modalCreate) modalCreate.classList.remove('active');
  });

  // จัดการการส่งฟอร์ม ปล่อยกระทง
  formCreateKrathong.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = inputName.value.trim();
    const wish = textareaWish.value.trim();

    if (!name) {
      alert('กรุณากรอกชื่อผู้ลอยกระทงครับ');
      inputName.focus();
      return;
    }

    if (!wish) {
      alert('กรุณาพิมพ์คำอธิษฐานครับ');
      textareaWish.focus();
      return;
    }

    // เพิ่มกระทงลงน้ำ
    const releasedKrathong = riverManager.addKrathong({
      name,
      wish,
      typeId: selectedTypeId
    });

    updateCounter();

    // เล่นเสียงปล่อยกระทง
    sound.playReleaseSound();

    // จุดพลุเฉลิมฉลอง 3-5 ลูก
    const width = window.innerWidth;
    const height = window.innerHeight;
    for (let i = 0; i < 4; i++) {
      setTimeout(() => {
        fireworks.launch(
          width * 0.5 + (Math.random() * 200 - 100),
          height,
          Math.random() * (width * 0.8) + width * 0.1,
          Math.random() * (height * 0.35) + 60
        );
        sound.playFireworkSound();
      }, i * 350);
    }

    // ปิดหน้าต่างสร้างกระทง
    modalCreate.classList.remove('active');

    // แสดงการ์ดที่ระลึก
    showSouvenirCard(releasedKrathong);

    // ล้างค่าฟอร์ม
    textareaWish.value = '';
  });

  // แสดงการ์ดที่ระลึก (Souvenir Card)
  function showSouvenirCard(k) {
    const typeDef = KRATHONG_TYPES.find(t => t.id === k.typeId) || KRATHONG_TYPES[0];
    const previewContent = document.getElementById('souvenirPreviewContent');
    const dateStr = new Date(k.timestamp).toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    previewContent.innerHTML = `
      <div style="margin: 0 auto 10px; width: 140px; height: 120px; display: flex; align-items: center; justify-content: center;">
        ${typeDef.renderSvg(120)}
      </div>
      <h3 style="color: #ffd166; font-size: 1.3rem; margin-bottom: 4px;">ขอขมาพระแม่คงคาสำเร็จแล้ว</h3>
      <div style="font-size: 1.1rem; font-weight: 600; color: #fff; margin-bottom: 6px;">กระทงของ: ${escapeHtml(k.name)}</div>
      <div style="font-size: 0.85rem; color: #94a3b8; margin-bottom: 14px;">ประเพณีลอยกระทง วันที่ ${dateStr}</div>
      <div style="background: rgba(255,255,255,0.06); border-radius: 10px; padding: 12px 16px; font-size: 0.95rem; color: #f1f5f9; line-height: 1.5; font-style: italic;">
        “${escapeHtml(k.wish)}”
      </div>
    `;

    modalSouvenir.classList.add('active');
  }

  btnCloseSouvenir.addEventListener('click', () => {
    modalSouvenir.classList.remove('active');
  });

  modalSouvenir.addEventListener('click', (e) => {
    if (e.target === modalSouvenir) modalSouvenir.classList.remove('active');
  });

  // บันทึกการ์ดที่ระลึกเป็นไฟล์ภาพ (HTML5 Canvas Drawing)
  btnDownloadCard.addEventListener('click', () => {
    drawAndDownloadCard();
  });

  function drawAndDownloadCard() {
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 700;
    const ctx = canvas.getContext('2d');

    // พื้นหลังท้องฟ้าและแม่น้ำ
    const bgGrad = ctx.createLinearGradient(0, 0, 0, 700);
    bgGrad.addColorStop(0, '#04091a');
    bgGrad.addColorStop(0.5, '#0b1e3d');
    bgGrad.addColorStop(1, '#020914');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 600, 700);

    // กรอบทอง
    ctx.strokeStyle = '#ffd166';
    ctx.lineWidth = 4;
    ctx.strokeRect(20, 20, 560, 660);
    ctx.lineWidth = 1;
    ctx.strokeRect(26, 26, 548, 648);

    // ดวงจันทร์
    const moonGrad = ctx.createRadialGradient(480, 100, 5, 480, 100, 45);
    moonGrad.addColorStop(0, '#fffdf0');
    moonGrad.addColorStop(0.7, '#ffeaa7');
    moonGrad.addColorStop(1, '#f9ca24');
    ctx.fillStyle = moonGrad;
    ctx.beginPath();
    ctx.arc(480, 100, 45, 0, Math.PI * 2);
    ctx.fill();

    // หัวข้อ
    ctx.fillStyle = '#ffd166';
    ctx.font = 'bold 28px Kanit, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('🌕 บัตรที่ระลึก ลอยกระทงออนไลน์', 300, 80);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = '16px Sarabun, sans-serif';
    ctx.fillText('สืบสานประเพณีไทย ขอขมาพระแม่คงคา', 300, 115);

    // ดึงข้อมูลกระทงล่าสุด
    const latestK = riverManager.krathongs[0];
    if (latestK) {
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 22px Kanit, sans-serif';
      ctx.fillText(`กระทงของ: ${latestK.name}`, 300, 420);

      ctx.fillStyle = '#ffd166';
      ctx.font = 'italic 18px Sarabun, sans-serif';
      wrapText(ctx, `“${latestK.wish}”`, 300, 470, 460, 28);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '14px Sarabun, sans-serif';
      ctx.fillText(`วันที่: ${new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}`, 300, 620);
      ctx.fillText('สุขสันต์วันลอยกระทง • Loy Krathong Festival', 300, 645);
    }

    // สร้างลิงก์ดาวน์โหลด
    const link = document.createElement('a');
    link.download = `krathong-souvenir-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }

  function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    let currentY = y;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, x, currentY);
        line = words[n] + ' ';
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, currentY);
  }

  // ดูคำอธิษฐานเมื่อคลิกกระทงในแม่น้ำ
  function handleSelectKrathong(k) {
    currentViewedKrathong = k;
    const typeDef = KRATHONG_TYPES.find(t => t.id === k.typeId) || KRATHONG_TYPES[0];

    wishAvatar.innerHTML = typeDef.renderSvg(120);
    wishOwnerName.textContent = k.name;
    wishQuote.textContent = `“${k.wish}”`;
    likeCountEl.textContent = (k.likes || 1).toLocaleString('th-TH');

    const date = new Date(k.timestamp);
    wishTime.textContent = `ลอยเมื่อ: ${date.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })} น.`;

    modalWishDetail.classList.add('active');
  }

  btnCloseWish.addEventListener('click', () => {
    modalWishDetail.classList.remove('active');
  });

  modalWishDetail.addEventListener('click', (e) => {
    if (e.target === modalWishDetail) modalWishDetail.classList.remove('active');
  });

  // กดปุ่มอนุโมทนาบุญ / หัวใจ
  btnLike.addEventListener('click', () => {
    if (currentViewedKrathong) {
      const newLikes = riverManager.likeKrathong(currentViewedKrathong.id);
      likeCountEl.textContent = newLikes.toLocaleString('th-TH');

      // เอฟเฟกต์หัวใจกระเด้ง
      btnLike.style.transform = 'scale(1.2)';
      setTimeout(() => {
        btnLike.style.transform = 'scale(1)';
      }, 200);
    }
  });

  // เปิด/ปิด Modal ข้อมูล
  btnOpenAbout.addEventListener('click', () => {
    modalAbout.classList.add('active');
  });
  btnCloseAbout.addEventListener('click', () => {
    modalAbout.classList.remove('active');
  });
  modalAbout.addEventListener('click', (e) => {
    if (e.target === modalAbout) modalAbout.classList.remove('active');
  });

  // สลับเสียงเพลง
  btnToggleMusic.addEventListener('click', () => {
    const isPlaying = sound.toggleSound();
    if (isPlaying) {
      musicIcon.textContent = '🔊';
      btnToggleMusic.classList.add('active');
      btnToggleMusic.title = 'ปิดเสียงดนตรี';
    } else {
      musicIcon.textContent = '🔇';
      btnToggleMusic.classList.remove('active');
      btnToggleMusic.title = 'เปิดเสียงดนตรี';
    }
  });

  // คลิกท้องฟ้าเพื่อจุดพลุ
  const skyLayer = document.querySelector('.sky-layer');
  skyLayer.addEventListener('click', (e) => {
    // ป้องกันกรณีคลิกโดนปุ่มหรือเมนู
    if (e.target.closest('.top-header')) return;

    const rect = skyLayer.getBoundingClientRect();
    const targetX = e.clientX;
    const targetY = e.clientY - rect.top;

    fireworks.launch(
      window.innerWidth * 0.5,
      window.innerHeight,
      targetX,
      targetY
    );
    sound.playFireworkSound();
  });

  // ฟังก์ชันสุ่มดวงดาว
  function initStars() {
    const canvas = document.getElementById('starsCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 0.5;

    const stars = [];
    const count = Math.floor(window.innerWidth / 12);

    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random(),
        speed: Math.random() * 0.02 + 0.005
      });
    }

    function renderStars() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        s.alpha += s.speed;
        const currentAlpha = Math.abs(Math.sin(s.alpha));
        ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha * 0.85})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(renderStars);
    }
    renderStars();

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 0.5;
    });
  }

  // ฟังก์ชันสร้างโคมลอยเบาๆ
  function initSkyLanterns() {
    const container = document.getElementById('lanternsContainer');
    if (!container) return;

    for (let i = 0; i < 7; i++) {
      createLantern(container, i * 3);
    }
  }

  function createLantern(container, delay) {
    const lantern = document.createElement('div');
    lantern.className = 'sky-lantern';
    lantern.style.left = `${Math.random() * 90 + 5}%`;
    lantern.style.animationDuration = `${24 + Math.random() * 16}s`;
    lantern.style.animationDelay = `${delay}s`;
    container.appendChild(lantern);
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
});
