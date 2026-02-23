
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        midnight: '#0A0A0F',
        charcoal: '#141420',
        lavender: '#9B8EC4',
        violet: {
          deep: '#6B5FA0',
          glow: '#7C6FB0',
        },
        offwhite: '#F0EDE8',
        muted: '#8A8A9A',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      boxShadow: {
        'glow': '0 0 20px rgba(155, 142, 196, 0.15)',
        'glow-strong': '0 0 30px rgba(155, 142, 196, 0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
