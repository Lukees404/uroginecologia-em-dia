/**
 * artigos.js - Funcionalidades específicas da página de artigos
 * REDESIGN: Usa classes do novo tema rosa
 */

let artigos = [];

async function carregarArtigos() {
    const container = document.getElementById('artigos-container');
    try {
        if (container && window.UroUtils?.showLoading) window.UroUtils.showLoading(container);
        if (window.UroUtils?.fetchWithCache) {
            artigos = await window.UroUtils.fetchWithCache('assets/data/artigos.json');
        } else {
            const response = await fetch('assets/data/artigos.json');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const raw = await response.json();
            artigos = Array.isArray(raw) ? raw : (raw.items || []);
        }
        return artigos;
    } catch (error) {
        console.error('Erro ao carregar artigos:', error);
        artigos = [
            { titulo: "Acupuntura na Incontinência Urinária Feminina", arquivo: 'acupuntura-urinaria-feminina.html', categoria: "pesquisa", descricao: "Análise da qualidade metodológica sobre intervenções de acupuntura para IU em mulheres.", data: "Jan 2025", icone: "🔬" },
            { titulo: "Cirurgias para Incontinência Urinária de Esforço", arquivo: "cirurgias-incontinencia.html", categoria: "meta", descricao: "Meta-análise comparativa das técnicas cirúrgicas para IUE feminina.", data: "Jan 2025", icone: "📊" },
            { titulo: "Diretrizes Internacionais para IU Feminina", arquivo: "revi-literaria-artigo.html", categoria: "revisao", descricao: "Revisão sistemática da qualidade de 17 sociedades médicas.", data: "Jan 2025", icone: "📋" },
            { titulo: "Avaliação da IU Feminina: Revisão Sistemática", arquivo: "revisao-ssistematica.html", categoria: "revisao", descricao: "Análise das diretrizes de avaliação da IU não complicada em mulheres adultas.", data: "Jan 2025", icone: "📋" },
            { titulo: "Enfermagem e IU na Atenção Básica", arquivo: "urinaria-atencao-basica.html", categoria: "estudo", descricao: "Cuidados de enfermagem à mulher com IU na atenção primária.", data: "Jan 2025", icone: "📈" }
        ];
        return artigos;
    } finally {
        if (container && window.UroUtils?.hideLoading) window.UroUtils.hideLoading(container);
    }
}

function gerarCardsArtigos(filtro = 'todos') {
    const container = document.getElementById('artigos-container');
    const mensagemVazio = document.getElementById('mensagem-vazio');
    const contador = document.getElementById('contador-artigos');
    if (!container) return;

    const artigosFiltrados = filtro === 'todos' ? artigos : artigos.filter(a => a.categoria === filtro);

    if (contador) {
        contador.textContent = `(${artigosFiltrados.length} artigo${artigosFiltrados.length !== 1 ? 's' : ''})`;
    }

    container.innerHTML = '';

    if (artigosFiltrados.length === 0) {
        if (mensagemVazio) mensagemVazio.classList.remove('hidden');
        return;
    } else {
        if (mensagemVazio) mensagemVazio.classList.add('hidden');
    }

    artigosFiltrados.forEach(artigo => {
        const card = document.createElement('div');
        card.className = 'card-artigo fade-in';
        card.innerHTML = `
            <div class="artigo-topo"></div>
            <div class="artigo-corpo">
                <div class="artigo-meta">
                    <span class="artigo-tipo">${artigo.categoria.charAt(0).toUpperCase() + artigo.categoria.slice(1)}</span>
                    <span class="artigo-dot"></span>
                    <span class="artigo-data">${artigo.data}</span>
                </div>
                <div class="artigo-titulo">${artigo.titulo}</div>
                <div class="artigo-resumo">${artigo.descricao}</div>
                <div class="artigo-rodape">
                    <a href="pages/artigo/${artigo.arquivo}" class="artigo-link">Ler resumo →</a>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', async function() {
    await carregarArtigos();
    gerarCardsArtigos();

    const filtroCategoria = document.getElementById('filtro-categoria');
    if (filtroCategoria) {
        filtroCategoria.addEventListener('change', function(e) {
            gerarCardsArtigos(e.target.value);
        });
    }
});
