# Relatorio de consolidacao de duplicacoes

Data: 2026-06-11

Este relatorio lista os arquivos CSS, JS e HTML auditados que tinham definicoes ou imports repetidos e a fonte canonica escolhida. As alteracoes nao mexem em conteudo clinico nem em regras de negocio; apenas trocam definicoes repetidas por referencias canonicas.

## Fontes canonicas

- Estilos, cores, fontes, variaveis CSS e breakpoints visuais: `assets/css/redesign.css`
- Scripts reutilizaveis e funcoes utilitarias: arquivos nao-minificados em `assets/js/`
- Analytics: `components/analytics.html`, carregado por `assets/js/analytics-loader.js`
- Test runner: `tests/runner.js`
- Service worker: `sw.js`

## CSS consolidado

Canonico: `assets/css/redesign.css`

- `assets/css/style.css` -> `assets/css/redesign.css`
- `assets/css/style.min.css` -> `assets/css/redesign.css`
- `components/assets/css/redesign.css` -> `assets/css/redesign.css`
- `components/assets/css/style.css` -> `assets/css/redesign.css`
- `components/assets/css/style.min.css` -> `assets/css/redesign.css`
- `components/docs/assets/css/redesign.css` -> `assets/css/redesign.css`
- `components/docs/assets/css/style.css` -> `assets/css/redesign.css`
- `components/docs/assets/css/style.min.css` -> `assets/css/redesign.css`
- `components/pages/assets/css/redesign.css` -> `assets/css/redesign.css`
- `components/pages/assets/css/style.css` -> `assets/css/redesign.css`
- `components/pages/assets/css/style.min.css` -> `assets/css/redesign.css`
- `docs/assets/css/redesign.css` -> `assets/css/redesign.css`
- `docs/assets/css/style.css` -> `assets/css/redesign.css`
- `docs/assets/css/style.min.css` -> `assets/css/redesign.css`
- `docs/docs/assets/css/redesign.css` -> `assets/css/redesign.css`
- `docs/docs/assets/css/style.css` -> `assets/css/redesign.css`
- `docs/docs/assets/css/style.min.css` -> `assets/css/redesign.css`
- `docs/pages/assets/css/redesign.css` -> `assets/css/redesign.css`
- `docs/pages/assets/css/style.css` -> `assets/css/redesign.css`
- `docs/pages/assets/css/style.min.css` -> `assets/css/redesign.css`
- `pages/assets/css/redesign.css` -> `assets/css/redesign.css`
- `pages/assets/css/style.css` -> `assets/css/redesign.css`
- `pages/assets/css/style.min.css` -> `assets/css/redesign.css`

## JS consolidado

Canonico: `assets/js/common.js`
- `assets/js/common.min.js` -> `assets/js/common.js`
- `components/assets/js/common.js` -> `assets/js/common.js`
- `components/assets/js/common.min.js` -> `assets/js/common.js`
- `components/docs/assets/js/common.js` -> `assets/js/common.js`
- `components/docs/assets/js/common.min.js` -> `assets/js/common.js`
- `components/pages/assets/js/common.js` -> `assets/js/common.js`
- `components/pages/assets/js/common.min.js` -> `assets/js/common.js`
- `docs/assets/js/common.js` -> `assets/js/common.js`
- `docs/assets/js/common.min.js` -> `assets/js/common.js`
- `docs/docs/assets/js/common.js` -> `assets/js/common.js`
- `docs/docs/assets/js/common.min.js` -> `assets/js/common.js`
- `docs/pages/assets/js/common.js` -> `assets/js/common.js`
- `docs/pages/assets/js/common.min.js` -> `assets/js/common.js`
- `pages/assets/js/common.js` -> `assets/js/common.js`
- `pages/assets/js/common.min.js` -> `assets/js/common.js`

Canonico: `assets/js/constants.js`
- `assets/js/constants.min.js` -> `assets/js/constants.js`
- `components/assets/js/constants.js` -> `assets/js/constants.js`
- `components/assets/js/constants.min.js` -> `assets/js/constants.js`
- `components/docs/assets/js/constants.js` -> `assets/js/constants.js`
- `components/docs/assets/js/constants.min.js` -> `assets/js/constants.js`
- `components/pages/assets/js/constants.js` -> `assets/js/constants.js`
- `components/pages/assets/js/constants.min.js` -> `assets/js/constants.js`
- `docs/assets/js/constants.js` -> `assets/js/constants.js`
- `docs/assets/js/constants.min.js` -> `assets/js/constants.js`
- `docs/docs/assets/js/constants.js` -> `assets/js/constants.js`
- `docs/docs/assets/js/constants.min.js` -> `assets/js/constants.js`
- `docs/pages/assets/js/constants.js` -> `assets/js/constants.js`
- `docs/pages/assets/js/constants.min.js` -> `assets/js/constants.js`
- `pages/assets/js/constants.js` -> `assets/js/constants.js`
- `pages/assets/js/constants.min.js` -> `assets/js/constants.js`

