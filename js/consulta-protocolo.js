document.getElementById('cpf').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    e.target.value = value;

    removerErro(e.target); // remove erro se estiver digitando
});

document.getElementById('nome').addEventListener('input', function (e) {
    removerErro(e.target);
});

document.getElementById('protocolo').addEventListener('input', function (e) {
    removerErro(e.target);
});

document.querySelector('.btn-consultar').addEventListener('click', function () {
    const nome = document.getElementById('nome');
    const cpf = document.getElementById('cpf');
    const protocolo = document.getElementById('protocolo');

    let valido = true;

    if (!nome.value.trim()) {
        mostrarErro(nome, 'O nome é obrigatório');
        valido = false;
    }

    if (!cpf.value.trim()) {
        mostrarErro(cpf, 'O CPF é obrigatório');
        valido = false;
    } else if (!validarCPF(cpf.value.trim())) {
        mostrarErro(cpf, 'CPF inválido');
        valido = false;
    }

    if (!protocolo.value.trim()) {
        mostrarErro(protocolo, 'O número de protocolo é obrigatório');
        valido = false;
    }

    if (!valido) return;

    window.navigateTo('#/retorno-protocolo');
});

function mostrarErro(input, mensagem) {
    removerErro(input);
    input.classList.add('input-error');

    const erro = document.createElement('p');
    erro.classList.add('error-message');
    erro.textContent = mensagem;
    input.parentNode.appendChild(erro);
}

function removerErro(input) {
    input.classList.remove('input-error');
    const mensagemErro = input.parentNode.querySelector('.error-message');
    if (mensagemErro) {
        mensagemErro.remove();
    }
}

function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = 11 - (soma % 11);
    let dig1 = (resto === 10 || resto === 11) ? 0 : resto;
    if (dig1 !== parseInt(cpf.charAt(9))) return false;
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    let dig2 = (resto === 10 || resto === 11) ? 0 : resto;
    return dig2 === parseInt(cpf.charAt(10));
}
