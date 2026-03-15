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
 * Inicializa o formulário de newsletter — Integração Brevo (sem API key)
 * Usa o endpoint público de formulários do Brevo.
 * 
 * SETUP NO BREVO:
 * 1. Vá em Contacts > Forms > Create a new form
 * 2. Crie um formulário simples com campo Email
 * 3. Na aba "Settings", escolha a lista "Newsletter Uroginecologia"
 * 4. Salve e pegue o FORM_ID da URL (ex: https://app.brevo.com/contacts/forms/XX)
 * 5. Substitua o BREVO_FORM_ID abaixo pelo seu ID
 */
const BREVO_FORM_ID = 2; // ← Substitua pelo ID do seu formulário no Brevo

function initializeNewsletter() {
    const newsletterForm = document.getElementById('newsletterForm');
    if (!newsletterForm) return;

    newsletterForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const emailInput = document.getElementById('newsletterEmail');
        if (!emailInput) return;

        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            showNewsletterMessage('Por favor, insira um email válido.', 'error');
            return;
        }

        const submitBtn = newsletterForm.querySelector('button[type="submit"]');
        const originalText = submitBtn ? submitBtn.textContent : '';
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';
        }

        try {
            // Usa o endpoint público de formulários do Brevo (não requer API key)
            const formData = new FormData();
            formData.append('EMAIL', email);
            formData.append('email_address_check', ''); // honeypot anti-spam
            formData.append('locale', 'pt');

            const response = await fetch(
                `https://sibforms.com/serve/MUIFALxxxxxxx`, // ← URL do formulário Brevo
                {
                    method: 'POST',
                    body: formData,
                    mode: 'no-cors' // Brevo não retorna CORS headers
                }
            );

            // Com mode: 'no-cors' não temos acesso ao status,
            // mas o cadastro é feito. Mostramos mensagem de sucesso.
            showNewsletterMessage('✅ Inscrição realizada com sucesso! Verifique seu email para confirmar.', 'success');
            emailInput.value = '';

            if (typeof trackNewsletterSignup === 'function') {
                trackNewsletterSignup(email);
            }
        } catch (error) {
            console.error('Erro ao cadastrar newsletter:', error);
            showNewsletterMessage('⚠️ Erro de conexão. Tente novamente em alguns instantes.', 'error');
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        }
    });
}

