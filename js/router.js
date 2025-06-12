function reinicializaVLibras() {
  document.querySelectorAll('.vw-plugin-wrapper, .vw-access-button').forEach(el => el.remove());
  setTimeout(() => {
    if (window.VLibras && window.VLibras.Widget) {
      new window.VLibras.Widget("https://vlibras.gov.br/app");
    }
  }, 100);
}

export function navigateTo(page) {
  window.history.pushState({}, "", page);
  handleLocation();
  reinicializaVLibras();
}
window.navigateTo = navigateTo;


  const routes = {
  "": "pages/home.html",
  "solicitacao-de-remocao": "pages/solicitacao-de-remocao.html",
  "noticias": "pages/noticias.html",
  "institucional": "pages/institucional.html",
  "perfil-do-profissional": "pages/perfil-do-profissional.html",
  "noticia-unica-1": "pages/noticia-unica-1.html",
  "consultaProtocolo": "pages/consultaProtocolo.html",
  "retorno-protocolo": "pages/retorno-protocolo.html",
  "solicitar": "pages/solicitar.html",
  "sistema-de-triagem": "pages/sistema-de-triagem.html",
  };
export async function handleLocation() {
  const hash = window.location.hash.replace(/^#\//, "");
  const route = routes[hash] || routes[""];
  const html = await fetch(route).then((res) => res.text());
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
    document.querySelectorAll('script[src="js/sistema-de-triagem.js"]').forEach(s => s.remove());
    const script = document.createElement("script");
    script.src = "js/sistema-de-triagem.js";
    document.body.appendChild(script);
  }

   reinicializaVLibras();
}

window.addEventListener("hashchange", handleLocation);
window.addEventListener("DOMContentLoaded", handleLocation);
