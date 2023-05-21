const tabButtons = document.querySelectorAll(".tab-button");

tabButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    button.setAttribute("data-active", "true");
    const tabList = (e.target as HTMLButtonElement).parentElement!;
    Array.from(tabList.children).forEach((child) => {
      if (child.nodeName !== "BUTTON" || child === button) {
        return;
      }
      child.setAttribute("data-active", "false");
    });

    const tabInterface = tabList.parentElement!;
    const tabPanels = Array.from(tabInterface.children).filter((child) =>
      child.classList.contains("tab-panel")
    );
    const tabPanel = tabInterface.querySelector(`#${button.getAttribute('data-panel-id')!}`)! as HTMLDivElement
    tabPanels.forEach(panel => (panel as HTMLDivElement).setAttribute('style', 'display: none !important;'));
    tabPanel.setAttribute('style', 'display: block !important;');
  });
});
