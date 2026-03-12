import { Button } from "@/components/ui/button";
import { AnimatedBlock } from "./SectionWrapper";
import dashboardMockup from "@/assets/dashboard-mockup.jpg";
import { ArrowRight } from "lucide-react";

const Hero = () => (
  <section className="pt-32 pb-32 relative overflow-hidden">
    {/* Geometric background pattern */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-accent/5 blur-3xl" />
    </div>

    <div className="container mx-auto px-6 relative">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <AnimatedBlock>
          <p className="text-caption text-primary font-semibold mb-4 uppercase tracking-wider">
            Plataforma de gestão centralizada
          </p>
        </AnimatedBlock>

        <AnimatedBlock delay={0.1}>
          <h1 className="text-hero text-foreground mb-6">
            Sua operação,{" "}
            <span className="text-gradient-primary">sob controle.</span>
          </h1>
        </AnimatedBlock>

        <AnimatedBlock delay={0.2}>
          <p className="text-body text-muted-foreground max-w-2xl mx-auto mb-10">
            Centralize a comunicação, as solicitações e os indicadores da sua rede
            em uma única plataforma de gestão. Menos improviso, mais visibilidade
            para decidir.
          </p>
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
