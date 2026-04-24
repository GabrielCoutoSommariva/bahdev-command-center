import { motion } from "framer-motion";
import { SectionWrapper, AnimatedBlock, containerVariants, itemVariants } from "./SectionWrapper";
import { Target, Eye, MessageSquare, Briefcase, Sparkles, TrendingUp, Handshake, Database } from "lucide-react";

const values = [
  { icon: MessageSquare, title: "Clareza acima de ruído", desc: "Comunicação organizada gera entendimento, confiança e resultados." },
  { icon: Briefcase, title: "Visão de negócio", desc: "Tecnologia só faz sentido quando resolve problemas reais e gera impacto." },
  { icon: Sparkles, title: "Simplicidade com inteligência", desc: "Sistemas intuitivos, sem perder profundidade e poder." },
  { icon: TrendingUp, title: "Evolução contínua", desc: "Melhoramos todos os dias: produto, processos e pessoas." },
  { icon: Handshake, title: "Parceria de verdade", desc: "Crescemos junto com nossos clientes, com transparência e compromisso." },
  { icon: Database, title: "Dados com propósito", desc: "Informação bem estruturada orienta decisões melhores." },
];

const MissionVisionValues = () => (
  <SectionWrapper id="missao-visao-valores" className="bg-section-dark">
    <AnimatedBlock className="text-center mb-12">
      <p className="text-caption text-primary font-semibold mb-2 uppercase tracking-wider">Quem somos</p>
      <h2 className="text-section text-foreground">Missão, Visão e Valores</h2>
      <p className="text-body text-muted-foreground mt-3 max-w-2xl mx-auto">
        Os princípios que guiam tudo o que construímos na Bahdev.
      </p>
    </AnimatedBlock>

    <div className="grid md:grid-cols-2 gap-5 md:gap-6 mb-12 max-w-5xl mx-auto">
      <AnimatedBlock>
        <div className="h-full p-7 md:p-8 rounded-2xl bg-card shadow-card border border-border">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
            <Target className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-card-title text-foreground mb-3">Missão</h3>
          <p className="text-body text-muted-foreground">
            Criar soluções digitais inteligentes que organizam a comunicação, fortalecem a gestão e conectam pessoas e negócios de forma simples, eficiente e estratégica.
          </p>
        </div>
      </AnimatedBlock>

      <AnimatedBlock delay={0.1}>
        <div className="h-full p-7 md:p-8 rounded-2xl bg-card shadow-card border border-border">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
            <Eye className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-card-title text-foreground mb-3">Visão</h3>
          <p className="text-body text-muted-foreground">
            Ser referência em plataformas digitais que transformam a forma como organizações se comunicam, tomam decisões e geram valor para seus associados, clientes e parceiros.
          </p>
        </div>
      </AnimatedBlock>
    </div>

    <AnimatedBlock className="text-center mb-8">
      <p className="text-caption text-primary font-semibold mb-2 uppercase tracking-wider">Valores</p>
      <h3 className="text-card-title text-foreground">O que nos move</h3>
    </AnimatedBlock>

    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-5xl mx-auto"
    >
      {values.map((v) => (
        <motion.div
          key={v.title}
          variants={itemVariants}
          className="p-5 md:p-6 rounded-xl bg-card shadow-card hover:shadow-card-hover transition-shadow border border-border"
        >
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
            <v.icon className="h-5 w-5 text-primary" />
          </div>
          <h4 className="text-sm md:text-base font-bold text-card-foreground mb-1.5">{v.title}</h4>
          <p className="text-xs md:text-sm text-muted-foreground">{v.desc}</p>
        </motion.div>
      ))}
    </motion.div>
  </SectionWrapper>
);

export default MissionVisionValues;