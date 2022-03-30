import renderMathInElement from 'katex/dist/contrib/auto-render'

if (window.config?.math) {
  // ignore comment section if exists
  // https://github.com/HEIGE-PCloud/DoIt/issues/487
  if (document.getElementsByClassName('comment')) {
    window.config.math.ignoredClasses = ['comment']
  }
  renderMathInElement(document.body, window.config.math)
}
