/**
 * constants.js - Constantes globais do projeto
 * Autor: Uroginecologia Em Dia
 * Descrição: Centraliza todos os "magic numbers" e configurações
 */

/**
 * Breakpoints para responsividade
 * Baseados em Mobile First Design
 */
const BREAKPOINTS = {
    // Mobile: < 768px (padrão)
    MOBILE: 768,      // min-width para tablet
    TABLET: 1024,     // min-width para desktop
    DESKTOP: 1280,    // min-width para desktop large

    // Valores máximos (para media queries max-width)
    MOBILE_MAX: 767,
    TABLET_MAX: 1023,
    DESKTOP_MAX: 1279
};

/**
 * Configurações de PDF (formato A4)
 */
const PDF = {
    A4_WIDTH: 210,     // mm
    A4_HEIGHT: 297,    // mm
    SCALE: 2,          // Escala para html2canvas
    PADDING: '20mm'
};

/**
 * Configurações de Carrossel
 */
const CAROUSEL = {
    AUTO_ROTATE_INTERVAL: 5000,  // ms - tempo entre rotações automáticas
    SWIPE_THRESHOLD: 50,         // px - distância mínima para detectar swipe
    ANIMATION_DURATION: 500,     // ms - duração da transição
    ANIMATION_EASING: 'cubic-bezier(0.4, 0, 0.2, 1)' // ease-out
};

/**
 * Configurações de Tempo
 */
const TIMING = {
    DEBOUNCE_DEFAULT: 300,        // ms - delay padrão para debounce
    DEBOUNCE_SEARCH: 500,         // ms - delay para busca (mais longo)
    DEBOUNCE_RESIZE: 100,         // ms - delay para resize
    DEBOUNCE_SCROLL: 150,         // ms - delay para scroll

    TOAST_DURATION: 3000,         // ms - duração de notificações toast
    ANIMATION_DURATION: 300,      // ms - duração padrão de animações
    MENU_ANIMATION: 300,          // ms - animação do menu mobile

    CACHE_TTL: 5 * 60 * 1000,     // ms - 5 minutos de cache
    AUTO_HIDE_MESSAGE: 5000       // ms - esconder mensagens automático
};

/**
 * Configurações de Acessibilidade
 */
const ACCESSIBILITY = {
    TOUCH_TARGET_MIN: 44,         // px - área mínima de toque (Apple)
    TOUCH_TARGET_RECOMMENDED: 48, // px - área recomendada (Google)
    FOCUS_OUTLINE_WIDTH: 3,       // px - largura do outline de foco
    FONT_SIZE_MIN_MOBILE: 14,     // px - tamanho mínimo de fonte em mobile
    FONT_SIZE_BASE: 16            // px - tamanho base de fonte
};

/**
 * Configurações de Animação
 */
const ANIMATION = {
    FADE_IN_DURATION: 600,        // ms
    SLIDE_DURATION: 300,          // ms
    INTERSECTION_THRESHOLD: 0.1,  // % - threshold do IntersectionObserver
    ROOT_MARGIN: '0px 0px -50px 0px' // margin do IntersectionObserver
};

/**
 * Configurações de Cache
 */
const CACHE = {
    PREFIX: 'uro-',               // prefixo para chaves de cache
    PROTOCOLS_KEY: 'protocols',   // chave para protocolos
    ARTICLES_KEY: 'articles',     // chave para artigos
    EVENTS_KEY: 'events',         // chave para eventos
    NEWS_KEY: 'news',             // chave para notícias
    TTL: 5 * 60 * 1000           // ms - 5 minutos
};

/**
 * URLs e Paths
 */
const PATHS = {
    DATA: 'assets/data/',
    IMAGES: 'assets/images/',
    COMPONENTS: 'components/',
    PAGES: 'pages/',

    // Arquivos de dados
    PROTOCOLS_JSON: 'assets/data/protocolos.json',
    ARTICLES_JSON: 'assets/data/artigos.json',
    EVENTS_JSON: 'assets/data/eventos.json',
    NEWS_JSON: 'assets/data/noticias.json'
};

/**
 * Mensagens de Erro Padrão
 */
const ERROR_MESSAGES = {
    NETWORK: 'Erro de conexão. Verifique sua internet.',
    NOT_FOUND: 'Conteúdo não encontrado.',
    SERVER: 'Erro no servidor. Tente novamente mais tarde.',
    GENERIC: 'Ocorreu um erro. Tente novamente.',
    EMPTY_SEARCH: 'Digite pelo menos 2 caracteres para buscar.',
    NO_RESULTS: 'Nenhum resultado encontrado.'
};

/**
 * Mensagens de Sucesso Padrão
 */
const SUCCESS_MESSAGES = {
    NEWSLETTER: 'Obrigado por assinar nossa newsletter!',
    PDF_GENERATED: '✓ PDF gerado com sucesso!',
    FORM_SENT: 'Mensagem enviada com sucesso!',
    DATA_LOADED: 'Dados carregados com sucesso!'
};

/**
 * Configurações de Validação
 */
const VALIDATION = {
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    MIN_SEARCH_LENGTH: 2,
    MAX_SEARCH_LENGTH: 100,
    MIN_PASSWORD_LENGTH: 8
};

/**
 * Z-Index Layers (para evitar conflitos)
 */
const Z_INDEX = {
    BASE: 1,
    DROPDOWN: 10,
    STICKY: 20,
    MODAL_BACKDROP: 40,
    MODAL: 50,
    TOAST: 10000,
    PDF_LOADING: 9999
};

/**
 * Cores do Tema (espelhando Tailwind config)
 */
const COLORS = {
    URO_AZUL_ESCURO: '#1e40af',
    URO_AZUL: '#3b82f6',
    URO_AZUL_CLARO: '#60a5fa',
    URO_BRANCO: '#ffffff',
    URO_CINZA: '#f3f4f6',
    URO_CINZA_ESCURO: '#6b7280'
};

/**
 * Feature Flags (ativar/desativar funcionalidades)
 */
const FEATURES = {
    ENABLE_ANALYTICS: false,           // Analytics desabilitado por padrão
    ENABLE_SERVICE_WORKER: false,      // Service Worker desabilitado
    ENABLE_AUTO_ROTATE: false,         // Auto-rotate de carrosséis
    ENABLE_DARK_MODE: false,           // Dark mode (futuro)
    DEBUG_MODE: false                  // Logs extras de debug
};

// Exportar todas as constantes
window.UroConstants = {
    BREAKPOINTS,
    PDF,
    CAROUSEL,
    TIMING,
    ACCESSIBILITY,
    ANIMATION,
    CACHE,
    PATHS,
    ERROR_MESSAGES,
    SUCCESS_MESSAGES,
    VALIDATION,
    Z_INDEX,
    COLORS,
    FEATURES
};

// Log de inicialização (apenas se debug mode)
if (window.UroConstants.FEATURES.DEBUG_MODE) {
    console.log('📦 Constantes carregadas:', window.UroConstants);
}
