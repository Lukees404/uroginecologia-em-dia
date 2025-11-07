/**
 * common.js - Funcionalidades compartilhadas entre todas as páginas
 * Autor: Uroginecologia em Dia
 * Descrição: Menu mobile, busca, newsletter e outras funcionalidades comuns
 */

// ==========================================
// MENU MOBILE TOGGLE
// ==========================================

// Menu Mobile Toggle
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('menuToggleMobile');
  const mobileMenu = document.getElementById('mobileMenuNav');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function() {
      const isHidden = mobileMenu.classList.toggle('hidden');
      this.setAttribute('aria-expanded', !isHidden);

      // Animar ícone
      const path = this.querySelector('svg path');
      if (!isHidden) {
        path.setAttribute('d', 'M6 18L18 6M6 6l12 12'); // X
      } else {
        path.setAttribute('d', 'M4 6h16M4 12h16M4 18h16'); // Hambúrguer
      }
    });

    // Fechar ao clicar em link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuToggle.setAttribute('aria-expanded', 'false');
        const path = menuToggle.querySelector('svg path');
        path.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
      });
    });

    // Fechar ao clicar fora
    document.addEventListener('click', (e) => {
      if (!menuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.add('hidden');
        menuToggle.setAttribute('aria-expanded', 'false');
        const path = menuToggle.querySelector('svg path');
        path.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
      }
    });
  }
});

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
    initializeMobileMenu();
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
// FUNÇÃO DE DOWNLOAD PDF - VERSÃO MELHORADA
// ============================================

