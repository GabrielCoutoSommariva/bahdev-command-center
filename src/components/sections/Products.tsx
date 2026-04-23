import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { SectionWrapper, AnimatedBlock, containerVariants, itemVariants } from "./SectionWrapper";
import { Headphones, LayoutDashboard, BarChart4, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type Product = {
  icon: typeof Headphones;
  title: string;
  desc: string;
  badge: string;
  to: string;
};

const products: Product[] = [
  {
    icon: Headphones,
    title: "Plataforma Omnichannel",
    desc: "Atendimento unificado para WhatsApp, chat, e-mail e redes — com bots, equipes e métricas.",
    badge: "Disponível",
    to: "/omnichannel",
  },
  {
    icon: LayoutDashboard,
    title: "Portal do Associado",
    desc: "Comunicados, campanhas, pedidos, aprovações e materiais centralizados em um só lugar.",
    badge: "Disponível",
    to: "/portal",
  },
  {
    icon: BarChart4,
    title: "Dashboards & BI",
    desc: "Indicadores por unidade, região e setor — com visão consolidada para tomada de decisão.",
    badge: "Disponível",
    to: "/dashboards",
  },
];

const Products = () => (
  <SectionWrapper id="produtos" className="bg-muted/30">
    <AnimatedBlock className="text-center mb-10 max-w-2xl mx-auto">
      <p className="text-caption text-primary font-semibold mb-2 uppercase tracking-wider">
        Produtos Bahdev
      </p>
      <h2 className="text-section text-foreground mb-3">
        Soluções modulares para sua operação
      </h2>
      <p className="text-body text-muted-foreground">
        Conheça os módulos que compõem o ecossistema Bahdev. Ative o que faz sentido hoje
        e expanda conforme sua rede cresce.
      </p>
    </AnimatedBlock>

    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto"
    >
      {products.map((p) => {
        const content = (
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="h-full p-5 rounded-xl bg-card border border-border shadow-card hover:shadow-card-hover transition-shadow flex flex-col"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <p.icon className="h-5 w-5 text-primary" />
              </div>
              <span className="text-[10px] font-semibold text-primary bg-primary/10 rounded-full px-2 py-0.5 uppercase tracking-wider">
                {p.badge}
              </span>
            </div>
            <h3 className="font-bold text-card-foreground mb-1.5">{p.title}</h3>
            <p className="text-sm text-muted-foreground mb-4 flex-1">{p.desc}</p>
            <div className="flex items-center gap-1 text-sm font-semibold text-primary">
              Saiba mais <ArrowRight className="h-4 w-4" />
            </div>
          </motion.div>
        );

        return (
          <Link key={p.title} to={p.to} className="block h-full">{content}</Link>
        );
      })}
    </motion.div>

    <AnimatedBlock delay={0.2} className="text-center mt-10">
      <Button asChild variant="hero" size="lg">
        <a href="/#demo">
          Quero conhecer todos os produtos
          <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </Button>
    </AnimatedBlock>
  </SectionWrapper>
);

export default Products;
