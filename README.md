# 🌕 เว็บลอยกระทงออนไลน์ (Online Loy Krathong Festival)

เว็บแอปพลิเคชันลอยกระทงออนไลน์ที่ช่วยให้ทุกคนสามารถร่วมสืบสานประเพณีไทย ขอขมาพระแม่คงคา ได้ทุกที่ทุกเวลา พร้อมร่วมรณรงค์ลดขยะในแม่น้ำลำคลองอย่างยั่งยืน

![Loy Krathong Online](public/favicon.svg)

---

## 🎯 ฟีเจอร์เด่นของเว็บไซต์ (Features)

1. **เลือกแบบกระทงได้หลากหลาย (Custom Krathong Selection)**
   - 🌿 **กระทงใบตองดั้งเดิม**: ประดับดอกดาวเรือง ดอกบัว และกลีบใบตองพับวิจิตร
   - 🌸 **กระทงกลีบบัวบานหวานฉ่ำ**: กลีบดอกบัวหลวงสีชมพูละมุน ประดับดอกมะลิบริสุทธิ์
   - 🥥 **กระทงกะลาสายประทีป**: กะลามะพร้าวขัดมัน ประทีปเทียนขี้ผึ้งธรรมชาติ สว่างไสว
   - 🍞 **กระทงขนมปังรักษ์โลก**: รูปปลาคาร์ป อิ่มใจ ได้ทำบุญให้อาหารปลา
   - 🌺 **กระทงพฤกษาสวรรค์หลากสี**: รวมดอกกล้วยไม้ ดอกกุหลาบ และดอกรักสีสดใส
   - ✨ **กระทงสุวรรณรัศมี (สีทองมงคล)**: ลวดลายกนกไทย เปล่งประกายทองคำสิริมงคล

2. **ระบบกรอกชื่อและคำอธิษฐาน (Name & Wish System)**
   - กรอกชื่อผู้ลอยกระทง
   - พิมพ์คำอธิษฐานส่วนตัว หรือเลือก "คำอธิษฐานยอดนิยมมงคล" ได้สะดวกรวดเร็วในคลิกเดียว

3. **แอนิเมชันสายน้ำและแสงเทียนสมจริง (River Physics & Candle Simulation)**
   - เปลวเทียนกระพริบไหว (Flickering Candle Flame) และควันธูปเรืองรอง
   - กระทงลอยแกว่งไหวตามคลื่นน้ำและกระแสน้ำอย่างเป็นธรรมชาติ (Sinusoidal Bobbing)
   - พระจันทร์เต็มดวง แสงสะท้อนจันทร์บนผิวน้ำ และดวงดาวระยิบระยับ

4. **การมีปฏิสัมพันธ์กับชุมชน (Community Interactions)**
   - สามารถคลิกที่กระทงในแม่น้ำเพื่ออ่านชื่อและคำอธิษฐานของผู้อื่น
   - ปุ่ม **"❤️ ร่วมอนุโมทนาบุญ"** เพื่อส่งกำลังใจให้เจ้าของกระทง

5. **ระบบจุดพลุดอกไม้ไฟ (Interactive Fireworks)**
   - คลิกที่ผืนฟ้ายามค่ำคืนเพื่อยิงพลุเฉลิมฉลองแสงสีตระการตา
   - จุดพลุอัตโนมัติเมื่อปล่อยกระทงสำเร็จ

6. **ระบบเสียงดนตรีไทยสังเคราะห์ (Web Audio API)**
   - ทำนองเพลง "วันเพ็ญเดือนสิบสอง" (เพลงลอยกระทง) สังเคราะห์ด้วยโค้ดล้วน
   - ไม่ต้องพึ่งพาไฟล์เสียงภายนอก หมดปัญหาลิงก์เสียหรือโหลดไม่ขึ้น

