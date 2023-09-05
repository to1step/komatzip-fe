/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        custom: ['Yeongdeok Snow Crab', 'sans'],
      },
      colors: {
        'bg-colors': '#FFF4E2',
      },
    },
  },
  plugins: [],
};
