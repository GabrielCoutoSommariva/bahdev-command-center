import { motion } from "framer-motion";
import { SectionWrapper, AnimatedBlock, containerVariants, itemVariants } from "./SectionWrapper";
import { Volume2, Eye, Layers, Zap, LineChart, Expand } from "lucide-react";

const benefits = [
  { icon: Volume2, title: "Menos ruído, mais clareza", desc: "A informação certa no lugar certo — com histórico e padrão." },
  { icon: Eye, title: "Associado mais tranquilo e confiante", desc: "Visibilidade do que está acontecendo e previsibilidade de atendimento." },
  { icon: Zap, title: "Time mais produtivo", desc: "Menos retrabalho, menos 'cadê?', mais execução com fluxo." },
  { icon: Layers, title: "Padronização sem engessar", desc: "Padrão no processo e flexibilidade na personalização por rede." },
  { icon: LineChart, title: "Decisão baseada em dados", desc: "Indicadores para priorizar, justificar e melhorar continuamente." },
  { icon: Expand, title: "Escala sem caos", desc: "Crescer com controle: processos replicáveis e governança." },
];

const differentials = [
  { title: "Feita para associações e cooperativas", desc: "A estrutura já considera rede, unidade, perfil e governança." },
  { title: "Workflow já pronto", desc: "Fluxos reais, não 'um Kanban vazio' que você precisa inventar." },
  { title: "Visão de negócio", desc: "Indicadores e acompanhamento de status para gestão e diretoria." },
  { title: "Modular e escalável", desc: "Comece pelo essencial e evolua sem trocar de plataforma." },
  { title: "Suporte consultivo", desc: "Ajuda a ajustar processo e adoção — não só 'suporte técnico'." },
  { title: "Evolução contínua", desc: "O produto melhora junto com sua maturidade operacional e de dados." },
];

const Benefits = () => (
  <SectionWrapper id="beneficios">
    <AnimatedBlock className="text-center mb-16">
      <p className="text-caption text-primary font-semibold mb-3 uppercase tracking-wider">
        Benefícios
      </p>
      <h2 className="text-section text-foreground mb-4">
        O que muda na prática (e por que o associado sente isso)
      </h2>
    </AnimatedBlock>

    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-20"
    >
      {benefits.map((b) => (
        <motion.div
          key={b.title}
          variants={itemVariants}
          className="p-8 rounded-2xl bg-card shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 will-change-transform"
        >
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
            <b.icon className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-card-title text-card-foreground mb-2">{b.title}</h3>
          <p className="text-body text-muted-foreground max-w-[45ch]">{b.desc}</p>
        </motion.div>
      ))}
    </motion.div>

    {/* Differentials */}
    <AnimatedBlock delay={0.15}>
      <div className="text-center mb-10">
        <p className="text-caption text-primary font-semibold mb-3 uppercase tracking-wider">
          Diferenciais
        </p>
        <h3 className="text-card-title text-foreground text-xl">
          Não é "mais um sistema". É um portal pensado para rede.
        </h3>
        <p className="text-body text-muted-foreground max-w-2xl mx-auto mt-2">
          A Bahdev nasce da realidade de associações e cooperativas: demanda alta, múltiplas unidades, necessidade de governança e velocidade ao mesmo tempo.
        </p>
      </div>
    </AnimatedBlock>

    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto"
    >
      {differentials.map((d) => (
        <motion.div
          key={d.title}
          variants={itemVariants}
          className="p-6 rounded-2xl bg-primary/5 border border-primary/10"
        >
          <h4 className="text-sm font-bold text-foreground mb-1">{d.title}</h4>
          <p className="text-sm text-muted-foreground">{d.desc}</p>
        </motion.div>
      ))}
    </motion.div>
  </SectionWrapper>
);

export default Benefits;
