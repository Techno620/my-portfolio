import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api/hackerrank': {
        target: 'https://www.hackerrank.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/hackerrank/, '/rest/hackers'),
        headers: {
          Origin: 'https://www.hackerrank.com',
          Referer: 'https://www.hackerrank.com/',
        },
      },
    },
    hmr: {
      overlay: true
    }
  }
});
