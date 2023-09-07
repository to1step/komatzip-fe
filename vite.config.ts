// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      // 다른 설정은 생략하고 normalize.css만 추가
      additionalData: `@import "normalize.css";`,
    },
  },
  server: {
    port: 3000,
  },
});
