export function navigateTo(page) {
  window.history.pushState({}, "", page);
  handleLocation();
}
window.navigateTo = navigateTo;

export async function handleLocation() {
  const routes = {
    "/": "/pages/home.html",
    "/solicitacao-de-remocao": "/pages/solicitacao-de-remocao.html",
    "/noticias": "/pages/noticias.html",
    "/institucional": "/pages/institucional.html",
    "/perfil-do-profissional": "/pages/perfil-do-profissional.html",
    "/noticia-unica-1": "/pages/noticia-unica-1.html",
    "/consultaProtocolo": "/pages/consultaProtocolo.html",
  };

  const path = window.location.pathname;
  const route = routes[path] || "/pages/404.html";
  const html = await fetch(route).then((res) => res.text());
  document.getElementById("app").innerHTML = html;
}

window.onpopstate = handleLocation;
