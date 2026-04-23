import { motion } from "framer-motion";
import { SectionWrapper, AnimatedBlock, containerVariants, itemVariants } from "./SectionWrapper";
import { MessageSquare, Bot, Users, Inbox, Filter, Headphones, Send, BarChart2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import omniScreenshot from "@/assets/omnichannel-platform.png";

const features = [
  { icon: Inbox, title: "Caixa unificada", desc: "WhatsApp, chat, e-mail e redes em um só lugar." },
  { icon: Users, title: "Atendimento por equipe", desc: "Filas, grupos e distribuição inteligente." },
  { icon: Bot, title: "Bot e automações", desc: "Respostas rápidas, fluxos e triagem automática." },
  { icon: Filter, title: "Filtros e tags", desc: "Organize conversas por status, setor ou prioridade." },
  { icon: Send, title: "Campanhas em massa", desc: "Disparos segmentados com histórico completo." },
  { icon: BarChart2, title: "Métricas em tempo real", desc: "TMA, SLA, produtividade e satisfação." },
];

const Omnichannel = () => (
  <SectionWrapper id="omnichannel" className="bg-muted/30">
    <AnimatedBlock className="text-center mb-10 max-w-2xl mx-auto">
      <p className="text-caption text-primary font-semibold mb-2 uppercase tracking-wider">
        Módulo de produto
      </p>
      <h2 className="text-section text-foreground mb-3">
        Plataforma Omnichannel
      </h2>
      <p className="text-body text-muted-foreground">
        Centralize todos os canais de atendimento em uma única interface. Equipes, bots e métricas integrados — pronto para escalar.
      </p>
    </AnimatedBlock>

    <div className="grid lg:grid-cols-2 gap-10 items-center mb-10">
      <AnimatedBlock>
        <div className="rounded-xl overflow-hidden shadow-product border border-border">
          <img
            src={omniScreenshot}
            alt="Plataforma Omnichannel Bahdev — Atendimento unificado"
            className="w-full h-auto"
            loading="lazy"
          />
        </div>
      </AnimatedBlock>

      <AnimatedBlock delay={0.1}>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary/10 shrink-0">
              <Headphones className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-1">Atendimento sem trocar de aba</h3>
              <p className="text-sm text-muted-foreground">Seu time responde clientes de qualquer canal direto pela plataforma — com contexto e histórico.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary/10 shrink-0">
              <MessageSquare className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-1">WhatsApp oficial integrado</h3>
              <p className="text-sm text-muted-foreground">API homologada, múltiplos atendentes e roteamento por setor ou unidade.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary/10 shrink-0">
              <Bot className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-1">Bots e IA para triagem</h3>
              <p className="text-sm text-muted-foreground">Automatize FAQs, qualifique leads e direcione conversas para o atendente certo.</p>
            </div>
          </div>
          <Button asChild variant="hero" size="lg" className="mt-4">
            <a href="#captura">Ver demonstração</a>
          </Button>
        </div>
      </AnimatedBlock>
    </div>

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
);

export default Omnichannel;
