class Header extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="main-header">
        <div class="headerPhone">
          <p>(79) 3234-6022</p>
          <p>(79) 99191-5391</p>
          <p>Rua Campo do Brito, 551 - Bairro São José, CEP: 49048-100 Aracaju/SE</p>
        </div>
        <div class="header-container">
          <div class="logo">
            <img src="../assets/logo svo branco.png" alt="Logo FSPH">
          </div>
          <button class="menu-toggle" aria-label="Menu">
            <span class="menu-icon">
              <span class="bar"></span>
              <span class="bar"></span>
              <span class="bar"></span>
            </span>
          </button>
          <ul class="menu">
            <li><a href="/institucional" data-link>INSTITUCIONAL</a></li>
            <li><a href="/solicitacao-de-remocao" data-link>SOLICITAÇÃO DE REMOÇÃO</a></li>
            <li><a href="/noticias" data-link>NOTÍCIAS</a></li>
            <li>
              <div class="toggle-theme" aria-label="Alternar tema"></div>
            </li>
          </ul>
        </div>
      </header>
    `;

    this.initMenu();
    this.initTheme();
  }

  initMenu() {
    const menuToggle = this.querySelector(".menu-toggle");
    const menu = this.querySelector(".menu");

    if (menuToggle && menu) {
      menuToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        menuToggle.classList.toggle("active");
        menu.classList.toggle("active");
        document.body.classList.toggle("menu-open");
      });

      // Fechar menu ao clicar em um link
      this.querySelectorAll(".menu a").forEach((item) => {
        item.addEventListener("click", () => {
          menuToggle.classList.remove("active");
          menu.classList.remove("active");
          document.body.classList.remove("menu-open");
        });
      });

      // Fechar menu ao clicar fora
      document.addEventListener("click", (e) => {
        if (!menu.contains(e.target)) {
          menuToggle.classList.remove("active");
          menu.classList.remove("active");
          document.body.classList.remove("menu-open");
        }
      });
    }
  }

  initTheme() {
    const themeToggle = this.querySelector(".toggle-theme");
    if (themeToggle) {
      themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem(
          "darkMode",
          document.body.classList.contains("dark-mode")
        );
      });

      if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
      }
    }
  }
}

customElements.define("main-header", Header);
