/* eslint-disable no-new */
import APlayer from 'aplayer'

// Get all aplayer containers
const aplayers = document.getElementsByClassName('aplayer-shortcode')
Array.from(aplayers).forEach(aplayer => {
  console.log(aplayer)
  console.log(aplayer.dataset.audio)
  console.log(aplayer.dataset.options)
  const audio = JSON.parse(aplayer.dataset.audio)
  const options = JSON.parse(aplayer.dataset.options)
  options.audio = audio
  options.container = aplayer
  new APlayer(options)
})