async function downloadPDF() {
  const button = document.getElementById('btnText');
  const originalText = button ? button.textContent : 'Baixar PDF';

  try {
    if (button) {
      button.textContent = 'Gerando PDF...';
      button.disabled = true;
    }

    const { jsPDF } = window.jspdf;
    const conteudo = document.getElementById('conteudo-pdf');

    if (!conteudo) {
      throw new Error('Conteúdo não encontrado');
    }

    // Configurações do PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20; // 20mm de margem
    const contentWidth = pageWidth - (margin * 2);
    const lineHeight = 7; // Altura da linha
    let currentY = margin;
    let currentPage = 1;

    // Função auxiliar para adicionar nova página
    function addNewPage() {
      pdf.addPage();
      currentPage++;
      currentY = margin;
    }

    // Função auxiliar para verificar espaço e adicionar página se necessário
    function checkSpace(neededSpace) {
      if (currentY + neededSpace > pageHeight - margin) {
        addNewPage();
        return true;
      }
      return false;
    }

    // ===== CABEÇALHO DO DOCUMENTO =====

    // Logo ou ícone (opcional)
    pdf.setFillColor(30, 64, 175); // Azul escuro
    pdf.circle(margin + 5, currentY + 5, 5, 'F');

    // Título
    const titulo = conteudo.querySelector('h1');
    if (titulo) {
      pdf.setFontSize(20);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(30, 64, 175);

      const tituloText = titulo.textContent;
      const tituloLines = pdf.splitTextToSize(tituloText, contentWidth - 15);

      currentY += 2;
      tituloLines.forEach(line => {
        pdf.text(line, margin + 15, currentY);
        currentY += 8;
      });
      currentY += 5;
    }

    // Linha separadora
    pdf.setDrawColor(30, 64, 175);
    pdf.setLineWidth(0.5);
    pdf.line(margin, currentY, pageWidth - margin, currentY);
    currentY += 8;

    // ===== INFORMAÇÕES DO DOCUMENTO =====

    const infoDiv = conteudo.querySelector('.text-sm.text-gray-600, .text-gray-600');
    if (infoDiv) {
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(100, 100, 100);

      const infos = infoDiv.querySelectorAll('p');
      infos.forEach(p => {
        const text = p.textContent.trim();
        if (text) {
          pdf.text(text, margin, currentY);
          currentY += 5;
        }
      });
      currentY += 5;
    }

    // ===== CONTEÚDO PRINCIPAL =====

    const proseDiv = conteudo.querySelector('.prose, .prose-blue');
    if (proseDiv) {
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(0, 0, 0);

      // Processar todos os elementos do conteúdo
      const elementos = proseDiv.children;

      for (let i = 0; i < elementos.length; i++) {
        const elemento = elementos[i];
        const tagName = elemento.tagName.toLowerCase();

        // Verificar espaço disponível
        checkSpace(lineHeight * 2);

        if (tagName === 'h2') {
          // Título H2
          checkSpace(15);
          pdf.setFontSize(16);
          pdf.setFont('helvetica', 'bold');
          pdf.setTextColor(30, 64, 175);
          currentY += 5;

          const h2Text = elemento.textContent.trim();
          const h2Lines = pdf.splitTextToSize(h2Text, contentWidth);
          h2Lines.forEach(line => {
            pdf.text(line, margin, currentY);
            currentY += 7;
          });
          currentY += 3;

          pdf.setFontSize(11);
          pdf.setFont('helvetica', 'normal');
          pdf.setTextColor(0, 0, 0);

        } else if (tagName === 'h3') {
          // Título H3
          checkSpace(12);
          pdf.setFontSize(14);
          pdf.setFont('helvetica', 'bold');
          pdf.setTextColor(59, 130, 246);
          currentY += 4;

          const h3Text = elemento.textContent.trim();
          const h3Lines = pdf.splitTextToSize(h3Text, contentWidth);
          h3Lines.forEach(line => {
            pdf.text(line, margin, currentY);
            currentY += 6;
          });
          currentY += 2;

          pdf.setFontSize(11);
          pdf.setFont('helvetica', 'normal');
          pdf.setTextColor(0, 0, 0);

        } else if (tagName === 'p') {
          // Parágrafo
          const paragrafoText = elemento.textContent.trim();
          if (paragrafoText) {
            const lines = pdf.splitTextToSize(paragrafoText, contentWidth);

            lines.forEach(line => {
              if (checkSpace(lineHeight)) {
                // Nova página foi adicionada
              }
              pdf.text(line, margin, currentY);
              currentY += lineHeight;
            });
            currentY += 3; // Espaço entre parágrafos
          }

        } else if (tagName === 'ul' || tagName === 'ol') {
          // Listas
          const items = elemento.querySelectorAll('li');
          const isOrdered = tagName === 'ol';

          items.forEach((item, index) => {
            checkSpace(lineHeight * 2);

            const bullet = isOrdered ? `${index + 1}.` : '•';
            const itemText = item.textContent.trim();
            const lines = pdf.splitTextToSize(itemText, contentWidth - 10);

            // Primeira linha com bullet
            pdf.text(bullet, margin + 2, currentY);
            pdf.text(lines[0], margin + 10, currentY);
            currentY += lineHeight;

            // Linhas subsequentes (indentadas)
            for (let j = 1; j < lines.length; j++) {
              if (checkSpace(lineHeight)) {
                // Nova página
              }
              pdf.text(lines[j], margin + 10, currentY);
              currentY += lineHeight;
            }
            currentY += 2;
          });
          currentY += 3;

        } else if (tagName === 'blockquote') {
          // Citação
          checkSpace(15);
          pdf.setFillColor(240, 240, 240);
          pdf.setDrawColor(30, 64, 175);
          pdf.setLineWidth(2);

          const quoteText = elemento.textContent.trim();
          const quoteLines = pdf.splitTextToSize(quoteText, contentWidth - 15);
          const quoteHeight = quoteLines.length * lineHeight + 8;

          if (checkSpace(quoteHeight)) {
            // Nova página
          }

          pdf.rect(margin, currentY - 3, contentWidth, quoteHeight, 'F');
          pdf.line(margin, currentY - 3, margin, currentY + quoteHeight - 3);

          currentY += 2;
          pdf.setFont('helvetica', 'italic');
          pdf.setTextColor(60, 60, 60);

          quoteLines.forEach(line => {
            pdf.text(line, margin + 8, currentY);
            currentY += lineHeight;
          });

          currentY += 6;
          pdf.setFont('helvetica', 'normal');
          pdf.setTextColor(0, 0, 0);

        } else if (tagName === 'strong' || tagName === 'b') {
          // Texto em negrito (dentro de parágrafo já processado)
          continue;

        } else {
          // Outros elementos (tratar como parágrafo)
          const text = elemento.textContent.trim();
          if (text) {
            const lines = pdf.splitTextToSize(text, contentWidth);
            lines.forEach(line => {
              if (checkSpace(lineHeight)) {
                // Nova página
              }
              pdf.text(line, margin, currentY);
              currentY += lineHeight;
            });
            currentY += 3;
          }
        }
      }
    }

    // ===== RODAPÉ EM TODAS AS PÁGINAS =====

    const totalPages = pdf.internal.getNumberOfPages();

    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);

      // Linha superior do rodapé
      pdf.setDrawColor(200, 200, 200);
      pdf.setLineWidth(0.3);
      pdf.line(margin, pageHeight - 15, pageWidth - margin, pageHeight - 15);

      // Texto do rodapé
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(120, 120, 120);

      // Esquerda: Site
      pdf.text('Uroginecologia Em Dia - uroginecologiaemdia.com.br', margin, pageHeight - 10);

      // Direita: Número da página
      const pageText = `Página ${i} de ${totalPages}`;
      const pageTextWidth = pdf.getTextWidth(pageText);
      pdf.text(pageText, pageWidth - margin - pageTextWidth, pageHeight - 10);

      // Centro: Data de geração
      const dataGeracao = new Date().toLocaleDateString('pt-BR');
      const dataText = `Gerado em: ${dataGeracao}`;
      const dataTextWidth = pdf.getTextWidth(dataText);
      pdf.text(dataText, (pageWidth - dataTextWidth) / 2, pageHeight - 10);
    }

    // ===== DOWNLOAD =====

    const tituloArquivo = conteudo.querySelector('h1')?.textContent || 'documento';
    const nomeArquivo = tituloArquivo
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .substring(0, 50);

    pdf.save(`${nomeArquivo}.pdf`);

    console.log(`PDF gerado com sucesso: ${totalPages} páginas`);

    // Track download no Google Analytics
    if (typeof trackPDFDownload === 'function') {
      trackPDFDownload(nomeArquivo, window.location.href);
    }

  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    alert('Erro ao gerar PDF. Por favor, tente novamente.');
  } finally {
    if (button) {
      button.textContent = originalText;
      button.disabled = false;
    }
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
