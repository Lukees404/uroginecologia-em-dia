/**
 * protocolos.js - Funcionalidades específicas da página de protocolos
 * Autor: Uroginecologia Em Dia
 * Descrição: Geração dinâmica de cards de protocolos e filtros
 */

// LISTA DE PROTOCOLOS - Adicione novos protocolos aqui
const protocolos = [
    {
        titulo: "Infecção do Trato Urinário",
        arquivo: "infeccao-do-trato-urinario.html",
        categoria: "infeccioso",
        descricao: "Diretrizes atualizadas baseadas no Protocolo FEBRASGO nº 48 para diagnóstico e tratamento da ITU em mulheres.",
        data: "Jan/2025",
        icone: "🦠"
    },
    {
        titulo: "Incontinência Urinária de Esforço",
        arquivo: "incontinencia-urinaria-esforco.html",
        categoria: "urodinamico",
        descricao: "Abordagem baseada em evidências para diagnóstico e tratamento da incontinência urinária de esforço.",
        data: "Jan/2025",
        icone: "💧"
    },
    {
        titulo: "Incontinência Urinária Não Especificada",
        arquivo: "incontinencia-urinaria-nao.html",
        categoria: "urodinamico",
        descricao: "Protocolo para abordagem de casos complexos de incontinência urinária.",
        data: "Jan/2025",
        icone: "💧"
    },
    {
        titulo: "Síndrome Bexiga Hiperativa",
        arquivo: "sindrome-bexiga-hiperativa.html",
        categoria: "funcional",
        descricao: "Protocolo completo para diagnóstico e tratamento da bexiga hiperativa em mulheres.",
        data: "Jan/2025",
        icone: "⚡"
    }
];

/**
 * Gera os cards de protocolos dinamicamente
 * @param {string} filtro - Categoria para filtrar (ou 'todos')
 */
function gerarCardsProtocolos(filtro = 'todos') {
    const container = document.getElementById('protocolos-container');
    const mensagemVazio = document.getElementById('mensagem-vazio');
    const contador = document.getElementById('contador-protocolos');

    if (!container) {
        console.error('Container de protocolos não encontrado');
        return;
    }

    // Filtrar protocolos
    const protocolosFiltrados = filtro === 'todos'
        ? protocolos
        : protocolos.filter(p => p.categoria === filtro);

    // Atualizar contador
    if (contador) {
        contador.textContent = `(${protocolosFiltrados.length} protocolo${protocolosFiltrados.length !== 1 ? 's' : ''})`;
    }

    // Limpar container
    container.innerHTML = '';

    // Mostrar mensagem se não houver protocolos
    if (protocolosFiltrados.length === 0) {
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
    protocolosFiltrados.forEach(protocolo => {
        const card = document.createElement('div');
        card.className = 'card-hover bg-white rounded-lg shadow-md overflow-hidden fade-in';
        card.innerHTML = `
            <div class="w-full h-48 bg-gradient-to-r from-uro-azul to-uro-azul_claro overflow-hidden relative">
                <div class="absolute inset-0 flex items-center justify-center">
                    <i data-feather="file-text" class="w-16 h-16 text-white opacity-80"></i>
                </div>
                <div class="absolute top-2 right-2">
                    <span class="inline-block bg-white bg-opacity-20 text-white rounded-full px-3 py-1 text-xs font-semibold">
                        ${protocolo.categoria.toUpperCase()}
                    </span>
                </div>
            </div>
            <div class="p-6">
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mb-2">
                    ${protocolo.icone} ${protocolo.categoria.toUpperCase()}
                </span>
                <h3 class="text-xl font-bold text-uro-azul_escuro mb-3">${protocolo.titulo}</h3>
                <p class="text-gray-600 mb-4">${protocolo.descricao}</p>
                <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-500">Atualizado: ${protocolo.data}</span>
                    <a href="protocolo/${protocolo.arquivo}" class="inline-block bg-uro-azul hover:bg-uro-azul_escuro text-white py-2 px-4 rounded-lg font-medium transition-colors">
                        Ver Protocolo
                    </a>
                </div>
            </div>
        `;
        container.appendChild(card);
    });

    // Atualizar ícones Feather
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando página de protocolos...');

    // Gerar cards inicialmente
    gerarCardsProtocolos();

    // Configurar filtro de categorias
    const filtroCategoria = document.getElementById('filtro-categoria');
    if (filtroCategoria) {
        filtroCategoria.addEventListener('change', function(e) {
            gerarCardsProtocolos(e.target.value);
        });
    }

    console.log('✅ Página de protocolos inicializada');
});
