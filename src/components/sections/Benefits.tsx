import { motion } from "framer-motion";
import { SectionWrapper, AnimatedBlock, Eyebrow, containerVariants, itemVariants } from "./SectionWrapper";
import { Volume2, Eye, Zap, Layers, LineChart, Expand } from "lucide-react";

const benefits = [
  { icon: Volume2, title: "Menos ruído", desc: "Informação certa, no lugar certo, com histórico." },
  { icon: Eye, title: "Visibilidade real", desc: "Associado sabe o que está acontecendo." },
  { icon: Zap, title: "Time produtivo", desc: "Menos retrabalho, mais execução." },
  { icon: Layers, title: "Padrão sem engessar", desc: "Processo uniforme, personalização por rede." },
  { icon: LineChart, title: "Decisão por dados", desc: "Indicadores para priorizar e justificar." },
  { icon: Expand, title: "Escala com controle", desc: "Crescer com governança e processos replicáveis." },
];

const differentials = [
  { title: "Feita para associações e cooperativas", desc: "Estrutura pensada para rede, unidade e governança." },
  { title: "Workflow já pronto", desc: "Fluxos reais, não um Kanban vazio." },
  { title: "Visão de negócio", desc: "Indicadores para gestão e diretoria." },
  { title: "Modular e escalável", desc: "Comece pelo essencial, evolua sem trocar de plataforma." },
  { title: "Suporte consultivo", desc: "Ajuda a ajustar processo e adoção." },
  { title: "Evolução contínua", desc: "Produto melhora junto com sua maturidade." },
];

const Benefits = () => (
  <SectionWrapper id="beneficios">
    <AnimatedBlock className="text-center mb-10">
      <Eyebrow>Benefícios</Eyebrow>
      <h2 className="text-section text-foreground">O que muda na prática</h2>
    </AnimatedBlock>

    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-4xl mx-auto mb-14"
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

    {/* Differentials */}
    <AnimatedBlock className="text-center mb-8">
      <Eyebrow>Diferenciais</Eyebrow>
      <h3 className="text-card-title text-foreground">Portal pensado para rede, não "mais um sistema".</h3>
    </AnimatedBlock>

    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 max-w-4xl mx-auto"
    >
      {differentials.map((d) => (
        <motion.div key={d.title} variants={itemVariants} className="p-4 md:p-5 rounded-xl bg-primary/5 border border-primary/10">
          <h4 className="text-xs md:text-sm font-bold text-foreground mb-1">{d.title}</h4>
          <p className="text-xs text-muted-foreground">{d.desc}</p>
        </motion.div>
      ))}
    </motion.div>
  </SectionWrapper>
);

export default Benefits;
