import { motion } from "framer-motion";
import { SectionWrapper, AnimatedBlock, containerVariants, itemVariants } from "./SectionWrapper";
import { Building2, Users, Network, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const segments = [
  {
    icon: Building2,
    title: "Associações",
    desc: "Quando a comunicação se espalha em grupos e planilhas, ninguém sabe 'o que está valendo'.",
    bullets: ["Centralize circulares, avisos e campanhas", "Padronize pedidos com aprovações", "Dê visibilidade real ao associado"],
  },
  {
    icon: Users,
    title: "Cooperativas",
    desc: "A cooperativa precisa de governança: processos claros, rastreio e dados para decidir.",
    bullets: ["Workflows por área e por unidade", "Gestão financeira e pendências", "Indicadores para conselho e diretoria"],
  },
  {
    icon: Network,
    title: "Redes e franquias",
    desc: "Campanhas e operação só escalam com padrão. Sem padrão, vira 'cada loja faz do seu jeito'.",
    bullets: ["Campanhas com kit, prazos e status", "Pedidos centralizados e auditáveis", "Visão por região/unidade"],
  },
  {
    icon: Briefcase,
    title: "Marketing, Operações e TI",
    desc: "Chega de apagar incêndio. Tenha processo, fila, responsáveis e indicadores.",
    bullets: ["Menos retrabalho e solicitações perdidas", "Mais produtividade e previsibilidade", "Integrações e base para automações/IA"],
  },
];

const ForWho = () => (
  <SectionWrapper id="para-quem">
    <AnimatedBlock className="text-center mb-16">
      <p className="text-caption text-primary font-semibold mb-3 uppercase tracking-wider">
        Para quem é
      </p>
      <h2 className="text-section text-foreground mb-4">
        A Bahdev serve quem precisa de controle sem perder agilidade
      </h2>
      <p className="text-body text-muted-foreground max-w-2xl mx-auto">
        Se sua operação cresce e a comunicação vira caos, o portal vira essencial.
      </p>
    </AnimatedBlock>

    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto"
    >
      {segments.map((s) => (
        <motion.div
          key={s.title}
          variants={itemVariants}
          className="p-8 rounded-2xl bg-card shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 will-change-transform"
        >
          <s.icon className="h-8 w-8 mb-4 text-primary" />
          <h3 className="text-card-title text-card-foreground mb-2">{s.title}</h3>
          <p className="text-body text-muted-foreground mb-4">{s.desc}</p>
          <ul className="space-y-1.5">
            {s.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                {b}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </motion.div>

    <AnimatedBlock delay={0.2} className="text-center mt-12">
      <Button variant="hero" size="lg" asChild>
        <a href="#demo">
          Falar com um especialista
          <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </Button>
    </AnimatedBlock>
  </SectionWrapper>
);

export default ForWho;
