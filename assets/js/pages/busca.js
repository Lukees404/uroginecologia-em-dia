/**
 * busca.js - Sistema de busca completo
 * Autor: Uroginecologia Em Dia
 * Descrição: Busca em protocolos, artigos, eventos e notícias
 */

// Cache de resultados
let resultados = [];
let termoBusca = '';

/**
 * Obtém o termo de busca da URL
 */
function obterTermoBusca() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('q') || '';
}

/**
 * Normaliza string para busca (remove acentos e converte para minúscula)
 */
function normalizeString(str) {
    return str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

/**
 * Verifica se o termo de busca está presente no texto
 */
function matchTerm(text, searchTerm) {
    const normalizedText = normalizeString(text);
    const normalizedTerm = normalizeString(searchTerm);
    return normalizedText.includes(normalizedTerm);
}

/**
 * Busca em todos os dados
 */
async function realizarBusca(termo) {
    termoBusca = termo;
    resultados = [];

    try {
        // Carregar todos os dados em paralelo
        const [protocolos, artigos, eventos, noticias] = await Promise.all([
            fetch('assets/data/protocolos.json').then(r => r.json()).catch(() => []),
            fetch('assets/data/artigos.json').then(r => r.json()).catch(() => []),
            fetch('assets/data/eventos.json').then(r => r.json()).catch(() => []),
            fetch('assets/data/noticias.json').then(r => r.json()).catch(() => [])
        ]);

        // Buscar em protocolos
        protocolos.forEach(item => {
            if (matchTerm(item.titulo, termo) ||
                matchTerm(item.descricao, termo) ||
                (item.tags && item.tags.some(tag => matchTerm(tag, termo)))) {
                resultados.push({
                    tipo: 'Protocolo',
                    titulo: item.titulo,
                    descricao: item.descricao,
                    link: `pages/protocolo/${item.arquivo}`,
                    categoria: item.categoria,
                    data: item.data,
                    icone: '📋'
                });
            }
        });

        // Buscar em artigos
        artigos.forEach(item => {
            if (matchTerm(item.titulo, termo) ||
                matchTerm(item.descricao, termo) ||
                (item.tags && item.tags.some(tag => matchTerm(tag, termo)))) {
                resultados.push({
                    tipo: 'Artigo',
                    titulo: item.titulo,
                    descricao: item.descricao,
                    link: `pages/artigo/${item.arquivo}`,
                    categoria: item.categoria,
                    data: item.data,
                    icone: '📰'
                });
            }
        });

        // Buscar em eventos
        eventos.forEach(item => {
            if (matchTerm(item.titulo, termo) ||
                matchTerm(item.descricao, termo) ||
                (item.local && matchTerm(item.local, termo))) {
                resultados.push({
                    tipo: 'Evento',
                    titulo: item.titulo,
                    descricao: item.descricao,
                    link: item.link || '#',
                    categoria: item.categoria,
                    data: item.dataCompleta || item.data,
                    local: item.local,
                    icone: '📅',
                    external: !!item.link
                });
            }
        });

        // Buscar em notícias
        noticias.forEach(item => {
            if (matchTerm(item.titulo, termo) ||
                matchTerm(item.descricao, termo)) {
                resultados.push({
                    tipo: 'Notícia',
                    titulo: item.titulo,
                    descricao: item.descricao,
                    link: item.link || '#',
                    categoria: item.categoria,
                    data: item.data,
                    icone: '🔔',
                    external: !!item.link
                });
            }
        });

    } catch (error) {
        console.error('Erro ao realizar busca:', error);
    }

    return resultados;
}

/**
 * Destaca o termo buscado no texto (protegido contra XSS)
 */
function highlightTerm(text, term) {
    if (!term) return text;

    // Escapar HTML para prevenir XSS
    const escapeHtml = window.UroUtils ? window.UroUtils.escapeHtml : (str) => str;
    const escapedText = escapeHtml(text);

    // Escapar caracteres especiais de regex
    const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Criar regex case-insensitive
    const regex = new RegExp(`(${escapedTerm})`, 'gi');

    // Aplicar highlight apenas no texto escapado
    return escapedText.replace(regex, '<mark class="bg-yellow-200 px-1 rounded">$1</mark>');
}

/**
 * Renderiza os resultados da busca
 */
function renderizarResultados() {
    const container = document.getElementById('search-results');
    const noResults = document.getElementById('no-results');
    const stats = document.getElementById('search-stats');

    if (!container) return;

    container.innerHTML = '';

    // Atualizar estatísticas
    if (stats) {
        // Escapar termo de busca para prevenir XSS
        const escapeHtml = window.UroUtils ? window.UroUtils.escapeHtml : (str) => str;
        const termoEscapado = escapeHtml(termoBusca);

        if (resultados.length === 0) {
            stats.innerHTML = `<p class="text-gray-600">Nenhum resultado encontrado para "<strong>${termoEscapado}</strong>"</p>`;
            noResults.classList.remove('hidden');
            return;
        } else {
            stats.innerHTML = `<p class="text-gray-700"><strong>${resultados.length}</strong> resultado${resultados.length > 1 ? 's' : ''} encontrado${resultados.length > 1 ? 's' : ''} para "<strong>${termoEscapado}</strong>"</p>`;
            noResults.classList.add('hidden');
        }
    }

    // Renderizar resultados
    const grid = document.createElement('div');
    grid.className = 'grid grid-cols-1 gap-6';

    resultados.forEach(resultado => {
        const card = document.createElement('article');
        card.className = 'card-hover bg-white rounded-lg shadow-md overflow-hidden';

        const tipoColor = {
            'Protocolo': 'bg-blue-500',
            'Artigo': 'bg-green-500',
            'Evento': 'bg-purple-500',
            'Notícia': 'bg-orange-500'
        }[resultado.tipo] || 'bg-gray-500';

        const linkTarget = resultado.external ? 'target="_blank" rel="noopener noreferrer"' : '';
        const linkIcon = resultado.external ? '<i data-feather="external-link" class="w-4 h-4 inline ml-1"></i>' : '';

        card.innerHTML = `
            <div class="p-6">
                <div class="flex items-center gap-3 mb-3">
                    <span class="${tipoColor} text-white rounded-full px-3 py-1 text-xs font-semibold">${resultado.tipo}</span>
                    ${resultado.categoria ? `<span class="text-xs text-gray-500">${resultado.categoria}</span>` : ''}
                </div>
                <h3 class="text-xl font-bold text-uro-azul_escuro mb-2">${highlightTerm(resultado.titulo, termoBusca)}</h3>
                <p class="text-gray-600 mb-4">${highlightTerm(resultado.descricao, termoBusca)}</p>
                <div class="flex flex-wrap items-center justify-between gap-4">
                    <div class="text-sm text-gray-500">
                        ${resultado.data ? `<span><i data-feather="calendar" class="w-4 h-4 inline mr-1"></i>${resultado.data}</span>` : ''}
                        ${resultado.local ? `<span class="ml-3"><i data-feather="map-pin" class="w-4 h-4 inline mr-1"></i>${resultado.local}</span>` : ''}
                    </div>
                    <a href="${resultado.link}" ${linkTarget} class="inline-flex items-center bg-uro-azul hover:bg-uro-azul_escuro text-white py-2 px-4 rounded-lg font-medium transition-colors">
                        Ver ${resultado.tipo}${linkIcon}
                    </a>
                </div>
            </div>
        `;

        grid.appendChild(card);
    });

    container.appendChild(grid);

    // Atualizar ícones Feather
    if (window.UroUtils && window.UroUtils.replaceFeatherIcons) {
        window.UroUtils.replaceFeatherIcons();
    } else if (typeof feather !== 'undefined') {
        feather.replace(); // fallback
    }
}

/**
 * Inicializa a página de busca
 */
async function inicializarBusca() {
    const termo = obterTermoBusca();

    if (!termo) {
        window.location.href = 'index.html';
        return;
    }

    // Atualizar o título da busca
    const searchQuery = document.getElementById('search-query');
    if (searchQuery) {
        searchQuery.textContent = `Buscando por: "${termo}"`;
    }

    // Atualizar título da página
    document.title = `Busca: ${termo} | Uroginecologia Em Dia`;

    // Realizar busca
    await realizarBusca(termo);
    renderizarResultados();
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', inicializarBusca);
