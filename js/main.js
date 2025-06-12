import { navigateTo, handleLocation } from "./router.js";
import "./components/header.js";
import "./components/footer.js";

function reinicializaVLibras() {
  document.querySelectorAll('.vw-plugin-wrapper, .vw-access-button').forEach(el => el.remove());
  setTimeout(() => {
    if (window.VLibras && window.VLibras.Widget) {
      new window.VLibras.Widget("https://vlibras.gov.br/app");
    }
  }, 100);
}

document.addEventListener("DOMContentLoaded", () => {
  handleLocation();

  if (!window.vlibrasLoaded) {
    const script = document.createElement("script");
    script.src = "https://vlibras.gov.br/app/vlibras-plugin.js";
    script.onload = () => {
      window.vlibrasLoaded = true;
      reinicializaVLibras();
    };
    document.body.appendChild(script);
  }

  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
      handleLocation();
      reinicializaVLibras();
    }
  });

  window.addEventListener("hashchange", () => {
    handleLocation();
    reinicializaVLibras();
  });
});