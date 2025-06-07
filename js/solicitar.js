// Máscara de CPF
document.getElementById("cpf").addEventListener("input", function (e) {
  let value = e.target.value.replace(/\D/g, "");
  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  e.target.value = value;
  removerErro(e.target);
});

// Remoção de erro ao digitar
["nome", "cpf", "dia", "mes", "ano", "endereco", "telefone", "email"].forEach(
  (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("input", () => removerErro(el));
    }
  }
);

// Botão fora do form
document
  .getElementById("btn-prosseguir")
  .addEventListener("click", function () {
    const nome = document.getElementById("nome");
    const cpf = document.getElementById("cpf");
    const dia = document.getElementById("dia");
    const mes = document.getElementById("mes");
    const ano = document.getElementById("ano");
    const endereco = document.getElementById("endereco");
    const telefone = document.getElementById("telefone");
    const email = document.getElementById("email");

    let valido = true;

    if (!nome.value.trim()) {
      mostrarErro(nome, "O nome é obrigatório");
      valido = false;
    }

    if (!cpf.value.trim()) {
      mostrarErro(cpf, "O CPF é obrigatório");
      valido = false;
    } else if (!validarCPF(cpf.value)) {
      mostrarErro(cpf, "CPF inválido");
      valido = false;
    }

    const diaVal = parseInt(dia.value);
    const mesVal = parseInt(mes.value);
    const anoVal = parseInt(ano.value);
    const dataValida =
      !isNaN(diaVal) &&
      !isNaN(mesVal) &&
      !isNaN(anoVal) &&
      dia.value.length === 2 &&
      mes.value.length === 2 &&
      ano.value.length === 4 &&
      diaVal >= 1 &&
      diaVal <= 31 &&
      mesVal >= 1 &&
      mesVal <= 12 &&
      anoVal >= 1900 &&
      anoVal <= new Date().getFullYear();

    const grupoData = document.getElementById("data-nascimento");

    if (!dataValida) {
      mostrarErroGrupo(grupoData, "Data de nascimento inválida");
      [dia, mes, ano].forEach((input) => input.classList.add("input-error"));
      valido = false;
    } else {
      [dia, mes, ano].forEach(removerErro);
    }

    if (!endereco.value.trim()) {
      mostrarErro(endereco, "O endereço é obrigatório");
      valido = false;
    }

    if (!/^\(?\d{2}\)?[\s.-]?\d{4,5}[-\s.]?\d{4}$/.test(telefone.value)) {
      mostrarErro(telefone, "Telefone inválido");
      valido = false;
    }

    if (!/^[\w.-]+@[\w.-]+\.\w{2,}$/.test(email.value)) {
      mostrarErro(email, "E-mail inválido");
      valido = false;
    }

    if (!valido) return;

    // Esconde o formulário e o botão, mostra a pergunta do plano
    document.getElementById("form").style.display = "none";
    document.getElementById("btn-prosseguir").style.display = "none";
    document.getElementById("pergunta-plano").style.display = "block";
  });

document.getElementById("telefone").addEventListener("input", function (e) {
  let value = e.target.value.replace(/\D/g, "");

  if (value.length > 11) value = value.slice(0, 11);

  if (value.length <= 10) {
    value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
  } else {
    value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
  }

  e.target.value = value;
  removerErro(e.target);
});

// Limitar dia, mês e ano: só números + tamanho certo
const camposData = {
  dia: 2,
  mes: 2,
  ano: 4,
};

Object.entries(camposData).forEach(([id, maxLength]) => {
  const input = document.getElementById(id);

  input.addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/\D/g, "").slice(0, maxLength);
    removerErro(e.target);
  });

  input.addEventListener("keypress", (e) => {
    if (!/\d/.test(e.key)) e.preventDefault();
  });

  input.addEventListener("paste", (e) => e.preventDefault());
});

function mostrarErroGrupo(container, mensagem) {
  removerErroGrupo(container);
  const erro = document.createElement("p");
  erro.classList.add("error-message");
  erro.textContent = mensagem;
  container.appendChild(erro);
}

function removerErroGrupo(container) {
  const erro = container.querySelector(".error-message");
  if (erro) erro.remove();
  const inputs = container.querySelectorAll("input");
  inputs.forEach((input) => input.classList.remove("input-error"));
}

function mostrarErro(input, mensagem) {
  removerErro(input);
  input.classList.add("input-error");

  const erro = document.createElement("p");
  erro.classList.add("error-message");
  erro.textContent = mensagem;
  input.parentNode.appendChild(erro);
}

function removerErro(input) {
  input.classList.remove("input-error");
  const erro = input.parentNode.querySelector(".error-message");
  if (erro) erro.remove();
}

function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, "");
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let resto = 11 - (soma % 11);
  let dig1 = resto >= 10 ? 0 : resto;
  if (dig1 !== parseInt(cpf.charAt(9))) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  resto = 11 - (soma % 11);
  let dig2 = resto >= 10 ? 0 : resto;
  return dig2 === parseInt(cpf.charAt(10));
}

document.getElementById("btn-sim").addEventListener("click", function () {
  document.getElementById("pergunta-plano").style.display = "none";
  document.getElementById("resposta-sim").style.display = "block";
});

document.getElementById("btn-nao").addEventListener("click", function () {
  // Redireciona para a rota desejada (exemplo: #/proxima-pagina)
  window.navigateTo("#/proxima-pagina");
});