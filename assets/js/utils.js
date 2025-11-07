/**
 * utils.js - Funções utilitárias compartilhadas
 * Autor: Uroginecologia Em Dia
 * Descrição: Funções helper para uso em todo o projeto
 */

/**
 * Obtém o caminho base do projeto
 * @returns {string} Caminho base (ex: '/' ou '/subdir/')
 */
function getBasePath() {
    const baseTag = document.querySelector('base');
    if (baseTag) {
        return baseTag.getAttribute('href') || '/';
    }
    return '/';
}

/**
 * Constrói URL relativa ao base path do projeto
 * @param {string} path - Caminho relativo (ex: 'pages/busca.html')
 * @returns {string} URL completa
 */
function buildUrl(path) {
    const basePath = getBasePath();
    // Remove / inicial se path começar com /
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    // Remove / final do basePath se existir
    const cleanBase = basePath.endsWith('/') ? basePath : basePath + '/';
    return cleanBase + cleanPath;
}

/**
 * Escapa caracteres HTML para prevenir XSS
 * @param {string} text - Texto a ser escapado
 * @returns {string} Texto com caracteres HTML escapados
 */
function escapeHtml(text) {
    if (typeof text !== 'string') return '';

    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };

    return text.replace(/[&<>"']/g, (m) => map[m]);
}

/**
 * Normaliza string para busca (remove acentos e converte para minúscula)
 * @param {string} str - String a ser normalizada
 * @returns {string} String normalizada
 */
function normalizeString(str) {
    if (typeof str !== 'string') return '';

    return str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

/**
 * Debounce - Atrasa execução de função até que ela pare de ser chamada
 * @param {Function} func - Função a ser executada
 * @param {number} wait - Tempo de espera em ms
 * @returns {Function} Função debounced
 */
function debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Valida se objeto tem as propriedades necessárias
 * @param {Object} obj - Objeto a validar
 * @param {Array<string>} requiredProps - Array com nomes das propriedades obrigatórias
 * @returns {boolean} True se todas as propriedades existem
 */
function validateObject(obj, requiredProps) {
    if (!obj || typeof obj !== 'object') return false;

    return requiredProps.every(prop => {
        return Object.prototype.hasOwnProperty.call(obj, prop) &&
               obj[prop] !== null &&
               obj[prop] !== undefined;
    });
}

/**
 * Formata data para padrão brasileiro
 * @param {string|Date} date - Data a ser formatada
 * @returns {string} Data formatada (dd/mm/yyyy)
 */
function formatDate(date) {
    try {
        const d = typeof date === 'string' ? new Date(date) : date;
        if (isNaN(d.getTime())) return '';

        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();

        return `${day}/${month}/${year}`;
    } catch (error) {
        console.error('Erro ao formatar data:', error);
        return '';
    }
}

/**
 * Mostra notificação toast na tela
 * @param {string} message - Mensagem a ser exibida
 * @param {string} type - Tipo: 'success', 'error', 'warning', 'info'
 * @param {number} duration - Duração em ms (padrão: 3000)
 */
function showToast(message, type = 'info', duration = 3000) {
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };

    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        font-weight: 500;
        max-width: 300px;
    `;
    toast.textContent = message;

    // Adicionar animação
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;

    if (!document.querySelector('style[data-toast-animations]')) {
        style.setAttribute('data-toast-animations', 'true');
        document.head.appendChild(style);
    }

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

/**
 * Tratamento de erros padronizado
 * @param {Error} error - Objeto de erro
 * @param {string} context - Contexto onde o erro ocorreu
 * @param {boolean} showUser - Se deve mostrar toast para o usuário
 */
function handleError(error, context = 'Operação', showUser = true) {
    console.error(`Erro em ${context}:`, error);

    if (showUser) {
        showToast(
            `Erro ao executar ${context}. Tente novamente.`,
            'error'
        );
    }
}

// Exportar para uso global
window.UroUtils = {
    getBasePath,
    buildUrl,
    escapeHtml,
    normalizeString,
    debounce,
    validateObject,
    formatDate,
    showToast,
    handleError
};
