# Documentação do Blog Bahdev

Atualizado em: 18/07/2026

## Visão geral

O blog e seu painel administrativo fazem parte da aplicação React/Vite do site institucional. O conteúdo publicado fica no Supabase, as imagens ficam no Storage e o site mantém uma cópia local inicial para implantação e contingência.

Rotas públicas:

| Rota | Função |
| --- | --- |
| `/blog` | Destaque, busca, filtros e listagem das matérias. |
| `/blog/:slug` | Página de leitura da matéria. |

Rotas administrativas:

| Rota | Função |
| --- | --- |
| `/admin/blog/login` | Login exclusivo do painel. |
| `/admin/blog` | Visão geral e lista de matérias. |
| `/admin/blog/novo` | Criação de uma matéria. |
| `/admin/blog/editar/:id` | Edição de uma matéria existente. |

## O que o painel permite fazer

- criar, editar, visualizar e excluir matérias;
- salvar como rascunho;
- publicar, despublicar ou agendar uma publicação;
- definir a matéria em destaque;
- pesquisar e filtrar conteúdos;
- organizar texto em parágrafos, títulos, listas, destaques e citações;
- preencher título, resumo, categoria, autor e tags;
- configurar título e descrição para SEO;
- usar capas existentes ou enviar uma imagem própria;
- duplicar uma matéria;
- importar as cinco matérias iniciais do blog.

## Segurança do painel

O endereço do painel não é exibido no menu público, mas a segurança não depende de esconder a URL.

O acesso possui quatro camadas:

1. login por e-mail e senha;
2. usuário previamente criado no Supabase, sem cadastro público no site;
3. autorização manual na tabela `blog_admins`;
4. autenticação obrigatória em duas etapas por aplicativo TOTP.

A sessão fica restrita à aba do navegador e é encerrada depois de 30 minutos sem atividade.

As políticas de Row Level Security exigem simultaneamente o usuário autorizado e uma sessão no nível `aal2`. Isso impede que uma pessoa com apenas a senha use diretamente a API para ler rascunhos, alterar matérias ou enviar imagens.

Somente uma conta deve ser incluída em `blog_admins` para manter o painel exclusivo. A chave `service_role` nunca deve ser colocada no front-end, no Git ou em variáveis iniciadas com `VITE_`.

## Primeiro acesso

A ativação de produção é detalhada em `CONFIGURACAO_ADMIN_BLOG.md`.

Depois da configuração:

1. acesse `https://www.bahdev.com.br/admin/blog/login`;
2. informe o e-mail e a senha criados no Supabase;
3. no primeiro acesso, leia o QR Code com Google Authenticator, Microsoft Authenticator, Authy ou outro aplicativo TOTP;
4. informe o código de seis dígitos;
5. no painel vazio, clique em **Importar matérias iniciais**.

Nos próximos acessos, a senha será seguida pelo código temporário do aplicativo autenticador.

## Como publicar uma nova matéria

1. Entre no painel e clique em **Nova matéria**.
2. Preencha título, endereço, resumo, categoria, autor e tags.
3. Monte o corpo da matéria adicionando e reorganizando os blocos.
4. Escolha uma capa existente ou envie uma imagem de até 5 MB.
5. Informe um texto alternativo que descreva a imagem.
6. Revise o título e a descrição de SEO.
7. Use **Visualizar** para conferir a matéria.
8. Clique em **Salvar rascunho**, **Publicar agora** ou escolha uma data futura para agendar.

Uma matéria agendada é armazenada como publicada, mas não fica visível antes de `published_at`.

## Atualização do site público

O conteúdo público é consultado diretamente no Supabase durante a navegação. Por isso, uma nova publicação aparece sem depender de editar arquivos manualmente.

Ao publicar, despublicar, excluir ou importar conteúdo, o painel também chama uma Edge Function protegida. Essa função solicita um novo deploy na Render para atualizar:

- o HTML estático de cada matéria;
- o `sitemap.xml`;
- metatags de compartilhamento;
- dados estruturados para mecanismos de busca.

Se o hook da Render ainda não estiver configurado, a alteração continuará aparecendo no blog dinâmico, mas o HTML estático e o sitemap só serão atualizados no próximo deploy normal.

