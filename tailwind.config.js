/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'hogwarts-red': '#740001',
        'hogwarts-gold': '#D3A625',
        'gryffindor-red': '#AE0001',
        'slytherin-green': '#1A472A',
        'ravenclaw-blue': '#0E1A40',
        'hufflepuff-yellow': '#FFD800',
      },
      fontFamily: {
        'magic': ['Tangerine', 'cursive'],
        'spell': ['Poppins', 'sans-serif'],
        'korean': ['Gowun Batang', 'serif'],
        'korean-title': ['Nanum Myeongjo', 'serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'sparkle': 'sparkle 1.5s linear infinite',
        'wand-wave': 'wandWave 2s ease-in-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        sparkle: {
          '0%, 100%': { opacity: 0 },
          '50%': { opacity: 1 },
        },
        wandWave: {
          '0%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-5deg)' },
          '75%': { transform: 'rotate(5deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
      },
    },
  },
  plugins: [],
} 