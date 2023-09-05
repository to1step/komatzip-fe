/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        custom: ['Yeongdeok Snow Crab', 'sans'],
      },
      backgroundColor: {
        'bg-rgba': 'rgba(255, 244, 226, 1.0)',
      },
    },
  },
  plugins: [],
};
