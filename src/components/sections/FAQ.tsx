import { SectionWrapper, AnimatedBlock } from "./SectionWrapper";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const WHATSAPP_URL = `https://wa.me/5551985901584?text=${encodeURIComponent("Olá, tenho dúvidas sobre a Bahdev.")}`;

const faqs = [
  {
    q: "Qual o tempo médio de implantação?",
    a: "Depende da complexidade da rede, mas a maioria dos projetos começa a operar em 4 a 8 semanas, com implantação gradual por grupos de unidades. Não é necessário parar a operação para implantar.",
  },
  {
    q: "A Bahdev serve para o meu tipo de operação?",
    a: "Se você gerencia associações, cooperativas, redes, franquias ou qualquer operação multiunidade que precisa de padronização e visibilidade, a Bahdev foi feita para você.",
  },
  {
    q: "É difícil implantar? Minha equipe vai conseguir usar?",
    a: "A implantação é consultiva e gradual. Capacitamos sua equipe com treinamento prático e materiais de apoio. A adoção acontece sem fricção porque o sistema é intuitivo e configurado para o seu cenário.",
  },
  {
    q: "A plataforma é personalizável?",
    a: "Sim. Módulos, workflows, campos, permissões e dashboards são configuráveis de acordo com a realidade da sua rede — sem necessidade de código.",
  },
  {
    q: "Integra com sistemas que já usamos?",
    a: "A Bahdev possui uma camada de integração que se conecta a ERPs, CRMs e ferramentas de comunicação. Na demonstração, mapeamos quais integrações fazem sentido para seu cenário.",
  },
  {
    q: "Como funciona a evolução por módulos?",
    a: "Você começa com os módulos que resolvem a dor mais urgente e ativa novos conforme a operação amadurece. Não precisa contratar tudo de uma vez.",
  },
  {
    q: "E se eu quiser apenas entender melhor antes de agendar?",
    a: "Sem problema. Você pode falar com nossa equipe pelo WhatsApp ou solicitar uma apresentação. Nosso atendimento é consultivo — estamos aqui para ajudar a entender se faz sentido.",
  },
  {
    q: "A Bahdev é segura para dados sensíveis?",
    a: "Sim. Utilizamos infraestrutura com criptografia, controle de acesso granular e conformidade com boas práticas de segurança da informação.",
  },
];

const FAQ = () => (
  <SectionWrapper id="faq">
    <AnimatedBlock className="text-center mb-16">
      <p className="text-caption text-primary font-semibold mb-3 uppercase tracking-wider">
        Perguntas frequentes
      </p>
      <h2 className="text-section text-foreground">
        Tire suas dúvidas
      </h2>
    </AnimatedBlock>

    <AnimatedBlock delay={0.1} className="max-w-3xl mx-auto">
      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((faq, i) => (
          <AccordionItem
            key={i}
            value={`faq-${i}`}
            className="border rounded-2xl bg-card px-6 shadow-card data-[state=open]:shadow-card-hover transition-shadow"
          >
            <AccordionTrigger className="text-left text-card-title py-5 hover:no-underline">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-body text-muted-foreground pb-5">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </AnimatedBlock>

    {/* Post-FAQ trust block */}
    <AnimatedBlock delay={0.2} className="max-w-3xl mx-auto mt-12 text-center">
      <p className="text-body text-muted-foreground mb-4">
        Tem dúvidas sobre implantação ou aderência ao seu cenário?
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button variant="hero" size="lg" asChild>
          <a href="#demo">
            Agendar demonstração
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <MessageCircle className="h-4 w-4" />
          Falar com a equipe no WhatsApp
        </a>
      </div>
    </AnimatedBlock>
  </SectionWrapper>
);

export default FAQ;
