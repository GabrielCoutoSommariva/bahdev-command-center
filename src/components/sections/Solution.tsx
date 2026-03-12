import { motion } from "framer-motion";
import { SectionWrapper, AnimatedBlock, containerVariants, itemVariants } from "./SectionWrapper";
import { LayoutDashboard, GitPullRequestArrow, MessageCircle, BarChart4, Megaphone, ShieldCheck, Puzzle, Wallet, Bot } from "lucide-react";
import solutionScreenshot from "@/assets/farmacias-dashboard.png";

const modules = [
  { icon: LayoutDashboard, title: "Portal do Associado", desc: "A 'casa' oficial: comunicados, circulares, campanhas, materiais e serviços." },
  { icon: GitPullRequestArrow, title: "Workflow de pedidos e aprovações", desc: "Fluxos prontos: solicitações, validações, prazos, responsáveis e histórico." },
  { icon: Megaphone, title: "Gestão de campanhas", desc: "Do briefing ao material: calendário, execução, entregas e acompanhamento." },
  { icon: MessageCircle, title: "Comunicação centralizada", desc: "Segmentação por perfil/unidade, avisos com rastreio e histórico." },
  { icon: BarChart4, title: "Dashboards e indicadores", desc: "Visões por unidade/região/gestão para decidir com base em dados." },
  { icon: Wallet, title: "Financeiro e pendências", desc: "Visibilidade, controle, emissões e acompanhamento por unidade." },
  { icon: ShieldCheck, title: "Usuários e permissões", desc: "Perfis por função, unidade, time e níveis de aprovação." },
  { icon: Puzzle, title: "Integrações", desc: "WhatsApp, sistemas internos, BI e fontes de dados do ecossistema." },
  { icon: Bot, title: "Base para IA e automações", desc: "Processos bem definidos + dados centralizados = automação de verdade." },
];

const Solution = () => (
  <SectionWrapper id="solucao">
    <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
      <AnimatedBlock>
        <p className="text-caption text-primary font-semibold mb-3 uppercase tracking-wider">
          A solução
        </p>
        <h2 className="text-section text-foreground mb-6">
          A Bahdev é uma plataforma modular para transformar rotina em processo
        </h2>
        <p className="text-body text-muted-foreground max-w-[55ch] mb-8">
          Um único portal para gestão, comunicação e operação — com módulos que
          você ativa conforme a maturidade da sua rede.
        </p>
      </AnimatedBlock>

      <AnimatedBlock delay={0.2}>
        <div className="rounded-2xl overflow-hidden shadow-product">
          <img
            src={solutionScreenshot}
            alt="Bahdev — Dashboard de indicadores e gestão da rede"
            className="w-full h-auto"
            loading="lazy"
          />
        </div>
      </AnimatedBlock>
    </div>

    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
    >
      {modules.map((mod) => (
        <motion.div
          key={mod.title}
          variants={itemVariants}
          className="p-6 rounded-2xl bg-card shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 will-change-transform"
        >
          <mod.icon className="h-7 w-7 mb-4 text-primary" />
          <h3 className="text-card-title text-card-foreground mb-1">{mod.title}</h3>
          <p className="text-sm text-muted-foreground">{mod.desc}</p>
        </motion.div>
      ))}
    </motion.div>
  </SectionWrapper>
);

export default Solution;
