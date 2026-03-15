/**
 * runner.js - Sistema de testes automatizados simples
 * Autor: Uroginecologia Em Dia
 */

// Estatísticas dos testes
let stats = {
    passed: 0,
    failed: 0,
    total: 0
};

// Resultados dos testes
let testResults = [];

/**
 * Função de asserção simples
 */
function assert(condition, message) {
    if (!condition) {
        throw new Error(message || 'Assertion failed');
    }
}

function assertEquals(actual, expected, message) {
    if (actual !== expected) {
        throw new Error(message || `Expected ${expected} but got ${actual}`);
    }
}

function assertNotNull(value, message) {
    if (value === null || value === undefined) {
        throw new Error(message || 'Value should not be null or undefined');
    }
}

function assertArrayLength(array, length, message) {
    if (!Array.isArray(array) || array.length !== length) {
        throw new Error(message || `Expected array length ${length} but got ${array?.length}`);
    }
}

/**
 * Executa um teste
 */
async function runTest(testName, testFunc) {
    const startTime = performance.now();
    let status = 'pending';
    let error = null;

    try {
        await testFunc();
        status = 'passed';
        stats.passed++;
    } catch (e) {
        status = 'failed';
        error = e.message;
        stats.failed++;
    }

    const endTime = performance.now();
    const duration = (endTime - startTime).toFixed(2);

    stats.total++;

    testResults.push({
        name: testName,
        status: status,
        error: error,
        duration: duration
    });

    return { status, error, duration };
}

/**
 * Define os testes
 */
const tests = [
    {
        name: 'Validação de Arquivos JSON - Protocolos',
        test: async () => {
            const response = await fetch('../assets/data/protocolos.json');
            assert(response.ok, 'Arquivo protocolos.json não encontrado');

            const data = await response.json();
            assert(Array.isArray(data), 'Dados de protocolos devem ser um array');
            assert(data.length > 0, 'Deve haver pelo menos um protocolo');

            const firstItem = data[0];
            assertNotNull(firstItem.id, 'Protocolo deve ter ID');
            assertNotNull(firstItem.titulo, 'Protocolo deve ter título');
            assertNotNull(firstItem.descricao, 'Protocolo deve ter descrição');
        }
    },
    {
        name: 'Validação de Arquivos JSON - Artigos',
        test: async () => {
            const response = await fetch('../assets/data/artigos.json');
            assert(response.ok, 'Arquivo artigos.json não encontrado');

            const data = await response.json();
            assert(Array.isArray(data), 'Dados de artigos devem ser um array');
            assert(data.length > 0, 'Deve haver pelo menos um artigo');

            const firstItem = data[0];
            assertNotNull(firstItem.id, 'Artigo deve ter ID');
            assertNotNull(firstItem.titulo, 'Artigo deve ter título');
        }
    },
    {
        name: 'Validação de Arquivos JSON - Eventos',
        test: async () => {
            const response = await fetch('../assets/data/eventos.json');
            assert(response.ok, 'Arquivo eventos.json não encontrado');

            const data = await response.json();
            assert(Array.isArray(data), 'Dados de eventos devem ser um array');
            assert(data.length > 0, 'Deve haver pelo menos um evento');

            const firstItem = data[0];
            assertNotNull(firstItem.id, 'Evento deve ter ID');
            assertNotNull(firstItem.titulo, 'Evento deve ter título');
        }
    },
    {
        name: 'Validação de Arquivos JSON - Notícias',
        test: async () => {
            const response = await fetch('../assets/data/noticias.json');
            assert(response.ok, 'Arquivo noticias.json não encontrado');

            const data = await response.json();
            assert(Array.isArray(data), 'Dados de notícias devem ser um array');
            assert(data.length > 0, 'Deve haver pelo menos uma notícia');

            const firstItem = data[0];
            assertNotNull(firstItem.id, 'Notícia deve ter ID');
            assertNotNull(firstItem.titulo, 'Notícia deve ter título');
        }
    },
    {
        name: 'Teste de Função normalizeString',
        test: async () => {
            // Importar função do busca.js
            if (typeof normalizeString !== 'undefined') {
                assertEquals(normalizeString('Uroginecologia'), 'uroginecologia', 'Deve converter para minúsculas');
                assertEquals(normalizeString('São Paulo'), 'sao paulo', 'Deve remover acentos');
            }
        }
    },
    {
        name: 'Validação de Componentes HTML',
        test: async () => {
            const headerResponse = await fetch('../components/header.html');
            assert(headerResponse.ok, 'Componente header.html não encontrado');

            const footerResponse = await fetch('../components/footer.html');
            assert(footerResponse.ok, 'Componente footer.html não encontrado');
        }
    },
    {
        name: 'Validação de Páginas Principais',
        test: async () => {
            const pages = ['index.html', 'pages/protocolos.html', 'pages/artigos.html', 'pages/eventos.html', 'pages/noticias.html', 'pages/sobre.html'];

            for (const page of pages) {
                const response = await fetch(`../${page}`);
                assert(response.ok, `Página ${page} não encontrada`);
            }
        }
    },
    {
        name: 'Validação de Scripts JavaScript',
        test: async () => {
            const scripts = [
                'assets/js/main.js',
                'assets/js/common.js',
                'assets/js/pages/index.js',
                'assets/js/pages/protocolos.js',
                'assets/js/pages/artigos.js',
                'assets/js/pages/eventos.js',
                'assets/js/pages/noticias.js',
                'assets/js/pages/busca.js'
            ];

            for (const script of scripts) {
                const response = await fetch(`../${script}`);
                assert(response.ok, `Script ${script} não encontrado`);
            }
        }
    },
    {
        name: 'Validação de Arquivos CSS',
        test: async () => {
            const response = await fetch('../assets/css/style.css');
            assert(response.ok, 'Arquivo style.css não encontrado');

            const content = await response.text();
            assert(content.length > 0, 'Arquivo CSS não deve estar vazio');
        }
    },
    {
        name: 'Validação de SEO - Sitemap',
        test: async () => {
            const response = await fetch('../sitemap.xml');
            assert(response.ok, 'Arquivo sitemap.xml não encontrado');

            const content = await response.text();
            assert(content.includes('<?xml'), 'Sitemap deve ser um arquivo XML válido');
            assert(content.includes('<urlset'), 'Sitemap deve conter o elemento urlset');
        }
    },
    {
        name: 'Validação de SEO - Robots.txt',
        test: async () => {
            const response = await fetch('../robots.txt');
            assert(response.ok, 'Arquivo robots.txt não encontrado');

            const content = await response.text();
            assert(content.includes('User-agent'), 'Robots.txt deve conter User-agent');
        }
    }
];

