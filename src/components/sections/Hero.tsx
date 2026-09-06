import { Button } from "@/components/ui/button";
import { AnimatedBlock } from "./SectionWrapper";
import MockupCard from "@/components/mockups/MockupCard";
import { ArrowRight, MessageCircle, Building2 } from "lucide-react";

const WHATSAPP_URL = `https://wa.me/5551985901584?text=${encodeURIComponent("Olá, quero entender como a Bahdev pode funcionar na minha operação.")}`;

const Hero = () => (
  <section className="pt-32 pb-20 md:pt-36 md:pb-28 relative overflow-hidden bg-[linear-gradient(160deg,hsl(220_60%_9%),hsl(220_53%_15%)_55%,hsl(214_82%_20%))]">
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -right-24 w-[620px] h-[620px] rounded-full bg-primary/25 blur-3xl" />
      <div className="absolute bottom-0 -left-40 w-[460px] h-[460px] rounded-full bg-accent/15 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,hsl(var(--primary)/0.2),transparent_55%)]" />
      <div className="absolute inset-0 opacity-[0.35] bg-[linear-gradient(hsl(0_0%_100%/0.04)_1px,transparent_1px),linear-gradient(90deg,hsl(0_0%_100%/0.04)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_75%)]" />
    </div>

    <div className="container mx-auto px-6 sm:px-8 md:px-10 lg:px-12 max-w-6xl relative">
      <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-8 items-center">
        <div className="text-center lg:text-left">
          <AnimatedBlock>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-6">
              <span className="text-xs font-medium text-white/85 border border-white/15 bg-white/10 backdrop-blur rounded-full px-3.5 py-1.5">Portal + Workflow + Indicadores</span>
              <span className="text-xs font-medium text-white/85 border border-white/15 bg-white/10 backdrop-blur rounded-full px-3.5 py-1.5">Para associações e cooperativas</span>
            </div>
          </AnimatedBlock>

          <AnimatedBlock delay={0.08}>
            <h1 className="text-white mb-5 text-[clamp(2.25rem,3.8vw,3.6rem)] font-extrabold leading-[1.06] tracking-tight">
              Centralize a gestão da sua rede em{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-glow via-sky-300 to-accent">um único portal.</span>
            </h1>
          </AnimatedBlock>

          <AnimatedBlock delay={0.15}>
            <p className="text-body text-white/65 max-w-xl mx-auto lg:mx-0 mb-8">
              Campanhas, pedidos, aprovações, indicadores — sem planilhas,
              grupos e retrabalho. Organização e escala para sua operação.
            </p>
          </AnimatedBlock>

          <AnimatedBlock delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <Button variant="hero" size="xl" asChild>
                <a href="#demo">
                  Fale conosco
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button variant="cta-outline-white" size="xl" asChild>
                <a href="#solucao">Conhecer os módulos</a>
              </Button>
            </div>
            <p className="mt-4 text-xs text-white/45 flex items-center justify-center lg:justify-start gap-1.5">
              <MessageCircle className="h-3.5 w-3.5" />
              Prefere falar antes?{" "}
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 text-white/60 hover:text-white transition-colors">
                Chame no WhatsApp
              </a>
            </p>
          </AnimatedBlock>
        </div>

        <AnimatedBlock delay={0.25} className="relative">
          <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-gradient-to-br from-primary/30 via-accent/15 to-transparent blur-3xl" />
          <MockupCard
            appLabel="Bahdev — Painel da rede"
            chipIcon={Building2}
            chipTitle="+1.900 lojas conectadas"
            chipSub="Operação em tempo real"
            chipSide="left"
            className="max-w-[22rem] sm:max-w-md mx-auto"
            items={[
              { time: "Loja 128", title: "Pedido aprovado", subtitle: "Campanha Verão", status: "done" },
              { time: "Loja 204", title: "Comunicado lido", subtitle: "98% de alcance", status: "done" },
              { time: "Loja 077", title: "Aguardando aprovação", subtitle: "Pedido de material", status: "pending" },
            ]}
          />
        </AnimatedBlock>
      </div>
    </div>
  </section>
);

export default Hero;
