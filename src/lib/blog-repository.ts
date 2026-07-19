import { supabase } from "@/integrations/supabase/client";
import type { Json, Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";
import {
  blogPosts as fallbackBlogPosts,
  type BlogBlock,
  type BlogCoverKey,
  type BlogPost,
} from "@/lib/blog";

type BlogPostRow = Tables<"blog_posts">;
type BlogPostInsert = TablesInsert<"blog_posts">;
type BlogPostUpdate = TablesUpdate<"blog_posts">;

export type BlogPostStatus = "draft" | "published";

export type AdminBlogPost = BlogPost & {
  id: string;
  status: BlogPostStatus;
  publishedAtIso: string | null;
  createdAt: string;
  updatedAtIso: string;
};

export type BlogEditorValue = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: string;
  readTime: string;
  featured: boolean;
  cover: BlogCoverKey;
  coverUrl: string;
  coverAlt: string;
  seoTitle: string;
  seoDescription: string;
  blocks: BlogBlock[];
  status: BlogPostStatus;
  publishedAtIso: string;
};

const coverKeys: BlogCoverKey[] = ["omnichannel", "portal", "treinamento", "dashboards"];

const asCoverKey = (value: string | null): BlogCoverKey =>
  coverKeys.includes(value as BlogCoverKey) ? (value as BlogCoverKey) : "portal";

const asBlocks = (value: BlogPostRow["content"]): BlogBlock[] =>
  Array.isArray(value) ? (value as BlogBlock[]) : [];

const dateOnly = (value: string | null | undefined) =>
  value ? new Date(value).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10);

const toDateTimeLocal = (value: string | null | undefined) => {
  if (!value) return "";
  const date = new Date(value);
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 16);
};

export const mapBlogPostRow = (row: BlogPostRow): AdminBlogPost => ({
  id: row.id,
  slug: row.slug,
  title: row.title,
  excerpt: row.excerpt,
  category: row.category,
  tags: row.tags,
  author: row.author,
  publishedAt: dateOnly(row.published_at ?? row.created_at),
  updatedAt: dateOnly(row.updated_at),
  readTime: row.read_time,
  featured: row.featured,
  cover: asCoverKey(row.cover_key),
  coverUrl: row.cover_url ?? undefined,
  coverAlt: row.cover_alt,
  seoTitle: row.seo_title,
  seoDescription: row.seo_description,
  blocks: asBlocks(row.content),
  status: row.status as BlogPostStatus,
  publishedAtIso: row.published_at,
  createdAt: row.created_at,
  updatedAtIso: row.updated_at,
});

export const slugifyBlogTitle = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 100);

export const emptyBlogEditorValue = (): BlogEditorValue => ({
  title: "",
  slug: "",
  excerpt: "",
  category: "Gestão de redes",
  tags: [],
  author: "Equipe Bahdev",
  readTime: "5 min de leitura",
  featured: false,
  cover: "portal",
  coverUrl: "",
  coverAlt: "",
  seoTitle: "",
  seoDescription: "",
  blocks: [{ type: "paragraph", text: "" }],
  status: "draft",
  publishedAtIso: "",
});

export const adminPostToEditorValue = (post: AdminBlogPost): BlogEditorValue => ({
  id: post.id,
  title: post.title,
  slug: post.slug,
  excerpt: post.excerpt,
  category: post.category,
  tags: post.tags,
  author: post.author,
  readTime: post.readTime,
  featured: post.featured,
  cover: post.cover,
  coverUrl: post.coverUrl ?? "",
  coverAlt: post.coverAlt,
  seoTitle: post.seoTitle,
  seoDescription: post.seoDescription,
  blocks: post.blocks,
  status: post.status,
  publishedAtIso: toDateTimeLocal(post.publishedAtIso),
});

export const fetchPublishedBlogPosts = async (): Promise<BlogPost[]> => {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("status", "published")
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false });

  if (error) {
    console.warn("Blog remoto indisponível; usando conteúdo local.", error.message);
    return fallbackBlogPosts;
  }

  if (!data?.length) return fallbackBlogPosts;
  return data.map(mapBlogPostRow);
};

export const fetchAdminBlogPosts = async (): Promise<AdminBlogPost[]> => {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) throw error;
  return (data ?? []).map(mapBlogPostRow);
};

