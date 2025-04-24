# 🚀 Projeto SVO com JavaScript Puro

## 📖 Descrição
Este projeto é uma aplicação construída com **JavaScript puro**, sem frameworks. O objetivo é oferecer uma navegação suave entre várias páginas dentro do mesmo HTML, utilizando **JavaScript** para controlar as rotas, e **CSS** para o estilo global.

---

## 📁 Estrutura do Projeto

A estrutura de pastas é organizada da seguinte forma:

📦 projeto ├── 📁 css │ ├── variables.css # Variáveis (cores, fontes, etc.) │ └── style.css # Estilo global ├── 📁 js │ ├── main.js # JS principal para lógica e rotas │ └── router.js # Lógica de roteamento SPA ├── 📁 pages │ ├── home.html │ ├── about.html │ └── contact.html ├── index.html # Página principal └── README.md # Documentação para devs


---

## 🧭 Funcionalidade de Rotas

A navegação entre páginas é feita de forma **dinâmica**, sem recarregar a página, utilizando a funcionalidade de **JavaScript puro** com `pushState` e manipulando o estado do histórico do navegador.

- A função `navigateTo(page)` é responsável por mudar a URL e carregar o conteúdo correspondente.
- A função `handleLocation()` carrega o conteúdo da página atual de acordo com a URL.

### Como as rotas são definidas:
- `/` → `home.html`
- `/outros` → `outros.html`

---

## 🎨 Estilos e Variáveis

### 📄 `css/variables.css`

Este arquivo contém todas as variáveis globais usadas no projeto, como cores, fontes e tamanhos. Aqui estão algumas das variáveis principais:

```css
:root {
  --font-family: 'Arial', sans-serif;
  --bg-color:rgb(240, 240, 240);
  --text-color: #333;
  --primary-color:rgb(251, 246, 84);
}

já o style.css é o estilo global da aplicação. Ele importa as variáveis definidas em variables.css e aplica um estilo padrão para o corpo e os links de navegação.

body {
  font-family: var(--font-family);
  background-color: var(--bg-color);
  color: var(--text-color);
  margin: 0;
  padding: 0;
}

nav a {
  margin-right: 10px;
  text-decoration: none;
  color: var(--primary-color);
}

