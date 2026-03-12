import { motion } from "framer-motion";
import { SectionWrapper, AnimatedBlock, containerVariants, itemVariants } from "./SectionWrapper";
import { Search, Settings, Rocket, GraduationCap, TrendingUp } from "lucide-react";

const steps = [
  { icon: Search, number: "01", title: "Diagnóstico", description: "Mapeamos seu cenário, fluxos e principais gargalos operacionais." },
  { icon: Settings, number: "02", title: "Configuração", description: "Parametrizamos a plataforma com seus módulos, perfis e regras." },
  { icon: Rocket, number: "03", title: "Implantação gradual", description: "Ativamos por grupos de unidades para garantir adoção segura." },
  { icon: GraduationCap, number: "04", title: "Treinamento prático", description: "Capacitamos a equipe com treinamento objetivo e materiais de apoio." },
  { icon: TrendingUp, number: "05", title: "Evolução contínua", description: "Novos módulos e ajustes conforme a operação amadurece." },
];

const HowItWorks = () => (
  <SectionWrapper className="bg-muted/50" id="como-funciona">
    <AnimatedBlock className="text-center mb-16">
      <p className="text-caption text-primary font-semibold mb-3 uppercase tracking-wider">
        Como funciona
      </p>
      <h2 className="text-section text-foreground mb-4">
        Da complexidade à clareza em 5 passos
      </h2>
      <p className="text-body text-muted-foreground max-w-2xl mx-auto">
        Um processo consultivo que reduz fricção e garante adoção real.
      </p>
    </AnimatedBlock>

    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto"
    >
      {steps.map((step) => (
        <motion.div
          key={step.number}
          variants={itemVariants}
          className="text-center p-6"
        >
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <step.icon className="h-6 w-6 text-primary" />
          </div>
          <span className="text-caption text-primary font-bold">{step.number}</span>
          <h3 className="text-card-title text-foreground mt-1 mb-2">{step.title}</h3>
          <p className="text-sm text-muted-foreground">{step.description}</p>
        </motion.div>
      ))}
    </motion.div>
  </SectionWrapper>
);

export default HowItWorks;
