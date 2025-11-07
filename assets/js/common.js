/**
 * common.js - Funcionalidades compartilhadas entre todas as páginas
 * Autor: Uroginecologia em Dia
 * Descrição: Menu mobile, busca, newsletter e outras funcionalidades comuns
 */

// ==========================================
// GOOGLE ANALYTICS 4 - EVENTOS CUSTOMIZADOS
// ==========================================

/**
 * Função auxiliar para enviar eventos ao Google Analytics 4
 * @param {string} eventName - Nome do evento
 * @param {object} eventParams - Parâmetros do evento
 */
function trackGAEvent(eventName, eventParams = {}) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventParams);
    }
}

/**
 * Rastreia clique em protocolos
 * @param {string} protocolName - Nome do protocolo clicado
 * @param {string} protocolUrl - URL do protocolo
 */
function trackProtocolClick(protocolName, protocolUrl) {
    trackGAEvent('protocol_click', {
        protocol_name: protocolName,
        protocol_url: protocolUrl,
        event_category: 'engagement',
        event_label: protocolName
    });
}

/**
 * Rastreia download de PDFs
 * @param {string} fileName - Nome do arquivo PDF
 * @param {string} fileUrl - URL do arquivo
 */
function trackPDFDownload(fileName, fileUrl) {
    trackGAEvent('pdf_download', {
        file_name: fileName,
        file_url: fileUrl,
        event_category: 'download',
        event_label: fileName
    });
}

/**
 * Rastreia submissão de newsletter
 * @param {string} email - Email do usuário (opcional, pode ser omitido por privacidade)
 */
function trackNewsletterSignup(email = '') {
    trackGAEvent('newsletter_signup', {
        event_category: 'engagement',
        event_label: 'newsletter_form',
        method: 'footer_form'
    });
}

/**
 * Rastreia pesquisas realizadas
 * @param {string} searchTerm - Termo pesquisado
 * @param {number} resultsCount - Número de resultados (opcional)
 */
function trackSearch(searchTerm, resultsCount = null) {
    const params = {
        search_term: searchTerm,
        event_category: 'search',
        event_label: searchTerm
    };

    if (resultsCount !== null) {
        params.results_count = resultsCount;
    }

    trackGAEvent('search', params);
}

/**
 * Rastreia clique em artigos
 * @param {string} articleTitle - Título do artigo clicado
 * @param {string} articleUrl - URL do artigo
 */
function trackArticleClick(articleTitle, articleUrl) {
    trackGAEvent('article_click', {
        article_title: articleTitle,
        article_url: articleUrl,
        event_category: 'engagement',
        event_label: articleTitle
    });
}

// Garantir que o DOM está carregado
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    initializeGATracking();
});

/**
 * Inicializa todas as funcionalidades da página
 */
function initializePage() {
    initializeFeatherIcons();
    // Menu mobile é inicializado pelo main.js APÓS carregar o header
    initializeSearch();
    initializeNewsletter();

    console.log('✅ Página inicializada com sucesso');
}

/**
 * Inicializa os ícones Feather (versão otimizada)
 */
function initializeFeatherIcons() {
    if (window.UroUtils && window.UroUtils.replaceFeatherIcons) {
        window.UroUtils.replaceFeatherIcons();
    } else if (typeof feather !== 'undefined') {
        feather.replace(); // fallback
    }
}

/**
 * Inicializa o menu mobile
 * IMPORTANTE: Esta função deve ser chamada APÓS o header ser carregado
 */
