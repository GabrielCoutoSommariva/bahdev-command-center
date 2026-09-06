import { motion } from "framer-motion";
import { BellRing } from "lucide-react";
import { cn } from "@/lib/utils";
import sessonIcon from "@/assets/sesson-icon.png";

const stats = [
  { label: "Hoje", value: "6" },
  { label: "Confirmados", value: "5" },
  { label: "Aguardando", value: "1" },
];

const agenda = [
  { time: "09:00", title: "Ana Souza", subtitle: "Sessão inicial", status: "done" as const },
  { time: "11:30", title: "Carlos Lima", subtitle: "Retorno", status: "done" as const },
  { time: "14:00", title: "Júlia Prado", subtitle: "Avaliação", status: "pending" as const },
];

interface SessonDashboardMockupProps {
  className?: string;
}

const SessonDashboardMockup = ({ className }: SessonDashboardMockupProps) => (
  <div className={cn("relative", className)}>
    <div className="overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-2xl shadow-emerald-900/10">
      <div className="flex items-center gap-3 border-b border-border bg-gradient-to-r from-emerald-50 to-teal-50 px-5 py-4">
        <img src={sessonIcon} alt="Sesson" className="h-9 w-9 rounded-xl shadow-sm" />
        <div>
          <p className="text-sm font-bold text-card-foreground">Seu dia hoje</p>
          <p className="text-xs text-muted-foreground">Agenda · Sesson</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 px-5 pt-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl bg-muted/60 px-2 py-3 text-center">
            <p className="text-lg font-extrabold text-emerald-700">{s.value}</p>
            <p className="text-[10px] text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="space-y-2 p-5">
        <p className="px-0.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Próximos atendimentos</p>
        {agenda.map((row) => (
          <div
            key={row.time}
            className={cn(
              "flex items-center gap-3 rounded-xl p-3",
              row.status === "done" ? "bg-emerald-50" : "bg-muted/50",
            )}
          >
            <span className="w-11 shrink-0 text-[11px] font-bold text-muted-foreground tabular-nums">{row.time}</span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold text-card-foreground">{row.title}</p>
              <p className="truncate text-[11px] text-muted-foreground">{row.subtitle}</p>
            </div>
            <span className={cn("h-2 w-2 shrink-0 rounded-full", row.status === "done" ? "bg-success" : "bg-warning")} />
          </div>
        ))}
      </div>
    </div>

    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      className="absolute -bottom-5 -left-4 sm:-left-8 flex max-w-[13rem] items-center gap-2.5 rounded-xl border border-border bg-card px-3.5 py-2.5 shadow-card-hover"
    >
      <div className="shrink-0 rounded-lg bg-success/10 p-1.5">
        <BellRing className="h-4 w-4 text-success" />
      </div>
      <div className="min-w-0">
        <p className="truncate text-xs font-bold leading-tight text-card-foreground">Confirmado no WhatsApp</p>
        <p className="truncate text-[11px] leading-tight text-muted-foreground">Lembrete enviado automaticamente</p>
      </div>
    </motion.div>
  </div>
);

export default SessonDashboardMockup;
