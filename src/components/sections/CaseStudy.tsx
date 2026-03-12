import { motion } from "framer-motion";
import { SectionWrapper, AnimatedBlock, containerVariants, itemVariants } from "./SectionWrapper";
import { Button } from "@/components/ui/button";
import { ArrowRight, Store, Radio, BarChart3, Rocket, Eye, Paintbrush } from "lucide-react";
import farmaciasDashboard from "@/assets/farmacias-dashboard.png";
import farmaciasPortal from "@/assets/farmacias-portal.png";
import farmaciasMapa from "@/assets/farmacias-mapa.png";
import farmaciasLogo from "@/assets/farmacias-logo.png";

const highlights = [
  { icon: Radio, title: "Fonte única de verdade", desc: "Campanhas e comunicados no portal, com histórico." },
  { icon: Store, title: "Padrão em escala", desc: "Materiais e rotinas replicáveis em toda a rede." },
  { icon: BarChart3, title: "Visibilidade para gestão", desc: "Acompanhamento por unidade/região com indicadores." },
];

const deliverables = [
  { icon: Rocket, label: "Lançamento", title: "Novo Portal do Associado", desc: "Comunicação, acesso e organização para o dia a dia.", image: farmaciasPortal },
  { icon: Eye, label: "Visibilidade", title: "Comercial direto", desc: "Campanhas, ofertas e informações que geram resultado.", image: farmaciasDashboard },
  { icon: Paintbrush, label: "Personalização", title: "Mapa da rede", desc: "Visualização geográfica das lojas com identidade visual.", image: farmaciasMapa },
];

const CaseStudy = () => (
  <SectionWrapper className="bg-section-dark" id="case">
    <AnimatedBlock className="text-center mb-10">
      <p className="text-caption font-semibold mb-2 uppercase tracking-wider opacity-60">Case de sucesso</p>
      <h2 className="text-section">Operação com visibilidade total</h2>
    </AnimatedBlock>

    {/* Client card */}
    <AnimatedBlock className="max-w-4xl mx-auto mb-12">
      <div className="p-6 md:p-8 rounded-xl border border-muted/10 bg-muted/5">
        <div className="flex flex-col md:flex-row items-start gap-6 mb-6">
          <div className="shrink-0 w-32 h-16 bg-card rounded-xl flex items-center justify-center p-2">
            <img src={farmaciasLogo} alt="Farmácias Associadas" className="max-h-full max-w-full object-contain" />
          </div>
          <div className="flex-1">
            <h3 className="text-card-title mb-1">Farmácias Associadas</h3>
            <p className="text-xs opacity-60 mb-3">Portal · Campanhas · Workflow · Indicadores</p>
            <blockquote className="text-sm opacity-80 italic border-l-2 border-accent pl-3 mb-3">
              "Quando o associado enxerga o que está acontecendo, a confiança vira parceria."
            </blockquote>
            <p className="text-sm opacity-70 max-w-[55ch]">
              A rede ganhou fluxo claro para campanhas, materiais e execução. Menos ruído, mais padrão.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 pt-5 border-t border-muted/10">
          <div className="text-center">
            <p className="text-xl md:text-2xl font-extrabold text-accent">+1.900</p>
            <p className="text-xs opacity-60">lojas</p>
          </div>
          <div className="text-center">
            <p className="text-xl md:text-2xl font-extrabold">Padrão</p>
            <p className="text-xs opacity-60">na execução</p>
          </div>
          <div className="text-center">
            <p className="text-xl md:text-2xl font-extrabold">Central</p>
            <p className="text-xs opacity-60">comunicação</p>
          </div>
        </div>
      </div>
    </AnimatedBlock>

    {/* Highlights */}
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-12"
    >
      {highlights.map((h) => (
        <motion.div key={h.title} variants={itemVariants} className="p-5 rounded-xl border border-muted/10 bg-muted/5">
          <h.icon className="h-5 w-5 mb-2 text-accent" />
          <h4 className="text-sm font-bold mb-1">{h.title}</h4>
          <p className="text-xs opacity-60">{h.desc}</p>
        </motion.div>
      ))}
    </motion.div>

    {/* Deliverables */}
    <div className="space-y-10 max-w-4xl mx-auto">
      {deliverables.map((d, i) => (
        <AnimatedBlock key={d.title} delay={i * 0.08}>
          <div className={`grid lg:grid-cols-2 gap-6 items-center`}>
            <div className={i % 2 === 1 ? "lg:order-2" : ""}>
              <span className="inline-flex items-center gap-1.5 text-xs text-accent font-semibold mb-2">
                <d.icon className="h-3.5 w-3.5" />
                {d.label}
              </span>
              <h3 className="text-sm font-bold mb-1">{d.title}</h3>
              <p className="text-sm opacity-70 max-w-[45ch]">{d.desc}</p>
            </div>
            <div className={i % 2 === 1 ? "lg:order-1" : ""}>
              <div className="rounded-xl overflow-hidden shadow-product">
                <img src={d.image} alt={d.title} className="w-full h-auto" loading="lazy" />
              </div>
            </div>
          </div>
        </AnimatedBlock>
      ))}
    </div>

    <AnimatedBlock className="text-center mt-10">
      <Button variant="hero" size="lg" className="text-white" asChild>
        <a href="#demo">
          Quero ver no meu cenário
          <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </Button>
    </AnimatedBlock>
  </SectionWrapper>
);

export default CaseStudy;