Canonico: `assets/js/content-loader.js`
- `assets/js/content-loader.min.js` -> `assets/js/content-loader.js`
- `components/assets/js/content-loader.js` -> `assets/js/content-loader.js`
- `components/assets/js/content-loader.min.js` -> `assets/js/content-loader.js`
- `components/docs/assets/js/content-loader.js` -> `assets/js/content-loader.js`
- `components/docs/assets/js/content-loader.min.js` -> `assets/js/content-loader.js`
- `components/pages/assets/js/content-loader.js` -> `assets/js/content-loader.js`
- `components/pages/assets/js/content-loader.min.js` -> `assets/js/content-loader.js`
- `docs/assets/js/content-loader.js` -> `assets/js/content-loader.js`
- `docs/assets/js/content-loader.min.js` -> `assets/js/content-loader.js`
- `docs/docs/assets/js/content-loader.js` -> `assets/js/content-loader.js`
- `docs/docs/assets/js/content-loader.min.js` -> `assets/js/content-loader.js`
- `docs/pages/assets/js/content-loader.js` -> `assets/js/content-loader.js`
- `docs/pages/assets/js/content-loader.min.js` -> `assets/js/content-loader.js`
- `pages/assets/js/content-loader.js` -> `assets/js/content-loader.js`
- `pages/assets/js/content-loader.min.js` -> `assets/js/content-loader.js`

Canonico: `assets/js/main.js`
- `assets/js/main.min.js` -> `assets/js/main.js`
- `components/assets/js/main.js` -> `assets/js/main.js`
- `components/assets/js/main.min.js` -> `assets/js/main.js`
- `components/docs/assets/js/main.js` -> `assets/js/main.js`
- `components/docs/assets/js/main.min.js` -> `assets/js/main.js`
- `components/pages/assets/js/main.js` -> `assets/js/main.js`
- `components/pages/assets/js/main.min.js` -> `assets/js/main.js`
- `docs/assets/js/main.js` -> `assets/js/main.js`
- `docs/assets/js/main.min.js` -> `assets/js/main.js`
- `docs/docs/assets/js/main.js` -> `assets/js/main.js`
- `docs/docs/assets/js/main.min.js` -> `assets/js/main.js`
- `docs/pages/assets/js/main.js` -> `assets/js/main.js`
- `docs/pages/assets/js/main.min.js` -> `assets/js/main.js`
- `pages/assets/js/main.js` -> `assets/js/main.js`
- `pages/assets/js/main.min.js` -> `assets/js/main.js`

Canonico: `assets/js/mode-toggle.js`
- `components/assets/js/mode-toggle.js` -> `assets/js/mode-toggle.js`
- `components/docs/assets/js/mode-toggle.js` -> `assets/js/mode-toggle.js`
- `components/pages/assets/js/mode-toggle.js` -> `assets/js/mode-toggle.js`
- `docs/assets/js/mode-toggle.js` -> `assets/js/mode-toggle.js`
- `docs/docs/assets/js/mode-toggle.js` -> `assets/js/mode-toggle.js`
- `docs/pages/assets/js/mode-toggle.js` -> `assets/js/mode-toggle.js`
- `pages/assets/js/mode-toggle.js` -> `assets/js/mode-toggle.js`

Canonico: `assets/js/pages/artigos.js`
- `assets/js/pages/artigos.min.js` -> `assets/js/pages/artigos.js`
- `components/assets/js/pages/artigos.js` -> `assets/js/pages/artigos.js`
- `components/assets/js/pages/artigos.min.js` -> `assets/js/pages/artigos.js`
- `components/docs/assets/js/pages/artigos.js` -> `assets/js/pages/artigos.js`
- `components/docs/assets/js/pages/artigos.min.js` -> `assets/js/pages/artigos.js`
- `components/pages/assets/js/pages/artigos.js` -> `assets/js/pages/artigos.js`
- `components/pages/assets/js/pages/artigos.min.js` -> `assets/js/pages/artigos.js`
- `docs/assets/js/pages/artigos.js` -> `assets/js/pages/artigos.js`
- `docs/assets/js/pages/artigos.min.js` -> `assets/js/pages/artigos.js`
- `docs/docs/assets/js/pages/artigos.js` -> `assets/js/pages/artigos.js`
- `docs/docs/assets/js/pages/artigos.min.js` -> `assets/js/pages/artigos.js`
- `docs/pages/assets/js/pages/artigos.js` -> `assets/js/pages/artigos.js`
- `docs/pages/assets/js/pages/artigos.min.js` -> `assets/js/pages/artigos.js`
- `pages/assets/js/pages/artigos.js` -> `assets/js/pages/artigos.js`
- `pages/assets/js/pages/artigos.min.js` -> `assets/js/pages/artigos.js`

