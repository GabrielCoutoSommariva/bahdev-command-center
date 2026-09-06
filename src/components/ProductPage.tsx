import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { SectionWrapper, AnimatedBlock, containerVariants, itemVariants } from "@/components/sections/SectionWrapper";
import { ArrowLeft, CheckCircle2, type LucideIcon } from "lucide-react";

type Item = { icon: LucideIcon; title: string; desc: string };

export interface ProductPageProps {
  badge: string;
  title: string;
  description: string;
  heroIcon: LucideIcon;
  screenshot?: string;
  screenshotSlot?: ReactNode;
  features: Item[];
  benefits: Item[];
  highlights: string[];
  ctaTitle?: string;
  ctaDesc?: string;
}

const ProductPage = ({
  badge,
  title,
  description,
  heroIcon: HeroIcon,
  screenshot,
  screenshotSlot,
  features,
  benefits,
  highlights,
  ctaTitle = "Pronto para começar?",
  ctaDesc = "Fale com a Bahdev e conte o que sua operação precisa.",
}: ProductPageProps) => {
  const { pathname } = useLocation();

  return (
    <>
      <SEO title={`${title} | Bahdev`} description={description} path={pathname} />
    <Navbar />
    <main>
      {/* Hero */}
      <SectionWrapper className="relative overflow-hidden !pt-28 md:!pt-32 bg-[linear-gradient(160deg,hsl(220_60%_9%),hsl(220_53%_15%)_55%,hsl(214_82%_20%))]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-24 w-[560px] h-[560px] rounded-full bg-primary/25 blur-3xl" />
          <div className="absolute bottom-0 -left-40 w-[420px] h-[420px] rounded-full bg-accent/15 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.35] bg-[linear-gradient(hsl(0_0%_100%/0.04)_1px,transparent_1px),linear-gradient(90deg,hsl(0_0%_100%/0.04)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_75%)]" />
        </div>

        <div className="relative mb-8 pt-4">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 backdrop-blur py-2 pl-3 pr-4 text-sm font-semibold text-white/90 transition-colors hover:bg-white/20"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Voltar ao site
          </Link>
        </div>

        <div className="relative grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <AnimatedBlock>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 backdrop-blur px-4 py-2 text-sm font-bold text-white/90">
              <HeroIcon className="h-4 w-4 text-primary-glow" />
              {badge}
            </div>
            <h1 className="text-white text-[clamp(2.25rem,3.6vw,3.5rem)] font-extrabold leading-[1.08] tracking-tight">{title}</h1>
            <p className="mt-5 text-body-lg text-white/65">{description}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="hero" size="lg">
                <a href="/#demo">Fale conosco</a>
              </Button>
              <Button asChild variant="cta-outline-white" size="lg">
                <Link to="/#produtos" className="!text-white hover:!text-primary">Ver outros produtos</Link>
              </Button>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3 text-center">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-4">
                <p className="text-lg font-extrabold text-primary-glow">{features.length}</p>
                <p className="mt-1 text-xs text-white/55">funcionalidades</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-4">
                <p className="text-lg font-extrabold text-primary-glow">{highlights.length}</p>
                <p className="mt-1 text-xs text-white/55">diferenciais</p>
              </div>
            </div>
          </AnimatedBlock>

          <AnimatedBlock delay={0.1} className="relative">
            <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-gradient-to-br from-primary/30 via-accent/15 to-transparent blur-3xl" />
            {screenshot && (
              <div className="overflow-hidden rounded-[1.75rem] border border-white/15 bg-card shadow-2xl shadow-black/30">
                <img src={screenshot} alt={title} className="w-full h-auto" loading="eager" />
              </div>
            )}
            {screenshotSlot && (
              <div className="px-4 sm:px-8">{screenshotSlot}</div>
            )}
          </AnimatedBlock>
        </div>
      </SectionWrapper>

      {/* Features */}
      <SectionWrapper className="bg-white">
        <AnimatedBlock className="text-center mb-10 max-w-2xl mx-auto">
          <p className="text-caption text-primary font-semibold mb-2 uppercase tracking-wider">Funcionalidades</p>
          <h2 className="text-section text-foreground mb-3">Tudo que sua operação precisa</h2>
          <p className="text-body text-muted-foreground">
            Recursos pensados para escalar com controle, sem perder agilidade no dia a dia.
          </p>
        </AnimatedBlock>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={itemVariants}
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="p-4 md:p-5 rounded-2xl bg-card shadow-card hover:shadow-card-hover transition-shadow border border-border/50"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-card-foreground mb-0.5">{f.title}</h3>
              <p className="text-xs text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </SectionWrapper>

      {/* Por que escolher — banda escura, no mesmo espírito do Treinamento */}
      <SectionWrapper className="bg-foreground text-background">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <AnimatedBlock>
            <p className="text-caption font-semibold mb-2 uppercase tracking-wider text-primary-glow">
              Por que escolher
            </p>
            <h2 className="text-section mb-4">Resultados que sua operação sente</h2>
            <div className="grid gap-3">
              {highlights.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <CheckCircle2 className="h-5 w-5 text-primary-glow shrink-0 mt-0.5" />
                  <span className="text-sm leading-6 text-background/85">{item}</span>
                </div>
              ))}
            </div>
          </AnimatedBlock>

          <AnimatedBlock delay={0.1}>
            <div className="grid sm:grid-cols-2 gap-3">
              {benefits.map((b) => (
                <div key={b.title} className="p-4 rounded-2xl border border-white/10 bg-white/5">
                  <div className="p-2 rounded-lg bg-white/15 w-fit mb-3">
                    <b.icon className="h-5 w-5 text-primary-glow" />
                  </div>
                  <h3 className="font-bold text-background mb-1">{b.title}</h3>
                  <p className="text-sm text-background/70">{b.desc}</p>
                </div>
              ))}
            </div>
          </AnimatedBlock>
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper>
        <AnimatedBlock className="rounded-3xl bg-gradient-to-br from-primary to-primary-deep p-8 md:p-12 text-center max-w-4xl mx-auto">
          <div className="inline-flex p-3 rounded-2xl bg-white/15 mb-4">
            <HeroIcon className="h-7 w-7 text-white" />
          </div>
          <h2 className="text-section text-white mb-3">{ctaTitle}</h2>
          <p className="text-body text-white/85 mb-6 max-w-xl mx-auto">{ctaDesc}</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button asChild variant="hero-light" size="lg" className="!text-primary hover:!text-primary">
              <a href="/#demo" className="!text-primary hover:!text-primary">Fale conosco</a>
            </Button>
            <Button asChild variant="cta-outline-white" size="lg" className="!text-white hover:!text-primary">
              <Link to="/#produtos" className="!text-white hover:!text-primary">Ver outros produtos</Link>
            </Button>
          </div>
        </AnimatedBlock>
      </SectionWrapper>
    </main>
    <Footer />
    <WhatsAppButton />
    </>
  );
};

export default ProductPage;
