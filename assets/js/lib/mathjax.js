const delimiters = window.config?.math?.delimiters;
if (!delimiters) {
  return;
}
const displayMath = delimiters
  .filter((d) => d.display)
  .map((d) => [d.left, d.right]);
const inlineMath = delimiters
  .filter((d) => !d.display)
  .map((d) => [d.left, d.right]);
window.MathJax = {
  tex: {
    displayMath,
    inlineMath,
  },
};