function initializeMobileMenu() {
    // Prevenir inicialização duplicada
    if (window._mobileMenuInitialized) {
        console.log('⚠️ Menu mobile já foi inicializado, ignorando chamada duplicada');
        return;
    }

    console.log('🔍 Inicializando menu mobile...');

    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const closeMobileMenu = document.getElementById('closeMobileMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

    // Log detalhado para debug
    console.log('🔍 Elementos encontrados:');
    console.log('  - mobileMenuButton:', mobileMenuButton ? '✅' : '❌');
    console.log('  - closeMobileMenu:', closeMobileMenu ? '✅' : '❌');
    console.log('  - mobileMenu:', mobileMenu ? '✅' : '❌');
    console.log('  - mobileMenuOverlay:', mobileMenuOverlay ? '✅' : '❌');

    if (!mobileMenu) {
        console.error('❌ Menu mobile não encontrado! Certifique-se que o header foi carregado.');
        console.log('IDs disponíveis na página:',
            Array.from(document.querySelectorAll('[id]')).map(el => el.id)
        );
        return;
    }

    if (!mobileMenuButton) {
        console.error('❌ Botão do menu mobile não encontrado!');
        return;
    }

    // Garantir que o menu comece fechado
    mobileMenu.classList.add('hidden');

    /**
     * Abre o menu mobile
     */
    function openMobileMenu(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('📱 Abrindo menu mobile');

        mobileMenu.classList.remove('hidden');
        setTimeout(() => {
            const menuPanel = document.querySelector('#mobileMenu > div:last-child');
            if (menuPanel) {
                menuPanel.classList.remove('-translate-x-full');
            }
        }, 10);
    }

    /**
     * Animação de fechar menu (compartilhada)
     */
    function closeMenuAnimation() {
        console.log('📱 Fechando menu mobile');
        const menuPanel = document.querySelector('#mobileMenu > div:last-child');
        if (menuPanel) {
            menuPanel.classList.add('-translate-x-full');
        }
        setTimeout(() => {
            mobileMenu.classList.add('hidden');
        }, 300);
    }

    /**
     * Fecha o menu mobile (para overlay e botão X)
     * Previne comportamento padrão
     */
    function closeMobileMenuFunc(e) {
        e.preventDefault();
        closeMenuAnimation();
    }

    /**
     * Fecha o menu mobile quando link é clicado
     * NÃO previne comportamento padrão - permite navegação
     */
    function closeMobileMenuAndNavigate() {
        console.log('🔗 Link clicado - navegando e fechando menu');
        closeMenuAnimation();
        // NÃO chama preventDefault - navegação acontece naturalmente
    }

    // Event listeners
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', openMobileMenu);
        console.log('✅ Event listener adicionado ao botão do menu');
    }

    if (closeMobileMenu) {
        closeMobileMenu.addEventListener('click', closeMobileMenuFunc);
        console.log('✅ Event listener adicionado ao botão de fechar');
    }

    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', closeMobileMenuFunc);
        console.log('✅ Event listener adicionado ao overlay');
    }

    // Fechar menu ao clicar em um link (SEM bloquear navegação)
    const menuLinks = document.querySelectorAll('#mobileMenu a');
    console.log(`✅ Adicionando listeners a ${menuLinks.length} links do menu`);
    menuLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenuAndNavigate);
    });

    // Marcar como inicializado
    window._mobileMenuInitialized = true;
    console.log('✅ Menu mobile inicializado com sucesso!');
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
            // Rastrear evento de busca no Google Analytics
            trackSearch(searchTerm);

            // Usar buildUrl para garantir path correto em qualquer página
            const searchUrl = window.UroUtils
                ? window.UroUtils.buildUrl(`pages/busca.html?q=${encodeURIComponent(searchTerm)}`)
                : `pages/busca.html?q=${encodeURIComponent(searchTerm)}`; // fallback

            window.location.href = searchUrl;
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

        // Rastrear evento de newsletter no Google Analytics
        trackNewsletterSignup();

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

/**
 * Inicializa rastreamento automático de eventos do Google Analytics
 */
