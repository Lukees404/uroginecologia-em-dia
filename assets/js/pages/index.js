/**
 * index.js - Funcionalidades específicas da página inicial
 * Autor: Uroginecologia Em Dia
 * Descrição: Carrossel de protocolos e artigos em destaque
 */

/**
 * Classe para gerenciar carrosséis simples
 */
class SimpleCarousel {
    constructor(containerId, items, itemsPerView = 3) {
        this.container = document.getElementById(containerId);
        this.items = items;
        this.itemsPerView = itemsPerView;
        this.currentIndex = 0;
        this.init();
    }

    init() {
        if (!this.container) {
            console.warn(`Container ${this.containerId} não encontrado`);
            return;
        }
        this.render();
        this.setupNavigation();
        if (this.items.length > this.itemsPerView) {
            this.setupAutoRotate();
        }
    }

    render() {
        this.container.innerHTML = '';
        this.items.forEach(item => {
            const element = this.createItemElement(item);
            this.container.appendChild(element);
        });
        this.updatePosition();

        // Atualizar ícones Feather
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }

    createItemElement(item) {
        const div = document.createElement('div');
        div.className = 'flex-shrink-0 w-full md:w-1/3 px-2';

        if (item.type === 'protocol') {
            div.innerHTML = `
                <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
                    <div class="h-40 bg-gradient-to-r from-uro-azul to-uro-azul_claro flex items-center justify-center">
                        <i data-feather="file-text" class="w-12 h-12 text-white"></i>
                    </div>
                    <div class="p-6">
                        <h3 class="text-xl font-bold text-uro-azul_escuro mb-3 line-clamp-2">${item.title}</h3>
                        <p class="text-gray-600 text-sm mb-4 line-clamp-2">${item.description}</p>
                        <div class="flex justify-between items-center">
                            <span class="text-xs text-gray-500">${item.date}</span>
                            <a href="${item.url}" class="text-uro-azul font-medium hover:text-uro-azul_escuro transition-colors">
                                Ver Protocolo
                            </a>
                        </div>
                    </div>
                </div>
            `;
        } else if (item.type === 'article') {
            div.innerHTML = `
                <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
                    <div class="h-40 bg-gradient-to-r from-uro-azul_escuro to-uro-azul flex items-center justify-center">
                        <i data-feather="book-open" class="w-12 h-12 text-white"></i>
                    </div>
                    <div class="p-6">
                        <h3 class="text-xl font-bold text-uro-azul_escuro mb-3 line-clamp-2">${item.title}</h3>
                        <p class="text-gray-600 text-sm mb-4 line-clamp-3">${item.description}</p>
                        <div class="flex justify-between items-center">
                            <span class="text-xs text-gray-500">${item.date}</span>
                            <a href="${item.url}" class="text-uro-azul font-medium hover:text-uro-azul_escuro transition-colors">
                                Ler Artigo
                            </a>
                        </div>
                    </div>
                </div>
            `;
        }
        return div;
    }

    setupNavigation() {
        const containerName = this.container.id.replace('Carousel', '');
        const capitalizedName = containerName.charAt(0).toUpperCase() + containerName.slice(1);
        const prevBtn = document.getElementById(`prev${capitalizedName}`);
        const nextBtn = document.getElementById(`next${capitalizedName}`);

        if (prevBtn && nextBtn) {
            if (this.items.length > this.itemsPerView) {
                prevBtn.addEventListener('click', () => this.prev());
                nextBtn.addEventListener('click', () => this.next());
            } else {
                prevBtn.style.display = 'none';
                nextBtn.style.display = 'none';
            }
        }
    }

    prev() {
        if (this.items.length <= this.itemsPerView) return;
        this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
        this.updatePosition();
    }

    next() {
        if (this.items.length <= this.itemsPerView) return;
        this.currentIndex = (this.currentIndex + 1) % this.items.length;
        this.updatePosition();
    }

