import Artalk from "artalk";

if (window.config?.comment) {
  const config = window.config.comment.artalk;
  if (config) {
    const artalk = Artalk.init(config);
    artalk.setDarkMode(window.isDark);
    window._artalkOnSwitchTheme = () => {
      artalk.setDarkMode(window.isDark);
    };
    window.switchThemeEventSet.add(window._artalkOnSwitchTheme);
  }
}
