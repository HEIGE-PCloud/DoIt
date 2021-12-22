const twikoo = require('twikoo')

if (window.config?.comment) {
  const config = window.config.comment.twikoo
  if (config) {
    twikoo.init(config)
    if (config.commentCount) {
      // https://twikoo.js.org/api.html#get-comments-count
      twikoo.getCommentsCount({
        envId: config.envId,
        region: config.region,
        urls: [
          window.location.pathname
        ],
        includeReply: false
      }).then(function (response) {
        // example: [
        //   { url: '/2020/10/post-1.html', count: 10 },
        //   { url: '/2020/11/post-2.html', count: 0 },
        //   { url: '/2020/12/post-3.html', count: 20 }
        // ]
        // If there is an element with id="twikoo-comment-count", set its innerHTML to the count of comments
        const twikooCommentCount = document.getElementById('twikoo-comment-count')
        if (twikooCommentCount) twikooCommentCount.innerHTML = response[0].count
      })
    }
  }
}
