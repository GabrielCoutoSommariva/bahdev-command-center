import { motion } from "framer-motion";
import { SectionWrapper, AnimatedBlock, Eyebrow, containerVariants, itemVariants } from "./SectionWrapper";
import { MessageSquareWarning, Repeat, Eye, AlertTriangle } from "lucide-react";

const pains = [
  { icon: MessageSquareWarning, title: "Comunicação fragmentada", description: "Informação espalhada em WhatsApp, e-mail e planilhas." },
  { icon: Repeat, title: "Retrabalho constante", description: "Solicitações duplicadas e processos sem rastreio." },
  { icon: Eye, title: "Baixa visibilidade", description: "Decisões por percepção, não por dados reais." },
  { icon: AlertTriangle, title: "Operação sem padrão", description: "Cada unidade faz de um jeito. Controle inexistente." },
];

const PainPoints = () => (
  <SectionWrapper className="bg-section-dark" id="dores">
    <AnimatedBlock className="text-center mb-10">
      <Eyebrow tone="dark">Reconhece esse cenário?</Eyebrow>
      <h2 className="text-section">Os sinais de uma operação sem controle</h2>
    </AnimatedBlock>

    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto"
    >
      {pains.map((pain) => (
        <motion.div key={pain.title} variants={itemVariants} className="p-5 md:p-6 rounded-xl border border-muted/10 bg-muted/5">
          <pain.icon className="h-6 w-6 mb-3 text-accent" />
          <h3 className="text-sm font-bold mb-1">{pain.title}</h3>
          <p className="text-xs md:text-sm opacity-70">{pain.description}</p>
        </motion.div>
      ))}
    </motion.div>
  </SectionWrapper>
);

export default PainPoints;
