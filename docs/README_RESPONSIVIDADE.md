# Guia de Responsividade - Uroginecologia Em Dia

## 📱 Visão Geral

Este documento descreve a implementação completa de responsividade mobile-first do portal Uroginecologia Em Dia, garantindo uma experiência otimizada em smartphones, tablets e desktops.

## 🎯 Breakpoints

O sistema utiliza breakpoints baseados em dispositivos comuns:

| Dispositivo | Breakpoint | CSS Media Query | Uso |
|------------|------------|-----------------|-----|
| **Mobile** | 320px - 767px | `@media (max-width: 767px)` | Smartphones |
| **Tablet** | 768px - 1023px | `@media (min-width: 768px) and (max-width: 1023px)` | Tablets, iPads |
| **Desktop** | 1024px+ | `@media (min-width: 1024px)` | Notebooks e desktops |
| **Large Desktop** | 1280px+ | `@media (min-width: 1280px)` | Monitores grandes |

## 🏗️ Arquitetura Mobile-First

### Filosofia

Todo o CSS foi escrito com abordagem **mobile-first**:
1. Estilos base para mobile (320px)
2. Media queries progressivas para telas maiores
3. Performance otimizada para dispositivos móveis

```css
/* Base: Mobile (320px+) */
.container {
  padding: 1rem;
}

/* Tablet (768px+) */
@media (min-width: 768px) {
  .container {
    padding: 1.5rem;
  }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .container {
    padding: 2rem;
  }
}
```

## 🎨 Componentes Responsivos

### Header

**Mobile (< 768px):**
- Logo compacto "Uro Em Dia"
- Menu hamburger visível
- Navegação principal escondida
- Busca em largura total
- Ícones sociais compactados

**Tablet (768px - 1023px):**
- Logo intermediário
- Menu hamburger mantido
- Navegação com fontes menores
- Busca em largura fixa (224px)

**Desktop (1024px+):**
- Logo completo "Uroginecologia Em Dia"
- Menu hamburger escondido
- Navegação completa visível
- Busca em largura fixa (256px)

### Footer

**Mobile (< 640px):**
- Grid de 1 coluna
- Conteúdo centralizado
- Ícones sociais maiores (touch-friendly)
- Links com mínimo 44px de altura

**Tablet (640px - 1023px):**
- Grid de 2 colunas
- Conteúdo alinhado à esquerda
- Espaçamento otimizado

**Desktop (1024px+):**
- Grid de 4 colunas
- Layout horizontal completo
- Máxima densidade de informação

### Menu Mobile

- Largura: 320px (ou 85vw em telas pequenas)
- Overlay com opacidade
- Animação de deslize suave
- Ícones em todos os itens
- Área de toque mínima de 44px
- Redes sociais no rodapé do menu

## ✨ Otimizações Touch-Friendly

### Áreas de Toque

Todos os elementos interativos seguem as diretrizes WCAG 2.1:

```css
.touch-target {
  min-width: 44px;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
```

**Aplicado em:**
- Botões
- Links de navegação
- Ícones sociais
- Controles de formulário
- Itens de menu

### Formulários

**Prevenção de Zoom no iOS:**
```css
@media (max-width: 767px) {
  input[type="text"],
  input[type="email"],
  select {
    font-size: 16px !important; /* Impede zoom automático */
  }
}
```

### Interações

**Mobile:**
- `:active` ao invés de `:hover`
- Feedback visual imediato
- Animações mais sutis (performance)

**Desktop:**
- `:hover` tradicional
- Animações mais elaboradas
- Transformações 3D

## 📐 Grid System

### Responsivo Automático

```css
.responsive-grid {
  display: grid;
  gap: 1.5rem;

  /* Mobile: 1 coluna */
  grid-template-columns: 1fr;
}

/* Tablet: 2 colunas */
@media (min-width: 768px) {
  .responsive-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop: 3 colunas */
@media (min-width: 1024px) {
  .responsive-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

## 🎭 Tipografia Responsiva

### Escala de Tamanhos

| Elemento | Mobile | Tablet | Desktop |
|----------|--------|--------|---------|
| H1 | 1.875rem (30px) | 2.25rem (36px) | 3rem (48px) |
| H2 | 1.5rem (24px) | 1.875rem (30px) | 2.5rem (40px) |
| H3 | 1.25rem (20px) | 1.5rem (24px) | 1.5rem (24px) |
| Body | 1rem (16px) | 1rem (16px) | 1rem (16px) |

### Line Heights

- Títulos: 1.2 - 1.4
- Parágrafos: 1.6
- Links e botões: normal

## 🎠 Carrosséis

### Comportamento Responsivo

**Mobile:**
- 1 item por vez (100% largura)
- Scroll snap ativado
- Touch scrolling otimizado

**Tablet:**
- 2 itens visíveis
- 50% - gap/2

**Desktop:**
- 3 itens visíveis
- 33.333% - gap/3

```css
.carousel-item {
  /* Mobile */
  width: 100%;

  /* Tablet */
  @media (min-width: 768px) {
    width: calc(50% - 0.5rem);
  }

  /* Desktop */
  @media (min-width: 1024px) {
    width: calc(33.333% - 1rem);
  }
}
```

## 🖼️ Imagens

### Responsivas por Padrão

```css
img {
  max-width: 100%;
  height: auto;
  display: block;
}
```

### Gradientes e Backgrounds

Altura mínima ajustada por breakpoint:

```css
.protocol-image {
  /* Mobile */
  min-height: 150px;

  /* Desktop */
  @media (min-width: 768px) {
    min-height: 200px;
  }
}
```

## ♿ Acessibilidade

### Screen Reader Only

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only:focus {
  /* Visível quando focado */
  position: static;
  width: auto;
  height: auto;
  /* ... */
}
```

