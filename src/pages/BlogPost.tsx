import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  Linkedin,
  LinkIcon,
  MessageCircle,
} from "lucide-react";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEO from "@/components/SEO";
import ArticleContent from "@/components/blog/ArticleContent";
import BlogCard from "@/components/blog/BlogCard";
import BlogCTA from "@/components/blog/BlogCTA";
import { Button } from "@/components/ui/button";
import {
  formatBlogDate,
  getRelatedPosts,
  getPostCover,
} from "@/lib/blog";
import { useBlogPosts } from "@/hooks/use-blog-posts";

const SITE_URL = "https://www.bahdev.com.br";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const postsQuery = useBlogPosts();
  const posts = postsQuery.data ?? [];
  const post = posts.find((candidate) => candidate.slug === slug);
  const [copied, setCopied] = useState(false);

  if (!post && postsQuery.isFetching) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-sm font-semibold text-muted-foreground">
        Carregando matéria...
      </div>
    );
  }

  if (!post) {
    return (
      <>
        <SEO
          title="Conteúdo não encontrado | Bahdev"
          description="O conteúdo que você tentou acessar não está disponível."
          path={`/blog/${slug ?? ""}`}
        />
        <Navbar />
        <main className="flex min-h-[72vh] items-center justify-center px-6 pt-16 text-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Erro 404</p>
            <h1 className="mt-3 text-3xl font-bold">Conteúdo não encontrado</h1>
            <p className="mt-3 text-muted-foreground">
              O artigo pode ter mudado de endereço ou não estar mais disponível.
            </p>
            <Button asChild variant="hero" size="lg" className="mt-6">
              <Link to="/blog">Voltar ao blog</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const articlePath = `/blog/${post.slug}`;
  const articleUrl = `${SITE_URL}${articlePath}`;
  const relatedPosts = getRelatedPosts(post, 3, posts);
  const headings = post.blocks.filter(
    (block): block is Extract<(typeof post.blocks)[number], { type: "heading" }> =>
      block.type === "heading",
  );

  const copyArticleUrl = async () => {
    try {
      await navigator.clipboard.writeText(articleUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <>
      <SEO
        title={post.seoTitle}
        description={post.seoDescription}
        path={articlePath}
        image={getPostCover(post)}
        imageAlt={post.coverAlt}
        type="article"
        publishedAt={post.publishedAt}
        updatedAt={post.updatedAt}
        author={post.author}
      />
      <Navbar />

      <main className="pt-16">
        <article>
          <header className="bg-gradient-to-b from-primary/10 via-background to-background py-10 md:py-16">
            <div className="container mx-auto max-w-5xl px-6 sm:px-8 md:px-10">
              <nav className="mb-8 flex flex-wrap items-center gap-2 text-xs text-muted-foreground" aria-label="Navegação estrutural">
                <Link to="/" className="hover:text-primary">Início</Link>
                <ChevronRight className="h-3.5 w-3.5" />
                <Link to="/blog" className="hover:text-primary">Blog</Link>
                <ChevronRight className="h-3.5 w-3.5" />
                <span className="max-w-[16rem] truncate text-foreground" aria-current="page">
                  {post.title}
                </span>
              </nav>

              <Link
                to="/blog"
                className="mb-7 inline-flex items-center gap-2 rounded-full bg-white/80 px-3.5 py-2 text-sm font-bold text-primary shadow-sm transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar ao blog
              </Link>

              <div className="max-w-4xl">
                <span className="inline-flex rounded-full bg-primary px-3 py-1.5 text-xs font-bold uppercase tracking-[0.13em] text-white">
                  {post.category}
                </span>
                <h1 className="mt-5 text-3xl font-extrabold leading-[1.08] tracking-[-0.03em] text-foreground sm:text-4xl md:text-5xl">
                  {post.title}
                </h1>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
                  {post.excerpt}
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">{post.author}</span>
                  <time className="inline-flex items-center gap-2" dateTime={post.publishedAt}>
                    <CalendarDays className="h-4 w-4" />
                    {formatBlogDate(post.publishedAt)}
                  </time>
                  <span className="inline-flex items-center gap-2">
                    <Clock3 className="h-4 w-4" />
                    {post.readTime}
                  </span>
                </div>
              </div>
            </div>
          </header>

          <div className="container mx-auto max-w-6xl px-6 sm:px-8 md:px-10 lg:px-12">
            <figure className="relative -mt-1 overflow-hidden rounded-2xl border border-border bg-muted shadow-product md:rounded-3xl">
              <div className="aspect-[16/8] min-h-64 w-full">
                <img
                  src={getPostCover(post)}
                  alt={post.coverAlt}
                  className="h-full w-full object-cover object-left-top"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent" />
            </figure>

            <div className="grid gap-10 py-12 lg:grid-cols-[220px_minmax(0,720px)] lg:justify-center lg:gap-14 lg:py-16">
              <aside className="hidden lg:block">
                <div className="sticky top-24">
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-foreground">
                    Neste artigo
                  </p>
                  <nav aria-label="Sumário do artigo">
                    <ul className="space-y-2.5 border-l border-border pl-4">
                      {headings.map((heading) => (
                        <li key={heading.id}>
                          <a
                            href={`#${heading.id}`}
                            className="text-xs leading-5 text-muted-foreground transition-colors hover:text-primary"
                          >
                            {heading.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>

                  <div className="mt-7 border-t border-border pt-5">
                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-foreground">
                      Compartilhar
                    </p>
                    <div className="flex gap-2">
                      <a
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Compartilhar no LinkedIn"
                        className="blog-share-button"
                      >
                        <Linkedin />
                      </a>
                      <a
                        href={`https://wa.me/?text=${encodeURIComponent(`${post.title} — ${articleUrl}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Compartilhar no WhatsApp"
                        className="blog-share-button"
                      >
                        <MessageCircle />
                      </a>
                      <button
                        type="button"
                        onClick={copyArticleUrl}
                        aria-label={copied ? "Link copiado" : "Copiar link do artigo"}
                        className="blog-share-button"
                      >
                        {copied ? <Check /> : <LinkIcon />}
                      </button>
                    </div>
                    <span className="mt-2 block min-h-4 text-[11px] font-semibold text-primary" aria-live="polite">
                      {copied ? "Link copiado" : ""}
                    </span>
                  </div>
                </div>
              </aside>

              <div>
                <ArticleContent blocks={post.blocks} />

                <div className="mt-10 flex flex-wrap gap-2 border-t border-border pt-6" aria-label="Temas do artigo">
                  {post.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-muted px-3 py-1.5 text-xs font-semibold text-muted-foreground">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-4 lg:hidden">
                  <span className="text-sm font-bold">Compartilhe este artigo</span>
                  <div className="flex gap-2">
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Compartilhar no LinkedIn"
                      className="blog-share-button"
                    >
                      <Linkedin />
                    </a>
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(`${post.title} — ${articleUrl}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Compartilhar no WhatsApp"
                      className="blog-share-button"
                    >
                      <MessageCircle />
                    </a>
                    <button
                      type="button"
                      onClick={copyArticleUrl}
                      aria-label={copied ? "Link copiado" : "Copiar link do artigo"}
                      className="blog-share-button"
                    >
                      {copied ? <Check /> : <LinkIcon />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        <section className="border-y border-border bg-muted/30 py-14 md:py-20" aria-labelledby="conteudos-relacionados">
          <div className="container mx-auto max-w-6xl px-6 sm:px-8 md:px-10 lg:px-12">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">
                  Continue explorando
                </p>
                <h2 id="conteudos-relacionados" className="text-2xl font-bold md:text-3xl">
                  Conteúdos relacionados
                </h2>
              </div>
              <Link to="/blog" className="hidden text-sm font-bold text-primary hover:underline sm:block">
                Ver todos
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <BlogCard post={relatedPost} key={relatedPost.slug} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20">
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

export default BlogPostPage;
