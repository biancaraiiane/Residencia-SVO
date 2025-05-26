class Header extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="headerPhone">
                    <p>(79) 3234-6022</p>
                    <p>(79) 99191-5391</p>
                    <p>Rua Campo do Brito, 551 - Bairro São José, CEP: 49048-100 Aracaju/SE</p>
            </div>    
                
            <header class="main-header">
                <div class="header-container">
                    <div class="logo">
                        <img src="../assets/logo svo branco.png" alt="Logo FSPH">
                    </div>
                    <ul class="menu">
                        <li><a href="">INSTITUCIONAL</a></li>
                        <li><a href="">SOLICITAÇÃO DE REMOÇÃO</a></li>
                        <li><a href="">NOTÍCIAS</a></li>
                        <li>
                            <p>Aa(1/3)</p>
                        </li>
                        <li><button class="toggle-theme">⭕</button></li>
                    </ul>
                </div>
            </header>
        `;
    };
};

customElements.define('main-header', Header);