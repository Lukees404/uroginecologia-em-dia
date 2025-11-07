/**
 * noticias.js - Funcionalidades específicas da página de notícias
 * Autor: Uroginecologia em Dia
 * Descrição: Carregamento e filtro de notícias
 */

// Cache de dados
let noticias = [];
let noticiasFiltradas = [];

// Mapeamento de cores por categoria
const coresCategorias = {
    'pesquisa': 'bg-uro-azul',
    'inovacao': 'bg-green-500',
    'evento': 'bg-purple-500',
    'tratamento': 'bg-orange-500',
    'alerta': 'bg-red-500',
    'educacao': 'bg-blue-500'
};

/**
 * Carrega dados das notícias do arquivo JSON
 */
async function carregarNoticias() {
    try {
        const response = await fetch('assets/data/noticias.json');
        noticias = await response.json();
        noticiasFiltradas = [...noticias];

        gerarNoticias();
    } catch (error) {
        console.error('Erro ao carregar notícias:', error);
    }
}

/**
 * Gera os cards de notícias
 */
function gerarNoticias() {
    const container = document.getElementById('noticias-container');
    if (!container) return;

    container.innerHTML = '';

    // Notícia em destaque
    const noticiasDestaque = noticiasFiltradas.filter(n => n.destaque);
    if (noticiasDestaque.length > 0) {
        const destaque = noticiasDestaque[0];
        const destaqueCard = document.createElement('div');
        destaqueCard.className = 'mb-12';
        destaqueCard.innerHTML = `
            <div class="card-hover bg-gradient-to-r from-uro-azul_escuro to-uro-azul text-white rounded-2xl shadow-md overflow-hidden">
                <div class="md:flex items-center">
                    <div class="md:w-1/4 p-8 flex justify-center">
                        <i data-feather="book-open" class="w-24 h-24 text-white opacity-80"></i>
                    </div>
                    <div class="md:w-3/4 p-8">
                        <span class="inline-block bg-white text-uro-azul_escuro rounded-full px-3 py-1 text-xs font-semibold mb-4">Destaque</span>
                        <h2 class="text-2xl font-bold mb-4">${destaque.titulo}</h2>
                        <p class="text-white opacity-90 mb-4">${destaque.descricao}</p>
                        <div class="flex items-center justify-between">
                            <div class="flex items-center">
                                <i data-feather="calendar" class="w-4 h-4 mr-2 text-white opacity-80"></i>
                                <span class="text-sm opacity-80">Publicado: ${destaque.data}</span>
                            </div>
                            ${destaque.link ? `<a href="${destaque.link}" target="_blank" rel="noopener noreferrer" class="inline-block bg-white text-uro-azul_escuro hover:bg-gray-100 py-2 px-6 rounded-lg font-medium transition-colors">
                                ${destaque.linkTexto || 'Ler Mais'}
                            </a>` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(destaqueCard);
    }

    // Grid de notícias regulares
    const noticiasRegulares = noticiasFiltradas.filter(n => !n.destaque);

    const gridContainer = document.createElement('div');
    gridContainer.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8';

    noticiasRegulares.forEach(noticia => {
        const corCategoria = coresCategorias[noticia.categoria] || 'bg-uro-azul';
        const card = document.createElement('div');
        card.className = 'card-hover bg-white rounded-lg shadow-md overflow-hidden';
        card.innerHTML = `
            <div class="h-40 bg-gradient-to-r from-uro-azul to-uro-azul_claro flex items-center justify-center">
                <i data-feather="book-open" class="w-12 h-12 text-white"></i>
            </div>
            <div class="p-6">
                <span class="inline-block ${corCategoria} text-white rounded-full px-2 py-1 text-xs font-semibold mb-3">${capitalize(noticia.categoria)}</span>
                <h3 class="text-lg font-bold text-uro-azul_escuro mb-3">${noticia.titulo}</h3>
                <p class="text-gray-600 text-sm mb-4">${noticia.descricao}</p>
                <div class="flex justify-between items-center">
                    <span class="text-xs text-gray-500">${noticia.data}</span>
                    ${noticia.link ? `<a href="${noticia.link}" target="_blank" rel="noopener noreferrer" class="text-uro-azul font-medium hover:text-uro-azul_escuro transition-colors text-sm">
                        ${noticia.linkTexto || 'Ler Mais'}
                    </a>` : ''}
                </div>
            </div>
        `;
        gridContainer.appendChild(card);
    });

    container.appendChild(gridContainer);

    // Atualizar ícones Feather
    if (window.UroUtils && window.UroUtils.replaceFeatherIcons) {
        window.UroUtils.replaceFeatherIcons();
    } else if (typeof feather !== 'undefined') {
        feather.replace(); // fallback
    }
}

/**
 * Filtro de notícias por categoria
 */
function filtrarNoticias(categoria) {
    if (categoria === 'todas') {
        noticiasFiltradas = [...noticias];
    } else {
        noticiasFiltradas = noticias.filter(n => n.categoria === categoria);
    }
    gerarNoticias();
}

/**
 * Capitaliza a primeira letra
 */
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', async function() {
    console.log('Inicializando página de notícias...');

    await carregarNoticias();

    // Setup do filtro de categoria
    const filtroSelect = document.getElementById('filtroNoticias');
    if (filtroSelect) {
        filtroSelect.addEventListener('change', function() {
            filtrarNoticias(this.value);
        });
    }

    console.log('Página de notícias carregada');
});
