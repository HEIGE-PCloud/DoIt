import renderMathInElement from 'katex/dist/contrib/auto-render'

if (window.config?.math && document.getElementById('content')) {
  renderMathInElement(document.getElementById('content'), window.config.math)
}
