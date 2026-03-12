import { Button } from "@/components/ui/button";
import { AnimatedBlock } from "./SectionWrapper";
import dashboardMockup from "@/assets/bahdev-dashboard.png";
import { ArrowRight, MessageCircle, Shield, Layers, BarChart3 } from "lucide-react";

const WHATSAPP_URL = `https://wa.me/5500000000000?text=${encodeURIComponent("Olá, quero entender como a Bahdev pode funcionar na minha operação.")}`;

const quickBenefits = [
  { icon: Shield, text: "Governança e padrão" },
  { icon: Layers, text: "Workflows centralizados" },
  { icon: BarChart3, text: "Indicadores em tempo real" },
];

const Hero = () => (
  <section className="pt-32 pb-24 md:pb-32 relative overflow-hidden">
    {/* Background */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-accent/5 blur-3xl" />
    </div>

    <div className="container mx-auto px-6 relative">
      <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
        <AnimatedBlock>
          <p className="text-caption text-primary font-semibold mb-4 uppercase tracking-wider">
            Gestão centralizada para redes e associações
          </p>
        </AnimatedBlock>

        <AnimatedBlock delay={0.1}>
          <h1 className="text-hero text-foreground mb-6">
            Sua operação,{" "}
            <span className="text-gradient-primary">sob controle.</span>
          </h1>
        </AnimatedBlock>

        <AnimatedBlock delay={0.2}>
          <p className="text-body text-muted-foreground max-w-2xl mx-auto mb-4">
            Centralize comunicação, solicitações, campanhas e indicadores
            em uma única plataforma. Menos improviso, mais visibilidade para decidir.
          </p>
          <p className="text-sm text-muted-foreground/70 max-w-xl mx-auto mb-8">
            Para associações, cooperativas, redes e franquias que precisam de padrão, governança e escala.
          </p>
        </AnimatedBlock>

        <AnimatedBlock delay={0.25}>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            {quickBenefits.map((b) => (
              <span key={b.text} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground bg-card rounded-full px-4 py-2 shadow-card">
                <b.icon className="h-4 w-4 text-primary" />
                {b.text}
              </span>
            ))}
          </div>
        </AnimatedBlock>

        <AnimatedBlock delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="xl" asChild>
              <a href="#demo">
                Agendar demonstração
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button variant="hero-outline" size="xl" asChild>
              <a href="#solucao">Ver como funciona</a>
            </Button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground/60 flex items-center justify-center gap-1.5">
            <MessageCircle className="h-3.5 w-3.5" />
            Prefere falar antes?{" "}
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground transition-colors">
              Chame no WhatsApp
            </a>
          </p>
        </AnimatedBlock>
      </div>

      {/* Product Screenshot */}
      <AnimatedBlock delay={0.4} className="max-w-5xl mx-auto">
        <div className="rounded-2xl overflow-hidden shadow-product">
          <img
            src={dashboardMockup}
            alt="Bahdev — Painel de indicadores e workflows operacionais"
            className="w-full h-auto"
            loading="eager"
          />
        </div>
      </AnimatedBlock>
    </div>
  </section>
);

export default Hero;
