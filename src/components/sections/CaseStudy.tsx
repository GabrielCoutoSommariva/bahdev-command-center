import { motion } from "framer-motion";
import { SectionWrapper, AnimatedBlock, containerVariants, itemVariants } from "./SectionWrapper";
import { Button } from "@/components/ui/button";
import { ArrowRight, Store, Radio, BarChart3, Rocket, Eye, Paintbrush } from "lucide-react";
import farmaciasDashboard from "@/assets/farmacias-dashboard.png";
import farmaciasPortal from "@/assets/farmacias-portal.png";
import farmaciasMapa from "@/assets/farmacias-mapa.png";
import farmaciasLogo from "@/assets/farmacias-logo.png";

const highlights = [
  {
    icon: Radio,
    title: "Fonte única de verdade",
    desc: "Campanhas e comunicados no portal, com histórico e organização.",
  },
  {
    icon: Store,
    title: "Padrão em escala",
    desc: "Materiais e rotinas replicáveis sem 'cada loja faz de um jeito'.",
  },
  {
    icon: BarChart3,
    title: "Visibilidade para gestão",
    desc: "Acompanhamento por unidade/região com indicadores claros.",
  },
];

const deliverables = [
  {
    icon: Rocket,
    label: "Lançamento",
    title: "Novo Portal do Associado",
    desc: "Uma nova experiência de comunicação, acesso e organização pensada para facilitar o dia a dia dos associados.",
    image: farmaciasPortal,
  },
  {
    icon: Eye,
    label: "Visibilidade",
    title: "Comercial direto",
    desc: "O portal foi pensado para destacar campanhas, ofertas e informações que geram mais resultado para os associados.",
    image: farmaciasDashboard,
  },
  {
    icon: Paintbrush,
    label: "Personalização",
    title: "Mapa personalizado da rede",
    desc: "Visualização geográfica das lojas com identidade visual da rede, facilitando entendimento, comunicação e visão estratégica.",
    image: farmaciasMapa,
  },
];

const CaseStudy = () => (
  <SectionWrapper className="bg-section-dark" id="case">
    {/* Header */}
    <AnimatedBlock className="text-center mb-16">
      <p className="text-caption font-semibold mb-3 uppercase tracking-wider opacity-60">
        Case de sucesso
      </p>
      <h2 className="text-section mb-6">
        De solicitações perdidas a uma operação com visibilidade total
      </h2>
    </AnimatedBlock>

    {/* Client card */}
    <AnimatedBlock className="max-w-4xl mx-auto mb-20">
      <div className="p-8 md:p-12 rounded-2xl border border-muted/10 bg-muted/5">
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="shrink-0 w-40 h-20 bg-card rounded-xl flex items-center justify-center p-3">
            <img src={farmaciasLogo} alt="Farmácias Associadas" className="max-h-full max-w-full object-contain" />
          </div>
          <div className="flex-1">
            <h3 className="text-card-title mb-1">Farmácias Associadas</h3>
            <p className="text-caption opacity-60 mb-4">
              Portal do associado · Campanhas · Workflow · Indicadores
            </p>
            <blockquote className="text-body opacity-80 italic border-l-2 border-accent pl-4 mb-6">
              "Quando o associado enxerga o que está acontecendo, a confiança vira parceria."
            </blockquote>
            <p className="text-body opacity-70 max-w-[60ch]">
              Com a Bahdev, a rede ganhou um fluxo claro para comunicar campanhas,
              distribuir materiais e acompanhar execução. Menos ruído, mais padrão —
              e decisões com base em visões consolidadas.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-muted/10">
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-extrabold tabular-nums text-accent">+1.900</p>
            <p className="text-caption opacity-60 mt-1">lojas</p>
          </div>
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-extrabold">Execução</p>
            <p className="text-caption opacity-60 mt-1">com padrão</p>
          </div>
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-extrabold">Comunicação</p>
            <p className="text-caption opacity-60 mt-1">centralizada</p>
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
      className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-20"
    >
      {highlights.map((h) => (
        <motion.div
          key={h.title}
          variants={itemVariants}
          className="p-6 rounded-2xl border border-muted/10 bg-muted/5"
        >
          <h.icon className="h-7 w-7 mb-3 text-accent" />
          <h4 className="text-card-title mb-1">{h.title}</h4>
          <p className="text-sm opacity-60">{h.desc}</p>
        </motion.div>
      ))}
    </motion.div>

    {/* Deliverables with screenshots */}
    <div className="space-y-16 max-w-5xl mx-auto">
      {deliverables.map((d, i) => (
        <AnimatedBlock key={d.title} delay={i * 0.1}>
          <div className={`grid lg:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? "lg:direction-rtl" : ""}`}>
            <div className={i % 2 === 1 ? "lg:order-2" : ""}>
              <span className="inline-flex items-center gap-1.5 text-caption text-accent font-semibold mb-3">
                <d.icon className="h-4 w-4" />
                {d.label}
              </span>
              <h3 className="text-card-title text-lg mb-2">{d.title}</h3>
              <p className="text-body opacity-70 max-w-[50ch]">{d.desc}</p>
            </div>
            <div className={i % 2 === 1 ? "lg:order-1" : ""}>
              <div className="rounded-xl overflow-hidden shadow-product">
                <img
                  src={d.image}
                  alt={d.title}
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </AnimatedBlock>
      ))}
    </div>

    {/* CTA */}
    <AnimatedBlock className="text-center mt-16">
      <Button variant="hero" size="xl" asChild>
        <a href="#demo">
          Quero ver no meu cenário
          <ArrowRight className="ml-2 h-5 w-5" />
        </a>
      </Button>
    </AnimatedBlock>
  </SectionWrapper>
);

export default CaseStudy;
