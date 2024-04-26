/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  content: ['./layouts/**/*.html'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'doit-blue': {
          '50': '#f2f9fd',
          '100': '#e4f2fa',
          '200': '#c2e5f5',
          '300': '#8cd2ed',
          '400': '#55bde2',
          '500': '#28a2cf',
          '600': '#1a83af',
          '700': '#16688e',
          '800': '#165876',
          '900': '#184a62',
          '950': '#102f41',
          'light': '#2d96bd',
          'dark': '#55bde2',
        },
        'doit-grey': {
          '50': '#f4f6f7',
          '100': '#e2e8eb',
          '200': '#c8d3d9',
          '300': '#a2b3be',
          '400': '#758c9b',
          '500': '#5a7180',
          '600': '#4d5f6d',
          '700': '#43505b',
          '800': '#3c454e',
          '900': '#353c44',
          '950': '#20252b',
        },
        'fgColor-default' : 'var(--fgColor-default)',
        'fgColor-secondary' : 'var(--fgColor-secondary)',
        'fgColor-muted' : 'var(--fgColor-muted)',
        'fgColor-link' : 'var(--fgColor-link)',
        'fgColor-link-hover' : 'var(--fgColor-link-hover)',
        'bgColor-default' : 'var(--bgColor-default)',
        'bgColor-secondary' : 'var(--bgColor-secondary)',
        'bgColor-accent-emphasis' : 'var(--bgColor-accent-emphasis)',
        'bgColor-accent-muted' : 'var(--bgColor-accent-muted)',
        'borderColor-default' : 'var(--borderColor-default)',
        'selection-bgColor' : 'var(--selection-bgColor)',
        'button-default-bgColor-rest' : 'var(--button-default-bgColor-rest)',
        'button-default-bgColor-hover' : 'var(--button-default-bgColor-hover)',
      }
    }
  },
  plugins: [
    require('tailwindcss-aria-attributes')
  ]
}
