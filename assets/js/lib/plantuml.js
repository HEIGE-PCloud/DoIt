function initPlantuml() {
  if (window.config?.plantuml) {
    const diagrams = document.querySelectorAll('script[type="plantuml"]');
    const isDark = window.isDark ? "d" : "";
    diagrams.forEach((diagram) => {
      const content = diagram.innerHTML;
      const server = diagram.dataset.server;
      const format = diagram.dataset.format;
      const title = diagram.dataset.title;
      const encoded = plantumlEncoder.encode(content);
      
      const img = document.createElement("img");
      img.dataset.server = server;
      img.dataset.format = format;
      img.dataset.encoded = encoded;
      img.src = `${server}/${isDark}${format}/${encoded}`;
      img.loading = "lazy";
      img.className = "plantuml-diagram";
      img.style.margin = "auto";
      if (title) {
        img.alt = title;
      }
      diagram.replaceWith(img);
    });
  }
}

function updatePlantuml() {
  document.querySelectorAll("img.plantuml-diagram").forEach((diagram) => {
    const server = diagram.dataset.server;
    const format = diagram.dataset.format;
    const encoded = diagram.dataset.encoded;
    const isDark = window.isDark ? "d" : "";
    diagram.src = `${server}/${isDark}${format}/${encoded}`;
  });
}

initPlantuml();
window.switchThemeEventSet.add(updatePlantuml);