class Footer extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
            <footer id="footer">
                <div class="footerTop">
                    <div class="logoContainer">
                        <img class="logoFooter" src="assets/logo svo branco.png" alt="Logo SVO">
                    </div>
                    
                    <div class="footerSection">
                        <h3>INFORMAÇÕES</h3>
                        <a>Tel. (75) 3224-6223</a>
                        <a>Tel. (75) 3171-5221</a>
                        <a>Exit: Rua Campo do</a>
                        <a>Rua, 531 - BMW-360</a>
                        <a>Jovão, CEP: 4068-9100</a>
                        <a>ArequipCE</a>
                    </div>

                    <div class="footerSection">
                        <h3>SERVIÇOS SVO</h3>
                        <a href="#/solicitar" data-link>Solicitação de remoção</a>
                        <a href="#/consultaProtocolo" data-link>Consulta de protocolo</a>
                    </div>
                    
                    <div class="footerSection">
                        <h3>ÚLTIMAS NOTÍCIAS</h3>
                        <a>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Plaquam a quo</a>
                        <a>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Plaquam a quo</a>
                        <a>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Plaquam a quo</a>
                    </div>
                </div>
                
                <div class="footerCopyright">
                    <p>© SVO - Serviço de Verificação de Óbito 2025</p>
                </div>
            </footer>
        `;
  }
}

customElements.define("main-footer", Footer);
