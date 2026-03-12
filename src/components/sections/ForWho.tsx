import { motion } from "framer-motion";
import { SectionWrapper, AnimatedBlock, containerVariants, itemVariants } from "./SectionWrapper";
import { Building2, Users, Network, Briefcase } from "lucide-react";

const segments = [
  { icon: Building2, title: "Associações", desc: "Centralize circulares, campanhas e padronize pedidos." },
  { icon: Users, title: "Cooperativas", desc: "Governança, workflows e indicadores para diretoria." },
  { icon: Network, title: "Redes e Franquias", desc: "Campanhas com padrão e visão por região." },
  { icon: Briefcase, title: "Operações e TI", desc: "Menos incêndio, mais processo e previsibilidade." },
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
      className="grid grid-cols-2 gap-4 max-w-3xl mx-auto"
    >
      {segments.map((s) => (
        <motion.div key={s.title} variants={itemVariants} className="p-5 md:p-6 rounded-xl bg-card shadow-card hover:shadow-card-hover transition-shadow">
          <s.icon className="h-6 w-6 mb-3 text-primary" />
          <h3 className="text-sm font-bold text-card-foreground mb-1">{s.title}</h3>
          <p className="text-xs md:text-sm text-muted-foreground">{s.desc}</p>
        </motion.div>
      ))}
    </motion.div>
  </SectionWrapper>
);

export default ForWho;
