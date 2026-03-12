import { motion } from "framer-motion";
import { SectionWrapper, AnimatedBlock, containerVariants, itemVariants } from "./SectionWrapper";
import { Building2, Users, Network, Briefcase } from "lucide-react";

const segments = [
  {
    icon: Building2,
    title: "Associações",
    desc: "Centralize a comunicação com associados, organize solicitações e acompanhe indicadores de engajamento e serviços.",
  },
  {
    icon: Users,
    title: "Cooperativas",
    desc: "Unifique processos entre cooperados, automatize aprovações e tenha visibilidade em tempo real de toda a operação.",
  },
  {
    icon: Network,
    title: "Redes e franquias",
    desc: "Garanta padrão, governança e escala. Distribua campanhas, gerencie solicitações e monitore indicadores por unidade.",
  },
  {
    icon: Briefcase,
    title: "Marketing, Operações e TI",
    desc: "Elimine retrabalho, rastreie demandas e tenha dados confiáveis para reportar resultados com confiança à diretoria.",
  },
];

const ForWho = () => (
  <SectionWrapper id="para-quem">
    <AnimatedBlock className="text-center mb-16">
      <p className="text-caption text-primary font-semibold mb-3 uppercase tracking-wider">
        Para quem
      </p>
      <h2 className="text-section text-foreground mb-4">
        Feita para quem gerencia redes com seriedade
      </h2>
    </AnimatedBlock>

    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto"
    >
      {segments.map((s) => (
        <motion.div
          key={s.title}
          variants={itemVariants}
          className="p-8 rounded-2xl bg-card shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 will-change-transform"
        >
          <s.icon className="h-8 w-8 mb-4 text-primary" />
          <h3 className="text-card-title text-card-foreground mb-2">{s.title}</h3>
          <p className="text-body text-muted-foreground">{s.desc}</p>
        </motion.div>
      ))}
    </motion.div>
  </SectionWrapper>
);

export default ForWho;
