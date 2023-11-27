/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'topcourse-bg01': "url('/images/topcourse-bg01')",
        'topcourse-bg02': "url('/images/topcourse-bg02.png')",
      },
      fontFamily: {
        'custom-sea': ['Yeongdeok Sea', 'sans'],
        'custom-snow-crab': ['Yeongdeok Snow Crab', 'sans'],
      },
      colors: {
        rgba: 'rgba(255, 244, 226, 1.0)',
      },
    },
  },
  plugins: [],
};