Canonico: `assets/js/pages/busca.js`
- `assets/js/pages/busca.min.js` -> `assets/js/pages/busca.js`
- `components/assets/js/pages/busca.js` -> `assets/js/pages/busca.js`
- `components/assets/js/pages/busca.min.js` -> `assets/js/pages/busca.js`
- `components/docs/assets/js/pages/busca.js` -> `assets/js/pages/busca.js`
- `components/docs/assets/js/pages/busca.min.js` -> `assets/js/pages/busca.js`
- `components/pages/assets/js/pages/busca.js` -> `assets/js/pages/busca.js`
- `components/pages/assets/js/pages/busca.min.js` -> `assets/js/pages/busca.js`
- `docs/assets/js/pages/busca.js` -> `assets/js/pages/busca.js`
- `docs/assets/js/pages/busca.min.js` -> `assets/js/pages/busca.js`
- `docs/docs/assets/js/pages/busca.js` -> `assets/js/pages/busca.js`
- `docs/docs/assets/js/pages/busca.min.js` -> `assets/js/pages/busca.js`
- `docs/pages/assets/js/pages/busca.js` -> `assets/js/pages/busca.js`
- `docs/pages/assets/js/pages/busca.min.js` -> `assets/js/pages/busca.js`
- `pages/assets/js/pages/busca.js` -> `assets/js/pages/busca.js`
- `pages/assets/js/pages/busca.min.js` -> `assets/js/pages/busca.js`

Canonico: `assets/js/pages/contato-emailjs.js`
- `components/assets/js/pages/contato-emailjs.js` -> `assets/js/pages/contato-emailjs.js`
- `components/docs/assets/js/pages/contato-emailjs.js` -> `assets/js/pages/contato-emailjs.js`
- `components/pages/assets/js/pages/contato-emailjs.js` -> `assets/js/pages/contato-emailjs.js`
- `docs/assets/js/pages/contato-emailjs.js` -> `assets/js/pages/contato-emailjs.js`
- `docs/docs/assets/js/pages/contato-emailjs.js` -> `assets/js/pages/contato-emailjs.js`
- `docs/pages/assets/js/pages/contato-emailjs.js` -> `assets/js/pages/contato-emailjs.js`
- `pages/assets/js/pages/contato-emailjs.js` -> `assets/js/pages/contato-emailjs.js`

Canonico: `assets/js/pages/eventos.js`
- `assets/js/pages/eventos.min.js` -> `assets/js/pages/eventos.js`
- `components/assets/js/pages/eventos.js` -> `assets/js/pages/eventos.js`
- `components/assets/js/pages/eventos.min.js` -> `assets/js/pages/eventos.js`
- `components/docs/assets/js/pages/eventos.js` -> `assets/js/pages/eventos.js`
- `components/docs/assets/js/pages/eventos.min.js` -> `assets/js/pages/eventos.js`
- `components/pages/assets/js/pages/eventos.js` -> `assets/js/pages/eventos.js`
- `components/pages/assets/js/pages/eventos.min.js` -> `assets/js/pages/eventos.js`
- `docs/assets/js/pages/eventos.js` -> `assets/js/pages/eventos.js`
- `docs/assets/js/pages/eventos.min.js` -> `assets/js/pages/eventos.js`
- `docs/docs/assets/js/pages/eventos.js` -> `assets/js/pages/eventos.js`
- `docs/docs/assets/js/pages/eventos.min.js` -> `assets/js/pages/eventos.js`
- `docs/pages/assets/js/pages/eventos.js` -> `assets/js/pages/eventos.js`
- `docs/pages/assets/js/pages/eventos.min.js` -> `assets/js/pages/eventos.js`
- `pages/assets/js/pages/eventos.js` -> `assets/js/pages/eventos.js`
- `pages/assets/js/pages/eventos.min.js` -> `assets/js/pages/eventos.js`

