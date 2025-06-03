export function navigateTo(page) {
  window.history.pushState({}, "", page);
  handleLocation();
}

export async function handleLocation() {
  const routes = {
    "/": "/pages/home.html",
    "/solicitacao-de-remocao": "/pages/solicitacao-de-remocao.html",
    "/noticias": "/pages/noticias.html",
    "/institucional": "/pages/institucional.html",
    "/perfil-do-profissional": "/pages/perfil-do-profissional.html",
  };

  const path = window.location.pathname;
  const route = routes[path] || "/pages/404.html";
  const html = await fetch(route).then((res) => res.text());
  document.getElementById("app").innerHTML = html;
}

window.onpopstate = handleLocation;
