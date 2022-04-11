import mermaid from 'mermaid'

const mermaidElements = document.getElementsByClassName('mermaid')
if (mermaidElements.length) {
  const theme = window.isDark ? 'dark' : 'default'
  mermaid.initialize({ startOnLoad: false, theme: theme })
  console.log(mermaid)

  Array.from(mermaidElements).forEach((e) => {
    mermaid.mermaidAPI.render('svg-' + e.id, window.config.data[e.id], svgCode => {
      e.insertAdjacentHTML('afterbegin', svgCode)
    }, e)
  })
}
