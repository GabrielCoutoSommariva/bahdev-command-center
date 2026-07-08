import { Button } from "@/components/ui/button";
import { AnimatedBlock } from "./SectionWrapper";
import { ArrowRight, MessageCircle } from "lucide-react";

const WHATSAPP_URL = `https://wa.me/5551985901584?text=${encodeURIComponent("Olá, quero entender como a Bahdev pode funcionar na minha operação.")}`;

const Hero = () => (
  <section className="pt-28 pb-10 md:pt-32 md:pb-14 relative overflow-hidden">
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />
    </div>

    <div className="container mx-auto px-6 sm:px-8 md:px-10 lg:px-12 max-w-6xl relative">
      <div className="max-w-3xl mx-auto text-center">
        <AnimatedBlock>
          <div className="flex flex-wrap items-center justify-center gap-2 mb-5">
            <span className="text-xs font-medium text-primary bg-primary/10 rounded-full px-3 py-1">Portal + Workflow + Indicadores</span>
            <span className="text-xs font-medium text-primary bg-primary/10 rounded-full px-3 py-1">Para associações e cooperativas</span>
          </div>
        </AnimatedBlock>

        <AnimatedBlock delay={0.08}>
          <h1 className="text-hero text-foreground mb-5">
            Centralize a gestão da sua rede em{" "}
            <span className="text-gradient-primary">um único portal.</span>
          </h1>
        </AnimatedBlock>

        <AnimatedBlock delay={0.15}>
          <p className="text-body text-muted-foreground max-w-xl mx-auto mb-8">
            Campanhas, pedidos, aprovações, indicadores — sem planilhas,
            grupos e retrabalho. Organização e escala para sua operação.
          </p>
        </AnimatedBlock>

        <AnimatedBlock delay={0.2}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button variant="hero" size="xl" asChild>
              <a href="#demo">
                Fale conosco
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button variant="hero-outline" size="xl" asChild>
              <a href="#solucao">Conhecer os módulos</a>
            </Button>
          </div>
          <p className="mt-3 text-xs text-muted-foreground/60 flex items-center justify-center gap-1.5">
            <MessageCircle className="h-3.5 w-3.5" />
            Prefere falar antes?{" "}
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground transition-colors">
              Chame no WhatsApp
            </a>
          </p>
        </AnimatedBlock>
      </div>
    </div>
  </section>
);

export default Hero;
