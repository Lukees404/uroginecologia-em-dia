# GUIA ETAPA 3 — Migração para Netlify + Decap CMS

**Data:** Março 2026  
**Objetivo:** Painel admin para gerenciar conteúdo sem mexer em código  
**Resultado:** Dra. Ana Paula acessa `/admin`, faz login e edita protocolos, artigos, eventos e notícias

---

## Visão Geral do que Foi Feito

### Arquivos criados/modificados:

| Arquivo | O que faz |
|---------|-----------|
| `admin/index.html` | Página do painel admin (carrega o Decap CMS) |
| `admin/config.yml` | Configuração do CMS — define campos editáveis para cada coleção |
| `netlify.toml` | Configurações de deploy, headers e cache do Netlify |
| `assets/images/uploads/.gitkeep` | Pasta para uploads de mídia pelo CMS |
| `assets/data/*.json` | Convertidos para formato `{items: [...]}` (Decap CMS) |
| `assets/js/utils.js` e `.min.js` | `fetchWithCache` agora desembrulha `{items:[]}` automaticamente |
| `assets/js/pages/*.js` e `.min.js` | Todos os fetch diretos tratam o novo formato |
| `index.html` | Adicionado Netlify Identity Widget + redirect pós-login |

---

## PASSO A PASSO — Migração para Netlify

### Passo 1 — Criar conta no Netlify

1. Acesse **https://app.netlify.com/signup**
2. Clique em **"Sign up with GitHub"**
3. Autorize o Netlify a acessar seus repositórios

### Passo 2 — Importar o repositório

1. No painel do Netlify, clique em **"Add new site" → "Import an existing project"**
2. Selecione **GitHub**
3. Escolha o repositório **`Lukees404/uroginecologia-em-dia`**
4. Configurações de build:
   - **Branch to deploy:** `main`
   - **Build command:** *(deixe vazio)*
   - **Publish directory:** `.`
5. Clique em **"Deploy site"**

O Netlify vai fazer o primeiro deploy automaticamente. O site estará disponível em algo como `random-name-12345.netlify.app`.

### Passo 3 — Configurar domínio customizado

1. No painel do Netlify, vá em **Site settings → Domain management**
2. Clique em **"Add custom domain"**
3. Digite: `www.uroginecologiaemdia.com.br`
4. O Netlify vai pedir para verificar o domínio

**Atualizar DNS no seu provedor de domínio:**

| Tipo  | Nome | Valor |
|-------|------|-------|
| CNAME | www  | `[seu-site].netlify.app` |
| A     | @    | 75.2.60.5 |

> **Importante:** Remova os registros DNS antigos do GitHub Pages (185.199.108/109/110/111.153)