Canonico: `assets/js/pages/index.js`
- `assets/js/pages/index.min.js` -> `assets/js/pages/index.js`
- `components/assets/js/pages/index.js` -> `assets/js/pages/index.js`
- `components/assets/js/pages/index.min.js` -> `assets/js/pages/index.js`
- `components/docs/assets/js/pages/index.js` -> `assets/js/pages/index.js`
- `components/docs/assets/js/pages/index.min.js` -> `assets/js/pages/index.js`
- `components/pages/assets/js/pages/index.js` -> `assets/js/pages/index.js`
- `components/pages/assets/js/pages/index.min.js` -> `assets/js/pages/index.js`
- `docs/assets/js/pages/index.js` -> `assets/js/pages/index.js`
- `docs/assets/js/pages/index.min.js` -> `assets/js/pages/index.js`
- `docs/docs/assets/js/pages/index.js` -> `assets/js/pages/index.js`
- `docs/docs/assets/js/pages/index.min.js` -> `assets/js/pages/index.js`
- `docs/pages/assets/js/pages/index.js` -> `assets/js/pages/index.js`
- `docs/pages/assets/js/pages/index.min.js` -> `assets/js/pages/index.js`
- `pages/assets/js/pages/index.js` -> `assets/js/pages/index.js`
- `pages/assets/js/pages/index.min.js` -> `assets/js/pages/index.js`

Canonico: `assets/js/pages/noticias.js`
- `assets/js/pages/noticias.min.js` -> `assets/js/pages/noticias.js`
- `components/assets/js/pages/noticias.js` -> `assets/js/pages/noticias.js`
- `components/assets/js/pages/noticias.min.js` -> `assets/js/pages/noticias.js`
- `components/docs/assets/js/pages/noticias.js` -> `assets/js/pages/noticias.js`
- `components/docs/assets/js/pages/noticias.min.js` -> `assets/js/pages/noticias.js`
- `components/pages/assets/js/pages/noticias.js` -> `assets/js/pages/noticias.js`
- `components/pages/assets/js/pages/noticias.min.js` -> `assets/js/pages/noticias.js`
- `docs/assets/js/pages/noticias.js` -> `assets/js/pages/noticias.js`
- `docs/assets/js/pages/noticias.min.js` -> `assets/js/pages/noticias.js`
- `docs/docs/assets/js/pages/noticias.js` -> `assets/js/pages/noticias.js`
- `docs/docs/assets/js/pages/noticias.min.js` -> `assets/js/pages/noticias.js`
- `docs/pages/assets/js/pages/noticias.js` -> `assets/js/pages/noticias.js`
- `docs/pages/assets/js/pages/noticias.min.js` -> `assets/js/pages/noticias.js`
- `pages/assets/js/pages/noticias.js` -> `assets/js/pages/noticias.js`
- `pages/assets/js/pages/noticias.min.js` -> `assets/js/pages/noticias.js`

Canonico: `assets/js/pages/protocolos.js`
- `assets/js/pages/protocolos.min.js` -> `assets/js/pages/protocolos.js`
- `components/assets/js/pages/protocolos.js` -> `assets/js/pages/protocolos.js`
- `components/assets/js/pages/protocolos.min.js` -> `assets/js/pages/protocolos.js`
- `components/docs/assets/js/pages/protocolos.js` -> `assets/js/pages/protocolos.js`
- `components/docs/assets/js/pages/protocolos.min.js` -> `assets/js/pages/protocolos.js`
- `components/pages/assets/js/pages/protocolos.js` -> `assets/js/pages/protocolos.js`
- `components/pages/assets/js/pages/protocolos.min.js` -> `assets/js/pages/protocolos.js`
- `docs/assets/js/pages/protocolos.js` -> `assets/js/pages/protocolos.js`
- `docs/assets/js/pages/protocolos.min.js` -> `assets/js/pages/protocolos.js`
- `docs/docs/assets/js/pages/protocolos.js` -> `assets/js/pages/protocolos.js`
- `docs/docs/assets/js/pages/protocolos.min.js` -> `assets/js/pages/protocolos.js`
- `docs/pages/assets/js/pages/protocolos.js` -> `assets/js/pages/protocolos.js`
- `docs/pages/assets/js/pages/protocolos.min.js` -> `assets/js/pages/protocolos.js`
- `pages/assets/js/pages/protocolos.js` -> `assets/js/pages/protocolos.js`
- `pages/assets/js/pages/protocolos.min.js` -> `assets/js/pages/protocolos.js`

Canonico: `assets/js/pdf-generator.js`
- `assets/js/pdf-generator.min.js` -> `assets/js/pdf-generator.js`
- `components/assets/js/pdf-generator.js` -> `assets/js/pdf-generator.js`
- `components/assets/js/pdf-generator.min.js` -> `assets/js/pdf-generator.js`
- `components/docs/assets/js/pdf-generator.js` -> `assets/js/pdf-generator.js`
- `components/docs/assets/js/pdf-generator.min.js` -> `assets/js/pdf-generator.js`
- `components/pages/assets/js/pdf-generator.js` -> `assets/js/pdf-generator.js`
- `components/pages/assets/js/pdf-generator.min.js` -> `assets/js/pdf-generator.js`
- `docs/assets/js/pdf-generator.js` -> `assets/js/pdf-generator.js`
- `docs/assets/js/pdf-generator.min.js` -> `assets/js/pdf-generator.js`
- `docs/docs/assets/js/pdf-generator.js` -> `assets/js/pdf-generator.js`
- `docs/docs/assets/js/pdf-generator.min.js` -> `assets/js/pdf-generator.js`
- `docs/pages/assets/js/pdf-generator.js` -> `assets/js/pdf-generator.js`
- `docs/pages/assets/js/pdf-generator.min.js` -> `assets/js/pdf-generator.js`
- `pages/assets/js/pdf-generator.js` -> `assets/js/pdf-generator.js`
- `pages/assets/js/pdf-generator.min.js` -> `assets/js/pdf-generator.js`

