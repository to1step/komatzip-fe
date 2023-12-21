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
    proxy: {
      '/api/v1': {
        target: 'https://api.to1step.shop',
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
