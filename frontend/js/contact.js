document.addEventListener('DOMContentLoaded', function () {
    const ENDPOINT = 'https://formspree.io/f/xzzoqoya';

    // Select forms: explicit id or form inside #contato section
    const forms = document.querySelectorAll('form#contact-form, #contato form');
    if (!forms || forms.length === 0) return;

    forms.forEach(form => {
        // Locate or create feedback element
        let feedback = form.querySelector('#contact-feedback');
        if (!feedback) {
            feedback = document.createElement('div');
            feedback.id = 'contact-feedback';
            feedback.setAttribute('role', 'status');
            feedback.className = 'hidden text-sm mt-2';
            // insert after submit button if possible
            const submit = form.querySelector('button[type="submit"]');
            if (submit && submit.parentNode) submit.parentNode.insertBefore(feedback, submit.nextSibling);
            else form.appendChild(feedback);
        }

        form.addEventListener('submit', async function (e) {
            e.preventDefault();
            const submitButton = form.querySelector('button[type="submit"]');
            if (submitButton) submitButton.disabled = true;

            // support different id/names between pages (name/nome, message/mensagem)
            const nameEl = form.querySelector('#name, #nome, [name="name"], [name="nome"]');
            const emailEl = form.querySelector('#email, input[type="email"], [name="email"]');
            const messageEl = form.querySelector('#message, #mensagem, [name="message"], [name="mensagem"], textarea');

            const data = {
                name: nameEl ? nameEl.value : '',
                email: emailEl ? emailEl.value : '',
                message: messageEl ? messageEl.value : ''
            };

            try {
                const res = await fetch(ENDPOINT, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (res.ok) {
                    feedback.classList.remove('hidden');
                    feedback.classList.remove('text-red-600');
                    feedback.classList.add('text-green-600');
                    feedback.textContent = 'Mensagem enviada com sucesso. Obrigado!';
                    form.reset();
                } else {
                    feedback.classList.remove('hidden');
                    feedback.classList.remove('text-green-600');
                    feedback.classList.add('text-red-600');
                    feedback.textContent = 'Ocorreu um erro ao enviar. Tente novamente mais tarde.';
                }
            } catch (err) {
                feedback.classList.remove('hidden');
                feedback.classList.remove('text-green-600');
                feedback.classList.add('text-red-600');
                feedback.textContent = 'Erro de rede. Verifique sua conexão e tente novamente.';
            } finally {
                if (submitButton) submitButton.disabled = false;
                setTimeout(() => {
                    if (feedback) feedback.classList.add('hidden');
                }, 7000);
            }
        });
    });
});
