function reinicializaVLibras() {
  document
    .querySelectorAll(".vw-plugin-wrapper, .vw-access-button")
    .forEach((el) => el.remove());
  setTimeout(() => {
    if (window.VLibras && window.VLibras.Widget) {
      new window.VLibras.Widget("https://vlibras.gov.br/app");
    }
  }, 100);
}

function loadVLibras() {
  // Remove instâncias antigas do VLibras
  document
    .querySelectorAll('script[src*="vlibras-plugin.js"]')
    .forEach((s) => s.remove());
  document
    .querySelectorAll(".vw-plugin-wrapper, .vw-access-button")
    .forEach((el) => el.remove());
  // Adiciona o script VLibras novamente
  const script = document.createElement("script");
  script.src = "https://vlibras.gov.br/app/vlibras-plugin.js";
  script.onload = () => {
    setTimeout(() => {
      if (window.VLibras && window.VLibras.Widget) {
        new window.VLibras.Widget("https://vlibras.gov.br/app");
      }
    }, 100);
  };
  document.body.appendChild(script);
}

export function navigateTo(page) {
  window.history.pushState({}, "", page);
  handleLocation();
  reinicializaVLibras();
}
window.navigateTo = navigateTo;

const routes = {
  "": { page: "pages/home.html", css: ["css/home.css"] },
  "solicitacao-de-remocao": {
    page: "pages/solicitacao-de-remocao.html",
    css: ["css/solicitacao.css"],
  },
  noticias: { page: "pages/noticias.html", css: ["css/noticias.css"] },
  institucional: {
    page: "pages/institucional.html",
    css: ["css/institucional.css"],
  },
  "perfil-do-profissional": {
    page: "pages/perfil-do-profissional.html",
    css: ["css/perfil_profissional.css"],
  },
  "noticia-unica-1": {
    page: "pages/noticia-unica-1.html",
    css: ["css/noticia-unica.css"],
  },
  consultaProtocolo: {
    page: "pages/consultaProtocolo.html",
    css: ["css/consulta-protocolo.css"],
  },
  "retorno-protocolo": {
    page: "pages/retorno-protocolo.html",
    css: ["css/retorno-protocolo.css"],
  },
  solicitar: { page: "pages/solicitar.html", css: ["css/solicitar.css"] },
  "sistema-de-triagem": {
    page: "pages/sistema-de-triagem.html",
    css: ["css/triagem.css"],
  },
};

function setPageCSS(cssList) {
  // Remove CSS antigos de página
  document
    .querySelectorAll("link[data-router-css]")
    .forEach((link) => link.remove());
  // Adiciona novos CSS
  if (cssList && cssList.length) {
    cssList.forEach((cssPath) => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = cssPath;
      link.setAttribute("data-router-css", "true");
      document.head.appendChild(link);
    });
  }
}

export async function handleLocation() {
  const hash = window.location.hash.replace(/^#\//, "");
  const routeObj = routes[hash] || routes[""];
  setPageCSS(routeObj.css);
  const html = await fetch(routeObj.page).then((res) => res.text());
  document.getElementById("app").innerHTML = html;

  if (hash === "consultaProtocolo") {
    const script = document.createElement("script");
    script.src = "js/consulta-protocolo.js";
    document.body.appendChild(script);
  }

  if (hash === "solicitar") {
    const script = document.createElement("script");
    script.src = "js/solicitar.js";
    document.body.appendChild(script);
  }

  if (hash === "sistema-de-triagem") {
    document
      .querySelectorAll('script[src="js/sistema-de-triagem.js"]')
      .forEach((s) => s.remove());
    const script = document.createElement("script");
    script.src = "js/sistema-de-triagem.js";
    document.body.appendChild(script);
  }

  loadVLibras();
}

window.addEventListener("hashchange", handleLocation);
window.addEventListener("DOMContentLoaded", handleLocation);