function showNewsletterMessage(message, type) {
    const newsletterMessage = document.getElementById('newsletterMessage');
    if (!newsletterMessage) return;

    newsletterMessage.textContent = message;
    newsletterMessage.classList.remove('hidden');
    newsletterMessage.style.color = type === 'error' ? '#fca5a5' : '#fce7f3';
    newsletterMessage.style.opacity = type === 'error' ? '1' : '0.9';

    setTimeout(() => {
        newsletterMessage.classList.add('hidden');
    }, 8000);
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
// DOWNLOAD PDF - VERSÃO OTIMIZADA
// ============================================

function downloadPDF() {
  console.log('📄 Iniciando geração de PDF...');

  // Encontrar botão de download
  const button = event?.target?.closest('button') || document.querySelector('button[onclick*="downloadPDF"]');
  const originalText = button ? button.textContent : 'Baixar PDF';

  if (button) {
    button.textContent = 'Gerando PDF...';
    button.disabled = true;
  }

  // Encontrar elemento de conteúdo
  const element = document.getElementById('conteudo-pdf');

  if (!element) {
    console.error('❌ Elemento #conteudo-pdf não encontrado');
    alert('Conteúdo não encontrado para gerar PDF');
    if (button) {
      button.textContent = originalText;
      button.disabled = false;
    }
    return;
  }

  // Criar clone do elemento para manipulação
  const clone = element.cloneNode(true);
  console.log('✅ Clone do conteúdo criado');

  // Remover elementos indesejados do clone
  const selectorsToRemove = [
    '.no-print',
    'button',
    '.btn',
    'nav',
    '.navigation',
    'script',
    'style'
  ];

  selectorsToRemove.forEach(selector => {
    const elements = clone.querySelectorAll(selector);
    elements.forEach(el => {
      console.log(`🗑️ Removendo elemento: ${selector}`);
      el.remove();
    });
  });

  // Aplicar estilos inline para garantir renderização correta
  applyPDFStyles(clone);

  // Criar container temporário
  const tempContainer = document.createElement('div');
  tempContainer.id = 'pdf-temp-container';
  tempContainer.style.cssText = `
    position: absolute;
    left: -9999px;
    top: 0;
    width: 210mm;
    background: white;
    padding: 15mm;
    font-family: 'Arial', 'Helvetica', sans-serif;
    font-size: 12pt;
    line-height: 1.6;
    color: #000;
  `;

  tempContainer.appendChild(clone);
  document.body.appendChild(tempContainer);
  console.log('✅ Container temporário criado');

  // Configurações OTIMIZADAS do PDF
  const opt = {
    margin: [12, 12, 15, 12], // [top, left, bottom, right] em mm
    filename: gerarNomeArquivo(),
    image: {
      type: 'jpeg',
      quality: 0.95
    },
    html2canvas: {
      scale: 2,
      useCORS: true,
      letterRendering: true,
      logging: false,
      backgroundColor: '#ffffff',
      removeContainer: false,
      imageTimeout: 15000,
      scrollY: 0,
      scrollX: 0
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait',
      compress: true
    },
    pagebreak: {
      mode: ['css', 'legacy'], // ✅ Removido 'avoid-all'
      before: '.page-break-before',
      after: '.page-break-after',
      avoid: 'img' // ✅ Apenas imagens
    }
  };

  console.log('⚙️ Configurações do PDF:', opt);

  // Adicionar rodapé
  adicionarRodape(clone);

  // Gerar PDF
  html2pdf()
    .set(opt)
    .from(tempContainer)
    .save()
    .then(() => {
      console.log('✅ PDF gerado com sucesso!');

      // Limpar container temporário
      if (tempContainer && tempContainer.parentNode) {
        tempContainer.parentNode.removeChild(tempContainer);
      }

      if (button) {
        button.textContent = originalText;
        button.disabled = false;
      }

      // Track download no Google Analytics
      if (typeof trackPDFDownload === 'function') {
        trackPDFDownload(gerarNomeArquivo(), window.location.href);
      }

      // Mostrar mensagem de sucesso
      showPDFNotification('PDF gerado com sucesso!', 'success');
    })
    .catch(error => {
      console.error('❌ Erro ao gerar PDF:', error);

      // Limpar container temporário
      if (tempContainer && tempContainer.parentNode) {
        tempContainer.parentNode.removeChild(tempContainer);
      }

      if (button) {
        button.textContent = originalText;
        button.disabled = false;
      }

      showPDFNotification('Erro ao gerar PDF. Tente novamente.', 'error');
    });
}

/**
 * Aplica estilos inline no conteúdo para garantir renderização no PDF
 */
function applyPDFStyles(element) {
  // Títulos H2
  element.querySelectorAll('h2').forEach(h2 => {
    h2.style.cssText = `
      font-size: 20pt;
      color: #1e40af;
      margin-top: 20pt;
      margin-bottom: 12pt;
      font-weight: bold;
      page-break-after: avoid;
      border-bottom: 2px solid #3b82f6;
      padding-bottom: 8pt;
    `;
  });

  // Títulos H3
  element.querySelectorAll('h3').forEach(h3 => {
    h3.style.cssText = `
      font-size: 16pt;
      color: #1e40af;
      margin-top: 16pt;
      margin-bottom: 10pt;
      font-weight: bold;
      page-break-after: avoid;
    `;
  });

  // Parágrafos
  element.querySelectorAll('p').forEach(p => {
    p.style.cssText = `
      font-size: 11pt;
      line-height: 1.6;
      margin-bottom: 10pt;
      text-align: justify;
      color: #1f2937;
    `;
  });

  // Listas
  element.querySelectorAll('ul, ol').forEach(list => {
    list.style.cssText = `
      margin-left: 15pt;
      margin-bottom: 10pt;
      page-break-inside: avoid;
    `;
  });

  element.querySelectorAll('li').forEach(li => {
    li.style.cssText = `
      font-size: 11pt;
      line-height: 1.5;
      margin-bottom: 6pt;
      color: #1f2937;
    `;
  });

  // Tabelas
  element.querySelectorAll('table').forEach(table => {
    table.style.cssText = `
      width: 100%;
      border-collapse: collapse;
      margin: 12pt 0;
      page-break-inside: auto;
      font-size: 10pt;
    `;
  });

  element.querySelectorAll('th, td').forEach(cell => {
    cell.style.cssText = `
      border: 1px solid #ddd;
      padding: 8pt;
      text-align: left;
    `;
  });

  element.querySelectorAll('th').forEach(th => {
    th.style.cssText += `
      background-color: #3b82f6;
      color: white;
      font-weight: bold;
    `;
  });

  // Boxes destacados
  element.querySelectorAll('.highlight-box, .key-point, [class*="bg-blue"], [class*="bg-yellow"], [class*="bg-green"]').forEach(box => {
    box.style.cssText = `
      background-color: #f0f9ff;
      border-left: 4px solid #3b82f6;
      padding: 12pt;
      margin: 12pt 0;
      page-break-inside: avoid;
    `;
  });

  console.log('✅ Estilos inline aplicados');
}

/**
 * Mostra notificação de status do PDF
 */
function showPDFNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#10b981' : '#ef4444'};
    color: white;
    padding: 16px 24px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 10000;
    font-weight: 500;
    animation: slideIn 0.3s ease-out;
  `;
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
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
