// Sistema de Comunicação e Gerenciamento do Site
class SiteCommunication {
    constructor() {
        // Caminhos CORRETOS para index.html na RAIZ
this.components = {
    header: { id: 'header-component', file: 'components/header.html' },
    footer: { id: 'footer-component', file: 'components/footer.html' }
};
        this.init();
    }

    init() {
        this.setupCommunication();
        this.loadComponents();
    }

    setupCommunication() {
        // Comunicação entre abas do navegador
        window.addEventListener('storage', (e) => {
            if (e.key === 'uro-site-data') {
                this.handleMessage(JSON.parse(e.newValue));
            }
        });

        // Comunicação na mesma página
        window.addEventListener('uro-message', (e) => {
            this.handleMessage(e.detail);
        });
    }

    // Carregar componentes do site
    async loadComponents() {
        try {
            // Carregar header e footer simultaneamente
            const promises = [
                this.loadComponent(this.components.header),
                this.loadComponent(this.components.footer)
            ];
            
            await Promise.all(promises);
            this.onComponentsLoaded();
            
        } catch (error) {
            console.error('Erro ao carregar componentes:', error);
            this.handleComponentsError();
        }
    }

    async loadComponent(component) {
        const element = document.getElementById(component.id);
        if (!element) {
            console.warn(`Elemento #${component.id} não encontrado`);
            return;
        }

        try {
            const response = await fetch(component.file);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            
            const html = await response.text();
            element.innerHTML = html;
            
        } catch (error) {
            console.error(`Erro ao carregar ${component.file}:`, error);
            element.innerHTML = this.getFallbackContent(component.id);
        }
    }

    getFallbackContent(componentId) {
        const fallbacks = {
            'header-component': `
                <div class="bg-uro-branco shadow-md p-4 text-center">
                    <h1 class="text-2xl font-bold text-uro-azul_escuro">Uroginecologia em Dia</h1>
                    <p class="text-sm text-gray-600">Menu temporariamente indisponível</p>
                </div>
            `,
            'footer-component': `
                <div class="bg-uro-azul_escuro text-white p-8 text-center">
                    <p>© 2025 Uroginecologia em Dia. Todos os direitos reservados.</p>
                </div>
            `
        };
        return fallbacks[componentId] || '<p>Componente não carregado</p>';
    }

    onComponentsLoaded() {
        // Atualizar ícones (versão otimizada)
        if (window.UroUtils && window.UroUtils.replaceFeatherIcons) {
            window.UroUtils.replaceFeatherIcons();
        } else if (typeof feather !== 'undefined') {
            feather.replace(); // fallback
        }

        // Inicializar funcionalidades
        this.setupNavigation();
        this.initializeHeaderEvents();
        this.initializeSearch();

        console.log('✅ Componentes do site carregados com sucesso');
    }

    handleComponentsError() {
        // Fallback básico se os componentes não carregarem
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }

    setupNavigation() {
        // Destacar página atual no menu
        const currentPage = this.getCurrentPage();
        this.highlightCurrentPage(currentPage);
    }

    getCurrentPage() {
        const path = window.location.pathname;
        const page = path.split('/').pop() || 'index.html';
        
        // Mapeamento de páginas para identificar a ativa
        const pageMap = {
            'index.html': 'index',
            'protocolos.html': 'protocolos',
            'artigos.html': 'artigos',
            'eventos.html': 'eventos', 
            'noticias.html': 'noticias',
            'sobre.html': 'sobre',
            'contato.html': 'contato'
        };
        
        return pageMap[page] || page.replace('.html', '');
    }

    highlightCurrentPage(currentPage) {
        // Destacar no menu desktop
        document.querySelectorAll('.nav-button').forEach(button => {
            const href = button.getAttribute('href');
            const buttonPage = href ? href.replace('.html', '') : '';
            
            if (buttonPage === currentPage || 
                (currentPage === 'index' && buttonPage === '')) {
                button.classList.add('border-uro-azul', 'text-uro-azul');
                button.classList.remove('border-transparent');
            } else {
                button.classList.remove('border-uro-azul', 'text-uro-azul');
                button.classList.add('border-transparent');
            }
        });

        // Destacar no menu mobile
        document.querySelectorAll('#mobileMenu a').forEach(link => {
            const href = link.getAttribute('href');
            const linkPage = href ? href.replace('.html', '') : '';
            
            if (linkPage === currentPage || 
                (currentPage === 'index' && linkPage === '')) {
                link.classList.add('bg-uro-azul', 'text-white');
                link.classList.remove('text-uro-azul_escuro', 'hover:bg-uro-cinza');
            }
        });
    }

