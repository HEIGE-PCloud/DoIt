import mermaid from 'mermaid'

const mermaidElements = document.getElementsByClassName('mermaid')
if (mermaidElements.length) {
  mermaid.initialize({ startOnLoad: false, theme: 'default' })
  console.log(mermaid)

  Array.from(mermaidElements).forEach((e) => {
    mermaid.mermaidAPI.render('svg-' + e.id, window.config.data[e.id], svgCode => {
      e.insertAdjacentHTML('afterbegin', svgCode)
      document.getElementById('svg-' + e.id).children[0].remove()
    }, e)
  })
}
