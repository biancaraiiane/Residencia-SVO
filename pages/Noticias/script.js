// Menu interativo
    document.querySelectorAll('.menu-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = item.getAttribute('href').substring(1);
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        } else {
          alert(`Seção ${sectionId} ainda não implementada!`);
        }
      });
    });
// Acessibilidade: Alternar tamanho da fonte
    let fontSizeLevel = 1;
    const fontSizes = ['16px', '18px', '20px'];
    const indicator = document.getElementById('font-size-indicator');
    const body = document.body;
    document.getElementById('accessibility-btn').addEventListener('click', () => {
      fontSizeLevel = (fontSizeLevel % 3) + 1;
      body.style.fontSize = fontSizes[fontSizeLevel - 1];
      indicator.textContent = `Aa(${fontSizeLevel}/3)`;
    });
// Notícias clicáveis
    document.querySelectorAll('.noticia-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const url = link.getAttribute('href');
        alert(`Redirecionando para: ${url}`);
      });
    });