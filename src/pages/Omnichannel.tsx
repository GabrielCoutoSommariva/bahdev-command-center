import ProductPage from "@/components/ProductPage";
import {
  Headphones, Bot, Users, Inbox, Filter, Send, BarChart2,
  Zap, Shield, Smartphone, Clock,
} from "lucide-react";
import omniScreenshot from "@/assets/omnichannel-platform.png";

const Omnichannel = () => (
  <ProductPage
    badge="Módulo de produto"
    title="Plataforma Omnichannel"
    description="Centralize WhatsApp, chat, e-mail e redes sociais em uma única interface. Equipes, bots e métricas integrados — pronto para escalar o seu atendimento."
    heroIcon={Headphones}
    screenshot={omniScreenshot}
    features={[
      { icon: Inbox, title: "Caixa unificada", desc: "WhatsApp, chat, e-mail e redes em um só lugar." },
      { icon: Users, title: "Atendimento por equipe", desc: "Filas, grupos e distribuição inteligente." },
      { icon: Bot, title: "Bot e automações", desc: "Respostas rápidas, fluxos e triagem automática." },
      { icon: Filter, title: "Filtros e tags", desc: "Organize conversas por status, setor ou prioridade." },
      { icon: Send, title: "Campanhas em massa", desc: "Disparos segmentados com histórico completo." },
      { icon: BarChart2, title: "Métricas em tempo real", desc: "TMA, SLA, produtividade e satisfação." },
    ]}
    benefits={[
      { icon: Zap, title: "Resposta mais rápida", desc: "Reduza o TMA com automações e respostas prontas." },
      { icon: Shield, title: "WhatsApp oficial", desc: "API homologada com múltiplos atendentes." },
      { icon: Smartphone, title: "Acesso de qualquer lugar", desc: "Web e mobile — atenda de onde estiver." },
      { icon: Clock, title: "Histórico completo", desc: "Toda conversa registrada e auditável." },
    ]}
    highlights={[
      "Roteamento por setor, fila ou unidade",
      "Bots para FAQs e qualificação de leads",
      "Relatórios de produtividade e satisfação",
      "Integração com CRM, ERPs e BI",
    ]}
    ctaTitle="Pronto para unificar seu atendimento?"
    ctaDesc="Agende uma demonstração e veja a plataforma rodando com dados da sua operação."
  />
);

export default Omnichannel;
