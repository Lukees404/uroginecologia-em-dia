/**
 * eventos.js - Funcionalidades específicas da página de eventos
 * Autor: Uroginecologia Em Dia
 * Descrição: Carregamento e filtro de eventos
 */

// Cache de dados
let eventos = [];
let eventosFiltrados = [];

/**
 * Carrega dados dos eventos do arquivo JSON
 */
async function carregarEventos() {
    try {
        const response = await fetch('assets/data/eventos.json');
        eventos = await response.json();

        // Separar eventos futuros e passados
        const hoje = new Date();
        eventos.forEach(evento => {
            const dataEvento = new Date(evento.dataOrdenacao);
            evento.passado = dataEvento < hoje;
        });

        eventosFiltrados = eventos.filter(e => !e.passado);

        gerarEventos();
        gerarEventosPassados();
    } catch (error) {
        console.error('Erro ao carregar eventos:', error);
    }
}

/**
 * Gera os cards de eventos futuros
 */
function gerarEventos() {
    const container = document.getElementById('eventos-container');
    if (!container) return;

    container.innerHTML = '';

    // Evento em destaque
    const eventosDestaque = eventosFiltrados.filter(e => e.destaque);
    if (eventosDestaque.length > 0) {
        const destaque = eventosDestaque[0];
        const destaqueCard = document.createElement('div');
        destaqueCard.className = 'mb-12';
        destaqueCard.innerHTML = `
            <div class="card-hover bg-white rounded-lg shadow-md overflow-hidden">
                <div class="md:flex">
                    <div class="md:w-2/3 p-6">
                        <span class="inline-block bg-uro-azul text-white rounded-full px-3 py-1 text-xs font-semibold mb-2">Destaque</span>
                        <h2 class="text-2xl font-bold text-uro-azul_escuro mb-4">${destaque.titulo}</h2>
                        <p class="text-gray-600 mb-4">${destaque.descricao}</p>
                        <div class="flex items-center mb-4">
                            <i data-feather="calendar" class="w-4 h-4 mr-2 text-uro-azul"></i>
                            <span class="text-sm text-gray-600 mr-6">${destaque.data}</span>
                            <i data-feather="map-pin" class="w-4 h-4 mr-2 text-uro-azul"></i>
                            <span class="text-sm text-gray-600">${destaque.local}</span>
                        </div>
                        <div class="flex items-center">
                            <span class="text-sm text-green-600 font-semibold mr-4">Inscrições Abertas</span>
                            ${destaque.link ? `<a href="${destaque.link}" target="_blank" rel="noopener noreferrer" class="inline-block bg-uro-azul hover:bg-uro-azul_escuro text-white py-2 px-4 rounded-lg font-medium transition-colors">
                                ${destaque.linkTexto || 'Mais Informações'}
                            </a>` : ''}
                        </div>
                    </div>
                    ${destaque.imagem ? `<div class="md:w-1/3">
                        <img src="${destaque.imagem}" alt="${destaque.titulo}" class="w-full h-full object-cover">
                    </div>` : ''}
                </div>
            </div>
        `;
        container.appendChild(destaqueCard);
    }

    // Grid de eventos regulares
    const eventosRegulares = eventosFiltrados.filter(e => !e.destaque);

    const gridContainer = document.createElement('div');
    gridContainer.className = 'grid grid-cols-1 md:grid-cols-2 gap-8 mb-8';

    eventosRegulares.forEach(evento => {
        const card = document.createElement('div');
        card.className = 'card-hover bg-white rounded-lg shadow-md overflow-hidden';
        card.innerHTML = `
            <div class="bg-gradient-to-r from-uro-azul to-uro-azul_claro text-white p-4 flex justify-between items-center">
                <span class="font-bold">${evento.data}</span>
                <span class="text-sm">${evento.dataOrdenacao ? evento.dataOrdenacao.split('-')[0] : ''}</span>
            </div>
            <div class="p-6">
                <h3 class="text-xl font-bold text-uro-azul_escuro mb-3">${evento.titulo}</h3>
                <p class="text-gray-600 mb-2">
                    <i data-feather="map-pin" class="inline w-4 h-4 mr-2"></i>${evento.local}
                </p>
                <p class="text-gray-600 mb-4">${evento.descricao}</p>
                ${evento.link ? `<a href="${evento.link}" target="_blank" rel="noopener noreferrer" class="inline-block bg-uro-azul hover:bg-uro-azul_escuro text-white py-2 px-4 rounded-lg font-medium transition-colors">
                    ${evento.linkTexto || 'Mais Informações'}
                </a>` : ''}
            </div>
        `;
        gridContainer.appendChild(card);
    });

    container.appendChild(gridContainer);

    // Atualizar ícones Feather
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
}

/**
 * Gera os cards de eventos passados
 */
function gerarEventosPassados() {
    const container = document.getElementById('eventos-passados-container');
    if (!container) return;

    const eventosPassados = eventos.filter(e => e.passado);

    if (eventosPassados.length === 0) {
        container.style.display = 'none';
        return;
    }

    container.innerHTML = '';

    const gridContainer = document.createElement('div');
    gridContainer.className = 'grid grid-cols-1 md:grid-cols-2 gap-6';

    eventosPassados.forEach(evento => {
        const card = document.createElement('div');
        card.className = 'card-hover bg-white rounded-lg shadow-md overflow-hidden opacity-70';
        card.innerHTML = `
            <div class="bg-gray-400 text-white p-4 flex justify-between items-center">
                <span class="font-bold">${evento.data}</span>
                <span class="text-sm">${evento.dataOrdenacao ? evento.dataOrdenacao.split('-')[0] : ''}</span>
            </div>
            <div class="p-6">
                <h3 class="text-xl font-bold text-gray-600 mb-3">${evento.titulo}</h3>
                <p class="text-gray-500 mb-2">
                    <i data-feather="map-pin" class="inline w-4 h-4 mr-2"></i>${evento.local}
                </p>
                <p class="text-gray-500 mb-4">${evento.descricao}</p>
                <button class="inline-block bg-gray-400 text-white py-2 px-4 rounded-lg font-medium cursor-not-allowed">
                    Evento Realizado
                </button>
            </div>
        `;
        gridContainer.appendChild(card);
    });

    container.appendChild(gridContainer);

    // Atualizar ícones Feather
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
}

/**
 * Filtro de eventos por categoria
 */
function filtrarEventos(categoria) {
    if (categoria === 'todos') {
        eventosFiltrados = eventos.filter(e => !e.passado);
    } else {
        eventosFiltrados = eventos.filter(e => !e.passado && e.categoria === categoria);
    }
    gerarEventos();
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', async function() {
    console.log('Inicializando página de eventos...');

    await carregarEventos();

    // Setup do filtro de categoria
    const filtroSelect = document.getElementById('filtroEventos');
    if (filtroSelect) {
        filtroSelect.addEventListener('change', function() {
            filtrarEventos(this.value);
        });
    }

    console.log('Página de eventos carregada');
});
