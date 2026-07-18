# Documentacao do Site Bahdev

Atualizado em: 18/07/2026

Este documento descreve a estrutura, as funcionalidades, as integracoes, os arquivos principais e os pontos de manutencao do site Bahdev.

## Visao Geral

O site Bahdev e uma aplicacao React/Vite voltada para apresentacao institucional, divulgacao dos produtos da empresa, comunicacao de cases e captacao de contatos.

Objetivos principais:

- Apresentar a Bahdev como plataforma de gestao centralizada para redes, associacoes, cooperativas e operacoes com multiplas unidades.
- Mostrar os principais modulos do ecossistema Bahdev.
- Direcionar o usuario para o formulario de contato.
- Oferecer contato rapido por WhatsApp.
- Exibir prova social, programas, membros e cases relevantes.
- Funcionar como SPA em ambiente de deploy estatico, especialmente Render.

## Stack Tecnica

Principais tecnologias:

| Area | Tecnologia |
| --- | --- |
| Front-end | React 18 |
| Build | Vite |
| Linguagem | TypeScript |
| Estilo | Tailwind CSS |
| UI | shadcn/ui + Radix UI |
| Animacoes | Framer Motion |
| Icones | lucide-react |
| Roteamento | react-router-dom |
| Validacao | zod |
| Formulario | Formspree via fetch |
| Analytics/Tags | Google Tag Manager |

Scripts disponiveis:

```bash
npm run dev
npm run build
npm run build:dev
npm run lint
npm run preview
npm run test
npm run test:watch
```

## Estrutura Principal

Arquivos e pastas mais importantes:

| Caminho | Funcao |
| --- | --- |
| `index.html` | HTML base, metatags, favicon, preview social e Google Tag Manager. |
| `src/main.tsx` | Ponto de entrada React. |
| `src/App.tsx` | Provider global, BrowserRouter e definicao das rotas. |
| `src/pages/Index.tsx` | Pagina principal do site. |
| `src/pages/*.tsx` | Paginas individuais dos produtos. |
| `src/components/sections/` | Secoes da home e blocos reutilizaveis de landing page. |
| `src/components/ui/` | Componentes base shadcn/ui. |
| `src/assets/` | Imagens, logos e materiais visuais usados pelo site. |
| `public/` | Arquivos publicos, favicon, preview, robots e fallbacks de rotas. |
| `DOCUMENTACAO_SITE.md` | Documentacao funcional e tecnica do site. |

## Rotas

As rotas sao definidas em `src/App.tsx`.

| Rota | Componente | Descricao |
| --- | --- | --- |
| `/` | `Index` | Home principal do site. |
| `/omnichannel` | `Omnichannel` | Pagina do produto Plataforma Omnichannel. |
| `/portal` | `Portal` | Pagina do produto Portal do Associado. |
| `/dashboards` | `Dashboards` | Pagina do produto Dashboards & BI. A rota existe, mas o produto nao aparece mais na grade principal da home. |
| `/campanhas` | `Campanhas` | Pagina do produto de campanhas. |
| `/treinamento` | `Treinamento` | Pagina do produto Treinamento Capacitacao. |
| `/blog` | `Blog` | Listagem de artigos, busca e filtros por categoria. |
| `/blog/:slug` | `BlogPost` | Pagina de leitura de cada artigo do blog. |
| `*` | `NotFound` | Pagina 404 para rotas nao encontradas. |

## Pagina Principal

A home e montada em `src/pages/Index.tsx`.

Ordem atual das secoes:

1. `Navbar`
2. `Hero`
3. `RegionMap`
4. `PainPoints`
5. `Solution`
6. `Products`
7. `HowItWorks`
8. `Benefits`
9. `ForWho`
10. `CaseStudy`
11. `LeadCapture`
12. `FAQ`
13. `MissionVisionValues`
14. `Footer`
15. `WhatsAppButton`
16. `MobileStickyBar`
17. `SolutionsPopup`

Observacoes importantes:

- A secao `Plans` existe no codigo em `src/components/sections/Plans.tsx`, mas nao esta renderizada na home.
- O menu principal nao exibe mais o link `Planos`.
- Os CTAs principais apontam para `/#demo`, que atualmente e o formulario de contato.
- O `id="demo"` fica diretamente no elemento `<form>`, para o scroll cair no card do formulario.

## Navegacao

Arquivo principal: `src/components/sections/Navbar.tsx`

Links do menu atual:

| Label | Destino |
| --- | --- |
| Produtos | `/#produtos` |
| Como funciona | `/#como-funciona` |
| FAQ | `/#faq` |
| WhatsApp | Link externo para WhatsApp |
| Fale conosco | `/#demo` |

