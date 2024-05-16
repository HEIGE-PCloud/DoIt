/* eslint-disable no-undef */
if (window.config?.comment?.gitalk) {
  window.config.comment.gitalk.body = decodeURI(window.location.href);
  const gitalk = new Gitalk(window.config.comment.gitalk);
  gitalk.render("gitalk");
}
