import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  ArrowLeft,
  CalendarClock,
  Clock3,
  Eye,
  ImagePlus,
  Save,
  Send,
  Sparkles,
  Trash2,
} from "lucide-react";
import BlogBlockEditor from "@/components/admin/BlogBlockEditor";
import BlogArticlePreview from "@/components/admin/BlogArticlePreview";
import { Button } from "@/components/ui/button";
import { getBlogCover, type BlogCoverKey } from "@/lib/blog";
import {
  adminPostToEditorValue,
  emptyBlogEditorValue,
  fetchAdminBlogPost,
  saveBlogPost,
  slugifyBlogTitle,
  triggerBlogRebuild,
  uploadBlogImage,
  type BlogEditorValue,
  type BlogPostStatus,
} from "@/lib/blog-repository";
import { supabase } from "@/integrations/supabase/client";

const coverOptions: { value: BlogCoverKey; label: string }[] = [
  { value: "portal", label: "Portal do Associado" },
  { value: "omnichannel", label: "Plataforma Omnichannel" },
  { value: "treinamento", label: "Treinamento" },
  { value: "dashboards", label: "Dashboards & BI" },
];

const categories = ["Gestão de redes", "Atendimento", "Portais", "Treinamento", "Dados & BI", "Tecnologia"];

const nowAsLocalInput = () => {
  const date = new Date();
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 16);
};

const validateEditor = (value: BlogEditorValue, status: BlogPostStatus) => {
  const errors: string[] = [];
  if (value.title.trim().length < 3) errors.push("Informe um título com pelo menos 3 caracteres.");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value.slug)) errors.push("O endereço da matéria está inválido.");

  if (status === "published") {
    const hasContent = value.blocks.some((block) => {
      if (block.type === "list") return block.items.some((item) => item.trim());
      if (block.type === "callout") return Boolean(block.title.trim() || block.text.trim());
      return Boolean(block.text.trim());
    });

    if (value.title.trim().length < 10) errors.push("Para publicar, use um título com pelo menos 10 caracteres.");
    if (value.excerpt.trim().length < 30) errors.push("O resumo precisa ter pelo menos 30 caracteres.");
    if (!value.category.trim()) errors.push("Informe uma categoria.");
    if (!value.author.trim()) errors.push("Informe o autor.");
    if (!value.coverAlt.trim()) errors.push("Descreva a imagem de capa para acessibilidade.");
    if (value.seoTitle.trim().length < 10) errors.push("Informe o título de SEO.");
    if (value.seoDescription.trim().length < 30) errors.push("Informe a descrição de SEO.");
    if (!hasContent) errors.push("Adicione conteúdo antes de publicar.");
  }

  return errors;
};

