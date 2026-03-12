import { motion } from "framer-motion";
import { SectionWrapper, AnimatedBlock, containerVariants, itemVariants } from "./SectionWrapper";
import { Volume2, Eye, Zap, Layers, LineChart, Expand } from "lucide-react";

const benefits = [
  { icon: Volume2, title: "Menos ruído", desc: "Informação certa, no lugar certo, com histórico." },
  { icon: Eye, title: "Visibilidade real", desc: "Associado sabe o que está acontecendo." },
  { icon: Zap, title: "Time produtivo", desc: "Menos retrabalho, mais execução." },
  { icon: Layers, title: "Padrão sem engessar", desc: "Processo uniforme, personalização por rede." },
  { icon: LineChart, title: "Decisão por dados", desc: "Indicadores para priorizar e justificar." },
  { icon: Expand, title: "Escala com controle", desc: "Crescer com governança e processos replicáveis." },
];

const Benefits = () => (
  <SectionWrapper id="beneficios">
    <AnimatedBlock className="text-center mb-10">
      <p className="text-caption text-primary font-semibold mb-2 uppercase tracking-wider">Benefícios</p>
      <h2 className="text-section text-foreground">O que muda na prática</h2>
    </AnimatedBlock>

    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-4xl mx-auto"
    >
      {benefits.map((b) => (
        <motion.div key={b.title} variants={itemVariants} className="p-5 md:p-6 rounded-xl bg-card shadow-card hover:shadow-card-hover transition-shadow">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
            <b.icon className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-sm font-bold text-card-foreground mb-1">{b.title}</h3>
          <p className="text-xs md:text-sm text-muted-foreground">{b.desc}</p>
        </motion.div>
      ))}
    </motion.div>
  </SectionWrapper>
);

export default Benefits;
