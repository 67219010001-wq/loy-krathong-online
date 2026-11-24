import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function testRoute(urlPath) {
  return new Promise((resolve) => {
    let filePath = path.join(__dirname, urlPath === '/' ? 'index.html' : urlPath);
    fs.readFile(filePath, (err, content) => {
      if (err) {
        resolve({ path: urlPath, status: 404, error: err.message });
      } else {
        resolve({ path: urlPath, status: 200, bytes: content.length });
      }
    });
  });
}

const routes = [
  '/',
  '/index.html',
  '/src/css/style.css',
  '/src/css/krathong.css',
  '/src/js/app.js',
  '/src/js/krathong.js',
  '/src/js/river.js',
  '/src/js/audio.js',
  '/src/js/fireworks.js',
  '/public/favicon.svg'
];

Promise.all(routes.map(testRoute)).then(results => {
  console.log('=== Static Route Verification Results ===');
  let allOk = true;
  for (const r of results) {
    console.log(`  ${r.path.padEnd(25)} => Status: ${r.status} (${r.bytes || 0} bytes)`);
    if (r.status !== 200) allOk = false;
  }
  if (allOk) {
    console.log('\n✅ All 10 static assets and modules exist and load perfectly!');
    process.exit(0);
  } else {
    console.log('\n❌ Some files failed to load.');
    process.exit(1);
  }
});