const AdminBlogEditor = () => {
  const { id } = useParams<{ id: string }>();
  const isNew = !id;
  const [value, setValue] = useState<BlogEditorValue>(() => ({
    ...emptyBlogEditorValue(),
    publishedAtIso: nowAsLocalInput(),
  }));
  const [slugTouched, setSlugTouched] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const postQuery = useQuery({
    queryKey: ["admin-blog-post", id],
    queryFn: () => fetchAdminBlogPost(id as string),
    enabled: Boolean(id),
  });

  useEffect(() => {
    if (postQuery.data) {
      setValue(adminPostToEditorValue(postQuery.data));
      setSlugTouched(true);
    }
  }, [postQuery.data]);

  const saveMutation = useMutation({
    mutationFn: saveBlogPost,
    onSuccess: async (saved) => {
      const affectsPublicBlog =
        saved.status === "published" || postQuery.data?.status === "published";
      const tasks: Promise<unknown>[] = [
        queryClient.invalidateQueries({ queryKey: ["admin-blog-posts"] }),
        queryClient.invalidateQueries({ queryKey: ["admin-blog-post", saved.id] }),
        queryClient.invalidateQueries({ queryKey: ["blog-posts", "published"] }),
      ];
      if (affectsPublicBlog) tasks.push(triggerBlogRebuild("post_saved"));
      await Promise.all(tasks);
      setValue(adminPostToEditorValue(saved));
      setSlugTouched(true);
      toast.success(saved.status === "published" ? "Matéria publicada com sucesso." : "Rascunho salvo.");
      if (isNew) navigate(`/admin/blog/editar/${saved.id}`, { replace: true });
    },
    onError: (error: { code?: string }) => {
      toast.error(error?.code === "23505" ? "Já existe uma matéria com esse endereço." : "Não foi possível salvar a matéria.");
    },
  });

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) throw new Error("Sessão inválida");
      return uploadBlogImage(file, data.user.id);
    },
    onSuccess: (url) => {
      setValue((current) => ({ ...current, coverUrl: url }));
      toast.success("Imagem enviada.");
    },
    onError: () => toast.error("Não foi possível enviar a imagem."),
  });

  const update = <Key extends keyof BlogEditorValue>(key: Key, nextValue: BlogEditorValue[Key]) => {
    setValue((current) => ({ ...current, [key]: nextValue }));
  };

  const save = async (status: BlogPostStatus) => {
    const next: BlogEditorValue = {
      ...value,
      title: value.title.trim(),
      slug: value.slug.trim(),
      excerpt: value.excerpt.trim(),
      category: value.category.trim(),
      author: value.author.trim(),
      coverAlt: value.coverAlt.trim(),
      seoTitle: value.seoTitle.trim(),
      seoDescription: value.seoDescription.trim(),
      tags: value.tags.map((tag) => tag.trim()).filter(Boolean),
      status,
    };

    const errors = validateEditor(next, status);
    setFormErrors(errors);
    if (errors.length) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    try {
      await saveMutation.mutateAsync(next);
    } catch {
      // A mensagem de erro é exibida pelo callback da mutation.
    }
  };

  const wordCount = useMemo(() => {
    const text = value.blocks
      .flatMap((block) => {
        if (block.type === "list") return block.items;
        if (block.type === "callout") return [block.title, block.text];
        return [block.text];
      })
      .join(" ")
      .trim();
    return text ? text.split(/\s+/).length : 0;
  }, [value.blocks]);

  const calculatedReadTime = `${Math.max(1, Math.ceil(wordCount / 220))} min de leitura`;
  const isScheduled =
    value.status === "published" &&
    Boolean(value.publishedAtIso) &&
    new Date(value.publishedAtIso).getTime() > Date.now();
  const coverPreview = value.coverUrl || getBlogCover(value.cover);

  const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("A imagem deve ter no máximo 5 MB.");
      return;
    }
    uploadMutation.mutate(file);
  };

  if (!isNew && postQuery.isLoading) {
    return <div className="p-10 text-sm text-slate-500">Carregando editor...</div>;
  }

  if (!isNew && postQuery.isError) {
    return (
      <div className="p-10">
        <p className="font-bold text-red-700">Não foi possível abrir esta matéria.</p>
        <Link to="/admin/blog" className="mt-4 inline-block text-sm font-bold text-primary">Voltar ao painel</Link>
      </div>
    );
  }

  return (
    <div className="pb-28">
      <header className="sticky top-16 z-20 border-b border-slate-200 bg-white/95 px-5 py-4 backdrop-blur sm:px-7 lg:top-0 xl:px-10">
        <div className="mx-auto flex max-w-7xl items-center gap-4">
          <Link to="/admin/blog" className="rounded-xl border border-slate-200 p-2.5 text-slate-500 hover:bg-slate-50" aria-label="Voltar ao painel">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-slate-900">{isNew ? "Nova matéria" : value.title || "Editar matéria"}</p>
            <p className="text-xs text-slate-500">{isNew ? "Ainda não salva" : value.status === "published" ? isScheduled ? "Agendada" : "Publicada" : "Rascunho"}</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setPreviewOpen(true)}>
              <Eye className="h-4 w-4" />
              <span className="hidden sm:inline">Visualizar</span>
            </Button>
            <Button type="button" variant="hero" size="sm" onClick={() => void save(value.status)} disabled={saveMutation.isPending}>
              <Save className="h-4 w-4" />
              <span className="hidden sm:inline">Salvar</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 p-5 sm:p-7 xl:grid-cols-[minmax(0,1fr)_340px] xl:p-10">
        <div className="space-y-6">
          {formErrors.length > 0 && (
            <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-5">
              <p className="font-bold text-red-800">Revise os campos antes de salvar:</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-red-700">
                {formErrors.map((error) => <li key={error}>{error}</li>)}
              </ul>
            </div>
          )}

          <section className="admin-panel-card">
            <div className="admin-panel-heading">
              <div>
                <p className="admin-eyebrow">Informações principais</p>
                <h2>Título e apresentação</h2>
              </div>
            </div>
            <div className="space-y-5 p-5 sm:p-6">
              <label className="block">
                <span className="admin-label">Título da matéria</span>
                <input
                  value={value.title}
                  maxLength={140}
                  onChange={(event) => {
                    const title = event.target.value;
                    setValue((current) => ({
                      ...current,
                      title,
                      slug: slugTouched ? current.slug : slugifyBlogTitle(title),
                      seoTitle: current.seoTitle && current.seoTitle !== `${current.title} | Bahdev` ? current.seoTitle : `${title} | Bahdev`,
                    }));
                  }}
                  className="admin-input text-base font-bold"
                  placeholder="Digite um título claro e atrativo"
                />
                <span className="admin-field-help">{value.title.length}/140 caracteres</span>
              </label>

              <label className="block">
                <span className="admin-label">Endereço da matéria</span>
                <div className="flex rounded-xl border border-slate-200 bg-white focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10">
                  <span className="flex items-center border-r border-slate-200 bg-slate-50 px-3 text-xs text-slate-400">/blog/</span>
                  <input
                    value={value.slug}
                    onChange={(event) => {
                      setSlugTouched(true);
                      update("slug", slugifyBlogTitle(event.target.value));
                    }}
                    className="h-11 min-w-0 flex-1 bg-transparent px-3 font-mono text-xs outline-none"
                    placeholder="titulo-da-materia"
                  />
                </div>
              </label>

              <label className="block">
                <span className="admin-label">Resumo</span>
                <textarea
                  value={value.excerpt}
                  maxLength={280}
                  onChange={(event) => {
                    const excerpt = event.target.value;
                    setValue((current) => ({
                      ...current,
                      excerpt,
                      seoDescription: current.seoDescription && current.seoDescription !== current.excerpt ? current.seoDescription : excerpt,
                    }));
                  }}
                  className="admin-textarea min-h-28"
                  placeholder="Explique em poucas linhas o que a pessoa encontrará nesta matéria."
                />
                <span className="admin-field-help">{value.excerpt.length}/280 caracteres</span>
              </label>

              <div className="grid gap-5 sm:grid-cols-2">
                <label>
                  <span className="admin-label">Categoria</span>
                  <input value={value.category} onChange={(event) => update("category", event.target.value)} list="blog-categories" className="admin-input" />
                  <datalist id="blog-categories">{categories.map((category) => <option key={category} value={category} />)}</datalist>
                </label>
                <label>
                  <span className="admin-label">Autor</span>
                  <input value={value.author} onChange={(event) => update("author", event.target.value)} className="admin-input" />
                </label>
              </div>

              <label className="block">
                <span className="admin-label">Tags</span>
                <input
                  value={value.tags.join(", ")}
                  onChange={(event) => update("tags", event.target.value.split(","))}
                  className="admin-input"
                  placeholder="gestão, tecnologia, redes"
                />
                <span className="admin-field-help">Separe as tags por vírgulas.</span>
              </label>
            </div>
          </section>

          <section className="admin-panel-card">
            <div className="admin-panel-heading">
              <div>
                <p className="admin-eyebrow">Corpo da matéria</p>
                <h2>Editor de conteúdo</h2>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Clock3 className="h-4 w-4" />
                {wordCount} palavras
              </div>
            </div>
            <div className="p-5 sm:p-6">
              <BlogBlockEditor blocks={value.blocks} onChange={(blocks) => update("blocks", blocks)} />
            </div>
          </section>

          <section className="admin-panel-card">
            <div className="admin-panel-heading">
              <div>
                <p className="admin-eyebrow">Busca e compartilhamento</p>
                <h2>Configurações de SEO</h2>
              </div>
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div className="space-y-5 p-5 sm:p-6">
              <label className="block">
                <span className="admin-label">Título de SEO</span>
                <input value={value.seoTitle} maxLength={70} onChange={(event) => update("seoTitle", event.target.value)} className="admin-input" />
                <span className="admin-field-help">{value.seoTitle.length}/70 caracteres recomendados</span>
              </label>
              <label className="block">
                <span className="admin-label">Descrição de SEO</span>
                <textarea value={value.seoDescription} maxLength={170} onChange={(event) => update("seoDescription", event.target.value)} className="admin-textarea min-h-24" />
                <span className="admin-field-help">{value.seoDescription.length}/170 caracteres recomendados</span>
              </label>
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="truncate text-sm text-emerald-700">www.bahdev.com.br › blog › {value.slug || "titulo-da-materia"}</p>
                <p className="mt-1 truncate text-lg font-medium text-blue-700">{value.seoTitle || value.title || "Título da matéria"}</p>
                <p className="mt-1 line-clamp-2 text-sm leading-5 text-slate-600">{value.seoDescription || value.excerpt || "Descrição da matéria para mecanismos de busca."}</p>
              </div>
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="admin-panel-card xl:sticky xl:top-24">
            <div className="admin-panel-heading">
              <div>
                <p className="admin-eyebrow">Controle</p>
                <h2>Publicação</h2>
              </div>
            </div>
            <div className="space-y-5 p-5">
              <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                <span className="text-xs font-bold text-slate-500">Status atual</span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-xs font-bold text-slate-700 shadow-sm">
                  <span className={`h-2 w-2 rounded-full ${value.status === "published" ? "bg-emerald-500" : "bg-amber-500"}`} />
                  {value.status === "published" ? isScheduled ? "Agendada" : "Publicada" : "Rascunho"}
                </span>
              </div>

              <label className="block">
                <span className="admin-label">Data de publicação</span>
                <input type="datetime-local" value={value.publishedAtIso} onChange={(event) => update("publishedAtIso", event.target.value)} className="admin-input" />
                <span className="admin-field-help">Use uma data futura para agendar.</span>
              </label>

              <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-slate-200 p-3">
                <span>
                  <strong className="block text-sm">Artigo em destaque</strong>
                  <span className="text-xs text-slate-500">Aparece no topo do blog.</span>
                </span>
                <input type="checkbox" checked={value.featured} onChange={(event) => update("featured", event.target.checked)} className="h-5 w-5 accent-primary" />
              </label>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="admin-label !mb-0">Tempo de leitura</span>
                  <button type="button" onClick={() => update("readTime", calculatedReadTime)} className="text-[11px] font-bold text-primary hover:underline">Calcular</button>
                </div>
                <input value={value.readTime} onChange={(event) => update("readTime", event.target.value)} className="admin-input" />
              </div>

              <div className="grid gap-2">
                <Button type="button" variant="outline" size="lg" onClick={() => void save("draft")} disabled={saveMutation.isPending}>
                  <Save className="h-4 w-4" />
                  Salvar rascunho
                </Button>
                <Button type="button" variant="hero" size="lg" onClick={() => void save("published")} disabled={saveMutation.isPending}>
                  {new Date(value.publishedAtIso).getTime() > Date.now() ? <CalendarClock className="h-4 w-4" /> : <Send className="h-4 w-4" />}
                  {saveMutation.isPending ? "Salvando..." : new Date(value.publishedAtIso).getTime() > Date.now() ? "Agendar publicação" : "Publicar agora"}
                </Button>
              </div>
            </div>

            <div className="border-t border-slate-200 p-5">
              <p className="admin-eyebrow">Imagem de capa</p>
              <div className="mt-3 aspect-[16/9] overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                <img src={coverPreview} alt="Prévia da capa" className="h-full w-full object-cover object-left-top" />
              </div>
              <label className="mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-primary/30 bg-primary/5 px-3 py-3 text-xs font-bold text-primary hover:bg-primary/10">
                <ImagePlus className="h-4 w-4" />
                {uploadMutation.isPending ? "Enviando imagem..." : "Enviar nova imagem"}
                <input type="file" accept="image/jpeg,image/png,image/webp,image/avif" className="sr-only" onChange={handleImage} disabled={uploadMutation.isPending} />
              </label>
              {value.coverUrl && (
                <button type="button" onClick={() => update("coverUrl", "")} className="mt-2 flex w-full items-center justify-center gap-2 py-2 text-xs font-semibold text-red-600 hover:underline">
                  <Trash2 className="h-3.5 w-3.5" />
                  Remover imagem enviada
                </button>
              )}
              <label className="mt-4 block">
                <span className="admin-label">Capa padrão</span>
                <select value={value.cover} onChange={(event) => update("cover", event.target.value as BlogCoverKey)} className="admin-input">
                  {coverOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
              </label>
              <label className="mt-4 block">
                <span className="admin-label">Descrição da imagem</span>
                <textarea value={value.coverAlt} onChange={(event) => update("coverAlt", event.target.value)} className="admin-textarea min-h-20" placeholder="Descreva o que aparece na imagem." />
              </label>
            </div>
          </section>
        </aside>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 px-5 py-3 shadow-[0_-10px_30px_rgba(15,23,42,0.08)] backdrop-blur lg:left-64 xl:hidden">
        <div className="mx-auto flex max-w-7xl gap-2">
          <Button type="button" variant="outline" size="lg" className="flex-1" onClick={() => void save("draft")} disabled={saveMutation.isPending}>
            <Save className="h-4 w-4" />
            Rascunho
          </Button>
          <Button type="button" variant="hero" size="lg" className="flex-1" onClick={() => void save("published")} disabled={saveMutation.isPending}>
            <Send className="h-4 w-4" />
            Publicar
          </Button>
        </div>
      </div>

      {previewOpen && <BlogArticlePreview value={value} onClose={() => setPreviewOpen(false)} />}
    </div>
  );
};

export default AdminBlogEditor;