Comportamento do botao `Fale conosco`:

- Se o usuario estiver na home, faz scroll suave ate o formulario.
- Se o usuario estiver em uma pagina de produto, navega para `/#demo` e depois tenta posicionar o formulario.
- O comportamento usa `useLocation`, `useNavigate` e `scrollIntoView`.

## Formulario de Contato

Arquivo: `src/components/sections/LeadCapture.tsx`

O formulario atual e um formulario enxuto de contato, nao de demonstracao.

Campos:

| Campo | Obrigatorio | Observacao |
| --- | --- | --- |
| Nome | Sim | Maximo de 100 caracteres. |
| Empresa | Nao | Maximo de 200 caracteres. |
| Contato | Sim | Pode ser WhatsApp ou e-mail. |
| Mensagem | Sim | Maximo de 1000 caracteres. |

Validacao:

- Feita com `zod`.
- Erros aparecem abaixo de cada campo.
- O envio e bloqueado se ja estiver em andamento.

Endpoint Formspree:

```txt
https://formspree.io/f/xykqpdlz
```

Payload enviado:

```json
{
  "_subject": "Novo contato pelo site Bahdev",
  "name": "Nome informado",
  "company": "Empresa informada",
  "contact": "WhatsApp ou e-mail informado",
  "message": "Mensagem formatada com uma linha por campo"
}
```

Formato interno da mensagem:

```txt
Novo contato pelo site Bahdev

Nome: ...
Empresa: ...
Contato: ...
Mensagem: ...
```

Estados do formulario:

| Estado | Comportamento |
| --- | --- |
| Inicial | Exibe campos e botao `Enviar mensagem`. |
| Enviando | Botao mostra `Enviando...` e fica desabilitado. |
| Sucesso | Exibe mensagem `Tudo certo! Recebemos sua mensagem...`. |
| Erro | Exibe `Nao foi possivel enviar agora...`. |

## WhatsApp

O site possui diferentes pontos de contato por WhatsApp.

Numero usado:

```txt
5551985901584
```

Locais principais:

| Arquivo | Uso |
| --- | --- |
| `src/components/sections/Navbar.tsx` | Link `WhatsApp` no topo. |
| `src/components/sections/Hero.tsx` | Link textual `Chame no WhatsApp`. |
| `src/components/sections/Footer.tsx` | Link de WhatsApp no rodape. |
| `src/components/WhatsAppButton.tsx` | Botao flutuante. |

## Blog

O blog foi migrado do projeto `bahdev-command-center-blog` e integrado ao site principal.

Rotas:

| Rota | Uso |
| --- | --- |
| `/blog` | Listagem de conteudos, artigo em destaque, busca e filtros. |
| `/blog/:slug` | Pagina individual de artigo com sumario, compartilhamento e relacionados. |

Arquivos principais:

| Caminho | Funcao |
| --- | --- |
| `src/content/blog-posts.json` | Fonte dos artigos. |
| `src/lib/blog.ts` | Tipos, categorias, ordenacao, capas e relacionados. |
| `src/pages/Blog.tsx` | Pagina inicial do blog. |
| `src/pages/BlogPost.tsx` | Pagina de leitura. |
| `src/components/blog/BlogCard.tsx` | Card de artigo. |
| `src/components/blog/ArticleContent.tsx` | Renderizacao dos blocos do artigo. |
| `src/components/blog/BlogCTA.tsx` | CTA comercial do blog. |
| `src/components/SEO.tsx` | Metatags, canonical e dados estruturados por rota. |
| `scripts/generate-blog-seo.mjs` | Gera `public/sitemap.xml`. |
| `scripts/generate-blog-pages.mjs` | Gera HTML estatico em `dist/blog`. |

O build executa `generate:blog` antes do Vite e gera paginas estaticas do blog depois do build. A documentacao detalhada esta em `DOCUMENTACAO_BLOG.md`.

## Produtos

Produtos destacados na home em `src/components/sections/Products.tsx`:

| Produto | Rota | Imagem |
| --- | --- | --- |
| Plataforma Omnichannel | `/omnichannel` | `src/assets/omnichannel-platform.png` |
| Portal do Associado | `/portal` | `src/assets/farmacias-portal.png` |
| Treinamento Capacitacao | `/treinamento` | `src/assets/dashboard-bahdev-treinamento.png` |

Observacoes:

- `Dashboards & BI` foi removido da grade principal da home.
- A rota `/dashboards` continua existindo.
- Todos os cards da home possuem imagem no topo, badge, descricao e link `Saiba mais`.

