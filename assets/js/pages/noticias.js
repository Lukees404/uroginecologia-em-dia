/**
 * noticias.js - REDESIGN: Usa classes do novo tema rosa
 */

let noticias = [];
let noticiasFiltradas = [];

const emojiCategorias = {
    pesquisa: '🧬', inovacao: '🔬', evento: '🎤',
    tratamento: '💊', educacao: '📚', alerta: '⚠️'
};

const catClasses = {
    pesquisa: { bg: 'pesquisa', badge: 'cat-p' },
    inovacao: { bg: 'inovacao', badge: 'cat-i' },
    evento:   { bg: 'evento',   badge: 'cat-e' },
    tratamento: { bg: 'tratamento', badge: 'cat-t' },
    educacao: { bg: 'educacao', badge: 'cat-ed' },
    alerta:   { bg: 'alerta',   badge: 'cat-a' }
};

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

function capitalize(str) { return str.charAt(0).toUpperCase() + str.slice(1); }

function gerarNoticias() {
    const container = document.getElementById('noticias-container');
    if (!container) return;
    container.innerHTML = '';

    if (noticiasFiltradas.length === 0) {
        container.innerHTML = '<p style="text-align:center; color:var(--texto-claro); padding:40px;">Nenhuma notícia encontrada.</p>';
        return;
    }

    noticiasFiltradas.forEach((noticia, i) => {
        const cat = catClasses[noticia.categoria] || { bg: 'pesquisa', badge: 'cat-p' };
        const emoji = emojiCategorias[noticia.categoria] || '📰';
        const card = document.createElement('div');
        card.className = `card-noticia fade-in${i === 0 ? ' destaque' : ''}`;
        card.innerHTML = `
            <div class="noticia-img-placeholder ${cat.bg}">
                ${emoji}
                <span class="noticia-categoria ${cat.badge}">${capitalize(noticia.categoria)}</span>
            </div>
            <div class="noticia-body">
                <span class="noticia-data">${noticia.data}</span>
                <div class="noticia-titulo">${noticia.titulo}</div>
                ${noticia.link
                    ? `<a href="${noticia.link}" target="_blank" rel="noopener noreferrer" class="noticia-link">${noticia.linkTexto || 'Ler mais'} →</a>`
                    : ''}
            </div>
        `;
        container.appendChild(card);
    });
}

function filtrarNoticias(categoria) {
    noticiasFiltradas = categoria === 'todas' ? [...noticias] : noticias.filter(n => n.categoria === categoria);
    gerarNoticias();
}

document.addEventListener('DOMContentLoaded', async function() {
    await carregarNoticias();
    const filtroSelect = document.getElementById('filtroNoticias');
    if (filtroSelect) {
        filtroSelect.addEventListener('change', function() { filtrarNoticias(this.value); });
    }
});
