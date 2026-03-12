import { motion } from "framer-motion";
import { SectionWrapper, AnimatedBlock, containerVariants, itemVariants } from "./SectionWrapper";
import { LayoutDashboard, GitPullRequestArrow, MessageCircle, BarChart4, Megaphone, ShieldCheck, Puzzle } from "lucide-react";
import solutionScreenshot from "@/assets/farmacias-dashboard.png";

const modules = [
  { icon: LayoutDashboard, title: "Portal do associado", desc: "Canal único de acesso para cada unidade da rede." },
  { icon: GitPullRequestArrow, title: "Workflow de solicitações", desc: "Solicitações, aprovações e entregas com rastreabilidade total." },
  { icon: MessageCircle, title: "Comunicação centralizada", desc: "Avisos, comunicados e atualizações em um só lugar." },
  { icon: BarChart4, title: "Indicadores e dashboards", desc: "Métricas em tempo real para decisões baseadas em dados." },
  { icon: Megaphone, title: "Gestão de campanhas", desc: "Crie, distribua e acompanhe campanhas para a rede." },
  { icon: ShieldCheck, title: "Permissões por perfil", desc: "Controle de acesso granular por cargo e unidade." },
  { icon: Puzzle, title: "Integrações", desc: "Base pronta para conectar ERPs, CRMs e automações." },
];

const Solution = () => (
  <SectionWrapper id="solucao">
    <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
      <AnimatedBlock>
        <p className="text-caption text-primary font-semibold mb-3 uppercase tracking-wider">
          A solução
        </p>
        <h2 className="text-section text-foreground mb-6">
          Um ecossistema modular para redes que precisam de controle
        </h2>
        <p className="text-body text-muted-foreground max-w-[55ch] mb-8">
          A Bahdev reúne comunicação, workflows, indicadores e governança em uma
          plataforma única. Sua rede opera com padrão, visibilidade e escala —
          sem depender de improviso.
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
      className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
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
