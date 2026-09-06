import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

const SectionWrapper = ({ children, className, id }: SectionWrapperProps) => (
  <section id={id} className={cn("py-14 md:py-20", className)}>
    <div className="container mx-auto px-6 sm:px-8 md:px-10 lg:px-12 max-w-6xl">
      {children}
    </div>
  </section>
);

const AnimatedBlock = ({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, ease: "easeOut", delay }}
    className={className}
  >
    {children}
  </motion.div>
);

const Eyebrow = ({ children, tone = "light", className }: { children: ReactNode; tone?: "light" | "dark"; className?: string }) => (
  <span
    className={cn(
      "inline-flex items-center rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] mb-4",
      tone === "light"
        ? "border border-primary/20 bg-primary/10 text-primary"
        : "border border-white/15 bg-white/10 text-white/85",
      className,
    )}
  >
    {children}
  </span>
);

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

export { SectionWrapper, AnimatedBlock, Eyebrow, containerVariants, itemVariants };
