import { ArrowRight, Clock3 } from "lucide-react";
import { Link } from "react-router-dom";
import { type BlogPost, formatBlogDate, getBlogCover } from "@/lib/blog";
import { cn } from "@/lib/utils";

type BlogCardProps = {
  post: BlogPost;
  featured?: boolean;
  className?: string;
};

const BlogCard = ({ post, featured = false, className }: BlogCardProps) => (
  <article className={cn("group h-full", className)}>
    <Link
      to={`/blog/${post.slug}`}
      className={cn(
        "flex h-full overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4",
        featured ? "flex-col lg:grid lg:grid-cols-[1.12fr_0.88fr]" : "flex-col",
      )}
      aria-label={`Ler artigo: ${post.title}`}
    >
      <div
        className={cn(
          "relative overflow-hidden bg-muted",
          featured ? "min-h-64 lg:min-h-[26rem]" : "h-48",
        )}
      >
        <img
          src={getBlogCover(post.cover)}
          alt={post.coverAlt}
          className="h-full w-full object-cover object-left-top transition-transform duration-700 group-hover:scale-[1.035]"
          loading={featured ? "eager" : "lazy"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/35 via-transparent to-primary/5" />
        <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-primary shadow-sm backdrop-blur">
          {post.category}
        </span>
      </div>

      <div className={cn("flex flex-1 flex-col", featured ? "p-6 md:p-9 lg:justify-center" : "p-5")}>
        {featured && (
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-primary">
            Artigo em destaque
          </p>
        )}
        <h2
          className={cn(
            "font-bold leading-tight text-card-foreground transition-colors group-hover:text-primary",
            featured ? "text-2xl md:text-3xl" : "text-lg",
          )}
        >
          {post.title}
        </h2>
        <p className={cn("mt-3 text-muted-foreground", featured ? "text-base leading-7" : "text-sm leading-6")}>
          {post.excerpt}
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
          <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
          <span className="inline-flex items-center gap-1.5">
            <Clock3 className="h-3.5 w-3.5" />
            {post.readTime}
          </span>
        </div>
        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-primary">
          Ler artigo
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  </article>
);

export default BlogCard;
