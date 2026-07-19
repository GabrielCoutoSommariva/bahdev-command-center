import { X } from "lucide-react";
import ArticleContent from "@/components/blog/ArticleContent";
import { getBlogCover } from "@/lib/blog";
import type { BlogEditorValue } from "@/lib/blog-repository";

type BlogArticlePreviewProps = {
  value: BlogEditorValue;
  onClose: () => void;
};

const BlogArticlePreview = ({ value, onClose }: BlogArticlePreviewProps) => {
  const cover = value.coverUrl || getBlogCover(value.cover);

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-slate-950/80 p-3 backdrop-blur-sm md:p-8">
      <div className="mx-auto min-h-full max-w-5xl overflow-hidden rounded-2xl bg-background shadow-2xl md:rounded-3xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/95 px-5 py-4 backdrop-blur">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Pré-visualização</p>
            <p className="text-sm text-slate-500">Esta página ainda não está pública.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 p-2 text-slate-500 hover:bg-slate-100"
            aria-label="Fechar pré-visualização"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <article>
          <header className="bg-gradient-to-b from-primary/10 via-background to-background px-6 py-12 md:px-12 md:py-16">
            <span className="rounded-full bg-primary px-3 py-1.5 text-xs font-bold uppercase tracking-[0.13em] text-white">
              {value.category || "Categoria"}
            </span>
            <h1 className="mt-5 max-w-4xl text-3xl font-extrabold leading-tight tracking-[-0.03em] md:text-5xl">
              {value.title || "Título da matéria"}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
              {value.excerpt || "O resumo da matéria aparecerá aqui."}
            </p>
            <p className="mt-6 text-sm text-muted-foreground">
              <strong className="text-foreground">{value.author || "Equipe Bahdev"}</strong> · {value.readTime}
            </p>
          </header>

          <div className="px-6 md:px-12">
            <div className="aspect-[16/8] overflow-hidden rounded-2xl border border-border bg-muted shadow-product">
              <img src={cover} alt={value.coverAlt || "Capa da matéria"} className="h-full w-full object-cover object-left-top" />
            </div>
            <div className="mx-auto max-w-3xl py-12 md:py-16">
              <ArticleContent blocks={value.blocks} />
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogArticlePreview;
