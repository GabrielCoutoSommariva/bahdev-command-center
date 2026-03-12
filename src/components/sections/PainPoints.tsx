import { motion } from "framer-motion";
import { SectionWrapper, AnimatedBlock, containerVariants, itemVariants } from "./SectionWrapper";
import { AlertTriangle, Eye, MessageSquareWarning, Repeat, BarChart3, ShieldAlert } from "lucide-react";

const pains = [
  {
    icon: MessageSquareWarning,
    title: "Comunicação fragmentada",
    description: "WhatsApp, e-mail, ligação, planilha. A informação se perde entre canais e ninguém sabe o status real.",
  },
  {
    icon: Repeat,
    title: "Retrabalho constante",
    description: "Solicitações duplicadas, aprovações sem rastreio e processos que recomeçam do zero a cada nova demanda.",
  },
  {
    icon: Eye,
    title: "Baixa visibilidade",
    description: "A diretoria não enxerga o que acontece na ponta. Decisões são tomadas por percepção, não por dados.",
  },
  {
    icon: ShieldAlert,
    title: "Perda de padrão",
    description: "Cada unidade opera de um jeito. Não existe governança, e a qualidade da entrega varia de filial para filial.",
  },
  {
    icon: BarChart3,
    title: "Indicadores inexistentes",
    description: "Sem dashboards, sem métricas consolidadas. A gestão fica refém de relatórios manuais atrasados.",
  },
  {
    icon: AlertTriangle,
    title: "Decisão por improviso",
    description: "Sem um sistema central, cada problema gera uma solução pontual. A operação cresce, mas o controle não acompanha.",
  },
];

const PainPoints = () => (
  <SectionWrapper className="bg-section-dark" id="dores">
    <AnimatedBlock className="text-center mb-16">
      <p className="text-caption font-semibold mb-3 uppercase tracking-wider opacity-60">
        Reconhece esse cenário?
      </p>
      <h2 className="text-section">
        Os sinais de uma operação sem controle
      </h2>
    </AnimatedBlock>

    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
    >
      {pains.map((pain) => (
        <motion.div
          key={pain.title}
          variants={itemVariants}
          className="p-8 rounded-2xl border border-muted/10 bg-muted/5 hover:-translate-y-1 hover:bg-muted/10 transition-all duration-200"
        >
          <pain.icon className="h-8 w-8 mb-4 text-accent" />
          <h3 className="text-card-title mb-2">{pain.title}</h3>
          <p className="text-body opacity-70 max-w-[45ch]">{pain.description}</p>
        </motion.div>
      ))}
    </motion.div>
  </SectionWrapper>
);

export default PainPoints;
