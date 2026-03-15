# Testes Automatizados

Sistema de testes automatizados para o portal Uroginecologia Em Dia.

## Como Executar

1. **Abra o arquivo `tests/index.html` no navegador**
   ```bash
   # No diretório do projeto
   open tests/index.html
   # ou
   python -m http.server 8000
   # Depois acesse http://localhost:8000/tests/
   ```

2. **Clique no botão "Executar Testes"**

3. **Visualize os resultados**
   - ✓ Verde: Teste passou
   - ✗ Vermelho: Teste falhou
   - Estatísticas mostram total de testes passados e falhados

## Testes Implementados

### 1. Validação de Arquivos JSON
- **Protocolos**: Verifica estrutura e campos obrigatórios
- **Artigos**: Verifica estrutura e campos obrigatórios
- **Eventos**: Verifica estrutura e campos obrigatórios
- **Notícias**: Verifica estrutura e campos obrigatórios

### 2. Validação de Componentes
- **Header**: Verifica existência do componente
- **Footer**: Verifica existência do componente

### 3. Validação de Páginas
- **index.html**: Página principal
- **protocolos.html**: Listagem de protocolos
- **artigos.html**: Listagem de artigos
- **eventos.html**: Calendário de eventos
- **noticias.html**: Feed de notícias
- **sobre.html**: Página institucional

### 4. Validação de Scripts JavaScript
- **main.js**: Sistema de componentes
- **common.js**: Funcionalidades compartilhadas
- **index.js**: Carrosséis da homepage
- **protocolos.js**: Página de protocolos
- **artigos.js**: Página de artigos
- **eventos.js**: Página de eventos
- **noticias.js**: Página de notícias
- **busca.js**: Sistema de busca

### 5. Validação de Estilização
- **style.css**: Arquivo de estilos customizados

### 6. Validação de SEO
- **sitemap.xml**: Mapa do site para motores de busca
- **robots.txt**: Configuração para crawlers

### 7. Testes de Funcionalidade
- **normalizeString**: Função de normalização de strings para busca

## Estrutura dos Testes

```
tests/
├── index.html      # Interface de testes
├── runner.js       # Motor de execução de testes
└── README.md       # Documentação
```

## Adicionar Novos Testes

Para adicionar novos testes, edite o arquivo `runner.js` e adicione um objeto ao array `tests`:

```javascript
{
    name: 'Nome do Teste',
    test: async () => {
        // Código do teste
        const response = await fetch('../caminho/arquivo.json');
        assert(response.ok, 'Mensagem de erro');

        const data = await response.json();
        assert(data.length > 0, 'Deve ter dados');
    }
}
```

## Funções de Asserção Disponíveis

- `assert(condition, message)`: Verifica se condição é verdadeira
- `assertEquals(actual, expected, message)`: Verifica igualdade
- `assertNotNull(value, message)`: Verifica se valor não é null
- `assertArrayLength(array, length, message)`: Verifica tamanho do array

## Requisitos

- Navegador moderno com suporte a:
  - ES6+ (async/await, fetch API)
  - JavaScript habilitado
- Servidor local para evitar problemas de CORS

## Troubleshooting

### Erro de CORS
Se encontrar erros de CORS ao executar os testes:
1. Use um servidor local (como `python -m http.server`)
2. Não abra o arquivo diretamente no navegador (file://)

### Testes Falhando
1. Verifique se todos os arquivos JSON estão presentes
2. Verifique se a estrutura dos dados está correta
3. Veja os detalhes do erro na interface de testes
