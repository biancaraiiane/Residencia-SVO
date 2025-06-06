document.getElementById('cpf').addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            e.target.value = value;
        });

        document.querySelector('.btn-consultar').addEventListener('click', function () {
            const nome = document.getElementById('nome').value.trim();
            const cpf = document.getElementById('cpf').value.trim();
            const protocolo = document.getElementById('protocolo').value.trim();
            
            if (!nome || !cpf || !protocolo) {
                alert('Por favor, preencha todos os campos!');
                return;
            }
            
            if (!validarCPF(cpf)) {
                alert('CPF inválido!');
                return;
            }
            
            alert("Consultando protocolo ${protocolo} para ${nome}");
        });

        function validarCPF(cpf) {
            cpf = cpf.replace(/[^\d]+/g, '');
            if (cpf.length !== 11 ||
                /^(\d)\1{10}$/.test(cpf)) return false;
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