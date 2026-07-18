# Documentação do Blog Bahdev

Atualizado em: 18/07/2026

## Visão geral

O blog faz parte da mesma aplicação React/Vite do site institucional. Ele usa o design system, a navegação, o rodapé, o botão de WhatsApp e o fluxo de deploy já existentes.

Rotas:

| Rota | Função |
| --- | --- |
| `/blog` | Página inicial do blog, artigo em destaque, busca e filtros por categoria. |
| `/blog/:slug` | Página de leitura de cada artigo. |

## Arquivos principais

| Caminho | Função |
| --- | --- |
| `src/content/blog-posts.json` | Fonte única dos artigos, metadados e conteúdo. |
| `src/lib/blog.ts` | Tipos, ordenação, capas, categorias e artigos relacionados. |
| `src/pages/Blog.tsx` | Listagem, destaque, busca e filtros. |
| `src/pages/BlogPost.tsx` | Leitura, sumário, compartilhamento e relacionados. |
| `src/components/blog/BlogCard.tsx` | Card reutilizável de artigo. |
| `src/components/blog/ArticleContent.tsx` | Renderização segura dos blocos de conteúdo. |
| `src/components/blog/BlogCTA.tsx` | CTA comercial usado nas páginas do blog. |
| `src/components/SEO.tsx` | Metatags, canonical e dados estruturados durante a navegação. |
| `scripts/generate-blog-seo.mjs` | Gera o `sitemap.xml` antes do build. |
| `scripts/generate-blog-pages.mjs` | Gera as páginas HTML estáticas do blog depois do build. |
| `dist/blog/` | Páginas estáticas finais para acesso direto, SEO e compartilhamento. |

## Como publicar um artigo

Adicione um objeto em `src/content/blog-posts.json`. O build ordena os artigos por `publishedAt`, do mais recente para o mais antigo.

Campos obrigatórios:

```json
{
  "slug": "titulo-do-artigo",
  "title": "Título visível",
  "excerpt": "Resumo usado nos cards e no cabeçalho.",
  "category": "Categoria",
  "tags": ["tema", "assunto"],
  "author": "Equipe Bahdev",
  "publishedAt": "2026-07-18",
  "updatedAt": "2026-07-18",
  "readTime": "5 min de leitura",
  "featured": false,
  "cover": "portal",
  "coverAlt": "Descrição acessível da imagem",
  "seoTitle": "Título de SEO | Bahdev",
  "seoDescription": "Descrição de SEO com o assunto principal do artigo.",
  "blocks": []
}
```

Capas disponíveis:

- `omnichannel`
- `portal`
- `treinamento`
- `dashboards`

Para adicionar uma nova capa, importe o asset e inclua a chave em `src/lib/blog.ts`.

## Blocos de conteúdo

Parágrafo:

```json
{ "type": "paragraph", "text": "Texto do parágrafo." }
```

Título de seção:

```json
{ "type": "heading", "id": "titulo-unico", "text": "Título da seção" }
```

Lista:

```json
{ "type": "list", "items": ["Primeiro item", "Segundo item"] }
```

Destaque:

```json
{
  "type": "callout",
  "title": "Ponto importante",
  "text": "Informação que merece destaque."
}
```

Citação:

```json
{ "type": "quote", "text": "Texto destacado como citação." }
```

## Artigo em destaque

Somente um artigo deve usar `"featured": true`. Se nenhum estiver marcado, o artigo mais recente será usado como destaque. Os testes impedem que mais de um artigo seja marcado ao mesmo tempo.

## Busca e categorias

- As categorias são montadas automaticamente a partir dos artigos.
- A busca considera título, resumo, categoria e tags.
- A busca ignora acentos e diferença entre letras maiúsculas e minúsculas.

## SEO e rotas diretas

O comando `npm run build` executa automaticamente as etapas `prebuild` e `postbuild`.

Essa etapa cria:

- `public/sitemap.xml` com as páginas institucionais e os artigos;
- `dist/blog/index.html`;
- um `dist/blog/<slug>/index.html` para cada artigo.

As páginas geradas usam o mesmo JavaScript e CSS da aplicação, incluem o conteúdo completo no HTML e depois carregam a rota React no próprio endereço. Isso mantém o acesso direto e melhora a leitura por buscadores e plataformas de compartilhamento. Cada página inclui título, descrição, canonical, Open Graph, Twitter Card e dados estruturados.

O domínio canônico usado é:

```txt
https://www.bahdev.com.br
```

## Validação antes de publicar

```bash
npm install
npm run test
npm run lint
npm run build
```

Também validar manualmente:

1. Abertura de `/blog` pelo menu desktop e mobile.
2. Busca por texto e filtros de categoria.
3. Acesso direto a pelo menos um `/blog/<slug>`.
4. Sumário, links de compartilhamento e cópia do link.
5. Layout das páginas em desktop e mobile.
6. Presença das novas URLs em `/sitemap.xml`.
