import { SectionWrapper, AnimatedBlock } from "./SectionWrapper";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Essencial",
    price: "R$ 399",
    period: "/ mês",
    users: "Até 100 usuários",
    description: "Ideal para associações e cooperativas pequenas que precisam organizar comunicação, pedidos e rotina sem complexidade.",
    features: [
      "Portal do associado",
      "Comunicação centralizada",
      "Workflow básico de solicitações",
      "Gestão de usuários e permissões",
      "Visão geral de status e andamento",
    ],
    highlighted: false,
    cta: "Quero começar",
  },
  {
    name: "Profissional",
    price: "R$ 699",
    period: "/ mês",
    users: "Até 250 usuários",
    description: "Para redes em crescimento que precisam de mais controle, visibilidade e padronização entre unidades.",
    features: [
      "Tudo do plano Essencial",
      "Workflows avançados com aprovações",
      "Gestão de campanhas e materiais",
      "Dashboards e indicadores básicos",
      "Segmentação por unidade/perfil",
    ],
    highlighted: true,
    cta: "Ver demonstração",
  },
  {
    name: "Sob medida",
    price: "Personalizado",
    period: "",
    users: "Grandes redes",
    description: "Para grandes associações e cooperativas que exigem alto nível de governança, integrações, indicadores avançados e escala real.",
    features: [
      "Usuários ilimitados",
      "Workflows complexos e multiárea",
      "Dashboards avançados e BI",
      "Integrações com sistemas existentes",
      "Base para automações e IA",
      "Acompanhamento consultivo",
    ],
    highlighted: false,
    cta: "Falar com especialista",
  },
];

const Plans = () => (
  <SectionWrapper className="bg-muted/50" id="planos">
    <AnimatedBlock className="text-center mb-16">
      <p className="text-caption text-primary font-semibold mb-3 uppercase tracking-wider">
        Planos
      </p>
      <h2 className="text-section text-foreground mb-4">
        Planos que acompanham o tamanho e a maturidade da sua rede
      </h2>
      <p className="text-body text-muted-foreground max-w-2xl mx-auto">
        Comece simples, ganhe organização e evolua conforme sua associação ou cooperativa cresce. Sem trocar de plataforma.
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
            {plan.highlighted && (
              <span className="inline-block text-xs font-semibold bg-accent/20 text-accent rounded-full px-3 py-1 mb-4 self-start">
                Mais escolhido
              </span>
            )}
            <h3 className="text-card-title mb-2">{plan.name}</h3>
            <div className="mb-1">
              <span className="text-3xl font-extrabold">{plan.price}</span>
              {plan.period && <span className={`text-sm ${plan.highlighted ? "opacity-70" : "text-muted-foreground"}`}>{plan.period}</span>}
            </div>
            <p className={`text-xs font-medium mb-4 ${plan.highlighted ? "opacity-60" : "text-muted-foreground"}`}>
              {plan.users}
            </p>
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
                {plan.cta}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </AnimatedBlock>
      ))}
    </div>

    <AnimatedBlock delay={0.3} className="text-center mt-10">
      <p className="text-sm text-muted-foreground">
        Não sabe qual plano faz mais sentido?{" "}
        <a href="#demo" className="text-primary font-medium hover:underline">
          A gente avalia seu cenário e indica o melhor caminho.
        </a>
      </p>
    </AnimatedBlock>
  </SectionWrapper>
);

export default Plans;
