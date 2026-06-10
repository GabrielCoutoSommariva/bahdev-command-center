import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { SectionWrapper, AnimatedBlock, containerVariants, itemVariants } from "./SectionWrapper";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import omnichannelImage from "@/assets/omnichannel-platform.png";
import portalImage from "@/assets/farmacias-portal.png";
import treinamentoImage from "@/assets/dashboard-bahdev-treinamento.png";

type Product = {
  title: string;
  desc: string;
  badge: string;
  to: string;
  image: string;
  imageAlt: string;
  accent: string;
};

const products: Product[] = [
  {
    title: "Plataforma Omnichannel",
    desc: "Atendimento unificado para WhatsApp, chat, e-mail e redes — com bots, equipes e métricas.",
    badge: "Disponível",
    to: "/omnichannel",
    image: omnichannelImage,
    imageAlt: "Interface de atendimento omnichannel com conversas e métricas",
    accent: "from-blue-500/25 via-cyan-400/10 to-transparent",
  },
  {
    title: "Portal do Associado",
    desc: "Comunicados, campanhas, pedidos, aprovações e materiais centralizados em um só lugar.",
    badge: "Disponível",
    to: "/portal",
    image: portalImage,
    imageAlt: "Portal do associado com área de gestão e comunicados",
    accent: "from-violet-500/20 via-blue-500/10 to-transparent",
  },
  {
    title: "Treinamento Capacitação",
    desc: "Painel completo para cursos, trilhas, usuários, certificados, gamificação e relatórios de aprendizagem.",
    badge: "Novo módulo",
    to: "/treinamento",
    image: treinamentoImage,
    imageAlt: "Dashboard de treinamento com indicadores, cursos e status de alunos",
    accent: "from-blue-600/20 via-sky-400/10 to-transparent",
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
            className="group h-full overflow-hidden rounded-2xl bg-card border border-border shadow-card hover:shadow-card-hover transition-shadow flex flex-col"
          >
            <div className="relative h-40 overflow-hidden bg-muted">
              <img
                src={p.image}
                alt={p.imageAlt}
                className="h-full w-full object-cover object-left-top transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className={`absolute inset-0 bg-gradient-to-br ${p.accent}`} />
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-card to-transparent" />
              <span className="absolute right-5 top-5 text-[10px] font-semibold text-primary bg-white/90 rounded-full px-2.5 py-1 uppercase tracking-wider shadow-sm backdrop-blur">
                {p.badge}
              </span>
            </div>
            <div className="p-5 pt-4 flex flex-1 flex-col">
              <h3 className="font-bold text-card-foreground mb-1.5">{p.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 flex-1">{p.desc}</p>
              <div className="flex items-center gap-1 text-sm font-semibold text-primary">
                Saiba mais <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
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
