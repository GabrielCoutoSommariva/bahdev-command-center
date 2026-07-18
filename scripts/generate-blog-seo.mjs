import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(root, "public");
const postsPath = path.join(root, "src", "content", "blog-posts.json");
const posts = JSON.parse(fs.readFileSync(postsPath, "utf8"));
const siteUrl = "https://www.bahdev.com.br";

const staticRoutes = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/omnichannel", priority: "0.8", changefreq: "monthly" },
  { path: "/portal", priority: "0.8", changefreq: "monthly" },
  { path: "/treinamento", priority: "0.8", changefreq: "monthly" },
  { path: "/dashboards", priority: "0.6", changefreq: "monthly" },
  { path: "/campanhas", priority: "0.6", changefreq: "monthly" },
  { path: "/blog", priority: "0.9", changefreq: "weekly" },
];

const urls = [
  ...staticRoutes.map(
    (route) => `  <url>
    <loc>${siteUrl}${route.path}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
  ),
  ...posts.map(
    (post) => `  <url>
    <loc>${siteUrl}/blog/${post.slug}</loc>
    <lastmod>${post.updatedAt}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`,
  ),
].join("\n");

fs.writeFileSync(
  path.join(publicDir, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`,
);

console.log(`Sitemap gerado com ${posts.length} artigos.`);
