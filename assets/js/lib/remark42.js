if (window.config?.comment?.remark42) {
  const remark42 = window.config.comment.remark42
  // eslint-disable-next-line camelcase
  const remark_config = {
    host: remark42.host,
    site_id: remark42.site_id,
    components: ['embed'],
    max_shown_comments: remark42.max_shown_comments,
    theme: window.isDark ? 'dark' : 'light',
    locale: remark42.locale,
    show_email_subscription: remark42.show_email_subscription,
    simple_view: remark42.simple_view
  }
  // eslint-disable-next-line camelcase
  window.remark_config = remark_config
  // eslint-disable-next-line no-sequences, no-unused-expressions
  !(function (e, n) { for (let o = 0; o < e.length; o++) { const r = n.createElement('script'); let c = '.js'; const d = n.head || n.body; 'noModule' in r ? (r.type = 'module', c = '.mjs') : r.async = !0, r.defer = !0, r.src = remark_config.host + '/web/' + e[o] + c, d.appendChild(r) } }(remark_config.components || ['embed'], document))
  window._remark42OnSwitchTheme = () => {
    if (window.isDark) {
      window.REMARK42.changeTheme('dark')
    } else {
      window.REMARK42.changeTheme('light')
    }
  }
  window.switchThemeEventSet.add(window._remark42OnSwitchTheme)
}
