if (window.config?.plantuml) {
  const diagrams = document.querySelectorAll('script[type="plantuml"]');

  diagrams.forEach((diagram) => {
    const content = diagram.innerHTML;
    const server = diagram.dataset.server;
    const format = diagram.dataset.format;
    const title = diagram.dataset.title;

    const encoded = plantumlEncoder.encode(content);
    const img = document.createElement("img");

    img.src = `${server}/${format}/${encoded}`;
    img.loading = "lazy";
    img.id = "plantuml-diagram";

    if (title) {
      img.alt = title;
    }

    diagram.replaceWith(img);
  });
}
