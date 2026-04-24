import { motion } from "framer-motion";
import { SectionWrapper, AnimatedBlock, containerVariants, itemVariants } from "./SectionWrapper";
import { LayoutDashboard, GitPullRequestArrow, MessageCircle, BarChart4, Megaphone, Wallet, ShieldCheck, Puzzle, Bot } from "lucide-react";
import solutionScreenshot from "@/assets/farmacias-dashboard.png";
import encarteScreenshot from "@/assets/bahdev-encartes.png";
import { useEffect, useState } from "react";

const modules = [
  { icon: LayoutDashboard, title: "Portal do Associado", desc: "Comunicados, campanhas, materiais e serviços." },
  { icon: GitPullRequestArrow, title: "Workflow", desc: "Solicitações, aprovações e rastreio." },
  { icon: Megaphone, title: "Campanhas", desc: "Briefing, execução e acompanhamento." },
  { icon: MessageCircle, title: "Comunicação", desc: "Segmentação, avisos e histórico." },
  { icon: BarChart4, title: "Dashboards", desc: "Indicadores por unidade e região." },
  { icon: Wallet, title: "Financeiro", desc: "Pendências e controle por unidade." },
  { icon: ShieldCheck, title: "Permissões", desc: "Perfis por função e nível." },
  { icon: Puzzle, title: "Integrações", desc: "WhatsApp, ERPs, BI e mais." },
  { icon: Bot, title: "IA e Automações", desc: "Base para automação real." },
];

const gallery = [
  { src: solutionScreenshot, alt: "Bahdev — Dashboard de indicadores", label: "Dashboard" },
  { src: encarteScreenshot, alt: "Bahdev — Encartes e campanhas", label: "Encartes" },
];

const SolutionGallery = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % gallery.length), 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="relative rounded-xl overflow-hidden shadow-product bg-card flex-1 min-h-[280px] sm:min-h-[340px] lg:min-h-[420px]">
        {gallery.map((item, i) => (
          <motion.img
            key={item.label}
            src={item.src}
            alt={item.alt}
            loading="lazy"
            initial={false}
            animate={{ opacity: active === i ? 1 : 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ))}
      </div>
      <div className="flex items-center justify-center gap-2 mt-3">
        {gallery.map((item, i) => (
          <button
            key={item.label}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Ver ${item.label}`}
            className={`h-1.5 rounded-full transition-all ${active === i ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"}`}
          />
        ))}
      </div>
    </div>
  );
};

const Solution = () => (
  <SectionWrapper id="solucao">
    <div className="grid lg:grid-cols-2 gap-10 items-center mb-12">
      <AnimatedBlock>
        <p className="text-caption text-primary font-semibold mb-2 uppercase tracking-wider">A solução</p>
        <h2 className="text-section text-foreground mb-4">Plataforma modular: rotina vira processo</h2>
        <p className="text-body text-muted-foreground max-w-[50ch]">
          Um portal para gestão, comunicação e operação — ative módulos conforme sua rede amadurece.
        </p>
      </AnimatedBlock>
      <AnimatedBlock delay={0.15}>
        <SolutionGallery />
      </AnimatedBlock>
    </div>

    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-4"
    >
      {modules.map((mod) => (
        <motion.div key={mod.title} variants={itemVariants} className="p-4 md:p-5 rounded-xl bg-card shadow-card hover:shadow-card-hover transition-shadow">
          <mod.icon className="h-5 w-5 mb-2 text-primary" />
          <h3 className="text-sm font-bold text-card-foreground mb-0.5">{mod.title}</h3>
          <p className="text-xs text-muted-foreground">{mod.desc}</p>
        </motion.div>
      ))}
    </motion.div>
  </SectionWrapper>
);

export default Solution;
