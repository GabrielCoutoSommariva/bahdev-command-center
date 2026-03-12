import { motion } from "framer-motion";
import { SectionWrapper, AnimatedBlock, containerVariants, itemVariants } from "./SectionWrapper";
import { Volume2, Eye, Layers, Zap, LineChart, Expand } from "lucide-react";

const benefits = [
  { icon: Volume2, title: "Menos ruído, mais clareza", desc: "A informação certa chega ao lugar certo, sem se perder entre canais." },
  { icon: Eye, title: "Visibilidade para a gestão", desc: "Dashboards em tempo real mostram o status de toda a operação." },
  { icon: Layers, title: "Mais padrão entre unidades", desc: "Processos unificados garantem qualidade consistente na rede." },
  { icon: Zap, title: "Mais produtividade", desc: "Automações e workflows eliminam o retrabalho manual." },
  { icon: LineChart, title: "Decisão baseada em dados", desc: "Indicadores reais substituem percepções e achismos." },
  { icon: Expand, title: "Escala sem caos", desc: "Cresça a rede sem perder controle, governança ou padrão." },
];

const Benefits = () => (
  <SectionWrapper id="beneficios">
    <AnimatedBlock className="text-center mb-16">
      <p className="text-caption text-primary font-semibold mb-3 uppercase tracking-wider">
        Benefícios
      </p>
      <h2 className="text-section text-foreground mb-4">
        O que muda quando a operação ganha visibilidade
      </h2>
    </AnimatedBlock>

    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
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
  </SectionWrapper>
);

export default Benefits;