    initializeHeaderEvents() {
        // Menu mobile já é inicializado pelo common.js
        // Removida duplicação de código
    }

    initializeSearch() {
        const searchInput = document.getElementById('searchInput');
        const searchButton = document.getElementById('searchButton');

        const performSearch = () => {
            const searchTerm = searchInput.value.trim();

            if (searchTerm) {
                this.sendMessage('search-performed', {
                    terms: [searchTerm],
                    timestamp: Date.now()
                });

                // Usar buildUrl para garantir path correto
                const searchUrl = window.UroUtils
                    ? window.UroUtils.buildUrl(`pages/busca.html?q=${encodeURIComponent(searchTerm)}`)
                    : `pages/busca.html?q=${encodeURIComponent(searchTerm)}`; // fallback

                window.location.href = searchUrl;
            }
        };

        if (searchButton) {
            searchButton.addEventListener('click', performSearch);
        }
        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    performSearch();
                }
            });
        }
    }

    // Sistema de mensagens
    sendMessage(type, data) {
        const message = {
            type: type,
            data: data,
            timestamp: Date.now(),
            page: this.getCurrentPage()
        };
        
        // Para outras abas
        localStorage.setItem('uro-site-data', JSON.stringify(message));
        
        // Para mesma página
        window.dispatchEvent(new CustomEvent('uro-message', { detail: message }));
        
        console.log('📨 Mensagem enviada:', message);
    }

    handleMessage(message) {
        console.log('📬 Mensagem recebida:', message);
        
        switch(message.type) {
            case 'user-preference':
                this.handleUserPreference(message.data);
                break;
            case 'content-viewed':
                this.updateContentViewCount(message.data);
                break;
            case 'search-performed':
                this.highlightSearchTerms(message.data);
                break;
            default:
                console.log('Tipo de mensagem não reconhecido:', message.type);
        }
    }

    handleUserPreference(data) {
        if (data.theme) {
            document.documentElement.className = data.theme;
            localStorage.setItem('uro-theme', data.theme);
        }
    }

    updateContentViewCount(data) {
        if (data.contentId) {
            const viewCount = localStorage.getItem(`views-${data.contentId}`) || 0;
            localStorage.setItem(`views-${data.contentId}`, parseInt(viewCount) + 1);
        }
    }

    highlightSearchTerms(data) {
        // Pode ser implementado para destacar termos em outras abas
        if (data.terms && data.terms.length > 0) {
            console.log('Termos para destacar:', data.terms);
        }
    }
}

// Inicialização global do site
// Nota: ScrollAnimations removida - já está no common.js
class UroSite {
    constructor() {
        this.communication = null;
        this.init();
    }

    init() {
        // Aguardar DOM estar pronto
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.start());
        } else {
            this.start();
        }
    }

    start() {
        console.log('🚀 Inicializando Uroginecologia em Dia...');

        // Inicializar sistemas
        this.communication = new SiteCommunication();
        // Animações já são inicializadas pelo common.js

        // Configurações adicionais
        this.setupGlobalEvents();
        this.loadUserPreferences();

        console.log('✅ Site inicializado com sucesso');
    }

    setupGlobalEvents() {
        // Eventos globais do site
        window.addEventListener('online', () => {
            this.showNotification('Conexão restaurada', 'success');
        });

        window.addEventListener('offline', () => {
            this.showNotification('Conexão perdida', 'warning');
        });
    }

    loadUserPreferences() {
        // Carregar tema salvo
        const savedTheme = localStorage.getItem('uro-theme');
        if (savedTheme) {
            document.documentElement.className = savedTheme;
        }
    }

    showNotification(message, type = 'info') {
        // Sistema simples de notificações
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
            type === 'success' ? 'bg-green-500' : 
            type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
        } text-white`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Inicializar o site
const uroSite = new UroSite();

// Funções globais para uso em outras páginas
window.UroSiteUtils = {
    trackContentView: (contentId, title) => {
        uroSite.communication.sendMessage('content-viewed', {
            contentId: contentId,
            title: title,
            url: window.location.href
        });
    },
    
    setUserPreference: (key, value) => {
        uroSite.communication.sendMessage('user-preference', {
            [key]: value
        });
    },
    
    getViewCount: (contentId) => {
        return localStorage.getItem(`views-${contentId}`) || 0;
    }
};