if (typeof window._triagemScriptLoaded === "undefined") {
  window._triagemScriptLoaded = true;

  const modal = document.getElementById("modal-observacoes");
  const fechar = document.getElementById("fechar-modal");

  fechar.addEventListener("click", function () {
    modal.style.display = "none";
  });

  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
  const form = document.getElementById("triageForm");

  // Função para alternar opções condicionais
  function toggleConditionalOptions(questionNumber, value) {
    const conditionalElement = document.getElementById(
      `q${questionNumber}-conditional`
    );
    if (conditionalElement) {
      if (value === "sim") {
        conditionalElement.classList.add("active");
      } else {
        conditionalElement.classList.remove("active");

        // Desmarcar todas as caixas de seleção ao ocultar
        const checkboxes = conditionalElement.querySelectorAll(
          'input[type="checkbox"]'
        );
        checkboxes.forEach((checkbox) => {
          checkbox.checked = false;
        });
      }
    }
  }

  // Adicionar event listeners aos botões de rádio para as perguntas 2, 3 e 6
  const radioGroups = [2, 3, 6];

  radioGroups.forEach((questionNumber) => {
    const radioButtons = document.querySelectorAll(
      `input[name="q${questionNumber}"]`
    );

    radioButtons.forEach((radio) => {
      radio.addEventListener("change", (e) => {
        toggleConditionalOptions(questionNumber, e.target.value);
      });
    });
  });

  // Inicializar opções condicionais com base na seleção atual
  radioGroups.forEach((questionNumber) => {
    const selectedRadio = document.querySelector(
      `input[name="q${questionNumber}"]:checked`
    );
    if (selectedRadio) {
      toggleConditionalOptions(questionNumber, selectedRadio.value);
    }
  });

  // Configurar upload de logo ao clicar nas imagens
  function setupLogoUpload() {
    const logoElements = document.querySelectorAll(
      ".header-logo, .footer-logo-img, .thumbnail-img"
    );

    logoElements.forEach((logo) => {
      logo.style.cursor = "pointer";

      logo.addEventListener("click", () => {
        // Criar um input de arquivo invisível
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = "image/*";

        // Quando um arquivo for selecionado
        fileInput.addEventListener("change", (e) => {
          const file = e.target.files[0];
          if (file) {
            const reader = new FileReader();

            reader.onload = (event) => {
              // Substituir a imagem atual pela nova
              logo.src = event.target.result;
            };

            reader.readAsDataURL(file);
          }
        });

        // Acionar o clique no input de arquivo
        fileInput.click();
      });
    });
  }

  // Configurar upload de logo
  setupLogoUpload();

  // Manipular envio do formulário
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // Coletar todas as respostas
      const answers = {
        q1: document.querySelector('input[name="q1"]:checked')?.value,
        q2: document.querySelector('input[name="q2"]:checked')?.value,
        q3: document.querySelector('input[name="q3"]:checked')?.value,
        q4: document.querySelector('input[name="q4"]:checked')?.value,
        q5: document.querySelector('input[name="q5"]:checked')?.value,
        q6: document.querySelector('input[name="q6"]:checked')?.value,
        q7: document.querySelector('input[name="q7"]:checked')?.value,
      };

      let valido = true;
      Object.entries(answers).forEach(([key, value]) => {
        if (!value) {
          valido = false;
          const el = document.querySelector(`[name="${key}"]`);
          if (el) {
            let error = el.closest(".question").querySelector(".error");
            if (!error) {
              error = document.createElement("div");
              error.className = "error";
              error.style.color = "red";
              el.closest(".question").appendChild(error);
            }
            error.textContent = "Campo obrigatório";
          }
        } else {
          // Remove erro se já estiver preenchido
          const el = document.querySelector(`[name="${key}"]`);
          if (el) {
            const error = el.closest(".question").querySelector(".error");
            if (error) error.remove();
          }
        }
      });

      if (!valido) {
        alert("Por favor, responda todas as perguntas.");
        return;
      }

      // Lógica de análise para mostrar o card "não se enquadra"
      if (
        answers.q1 === "nao" ||
        answers.q3 === "sim" ||
        answers.q4 === "nao" ||
        answers.q5 === "nao" ||
        answers.q7 === "sim"
      ) {
        mostrarCardNaoSeEnquadra();
        return;
      }

      if (
        answers.q1 === "sim" &&
        answers.q3 === "nao" &&
        answers.q4 === "sim" &&
        answers.q5 === "sim" &&
        answers.q7 === "nao"
      ) {
        mostrarCardSeEnquadra();
        return;
      }
    });
  }

  function mostrarCardNaoSeEnquadra() {
    // Esconde o formulário
    const formContainer = document.querySelector(".form-container");
    if (formContainer) formContainer.style.display = "none";

    const cardSim = document.getElementById("se-enquadra");
    if (cardSim) cardSim.remove();

    let card = document.getElementById("nao-se-enquadra");
    if (!card) {
      card = document.createElement("div");
      card.id = "nao-se-enquadra";
      card.className = "resultado-card card-nao-se-enquadra";
      card.innerHTML = `
    <div>
      <p>
        Conforme os critérios de elegibilidade vigentes, o caso em questão <span class="destaque-nao">não se enquadra</span> nas situações atendidas pelo Serviço de Verificação de Óbito (SVO), razão pela qual não é possível proceder com o acionamento do serviço.
      </p>
      <div class="contato-iml">
        <b>Por favor, solicite os serviços do IML:</b>
        <div>
          <span>📞 Número: (79) 99682-5792</span>
        </div>
      </div>
    </div>
  `;
      const mainContent = document.querySelector(".main-content");
      if (mainContent) {
        mainContent.appendChild(card);
      }
    } else {
      card.style.display = "block";
    }
  }

  function mostrarCardSeEnquadra() {
    // Esconde o formulário anterior
    const formContainer = document.querySelector(".form-container");
    if (formContainer) formContainer.style.display = "none";

    const cardNao = document.getElementById("nao-se-enquadra");
    if (cardNao) cardNao.remove();

    let card = document.getElementById("se-enquadra");
    if (!card) {
      card = document.createElement("div");
      card.id = "se-enquadra";
      card.innerHTML = `
      <div class="form-container">
        <form class="form-card" id="enderecoForm" autocomplete="off">
          <h2 class="form-title">ENDEREÇO</h2>
          <label for="logradouro">Logradouro</label>
          <input type="text" id="logradouro" name="logradouro" />
          <span class="error" id="erro-logradouro"></span>

          <label for="numero">Número</label>
          <input type="text" id="numero" name="numero" />
          <span class="error" id="erro-numero"></span>

          <label for="cep">CEP</label>
          <input type="text" id="cep" name="cep" />
          <span class="error" id="erro-cep"></span>

          <button type="submit" class="submit-btn">SOLICITAR</button>
        </form>
      </div>
    `;
      const mainContent = document.querySelector(".main-content");
      if (mainContent) {
        mainContent.appendChild(card);
      }

      const enderecoForm = document.getElementById("enderecoForm");
      const campos = [
        {
          id: "logradouro",
          erro: "erro-logradouro",
          msg: "O logradouro é obrigatório!",
        },
        { id: "numero", erro: "erro-numero", msg: "O número é obrigatório!" },
        { id: "cep", erro: "erro-cep", msg: "O CEP é obrigatório!" },
      ];

      campos.forEach(({ id, erro }) => {
        const input = document.getElementById(id);
        input.addEventListener("input", function () {
          if (input.value.trim() !== "") {
            input.classList.remove("input-error");
            document.getElementById(erro).textContent = "";
          }
        });
      });

      enderecoForm.addEventListener("submit", function (e) {
        e.preventDefault();
        let valido = true;

        campos.forEach(({ id, erro, msg }) => {
          const input = document.getElementById(id);
          if (input.value.trim() === "") {
            valido = false;
            input.classList.add("input-error");
            document.getElementById(erro).textContent = msg;
          } else {
            input.classList.remove("input-error");
            document.getElementById(erro).textContent = "";
          }
        });

        if (valido) {
          const protocolo =
            Math.floor(1000000 + Math.random() * 9000000) + "-00";
          const solicitante = localStorage.getItem("nomeSolicitante") || "";

          card.innerHTML = `
            <div class="sucesso-container">
              <div class="sucesso-header">
                <img src="https://cdn-icons-png.flaticon.com/512/845/845646.png" />
                <h2 class="sucesso-titulo">Solicitação Realizada</h2>
             </div>
             <div class="sucesso-dados">
               <p><b>Nº de Protocolo:</b> ${protocolo}</p>
               <p><b>Solicitante:</b> ${solicitante}</p>
             </div>
             <div class="orientacao-docs">
               <p>
                <b>Atenção:</b> Esteja com os <b>documentos originais</b> em mãos, iguais aos informados no formulário, para apresentação no momento do atendimento.
               </p>
             </div>
           </div>
          `;

          localStorage.removeItem("nomeSolicitante");
        }
      });
    } else {
      card.style.display = "block";
    }
  }
}
