/**
 * eventos.js - REDESIGN: Usa classes do novo tema rosa
 */

let eventos = [];
let eventosFiltrados = [];

const meses = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];

function extrairDataDisplay(evento) {
    if (evento.dataOrdenacao) {
        const d = new Date(evento.dataOrdenacao);
        return { dia: d.getDate().toString().padStart(2,'0'), mes: meses[d.getMonth()] };
    }
    return { dia: '--', mes: '---' };
}

async function carregarEventos() {
    const container = document.getElementById('eventos-container');
    try {
        if (container && window.UroUtils?.showLoading) window.UroUtils.showLoading(container);
        if (window.UroUtils?.fetchWithCache) {
            eventos = await window.UroUtils.fetchWithCache('assets/data/eventos.json');
        } else {
            const response = await fetch('assets/data/eventos.json');
            eventos = await response.json();
        }
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
    } finally {
        if (container && window.UroUtils?.hideLoading) window.UroUtils.hideLoading(container);
    }
}

function gerarEventos() {
    const container = document.getElementById('eventos-container');
    if (!container) return;
    container.innerHTML = '';

    if (eventosFiltrados.length === 0) {
        container.innerHTML = '<p style="text-align:center; color:var(--texto-claro); padding:40px 0;">Nenhum evento encontrado para este filtro.</p>';
        return;
    }

    eventosFiltrados.forEach(evento => {
        const dt = extrairDataDisplay(evento);
        const tipoMap = {
            congresso: '🌍 Congresso', workshop: '🛠 Workshop',
            curso: '🏥 Curso', webinar: '🌐 Webinar'
        };
        const card = document.createElement('div');
        card.className = 'card-evento fade-in';
        card.innerHTML = `
            <div class="evento-data-bloco">
                <div class="evento-dia">${dt.dia}</div>
                <div class="evento-mes">${dt.mes}</div>
            </div>
            <div class="evento-info">
                <div class="evento-tipo">${tipoMap[evento.categoria] || evento.categoria || ''}</div>
                <div class="evento-titulo">${evento.titulo}</div>
                <div class="evento-local">📍 ${evento.local}</div>
            </div>
            ${evento.link ? `<a href="${evento.link}" target="_blank" rel="noopener noreferrer" class="evento-link">${evento.linkTexto || 'Ver evento'} →</a>` : ''}
        `;
        container.appendChild(card);
    });
}

function gerarEventosPassados() {
    const container = document.getElementById('eventos-passados-container');
    if (!container) return;

    const eventosPassados = eventos.filter(e => e.passado);
    if (eventosPassados.length === 0) {
        container.innerHTML = '<p style="text-align:center; color:var(--texto-claro);">Nenhum evento passado.</p>';
        return;
    }

    container.innerHTML = '';
    eventosPassados.forEach(evento => {
        const dt = extrairDataDisplay(evento);
        const card = document.createElement('div');
        card.className = 'card-evento passado fade-in';
        card.innerHTML = `
            <div class="evento-data-bloco">
                <div class="evento-dia">${dt.dia}</div>
                <div class="evento-mes">${dt.mes}</div>
            </div>
            <div class="evento-info">
                <div class="evento-tipo">${evento.categoria || ''}</div>
                <div class="evento-titulo">${evento.titulo}</div>
                <div class="evento-local">📍 ${evento.local}</div>
            </div>
            <span class="evento-link" style="color:var(--texto-claro); cursor:default;">Realizado</span>
        `;
        container.appendChild(card);
    });
}

function filtrarEventos(categoria) {
    eventosFiltrados = categoria === 'todos'
        ? eventos.filter(e => !e.passado)
        : eventos.filter(e => !e.passado && e.categoria === categoria);
    gerarEventos();
}

document.addEventListener('DOMContentLoaded', async function() {
    await carregarEventos();
    const filtroSelect = document.getElementById('filtroEventos');
    if (filtroSelect) {
        filtroSelect.addEventListener('change', function() { filtrarEventos(this.value); });
    }
});
