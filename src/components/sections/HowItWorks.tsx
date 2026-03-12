import { motion } from "framer-motion";
import { SectionWrapper, AnimatedBlock, containerVariants, itemVariants } from "./SectionWrapper";
import { Search, Settings, Rocket, GraduationCap, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const steps = [
  { icon: Search, number: "01", title: "Diagnóstico do cenário", description: "Mapeamos comunicação, pedidos, rotinas e gargalos por área e por unidade." },
  { icon: Settings, number: "02", title: "Configuração da plataforma", description: "Perfis, permissões, fluxos e visão inicial de indicadores." },
  { icon: GraduationCap, number: "03", title: "Treinamento prático", description: "Time interno e pontos focais aprendem usando casos reais." },
  { icon: Rocket, number: "04", title: "Implantação gradual", description: "Começa pelo que mais dói: comunicação, campanhas, workflow e visibilidade." },
  { icon: TrendingUp, number: "05", title: "Evolução contínua", description: "Ajustes, novos módulos, integrações e maturidade de dados." },
];

const quickWins = [
  { title: "Comunicação oficial + histórico", desc: "Um lugar único para avisos, circulares e campanhas — reduzindo dúvidas e 'mensagens perdidas'." },
  { title: "Pedidos com aprovação (sem planilha)", desc: "Fluxos com responsáveis, prazos, status e rastreio — reduzindo retrabalho e cobranças." },
  { title: "Indicadores que mostram o 'agora'", desc: "Painéis por unidade/região para dar visibilidade e apoiar decisões sem depender de 'consolidar na mão'." },
];

const HowItWorks = () => (
  <SectionWrapper className="bg-muted/50" id="como-funciona">
    <AnimatedBlock className="text-center mb-16">
      <p className="text-caption text-primary font-semibold mb-3 uppercase tracking-wider">
        Como funciona
      </p>
      <h2 className="text-section text-foreground mb-4">
        Implantação com pé no chão: rápida no essencial, madura no contínuo
      </h2>
      <p className="text-body text-muted-foreground max-w-2xl mx-auto">
        Você não precisa "mudar tudo de uma vez". A Bahdev entra organizando o que mais gera ruído e evolui junto com sua operação.
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

    {/* Quick wins */}
    <AnimatedBlock delay={0.15} className="max-w-5xl mx-auto mt-16">
      <h3 className="text-card-title text-foreground text-center mb-2">
        O que você ganha rápido
      </h3>
      <p className="text-sm text-muted-foreground text-center mb-8">Primeiros "wins" que geram confiança.</p>
      <div className="grid md:grid-cols-3 gap-6">
        {quickWins.map((w) => (
          <div key={w.title} className="p-6 rounded-2xl bg-card shadow-card">
            <h4 className="text-sm font-bold text-foreground mb-2">{w.title}</h4>
            <p className="text-sm text-muted-foreground">{w.desc}</p>
          </div>
        ))}
      </div>
    </AnimatedBlock>

    <AnimatedBlock delay={0.2} className="text-center mt-12">
      <Button variant="hero" size="lg" asChild>
        <a href="#demo">
          Quero um plano de implantação
          <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </Button>
      <p className="text-xs text-muted-foreground/60 mt-3">
        Resposta rápida. Sem compromisso. A ideia é entender seu cenário e sugerir o melhor caminho.
      </p>
    </AnimatedBlock>
  </SectionWrapper>
);

export default HowItWorks;