/**
 * Renderiza os resultados
 */
function renderResults() {
    const container = document.getElementById('test-results');
    container.innerHTML = '';

    testResults.forEach(result => {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-lg shadow-md p-4';

        const statusClass = result.status === 'passed' ? 'test-pass' : 'test-fail';
        const statusIcon = result.status === 'passed' ? '✓' : '✗';

        card.innerHTML = `
            <div class="flex items-start justify-between">
                <div class="flex-1">
                    <h3 class="font-bold ${statusClass}">${statusIcon} ${result.name}</h3>
                    ${result.error ? `<p class="text-sm text-red-600 mt-2">${result.error}</p>` : ''}
                </div>
                <span class="text-sm text-gray-500">${result.duration}ms</span>
            </div>
        `;

        container.appendChild(card);
    });

    // Atualizar estatísticas
    document.getElementById('passed-count').textContent = stats.passed;
    document.getElementById('failed-count').textContent = stats.failed;
    document.getElementById('total-count').textContent = stats.total;
}

/**
 * Executa todos os testes
 */
async function runAllTests() {
    // Resetar estatísticas
    stats = { passed: 0, failed: 0, total: 0 };
    testResults = [];

    const button = document.getElementById('run-tests');
    button.disabled = true;
    button.textContent = 'Executando...';

    for (const test of tests) {
        await runTest(test.name, test.test);
        renderResults();
    }

    button.disabled = false;
    button.textContent = 'Executar Novamente';

    // Mostrar mensagem final
    if (stats.failed === 0) {
        alert(`✓ Todos os ${stats.total} testes passaram!`);
    } else {
        alert(`✗ ${stats.failed} de ${stats.total} testes falharam.`);
    }
}

// Event listener para o botão
document.getElementById('run-tests').addEventListener('click', runAllTests);

// Executar testes automaticamente ao carregar a página
window.addEventListener('load', () => {
    console.log('Página de testes carregada. Clique no botão para executar os testes.');
});