Canonico: `assets/js/share.js`
- `components/assets/js/share.js` -> `assets/js/share.js`
- `components/docs/assets/js/share.js` -> `assets/js/share.js`
- `docs/assets/js/share.js` -> `assets/js/share.js`
- `docs/docs/assets/js/share.js` -> `assets/js/share.js`

Canonico: `assets/js/utils.js`
- `assets/js/utils.min.js` -> `assets/js/utils.js`
- `components/assets/js/utils.js` -> `assets/js/utils.js`
- `components/assets/js/utils.min.js` -> `assets/js/utils.js`
- `components/docs/assets/js/utils.js` -> `assets/js/utils.js`
- `components/docs/assets/js/utils.min.js` -> `assets/js/utils.js`
- `components/pages/assets/js/utils.js` -> `assets/js/utils.js`
- `components/pages/assets/js/utils.min.js` -> `assets/js/utils.js`
- `docs/assets/js/utils.js` -> `assets/js/utils.js`
- `docs/assets/js/utils.min.js` -> `assets/js/utils.js`
- `docs/docs/assets/js/utils.js` -> `assets/js/utils.js`
- `docs/docs/assets/js/utils.min.js` -> `assets/js/utils.js`
- `docs/pages/assets/js/utils.js` -> `assets/js/utils.js`
- `docs/pages/assets/js/utils.min.js` -> `assets/js/utils.js`
- `pages/assets/js/utils.js` -> `assets/js/utils.js`
- `pages/assets/js/utils.min.js` -> `assets/js/utils.js`

Canonico: `sw.js`
- `components/docs/sw.js` -> `sw.js`
- `components/pages/sw.js` -> `sw.js`
- `components/sw.js` -> `sw.js`
- `docs/docs/sw.js` -> `sw.js`
- `docs/pages/sw.js` -> `sw.js`
- `docs/sw.js` -> `sw.js`
- `pages/sw.js` -> `sw.js`

Canonico: `tests/runner.js`
- `components/docs/tests/runner.js` -> `tests/runner.js`
- `components/pages/tests/runner.js` -> `tests/runner.js`
- `components/tests/runner.js` -> `tests/runner.js`
- `docs/docs/tests/runner.js` -> `tests/runner.js`
- `docs/pages/tests/runner.js` -> `tests/runner.js`
- `docs/tests/runner.js` -> `tests/runner.js`
- `pages/tests/runner.js` -> `tests/runner.js`

## Componentes HTML de analytics consolidados

Canonico: `components/analytics.html`

- `components/components/analytics.html` -> `components/analytics.html`
- `components/docs/components/analytics.html` -> `components/analytics.html`
- `components/pages/components/analytics.html` -> `components/analytics.html`
- `docs/components/analytics.html` -> `components/analytics.html`
- `docs/docs/components/analytics.html` -> `components/analytics.html`
- `docs/pages/components/analytics.html` -> `components/analytics.html`
- `pages/components/analytics.html` -> `components/analytics.html`

## HTMLs com imports consolidados

Os HTMLs abaixo tiveram imports repetidos removidos ou trocados para as fontes canonicas: fontes Google agora entram por `assets/css/redesign.css`; analytics entra por `/assets/js/analytics-loader.js`; CSS local usa `/assets/css/redesign.css`; JS local usa `/assets/js/*.js` nao-minificado.

