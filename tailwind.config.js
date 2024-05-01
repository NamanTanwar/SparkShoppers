/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.jsx', './src/**/*.js'],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#8B5FBF',
          200: '#61398F',
          300: '#FFFFFF',
        },
        accent: {
          100: '#D6C6E1',
          200: '#9A73B5',
        },
        text: {
          100: '#4A4A4A',
          200: '#878787',
        },
        bg: {
          100: '#F5F3F7',
          200: '#E9E4ED',
          300: '#FFFFFF',
        },
      },
      fill: {
        current: 'currentColor',
      },
    },
  },
  plugins: [],
}

