import mermaid from 'mermaid'
import mermaidAPI from 'mermaid/mermaidAPI'

const mermaidElements = document.getElementsByClassName('mermaid')
if (mermaidElements.length) {
  mermaid.initialize({ startOnLoad: false, theme: 'default' })
  Array.from(mermaidElements).forEach((mermaid) => {
    mermaidAPI.render('svg-' + mermaid.id, window.config.data[mermaid.id], svgCode => {
      mermaid.insertAdjacentHTML('afterbegin', svgCode)
      document.getElementById('svg-' + mermaid.id).children[0].remove()
    }, mermaid)
  })
}
