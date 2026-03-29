# Como publicar o site no GitHub Pages

## Passo 1 — Abrir o terminal no VS Code

Abra a pasta do projeto no VS Code, depois abra o terminal:
**Terminal > New Terminal** (ou `Ctrl + '`)

## Passo 2 — Inicializar o Git (se ainda não fez)

```bash
git init
git remote add origin https://github.com/Lukees404/uroginecologia-em-dia.git
```

Se o remote já existir, esse comando vai dar erro — tudo bem, ignore.

## Passo 3 — Subir os arquivos

```bash
git add .
git commit -m "Site completo com redesign rosa + integrações Brevo e EmailJS"
git branch -M main
git push -u origin main
```

Se pedir login, o VS Code vai abrir uma janela para autenticar com o GitHub.

**Se der erro de "rejected" porque já tem conteúdo no repositório:**
```bash
git push -u origin main --force
```
⚠️ Isso sobrescreve tudo que estava no GitHub. Use só se quiser substituir completamente.

## Passo 4 — Ativar o GitHub Pages

1. Vá para **github.com/Lukees404/uroginecologia-em-dia**
2. Clique em **Settings** (aba no topo)
3. No menu lateral, clique em **Pages**
4. Em **"Source"**, selecione **Deploy from a branch**
5. Em **"Branch"**, selecione **main** e pasta **/ (root)**
6. Clique em **Save**

Aguarde 1-2 minutos. O GitHub vai mostrar o link do site.

## Passo 5 — Verificar o domínio customizado

Seu CNAME já está configurado para `www.uroginecologiaemdia.com.br`.

Para funcionar, seu provedor de domínio precisa ter estes registros DNS:

| Tipo  | Nome | Valor |
|-------|------|-------|
| CNAME | www  | lukees404.github.io |
| A     | @    | 185.199.108.153 |
| A     | @    | 185.199.109.153 |
| A     | @    | 185.199.110.153 |
| A     | @    | 185.199.111.153 |

Se o domínio já estava funcionando antes, esses registros provavelmente já existem.

## Passo 6 — Testar

Acesse:
- https://www.uroginecologiaemdia.com.br (domínio customizado)
- https://lukees404.github.io/uroginecologia-em-dia (URL do GitHub)

### O que testar:
1. **Navegação** — Clique em todas as páginas do menu
2. **Newsletter** — Assine com um email teste e confira no painel do Brevo
3. **Contato** — Envie uma mensagem teste e confira sua caixa de email
4. **Mobile** — Abra no celular e teste o menu hamburguer
5. **Protocolos/Artigos** — Verifique se os cards carregam

## Problemas comuns

**Site mostra 404:**
- Verifique se o `index.html` está na raiz (não dentro de uma subpasta)
- Aguarde alguns minutos — o primeiro deploy demora

**Newsletter não funciona (erro CORS):**
- A API do Brevo deve funcionar direto do navegador
- Verifique no console do navegador (F12 > Console) se tem erros

**Formulário de contato não envia:**
- Confira se o template do EmailJS tem as variáveis corretas:
  `from_name`, `from_email`, `phone`, `subject`, `message`
- Verifique no console se aparece "✅ EmailJS inicializado"