7. **สร้างและบันทึกบัตรที่ระลึก (Souvenir Card Generator)**
   - สร้างการ์ดที่ระลึกการลอยกระทง พร้อมชื่อและคำอธิษฐาน
   - ดาวน์โหลดเป็นการ์ดภาพ PNG เพื่อแชร์ลงโซเชียลมีเดียได้ทันที

---

## 💻 วิธีทดสอบรันบนเครื่องด้วย Node.js (Local Development)

ตรวจสอบว่าในเครื่องติดตั้ง **Node.js** แล้ว (เวอร์ชัน 18 ขึ้นไป)

### วิธีที่ 1: รันด้วยคำสั่ง Node.js ทันที (ไม่ต้องติดตั้งแพ็กเกจเสริม)
```bash
# 1. เข้าไปที่โฟลเดอร์โปรเจกต์
cd loy-krathong-online

# 2. สั่งรันเซิร์ฟเวอร์
node server.js
```
เปิดเบราว์เซอร์แล้วเข้าไปที่: **`http://localhost:3000`**

---

### วิธีที่ 2: รันผ่าน Vite Development Server (มาตรฐาน Modern Web)
```bash
# 1. ติดตั้ง Dependencies (ครั้งแรกครั้งเดียว)
npm install

# 2. เริ่มต้นรันเซิร์ฟเวอร์ Dev
npm run dev
```
เปิดเบราว์เซอร์ตามลิงก์ที่แสดงบนหน้าจอ (เช่น `http://localhost:5173` หรือ `http://localhost:3000`)

---

### วิธีที่ 3: Build ทดสอบผลลัพธ์ Production
```bash
# สร้างไฟล์ static สำหรับ deploy
npm run build

# ทดสอบรันไฟล์ที่ build แล้ว
npm run preview
```

---

## 🚀 วิธีอัปโหลดโค้ดขึ้น GitHub และเปิดใช้งาน GitHub Pages

