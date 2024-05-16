import cookieconsent from "cookieconsent";

if (window.config?.cookieconsent) {
  const container = document.getElementById("cookieconsent-container");
  // if there is nothing in the container, then init the cookieconsent
  if (container.innerHTML === "") {
    cookieconsent.initialise(window.config.cookieconsent);
  }
}