    updatePosition() {
        const translateX = -this.currentIndex * (100 / this.itemsPerView);
        this.container.style.transform = `translateX(${translateX}%)`;
    }

    setupAutoRotate() {
        if (this.items.length > this.itemsPerView) {
            setInterval(() => {
                this.next();
            }, 5000);
        }
    }
}

// Dados dos Protocolos
const protocolos = [
    {
        type: 'protocol',
        title: 'Infecção do Trato Urinário',
        description: 'Diretrizes atualizadas baseadas no Protocolo FEBRASGO nº 48 para diagnóstico e tratamento da ITU em mulheres.',
        date: 'Atualizado: Jan/2025',
        url: 'pages/protocolo/infeccao-do-trato-urinario.html'
    },
    {
        type: 'protocol',
        title: 'Incontinência Urinária de Esforço',
        description: 'Abordagem baseada em evidências para diagnóstico e tratamento da incontinência urinária de esforço.',
        date: 'Atualizado: Jan/2025',
        url: 'pages/protocolo/incontinencia-urinaria-esforco.html'
    },
    {
        type: 'protocol',
        title: 'Síndrome Bexiga Hiperativa',
        description: 'Protocolo completo para diagnóstico e tratamento da bexiga hiperativa em mulheres.',
        date: 'Atualizado: Jan/2025',
        url: 'pages/protocolo/sindrome-bexiga-hiperativa.html'
    },
    {
        type: 'protocol',
        title: 'Incontinência Urinária Não Especificada',
        description: 'Protocolo para abordagem de casos complexos de incontinência urinária.',
        date: 'Atualizado: Fev/2025',
        url: 'pages/protocolo/incontinencia-urinaria-nao.html'
    }
];

// Dados dos Artigos
const artigos = [
    {
        type: 'article',
        title: 'Eficácia da Toxina Botulínica na Bexiga Hiperativa',
        description: 'Meta-análise de ensaios clínicos randomizados avaliando a eficácia e segurança da toxina botulínica no tratamento da bexiga hiperativa refratária.',
        date: 'Publicado: 15/01/2025',
        url: 'pages/artigo/acupuntura-urinaria-feminina.html'
    },
    {
        type: 'article',
        title: 'Impacto da Menopausa na Função do Assoalho Pélvico',
        description: 'Estudo longitudinal avaliando alterações na função do assoalho pélvico durante a transição menopausal e estratégias de prevenção.',
        date: 'Publicado: 10/01/2025',
        url: 'pages/artigo/cirurgias-incontinencia.html'
    },
    {
        type: 'article',
        title: 'Terapias Comportamentais para Incontinência Urinária',
        description: 'Revisão sistemática sobre a eficácia de intervenções comportamentais no tratamento da incontinência urinária de esforço.',
        date: 'Publicado: 08/01/2025',
        url: 'pages/artigo/revi-literaria-artigo.html'
    },
    {
        type: 'article',
        title: 'Novos Fármacos para Bexiga Hiperativa',
        description: 'Revisão sistemática avaliando a eficácia e segurança de novos agentes farmacológicos no tratamento da síndrome da bexiga hiperativa.',
        date: 'Publicado: 05/01/2025',
        url: 'pages/artigo/revisao-ssistematica.html'
    },
    {
        type: 'article',
        title: 'Cirurgia Robótica em Prolapso Genital',
        description: 'Análise comparativa entre abordagens robóticas e tradicionais no tratamento do prolapso genital avançado.',
        date: 'Publicado: 03/01/2025',
        url: 'pages/artigo/urinaria-atencao-basica.html'
    }
];

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando carrosseis da página inicial...');

    // Inicializa o carrossel de protocolos
    const protocolCarousel = new SimpleCarousel('protocolsCarousel', protocolos);
    console.log('Carrossel de protocolos inicializado');

    // Inicializa o carrossel de artigos
    const articleCarousel = new SimpleCarousel('articlesCarousel', artigos);
    console.log('Carrossel de artigos inicializado');

    // Atualiza os ícones
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
});
