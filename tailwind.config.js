/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  content: ['./layouts/**/*.html'],
  theme: {
    extend: {}
  },
  plugins: [
    require('tailwindcss-aria-attributes')
  ]
}
