import ProductPage from "@/components/ProductPage";
import {
  Megaphone, FileText, Send, Calendar, Tag, BarChart2,
  Users, Zap, Clock, CheckCircle2, Layers, Target,
} from "lucide-react";
import eventoImg from "@/assets/farmacias-evento.png";

const Campanhas = () => (
  <ProductPage
    badge="Módulo de produto"
    title="Campanhas & Comunicação"
    description="Briefing, execução, segmentação e histórico de campanhas para toda sua rede — com acompanhamento de adesão por unidade."
    heroIcon={Megaphone}
    screenshot={eventoImg}
    features={[
      { icon: FileText, title: "Briefing estruturado", desc: "Padrão único para todas as campanhas." },
      { icon: Send, title: "Disparos segmentados", desc: "Comunicação certa para cada público." },
      { icon: Calendar, title: "Agenda de campanhas", desc: "Planejamento e calendário integrado." },
      { icon: Tag, title: "Tags e categorias", desc: "Organização por tipo, marca ou objetivo." },
      { icon: BarChart2, title: "Acompanhamento", desc: "Adesão, leitura e engajamento." },
      { icon: Layers, title: "Materiais centralizados", desc: "Artes, vídeos e textos versionados." },
    ]}
    benefits={[
      { icon: Zap, title: "Execução mais ágil", desc: "Do briefing ao disparo em horas, não dias." },
      { icon: Target, title: "Mensagem certa", desc: "Segmentação por unidade, região ou perfil." },
      { icon: Users, title: "Engajamento real", desc: "Veja quem leu, abriu e participou." },
      { icon: Clock, title: "Histórico auditável", desc: "Toda campanha registrada e consultável." },
    ]}
    highlights={[
      "Padronização da comunicação em toda a rede",
      "Mensuração clara de resultado por campanha",
      "Materiais sempre atualizados e versionados",
      "Integração com WhatsApp e canais oficiais",
    ]}
    ctaTitle="Comunicação que gera resultado"
    ctaDesc="Veja como organizar suas campanhas e medir o impacto em cada unidade."
  />
);

export default Campanhas;
