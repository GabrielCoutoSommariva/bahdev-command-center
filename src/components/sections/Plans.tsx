import { SectionWrapper, AnimatedBlock } from "./SectionWrapper";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Essencial",
    price: "R$ 399",
    period: "/ mês",
    users: "Até 100 usuários",
    features: ["Portal do associado", "Comunicação centralizada", "Workflow básico", "Gestão de permissões", "Visão de status"],
    highlighted: false,
    cta: "Quero começar",
  },
  {
    name: "Profissional",
    price: "R$ 699",
    period: "/ mês",
    users: "Até 250 usuários",
    features: ["Tudo do Essencial", "Workflows com aprovações", "Gestão de campanhas", "Dashboards básicos", "Segmentação"],
    highlighted: true,
    cta: "Ver demonstração",
  },
  {
    name: "Sob medida",
    price: "Personalizado",
    period: "",
    users: "Grandes redes",
    features: ["Usuários ilimitados", "Workflows multiárea", "BI avançado", "Integrações", "Suporte consultivo"],
    highlighted: false,
    cta: "Falar com especialista",
  },
];

const Plans = () => (
  <SectionWrapper className="bg-muted/50" id="planos">
    <AnimatedBlock className="text-center mb-10">
      <p className="text-caption text-primary font-semibold mb-2 uppercase tracking-wider">Planos</p>
      <h2 className="text-section text-foreground mb-3">Planos que acompanham sua rede</h2>
      <p className="text-body text-muted-foreground max-w-xl mx-auto">
        Comece simples e evolua sem trocar de plataforma.
      </p>
    </AnimatedBlock>

    <div className="grid md:grid-cols-3 gap-4 md:gap-5 max-w-4xl mx-auto">
      {plans.map((plan, i) => (
        <AnimatedBlock key={plan.name} delay={i * 0.08}>
          <div className={`p-6 rounded-xl h-full flex flex-col transition-all duration-200 ${
            plan.highlighted
              ? "bg-primary text-primary-foreground shadow-lg ring-2 ring-primary"
              : "bg-card text-card-foreground shadow-card"
          }`}>
            {plan.highlighted && (
              <span className="inline-block text-xs font-semibold bg-accent/20 text-accent rounded-full px-3 py-1 mb-3 self-start">Mais escolhido</span>
            )}
            <h3 className="text-lg font-bold mb-1">{plan.name}</h3>
            <div className="mb-1">
              <span className="text-2xl font-extrabold">{plan.price}</span>
              {plan.period && <span className={`text-sm ${plan.highlighted ? "opacity-70" : "text-muted-foreground"}`}>{plan.period}</span>}
            </div>
            <p className={`text-xs mb-4 ${plan.highlighted ? "opacity-60" : "text-muted-foreground"}`}>{plan.users}</p>
            <ul className="space-y-2 mb-6 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm">
                  <Check className={`h-3.5 w-3.5 shrink-0 ${plan.highlighted ? "text-accent" : "text-primary"}`} />
                  {f}
                </li>
              ))}
            </ul>
            <Button
              variant={plan.highlighted ? "default" : "hero"}
              size="lg"
              className={plan.highlighted ? "bg-white text-primary hover:bg-white/90 font-semibold shadow-md" : ""}
              asChild
            >
              <a href="#demo">
                {plan.cta}
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
