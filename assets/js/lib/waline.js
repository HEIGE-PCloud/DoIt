import { init } from "@waline/client";

if (window.config?.comment?.waline) {
  let { texRenderer } = window.config.comment.waline;
  if (texRenderer) {
    if (window.katex?.renderToString) {
      texRenderer = (blockMode, tex) =>
        window.katex.renderToString(tex, {
          displayMode: blockMode,
          throwOnError: false,
        });
    } else if (window.MathJax?.tex2mml) {
      texRenderer = (blockMode, tex) =>
        window.MathJax.tex2mml(tex, { display: blockMode });
    }
  }
  init({ ...window.config.comment.waline, texRenderer });
}
