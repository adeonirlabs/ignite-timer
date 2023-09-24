/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Roboto Mono', 'monospace'],
      },
      fontSize: {
        '10xl': '10rem',
      },
    },
  },
  darkMode: 'class',
  plugins: [require('tailwind-scrollbar')],
}
