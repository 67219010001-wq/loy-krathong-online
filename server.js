// Native Node.js HTTP Server - รันได้ทันทีโดยไม่ต้องติดตั้งแพ็กเกจเสริม
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg'
};

const server = http.createServer((req, res) => {
  // CORS & Security headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  let reqUrl = req.url.split('?')[0];
  if (reqUrl === '/') reqUrl = '/index.html';

  // ตรวจสอบว่ามีโฟลเดอร์ dist หรือไม่ (ถ้ามี ให้เสิร์ฟจาก dist หรือ root)
  let filePath = path.join(__dirname, reqUrl);
  if (!fs.existsSync(filePath) && fs.existsSync(path.join(__dirname, 'dist', reqUrl))) {
    filePath = path.join(__dirname, 'dist', reqUrl);
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // Fallback to index.html for SPA-like navigation
        const indexPath = path.join(__dirname, 'index.html');
        fs.readFile(indexPath, (idxErr, idxContent) => {
          if (idxErr) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('404 Not Found - ไม่พบไฟล์ที่ระบุ');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(idxContent);
          }
        });
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(`500 Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`\n==================================================`);
  console.log(`🌕 เว็บลอยกระทงออนไลน์ พร้อมทำงานแล้ว!`);
  console.log(`🌐 Local Server: http://localhost:${PORT}`);
  console.log(`==================================================\n`);
});
