import mermaid from 'mermaid'

const mermaidElements = document.getElementsByClassName('mermaid')
if (mermaidElements.length) {
  mermaid.initialize({
    startOnLoad: true
  })
}
