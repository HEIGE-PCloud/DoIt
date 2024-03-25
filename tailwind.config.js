/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  content: ['./layouts/**/*.html'],
  darkMode: 'class',
  theme: {
    extend: {}
  },
  plugins: [
    require('tailwindcss-aria-attributes')
  ]
}
