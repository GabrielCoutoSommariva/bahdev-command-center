import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(root, "dist");
const assetsDir = path.join(distDir, "assets");
const postsPath = path.join(root, "src", "content", "blog-posts.json");
const posts = JSON.parse(fs.readFileSync(postsPath, "utf8"));
const baseHtml = fs.readFileSync(path.join(distDir, "index.html"), "utf8");

const siteUrl = "https://www.bahdev.com.br";
const defaultImage = `${siteUrl}/bahdev-link-preview.png`;

const coverPrefixes = {
  omnichannel: "omnichannel-platform-",
  portal: "farmacias-portal-",
  treinamento: "dashboard-bahdev-treinamento-",
  dashboards: "dashboard-powerbi-",
};

const assetFiles = fs.readdirSync(assetsDir);

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const removeMeta = (html, attribute, value) =>
  html.replace(
    new RegExp(
      `<meta\\s+[^>]*${attribute}=["']${escapeRegExp(value)}["'][^>]*>\\s*`,
      "gi",
    ),
    "",
  );

const renderBlock = (block) => {
  if (block.type === "heading") {
    return `<h2 id="${escapeHtml(block.id)}">${escapeHtml(block.text)}</h2>`;
  }

  if (block.type === "paragraph") {
    return `<p>${escapeHtml(block.text)}</p>`;
  }

  if (block.type === "list") {
    return `<ul>${block.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
  }

  if (block.type === "callout") {
    return `<aside><strong>${escapeHtml(block.title)}</strong><p>${escapeHtml(block.text)}</p></aside>`;
  }

  return `<blockquote><p>${escapeHtml(block.text)}</p></blockquote>`;
};

const getCoverUrl = (cover) => {
  const prefix = coverPrefixes[cover];
  const filename = prefix ? assetFiles.find((file) => file.startsWith(prefix)) : undefined;
  return filename ? `${siteUrl}/assets/${filename}` : defaultImage;
};

const staticStyles = `<style id="bahdev-static-blog-styles">
  .seo-static { max-width: 880px; margin: 0 auto; padding: 56px 24px; font: 16px/1.75 "Plus Jakarta Sans", system-ui, sans-serif; color: #12213f; }
  .seo-static a { color: #1874e8; }
  .seo-static .category { color: #1874e8; font-size: 12px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; }
  .seo-static h1 { margin: 16px 0; font-size: clamp(34px, 6vw, 56px); line-height: 1.08; }
  .seo-static h2 { margin: 42px 0 12px; font-size: 28px; line-height: 1.25; }
  .seo-static p, .seo-static li { color: #5d6677; }
  .seo-static img { width: 100%; margin: 28px 0; border-radius: 18px; }
  .seo-static .post-list { display: grid; gap: 18px; margin-top: 32px; padding: 0; list-style: none; }
  .seo-static .post-list a { display: block; border: 1px solid #e2e6ee; border-radius: 14px; padding: 18px; background: #fff; font-weight: 700; text-decoration: none; }
</style>`;

const createPage = ({ title, description, target, image, imageAlt, schema, body }) => {
  const canonicalUrl = `${siteUrl}${target}`;
  let html = baseHtml.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);

  [
    ["name", "description"],
    ["property", "og:title"],
    ["property", "og:description"],
    ["property", "og:type"],
    ["property", "og:url"],
    ["property", "og:image"],
    ["property", "og:image:secure_url"],
    ["property", "og:image:type"],
    ["property", "og:image:width"],
    ["property", "og:image:height"],
    ["property", "og:image:alt"],
    ["itemprop", "image"],
    ["name", "twitter:title"],
    ["name", "twitter:description"],
    ["name", "twitter:image"],
    ["name", "twitter:image:alt"],
  ].forEach(([attribute, value]) => {
    html = removeMeta(html, attribute, value);
  });

  html = html.replace(/<link\s+[^>]*rel=["']canonical["'][^>]*>\s*/gi, "");

  const meta = `
    <meta name="description" content="${escapeHtml(description)}" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:type" content="${schema["@type"] === "Article" ? "article" : "website"}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:image:secure_url" content="${image}" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:alt" content="${escapeHtml(imageAlt)}" />
    <meta itemprop="image" content="${image}" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${image}" />
    <meta name="twitter:image:alt" content="${escapeHtml(imageAlt)}" />
    <link rel="canonical" href="${canonicalUrl}" />
    <script type="application/ld+json">${JSON.stringify(schema).replaceAll("<", "\\u003c")}</script>
    ${staticStyles}`;

  html = html.replace("</head>", `${meta}\n  </head>`);
  html = html.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
  return html;
};

const blogDir = path.join(distDir, "blog");
fs.mkdirSync(blogDir, { recursive: true });

const blogTitle = "Blog Bahdev | Gestão, tecnologia e operações conectadas";
const blogDescription =
  "Conteúdos sobre gestão de redes, atendimento omnichannel, portais, treinamento e dados para operações com múltiplas unidades.";

const blogBody = `<main class="seo-static">
  <p class="category">Conteúdo Bahdev</p>
  <h1>Ideias para conectar melhor sua rede e sua operação</h1>
  <p>${escapeHtml(blogDescription)}</p>
  <ul class="post-list">
    ${posts.map((post) => `<li><a href="/blog/${escapeHtml(post.slug)}">${escapeHtml(post.title)}</a></li>`).join("")}
  </ul>
</main>`;

fs.writeFileSync(
  path.join(blogDir, "index.html"),
  createPage({
    title: blogTitle,
    description: blogDescription,
    target: "/blog",
    image: defaultImage,
    imageAlt: "Logo da Bahdev",
    schema: {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: blogTitle,
      description: blogDescription,
      url: `${siteUrl}/blog`,
      publisher: { "@type": "Organization", name: "Bahdev" },
    },
    body: blogBody,
  }),
);

for (const post of posts) {
  const target = `/blog/${post.slug}`;
  const image = getCoverUrl(post.cover);
  const articleDir = path.join(blogDir, post.slug);
  fs.mkdirSync(articleDir, { recursive: true });

  const body = `<main class="seo-static">
    <article>
      <p><a href="/blog">← Voltar ao blog</a></p>
      <p class="category">${escapeHtml(post.category)}</p>
      <h1>${escapeHtml(post.title)}</h1>
      <p>${escapeHtml(post.excerpt)}</p>
      <p>Por ${escapeHtml(post.author)} · ${escapeHtml(post.readTime)}</p>
      <img src="${image}" alt="${escapeHtml(post.coverAlt)}" />
      ${post.blocks.map(renderBlock).join("\n")}
    </article>
  </main>`;

  fs.writeFileSync(
    path.join(articleDir, "index.html"),
    createPage({
      title: post.seoTitle,
      description: post.seoDescription,
      target,
      image,
      imageAlt: post.coverAlt,
      schema: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: post.seoDescription,
        mainEntityOfPage: `${siteUrl}${target}`,
        image: [image],
        datePublished: post.publishedAt,
        dateModified: post.updatedAt,
        author: { "@type": "Organization", name: post.author },
        publisher: { "@type": "Organization", name: "Bahdev" },
      },
      body,
    }),
  );
}

console.log(`Páginas estáticas do blog geradas para ${posts.length} artigos.`);
