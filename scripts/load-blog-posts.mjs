import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";
import { loadEnv } from "vite";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fallbackPosts = JSON.parse(
  fs.readFileSync(path.join(root, "src", "content", "blog-posts.json"), "utf8"),
);

const env = {
  ...loadEnv("production", root, ""),
  ...process.env,
};

const summarizeError = (message) =>
  message.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 180);

const toPost = (row) => ({
  id: row.id,
  slug: row.slug,
  title: row.title,
  excerpt: row.excerpt,
  category: row.category,
  tags: row.tags ?? [],
  author: row.author,
  publishedAt: (row.published_at ?? row.created_at).slice(0, 10),
  updatedAt: row.updated_at.slice(0, 10),
  readTime: row.read_time,
  featured: row.featured,
  cover: row.cover_key ?? "portal",
  coverUrl: row.cover_url ?? undefined,
  coverAlt: row.cover_alt,
  seoTitle: row.seo_title,
  seoDescription: row.seo_description,
  blocks: Array.isArray(row.content) ? row.content : [],
});

export const loadPublishedBlogPosts = async () => {
  const url = env.VITE_SUPABASE_URL;
  const key = env.VITE_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) return fallbackPosts;

  const client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  try {
    const { data, error } = await client
      .from("blog_posts")
      .select("*")
      .eq("status", "published")
      .lte("published_at", new Date().toISOString())
      .order("published_at", { ascending: false });

    if (error || !data?.length) {
      if (error) console.warn(`Conteúdo remoto não carregado no build: ${summarizeError(error.message)}`);
      return fallbackPosts;
    }

    return data.map(toPost);
  } catch (error) {
    const message = error instanceof Error ? error.message : "erro de rede";
    console.warn(`Conteúdo remoto não carregado no build: ${summarizeError(message)}`);
    return fallbackPosts;
  }
};
