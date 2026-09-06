import { motion } from "framer-motion";
import { SectionWrapper, AnimatedBlock, Eyebrow, containerVariants, itemVariants } from "./SectionWrapper";
import { Search, Settings, GraduationCap, Rocket, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const steps = [
  { icon: Search, num: "01", title: "Diagnóstico", desc: "Mapeamos gargalos e rotinas." },
  { icon: Settings, num: "02", title: "Configuração", desc: "Perfis, fluxos e indicadores." },
  { icon: GraduationCap, num: "03", title: "Treinamento Capacitação", desc: "Equipe aprende com casos reais." },
  { icon: Rocket, num: "04", title: "Implantação", desc: "Começa pelo que mais dói." },
  { icon: TrendingUp, num: "05", title: "Evolução", desc: "Novos módulos conforme a maturidade." },
];

const quickWins = [
  { title: "Comunicação oficial + histórico", desc: "Um lugar único para avisos e campanhas — sem mensagens perdidas." },
  { title: "Pedidos com aprovação", desc: "Fluxos com responsáveis, prazos e rastreio — sem planilha." },
  { title: "Indicadores em tempo real", desc: "Painéis por unidade/região para decisões sem relatórios manuais." },
];

const HowItWorks = () => (
  <SectionWrapper
    className="bg-[radial-gradient(circle_at_bottom_left,hsl(var(--accent)/0.1),transparent_45%),linear-gradient(180deg,hsl(var(--muted)/0.6),hsl(var(--muted)/0.3))]"
    id="como-funciona"
  >
    <AnimatedBlock className="text-center mb-10">
      <Eyebrow>Como funciona</Eyebrow>
      <h2 className="text-section text-foreground mb-3">Implantação rápida, evolução contínua</h2>
      <p className="text-body text-muted-foreground max-w-xl mx-auto">
        Não precisa mudar tudo de uma vez. A Bahdev organiza o essencial e evolui com sua operação.
      </p>
    </AnimatedBlock>

    <div className="relative max-w-5xl mx-auto mb-10">
      <div className="hidden lg:block absolute top-[26px] left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent" />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
      >
        {steps.map((step) => (
          <motion.div
            key={step.num}
            variants={itemVariants}
            className="relative text-center p-5 rounded-2xl bg-card border border-border/60 shadow-card hover:shadow-card-hover hover:border-primary/25 transition-all"
          >
            <div className="relative w-[52px] h-[52px] mx-auto mb-3">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-primary to-primary-deep flex items-center justify-center shadow-lg shadow-primary/25">
                <step.icon className="h-5 w-5 text-white" />
              </div>
              <span className="absolute -top-1 -right-1.5 grid place-items-center h-5 min-w-5 rounded-full bg-accent text-[10px] font-extrabold text-foreground px-1">
                {step.num}
              </span>
            </div>
            <h3 className="text-sm font-bold text-foreground mb-1">{step.title}</h3>
            <p className="text-xs text-muted-foreground">{step.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>

    {/* Quick wins */}
    <AnimatedBlock delay={0.1} className="max-w-4xl mx-auto mb-10">
      <h3 className="text-sm font-bold text-foreground text-center mb-1">O que você ganha rápido</h3>
      <p className="text-xs text-muted-foreground text-center mb-6">Primeiros resultados que geram confiança.</p>
      <div className="grid md:grid-cols-3 gap-4">
        {quickWins.map((w) => (
          <div key={w.title} className="p-5 rounded-xl bg-card shadow-card">
            <h4 className="text-sm font-bold text-foreground mb-1">{w.title}</h4>
            <p className="text-xs text-muted-foreground">{w.desc}</p>
          </div>
        ))}
      </div>
    </AnimatedBlock>

    <AnimatedBlock className="text-center">
      <Button variant="hero" size="lg" asChild>
        <a href="#demo">
          Fale conosco
          <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </Button>
    </AnimatedBlock>
  </SectionWrapper>
);

export default HowItWorks;
