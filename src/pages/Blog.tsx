import { useMemo, useState } from "react";
import { BookOpen, Search } from "lucide-react";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEO from "@/components/SEO";
import BlogCard from "@/components/blog/BlogCard";
import BlogCTA from "@/components/blog/BlogCTA";
import { blogPosts as fallbackBlogPosts, featuredPost as fallbackFeaturedPost } from "@/lib/blog";
import { useBlogPosts } from "@/hooks/use-blog-posts";
import { cn } from "@/lib/utils";

const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR");

const Blog = () => {
  const [category, setCategory] = useState("Todos");
  const [search, setSearch] = useState("");
  const postsQuery = useBlogPosts();
  const blogPosts = postsQuery.data ?? fallbackBlogPosts;
  const featuredPost = blogPosts.find((post) => post.featured) ?? blogPosts[0] ?? fallbackFeaturedPost;
  const blogCategories = [
    "Todos",
    ...Array.from(new Set(blogPosts.map((post) => post.category))).sort((a, b) =>
      a.localeCompare(b, "pt-BR"),
    ),
  ];

  const isFiltering = category !== "Todos" || search.trim().length > 0;

  const visiblePosts = useMemo(() => {
    const term = normalize(search.trim());

    return blogPosts.filter((post) => {
      const matchesCategory = category === "Todos" || post.category === category;
      const searchable = normalize(
        [post.title, post.excerpt, post.category, ...post.tags].join(" "),
      );
      const matchesSearch = !term || searchable.includes(term);

      return matchesCategory && matchesSearch;
    });
  }, [blogPosts, category, search]);

  const gridPosts = isFiltering
    ? visiblePosts
    : blogPosts.filter((post) => post.slug !== featuredPost.slug);

  return (
    <>
      <SEO
        title="Blog Bahdev | Gestão, tecnologia e operações conectadas"
        description="Conteúdos sobre gestão de redes, atendimento omnichannel, portais, treinamento e dados para operações com múltiplas unidades."
        path="/blog"
      />
      <Navbar />

      <main className="pt-16">
        <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background py-14 md:py-20">
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-primary-glow/15 blur-3xl" />
          <div className="container relative mx-auto max-w-6xl px-6 sm:px-8 md:px-10 lg:px-12">
            <div className="mx-auto mb-10 max-w-3xl text-center md:mb-12">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/80 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary shadow-sm backdrop-blur">
                <BookOpen className="h-4 w-4" />
                Conteúdo Bahdev
              </span>
              <h1 className="text-section text-foreground md:text-[3.4rem]">
                Ideias para conectar melhor sua rede e sua operação
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-body text-muted-foreground">
                Gestão, tecnologia e boas práticas explicadas de forma direta para quem coordena equipes, unidades e associados.
              </p>
            </div>

            <BlogCard post={featuredPost} featured />
          </div>
        </section>

        <section className="py-14 md:py-20" aria-labelledby="todos-os-conteudos">
          <div className="container mx-auto max-w-6xl px-6 sm:px-8 md:px-10 lg:px-12">
            <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">
                  Biblioteca
                </p>
                <h2 id="todos-os-conteudos" className="text-2xl font-bold text-foreground md:text-3xl">
                  Todos os conteúdos
                </h2>
              </div>

              <label className="relative block w-full lg:w-80">
                <span className="sr-only">Buscar no blog</span>
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Buscar por tema..."
                  className="h-11 w-full rounded-xl border border-border bg-card pl-10 pr-4 text-sm outline-none transition-shadow placeholder:text-muted-foreground focus:border-primary/40 focus:ring-4 focus:ring-primary/10"
                />
              </label>
            </div>

            <div className="mb-8 flex gap-2 overflow-x-auto pb-2" aria-label="Filtrar artigos por categoria">
              {blogCategories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  aria-pressed={category === item}
                  className={cn(
                    "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                    category === item
                      ? "border-primary bg-primary text-white"
                      : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-primary",
                  )}
                >
                  {item}
                </button>
              ))}
            </div>

            {gridPosts.length > 0 ? (
              <>
                <p className="mb-5 text-xs text-muted-foreground" aria-live="polite">
                  {isFiltering
                    ? `${gridPosts.length} ${gridPosts.length === 1 ? "conteúdo encontrado" : "conteúdos encontrados"}`
                    : `${blogPosts.length} conteúdos publicados`}
                </p>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {gridPosts.map((post) => (
                    <BlogCard post={post} key={post.slug} />
                  ))}
                </div>
              </>
            ) : (
              <div className="rounded-2xl border border-dashed border-border bg-muted/30 px-6 py-14 text-center">
                <Search className="mx-auto h-8 w-8 text-muted-foreground/50" />
                <h3 className="mt-4 text-lg font-bold">Nenhum conteúdo encontrado</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Tente outro termo ou selecione uma categoria diferente.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setCategory("Todos");
                  }}
                  className="mt-5 text-sm font-bold text-primary hover:underline"
                >
                  Limpar filtros
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="pb-14 md:pb-20">
          <div className="container mx-auto max-w-6xl px-6 sm:px-8 md:px-10 lg:px-12">
            <BlogCTA />
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default Blog;