## Paginas de Produto

### Plataforma Omnichannel

Arquivo: `src/pages/Omnichannel.tsx`

Objetivo:

- Apresentar atendimento unificado para WhatsApp, chat, e-mail e redes sociais.
- Destacar caixa unificada, equipes, bots, filtros, disparos e metricas.

### Portal do Associado

Arquivo: `src/pages/Portal.tsx`

Objetivo:

- Apresentar portal para comunicados, campanhas, pedidos, materiais e servicos.
- Destacar acesso por perfil, biblioteca, area financeira, mobile-first e historico.

### Treinamento Capacitacao

Arquivo: `src/pages/Treinamento.tsx`

Objetivo:

- Apresentar modulo para cursos, trilhas, alunos, equipes, certificados e indicadores.
- Usar imagem principal `dashboard-bahdev-treinamento.png`.
- Mostrar visao do produto, gestao de cursos, experiencia do aluno e beneficios.

### Dashboards & BI

Arquivo: `src/pages/Dashboards.tsx`

Objetivo:

- Rota ainda disponivel para pagina de dashboards.
- Nao esta destacada atualmente na home.

### Campanhas

Arquivo: `src/pages/Campanhas.tsx`

Objetivo:

- Rota ainda disponivel para pagina de campanhas.

## Case de Sucesso

Arquivo: `src/components/sections/CaseStudy.tsx`

Cliente apresentado:

```txt
Farmacias Associadas
```

Elementos principais:

- Secao de visao executiva com imagem do diretor.
- Secao escura com card do cliente.
- Destaques de valor.
- Entregas em lista estatica, sem carrossel.
- CTA `Fale conosco`.

Assets usados:

| Asset | Uso |
| --- | --- |
| `src/assets/farmacia-diretor-executivo.jpg` | Depoimento/visao executiva. |
| `src/assets/farmacias-logo.png` | Logo do cliente. |
| `src/assets/farmacias-portal.png` | Novo Portal do Associado. |
| `src/assets/farmacias-evento.png` | Comercial direto/campanhas. |
| `src/assets/farmacias-mapa.png` | Mapa da rede. |

## Carrossel de Destaques

Arquivo: `src/components/sections/RegionMap.tsx`

Slides atuais:

| Slide | Asset |
| --- | --- |
| A Bahdev agora tambem faz parte do Instituto Caldeira | `src/assets/banner-caldeira.png` |
| Onde a Bahdev ja chegou | `src/assets/bahdev_region_map.png` |
| Bahdev no estande em Gramado | `src/assets/bahdev-gramado-stand.jpg` |

Comportamento:

- Usa componente `Carousel` de `src/components/ui/carousel.tsx`.
- Loop ativo.
- Autoplay a cada 4 segundos.
- Indicadores clicaveis abaixo do carrossel.

## Rodape

Arquivo: `src/components/sections/Footer.tsx`

Informacoes exibidas:

- CTA final `Quer falar com a Bahdev?`.
- E-mail: `atendimento@bahdev.com.br`.
- Telefone: `(51) 98590-1584`.
- Endereco: `Tv. Sao Jose, 455, Navegantes, Porto Alegre - RS, 90240-200`.
- Links de plataforma, empresa e contato.
- Programas e membros.

Programas que participamos:

| Nome | Asset |
| --- | --- |
| Fecomercio RS e Senac | `src/assets/programa-fecomercio-senac.png` |
| IAB | `src/assets/programa-iab.png` |

Membros:

| Nome | Asset | Link |
| --- | --- | --- |
| Founders Club Prime | `src/assets/programa-founders-club-prime.svg` | Sem link externo. |
| Membro Caldeira | `src/assets/programa-membro-caldeira.png` | `https://institutocaldeira.org.br` |

Observacao:

- O logo `startuplab-nom.png` foi removido do rodape e o asset foi excluido do projeto.

## SEO, Preview e Favicon

Arquivo: `index.html`

Configuracoes atuais:

| Item | Valor |
| --- | --- |
| Idioma | `pt-BR` |
| Title | `Bahdev` |
| Description | `Centralize a gestao e a comunicacao da sua rede em um unico portal com a Bahdev.` |
| Favicon | `/favicon.ico?v=3` |
| Apple touch icon | `/bahdev-link-preview.png` |
| Open Graph image | `https://bahdev-command-center.onrender.com/bahdev-link-preview.png` |
| Twitter card | `summary_large_image` |

Arquivos publicos importantes:

| Arquivo | Uso |
| --- | --- |
| `public/favicon.ico` | Favicon. |
| `public/bahdev-link-preview.png` | Preview de compartilhamento. |
| `public/robots.txt` | Regras basicas para robos. |
| `public/og-image.png` | Imagem publica adicional existente no projeto. |

## Google Tag Manager

O GTM esta instalado diretamente em `index.html`.

ID do container:

```txt
GTM-NFST7DB
```

Instalacao:

- Script principal dentro do `<head>`.
- `noscript` logo apos a abertura do `<body>`.

Como validar no site publicado:

1. Abrir o site publicado.
2. Usar `Exibir codigo-fonte da pagina`.
3. Procurar por `GTM-NFST7DB`.
4. Opcionalmente usar o modo `Preview` no Google Tag Manager.

## SPA, Rotas Diretas e Deploy

O site usa React Router com `BrowserRouter`, entao rotas como `/portal` e `/treinamento` precisam de fallback para `index.html` no servidor.

Arquivos criados para fallback/compatibilidade:

| Arquivo | Uso |
| --- | --- |
| `public/_redirects` | Fallback SPA para hosts que suportam `_redirects`. |
| `public/.htaccess` | Fallback para Apache. |
| `vercel.json` | Rewrite SPA para Vercel. |
| `static.json` | Configuracao de rotas para hosts que suportam esse formato. |
| `public/portal/index.html` | Fallback fisico para `/portal`. |
| `public/omnichannel/index.html` | Fallback fisico para `/omnichannel`. |
| `public/treinamento/index.html` | Fallback fisico para `/treinamento`. |
| `public/dashboards/index.html` | Fallback fisico para `/dashboards`. |
| `public/campanhas/index.html` | Fallback fisico para `/campanhas`. |

Componente relacionado:

```txt
src/components/SpaRedirectHandler.tsx
```

Esse componente le uma chave de `sessionStorage` e navega para a rota real quando um fallback fisico e usado.

Configuracao recomendada na Render para Static Site:

```txt
Source: /*
Destination: /index.html
Action: Rewrite
```

Comandos comuns de deploy local:

```bash
npm install
npm run build
```

Diretorio gerado:

```txt
dist/
```

## Scroll e Ancoras

Arquivo: `src/components/ScrollToTop.tsx`

Comportamento:

- Ao trocar de rota sem hash, volta ao topo.
- Ao acessar uma rota com hash, tenta encontrar o elemento pelo `id`.
- Repete o scroll em `150ms` e `500ms` para reduzir erro causado por carregamento de imagens acima do alvo.

Ancora principal de contato:

```txt
#demo
```

Local atual da ancora:

```tsx
<form id="demo" ...>
```

Motivo:

- Garantir que os botoes `Fale conosco` carreguem diretamente no card do formulario.
- Evitar que o scroll pare antes do formulario ou em secoes proximas.

## Pop-up de Solucoes

Arquivo: `src/components/SolutionsPopup.tsx`

Funcao:

- Exibir chamada sobre outras solucoes Bahdev.
- Direcionar usuarios para produtos/modulos.

Renderizacao:

- Incluido na home em `src/pages/Index.tsx`.

## Componentes Fixos

| Componente | Arquivo | Funcao |
| --- | --- | --- |
| Navbar | `src/components/sections/Navbar.tsx` | Menu fixo no topo. |
| WhatsAppButton | `src/components/WhatsAppButton.tsx` | Botao flutuante de WhatsApp. |
| MobileStickyBar | `src/components/MobileStickyBar.tsx` | CTA fixo inferior no mobile. |
| SolutionsPopup | `src/components/SolutionsPopup.tsx` | Popup lateral/informativo de solucoes. |

## Design System

Base visual:

- Tailwind CSS.
- shadcn/ui.
- Radix UI.
- Fonte `Plus Jakarta Sans` via `@fontsource/plus-jakarta-sans`.
- Icones `lucide-react`.
- Animacoes com `framer-motion`.

Arquivos relacionados:

| Arquivo | Funcao |
| --- | --- |
| `tailwind.config.ts` | Tokens, cores, animacoes e configuracao Tailwind. |
| `src/index.css` | Estilos globais e variaveis CSS. |
| `src/components/sections/SectionWrapper.tsx` | Wrapper padrao de secao e blocos animados. |
| `src/components/ui/*` | Componentes base shadcn/ui. |

Padroes de layout:

- Secoes usam `SectionWrapper` com `py-14 md:py-20` por padrao.
- Container maximo em geral: `max-w-6xl`.
- Cards usam `bg-card`, `shadow-card`, bordas arredondadas e `border-border`.
- CTAs principais usam `Button variant="hero"`.

## Assets Principais

