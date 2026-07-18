import { describe, expect, it } from "vitest";
import {
  blogCategories,
  blogPosts,
  featuredPost,
  getBlogPost,
  getRelatedPosts,
} from "@/lib/blog";

describe("estrutura editorial do blog", () => {
  it("mantém slugs únicos e compatíveis com URL", () => {
    const slugs = blogPosts.map((post) => post.slug);

    expect(new Set(slugs).size).toBe(slugs.length);
    slugs.forEach((slug) => expect(slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/));
  });

  it("mantém um único artigo em destaque", () => {
    expect(blogPosts.filter((post) => post.featured)).toHaveLength(1);
    expect(featuredPost.featured).toBe(true);
  });

  it("mantém datas e conteúdo obrigatório em todos os artigos", () => {
    blogPosts.forEach((post) => {
      expect(post.publishedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(post.updatedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(post.title.length).toBeGreaterThan(20);
      expect(post.excerpt.length).toBeGreaterThan(40);
      expect(post.blocks.length).toBeGreaterThan(4);
      expect(getBlogPost(post.slug)).toEqual(post);
    });
  });

  it("gera categorias e relacionados sem repetir o artigo atual", () => {
    expect(blogCategories[0]).toBe("Todos");
    expect(new Set(blogCategories).size).toBe(blogCategories.length);

    blogPosts.forEach((post) => {
      const related = getRelatedPosts(post);
      expect(related).toHaveLength(Math.min(3, blogPosts.length - 1));
      expect(related.some((candidate) => candidate.slug === post.slug)).toBe(false);
    });
  });
});