5. Após configurar DNS, ative **HTTPS** em **Domain management → HTTPS**
6. O Netlify emite certificado SSL automaticamente (Let's Encrypt)

### Passo 4 — Desativar GitHub Pages

1. Vá em **github.com/Lukees404/uroginecologia-em-dia → Settings → Pages**
2. Em **Source**, selecione **"None"** ou desative
3. O CNAME file no repositório pode ser mantido (o Netlify o ignora)

### Passo 5 — Ativar Netlify Identity (login por email/senha)

1. No painel do Netlify, vá em **Site settings → Identity**
2. Clique em **"Enable Identity"**
3. Em **Registration preferences**, selecione **"Invite only"** (MUITO IMPORTANTE — só convites)
4. Em **External providers**, deixe desabilitado (login será por email/senha)
5. Em **Services → Git Gateway**, clique em **"Enable Git Gateway"**

### Passo 6 — Convidar a Dra. Ana Paula

1. Vá em **Identity** (no menu lateral do site no Netlify)
2. Clique em **"Invite users"**
3. Digite o email da Dra. Ana Paula
4. Ela receberá um email com link para criar senha
5. Após criar a senha, ela acessa: **https://www.uroginecologiaemdia.com.br/admin/**

### Passo 7 — Subir o código atualizado

No VS Code, abra o terminal e execute:

```bash
git add .
git commit -m "Etapa 3: Decap CMS + Netlify Identity para painel admin"
git push origin main
```

O Netlify faz deploy automático a cada push no `main`.

### Passo 8 — Testar

1. Acesse **https://www.uroginecologiaemdia.com.br/admin/**
2. Faça login com email/senha cadastrado
3. Teste editar um protocolo (mude a descrição)
4. Clique em **"Publish"**
5. Aguarde ~30 segundos (Netlify rebuild)
6. Acesse o site e verifique que a mudança apareceu

---

## COMO FUNCIONA O PAINEL ADMIN

### Para a Dra. Ana Paula:

1. Acesse: `https://www.uroginecologiaemdia.com.br/admin/`
2. Faça login com seu email e senha
3. Na barra lateral, escolha:
   - **Protocolos Clínicos** — adicionar/editar/remover protocolos
   - **Artigos Científicos** — gerenciar artigos resumidos
   - **Eventos** — manter agenda de congressos e cursos
   - **Notícias** — publicar novidades
4. Edite os campos desejados
5. Clique em **"Publish"** (ou "Publicar")
6. Pronto! A mudança vai ao ar automaticamente em ~30 segundos

### Campos editáveis por coleção:

**Protocolos:** ID, Título, Arquivo HTML, Categoria (infeccioso/urodinâmico/cirúrgico/funcional), Descrição, Data, Ícone, Tags

**Artigos:** ID, Título, Arquivo HTML, Categoria (pesquisa/estudo/revisão/meta-análise), Descrição, Data, Ícone, Tags

**Eventos:** ID, Título, Descrição, Data, Local, Categoria (congresso/workshop/curso/webinar/simpósio/jornada), Status, Link, Destaque

**Notícias:** ID, Título, Descrição, Categoria (pesquisa/inovação/evento/tratamento/educação/alerta), Data, Link, Destaque

---

## OBSERVAÇÕES TÉCNICAS

### Formato dos JSONs

O Decap CMS salva JSONs no formato `{items: [...]}` em vez de um array puro `[...]`.
Todos os scripts JS foram atualizados para desembrulhar esse formato automaticamente.
Se o array puro for encontrado, o código funciona normalmente (retrocompatível).

### Limitação atual

O CMS gerencia os **dados (JSONs)** — ou seja, os cards de protocolos, artigos, eventos e notícias que aparecem nas páginas de listagem.
As **páginas HTML individuais** de cada protocolo/artigo (ex: `pages/protocolo/infeccao-do-trato-urinario.html`) continuam sendo editadas manualmente no código. Para editar o conteúdo completo dessas páginas pelo CMS, seria necessário uma etapa futura convertendo-as para Markdown com templates.

### Custo

- **Netlify Free Tier:** 100 GB de banda, 300 minutos de build/mês — mais que suficiente
- **Netlify Identity:** Até 5 usuários no plano gratuito
- **Decap CMS:** 100% open source e gratuito

### Segurança

- Login por **"Invite only"** — apenas usuários convidados podem acessar
- Git Gateway — o CMS faz commits no GitHub em nome do usuário
- O painel admin está em `/admin/` — não aparece no menu do site
- Headers de segurança configurados no `netlify.toml`

---

## TROUBLESHOOTING

**Admin mostra tela branca:**
- Verifique se Git Gateway está habilitado (Site settings → Identity → Services)
- Verifique se Identity está habilitado

**Erro "Unable to access identity settings":**
- O Identity não foi habilitado ainda. Siga o Passo 5.

**Erro 404 no /admin/:**
- Verifique se a pasta `admin/` existe no repositório com os arquivos `index.html` e `config.yml`

**Alterações não aparecem no site:**
- O Netlify leva ~30 segundos para rebuild após um publish
- Force refresh com Ctrl+Shift+R ou abra em aba anônima

**Login não funciona / email não chega:**
- Verifique a aba Identity no painel do Netlify
- O email pode estar na pasta de spam
- Reenvie o convite se necessário
