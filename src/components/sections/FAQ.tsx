import { SectionWrapper, AnimatedBlock, Eyebrow } from "./SectionWrapper";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const WHATSAPP_URL = `https://wa.me/5551985901584?text=${encodeURIComponent("Olá, tenho dúvidas sobre a Bahdev.")}`;

const faqs = [
  { q: "Qual o tempo de implantação?", a: "A maioria opera em 4 a 8 semanas, com implantação gradual. Não é necessário parar a operação." },
  { q: "A Bahdev serve para meu tipo de operação?", a: "Se você gerencia associações, cooperativas, redes ou franquias com múltiplas unidades, sim." },
  { q: "É difícil de implantar?", a: "A implantação é consultiva e gradual. Capacitamos sua equipe com treinamento prático." },
  { q: "A plataforma é personalizável?", a: "Módulos, workflows, campos e dashboards são configuráveis sem necessidade de código." },
  { q: "Integra com outros sistemas?", a: "Sim — ERPs, CRMs e ferramentas de comunicação. No contato inicial mapeamos o que faz sentido." },
  { q: "A Bahdev é segura?", a: "Criptografia, controle de acesso granular e conformidade com boas práticas de segurança." },
];

const FAQ = () => (
  <SectionWrapper id="faq">
    <AnimatedBlock className="text-center mb-10">
      <Eyebrow>FAQ</Eyebrow>
      <h2 className="text-section text-foreground">Tire suas dúvidas</h2>
    </AnimatedBlock>

    <AnimatedBlock delay={0.08} className="max-w-2xl mx-auto">
      <Accordion type="single" collapsible className="space-y-2">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="border rounded-xl bg-card px-5 shadow-card data-[state=open]:shadow-card-hover transition-shadow">
            <AccordionTrigger className="text-left text-sm font-bold py-4 hover:no-underline">{faq.q}</AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground pb-4">{faq.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </AnimatedBlock>

    <AnimatedBlock delay={0.15} className="max-w-2xl mx-auto mt-8 text-center">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Button variant="hero" size="lg" asChild>
          <a href="#demo">Fale conosco <ArrowRight className="ml-2 h-4 w-4" /></a>
        </Button>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <MessageCircle className="h-4 w-4" /> WhatsApp
        </a>
      </div>
    </AnimatedBlock>
  </SectionWrapper>
);

export default FAQ;
