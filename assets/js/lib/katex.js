import renderMathInElement from 'katex/dist/contrib/auto-render'

if (window.config?.math) renderMathInElement(document.getElementById('content'), window.config.math)
