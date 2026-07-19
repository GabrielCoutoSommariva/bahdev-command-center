import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  CalendarClock,
  Copy,
  FileEdit,
  FilePlus2,
  FileText,
  Globe2,
  Import,
  Search,
  Send,
  Trash2,
  Undo2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  deleteBlogPost,
  duplicateBlogPost,
  fetchAdminBlogPosts,
  importInitialBlogPosts,
  triggerBlogRebuild,
  updateBlogPostStatus,
  type AdminBlogPost,
  type BlogPostStatus,
} from "@/lib/blog-repository";
import { cn } from "@/lib/utils";

type StatusFilter = "all" | "draft" | "published" | "scheduled";

const getDisplayStatus = (post: AdminBlogPost) => {
  if (post.status === "draft") return "draft";
  if (post.publishedAtIso && new Date(post.publishedAtIso).getTime() > Date.now()) return "scheduled";
  return "published";
};

const statusLabels = {
  draft: "Rascunho",
  published: "Publicado",
  scheduled: "Agendado",
};

const statusClasses = {
  draft: "bg-amber-50 text-amber-700 border-amber-200",
  published: "bg-emerald-50 text-emerald-700 border-emerald-200",
  scheduled: "bg-blue-50 text-blue-700 border-blue-200",
};

const AdminBlogDashboard = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const queryClient = useQueryClient();

  const postsQuery = useQuery({
    queryKey: ["admin-blog-posts"],
    queryFn: fetchAdminBlogPosts,
  });

  const refreshPosts = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["admin-blog-posts"] }),
      queryClient.invalidateQueries({ queryKey: ["blog-posts", "published"] }),
    ]);
  };

  const importMutation = useMutation({
    mutationFn: importInitialBlogPosts,
    onSuccess: async () => {
      await Promise.all([refreshPosts(), triggerBlogRebuild("initial_posts_imported")]);
      toast.success("Conteúdos iniciais importados.");
    },
    onError: () => toast.error("Não foi possível importar os conteúdos."),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBlogPost,
    onSuccess: async () => {
      await Promise.all([refreshPosts(), triggerBlogRebuild("post_deleted")]);
      toast.success("Matéria removida.");
    },
    onError: () => toast.error("Não foi possível remover a matéria."),
  });

  const duplicateMutation = useMutation({
    mutationFn: duplicateBlogPost,
    onSuccess: async () => {
      await refreshPosts();
      toast.success("Cópia criada como rascunho.");
    },
    onError: () => toast.error("Não foi possível duplicar a matéria."),
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, nextStatus }: { id: string; nextStatus: BlogPostStatus }) =>
      updateBlogPostStatus(id, nextStatus),
    onSuccess: async (post) => {
      await Promise.all([refreshPosts(), triggerBlogRebuild(`post_${post.status}`)]);
      toast.success(post.status === "published" ? "Matéria publicada." : "Matéria movida para rascunho.");
    },
    onError: () => toast.error("Não foi possível alterar a publicação."),
  });

  const posts = useMemo(() => postsQuery.data ?? [], [postsQuery.data]);
  const stats = useMemo(
    () => ({
      total: posts.length,
      published: posts.filter((post) => getDisplayStatus(post) === "published").length,
      draft: posts.filter((post) => getDisplayStatus(post) === "draft").length,
      scheduled: posts.filter((post) => getDisplayStatus(post) === "scheduled").length,
    }),
    [posts],
  );

  const filteredPosts = useMemo(() => {
    const term = search.trim().toLocaleLowerCase("pt-BR");
    return posts.filter((post) => {
      const displayStatus = getDisplayStatus(post);
      const matchesStatus = status === "all" || displayStatus === status;
      const matchesSearch =
        !term ||
        [post.title, post.category, post.slug, post.author, ...post.tags]
          .join(" ")
          .toLocaleLowerCase("pt-BR")
          .includes(term);
      return matchesStatus && matchesSearch;
    });
  }, [posts, search, status]);

  const statCards = [
    { label: "Total de matérias", value: stats.total, icon: FileText, color: "text-slate-700 bg-slate-100" },
    { label: "Publicadas", value: stats.published, icon: Globe2, color: "text-emerald-700 bg-emerald-100" },
    { label: "Rascunhos", value: stats.draft, icon: FileEdit, color: "text-amber-700 bg-amber-100" },
    { label: "Agendadas", value: stats.scheduled, icon: CalendarClock, color: "text-blue-700 bg-blue-100" },
  ];

  return (
    <div className="p-5 sm:p-7 xl:p-10">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Conteúdo</p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-[-0.03em] text-slate-950">Gestão do blog</h1>
            <p className="mt-2 text-sm text-slate-500">Crie, revise e acompanhe todas as matérias da Bahdev.</p>
          </div>
          <Button asChild variant="hero" size="lg">
            <Link to="/admin/blog/novo">
              <FilePlus2 className="h-4 w-4" />
              Nova matéria
            </Link>
          </Button>
        </header>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Resumo do blog">
          {statCards.map((card) => (
            <div key={card.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className={cn("inline-flex h-10 w-10 items-center justify-center rounded-xl", card.color)}>
                <card.icon className="h-5 w-5" />
              </div>
              <p className="mt-5 text-3xl font-extrabold tracking-[-0.03em]">{card.value}</p>
              <p className="mt-1 text-xs font-semibold text-slate-500">{card.label}</p>
            </div>
          ))}
        </section>

        <section className="mt-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-slate-200 p-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-sm">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="admin-input pl-10"
                placeholder="Buscar por título, categoria ou tag..."
              />
            </div>
            <div className="flex gap-2 overflow-x-auto" aria-label="Filtrar matérias">
              {([
                ["all", "Todas"],
                ["published", "Publicadas"],
                ["draft", "Rascunhos"],
                ["scheduled", "Agendadas"],
              ] as const).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setStatus(value)}
                  className={cn(
                    "shrink-0 rounded-lg border px-3 py-2 text-xs font-bold transition-colors",
                    status === value
                      ? "border-primary bg-primary text-white"
                      : "border-slate-200 text-slate-500 hover:border-primary/30 hover:text-primary",
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {postsQuery.isLoading ? (
            <div className="p-12 text-center text-sm text-slate-500">Carregando matérias...</div>
          ) : postsQuery.isError ? (
            <div className="p-8 text-center">
              <p className="font-bold text-red-700">Não foi possível carregar o banco do blog.</p>
              <p className="mt-2 text-sm text-slate-500">
                Confirme se a migration do Supabase foi aplicada e se sua conta está em <code>blog_admins</code>.
              </p>
            </div>
          ) : posts.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <Import className="mx-auto h-9 w-9 text-slate-300" />
              <h2 className="mt-4 text-xl font-bold">Seu painel está pronto</h2>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Importe as cinco matérias já criadas para começar com o conteúdo atual do blog.
              </p>
              <Button
                variant="hero"
                size="lg"
                className="mt-6"
                onClick={() => importMutation.mutate()}
                disabled={importMutation.isPending}
              >
                <Import className="h-4 w-4" />
                {importMutation.isPending ? "Importando..." : "Importar matérias iniciais"}
              </Button>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="p-12 text-center text-sm text-slate-500">Nenhuma matéria encontrada.</div>
          ) : (
            <>
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full min-w-[900px] text-left">
                  <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
                    <tr>
                      <th className="px-5 py-3">Matéria</th>
                      <th className="px-5 py-3">Categoria</th>
                      <th className="px-5 py-3">Status</th>
                      <th className="px-5 py-3">Atualização</th>
                      <th className="px-5 py-3 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredPosts.map((post) => {
                      const displayStatus = getDisplayStatus(post);
                      return (
                        <tr key={post.id} className="hover:bg-slate-50/70">
                          <td className="max-w-md px-5 py-4">
                            <p className="truncate text-sm font-bold text-slate-900">{post.title}</p>
                            <p className="mt-1 truncate font-mono text-[11px] text-slate-400">/{post.slug}</p>
                          </td>
                          <td className="px-5 py-4 text-sm text-slate-600">{post.category}</td>
                          <td className="px-5 py-4">
                            <span className={cn("inline-flex rounded-full border px-2.5 py-1 text-[11px] font-bold", statusClasses[displayStatus])}>
                              {statusLabels[displayStatus]}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-xs text-slate-500">
                            {new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(new Date(post.updatedAtIso))}
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex items-center justify-end gap-1">
                              <Link to={`/admin/blog/editar/${post.id}`} className="admin-icon-button" aria-label="Editar matéria">
                                <FileEdit />
                              </Link>
                              <button type="button" className="admin-icon-button" onClick={() => duplicateMutation.mutate(post)} aria-label="Duplicar matéria">
                                <Copy />
                              </button>
                              <button
                                type="button"
                                className="admin-icon-button"
                                onClick={() => statusMutation.mutate({ id: post.id, nextStatus: post.status === "published" ? "draft" : "published" })}
                                aria-label={post.status === "published" ? "Despublicar matéria" : "Publicar matéria"}
                              >
                                {post.status === "published" ? <Undo2 /> : <Send />}
                              </button>
                              <button
                                type="button"
                                className="admin-icon-button hover:!bg-red-50 hover:!text-red-600"
                                onClick={() => {
                                  if (window.confirm(`Remover definitivamente “${post.title}”?`)) deleteMutation.mutate(post.id);
                                }}
                                aria-label="Remover matéria"
                              >
                                <Trash2 />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="divide-y divide-slate-100 md:hidden">
                {filteredPosts.map((post) => {
                  const displayStatus = getDisplayStatus(post);
                  return (
                    <article key={post.id} className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-bold leading-5">{post.title}</p>
                          <p className="mt-1 text-xs text-slate-500">{post.category}</p>
                        </div>
                        <span className={cn("shrink-0 rounded-full border px-2 py-1 text-[10px] font-bold", statusClasses[displayStatus])}>
                          {statusLabels[displayStatus]}
                        </span>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Link to={`/admin/blog/editar/${post.id}`} className="flex-1 rounded-lg bg-primary px-3 py-2 text-center text-xs font-bold text-white">
                          Editar
                        </Link>
                        <button type="button" onClick={() => duplicateMutation.mutate(post)} className="rounded-lg border border-slate-200 px-3 py-2 text-slate-500" aria-label="Duplicar matéria">
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default AdminBlogDashboard;
