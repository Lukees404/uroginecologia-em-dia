/**
 * common.js - Funcionalidades compartilhadas entre todas as páginas
 * Autor: Uroginecologia Em Dia
 * Descrição: Menu mobile, busca, newsletter e outras funcionalidades comuns
 */

// Garantir que o DOM está carregado
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
});

/**
 * Inicializa todas as funcionalidades da página
 */
function initializePage() {
    initializeFeatherIcons();
    initializeMobileMenu();
    initializeSearch();
    initializeNewsletter();

    console.log('✅ Página inicializada com sucesso');
}

/**
 * Inicializa os ícones Feather
 */
function initializeFeatherIcons() {
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
}

/**
 * Inicializa o menu mobile
 */
function initializeMobileMenu() {
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const closeMobileMenu = document.getElementById('closeMobileMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

    if (!mobileMenu) return;

    // Garantir que o menu comece fechado
    mobileMenu.classList.add('hidden');

    /**
     * Abre o menu mobile
     */
    function openMobileMenu() {
        mobileMenu.classList.remove('hidden');
        setTimeout(() => {
            const menuPanel = document.querySelector('#mobileMenu > div:last-child');
            if (menuPanel) {
                menuPanel.classList.remove('-translate-x-full');
            }
        }, 10);
    }

    /**
     * Fecha o menu mobile
     */
    function closeMobileMenuFunc() {
        const menuPanel = document.querySelector('#mobileMenu > div:last-child');
        if (menuPanel) {
            menuPanel.classList.add('-translate-x-full');
        }
        setTimeout(() => {
            mobileMenu.classList.add('hidden');
        }, 300);
    }

    // Event listeners
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', openMobileMenu);
    }

    if (closeMobileMenu) {
        closeMobileMenu.addEventListener('click', closeMobileMenuFunc);
    }

    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', closeMobileMenuFunc);
    }

    // Fechar menu ao clicar em um link
    document.querySelectorAll('#mobileMenu a').forEach(link => {
        link.addEventListener('click', closeMobileMenuFunc);
    });
}

/**
 * Inicializa a funcionalidade de busca
 */
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    if (!searchInput || !searchButton) return;

    /**
     * Executa a busca
     */
    function performSearch() {
        const searchTerm = searchInput.value.trim();

        if (searchTerm) {
            // TODO: Implementar página de busca real
            alert(`Buscando por: ${searchTerm}`);
            // window.location.href = `busca.html?q=${encodeURIComponent(searchTerm)}`;
        }
    }

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

/**
 * Inicializa o formulário de newsletter
 */
function initializeNewsletter() {
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterMessage = document.getElementById('newsletterMessage');

    if (!newsletterForm) return;

    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const emailInput = document.getElementById('newsletterEmail');
        if (!emailInput) return;

        const email = emailInput.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            showNewsletterMessage('Por favor, insira um email válido.', 'error');
            return;
        }

        // TODO: Implementar envio real para backend
        showNewsletterMessage('Obrigado por assinar nossa newsletter!', 'success');
        newsletterForm.reset();

        setTimeout(() => {
            if (newsletterMessage) {
                newsletterMessage.classList.add('hidden');
            }
        }, 5000);
    });

    /**
     * Mostra mensagem do formulário de newsletter
     * @param {string} message - Mensagem a ser exibida
     * @param {string} type - Tipo da mensagem (success ou error)
     */
    function showNewsletterMessage(message, type) {
        if (!newsletterMessage) return;

        newsletterMessage.textContent = message;
        newsletterMessage.classList.remove('hidden');

        if (type === 'error') {
            newsletterMessage.classList.remove('text-green-300');
            newsletterMessage.classList.add('text-red-300');
        } else {
            newsletterMessage.classList.remove('text-red-300');
            newsletterMessage.classList.add('text-green-300');
        }
    }
}

/**
 * Adiciona animações ao scroll
 */
function initializeScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observar todas as sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Observar cards
    document.querySelectorAll('.card-hover').forEach(card => {
        observer.observe(card);
    });
}

// Inicializar animações quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeScrollAnimations);
} else {
    initializeScrollAnimations();
}
