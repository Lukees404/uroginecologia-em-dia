// Sistema de Comunicação e Gerenciamento do Site — REDESIGN
class SiteCommunication {
    constructor() {
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
        window.addEventListener('storage', (e) => {
            if (e.key === 'uro-site-data') {
                this.handleMessage(JSON.parse(e.newValue));
            }
        });
        window.addEventListener('uro-message', (e) => {
            this.handleMessage(e.detail);
        });
    }

    async loadComponents() {
        try {
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
                <header>
                    <div class="header-inner">
                        <a href="/index.html" class="logo">
                            <div class="logo-icon">🌸</div>
                            Uroginecologia em Dia
                        </a>
                    </div>
                </header>
            `,
            'footer-component': `
                <footer>
                    <div class="footer-inner">
                        <div class="footer-copy">© 2025 Uroginecologia em Dia.</div>
                    </div>
                </footer>
            `
        };
        return fallbacks[componentId] || '<p>Componente não carregado</p>';
    }

    onComponentsLoaded() {
        this.setupNavigation();
        this.initializeSearch();

        // Inicializar menu mobile DEPOIS que header foi carregado
        if (typeof initializeMobileMenu === 'function') {
            initializeMobileMenu();
        }

        console.log('✅ Componentes do site carregados com sucesso');
    }

    handleComponentsError() {
        // Nada a fazer sem Feather Icons
    }

    setupNavigation() {
        const currentPage = this.getCurrentPage();
        this.highlightCurrentPage(currentPage);
    }

    getCurrentPage() {
        const path = window.location.pathname;
        const page = path.split('/').pop() || 'index.html';
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
        // Mapeamento de páginas para texto do link
        const pageTextMap = {
            'index': 'Início',
            'protocolos': 'Protocolos',
            'artigos': 'Artigos',
            'eventos': 'Eventos',
            'noticias': 'Notícias',
            'sobre': 'Sobre',
            'contato': 'Fale Conosco'
        };

        // Destacar no menu desktop e mobile (ambos usam .nav-button)
        document.querySelectorAll('.nav-button').forEach(button => {
            const href = button.getAttribute('href') || '';
            // Extrair o nome da página do href
            const hrefPage = href.split('/').pop().replace('.html', '') || 'index';

            if (hrefPage === currentPage ||
                (currentPage === 'index' && (href === '/index.html' || href === '/' || hrefPage === 'index'))) {
                button.classList.add('ativo');
            } else {
                button.classList.remove('ativo');
            }
        });
    }

    initializeSearch() {
        const searchInput = document.getElementById('searchInput');
        const searchButton = document.getElementById('searchButton');

        const performSearch = () => {
            const searchTerm = searchInput ? searchInput.value.trim() : '';
            if (searchTerm) {
                this.sendMessage('search-performed', {
                    terms: [searchTerm],
                    timestamp: Date.now()
                });
                const searchUrl = window.UroUtils
                    ? window.UroUtils.buildUrl(`pages/busca.html?q=${encodeURIComponent(searchTerm)}`)
                    : `pages/busca.html?q=${encodeURIComponent(searchTerm)}`;
                window.location.href = searchUrl;
            }
        };

        if (searchButton) searchButton.addEventListener('click', performSearch);
        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') performSearch();
            });
        }

        // Also wire up hero search if present
        const heroInput = document.getElementById('heroSearchInput');
        const heroBtn = document.getElementById('heroSearchBtn');
        const heroSearch = () => {
            const term = heroInput ? heroInput.value.trim() : '';
            if (term) {
                const searchUrl = window.UroUtils
                    ? window.UroUtils.buildUrl(`pages/busca.html?q=${encodeURIComponent(term)}`)
                    : `pages/busca.html?q=${encodeURIComponent(term)}`;
                window.location.href = searchUrl;
            }
        };
        if (heroBtn) heroBtn.addEventListener('click', heroSearch);
        if (heroInput) heroInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') heroSearch(); });

        // Wire up search tags
        document.querySelectorAll('.search-tag').forEach(tag => {
            tag.addEventListener('click', function() {
                const term = this.textContent.trim();
                const searchUrl = window.UroUtils
                    ? window.UroUtils.buildUrl(`pages/busca.html?q=${encodeURIComponent(term)}`)
                    : `pages/busca.html?q=${encodeURIComponent(term)}`;
                window.location.href = searchUrl;
            });
        });
    }

    // Sistema de mensagens
    sendMessage(type, data) {
        const message = { type, data, timestamp: Date.now(), page: this.getCurrentPage() };
        localStorage.setItem('uro-site-data', JSON.stringify(message));
        window.dispatchEvent(new CustomEvent('uro-message', { detail: message }));
    }

    handleMessage(message) {
        switch(message.type) {
            case 'user-preference': this.handleUserPreference(message.data); break;
            case 'content-viewed': this.updateContentViewCount(message.data); break;
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
}

class UroSite {
    constructor() {
        this.communication = null;
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.start());
        } else {
            this.start();
        }
    }

    start() {
        this.communication = new SiteCommunication();
        this.setupGlobalEvents();
        this.loadUserPreferences();
    }

    setupGlobalEvents() {
        window.addEventListener('online', () => this.showNotification('Conexão restaurada', 'success'));
        window.addEventListener('offline', () => this.showNotification('Conexão perdida', 'warning'));
    }

    loadUserPreferences() {
        const savedTheme = localStorage.getItem('uro-theme');
        if (savedTheme) document.documentElement.className = savedTheme;
    }

    showNotification(message, type = 'info') {
        const colors = { success: '#16a34a', warning: '#d97706', info: 'var(--rosa-medio)' };
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed; top: 16px; right: 16px;
            padding: 14px 20px; border-radius: 10px;
            background: ${colors[type] || colors.info}; color: white;
            font-weight: 600; font-size: 0.875rem; z-index: 9999;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }
}

const uroSite = new UroSite();

window.UroSiteUtils = {
    trackContentView: (contentId, title) => {
        uroSite.communication.sendMessage('content-viewed', { contentId, title, url: window.location.href });
    },
    setUserPreference: (key, value) => {
        uroSite.communication.sendMessage('user-preference', { [key]: value });
    },
    getViewCount: (contentId) => {
        return localStorage.getItem(`views-${contentId}`) || 0;
    }
};

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('SW registrado'))
            .catch(err => console.log('SW erro:', err));
    });
}
