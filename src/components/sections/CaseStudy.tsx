import { motion } from "framer-motion";
import { SectionWrapper, AnimatedBlock, containerVariants, itemVariants } from "./SectionWrapper";
import { Button } from "@/components/ui/button";
import { ArrowRight, Store, Radio, BarChart3, Rocket, Eye, Paintbrush, Quote } from "lucide-react";
import farmaciasDashboard from "@/assets/farmacias-evento.png";
import farmaciasPortal from "@/assets/farmacias-portal.png";
import farmaciasMapa from "@/assets/farmacias-mapa.png";
import farmaciasLogo from "@/assets/farmacias-logo.png";
import farmaciaDiretorExecutivo from "@/assets/farmacia-diretor-executivo.jpg";

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

const CaseStudy = () => {
  return (
    <>
      <SectionWrapper className="bg-white py-10 md:py-12">
        <AnimatedBlock className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6 lg:gap-8 items-center rounded-xl border border-border bg-card p-4 md:p-6 shadow-card">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs text-primary font-semibold mb-3 uppercase tracking-wider">
                <Quote className="h-3.5 w-3.5" />
                Visão executiva
              </span>
              <h3 className="text-card-title text-card-foreground mb-3">Resultado percebido pela liderança</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                Depoimento sobre mais visibilidade, transparência e autonomia para as lojas associadas após a implantação do portal.
              </p>
            </div>

            <figure className="rounded-lg p-2">
              <div className="overflow-hidden rounded-md bg-muted">
                <img
                  src={farmaciaDiretorExecutivo}
                  alt="Depoimento de Paulo Marcos Lopes, Diretor Executivo Comercial das Farmácias Associadas"
                  className="w-full h-auto object-contain"
                  loading="lazy"
                />
              </div>
            </figure>
          </div>
        </AnimatedBlock>
      </SectionWrapper>

      <SectionWrapper className="bg-section-dark py-10 md:py-12" id="case">
        <AnimatedBlock className="text-center mb-7">
          <p className="text-caption font-semibold mb-2 uppercase tracking-wider opacity-60">Case de sucesso</p>
          <h2 className="text-section">Operação com visibilidade total</h2>
        </AnimatedBlock>

        {/* Client card */}
        <AnimatedBlock className="max-w-4xl mx-auto mb-7">
          <div className="p-4 md:p-5 rounded-xl border border-muted/10 bg-muted/5">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="shrink-0 w-28 h-14 bg-card rounded-xl flex items-center justify-center p-2">
                <img src={farmaciasLogo} alt="Farmácias Associadas" className="max-h-full max-w-full object-contain" />
              </div>
              <div className="flex-1">
                <h3 className="text-card-title mb-1">Farmácias Associadas</h3>
                <p className="text-xs opacity-60">Portal · Campanhas · Indicadores</p>
              </div>
              <div className="grid grid-cols-3 gap-4 md:min-w-[330px]">
                <div>
                  <p className="text-lg md:text-xl font-extrabold text-accent">+1.900</p>
                  <p className="text-[11px] opacity-60">lojas</p>
                </div>
                <div>
                  <p className="text-lg md:text-xl font-extrabold">Padrão</p>
                  <p className="text-[11px] opacity-60">execução</p>
                </div>
                <div>
                  <p className="text-lg md:text-xl font-extrabold">Central</p>
                  <p className="text-[11px] opacity-60">comunicação</p>
                </div>
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
          className="grid md:grid-cols-3 gap-3 max-w-4xl mx-auto mb-7"
        >
          {highlights.map((h) => (
            <motion.div key={h.title} variants={itemVariants} className="flex items-center gap-3 p-4 rounded-xl border border-muted/10 bg-muted/5">
              <h.icon className="h-5 w-5 text-accent shrink-0" />
              <h4 className="text-sm font-bold">{h.title}</h4>
            </motion.div>
          ))}
        </motion.div>

        {/* Deliverables */}
        <div className="space-y-10 max-w-4xl mx-auto">
          {deliverables.map((d, i) => (
            <AnimatedBlock key={d.title} delay={i * 0.08}>
              <div className="grid lg:grid-cols-2 gap-6 items-center">
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

        <AnimatedBlock className="text-center mt-8">
          <Button variant="hero" size="lg" className="text-white" asChild>
            <a href="#demo">
              Fale conosco
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </AnimatedBlock>
      </SectionWrapper>
    </>
  );
};

export default CaseStudy;
