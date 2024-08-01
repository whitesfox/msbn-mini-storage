/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: { 
      colors: {
        customGreen: '#196432',
      },
      screens: {
        xs: '384px',
        desktop: '1140px'
      },
      fontFamily: {
        inter: 'Inter'
      }
    },
  },
  plugins: [],
};
