// ข้อมูลแบบกระทง และ SVG Generator
export const KRATHONG_TYPES = [
  {
    id: 'banana-leaf',
    name: 'กระทงใบตองดั้งเดิม',
    desc: 'ประดับด้วยดอกดาวเรืองสีทอง ดอกบัว และกลีบใบตองพับวิจิตร',
    meaning: 'ขอขมาพระแม่คงคา สืบสานประเพณีไทยอันงดงาม',
    color: '#38b000',
    candleColor: '#ffb703',
    renderSvg: (size = 120) => `
      <svg width="${size}" height="${size}" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" class="krathong-svg">
        <defs>
          <radialGradient id="leafGrad1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#40916c"/>
            <stop offset="70%" stop-color="#2d6a4f"/>
            <stop offset="100%" stop-color="#1b4332"/>
          </radialGradient>
          <linearGradient id="marigoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ffe600"/>
            <stop offset="50%" stop-color="#ff9e00"/>
            <stop offset="100%" stop-color="#ff6000"/>
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="glow"/>
            <feComposite in="SourceGraphic" in2="glow" operator="over"/>
          </filter>
        </defs>
        <!-- เงาสะท้อนผิวน้ำ -->
        <ellipse cx="80" cy="130" rx="60" ry="14" fill="rgba(0,0,0,0.3)" filter="blur(4px)"/>
        
        <!-- ชั้นฐานกระทงใบตองชั้นนอก -->
        <g fill="url(#leafGrad1)" stroke="#1b4332" stroke-width="1.5">
          <!-- กลีบใบตองรอบวง -->
          <path d="M 80 40 L 70 70 L 90 70 Z" transform="rotate(0 80 110)"/>
          <path d="M 80 40 L 70 70 L 90 70 Z" transform="rotate(25 80 110)"/>
          <path d="M 80 40 L 70 70 L 90 70 Z" transform="rotate(50 80 110)"/>
          <path d="M 80 40 L 70 70 L 90 70 Z" transform="rotate(75 80 110)"/>
          <path d="M 80 40 L 70 70 L 90 70 Z" transform="rotate(100 80 110)"/>
          <path d="M 80 40 L 70 70 L 90 70 Z" transform="rotate(-25 80 110)"/>
          <path d="M 80 40 L 70 70 L 90 70 Z" transform="rotate(-50 80 110)"/>
          <path d="M 80 40 L 70 70 L 90 70 Z" transform="rotate(-75 80 110)"/>
          <path d="M 80 40 L 70 70 L 90 70 Z" transform="rotate(-100 80 110)"/>
        </g>
        
        <!-- ฐานกระทงไม้กล้วย -->
        <ellipse cx="80" cy="112" rx="55" ry="18" fill="#52b788" stroke="#1b4332" stroke-width="2"/>
        <ellipse cx="80" cy="108" rx="50" ry="15" fill="#74c69d"/>

        <!-- ดอกดาวเรืองและดอกไม้ประดับ -->
        <g fill="url(#marigoldGrad)" stroke="#d97706" stroke-width="1">
          <circle cx="50" cy="108" r="11"/>
          <circle cx="68" cy="112" r="12"/>
          <circle cx="92" cy="112" r="12"/>
          <circle cx="110" cy="108" r="11"/>
          <circle cx="80" cy="116" r="10"/>
        </g>
        
        <!-- ดอกบัวกลางกระทง -->
        <g fill="#ff70a6" stroke="#c9184a" stroke-width="1">
          <path d="M80 85 C70 95 65 105 80 110 C95 105 90 95 80 85 Z"/>
          <path d="M72 88 C62 96 60 106 72 110 C82 106 80 96 72 88 Z" fill="#ff85a1"/>
          <path d="M88 88 C80 96 78 106 88 110 C100 106 98 96 88 88 Z" fill="#ff85a1"/>
        </g>

        <!-- ธูป 3 ดอก -->
        <line x1="72" y1="42" x2="74" y2="95" stroke="#d97706" stroke-width="2" stroke-linecap="round"/>
        <line x1="76" y1="38" x2="78" y2="95" stroke="#b45309" stroke-width="2" stroke-linecap="round"/>
        <line x1="80" y1="44" x2="82" y2="95" stroke="#d97706" stroke-width="2" stroke-linecap="round"/>
        <!-- ควันธูปเรืองรอง -->
        <circle cx="72" cy="40" r="2.5" fill="#ff4d6d" filter="url(#glow)"/>
        <circle cx="76" cy="36" r="2.5" fill="#ff4d6d" filter="url(#glow)"/>
        <circle cx="80" cy="42" r="2.5" fill="#ff4d6d" filter="url(#glow)"/>

        <!-- เทียนเล่มหลัก -->
        <rect x="83" y="55" width="8" height="42" rx="3" fill="#fff3b0" stroke="#f4a261" stroke-width="1.5"/>
        <line x1="87" y1="55" x2="87" y2="48" stroke="#333" stroke-width="1.5"/>

        <!-- เปลวไฟเทียนกระพริบ -->
        <g class="candle-flame">
          <ellipse cx="87" cy="40" rx="9" ry="14" fill="rgba(255, 183, 3, 0.45)" filter="blur(3px)"/>
          <ellipse cx="87" cy="40" rx="6" ry="11" fill="#ffb703"/>
          <ellipse cx="87" cy="42" rx="3.5" ry="7" fill="#fff"/>
        </g>
      </svg>
    `
  },
  {
    id: 'pink-lotus',
    name: 'กระทงกลีบบัวบานหวานฉ่ำ',
    desc: 'กลีบดอกบัวหลวงสีชมพูละมุน ประดับดอกมะลิบริสุทธิ์',
    meaning: 'เสริมสิริมงคล เมตตามหานิยม ความรักสมหวัง',
    color: '#ff4d6d',
    candleColor: '#ff758f',
    renderSvg: (size = 120) => `
      <svg width="${size}" height="${size}" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" class="krathong-svg">
        <defs>
          <linearGradient id="lotusGrad1" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#c9184a"/>
            <stop offset="60%" stop-color="#ff758f"/>
            <stop offset="100%" stop-color="#ffccd5"/>
          </linearGradient>
          <linearGradient id="lotusGrad2" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#a4133c"/>
            <stop offset="60%" stop-color="#ff4d6d"/>
            <stop offset="100%" stop-color="#fff0f3"/>
          </linearGradient>
        </defs>
        <!-- เงาสะท้อนผิวน้ำ -->
        <ellipse cx="80" cy="130" rx="58" ry="14" fill="rgba(0,0,0,0.3)" filter="blur(4px)"/>

        <!-- ใบตองรองรับชั้นล่าง -->
        <ellipse cx="80" cy="118" rx="62" ry="16" fill="#2d6a4f" opacity="0.9"/>
        
        <!-- กลีบบัวชั้นนอก บานรอบทิศ -->
        <g fill="url(#lotusGrad1)" stroke="#a4133c" stroke-width="1.2">
          <path d="M80 62 C50 85 45 110 80 120 C115 110 110 85 80 62 Z" transform="rotate(-40 80 110)"/>
          <path d="M80 62 C50 85 45 110 80 120 C115 110 110 85 80 62 Z" transform="rotate(40 80 110)"/>
          <path d="M80 62 C50 85 45 110 80 120 C115 110 110 85 80 62 Z" transform="rotate(-20 80 110)"/>
          <path d="M80 62 C50 85 45 110 80 120 C115 110 110 85 80 62 Z" transform="rotate(20 80 110)"/>
        </g>

        <!-- กลีบบัวชั้นใน ประคองเกสร -->
        <g fill="url(#lotusGrad2)" stroke="#590d22" stroke-width="1.2">
          <path d="M80 70 C60 90 58 112 80 118 C102 112 100 90 80 70 Z"/>
          <path d="M70 74 C52 94 56 112 70 118 C84 112 86 94 70 74 Z"/>
          <path d="M90 74 C76 94 74 112 90 118 C104 112 108 94 90 74 Z"/>
        </g>
        
        <!-- ดอกมะลิร้อยรอบเกสร -->
        <g fill="#ffffff" stroke="#cddafd" stroke-width="0.8">
          <circle cx="56" cy="112" r="5"/>
          <circle cx="68" cy="115" r="5"/>
          <circle cx="80" cy="116" r="5.5"/>
          <circle cx="92" cy="115" r="5"/>
          <circle cx="104" cy="112" r="5"/>
        </g>

        <!-- ธูป 3 ดอก -->
        <line x1="73" y1="42" x2="75" y2="92" stroke="#d97706" stroke-width="2"/>
        <line x1="77" y1="36" x2="79" y2="92" stroke="#b45309" stroke-width="2"/>
        <line x1="81" y1="44" x2="83" y2="92" stroke="#d97706" stroke-width="2"/>
        <circle cx="73" cy="40" r="2" fill="#ff4d6d"/>
        <circle cx="77" cy="34" r="2" fill="#ff4d6d"/>
        <circle cx="81" cy="42" r="2" fill="#ff4d6d"/>

        <!-- เทียนสีชมพูอ่อน -->
        <rect x="82" y="55" width="8" height="42" rx="3" fill="#ffe5ec" stroke="#ff758f" stroke-width="1.5"/>
        <line x1="86" y1="55" x2="86" y2="47" stroke="#333" stroke-width="1.5"/>

        <!-- เปลวเทียนชมพูทอง -->
        <g class="candle-flame">
          <ellipse cx="86" cy="38" rx="10" ry="15" fill="rgba(255, 117, 143, 0.5)" filter="blur(3px)"/>
          <ellipse cx="86" cy="39" rx="6" ry="11" fill="#ffb703"/>
          <ellipse cx="86" cy="41" rx="3.5" ry="7" fill="#fff"/>
        </g>
      </svg>
    `
  },
  {
    id: 'coconut-candle',
    name: 'กระทงกะลาสายประทีป',
    desc: 'กะลามะพร้าวขัดมัน ประทีปเทียนขี้ผึ้งธรรมชาติ สว่างไสวกลางสายน้ำ',
    meaning: 'ประทีปส่องปัญญา แสงสว่างนำพาชีวิตสู่ความสุขความเจริญ',
    color: '#8338ec',
    candleColor: '#ffaa00',
    renderSvg: (size = 120) => `
      <svg width="${size}" height="${size}" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" class="krathong-svg">
        <defs>
          <radialGradient id="coconutGrad" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#7f4f24"/>
            <stop offset="60%" stop-color="#582f0e"/>
            <stop offset="100%" stop-color="#331800"/>
          </radialGradient>
          <linearGradient id="waxGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#ffe6a7"/>
            <stop offset="50%" stop-color="#ffb703"/>
            <stop offset="100%" stop-color="#fb8500"/>
          </linearGradient>
        </defs>
        <!-- เงาสะท้อนผิวน้ำ -->
        <ellipse cx="80" cy="132" rx="52" ry="13" fill="rgba(0,0,0,0.3)" filter="blur(4px)"/>

        <!-- กะลามะพร้าวรูปครึ่งวงกลมโค้งมน -->
        <path d="M 32 98 C 32 136 128 136 128 98 C 128 95 32 95 32 98 Z" fill="url(#coconutGrad)" stroke="#2b1402" stroke-width="2"/>
        
        <!-- ปากกะลา และเนื้อเทียนขี้ผึ้งสีเหลืองทอง -->
        <ellipse cx="80" cy="98" rx="46" ry="14" fill="#3a1d04" stroke="#251000" stroke-width="2"/>
        <ellipse cx="80" cy="99" rx="40" ry="11" fill="url(#waxGrad)"/>

        <!-- ดอกไม้ประดับริมขอบกะลา (ดอกรัก / ดอกบานไม่รู้โรย) -->
        <circle cx="42" cy="98" r="4.5" fill="#f72585"/>
        <circle cx="53" cy="103" r="4.5" fill="#7209b7"/>
        <circle cx="68" cy="106" r="4.5" fill="#f72585"/>
        <circle cx="92" cy="106" r="4.5" fill="#f72585"/>
        <circle cx="107" cy="103" r="4.5" fill="#7209b7"/>
        <circle cx="118" cy="98" r="4.5" fill="#f72585"/>

        <!-- ไส้เทียนกลางกะลา -->
        <line x1="80" y1="99" x2="80" y2="68" stroke="#222" stroke-width="3" stroke-linecap="round"/>

        <!-- เปลวไฟประทีปดวงใหญ่ สว่างเจิดจ้า -->
        <g class="candle-flame">
          <circle cx="80" cy="52" r="28" fill="rgba(255, 170, 0, 0.25)" filter="blur(8px)"/>
          <ellipse cx="80" cy="54" rx="14" ry="22" fill="rgba(255, 183, 3, 0.6)" filter="blur(3px)"/>
          <ellipse cx="80" cy="55" rx="8" ry="16" fill="#ffb703"/>
          <ellipse cx="80" cy="58" rx="5" ry="10" fill="#fff3b0"/>
          <ellipse cx="80" cy="62" rx="2.5" ry="5" fill="#ffffff"/>
        </g>
      </svg>
    `
  },
  {
    id: 'bread-eco',
    name: 'กระทงขนมปังรักษ์โลก',
    desc: 'ขนมปังอบรูปปลาคาร์ป อิ่มใจ ได้ทำบุญให้อาหารปลา เป็นมิตรต่อสายน้ำ',
    meaning: 'อนุรักษ์ธรรมชาติ ทานบารมี เกื้อกูลสรรพสัตว์',
    color: '#e76f51',
    candleColor: '#f4a261',
    renderSvg: (size = 120) => `
      <svg width="${size}" height="${size}" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" class="krathong-svg">
        <defs>
          <linearGradient id="breadGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#f4a261"/>
            <stop offset="50%" stop-color="#e76f51"/>
            <stop offset="100%" stop-color="#bc4749"/>
          </linearGradient>
        </defs>
        <!-- เงาสะท้อนผิวน้ำ -->
        <ellipse cx="80" cy="132" rx="54" ry="12" fill="rgba(0,0,0,0.3)" filter="blur(4px)"/>

        <!-- ตัวปลาขนมปัง -->
        <path d="M 30 110 C 25 90 60 78 95 85 C 130 90 145 105 130 120 C 100 135 45 125 30 110 Z" fill="url(#breadGrad)" stroke="#9d0208" stroke-width="2"/>
        
        <!-- หางปลา -->
        <path d="M 30 110 C 15 95 10 88 12 110 C 10 130 18 125 30 110 Z" fill="#f4a261" stroke="#9d0208" stroke-width="1.5"/>

        <!-- ครีบปลาบนและล่าง -->
        <path d="M 70 82 C 78 70 92 72 95 85 Z" fill="#e76f51" stroke="#9d0208" stroke-width="1.5"/>
        <path d="M 75 124 C 82 134 94 132 95 122 Z" fill="#e76f51" stroke="#9d0208" stroke-width="1.5"/>

        <!-- ตาปลาและรอยบากเกล็ดขนมปัง -->
        <circle cx="120" cy="102" r="4.5" fill="#333"/>
        <circle cx="121" cy="101" r="1.5" fill="#fff"/>
        <path d="M 60 100 Q 70 105 60 110" fill="none" stroke="#bc4749" stroke-width="2"/>
        <path d="M 75 97 Q 85 103 75 110" fill="none" stroke="#bc4749" stroke-width="2"/>
        <path d="M 90 99 Q 100 105 90 112" fill="none" stroke="#bc4749" stroke-width="2"/>

        <!-- ธูปและเทียนตั้งบนหลังปลา -->
        <line x1="72" y1="46" x2="74" y2="82" stroke="#d97706" stroke-width="2"/>
        <circle cx="72" cy="44" r="2" fill="#ff4d6d"/>
        <rect x="78" y="55" width="8" height="30" rx="2" fill="#fff3b0" stroke="#f4a261" stroke-width="1.5"/>
        <line x1="82" y1="55" x2="82" y2="48" stroke="#333" stroke-width="1.5"/>

        <!-- เปลวเทียนสว่าง -->
        <g class="candle-flame">
          <ellipse cx="82" cy="39" rx="8" ry="13" fill="rgba(244, 162, 97, 0.5)" filter="blur(3px)"/>
          <ellipse cx="82" cy="40" rx="5" ry="10" fill="#ffb703"/>
          <ellipse cx="82" cy="43" rx="3" ry="6" fill="#fff"/>
        </g>
      </svg>
    `
  },
  {
    id: 'floral-paradise',
    name: 'กระทงพฤกษาสวรรค์หลากสี',
    desc: 'รวมดอกกล้วยไม้ ดอกกุหลาบ และดอกรักสีสดใส งดงามตระการตา',
    meaning: 'ชีวิตสดใสเบ่งบาน ไร้ความทุกข์ มีแต่รอยยิ้มตลอดปี',
    color: '#06d6a0',
    candleColor: '#ffd166',
    renderSvg: (size = 120) => `
      <svg width="${size}" height="${size}" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" class="krathong-svg">
        <defs>
          <linearGradient id="orchidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#b5179e"/>
            <stop offset="70%" stop-color="#7209b7"/>
            <stop offset="100%" stop-color="#3f37c9"/>
          </linearGradient>
        </defs>
        <!-- เงาสะท้อนผิวน้ำ -->
        <ellipse cx="80" cy="130" rx="56" ry="14" fill="rgba(0,0,0,0.3)" filter="blur(4px)"/>

        <!-- ใบตองเขียวสดเป็นฐาน -->
        <ellipse cx="80" cy="115" rx="58" ry="16" fill="#1b4332"/>
        <ellipse cx="80" cy="112" rx="54" ry="14" fill="#2d6a4f"/>

        <!-- พวงดอกกล้วยไม้และดอกกุหลาบหลากสี -->
        <g fill="url(#orchidGrad)">
          <circle cx="48" cy="105" r="11"/>
          <circle cx="112" cy="105" r="11"/>
        </g>
        <!-- ดอกกุหลาบแดง -->
        <g fill="#e63946">
          <circle cx="62" cy="112" r="10"/>
          <circle cx="98" cy="112" r="10"/>
        </g>
        <!-- ดอกดาวเรืองสดใสตรงกลาง -->
        <g fill="#ffd166">
          <circle cx="80" cy="114" r="12"/>
        </g>
        
        <!-- ดอกรักประดับแทรก -->
        <circle cx="45" cy="116" r="4" fill="#f8f9fa"/>
        <circle cx="70" cy="120" r="4" fill="#f8f9fa"/>
        <circle cx="90" cy="120" r="4" fill="#f8f9fa"/>
        <circle cx="115" cy="116" r="4" fill="#f8f9fa"/>

        <!-- ธูป 3 ดอก -->
        <line x1="72" y1="40" x2="75" y2="92" stroke="#d97706" stroke-width="2"/>
        <line x1="76" y1="35" x2="78" y2="92" stroke="#b45309" stroke-width="2"/>
        <line x1="80" y1="42" x2="82" y2="92" stroke="#d97706" stroke-width="2"/>
        <circle cx="72" cy="38" r="2" fill="#ff4d6d"/>
        <circle cx="76" cy="33" r="2" fill="#ff4d6d"/>
        <circle cx="80" cy="40" r="2" fill="#ff4d6d"/>

        <!-- เทียนทอง -->
        <rect x="82" y="55" width="8" height="42" rx="3" fill="#ffeaa7" stroke="#fdcb6e" stroke-width="1.5"/>
        <line x1="86" y1="55" x2="86" y2="48" stroke="#333" stroke-width="1.5"/>

        <!-- เปลวไฟเทียนสว่างไสว -->
        <g class="candle-flame">
          <ellipse cx="86" cy="38" rx="9" ry="14" fill="rgba(255, 209, 102, 0.5)" filter="blur(3px)"/>
          <ellipse cx="86" cy="39" rx="6" ry="11" fill="#ff9e00"/>
          <ellipse cx="86" cy="42" rx="3.5" ry="6" fill="#fff"/>
        </g>
      </svg>
    `
  },
  {
    id: 'golden-glory',
    name: 'กระทงสุวรรณรัศมี (สีทองมงคล)',
    desc: 'ลวดลายกนกไทยเปล่งประกายทองคำ แสงออร่าสิริมงคลสูงสุด',
    meaning: 'มั่งคั่ง ร่ำรวย โชคลาภเงินทองไหลมาเทมาดั่งสายน้ำ',
    color: '#ffb703',
    candleColor: '#ffd700',
    renderSvg: (size = 120) => `
      <svg width="${size}" height="${size}" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" class="krathong-svg">
        <defs>
          <linearGradient id="goldGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#fff3b0"/>
            <stop offset="35%" stop-color="#ffd166"/>
            <stop offset="70%" stop-color="#ffb703"/>
            <stop offset="100%" stop-color="#fb8500"/>
          </linearGradient>
          <radialGradient id="auraGold" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="rgba(255, 215, 0, 0.6)"/>
            <stop offset="70%" stop-color="rgba(255, 183, 3, 0.15)"/>
            <stop offset="100%" stop-color="transparent"/>
          </radialGradient>
        </defs>
        <!-- ออร่าแสงสีทอง -->
        <circle cx="80" cy="85" r="65" fill="url(#auraGold)"/>

        <!-- เงาสะท้อนผิวน้ำ -->
        <ellipse cx="80" cy="132" rx="58" ry="14" fill="rgba(0,0,0,0.3)" filter="blur(4px)"/>

        <!-- กลีบกระทงทองคำลวดลายไทย -->
        <g fill="url(#goldGrad1)" stroke="#d48b00" stroke-width="1.2">
          <path d="M 80 48 Q 62 82 80 115 Q 98 82 80 48 Z" transform="rotate(-45 80 110)"/>
          <path d="M 80 48 Q 62 82 80 115 Q 98 82 80 48 Z" transform="rotate(45 80 110)"/>
          <path d="M 80 48 Q 62 82 80 115 Q 98 82 80 48 Z" transform="rotate(-25 80 110)"/>
          <path d="M 80 48 Q 62 82 80 115 Q 98 82 80 48 Z" transform="rotate(25 80 110)"/>
          <path d="M 80 48 Q 62 82 80 115 Q 98 82 80 48 Z"/>
        </g>

        <!-- ฐานกระทงพานทอง -->
        <ellipse cx="80" cy="116" rx="50" ry="15" fill="url(#goldGrad1)" stroke="#b57300" stroke-width="1.5"/>
        <ellipse cx="80" cy="113" rx="44" ry="12" fill="#fff3b0"/>

        <!-- แก้วสารพัดนึกตรงกลาง -->
        <circle cx="80" cy="113" r="10" fill="#fff" stroke="#ffb703" stroke-width="2"/>
        <circle cx="80" cy="113" r="6" fill="#ffd166"/>

        <!-- ธูปทอง 3 ดอก -->
        <line x1="72" y1="36" x2="74" y2="92" stroke="#ffb703" stroke-width="2"/>
        <line x1="76" y1="30" x2="78" y2="92" stroke="#ffd166" stroke-width="2"/>
        <line x1="80" y1="38" x2="82" y2="92" stroke="#ffb703" stroke-width="2"/>
        <circle cx="72" cy="34" r="2.5" fill="#ff4d6d"/>
        <circle cx="76" cy="28" r="2.5" fill="#ff4d6d"/>
        <circle cx="80" cy="36" r="2.5" fill="#ff4d6d"/>

        <!-- เทียนทองคำเปลว -->
        <rect x="83" y="48" width="8" height="48" rx="3" fill="#ffffff" stroke="#ffb703" stroke-width="1.5"/>
        <line x1="87" y1="48" x2="87" y2="40" stroke="#333" stroke-width="1.5"/>

        <!-- เปลวไฟทองคำสว่างจ้า -->
        <g class="candle-flame">
          <circle cx="87" cy="30" r="24" fill="rgba(255, 215, 0, 0.3)" filter="blur(6px)"/>
          <ellipse cx="87" cy="32" rx="10" ry="16" fill="#ffd700"/>
          <ellipse cx="87" cy="34" rx="6" ry="11" fill="#fff3b0"/>
          <ellipse cx="87" cy="37" rx="3.5" ry="6" fill="#ffffff"/>
        </g>
      </svg>
    `
  }
];

