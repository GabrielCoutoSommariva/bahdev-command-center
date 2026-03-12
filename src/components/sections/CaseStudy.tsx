import { SectionWrapper, AnimatedBlock } from "./SectionWrapper";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import farmaciasLogo from "@/assets/farmacias-logo.png";
import farmaciasPortal from "@/assets/farmacias-portal.png";

const CaseStudy = () => (
  <SectionWrapper className="bg-section-dark" id="case">
    <AnimatedBlock className="text-center mb-10">
      <p className="text-caption font-semibold mb-2 uppercase tracking-wider opacity-60">Case de sucesso</p>
      <h2 className="text-section">Operação com visibilidade total</h2>
    </AnimatedBlock>

    <AnimatedBlock className="max-w-4xl mx-auto">
      <div className="p-6 md:p-10 rounded-2xl border border-muted/10 bg-muted/5">
        <div className="flex flex-col md:flex-row items-start gap-6 mb-6">
          <div className="shrink-0 w-32 h-16 bg-card rounded-xl flex items-center justify-center p-2">
            <img src={farmaciasLogo} alt="Farmácias Associadas" className="max-h-full max-w-full object-contain" />
          </div>
          <div className="flex-1">
            <h3 className="text-card-title mb-1">Farmácias Associadas</h3>
            <p className="text-xs opacity-60 mb-3">Portal · Campanhas · Workflow · Indicadores</p>
            <blockquote className="text-sm opacity-80 italic border-l-2 border-accent pl-3 mb-4">
              "Quando o associado enxerga o que está acontecendo, a confiança vira parceria."
            </blockquote>
            <p className="text-sm opacity-70 max-w-[55ch]">
              A rede ganhou fluxo claro para campanhas, materiais e execução. Menos ruído, mais padrão.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-muted/10">
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

    <AnimatedBlock delay={0.15} className="max-w-4xl mx-auto mt-8">
      <div className="rounded-xl overflow-hidden shadow-product">
        <img src={farmaciasPortal} alt="Portal do Associado — Farmácias Associadas" className="w-full h-auto" loading="lazy" />
      </div>
    </AnimatedBlock>

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