- `components/components/analytics.html`
- `components/docs/components/analytics.html`
- `components/docs/index.html`
- `components/docs/pages/artigo/acupuntura-urinaria-feminina.html`
- `components/docs/pages/artigo/cirurgias-incontinencia.html`
- `components/docs/pages/artigo/revi-literaria-artigo.html`
- `components/docs/pages/artigo/revisao-ssistematica.html`
- `components/docs/pages/artigo/urinaria-atencao-basica.html`
- `components/docs/pages/artigos.html`
- `components/docs/pages/busca.html`
- `components/docs/pages/condicoes.html`
- `components/docs/pages/contato.html`
- `components/docs/pages/eventos.html`
- `components/docs/pages/noticias.html`
- `components/docs/pages/perguntas-frequentes.html`
- `components/docs/pages/protocolo/incontinencia-urinaria-esforco.html`
- `components/docs/pages/protocolo/incontinencia-urinaria-nao.html`
- `components/docs/pages/protocolo/infeccao-do-trato-urinario.html`
- `components/docs/pages/protocolo/sindrome-bexiga-hiperativa.html`
- `components/docs/pages/protocolos.html`
- `components/docs/pages/saude-pelvica.html`
- `components/docs/pages/sobre.html`
- `components/docs/tests/index.html`
- `components/index.html`
- `components/pages/artigo/acupuntura-urinaria-feminina.html`
- `components/pages/artigo/cirurgias-incontinencia.html`
- `components/pages/artigo/revi-literaria-artigo.html`
- `components/pages/artigo/revisao-ssistematica.html`
- `components/pages/artigo/urinaria-atencao-basica.html`
- `components/pages/artigos.html`
- `components/pages/busca.html`
- `components/pages/components/analytics.html`
- `components/pages/condicoes.html`
- `components/pages/contato.html`
- `components/pages/eventos.html`
- `components/pages/index.html`
- `components/pages/noticias.html`
- `components/pages/pages/artigo/acupuntura-urinaria-feminina.html`
- `components/pages/pages/artigo/cirurgias-incontinencia.html`
- `components/pages/pages/artigo/revi-literaria-artigo.html`
- `components/pages/pages/artigo/revisao-ssistematica.html`
- `components/pages/pages/artigo/urinaria-atencao-basica.html`
- `components/pages/pages/artigos.html`
- `components/pages/pages/busca.html`
- `components/pages/pages/condicoes.html`
- `components/pages/pages/contato.html`
- `components/pages/pages/eventos.html`
- `components/pages/pages/noticias.html`
- `components/pages/pages/perguntas-frequentes.html`
- `components/pages/pages/protocolo/incontinencia-urinaria-esforco.html`
- `components/pages/pages/protocolo/incontinencia-urinaria-nao.html`
- `components/pages/pages/protocolo/infeccao-do-trato-urinario.html`
- `components/pages/pages/protocolo/sindrome-bexiga-hiperativa.html`
- `components/pages/pages/protocolos.html`
- `components/pages/pages/saude-pelvica.html`
- `components/pages/pages/sobre.html`
- `components/pages/perguntas-frequentes.html`
- `components/pages/protocolo/incontinencia-urinaria-esforco.html`
- `components/pages/protocolo/incontinencia-urinaria-nao.html`
- `components/pages/protocolo/infeccao-do-trato-urinario.html`
- `components/pages/protocolo/sindrome-bexiga-hiperativa.html`
- `components/pages/protocolos.html`
- `components/pages/saude-pelvica.html`
- `components/pages/sobre.html`
- `components/pages/tests/index.html`
- `components/tests/index.html`
- `docs/components/analytics.html`
- `docs/docs/components/analytics.html`
- `docs/docs/index.html`
- `docs/docs/pages/artigo/acupuntura-urinaria-feminina.html`
- `docs/docs/pages/artigo/cirurgias-incontinencia.html`
- `docs/docs/pages/artigo/revi-literaria-artigo.html`
- `docs/docs/pages/artigo/revisao-ssistematica.html`
- `docs/docs/pages/artigo/urinaria-atencao-basica.html`
- `docs/docs/pages/artigos.html`
- `docs/docs/pages/busca.html`
- `docs/docs/pages/condicoes.html`
- `docs/docs/pages/contato.html`
- `docs/docs/pages/eventos.html`
- `docs/docs/pages/noticias.html`
- `docs/docs/pages/perguntas-frequentes.html`
- `docs/docs/pages/protocolo/incontinencia-urinaria-esforco.html`
- `docs/docs/pages/protocolo/incontinencia-urinaria-nao.html`
- `docs/docs/pages/protocolo/infeccao-do-trato-urinario.html`
- `docs/docs/pages/protocolo/sindrome-bexiga-hiperativa.html`
- `docs/docs/pages/protocolos.html`
- `docs/docs/pages/saude-pelvica.html`
- `docs/docs/pages/sobre.html`
- `docs/docs/tests/index.html`
- `docs/index.html`
- `docs/pages/artigo/acupuntura-urinaria-feminina.html`
- `docs/pages/artigo/cirurgias-incontinencia.html`
- `docs/pages/artigo/revi-literaria-artigo.html`
- `docs/pages/artigo/revisao-ssistematica.html`
- `docs/pages/artigo/urinaria-atencao-basica.html`
- `docs/pages/artigos.html`
- `docs/pages/busca.html`
- `docs/pages/components/analytics.html`
- `docs/pages/condicoes.html`
- `docs/pages/contato.html`
- `docs/pages/eventos.html`
- `docs/pages/index.html`
- `docs/pages/noticias.html`
- `docs/pages/pages/artigo/acupuntura-urinaria-feminina.html`
- `docs/pages/pages/artigo/cirurgias-incontinencia.html`
- `docs/pages/pages/artigo/revi-literaria-artigo.html`
- `docs/pages/pages/artigo/revisao-ssistematica.html`
- `docs/pages/pages/artigo/urinaria-atencao-basica.html`
- `docs/pages/pages/artigos.html`
- `docs/pages/pages/busca.html`
- `docs/pages/pages/condicoes.html`
- `docs/pages/pages/contato.html`
- `docs/pages/pages/eventos.html`
- `docs/pages/pages/noticias.html`
- `docs/pages/pages/perguntas-frequentes.html`
- `docs/pages/pages/protocolo/incontinencia-urinaria-esforco.html`
- `docs/pages/pages/protocolo/incontinencia-urinaria-nao.html`
- `docs/pages/pages/protocolo/infeccao-do-trato-urinario.html`
- `docs/pages/pages/protocolo/sindrome-bexiga-hiperativa.html`
- `docs/pages/pages/protocolos.html`
- `docs/pages/pages/saude-pelvica.html`
- `docs/pages/pages/sobre.html`
- `docs/pages/perguntas-frequentes.html`
- `docs/pages/protocolo/incontinencia-urinaria-esforco.html`
- `docs/pages/protocolo/incontinencia-urinaria-nao.html`
- `docs/pages/protocolo/infeccao-do-trato-urinario.html`
- `docs/pages/protocolo/sindrome-bexiga-hiperativa.html`
- `docs/pages/protocolos.html`
- `docs/pages/saude-pelvica.html`
- `docs/pages/sobre.html`
- `docs/pages/tests/index.html`
- `docs/tests/index.html`
- `index.html`
- `pages/artigo/acupuntura-urinaria-feminina.html`
- `pages/artigo/cirurgias-incontinencia.html`
- `pages/artigo/revi-literaria-artigo.html`
- `pages/artigo/revisao-ssistematica.html`
- `pages/artigo/urinaria-atencao-basica.html`
- `pages/artigos.html`
- `pages/busca.html`
- `pages/components/analytics.html`
- `pages/condicoes.html`
- `pages/contato.html`
- `pages/eventos.html`
- `pages/index.html`
- `pages/noticias.html`
- `pages/pages/artigo/acupuntura-urinaria-feminina.html`
- `pages/pages/artigo/cirurgias-incontinencia.html`
- `pages/pages/artigo/revi-literaria-artigo.html`
- `pages/pages/artigo/revisao-ssistematica.html`
- `pages/pages/artigo/urinaria-atencao-basica.html`
- `pages/pages/artigos.html`
- `pages/pages/busca.html`
- `pages/pages/condicoes.html`
- `pages/pages/contato.html`
- `pages/pages/eventos.html`
- `pages/pages/index.html`
- `pages/pages/noticias.html`
- `pages/pages/perguntas-frequentes.html`
- `pages/pages/protocolo/incontinencia-urinaria-esforco.html`
- `pages/pages/protocolo/incontinencia-urinaria-nao.html`
- `pages/pages/protocolo/infeccao-do-trato-urinario.html`
- `pages/pages/protocolo/sindrome-bexiga-hiperativa.html`
- `pages/pages/protocolos.html`
- `pages/pages/saude-pelvica.html`
- `pages/pages/sobre.html`
- `pages/perguntas-frequentes.html`
- `pages/protocolo/incontinencia-urinaria-esforco.html`
- `pages/protocolo/incontinencia-urinaria-nao.html`
- `pages/protocolo/infeccao-do-trato-urinario.html`
- `pages/protocolo/sindrome-bexiga-hiperativa.html`
- `pages/protocolos.html`
- `pages/saude-pelvica.html`
- `pages/sobre.html`
- `pages/tests/index.html`
- `tests/index.html`