function initializeGATracking() {
    // Rastrear cliques em links de protocolos
    document.querySelectorAll('a[href*="/protocolo/"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const protocolName = this.textContent.trim();
            const protocolUrl = this.href;
            trackProtocolClick(protocolName, protocolUrl);
        });
    });

    // Rastrear cliques em links de artigos
    document.querySelectorAll('a[href*="/artigo/"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const articleTitle = this.textContent.trim();
            const articleUrl = this.href;
            trackArticleClick(articleTitle, articleUrl);
        });
    });

    // Rastrear downloads de PDFs
    document.querySelectorAll('a[href$=".pdf"], button[onclick*="generatePDF"], button[id*="pdf"]').forEach(element => {
        element.addEventListener('click', function(e) {
            let fileName = 'documento.pdf';
            let fileUrl = '';

            if (this.href && this.href.endsWith('.pdf')) {
                fileName = this.href.split('/').pop();
                fileUrl = this.href;
            } else if (this.textContent.includes('PDF')) {
                fileName = document.title.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.pdf';
                fileUrl = window.location.href;
            }

            trackPDFDownload(fileName, fileUrl);
        });
    });

    // Rastrear navegação entre páginas principais
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            const pageUrl = this.href;
            const pageName = this.textContent.trim();

            trackGAEvent('navigation', {
                page_name: pageName,
                page_url: pageUrl,
                event_category: 'navigation',
                event_label: pageName
            });
        });
    });
}

// Inicializar animações quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeScrollAnimations);
} else {
    initializeScrollAnimations();
}
// ============================================
// DOWNLOAD PDF - VERSÃO SIMPLIFICADA
// ============================================

function downloadPDF() {
  const button = document.getElementById('btnText');
  const originalText = button ? button.textContent : 'Baixar PDF';

  if (button) {
    button.textContent = 'Gerando PDF...';
    button.disabled = true;
  }

  const element = document.getElementById('conteudo-pdf');

  if (!element) {
    alert('Conteúdo não encontrado');
    if (button) {
      button.textContent = originalText;
      button.disabled = false;
    }
    return;
  }

  // Configurações do PDF
  const opt = {
    margin: [15, 15, 20, 15], // [top, left, bottom, right] em mm
    filename: gerarNomeArquivo(),
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      letterRendering: true,
      logging: false
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait'
    },
    pagebreak: {
      mode: ['avoid-all', 'css', 'legacy'],
      before: '.page-break-before',
      after: '.page-break-after',
      avoid: ['h2', 'h3', 'img']
    }
  };

  // Adicionar rodapé antes de gerar
  adicionarRodape(element);

  // Gerar PDF
  html2pdf()
    .set(opt)
    .from(element)
    .save()
    .then(() => {
      console.log('PDF gerado com sucesso');
      if (button) {
        button.textContent = originalText;
        button.disabled = false;
      }
      removerRodape(element);

      // Track download no Google Analytics
      if (typeof trackPDFDownload === 'function') {
        trackPDFDownload(gerarNomeArquivo(), window.location.href);
      }
    })
    .catch(error => {
      console.error('Erro ao gerar PDF:', error);
      alert('Erro ao gerar PDF. Tente novamente.');
      if (button) {
        button.textContent = originalText;
        button.disabled = false;
      }
      removerRodape(element);
    });
}

function gerarNomeArquivo() {
  const titulo = document.querySelector('#conteudo-pdf h1');
  if (!titulo) return 'documento.pdf';

  const nome = titulo.textContent
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 50);

  return nome + '.pdf';
}

function adicionarRodape(element) {
  // Criar elemento de rodapé
  const rodape = document.createElement('div');
  rodape.id = 'pdf-rodape-temp';
  rodape.className = 'pdf-footer';
  rodape.style.cssText = `
    margin-top: 40px;
    padding-top: 20px;
    border-top: 2px solid #e5e7eb;
    text-align: center;
    font-size: 10px;
    color: #6b7280;
  `;

  const data = new Date().toLocaleDateString('pt-BR');
  rodape.innerHTML = `
    <p style="margin: 0;">
      <strong>Uroginecologia Em Dia</strong> - uroginecologiaemdia.com.br
    </p>
    <p style="margin: 5px 0 0 0;">
      Gerado em: ${data}
    </p>
  `;

  element.appendChild(rodape);
}

function removerRodape(element) {
  const rodape = document.getElementById('pdf-rodape-temp');
  if (rodape) {
    rodape.remove();
  }
}

// Tornar função global
window.downloadPDF = downloadPDF;

// Exportar funções de tracking para uso global
window.UroAnalytics = {
    trackProtocolClick,
    trackPDFDownload,
    trackNewsletterSignup,
    trackSearch,
    trackArticleClick,
    trackGAEvent
};
