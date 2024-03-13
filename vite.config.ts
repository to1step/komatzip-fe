import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      additionalData: `@import "normalize.css";`,
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api/v1': {
        target: 'http://komatzip.kkyungvelyy.com',
        changeOrigin: true,
      },
    },
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    'process.env.KAKAO_JAVASCRIPT_KEY': JSON.stringify(
      process.env.KAKAO_JAVASCRIPT_KEY || '',
    ),
  },
});
