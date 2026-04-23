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

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

export { SectionWrapper, AnimatedBlock, containerVariants, itemVariants };
