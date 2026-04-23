import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { SectionWrapper, AnimatedBlock, containerVariants, itemVariants } from "@/components/sections/SectionWrapper";
import { ArrowLeft, CheckCircle2, type LucideIcon } from "lucide-react";

type Item = { icon: LucideIcon; title: string; desc: string };

export interface ProductPageProps {
  badge: string;
  title: string;
  description: string;
  heroIcon: LucideIconType;
  screenshot?: string;
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
  features,
  benefits,
  highlights,
  ctaTitle = "Pronto para começar?",
  ctaDesc = "Agende uma demonstração e veja o módulo rodando com dados da sua operação.",
}: ProductPageProps) => (
  <>
    <Navbar />
    <main className="pt-16">
      {/* Hero */}
      <SectionWrapper className="bg-gradient-to-b from-primary/5 to-background">
        <AnimatedBlock className="max-w-3xl mx-auto text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Voltar ao site
          </Link>
          <div className="inline-flex p-3 rounded-2xl bg-primary/10 mb-4">
            <HeroIcon className="h-7 w-7 text-primary" />
          </div>
          <p className="text-caption text-primary font-semibold mb-2 uppercase tracking-wider">
            {badge}
          </p>
          <h1 className="text-hero text-foreground mb-4">{title}</h1>
          <p className="text-body-lg text-muted-foreground mb-6">{description}</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button asChild variant="hero" size="lg">
              <a href="/#captura">Agendar demonstração</a>
            </Button>
            <Button asChild variant="hero-outline" size="lg">
              <Link to="/#produtos">Ver outros produtos</Link>
            </Button>
          </div>
        </AnimatedBlock>

        {screenshot && (
          <AnimatedBlock delay={0.15} className="mt-10 max-w-5xl mx-auto">
            <div className="rounded-xl overflow-hidden shadow-product border border-border">
              <img src={screenshot} alt={title} className="w-full h-auto" />
            </div>
          </AnimatedBlock>
        )}
      </SectionWrapper>

      {/* Features */}
      <SectionWrapper>
        <AnimatedBlock className="text-center mb-10 max-w-2xl mx-auto">
          <h2 className="text-section text-foreground mb-3">Funcionalidades</h2>
          <p className="text-body text-muted-foreground">
            Tudo que sua operação precisa para escalar com controle.
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
              className="p-4 md:p-5 rounded-xl bg-card shadow-card hover:shadow-card-hover transition-shadow border border-border/50"
            >
              <f.icon className="h-5 w-5 mb-2 text-primary" />
              <h3 className="text-sm font-bold text-card-foreground mb-0.5">{f.title}</h3>
              <p className="text-xs text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </SectionWrapper>

      {/* Benefits + Highlights */}
      <SectionWrapper className="bg-muted/30">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <AnimatedBlock>
            <p className="text-caption text-primary font-semibold mb-2 uppercase tracking-wider">
              Por que escolher
            </p>
            <h2 className="text-section text-foreground mb-4">
              Resultados que sua operação sente
            </h2>
            <ul className="space-y-3">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-body text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </AnimatedBlock>

          <AnimatedBlock delay={0.1}>
            <div className="grid sm:grid-cols-2 gap-3">
              {benefits.map((b) => (
                <div key={b.title} className="p-4 rounded-xl bg-card border border-border shadow-card">
                  <div className="p-2 rounded-lg bg-primary/10 w-fit mb-3">
                    <b.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-card-foreground mb-1">{b.title}</h3>
                  <p className="text-sm text-muted-foreground">{b.desc}</p>
                </div>
              ))}
            </div>
          </AnimatedBlock>
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper>
        <AnimatedBlock className="rounded-2xl bg-primary p-8 md:p-12 text-center max-w-4xl mx-auto">
          <HeroIcon className="h-10 w-10 text-white mx-auto mb-4" />
          <h2 className="text-section text-white mb-3">{ctaTitle}</h2>
          <p className="text-body text-white/85 mb-6 max-w-xl mx-auto">{ctaDesc}</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
              <a href="/#captura">Agendar demonstração</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary bg-transparent">
              <Link to="/#produtos">Ver outros produtos</Link>
            </Button>
          </div>
        </AnimatedBlock>
      </SectionWrapper>
    </main>
    <Footer />
    <WhatsAppButton />
  </>
);

export default ProductPage;