### ขั้นตอนที่ 1: สร้าง Repository บน GitHub
1. เข้าไปที่เว็บไซต์ [GitHub](https://github.com) แล้วเข้าสู่ระบบ
2. คลิกปุ่ม **"New"** (หรือเครื่องหมาย `+` มุมขวาบน) เพื่อสร้าง Repository ใหม่
3. ตั้งชื่อ Repository เช่น: `loy-krathong-online`
4. เลือกการตั้งค่าเป็น **Public**
5. **ไม่ต้อง** ติ๊กช่อง "Add a README file" (เพราะในโปรเจกต์มีแล้ว)
6. คลิกปุ่ม **"Create repository"**

---

### ขั้นตอนที่ 2: อัปโหลดโค้ดขึ้น GitHub ผ่าน Terminal / Command Prompt
เปิด Terminal ในโฟลเดอร์ `loy-krathong-online` แล้วพิมพ์คำสั่งดังนี้:

```bash
# 1. กำหนดค่าเริ่มต้น Git (ถ้ายังไม่ได้ทำ)
git init

# 2. เพิ่มไฟล์ทั้งหมดเข้าสู่ staging
git add .

# 3. บันทึก Commit แรก
git commit -m "feat: complete Loy Krathong Online web application"

# 4. ตั้งชื่อ Branch หลักเป็น main
git branch -M main

# 5. เชื่อมต่อกับ Repository บน GitHub (เปลี่ยน <USERNAME> เป็นชื่อผู้ใช้ของคุณ)
git remote add origin https://github.com/<USERNAME>/loy-krathong-online.git

# 6. Push โค้ดขึ้นสู่ GitHub
git push -u origin main
```

*(หมายเหตุ: หาก Git สอบถามชื่อผู้ใช้และรหัสผ่าน ให้เข้าสู่ระบบด้วย Personal Access Token หรือ GitHub Authentication)*

---

### ขั้นตอนที่ 3: เปิดใช้งาน GitHub Pages เพื่อให้หน้าเว็บออนไลน์จริง

ในโปรเจกต์นี้ มีการตั้งค่า **GitHub Actions CI/CD** ไว้ในโฟลเดอร์ `.github/workflows/deploy.yml` เรียบร้อยแล้ว ซึ่งช่วยให้เว็บ Deploy อัตโนมัติทุกครั้งที่ Push โค้ด!

**ขั้นตอนการเปิดใช้ GitHub Actions บนหน้าเว็บ GitHub:**
1. เข้าไปที่ Repository ของคุณบน GitHub: `https://github.com/<USERNAME>/loy-krathong-online`
2. คลิกแท็บ **"Settings"** (รูปฟันเฟืองด้านบน)
3. เมนูด้านซ้าย เลือก **"Pages"** (ในหมวด Code and automation)
4. ในหัวข้อ **"Build and deployment"** -> **Source**:
   - เปลี่ยนจาก *Deploy from a branch* เป็น **"GitHub Actions"**
5. รอประมาณ 1-2 นาที เมื่อระบบประมวลผลเสร็จ จะแสดง URL สีเขียวด้านบน เช่น:
   ```
   https://<USERNAME>.github.io/loy-krathong-online/
   ```
6. สามารถคลิกที่ลิงก์ดังกล่าวเพื่อเปิดดูหน้าเว็บลอยกระทงออนไลน์ได้จากทุกที่ในโลก!

---

## 📁 โครงสร้างโปรเจกต์ (Project Structure)

```
loy-krathong-online/
├── index.html                  # หน้าเว็บหลัก (HTML5 Semantic)
├── package.json                # ข้อมูลโปรเจกต์และ npm scripts
├── server.js                   # Node.js Native HTTP Server (รันได้ทันทีโดยไม่ต้องลงแพ็กเกจ)
├── vite.config.js              # การตั้งค่า Vite เพื่อรองรับ GitHub Pages (base: './')
├── .gitignore                  # กำหนดไฟล์ที่ไม่ต้องส่งขึ้น Git
├── README.md                   # คู่มือแนะนำการใช้งานและการ Deploy
├── .github/
│   └── workflows/
│       └── deploy.yml          # ระบบ Deploy อัตโนมัติขึ้น GitHub Pages
├── public/
│   └── favicon.svg             # ไอคอนกระทงเรืองแสง
└── src/
    ├── css/
    │   ├── style.css           # สไตล์ธีมกลางคืน พระจันทร์ แม่น้ำ และหน้าต่างลอย
    │   └── krathong.css        # สไตล์แสงเทียนกระพริบ และแอนิเมชันคลื่นน้ำ
    └── js/
        ├── app.js              # ตัวควบคุมหลัก ฟอร์ม การคลิก และระบบบันทึกการ์ด
        ├── krathong.js         # ข้อมูลแบบกระทง 6 รูปแบบ และภาพ SVG วิจิตร
        ├── river.js            # ระบบฟิสิกส์การลอยของกระทงในแม่น้ำ และ LocalStorage
        ├── audio.js            # ระบบเสียงดนตรีไทยสังเคราะห์ (Web Audio API)
        └── fireworks.js        # ระบบพลุดอกไม้ไฟแคนวาส (Canvas Fireworks)
```

---

## 🛠️ รายละเอียดเทคโนโลยีที่ใช้ (Tech Stack)
- **Frontend**: HTML5, CSS3 Glassmorphism, Vanilla JavaScript (ES Modules)
- **Visuals**: SVG Vector Graphics, Canvas 2D API (Fireworks & Stars)
- **Audio**: Web Audio API (Synthesized Thai Melodies & Sound Effects)
- **Storage**: LocalStorage API (บันทึกข้อมูลกระทงแบบ Offline)
- **Backend / Tooling**: Node.js Native HTTP Server, Vite Bundler
- **Deployment & CI/CD**: GitHub Actions, GitHub Pages

---

🌕 *ขอให้ทุกท่านมีความสุขในเทศกาลวันลอยกระทง สุขภาพแข็งแรง ร่ำรวยเงินทอง และสมหวังทุกประการ*
