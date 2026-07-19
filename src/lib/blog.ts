import postsData from "@/content/blog-posts.json";
import omnichannelImage from "@/assets/omnichannel-platform.png";
import portalImage from "@/assets/farmacias-portal.png";
import treinamentoImage from "@/assets/dashboard-bahdev-treinamento.png";
import dashboardsImage from "@/assets/dashboard-powerbi.png";

export type BlogCoverKey = "omnichannel" | "portal" | "treinamento" | "dashboards";

export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; id: string; text: string }
  | { type: "list"; items: string[] }
  | { type: "callout"; title: string; text: string }
  | { type: "quote"; text: string };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: string;
  publishedAt: string;
  updatedAt: string;
  readTime: string;
  featured: boolean;
  cover: BlogCoverKey;
  coverUrl?: string;
  coverAlt: string;
  seoTitle: string;
  seoDescription: string;
  blocks: BlogBlock[];
};

const coverAssets: Record<BlogCoverKey, string> = {
  omnichannel: omnichannelImage,
  portal: portalImage,
  treinamento: treinamentoImage,
  dashboards: dashboardsImage,
};

export const blogPosts = [...(postsData as BlogPost[])].sort(
  (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
);

export const featuredPost = blogPosts.find((post) => post.featured) ?? blogPosts[0];

export const blogCategories = [
  "Todos",
  ...Array.from(new Set(blogPosts.map((post) => post.category))).sort((a, b) =>
    a.localeCompare(b, "pt-BR"),
  ),
];

export const getBlogPost = (slug?: string) => blogPosts.find((post) => post.slug === slug);

export const getBlogCover = (cover: BlogCoverKey) => coverAssets[cover];

export const getPostCover = (post: BlogPost) => post.coverUrl || getBlogCover(post.cover);

export const formatBlogDate = (date: string) =>
  new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));

export const getRelatedPosts = (post: BlogPost, limit = 3, source = blogPosts) =>
  source
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => ({
      candidate,
      score:
        (candidate.category === post.category ? 3 : 0) +
        candidate.tags.filter((tag) => post.tags.includes(tag)).length,
    }))
    .sort(
      (a, b) =>
        b.score - a.score ||
        new Date(b.candidate.publishedAt).getTime() -
          new Date(a.candidate.publishedAt).getTime(),
    )
    .slice(0, limit)
    .map(({ candidate }) => candidate);
