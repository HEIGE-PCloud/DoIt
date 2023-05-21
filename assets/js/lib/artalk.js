import Artalk from 'artalk'

if (window.config?.comment) {
  const config = window.config.comment.twikoo
  if (config) {
    Artalk.init(config)
    window._artalkOnSwitchTheme = () => {
      Artalk.setDarkMode(window.isDark)
    }
    window.switchThemeEventSet.add(window._artalkOnSwitchTheme)
  }
}
