/* eslint-disable no-new */
import APlayer from "aplayer";

const aplayerInstances = [];

// Get all aplayer containers
const aplayers = document.getElementsByClassName("aplayer-shortcode");
Array.from(aplayers).forEach((aplayer) => {
  const audio = JSON.parse(aplayer.dataset.audio);
  const options = JSON.parse(aplayer.dataset.options);
  options.audio = audio;
  options.container = aplayer;
  const ap = new APlayer(options);
  aplayerInstances.push(ap);
});
