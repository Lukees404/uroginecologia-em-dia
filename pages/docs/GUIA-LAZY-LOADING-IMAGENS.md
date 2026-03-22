# Guia de Lazy Loading para Imagens

## 📊 Status Atual do Projeto

**Data:** 2025-11-07
**Status:** ✅ 100% das imagens otimizadas

### Resumo
- **Imagens ativas no projeto:** 0
- **Imagens em exemplos comentados:** 1 (com lazy loading adicionado)
- **Ícones SVG (Feather):** 96 (não precisam lazy loading)

---

## 🎯 Como Adicionar Imagens com Lazy Loading

### 1. Formato Básico (Recomendado)

```html
<!-- ✅ CORRETO: Imagem com lazy loading -->
<img
  src="caminho/para/imagem.jpg"
  alt="Descrição clara e descritiva da imagem"
  loading="lazy"
  class="w-full h-full object-cover">
```

### 2. Imagens Críticas (Above the Fold)

Para imagens que aparecem imediatamente na tela (logo, hero banner), use `loading="eager"` ou omita o atributo:

```html
<!-- ✅ CORRETO: Imagem crítica sem lazy loading -->
<img
  src="logo.svg"
  alt="Logo Uroginecologia em Dia"
  loading="eager"
  class="w-24 h-24">

<!-- OU simplesmente omita o atributo loading -->
<img
  src="hero-banner.jpg"
  alt="Banner principal"
  class="w-full">
```

### 3. Imagens Responsivas com Lazy Loading

```html
<!-- ✅ CORRETO: Picture tag com lazy loading -->
<picture>
  <source srcset="imagem-large.webp" media="(min-width: 1024px)">
  <source srcset="imagem-medium.webp" media="(min-width: 768px)">
  <img
    src="imagem-small.webp"
    alt="Descrição da imagem"
    loading="lazy"
    class="w-full h-auto">
</picture>
```

---

## ✅ Checklist de Otimização

Ao adicionar uma imagem, verifique:

- [ ] **Atributo `alt` presente e descritivo**
  - ❌ Ruim: `alt=""`
  - ❌ Ruim: `alt="imagem"`
  - ✅ Bom: `alt="Dra. Ana Paula de Oliveira Pinto, ginecologista especializada em uroginecologia"`

- [ ] **Lazy loading apropriado**
  - ✅ `loading="lazy"` para imagens abaixo da dobra
  - ✅ `loading="eager"` ou sem atributo para imagens críticas (logo, hero)

- [ ] **Formato otimizado**
  - ✅ WebP para fotos (melhor compressão)
  - ✅ SVG para ícones e ilustrações
  - ✅ PNG apenas para transparência necessária

- [ ] **Dimensões apropriadas**
  - ✅ Imagens não maiores que 1920px de largura
  - ✅ Compressão adequada (70-85% qualidade para JPEG/WebP)

- [ ] **Atributos width e height (opcional mas recomendado)**
  ```html
  <img
    src="foto.jpg"
    alt="Descrição"
    width="800"
    height="600"
    loading="lazy">
  ```
  - Previne layout shift (CLS)
  - Melhora Core Web Vitals

---

## 🚫 O Que NÃO Usar Lazy Loading

### Ícones SVG Inline (Feather Icons)

❌ **NÃO adicione lazy loading em ícones Feather:**

```html
<!-- ❌ ERRADO: Ícone não precisa lazy loading -->
<i data-feather="mail" loading="lazy"></i>

<!-- ✅ CORRETO: Ícone sem lazy loading -->
<i data-feather="mail"></i>
```

**Por quê?**
- Ícones Feather são SVG inline carregados via JavaScript
- São pequenos e não impactam performance
- Lazy loading não funciona em tags `<i>` ou SVG inline

### Logos e Imagens Above the Fold

❌ **NÃO use lazy loading em:**
- Logo do site (header)
- Imagem principal (hero banner)
- Primeiro elemento visual da página

---

## 📐 Casos de Uso no Projeto

### 1. Foto de Profissional (pages/sobre.html)

**Localização:** `pages/sobre.html:102`

```html
<!-- EXEMPLO atual no código (comentado): -->
<img
  src="/caminho/para/foto.jpg"
  alt="Dra. Ana Paula de Oliveira Pinto"
  class="w-full h-full object-cover"
  loading="lazy">
```

**Status:** ✅ Já otimizado com lazy loading

**Quando usar:** Quando adicionar foto real do profissional, descomentar esta linha.

### 2. Imagens de Protocolos (futuro)

Se adicionar imagens ilustrativas nos protocolos:

