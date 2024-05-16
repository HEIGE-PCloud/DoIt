if (window.config?.comment?.giscus) {
  const giscusConfig = window.config.comment.giscus;
  const script = document.createElement("script");
  script.src = "https://giscus.app/client.js";
  script.type = "text/javascript";
  script.setAttribute("data-repo", giscusConfig.dataRepo);
  script.setAttribute("data-repo-id", giscusConfig.dataRepoId);
  if (giscusConfig.dataCategory)
    script.setAttribute("data-category", giscusConfig.dataCategory);
  script.setAttribute("data-category-id", giscusConfig.dataCategoryId);
  script.setAttribute("data-mapping", giscusConfig.dataMapping);
  script.setAttribute(
    "data-reactions-enabled",
    giscusConfig.dataReactionsEnabled,
  );
  script.setAttribute("data-emit-metadata", giscusConfig.dataEmitMetadata);
  script.setAttribute("data-input-position", giscusConfig.dataInputPosition);
  script.setAttribute(
    "data-theme",
    window.isDark ? giscusConfig.darkTheme : giscusConfig.lightTheme,
  );
  script.setAttribute("data-lang", giscusConfig.dataLang);
  script.setAttribute("data-strict", giscusConfig.dataStrict);
  script.setAttribute("data-loading", giscusConfig.dataLoading);
  script.crossOrigin = "anonymous";
  script.async = true;
  document.getElementById("giscus").appendChild(script);
  window._giscusOnSwitchTheme = () => {
    const message = {
      giscus: {
        setConfig: {
          theme: window.isDark
            ? giscusConfig.darkTheme
            : giscusConfig.lightTheme,
        },
      },
    };
    const iframe = document.querySelector(".giscus-frame");
    iframe.contentWindow.postMessage(message, "https://giscus.app");
  };
  window.switchThemeEventSet.add(window._giscusOnSwitchTheme);
}