## Tailwind config legado removido

A configuracao inline de cores Tailwind estava repetida em copias legadas de paginas de protocolo. Ela foi removida mantendo a inicializacao Mermaid existente no mesmo bloco.

- `components/docs/pages/protocolo/incontinencia-urinaria-esforco.html` -> cores/estilos em `assets/css/redesign.css`
- `components/docs/pages/protocolo/incontinencia-urinaria-nao.html` -> cores/estilos em `assets/css/redesign.css`
- `components/docs/pages/protocolo/infeccao-do-trato-urinario.html` -> cores/estilos em `assets/css/redesign.css`
- `components/docs/pages/protocolo/sindrome-bexiga-hiperativa.html` -> cores/estilos em `assets/css/redesign.css`
- `components/pages/pages/protocolo/incontinencia-urinaria-esforco.html` -> cores/estilos em `assets/css/redesign.css`
- `components/pages/pages/protocolo/incontinencia-urinaria-nao.html` -> cores/estilos em `assets/css/redesign.css`
- `components/pages/pages/protocolo/infeccao-do-trato-urinario.html` -> cores/estilos em `assets/css/redesign.css`
- `components/pages/pages/protocolo/sindrome-bexiga-hiperativa.html` -> cores/estilos em `assets/css/redesign.css`
- `components/pages/protocolo/incontinencia-urinaria-esforco.html` -> cores/estilos em `assets/css/redesign.css`
- `components/pages/protocolo/incontinencia-urinaria-nao.html` -> cores/estilos em `assets/css/redesign.css`
- `components/pages/protocolo/infeccao-do-trato-urinario.html` -> cores/estilos em `assets/css/redesign.css`
- `components/pages/protocolo/sindrome-bexiga-hiperativa.html` -> cores/estilos em `assets/css/redesign.css`
- `docs/docs/pages/protocolo/incontinencia-urinaria-esforco.html` -> cores/estilos em `assets/css/redesign.css`
- `docs/docs/pages/protocolo/incontinencia-urinaria-nao.html` -> cores/estilos em `assets/css/redesign.css`
- `docs/docs/pages/protocolo/infeccao-do-trato-urinario.html` -> cores/estilos em `assets/css/redesign.css`
- `docs/docs/pages/protocolo/sindrome-bexiga-hiperativa.html` -> cores/estilos em `assets/css/redesign.css`
- `docs/pages/pages/protocolo/incontinencia-urinaria-esforco.html` -> cores/estilos em `assets/css/redesign.css`
- `docs/pages/pages/protocolo/incontinencia-urinaria-nao.html` -> cores/estilos em `assets/css/redesign.css`
- `docs/pages/pages/protocolo/infeccao-do-trato-urinario.html` -> cores/estilos em `assets/css/redesign.css`
- `docs/pages/pages/protocolo/sindrome-bexiga-hiperativa.html` -> cores/estilos em `assets/css/redesign.css`
- `docs/pages/protocolo/incontinencia-urinaria-esforco.html` -> cores/estilos em `assets/css/redesign.css`
- `docs/pages/protocolo/incontinencia-urinaria-nao.html` -> cores/estilos em `assets/css/redesign.css`
- `docs/pages/protocolo/infeccao-do-trato-urinario.html` -> cores/estilos em `assets/css/redesign.css`
- `docs/pages/protocolo/sindrome-bexiga-hiperativa.html` -> cores/estilos em `assets/css/redesign.css`
- `pages/pages/protocolo/incontinencia-urinaria-esforco.html` -> cores/estilos em `assets/css/redesign.css`
- `pages/pages/protocolo/incontinencia-urinaria-nao.html` -> cores/estilos em `assets/css/redesign.css`
- `pages/pages/protocolo/infeccao-do-trato-urinario.html` -> cores/estilos em `assets/css/redesign.css`
- `pages/pages/protocolo/sindrome-bexiga-hiperativa.html` -> cores/estilos em `assets/css/redesign.css`
- `pages/protocolo/incontinencia-urinaria-esforco.html` -> cores/estilos em `assets/css/redesign.css`
- `pages/protocolo/incontinencia-urinaria-nao.html` -> cores/estilos em `assets/css/redesign.css`
- `pages/protocolo/infeccao-do-trato-urinario.html` -> cores/estilos em `assets/css/redesign.css`
- `pages/protocolo/sindrome-bexiga-hiperativa.html` -> cores/estilos em `assets/css/redesign.css`

## Funcao utilitaria duplicada removida

- `assets/js/pages/busca.js` deixou de definir `normalizeString` localmente e agora usa `window.UroUtils.normalizeString` de `assets/js/utils.js`.

## Service worker

- `sw.js` manteve a mesma logica de cache, mas deixou de pre-cachear `assets/js/main.min.js` e `assets/js/common.min.js`; agora referencia `assets/js/main.js` e `assets/js/common.js`, que sao as fontes canonicas.

## Validacoes executadas

- `node --check` em todos os arquivos canonicos de `assets/js/` e em `sw.js`.
- Varredura de HTML para confirmar ausencia de `tailwind.config` inline, fontes Google repetidas em HTML e imports locais de `.min.js`.
- Varredura de 201 arquivos HTML e 1.405 referencias locais de CSS, JS, componentes e manifest; nenhuma referencia consolidada ficou faltando.
