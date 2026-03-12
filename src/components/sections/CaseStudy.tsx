import { SectionWrapper, AnimatedBlock } from "./SectionWrapper";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingDown, Eye as EyeIcon, DollarSign } from "lucide-react";

const metrics = [
  { icon: TrendingDown, value: "40%", label: "Redução no retrabalho" },
  { icon: EyeIcon, value: "98%", label: "Visibilidade das solicitações" },
  { icon: DollarSign, value: "R$ 1.2M", label: "Em campanhas gerenciadas" },
];

const CaseStudy = () => (
  <SectionWrapper className="bg-section-dark" id="case">
    <div className="grid lg:grid-cols-2 gap-16 items-center">
      <AnimatedBlock>
        <p className="text-caption font-semibold mb-3 uppercase tracking-wider opacity-60">
          Case de sucesso
        </p>
        <h2 className="text-section mb-6">
          De solicitações perdidas a uma operação com visibilidade total
        </h2>
        <p className="text-body opacity-70 max-w-[55ch] mb-6">
          Uma rede com mais de 120 unidades enfrentava retrabalho constante,
          aprovações perdidas em e-mail e nenhum indicador consolidado.
          Com a Bahdev, centralizaram comunicação, workflows e métricas em uma
          única plataforma — e os resultados apareceram em semanas.
        </p>
        <Button variant="hero" size="lg" asChild>
          <a href="#demo">
            Quero ver no meu cenário
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </Button>
      </AnimatedBlock>

      <AnimatedBlock delay={0.2}>
        <div className="grid gap-6">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="flex items-center gap-6 p-6 rounded-2xl border border-muted/10 bg-muted/5"
            >
              <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center shrink-0">
                <m.icon className="h-7 w-7 text-accent" />
              </div>
              <div>
                <p className="text-3xl font-extrabold tabular-nums">{m.value}</p>
                <p className="text-caption opacity-60">{m.label}</p>
              </div>
            </div>
          ))}
        </div>
      </AnimatedBlock>
    </div>
  </SectionWrapper>
);

export default CaseStudy;
