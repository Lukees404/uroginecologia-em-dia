/**
 * ============================================================
 * INTEGRAÇÃO EMAILJS (Formulário de Contato) — CONFIGURADO
 * ============================================================
 * 
 * Coloque este arquivo em: assets/js/pages/contato-emailjs.js
 * 
 * No <head> de pages/contato.html, adicione:
 * <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
 * 
 * Antes do </body> de pages/contato.html, adicione:
 * <script src="assets/js/pages/contato-emailjs.js" defer></script>
 */

const EMAILJS_SERVICE_ID = 'service_atze3b3';
const EMAILJS_TEMPLATE_ID = 'template_kajfxhc';
const EMAILJS_PUBLIC_KEY = '7v3-j1fBSVEIsc1_P';

document.addEventListener('DOMContentLoaded', function() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
        console.log('✅ EmailJS inicializado');
    } else {
        console.error('❌ EmailJS SDK não encontrado. Adicione o script no <head>.');
        return;
    }

    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (!contactForm) return;

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const name = document.getElementById('name')?.value.trim();
        const email = document.getElementById('email')?.value.trim();
        const phone = document.getElementById('phone')?.value.trim() || 'Não informado';
        const subject = document.getElementById('subject')?.value || 'Não especificado';
        const message = document.getElementById('message')?.value.trim();

        if (!name || !email || !message) {
            showFormMessage('Por favor, preencha todos os campos obrigatórios.', 'error');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormMessage('Por favor, insira um email válido.', 'error');
            return;
        }

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn ? submitBtn.innerHTML : '';
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '⏳ Enviando...';
        }

        try {
            const subjectMap = {
                'duvida': 'Dúvida sobre conteúdo',
                'sugestao': 'Sugestão de tema',
                'colaboracao': 'Interesse em colaborar',
                'eventos': 'Informações sobre eventos',
                'tecnico': 'Problema técnico no site',
                'outro': 'Outro assunto'
            };

            const templateParams = {
                from_name: name,
                from_email: email,
                phone: phone,
                subject: subjectMap[subject] || subject,
                message: message
            };

            const response = await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                templateParams
            );

            if (response.status === 200) {
                showFormMessage('✅ Mensagem enviada com sucesso! Responderemos em até 24 horas.', 'success');
                contactForm.reset();

                if (typeof trackGAEvent === 'function') {
                    trackGAEvent('contact_form_submit', {
                        event_category: 'engagement',
                        event_label: subject
                    });
                }
            } else {
                throw new Error('Resposta inesperada');
            }
        } catch (error) {
            console.error('Erro ao enviar formulário:', error);
            showFormMessage('⚠️ Erro ao enviar mensagem. Tente novamente ou entre em contato por email.', 'error');
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
        }
    });

    function showFormMessage(message, type) {
        if (!formMessage) return;

        formMessage.textContent = message;
        formMessage.classList.remove('hidden');

        if (type === 'success') {
            formMessage.style.background = 'var(--rosa-claro)';
            formMessage.style.color = 'var(--rosa-profundo)';
            formMessage.style.border = '1px solid var(--borda)';
        } else {
            formMessage.style.background = '#fee2e2';
            formMessage.style.color = '#991b1b';
            formMessage.style.border = '1px solid #fca5a5';
        }
        formMessage.style.borderRadius = '10px';

        setTimeout(() => {
            formMessage.classList.add('hidden');
        }, 10000);
    }
});

function toggleFAQ(id) {
    const content = document.getElementById(`faqContent${id}`);
    const icon = document.getElementById(`faqIcon${id}`);
    if (!content) return;

    const isOpen = content.classList.contains('open');

    document.querySelectorAll('.faq-answer').forEach(el => el.classList.remove('open'));
    document.querySelectorAll('[id^="faqIcon"]').forEach(el => el.textContent = '▼');

    if (!isOpen) {
        content.classList.add('open');
        if (icon) icon.textContent = '▲';
    }
}