export const fetchAdminBlogPost = async (id: string): Promise<AdminBlogPost> => {
  const { data, error } = await supabase.from("blog_posts").select("*").eq("id", id).single();
  if (error) throw error;
  return mapBlogPostRow(data);
};

const editorValueToPayload = (value: BlogEditorValue): BlogPostInsert => ({
  slug: value.slug,
  title: value.title,
  excerpt: value.excerpt,
  category: value.category,
  tags: value.tags,
  author: value.author,
  read_time: value.readTime,
  featured: value.featured,
  cover_key: value.cover,
  cover_url: value.coverUrl || null,
  cover_alt: value.coverAlt,
  seo_title: value.seoTitle,
  seo_description: value.seoDescription,
  content: value.blocks as unknown as Json,
  status: value.status,
  published_at:
    value.status === "published"
      ? value.publishedAtIso
        ? new Date(value.publishedAtIso).toISOString()
        : new Date().toISOString()
      : value.publishedAtIso || null,
});

export const saveBlogPost = async (value: BlogEditorValue): Promise<AdminBlogPost> => {
  if (value.featured) {
    let unfeatureQuery = supabase.from("blog_posts").update({ featured: false }).eq("featured", true);
    if (value.id) unfeatureQuery = unfeatureQuery.neq("id", value.id);
    const { error: unfeatureError } = await unfeatureQuery;
    if (unfeatureError) throw unfeatureError;
  }

  const payload = editorValueToPayload(value);

  if (value.id) {
    const { data, error } = await supabase
      .from("blog_posts")
      .update(payload as BlogPostUpdate)
      .eq("id", value.id)
      .select("*")
      .single();
    if (error) throw error;
    return mapBlogPostRow(data);
  }

  const { data, error } = await supabase
    .from("blog_posts")
    .insert(payload)
    .select("*")
    .single();
  if (error) throw error;
  return mapBlogPostRow(data);
};

export const deleteBlogPost = async (id: string) => {
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) throw error;
};

export const updateBlogPostStatus = async (id: string, status: BlogPostStatus) => {
  const payload: BlogPostUpdate = {
    status,
    published_at: status === "published" ? new Date().toISOString() : null,
  };
  const { data, error } = await supabase
    .from("blog_posts")
    .update(payload)
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw error;
  return mapBlogPostRow(data);
};

export const duplicateBlogPost = async (post: AdminBlogPost) => {
  const suffix = Date.now().toString().slice(-6);
  return saveBlogPost({
    ...adminPostToEditorValue(post),
    id: undefined,
    title: `${post.title} — cópia`,
    slug: `${post.slug}-copia-${suffix}`,
    featured: false,
    status: "draft",
    publishedAtIso: "",
  });
};

export const importInitialBlogPosts = async () => {
  const rows: BlogPostInsert[] = fallbackBlogPosts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    tags: post.tags,
    author: post.author,
    read_time: post.readTime,
    featured: post.featured,
    cover_key: post.cover,
    cover_url: post.coverUrl ?? null,
    cover_alt: post.coverAlt,
    seo_title: post.seoTitle,
    seo_description: post.seoDescription,
    content: post.blocks as unknown as Json,
    status: "published",
    published_at: `${post.publishedAt}T12:00:00.000Z`,
  }));

  const { data, error } = await supabase
    .from("blog_posts")
    .upsert(rows, { onConflict: "slug" })
    .select("*");
  if (error) throw error;
  return (data ?? []).map(mapBlogPostRow);
};

export const uploadBlogImage = async (file: File, userId: string) => {
  const extension = file.name.split(".").pop()?.toLocaleLowerCase() || "webp";
  const safeName = slugifyBlogTitle(file.name.replace(/\.[^.]+$/, "")) || "imagem";
  const path = `${userId}/${crypto.randomUUID()}-${safeName}.${extension}`;

  const { error } = await supabase.storage.from("blog-images").upload(path, file, {
    cacheControl: "31536000",
    contentType: file.type,
    upsert: false,
  });
  if (error) throw error;

  const { data } = supabase.storage.from("blog-images").getPublicUrl(path);
  return data.publicUrl;
};

export const triggerBlogRebuild = async (reason: string) => {
  const { error } = await supabase.functions.invoke("trigger-blog-deploy", {
    body: { reason },
  });

  if (error) {
    console.warn("Não foi possível solicitar a atualização estática do blog.", error.message);
    return false;
  }

  return true;
};
