/* eslint-disable no-undef */
/* eslint-disable no-new */
if (window.config?.comment?.vssue) {
  const vssue = window.config.comment.vssue
  new Vue({
    el: vssue.el,
    render: h => h('Vssue', {
      props: {
        title: vssue.title,
        options: {
          owner: vssue.owner,
          repo: vssue.repo,
          clientId: vssue.clientId,
          clientSecret: vssue.clientSecret
        }
      }
    })
  })
}
