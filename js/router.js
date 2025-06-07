export function navigateTo(page) {
  window.history.pushState({}, "", page);
  handleLocation();
}
window.navigateTo = navigateTo;

export async function handleLocation() {
  const routes = {
    "": "/pages/home.html",
    "#/solicitacao-de-remocao": "/pages/solicitacao-de-remocao.html",
    "#/noticias": "/pages/noticias.html",
    "#/institucional": "/pages/institucional.html",
    "#/perfil-do-profissional": "/pages/perfil-do-profissional.html",
    "#/noticia-unica-1": "/pages/noticia-unica-1.html",
    "#/consultaProtocolo": "/pages/consultaProtocolo.html",
    "#/retorno-protocolo": "/pages/retorno-protocolo.html",
    "#/solicitar": "/pages/solicitar.html",
  };

  const path = window.location.hash || "";
  const route = routes[path] || "/pages/404.html";
  const html = await fetch(route).then((res) => res.text());
  document.getElementById("app").innerHTML = html;

  if (path === "#/consultaProtocolo") {
    const script = document.createElement("script");
    script.src = "js/consulta-protocolo.js";
    document.body.appendChild(script);
  }

  if (path === "#/solicitar") {
    const script = document.createElement("script");
    script.src = "js/solicitar.js";
    document.body.appendChild(script);
  }
}

window.addEventListener("hashchange", handleLocation);
window.addEventListener("DOMContentLoaded", handleLocation);
