/**
 * protocolos.js - Funcionalidades específicas da página de protocolos
 * Autor: Uroginecologia em Dia
 * REDESIGN: Usa classes do novo tema rosa
 */

let protocolos = [];

async function carregarProtocolos() {
    const container = document.getElementById('protocolos-container');
    try {
        if (container && window.UroUtils?.showLoading) {
            window.UroUtils.showLoading(container);
        }
        if (window.UroUtils?.fetchWithCache) {
            protocolos = await window.UroUtils.fetchWithCache('assets/data/protocolos.json');
        } else {
            const response = await fetch('assets/data/protocolos.json');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            protocolos = await response.json();
        }
        return protocolos;
    } catch (error) {
        console.error('Erro ao carregar protocolos:', error);
        if (window.UroUtils?.showToast) {
            window.UroUtils.showToast('Erro ao carregar protocolos. Usando dados de exemplo.', 'error');
        }
        protocolos = [
            { titulo: "Infecção do Trato Urinário", arquivo: "infeccao-do-trato-urinario.html", categoria: "infeccioso", descricao: "Diretrizes atualizadas baseadas no Protocolo FEBRASGO nº 48 para diagnóstico e tratamento da ITU em mulheres.", data: "Jan/2025", icone: "🦠" },
            { titulo: "Incontinência Urinária de Esforço", arquivo: "incontinencia-urinaria-esforco.html", categoria: "urodinamico", descricao: "Abordagem baseada em evidências para diagnóstico e tratamento da incontinência urinária de esforço.", data: "Jan/2025", icone: "💧" },
            { titulo: "Incontinência Urinária Não Especificada", arquivo: "incontinencia-urinaria-nao.html", categoria: "urodinamico", descricao: "Protocolo para abordagem de casos complexos de incontinência urinária.", data: "Jan/2025", icone: "💧" },
            { titulo: "Síndrome Bexiga Hiperativa", arquivo: "sindrome-bexiga-hiperativa.html", categoria: "funcional", descricao: "Protocolo completo para diagnóstico e tratamento da bexiga hiperativa em mulheres.", data: "Jan/2025", icone: "⚡" }
        ];
        return protocolos;
    } finally {
        if (container && window.UroUtils?.hideLoading) {
            window.UroUtils.hideLoading(container);
        }
    }
}

function gerarCardsProtocolos(filtro = 'todos') {
    const container = document.getElementById('protocolos-container');
    const mensagemVazio = document.getElementById('mensagem-vazio');
    const contador = document.getElementById('contador-protocolos');
    if (!container) return;

    const protocolosFiltrados = filtro === 'todos' ? protocolos : protocolos.filter(p => p.categoria === filtro);

    if (contador) {
        contador.textContent = `(${protocolosFiltrados.length} protocolo${protocolosFiltrados.length !== 1 ? 's' : ''})`;
    }

    container.innerHTML = '';

    if (protocolosFiltrados.length === 0) {
        if (mensagemVazio) mensagemVazio.classList.remove('hidden');
        return;
    } else {
        if (mensagemVazio) mensagemVazio.classList.add('hidden');
    }

    const badgeMap = {
        infeccioso: { cls: 'badge-infeccioso', label: '🦠 Infeccioso' },
        urodinamico: { cls: 'badge-urodinamico', label: '🔬 Urodinâmico' },
        cirurgico: { cls: 'badge-cirurgico', label: '🔪 Cirúrgico' },
        funcional: { cls: 'badge-funcional', label: '⚙️ Funcional' }
    };

    protocolosFiltrados.forEach(protocolo => {
        const badge = badgeMap[protocolo.categoria] || { cls: '', label: protocolo.categoria };
        const card = document.createElement('div');
        card.className = `card-protocolo cat-${protocolo.categoria} fade-in`;
        card.innerHTML = `
            <span class="protocolo-badge ${badge.cls}">${badge.label}</span>
            <div class="protocolo-titulo">${protocolo.titulo}</div>
            <div class="protocolo-desc">${protocolo.descricao}</div>
            <div class="protocolo-rodape">
                <span class="protocolo-data">Atualizado ${protocolo.data}</span>
                <a href="pages/protocolo/${protocolo.arquivo}" class="protocolo-link">Acessar →</a>
            </div>
        `;
        container.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', async function() {
    await carregarProtocolos();
    gerarCardsProtocolos();

    const filtroCategoria = document.getElementById('filtro-categoria');
    if (filtroCategoria) {
        filtroCategoria.addEventListener('change', function(e) {
            gerarCardsProtocolos(e.target.value);
        });
    }
});
