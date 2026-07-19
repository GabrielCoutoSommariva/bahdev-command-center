import { ArrowDown, ArrowUp, Heading2, Lightbulb, List, Pilcrow, Quote, Trash2 } from "lucide-react";
import type { BlogBlock } from "@/lib/blog";
import { slugifyBlogTitle } from "@/lib/blog-repository";

type BlogBlockEditorProps = {
  blocks: BlogBlock[];
  onChange: (blocks: BlogBlock[]) => void;
};

const blockLabels: Record<BlogBlock["type"], string> = {
  paragraph: "Parágrafo",
  heading: "Título de seção",
  list: "Lista",
  callout: "Destaque",
  quote: "Citação",
};

const blockIcons = {
  paragraph: Pilcrow,
  heading: Heading2,
  list: List,
  callout: Lightbulb,
  quote: Quote,
};

const createBlock = (type: BlogBlock["type"]): BlogBlock => {
  if (type === "heading") return { type, id: `secao-${Date.now()}`, text: "" };
  if (type === "list") return { type, items: [""] };
  if (type === "callout") return { type, title: "", text: "" };
  return { type, text: "" };
};

const BlogBlockEditor = ({ blocks, onChange }: BlogBlockEditorProps) => {
  const replaceBlock = (index: number, block: BlogBlock) => {
    const next = [...blocks];
    next[index] = block;
    onChange(next);
  };

  const moveBlock = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= blocks.length) return;
    const next = [...blocks];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  return (
    <div>
      <div className="space-y-4">
        {blocks.map((block, index) => {
          const Icon = blockIcons[block.type];

          return (
            <div key={`${block.type}-${index}`} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-4 flex items-center gap-3 border-b border-slate-100 pb-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                  {blockLabels[block.type]}
                </span>
                <div className="ml-auto flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => moveBlock(index, -1)}
                    disabled={index === 0}
                    aria-label="Mover bloco para cima"
                    className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 disabled:opacity-25"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveBlock(index, 1)}
                    disabled={index === blocks.length - 1}
                    aria-label="Mover bloco para baixo"
                    className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 disabled:opacity-25"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onChange(blocks.filter((_, current) => current !== index))}
                    disabled={blocks.length === 1}
                    aria-label="Remover bloco"
                    className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 disabled:opacity-25"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {block.type === "heading" && (
                <div className="grid gap-3 sm:grid-cols-[1fr_220px]">
                  <label>
                    <span className="mb-1.5 block text-xs font-bold text-slate-600">Título</span>
                    <input
                      value={block.text}
                      onChange={(event) =>
                        replaceBlock(index, {
                          ...block,
                          text: event.target.value,
                          id: slugifyBlogTitle(event.target.value) || block.id,
                        })
                      }
                      className="admin-input"
                      placeholder="Ex.: Por onde começar"
                    />
                  </label>
                  <label>
                    <span className="mb-1.5 block text-xs font-bold text-slate-600">Âncora</span>
                    <input
                      value={block.id}
                      onChange={(event) => replaceBlock(index, { ...block, id: slugifyBlogTitle(event.target.value) })}
                      className="admin-input font-mono text-xs"
                      placeholder="por-onde-comecar"
                    />
                  </label>
                </div>
              )}

              {block.type === "paragraph" && (
                <textarea
                  value={block.text}
                  onChange={(event) => replaceBlock(index, { ...block, text: event.target.value })}
                  className="admin-textarea min-h-32"
                  placeholder="Escreva o parágrafo..."
                />
              )}

              {block.type === "list" && (
                <div>
                  <p className="mb-1.5 text-xs font-bold text-slate-600">Um item por linha</p>
                  <textarea
                    value={block.items.join("\n")}
                    onChange={(event) => replaceBlock(index, { ...block, items: event.target.value.split("\n") })}
                    className="admin-textarea min-h-32"
                    placeholder={"Primeiro item\nSegundo item\nTerceiro item"}
                  />
                </div>
              )}

              {block.type === "callout" && (
                <div className="space-y-3">
                  <input
                    value={block.title}
                    onChange={(event) => replaceBlock(index, { ...block, title: event.target.value })}
                    className="admin-input font-bold"
                    placeholder="Título do destaque"
                  />
                  <textarea
                    value={block.text}
                    onChange={(event) => replaceBlock(index, { ...block, text: event.target.value })}
                    className="admin-textarea min-h-24"
                    placeholder="Texto que merece atenção..."
                  />
                </div>
              )}

              {block.type === "quote" && (
                <textarea
                  value={block.text}
                  onChange={(event) => replaceBlock(index, { ...block, text: event.target.value })}
                  className="admin-textarea min-h-24 italic"
                  placeholder="Texto da citação..."
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Adicionar bloco</p>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(blockLabels) as BlogBlock["type"][]).map((type) => {
            const Icon = blockIcons[type];
            return (
              <button
                key={type}
                type="button"
                onClick={() => onChange([...blocks, createBlock(type)])}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 shadow-sm transition hover:border-primary/30 hover:text-primary"
              >
                <Icon className="h-3.5 w-3.5" />
                {blockLabels[type]}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BlogBlockEditor;
