/**
 * artigos.js - Funcionalidades específicas da página de artigos
 * Autor: Uroginecologia em Dia
 * Descrição: Geração dinâmica de cards de artigos e filtros
 */

// Cache de artigos
let artigos = [];

/**
 * Carrega artigos do arquivo JSON
 * @returns {Promise<Array>} Array de artigos
 */
async function carregarArtigos() {
    const container = document.getElementById('artigos-container');

    try {
        // Mostrar loading
        if (container && window.UroUtils?.showLoading) {
            window.UroUtils.showLoading(container);
        }

        // Usar fetchWithCache para reduzir requisições HTTP
        if (window.UroUtils?.fetchWithCache) {
            artigos = await window.UroUtils.fetchWithCache('assets/data/artigos.json');
        } else {
            // Fallback para fetch tradicional
            const response = await fetch('assets/data/artigos.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            artigos = await response.json();
        }

        return artigos;
    } catch (error) {
        console.error('Erro ao carregar artigos:', error);

        // Mostrar toast de erro se disponível
        if (window.UroUtils?.showToast) {
            window.UroUtils.showToast('Erro ao carregar artigos. Usando dados de exemplo.', 'error');
        }

        // Fallback para dados hardcoded em caso de erro
        artigos = [
            {
                titulo: "Eficácia e Segurança da Acupuntura na Incontinência Urinária Feminina: Uma Síntese Baseada em Revisões Sistemáticas",
                arquivo: 'acupuntura-urinaria-feminina.html',
                categoria: "pesquisa",
                descricao: "Análise crítica da qualidade metodológica e força das evidências sobre intervenções de acupuntura para tratamento da incontinência urinária em mulheres",
                data: "Jan 2025",
                icone: "🔬"
            },
            {
                titulo: "Resultados de Longo Prazo das Cirurgias para Incontinência Urinária de Esforço: Uma Síntese Baseada em Meta-Análise de Rede",
                arquivo: "cirurgias-incontinencia.html",
                categoria: "meta",
                descricao: "Análise comparativa da eficácia e segurança em longo prazo das principais técnicas cirúrgicas para tratamento da incontinência urinária de esforço feminina",
                data: "Jan 2025",
                icone: "📊"
            },
            {
                titulo: "Análise Comparativa de Diretrizes Internacionais para Incontinência Urinária Feminina: Metodologia e Inconsistências",
                arquivo: "revi-literaria-artigo.html",
                categoria: "revisao",
                descricao: "Revisão sistemática da qualidade metodológica e consistência das recomendações de 17 sociedades médicas internacionais.",
                data: "Jan 2025",
                icone: "📋"
            },
            {
                titulo: "Diretrizes de Avaliação da Incontinência Urinária Feminina: Revisão Sistemática das Recomendações entre Especialidades Clínicas",
                arquivo: "revisao-ssistematica.html",
                categoria: "revisao",
                descricao: "Análise crítica da qualidade metodológica, abrangência e clareza das diretrizes de avaliação da incontinência urinária não complicada em mulheres adultas",
                data: "Jan 2025",
                icone: "📋"
            },
            {
                titulo: "Cuidados de Enfermagem às Mulheres com Incontinência Urinária na Atenção Básica: Síntese Baseada em Evidências",
                arquivo: "urinaria-atencao-basica.html",
                categoria: "estudo",
                descricao: "Análise crítica dos cuidados prioritários e fatores intervenientes na implementação da assistência de enfermagem à mulher com incontinência urinária na atenção primária.",
                data: "Jan 2025",
                icone: "📈"
            }
        ];
        return artigos;
    } finally {
        // Remover loading
        if (container && window.UroUtils?.hideLoading) {
            window.UroUtils.hideLoading(container);
        }
    }
}

/**
 * Gera os cards de artigos dinamicamente
 * @param {string} filtro - Categoria para filtrar (ou 'todos')
 */
function gerarCardsArtigos(filtro = 'todos') {
    const container = document.getElementById('artigos-container');
    const mensagemVazio = document.getElementById('mensagem-vazio');
    const contador = document.getElementById('contador-artigos');

    if (!container) {
        console.error('Container de artigos não encontrado');
        return;
    }

    // Filtrar artigos
    const artigosFiltrados = filtro === 'todos'
        ? artigos
        : artigos.filter(a => a.categoria === filtro);

    // Atualizar contador
    if (contador) {
        contador.textContent = `(${artigosFiltrados.length} artigo${artigosFiltrados.length !== 1 ? 's' : ''})`;
    }

    // Limpar container
    container.innerHTML = '';

    // Mostrar mensagem se não houver artigos
    if (artigosFiltrados.length === 0) {
        if (mensagemVazio) {
            mensagemVazio.classList.remove('hidden');
        }
        return;
    } else {
        if (mensagemVazio) {
            mensagemVazio.classList.add('hidden');
        }
    }

    // Gerar cards
    artigosFiltrados.forEach(artigo => {
        const card = document.createElement('div');
        card.className = 'card-hover bg-white rounded-lg shadow-md overflow-hidden fade-in';
        card.innerHTML = `
            <div class="w-full h-48 artigo-image overflow-hidden relative">
                <div class="absolute inset-0 flex items-center justify-center">
                    <i data-feather="book-open" class="w-16 h-16 text-white opacity-80"></i>
                </div>
                <div class="absolute top-2 right-2">
                    <span class="categoria-badge categoria-${artigo.categoria}">
                        ${artigo.icone} ${artigo.categoria.charAt(0).toUpperCase() + artigo.categoria.slice(1)}
                    </span>
                </div>
            </div>
            <div class="p-6">
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mb-2">
                    ${artigo.categoria.toUpperCase()}
                </span>
                <h3 class="text-xl font-bold text-uro-azul_escuro mb-3">${artigo.titulo}</h3>
                <p class="text-gray-600 mb-4">${artigo.descricao}</p>
                <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-500">Publicado: ${artigo.data}</span>
                    <a href="pages/artigo/${artigo.arquivo}" class="inline-block bg-uro-azul hover:bg-uro-azul_escuro text-white py-2 px-4 rounded-lg font-medium transition-colors">
                        Ler Artigo
                    </a>
                </div>
            </div>
        `;
        container.appendChild(card);
    });

    // Atualizar ícones Feather
    if (window.UroUtils && window.UroUtils.replaceFeatherIcons) {
        window.UroUtils.replaceFeatherIcons();
    } else if (typeof feather !== 'undefined') {
        feather.replace(); // fallback
    }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', async function() {
    console.log('Inicializando página de artigos...');

    // Carregar artigos do JSON
    await carregarArtigos();

    // Gerar cards inicialmente
    gerarCardsArtigos();

    // Configurar filtro de categorias
    const filtroCategoria = document.getElementById('filtro-categoria');
    if (filtroCategoria) {
        filtroCategoria.addEventListener('change', function(e) {
            gerarCardsArtigos(e.target.value);
        });
    }

    console.log('✅ Página de artigos inicializada');
});
