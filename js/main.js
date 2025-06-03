import { navigateTo, handleLocation } from "./router.js";
import './components/header.js';
import './components/footer.js';


document.addEventListener("DOMContentLoaded", () => {
  handleLocation();

  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });
});
