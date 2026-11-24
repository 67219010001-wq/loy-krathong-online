// ระบบเสียงดนตรีไทยสังเคราะห์และเอฟเฟกต์ด้วย Web Audio API (ไม่ต้องโหลดไฟล์ภายนอก)
export class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = true;
    this.isPlayingMelody = false;
    this.melodyTimer = null;
    this.noteIndex = 0;

    // ทำนองเพลงลอยกระทง (Pentatonic Scale สไตล์ดนตรีไทยระนาดเอก/ขลุ่ย)
    // โน้ต: C4, D4, E4, G4, A4, C5, D5, E5
    this.frequencies = {
      'C4': 261.63,
      'D4': 293.66,
      'E4': 329.63,
      'G4': 392.00,
      'A4': 440.00,
      'C5': 523.25,
      'D5': 587.33,
      'E5': 659.25,
      'G5': 783.99,
      '-': 0 // หยุดพัก
    };

    // เพลงวันเพ็ญเดือนสิบสอง น้ำก็นองเต็มตลิ่ง...
    this.melody = [
      // วันเพ็ญเดือนสิบสอง
      { note: 'G4', dur: 0.35 }, { note: 'A4', dur: 0.35 }, { note: 'C5', dur: 0.5 }, { note: 'A4', dur: 0.35 },
      { note: 'G4', dur: 0.7 }, { note: '-', dur: 0.2 },
      // น้ำก็นองเต็มตลิ่ง
      { note: 'E4', dur: 0.35 }, { note: 'G4', dur: 0.35 }, { note: 'A4', dur: 0.5 }, { note: 'G4', dur: 0.35 },
      { note: 'E4', dur: 0.7 }, { note: '-', dur: 0.2 },
      // เราทั้งหลายชายหญิง
      { note: 'D4', dur: 0.35 }, { note: 'E4', dur: 0.35 }, { note: 'G4', dur: 0.5 }, { note: 'E4', dur: 0.35 },
      { note: 'D4', dur: 0.7 }, { note: '-', dur: 0.2 },
      // สนุกกันจริงวันลอยกระทง
      { note: 'C4', dur: 0.35 }, { note: 'D4', dur: 0.35 }, { note: 'E4', dur: 0.35 }, { note: 'G4', dur: 0.35 },
      { note: 'A4', dur: 0.5 }, { note: 'C5', dur: 0.8 }, { note: '-', dur: 0.4 },
      // ลอย ลอยกระทง ลอย ลอยกระทง
      { note: 'C5', dur: 0.5 }, { note: 'A4', dur: 0.35 }, { note: 'G4', dur: 0.6 },
      { note: 'C5', dur: 0.5 }, { note: 'A4', dur: 0.35 }, { note: 'G4', dur: 0.6 },
      // บุญจะส่งให้เราสุขใจ
      { note: 'E4', dur: 0.35 }, { note: 'G4', dur: 0.35 }, { note: 'A4', dur: 0.5 }, { note: 'G4', dur: 0.35 },
      { note: 'E4', dur: 0.4 }, { note: 'D4', dur: 0.4 }, { note: 'C4', dur: 1.0 }, { note: '-', dur: 0.6 }
    ];
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleSound() {
    this.initContext();
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopMelody();
    } else {
      this.startMelody();
    }
    return !this.isMuted;
  }

  // เล่นเสียงเครื่องสาย/ระนาดไทยสังเคราะห์ (Ranat / Thai Bell chime)
  playNote(freq, duration) {
    if (this.isMuted || !this.ctx || freq <= 0) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    // ผสมคลื่น Sine และ Triangle ให้ความรู้สึกนุ่มนวลแบบระนาดทอง/กระดิ่ง
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);

    // Envelope เสียงเคาะระนาด (Attack เร็ว และค่อยๆ ดังกังวาน)
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration + 0.4);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.5);
  }

  startMelody() {
    if (this.isMuted) return;
    this.isPlayingMelody = true;
    this.noteIndex = 0;
    this.playNextMelodyNote();
  }

  playNextMelodyNote() {
    if (!this.isPlayingMelody || this.isMuted) return;

    const current = this.melody[this.noteIndex];
    const freq = this.frequencies[current.note] || 0;
    
    if (freq > 0) {
      this.playNote(freq, current.dur);
    }

    this.noteIndex = (this.noteIndex + 1) % this.melody.length;
    this.melodyTimer = setTimeout(() => {
      this.playNextMelodyNote();
    }, current.dur * 1000);
  }

  stopMelody() {
    this.isPlayingMelody = false;
    if (this.melodyTimer) {
      clearTimeout(this.melodyTimer);
      this.melodyTimer = null;
    }
  }

  // เสียงตอนปล่อยกระทงลงน้ำ (เสียงน้ำกระเพื่อม + ระนาดก้อง)
  playReleaseSound() {
    if (this.isMuted || !this.ctx) return;
    const now = this.ctx.currentTime;

    // เสียงคอร์ดมงคล
    const chord = [523.25, 659.25, 783.99]; // C5, E5, G5
    chord.forEach((freq, idx) => {
      setTimeout(() => {
        this.playNote(freq, 0.8);
      }, idx * 120);
    });
  }

  // เสียงจุดพลุ
  playFireworkSound() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(380, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.3);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.35);
    } catch (e) {
      // Ignored
    }
  }
}
