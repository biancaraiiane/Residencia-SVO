document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('triageForm');

    // Função para alternar opções condicionais
    function toggleConditionalOptions(questionNumber, value) {
        const conditionalElement = document.getElementById(`q${questionNumber}-conditional`);
        if (conditionalElement) {
            if (value === 'sim') {
                conditionalElement.classList.add('active');
            } else {
                conditionalElement.classList.remove('active');

                // Desmarcar todas as caixas de seleção ao ocultar
                const checkboxes = conditionalElement.querySelectorAll('input[type="checkbox"]');
                checkboxes.forEach(checkbox => {
                    checkbox.checked = false;
                });
            }
        }
    }

    // Adicionar event listeners aos botões de rádio para as perguntas 2, 3 e 6
    const radioGroups = [2, 3, 6];

    radioGroups.forEach(questionNumber => {
        const radioButtons = document.querySelectorAll(`input[name="q${questionNumber}"]`);

        radioButtons.forEach(radio => {
            radio.addEventListener('change', (e) => {
                toggleConditionalOptions(questionNumber, e.target.value);
            });
        });
    });

    // Inicializar opções condicionais com base na seleção atual
    radioGroups.forEach(questionNumber => {
        const selectedRadio = document.querySelector(`input[name="q${questionNumber}"]:checked`);
        if (selectedRadio) {
            toggleConditionalOptions(questionNumber, selectedRadio.value);
        }
    });

    // Configurar upload de logo ao clicar nas imagens
    function setupLogoUpload() {
        const logoElements = document.querySelectorAll('.header-logo, .footer-logo-img, .thumbnail-img');

        logoElements.forEach(logo => {
            logo.style.cursor = 'pointer';

            logo.addEventListener('click', () => {
                // Criar um input de arquivo invisível
                const fileInput = document.createElement('input');
                fileInput.type = 'file';
                fileInput.accept = 'image/*';

                // Quando um arquivo for selecionado
                fileInput.addEventListener('change', (e) => {
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
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Coletar todas as respostas
            const answers = {
                q1: document.querySelector('input[name="q1"]:checked')?.value,
                q2: document.querySelector('input[name="q2"]:checked')?.value,
                q3: document.querySelector('input[name="q3"]:checked')?.value,
                q4: document.querySelector('input[name="q4"]:checked')?.value,
                q5: document.querySelector('input[name="q5"]:checked')?.value,
                q6: document.querySelector('input[name="q6"]:checked')?.value,
                q7: document.querySelector('input[name="q7"]:checked')?.value
            };

            // Coletar opções condicionais
            if (answers.q2 === 'sim') {
                const q2Options = Array.from(document.querySelectorAll('input[name="q2_option"]:checked')).map(
                    checkbox => checkbox.value
                );
                answers.q2_options = q2Options;
            }

            if (answers.q3 === 'sim') {
                const q3Options = Array.from(document.querySelectorAll('input[name="q3_option"]:checked')).map(
                    checkbox => checkbox.value
                );
                answers.q3_options = q3Options;
            }

            if (answers.q6 === 'sim') {
                const q6Options = Array.from(document.querySelectorAll('input[name="q6_option"]:checked')).map(
                    checkbox => checkbox.value
                );
                answers.q6_options = q6Options;
            }

            // Verificar se todas as perguntas foram respondidas
            const allAnswered = Object.values(answers).every(value => value !== undefined);

            if (allAnswered) {
                // Aqui você pode processar os dados do formulário
                console.log('Formulário enviado com respostas:', answers);
                alert('Formulário enviado com sucesso!');

                // Você poderia redirecionar ou mostrar resultados aqui
                // window.location.href = '/results.html';
            } else {
                alert('Por favor, responda todas as perguntas.');
            }
        });
    }
});