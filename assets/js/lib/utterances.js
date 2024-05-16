if (window.config?.comment?.utterances) {
  const utterancesConfig = window.config.comment.utterances;
  const script = document.createElement("script");
  script.src = "https://utteranc.es/client.js";
  script.type = "text/javascript";
  script.setAttribute("repo", utterancesConfig.repo);
  script.setAttribute("issue-term", utterancesConfig.issueTerm);
  if (utterancesConfig.label)
    script.setAttribute("label", utterancesConfig.label);
  script.setAttribute(
    "theme",
    window.isDark ? utterancesConfig.darkTheme : utterancesConfig.lightTheme,
  );
  script.crossOrigin = "anonymous";
  script.async = true;
  document.getElementById("utterances").appendChild(script);
  window._utterancesOnSwitchTheme = () => {
    const message = {
      type: "set-theme",
      theme: window.isDark
        ? utterancesConfig.darkTheme
        : utterancesConfig.lightTheme,
    };
    const iframe = document.querySelector(".utterances-frame");
    iframe.contentWindow.postMessage(message, "https://utteranc.es");
  };
  window.switchThemeEventSet.add(window._utterancesOnSwitchTheme);
}
