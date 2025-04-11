// Aguarda o conteúdo HTML ser completamente carregado antes de executar o script
document.addEventListener('DOMContentLoaded', function() {

    // --- Funcionalidade: Ano Dinâmico no Copyright ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Funcionalidade: Máscara de Telefone ---
    const phoneInput = document.getElementById('telefone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            const maxDigits = 11;
            if (value.length > maxDigits) { value = value.slice(0, maxDigits); }
            if (value.length <= 2) { value = value.replace(/^(\d{0,2})/, '($1'); }
            else if (value.length <= 6) { value = value.replace(/^(\d{2})(\d{0,4})/, '($1) $2'); }
            else if (value.length <= 10) { value = value.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3'); }
            else { value = value.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3'); }
            e.target.value = value;
            clearInputError(e.target);
        });
    }

    // --- Funcionalidade: Enviar Formulário para WhatsApp com Validação ---
    const contactForm = document.querySelector('.final-cta__form');
    const nomeInput = document.getElementById('nome');
    const telefoneInput = document.getElementById('telefone');
    const servicoInput = document.getElementById('servico');
    const diaHorarioInput = document.getElementById('dia-horario');
    const mensagemInput = document.getElementById('mensagem');

    function clearInputError(inputElement) { /* ... (inalterada) ... */
        if (!inputElement) return;
        const errorElement = document.getElementById(`${inputElement.id}-error`);
        inputElement.classList.remove('input-error');
        if (inputElement.tagName === 'SELECT') { inputElement.classList.remove('input-error'); }
        if (errorElement) { errorElement.textContent = ''; errorElement.style.display = 'none'; }
    }
    function showInputError(inputElement, message) { /* ... (inalterada) ... */
        if (!inputElement) return;
        const errorElement = document.getElementById(`${inputElement.id}-error`);
        if (inputElement.tagName === 'SELECT') { inputElement.classList.add('input-error'); }
        else { inputElement.classList.add('input-error'); }
        if (errorElement) { errorElement.textContent = message; errorElement.style.display = 'block'; }
    }

    if (contactForm) {
        if(nomeInput) { nomeInput.addEventListener('input', () => clearInputError(nomeInput)); }
        if(servicoInput) { servicoInput.addEventListener('change', () => clearInputError(servicoInput)); }

        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            let isValid = true;
            clearInputError(nomeInput);
            clearInputError(telefoneInput);
            clearInputError(servicoInput);

            const nome = nomeInput ? nomeInput.value.trim() : '';
            const telefone = telefoneInput ? telefoneInput.value.trim() : '';
            const servico = servicoInput ? servicoInput.value : '';
            const diaHorario = diaHorarioInput ? diaHorarioInput.value.trim() : '';
            const mensagem = mensagemInput ? mensagemInput.value.trim() : '';
            const telefoneDigits = telefone.replace(/\D/g, '');

            if (nome === '') { showInputError(nomeInput, 'Por favor, preencha seu nome.'); isValid = false; }
            if (telefone === '') { showInputError(telefoneInput, 'Por favor, preencha seu telefone.'); isValid = false; }
            else if (telefoneDigits.length < 10 || telefoneDigits.length > 11) { showInputError(telefoneInput, 'Telefone inválido. Use (XX) XXXXX-XXXX.'); isValid = false; }
            if (servico === '') { showInputError(servicoInput, 'Por favor, selecione um serviço.'); isValid = false; }

            if (!isValid) {
                const firstError = contactForm.querySelector('.input-error');
                if(firstError) { firstError.focus(); }
                return;
            }

            // *** NÚMERO WHATSAPP ATUALIZADO ***
            const whatsappNumber = '5571981718569';

            let mensagemWhats = `Olá! Gostaria de fazer um pré-agendamento na Hera Saúde.\n\n*Nome:* ${nome}\n*Telefone:* ${telefone}\n*Serviço de Interesse:* ${servico}`;
            if (diaHorario !== '') { mensagemWhats += `\n*Preferência Dia/Horário:* ${diaHorario}`; }
            if (mensagem !== '') { mensagemWhats += `\n*Mensagem Adicional:* ${mensagem}`; }
            const mensagemCodificada = encodeURIComponent(mensagemWhats);
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${mensagemCodificada}`;

            console.log("Abrindo WhatsApp:", whatsappURL);
            window.open(whatsappURL, '_blank');
            // contactForm.reset();
        });
    }

    // --- Funcionalidade: FAQ Interativo (Acordeão) ---
    const faqItems = document.querySelectorAll('.faq__item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq__question');
            if (question) {
                question.addEventListener('click', () => {
                    const wasActive = item.classList.contains('active');
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item) { otherItem.classList.remove('active'); }
                    });
                    item.classList.toggle('active');
                });
            }
        });
    }

    // --- Funcionalidade: Botão Voltar ao Topo (NOVO) ---
    const backToTopButton = document.querySelector('.back-to-top');

    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            // Mostra o botão depois de rolar X pixels (ajuste conforme necessário)
            if (window.scrollY > 300) {
                backToTopButton.classList.add('active');
            } else {
                backToTopButton.classList.remove('active');
            }
        });

        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault(); // Previne o comportamento padrão do link '#'
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // Rolagem suave
            });
        });
    }

}); // Fim do DOMContentLoaded