# Uroginecologia Em Dia

Portal de referência em conhecimento uroginecológico para profissionais de saúde.

## 📋 Sobre o Projeto

O **Uroginecologia Em Dia** é um portal educacional dedicado a fornecer conteúdo especializado para médicos e estudantes de medicina, com as últimas evidências científicas e protocolos clínicos em uroginecologia.

### Funcionalidades

- 📚 **Protocolos Clínicos**: Diretrizes baseadas em evidências da FEBRASGO e sociedades internacionais
- 📰 **Artigos Resumidos**: Resumos críticos de artigos científicos relevantes
- 📅 **Eventos**: Calendário de congressos, cursos e webinars
- 🔔 **Notícias**: Últimas novidades da área de uroginecologia
- 📧 **Newsletter**: Sistema de assinatura para receber atualizações

## 🛠 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e acessível
- **Tailwind CSS**: Framework CSS via CDN para estilização
- **JavaScript ES6+**: Funcionalidades interativas e dinâmicas
- **Feather Icons**: Biblioteca de ícones SVG
- **JSON**: Armazenamento de dados estruturados

## 📂 Estrutura do Projeto

```
uroginecologia-em-dia/
├── index.html                  # Página principal
├── sitemap.xml                 # Mapa do site para SEO
├── robots.txt                  # Configurações para crawlers
├── README.md                   # Documentação do projeto
│
├── assets/
│   ├── css/
│   │   └── style.css           # Estilos customizados
│   │
│   ├── js/
│   │   ├── main.js             # Sistema de componentes e comunicação
│   │   ├── common.js           # Funcionalidades compartilhadas
│   │   ├── content-loader.js   # Carregamento de componentes
│   │   └── pages/
│   │       ├── index.js        # Carrosséis da home
│   │       ├── protocolos.js   # Página de protocolos
│   │       └── artigos.js      # Página de artigos
│   │
│   └── data/
│       ├── protocolos.json     # Dados dos protocolos
│       └── artigos.json        # Dados dos artigos
│
├── components/
│   ├── header.html             # Componente do cabeçalho
│   ├── header-components.html  # Componentes extras do header
│   └── footer.html             # Componente do rodapé
│
└── pages/
    ├── sobre.html              # Sobre o portal
    ├── contato.html            # Formulário de contato
    ├── eventos.html            # Página de eventos
    ├── noticias.html           # Página de notícias
    │
    ├── protocolos.html         # Lista de protocolos
    ├── protocolo/              # Protocolos individuais
    │   ├── infeccao-do-trato-urinario.html
    │   ├── incontinencia-urinaria-esforco.html
    │   ├── incontinencia-urinaria-nao.html
    │   └── sindrome-bexiga-hiperativa.html
    │
    ├── artigos.html            # Lista de artigos
    └── artigo/                 # Artigos individuais
        ├── acupuntura-urinaria-feminina.html
        ├── cirurgias-incontinencia.html
        ├── revi-literaria-artigo.html
        ├── revisao-ssistematica.html
        └── urinaria-atencao-basica.html
```

## 🚀 Como Executar

### Opção 1: Servidor Local

1. Clone o repositório:
```bash
git clone https://github.com/Lukees404/uroginecologia-em-dia.git
cd uroginecologia-em-dia
```

2. Inicie um servidor local:
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (com http-server)
npx http-server -p 8000

# PHP
php -S localhost:8000
```

3. Acesse `http://localhost:8000` no navegador

### Opção 2: GitHub Pages

O site está configurado para deploy automático no GitHub Pages através da branch `gh-pages`.

## 🎨 Customização

### Cores do Tema

As cores podem ser ajustadas no arquivo `index.html` e demais páginas na configuração do Tailwind:

```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                uro: {
                    azul_escuro: '#1e40af',
                    azul: '#3b82f6',
                    azul_claro: '#60a5fa',
                    branco: '#ffffff',
                    cinza: '#f3f4f6',
                    cinza_escuro: '#6b7280'
                }
            }
        }
    }
}
```

### Adicionar Novos Protocolos

1. Adicione os dados em `assets/data/protocolos.json`:
```json
{
    "id": "novo-protocolo",
    "titulo": "Título do Protocolo",
    "arquivo": "nome-do-arquivo.html",
    "categoria": "infeccioso|urodinamico|cirurgico|funcional",
    "descricao": "Descrição breve",
    "data": "Mês/Ano",
    "icone": "🔬",
    "tags": ["tag1", "tag2"]
}
```

2. Crie o arquivo HTML em `pages/protocolo/nome-do-arquivo.html`

3. A página será automaticamente listada

### Adicionar Novos Artigos

Mesma lógica dos protocolos, editando `assets/data/artigos.json`

## ♿ Acessibilidade

O site foi desenvolvido seguindo as diretrizes WCAG 2.1 nível AA:

- ✅ Navegação por teclado completa
- ✅ Labels e ARIA attributes adequados
- ✅ Contraste de cores acessível
- ✅ Textos alternativos em imagens
- ✅ Skip links para conteúdo principal
- ✅ Estrutura semântica HTML5

## 🔍 SEO

Otimizações implementadas:

- ✅ Meta tags completas (description, keywords, author)
- ✅ Open Graph tags (Facebook)
- ✅ Twitter Card tags
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ URLs semânticas
- ✅ Tags HTML semânticas
- ✅ Performance otimizada

## 📱 Responsividade

O site é totalmente responsivo e otimizado para:

- 📱 Mobile (320px - 767px)
- 💻 Tablet (768px - 1023px)
- 🖥️ Desktop (1024px+)

## 🔄 Sistema de Componentes

O projeto utiliza um sistema de componentes reutilizáveis:

- **Header**: Navegação principal e busca
- **Footer**: Links, contato e informações
- **Carrosséis**: Exibição de conteúdo em destaque
- **Cards**: Protocolos, artigos e notícias

Os componentes são carregados via JavaScript através do arquivo `main.js`.

## 📊 Dados Estruturados

Os dados de protocolos e artigos são armazenados em arquivos JSON para facilitar manutenção e futuras integrações com APIs:

- `assets/data/protocolos.json`
- `assets/data/artigos.json`

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

## 📝 Licença

Este projeto é de código aberto e está disponível sob a [Licença MIT](LICENSE).

## 📧 Contato

- Email: contato@uroginecologiaemdia.com.br
- Instagram: [@uroginecologiaemdia](https://instagram.com/uroginecologiaemdia)
- Facebook: [/uroginecologiaemdia](https://facebook.com/uroginecologiaemdia)
- LinkedIn: [/company/uroginecologiaemdia](https://linkedin.com/company/uroginecologiaemdia)

## 🙏 Agradecimentos

- FEBRASGO - Federação Brasileira das Associações de Ginecologia e Obstetrícia
- IUGA - International Urogynecological Association
- Todos os profissionais que contribuem com conteúdo

---

Desenvolvido com ❤️ para a comunidade médica brasileira