| Asset | Uso |
| --- | --- |
| `bahdev-logo-blue.png` | Logo no topo. |
| `bahdev-link-preview.png` | Preview social e apple touch icon. |
| `favicon.ico` | Favicon. |
| `omnichannel-platform.png` | Produto Omnichannel. |
| `farmacias-portal.png` | Produto Portal do Associado e case. |
| `dashboard-bahdev-treinamento.png` | Produto Treinamento Capacitacao. |
| `banner-caldeira.png` | Slide Instituto Caldeira. |
| `bahdev_region_map.png` | Slide de presenca/regioes. |
| `bahdev-gramado-stand.jpg` | Slide Gramado. |
| `farmacia-diretor-executivo.jpg` | Visao executiva do case. |
| `farmacias-logo.png` | Logo Farmacias Associadas. |
| `farmacias-evento.png` | Entrega Comercial direto no case. |
| `farmacias-mapa.png` | Entrega Mapa da rede no case. |
| `programa-fecomercio-senac.png` | Rodape, programas. |
| `programa-iab.png` | Rodape, programas. |
| `programa-founders-club-prime.svg` | Rodape, membros. |
| `programa-membro-caldeira.png` | Rodape, membros. |

## Contatos e Dados Institucionais

| Item | Valor |
| --- | --- |
| E-mail | `atendimento@bahdev.com.br` |
| Telefone/WhatsApp | `(51) 98590-1584` |
| WhatsApp internacional | `5551985901584` |
| Endereco | `Tv. Sao Jose, 455, Navegantes, Porto Alegre - RS, 90240-200` |
| Link Caldeira | `https://institutocaldeira.org.br` |

## Repositorio e Git

Repositorio remoto configurado:

```txt
https://github.com/GabrielCoutoSommariva/bahdev-command-center.git
```

Branch usada:

```txt
main
```

Fluxo recomendado:

```bash
git status --short
git diff --stat
npm run build
git add <arquivos>
git commit -m "mensagem objetiva"
git push origin main
```

## Validacao

Antes de publicar mudancas relevantes:

1. Rodar `npm run build`.
2. Verificar se o Formspree continua enviando para `https://formspree.io/f/xykqpdlz`.
3. Confirmar se os CTAs `Fale conosco` levam ao formulario.
4. Confirmar se rotas diretas carregam no ambiente publicado.
5. Confirmar se o GTM aparece no codigo-fonte publicado.

Comando principal:

```bash
npm run build
```

Observacoes conhecidas:

- O build passa com aviso de chunks acima de 500 kB.
- O build pode avisar que o banco de dados do Browserslist esta desatualizado.
- Esses avisos nao bloqueiam a geracao do site.

## Pontos de Manutencao Frequente

### Alterar o endpoint do Formspree

Arquivo:

```txt
src/components/sections/LeadCapture.tsx
```

Constante:

```ts
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xykqpdlz";
```

### Alterar telefone de WhatsApp

Arquivos mais provaveis:

```txt
src/components/sections/Navbar.tsx
src/components/sections/Hero.tsx
src/components/sections/Footer.tsx
src/components/WhatsAppButton.tsx
```

### Alterar produtos da home

Arquivo:

```txt
src/components/sections/Products.tsx
```

Alterar array:

```ts
const products: Product[] = [...]
```

### Alterar ordem das secoes da home

Arquivo:

```txt
src/pages/Index.tsx
```

### Alterar logos do rodape

Arquivo:

```txt
src/components/sections/Footer.tsx
```

Alterar array:

```ts
const programGroups = [...]
```

### Alterar metatags, favicon ou GTM

Arquivo:

```txt
index.html
```

### Alterar fallbacks de rotas

Arquivos:

```txt
public/_redirects
public/.htaccess
vercel.json
static.json
public/<rota>/index.html
```

## Estado Atual do Site

Resumo do estado atual:

- Home ativa com foco em produtos, case, contato e informacoes institucionais.
- Secao de planos escondida da home.
- Formulario de contato simplificado e integrado ao Formspree.
- CTAs principais padronizados como `Fale conosco`.
- Produto `Treinamento Capacitacao` ativo na home e na rota `/treinamento`.
- Produto `Dashboards & BI` nao aparece na grade principal, mas sua rota ainda existe.
- Blog ativo nas rotas `/blog` e `/blog/:slug`, com sitemap e paginas estaticas geradas no build.
- GTM instalado com ID `GTM-NFST7DB`.
- Rodape com Fecomercio/Senac, IAB, Founders Club Prime e Membro Caldeira.
- Render deve usar rewrite SPA `/* -> /index.html` para rotas diretas.
