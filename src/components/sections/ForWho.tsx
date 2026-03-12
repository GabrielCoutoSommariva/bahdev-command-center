import { motion } from "framer-motion";
import { SectionWrapper, AnimatedBlock, containerVariants, itemVariants } from "./SectionWrapper";
import { Building2, Users, Network, Briefcase } from "lucide-react";

const segments = [
  {
    icon: Building2,
    title: "Associações",
    desc: "Comunicação espalhada em grupos e planilhas? Ninguém sabe o que está valendo.",
    bullets: ["Centralize circulares, avisos e campanhas", "Padronize pedidos com aprovações", "Dê visibilidade real ao associado"],
  },
  {
    icon: Users,
    title: "Cooperativas",
    desc: "Governança exige processos claros, rastreio e dados para decidir.",
    bullets: ["Workflows por área e unidade", "Gestão financeira e pendências", "Indicadores para conselho e diretoria"],
  },
  {
    icon: Network,
    title: "Redes e Franquias",
    desc: "Campanhas só escalam com padrão. Sem padrão, cada loja faz do seu jeito.",
    bullets: ["Campanhas com kit, prazos e status", "Pedidos centralizados e auditáveis", "Visão por região/unidade"],
  },
  {
    icon: Briefcase,
    title: "Operações e TI",
    desc: "Chega de apagar incêndio. Tenha processo, fila e indicadores.",
    bullets: ["Menos retrabalho e solicitações perdidas", "Mais produtividade e previsibilidade", "Base para automações e IA"],
  },
];

const ForWho = () => (
  <SectionWrapper id="para-quem">
    <AnimatedBlock className="text-center mb-10">
      <p className="text-caption text-primary font-semibold mb-2 uppercase tracking-wider">Para quem é</p>
      <h2 className="text-section text-foreground">Controle sem perder agilidade</h2>
    </AnimatedBlock>

    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto"
    >
      {segments.map((s) => (
        <motion.div key={s.title} variants={itemVariants} className="p-5 md:p-6 rounded-xl bg-card shadow-card hover:shadow-card-hover transition-shadow">
          <s.icon className="h-6 w-6 mb-3 text-primary" />
          <h3 className="text-sm font-bold text-card-foreground mb-1">{s.title}</h3>
          <p className="text-xs md:text-sm text-muted-foreground mb-3">{s.desc}</p>
          <ul className="space-y-1.5">
            {s.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2 text-xs md:text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                {b}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </motion.div>
  </SectionWrapper>
);

export default ForWho;