// ข้อความคำอธิษฐานยอดนิยม เพื่อความสะดวกรวดเร็ว
export const PRESET_WISHES = [
  "ขอขมาพระแม่คงคา ขอให้ชีวิตมีความสุข ความเจริญรุ่งเรือง ร่มเย็นเป็นสุข",
  "ขอให้สุขภาพร่างกายแข็งแรง ปราศจากโรคภัยไข้เจ็บ ครอบครัวอบอุ่น",
  "ขอให้การเรียนและการทำงานประสบความสำเร็จ สมหวังทุกประการ เกรด 4 ทุกวิชา!",
  "ขอให้พบเจอแต่มิตรแท้ ความรักที่ดี มีแต่สิ่งดีๆ เข้ามาในชีวิต",
  "ขอปล่อยความทุกข์ ความเศร้า สิ่งไม่ดีให้ลอยไปกับสายน้ำ เริ่มต้นชีวิตใหม่สดใส"
];

// ข้อมูลกระทงเริ่มต้นในสายน้ำ (Community Krathongs)
export const DEFAULT_KRATHONGS = [
  {
    id: 'k-def-1',
    name: 'น้องแก้วตา',
    wish: 'ขอให้ปีนี้สอบติดคณะที่หวัง ขอให้ครอบครัวมีแต่ความสุขค่ะ 🌸',
    typeId: 'pink-lotus',
    timestamp: Date.now() - 1000 * 60 * 15,
    likes: 12,
    xPercent: 18,
    yPercent: 42,
    scale: 0.85,
    speed: 0.12
  },
  {
    id: 'k-def-2',
    name: 'พี่ต้นกล้า',
    wish: 'ขอขมาพระแม่คงคา และขอให้หน้าที่การงานก้าวหน้า ปังๆ ตลอดปีครับ ✨',
    typeId: 'banana-leaf',
    timestamp: Date.now() - 1000 * 60 * 25,
    likes: 24,
    xPercent: 62,
    yPercent: 55,
    scale: 0.95,
    speed: 0.14
  },
  {
    id: 'k-def-3',
    name: 'สายบุญรักษ์โลก',
    wish: 'ลอยกระทงขนมปัง ขอให้อนุรักษ์สายน้ำสะอาด สัตว์น้ำแข็งแรง ปลอดภัย 🍞🐟',
    typeId: 'bread-eco',
    timestamp: Date.now() - 1000 * 60 * 8,
    likes: 31,
    xPercent: 38,
    yPercent: 68,
    scale: 1.05,
    speed: 0.16
  },
  {
    id: 'k-def-4',
    name: 'คุณยายสมใจ',
    wish: 'ขอให้ลูกหลานทุกคนมีสุขภาพแข็งแรง ร่ำรวยเงินทอง ไร้โรคภัย 🌕',
    typeId: 'golden-glory',
    timestamp: Date.now() - 1000 * 60 * 40,
    likes: 19,
    xPercent: 82,
    yPercent: 36,
    scale: 0.75,
    speed: 0.1
  }
];