### Focus States

```css
button:focus-visible,
a:focus-visible,
input:focus-visible {
  outline: 3px solid var(--uro-azul);
  outline-offset: 2px;
}
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## 🎪 Classes Utilitárias

### Visibilidade Responsiva

```html
<!-- Ocultar em mobile -->
<div class="hidden-mobile">Visível apenas em tablet/desktop</div>

<!-- Ocultar em tablet -->
<div class="hidden-tablet">Visível em mobile e desktop</div>

<!-- Ocultar em desktop -->
<div class="hidden-desktop">Visível apenas em mobile/tablet</div>

<!-- Mostrar apenas em mobile -->
<div class="show-mobile">Visível apenas em mobile</div>
```

## 🚀 Performance

### Otimizações Implementadas

1. **Will-change** para animações frequentes:
```css
.card-hover {
  will-change: transform;
}
```

2. **Webkit Overflow Scrolling** para iOS:
```css
.carousel-container {
  -webkit-overflow-scrolling: touch;
}
```

3. **Font Smoothing**:
```css
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

4. **Tap Highlight** removido:
```css
html {
  -webkit-tap-highlight-color: transparent;
}
```

## 📊 Testes Recomendados

### Dispositivos Reais

- ✅ iPhone SE (320px)
- ✅ iPhone 12/13/14 (390px)
- ✅ iPad (768px)
- ✅ iPad Pro (1024px)
- ✅ Desktop 1920px

### Ferramentas de Teste

1. **Chrome DevTools** - Device Mode
2. **Firefox Responsive Design Mode**
3. **Safari Web Inspector** - iOS Simulator
4. **BrowserStack** - Testes em dispositivos reais

### Checklist de Teste

- [ ] Todos os textos são legíveis
- [ ] Botões são clicáveis (min 44x44px)
- [ ] Formulários não causam zoom no iOS
- [ ] Navegação funciona em todas as resoluções
- [ ] Imagens se adaptam corretamente
- [ ] Carrosséis rolam suavemente
- [ ] Menu mobile abre/fecha corretamente
- [ ] Footer é legível e usável

## 🛠️ Manutenção

### Adicionando Novos Componentes

Sempre seguir a abordagem mobile-first:

```css
/* 1. Estilos base (mobile) */
.novo-componente {
  padding: 1rem;
  font-size: 1rem;
}

/* 2. Tablet */
@media (min-width: 768px) {
  .novo-componente {
    padding: 1.5rem;
  }
}

/* 3. Desktop */
@media (min-width: 1024px) {
  .novo-componente {
    padding: 2rem;
    font-size: 1.125rem;
  }
}
```

### Debugging

**Mobile:**
```bash
# Chrome Remote Debugging
chrome://inspect

# Safari
Safari > Develop > [Device Name]
```

## 📝 Changelog

### Versão 2.0 - Responsividade Completa

**Adicionado:**
- ✅ CSS completamente reescrito com mobile-first
- ✅ Header responsivo com 3 layouts
- ✅ Footer responsivo com grid adaptativo
- ✅ Menu mobile otimizado para touch
- ✅ Touch targets de 44px mínimo
- ✅ Carrosséis com scroll snap
- ✅ Tipografia responsiva
- ✅ Formulários otimizados para iOS
- ✅ Variáveis CSS para fácil customização
- ✅ Classes utilitárias de visibilidade
- ✅ Suporte a prefers-reduced-motion

**Melhorado:**
- 🔄 Performance em dispositivos móveis
- 🔄 Acessibilidade WCAG 2.1 AA
- 🔄 Navegação touch-friendly
- 🔄 Legibilidade em telas pequenas

## 🎓 Recursos Adicionais

- [MDN: Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [WCAG 2.1 Touch Target Size](https://www.w3.org/WAI/WCAG21/Understanding/target-size.html)
- [Google Web Fundamentals](https://developers.google.com/web/fundamentals/design-and-ux/responsive)
- [A11Y Project](https://www.a11yproject.com/)

---

**Última atualização:** Janeiro 2025
**Autor:** Uroginecologia Em Dia - Equipe de Desenvolvimento
