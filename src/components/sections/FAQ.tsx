import { SectionWrapper, AnimatedBlock } from "./SectionWrapper";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Qual o tempo médio de implantação?",
    a: "Depende da complexidade da rede, mas a maioria dos projetos começa a operar em 4 a 8 semanas, com implantação gradual por grupos de unidades.",
  },
  {
    q: "Para quais tipos de operação a Bahdev serve?",
    a: "Associações, cooperativas, redes de franquias, grupos de lojas, redes de saúde e qualquer operação multiunidade que precise de padronização e visibilidade.",
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
    a: "Você começa com os módulos que resolvem a dor mais urgente e ativa novos módulos conforme a operação amadurece. Não precisa contratar tudo de uma vez.",
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
  </SectionWrapper>
);

export default FAQ;
