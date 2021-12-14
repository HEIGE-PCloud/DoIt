import renderMathInElement from 'katex/dist/contrib/auto-render'

if (window.config.math) renderMathInElement(document.body, window.config.math)
