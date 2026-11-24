import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // รองรับการ deploy ขึ้น GitHub Pages ใน subpath ของ repository
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true
  }
});
