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