```html
<img
  src="/assets/images/protocolo-iue.jpg"
  alt="Fluxograma de tratamento de Incontinência Urinária de Esforço"
  loading="lazy"
  class="w-full max-w-2xl mx-auto">
```

### 3. Imagens de Artigos (futuro)

Para thumbnails de artigos:

```html
<img
  src="/assets/images/artigo-thumb-1.webp"
  alt="Thumbnail do artigo sobre cirurgias de incontinência urinária"
  loading="lazy"
  class="w-full h-48 object-cover rounded-lg">
```

---

## 🔍 Como Verificar Lazy Loading

### Browser DevTools

1. Abra Chrome DevTools (F12)
2. Vá para a aba **Network**
3. Filtre por **Img**
4. Role a página e observe:
   - ✅ Imagens com `loading="lazy"` só carregam quando entram no viewport
   - ✅ Imagens sem lazy loading carregam imediatamente

### Lighthouse Audit

1. DevTools → Lighthouse
2. Rode audit de Performance
3. Verifique:
   - ✅ "Defer offscreen images" deve estar verde
   - ✅ LCP (Largest Contentful Paint) < 2.5s

---

## 📊 Benefícios do Lazy Loading

### Performance
- ⚡ **Carregamento inicial mais rápido**
  - Menos dados transferidos na carga inicial
  - Melhora TTI (Time to Interactive)

- 📱 **Economia de dados**
  - Especialmente importante em conexões móveis
  - Imagens só carregam se usuário rolar até elas

### SEO
- 🔍 **Core Web Vitals melhores**
  - LCP (Largest Contentful Paint)
  - CLS (Cumulative Layout Shift)
  - Ranking melhor no Google

### Experiência do Usuário
- ✨ **Página responde mais rápido**
- 🔋 **Menor consumo de bateria em mobile**
- 💾 **Menos uso de memória**

---

## 🛠️ Ferramentas Recomendadas

### Otimização de Imagens

1. **TinyPNG** - https://tinypng.com/
   - Compressão lossless de PNG/JPEG
   - Reduz até 70% do tamanho

2. **Squoosh** - https://squoosh.app/
   - Conversor WebP/AVIF
   - Comparação lado a lado

3. **ImageOptim** (Mac) - https://imageoptim.com/
   - Batch processing
   - Remove metadados

### Validação

1. **Lighthouse** (Chrome DevTools)
   - Audit completo de performance
   - Recomendações específicas

2. **PageSpeed Insights** - https://pagespeed.web.dev/
   - Análise real de performance
   - Sugestões de otimização

---

## 📋 Exemplo Completo: Galeria de Imagens

```html
<!-- Galeria de fotos da equipe (futuro) -->
<section class="grid grid-cols-1 md:grid-cols-3 gap-6">

  <!-- Imagem 1 (primeira, pode não ter lazy se above fold) -->
  <div class="card">
    <img
      src="/assets/images/equipe-1.webp"
      alt="Dr. João Silva, urologista especializado em cirurgias minimamente invasivas"
      width="400"
      height="400"
      class="w-full h-64 object-cover">
  </div>

  <!-- Imagens 2+ (com lazy loading) -->
  <div class="card">
    <img
      src="/assets/images/equipe-2.webp"
      alt="Dra. Maria Santos, fisioterapeuta pélvica com 15 anos de experiência"
      width="400"
      height="400"
      loading="lazy"
      class="w-full h-64 object-cover">
  </div>

  <div class="card">
    <img
      src="/assets/images/equipe-3.webp"
      alt="Dra. Ana Paula, coordenadora científica do portal"
      width="400"
      height="400"
      loading="lazy"
      class="w-full h-64 object-cover">
  </div>

</section>
```

---

## 🔗 Referências

- [MDN - Lazy Loading](https://developer.mozilla.org/en-US/docs/Web/Performance/Lazy_loading)
- [Web.dev - Browser-level lazy loading](https://web.dev/browser-level-image-lazy-loading/)
- [Can I Use - Loading attribute](https://caniuse.com/loading-lazy-attr)

---

## ✅ Status de Implementação

| Página | Imagens | Lazy Loading | Status |
|--------|---------|--------------|--------|
| index.html | 0 | N/A | ✅ N/A |
| pages/sobre.html | 1 (comentada) | ✅ Sim | ✅ OK |
| pages/protocolos.html | 0 | N/A | ✅ N/A |
| pages/artigos.html | 0 | N/A | ✅ N/A |
| pages/eventos.html | 0 | N/A | ✅ N/A |
| pages/contato.html | 0 | N/A | ✅ N/A |

**Última atualização:** 2025-11-07
**Status geral:** ✅ 100% otimizado
