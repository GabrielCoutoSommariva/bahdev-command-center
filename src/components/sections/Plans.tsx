import { SectionWrapper, AnimatedBlock } from "./SectionWrapper";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Essencial",
    description: "Para redes que estão começando a centralizar.",
    features: ["Portal do associado", "Comunicação centralizada", "Até 20 unidades", "Suporte por e-mail"],
    highlighted: false,
  },
  {
    name: "Profissional",
    description: "Para operações que exigem controle e governança.",
    features: ["Tudo do Essencial", "Workflows e aprovações", "Dashboards e indicadores", "Até 100 unidades", "Suporte prioritário"],
    highlighted: true,
  },
  {
    name: "Enterprise",
    description: "Para redes grandes com necessidades avançadas.",
    features: ["Tudo do Profissional", "Gestão de campanhas", "Integrações customizadas", "Unidades ilimitadas", "Gerente de conta dedicado"],
    highlighted: false,
  },
];

const Plans = () => (
  <SectionWrapper className="bg-muted/50" id="planos">
    <AnimatedBlock className="text-center mb-16">
      <p className="text-caption text-primary font-semibold mb-3 uppercase tracking-wider">
        Planos
      </p>
      <h2 className="text-section text-foreground mb-4">
        Modular, escalável, sob medida
      </h2>
      <p className="text-body text-muted-foreground max-w-2xl mx-auto">
        A recomendação ideal vem da demonstração consultiva. Conheça a estrutura dos nossos planos.
      </p>
    </AnimatedBlock>

    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
      {plans.map((plan, i) => (
        <AnimatedBlock key={plan.name} delay={i * 0.1}>
          <div
            className={`p-8 rounded-2xl h-full flex flex-col transition-all duration-200 hover:-translate-y-1 will-change-transform ${
              plan.highlighted
                ? "bg-primary text-primary-foreground shadow-lg ring-2 ring-primary"
                : "bg-card text-card-foreground shadow-card hover:shadow-card-hover"
            }`}
          >
            <h3 className="text-card-title mb-2">{plan.name}</h3>
            <p className={`text-sm mb-6 ${plan.highlighted ? "opacity-80" : "text-muted-foreground"}`}>
              {plan.description}
            </p>
            <ul className="space-y-3 mb-8 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm">
                  <Check className={`h-4 w-4 shrink-0 ${plan.highlighted ? "text-accent" : "text-primary"}`} />
                  {f}
                </li>
              ))}
            </ul>
            <Button
              variant={plan.highlighted ? "default" : "hero"}
              size="lg"
              className={plan.highlighted ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold shadow-md" : ""}
              asChild
            >
              <a href="#demo">
                Agendar demonstração
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </AnimatedBlock>
      ))}
    </div>
  </SectionWrapper>
);

export default Plans;
