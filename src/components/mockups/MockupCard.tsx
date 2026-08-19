import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type MockupItem = {
  time: string;
  title: string;
  subtitle: string;
  status: "done" | "pending";
};

interface MockupCardProps {
  appLabel: string;
  items: MockupItem[];
  chipIcon: LucideIcon;
  chipTitle: string;
  chipSub: string;
  chipSide?: "left" | "right";
  className?: string;
}

const MockupCard = ({
  appLabel,
  items,
  chipIcon: ChipIcon,
  chipTitle,
  chipSub,
  chipSide = "left",
  className,
}: MockupCardProps) => (
  <div className={cn("relative", className)}>
    <div className="rounded-2xl border border-border bg-card shadow-product overflow-hidden">
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border bg-muted/40">
        <span className="h-2.5 w-2.5 rounded-full bg-destructive/40" />
        <span className="h-2.5 w-2.5 rounded-full bg-warning/50" />
        <span className="h-2.5 w-2.5 rounded-full bg-success/50" />
        <span className="ml-2 text-xs font-semibold text-muted-foreground">{appLabel}</span>
      </div>

      <div className="p-3.5 space-y-2">
        {items.map((item) => (
          <div
            key={item.time + item.title}
            className={cn(
              "flex items-center gap-3 rounded-xl p-3",
              item.status === "done" ? "bg-primary/5" : "bg-muted/50",
            )}
          >
            <span className="w-11 shrink-0 text-[11px] font-bold text-muted-foreground tabular-nums">
              {item.time}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-card-foreground truncate">{item.title}</p>
              <p className="text-[11px] text-muted-foreground truncate">{item.subtitle}</p>
            </div>
            <span
              className={cn(
                "h-2 w-2 rounded-full shrink-0",
                item.status === "done" ? "bg-success" : "bg-warning",
              )}
            />
          </div>
        ))}
      </div>
    </div>

    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      className={cn(
        "absolute -bottom-5 flex items-center gap-2.5 rounded-xl border border-border bg-card shadow-card-hover px-3.5 py-2.5 max-w-[13rem]",
        chipSide === "left" ? "-left-4 sm:-left-8" : "-right-4 sm:-right-8",
      )}
    >
      <div className="p-1.5 rounded-lg bg-success/10 shrink-0">
        <ChipIcon className="h-4 w-4 text-success" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-bold text-card-foreground leading-tight truncate">{chipTitle}</p>
        <p className="text-[11px] text-muted-foreground leading-tight truncate">{chipSub}</p>
      </div>
    </motion.div>
  </div>
);

export default MockupCard;