## Fontes de conteúdo

| Fonte | Uso |
| --- | --- |
| Tabela `public.blog_posts` | Fonte principal do painel e do blog publicado. |
| Bucket `blog-images` | Imagens enviadas pelo painel. |
| `src/content/blog-posts.json` | Matérias iniciais e contingência antes da ativação do banco. |

Depois que as matérias iniciais forem importadas, as alterações editoriais devem ser feitas pelo painel, não diretamente no JSON.

## Arquivos principais

| Caminho | Função |
| --- | --- |
| `src/pages/Blog.tsx` | Página inicial pública do blog. |
| `src/pages/BlogPost.tsx` | Página pública de leitura. |
| `src/hooks/use-blog-posts.ts` | Consulta de matérias publicadas. |
| `src/lib/blog.ts` | Tipos, capas, ordenação e conteúdos relacionados. |
| `src/lib/blog-repository.ts` | Leitura, gravação, upload e solicitação de rebuild. |
| `src/pages/admin/AdminBlogDashboard.tsx` | Gestão e listagem das matérias. |
| `src/pages/admin/AdminBlogEditor.tsx` | Editor administrativo. |
| `src/components/admin/BlogBlockEditor.tsx` | Editor de blocos. |
| `src/components/admin/AdminProtectedRoute.tsx` | Autorização e exigência de MFA. |
| `src/hooks/use-admin-access.ts` | Estado da sessão, autorização e nível AAL. |
| `supabase/migrations/20260718183000_blog_admin.sql` | Tabelas, funções, RLS e bucket de imagens. |
| `supabase/functions/trigger-blog-deploy/index.ts` | Rebuild seguro na Render. |
| `scripts/load-blog-posts.mjs` | Carregamento do conteúdo no build. |
| `scripts/generate-blog-seo.mjs` | Geração do sitemap. |
| `scripts/generate-blog-pages.mjs` | Geração do HTML estático. |

## Modelo da matéria

Principais campos de `blog_posts`:

| Campo | Uso |
| --- | --- |
| `slug` | Parte final da URL, única e sem espaços. |
| `title` e `excerpt` | Título e resumo público. |
| `category` e `tags` | Organização e busca. |
| `content` | Array JSON com os blocos da matéria. |
| `cover_key` ou `cover_url` | Capa interna ou imagem enviada. |
| `seo_title` e `seo_description` | Metadados para busca e compartilhamento. |
| `status` | `draft` ou `published`. |
| `published_at` | Data de publicação ou agendamento. |
| `created_by` e `updated_by` | Auditoria do usuário responsável. |

## Blocos de conteúdo

O editor grava os seguintes formatos:

```json
{ "type": "paragraph", "text": "Texto do parágrafo." }
```

```json
{ "type": "heading", "id": "titulo-unico", "text": "Título da seção" }
```

```json
{ "type": "list", "items": ["Primeiro item", "Segundo item"] }
```

```json
{ "type": "callout", "title": "Ponto importante", "text": "Texto em destaque." }
```

```json
{ "type": "quote", "text": "Texto apresentado como citação." }
```

## SEO e build

`npm run build` executa automaticamente:

1. leitura das matérias publicadas no Supabase, com fallback local;
2. geração de `public/sitemap.xml`;
3. build da aplicação;
4. geração de `dist/blog/index.html` e `dist/blog/<slug>/index.html`.

Cada página estática recebe canonical, Open Graph, Twitter Card, conteúdo inicial e dados estruturados. O domínio canônico é `https://www.bahdev.com.br`.

## Validação

```bash
npm ci
npx tsc -b --pretty false
npm run lint
npm run test
npm run build
```

Verificações manuais recomendadas:

1. login com conta autorizada e bloqueio de outra conta;
2. configuração e verificação do código TOTP;
3. criação, edição, preview, agendamento e despublicação;
4. upload de JPEG, PNG, WebP ou AVIF até 5 MB;
5. busca e filtros na página `/blog`;
6. abertura direta de `/blog/<slug>` e `/admin/blog/login`;
7. atualização do sitemap depois de um deploy.
