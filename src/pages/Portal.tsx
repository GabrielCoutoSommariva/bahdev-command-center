import ProductPage from "@/components/ProductPage";
import {
  LayoutDashboard, Bell, FileText, Megaphone, Users, ShieldCheck,
  Wallet, Folder, Zap, Smartphone, Clock, BarChart2,
} from "lucide-react";
import portalImg from "@/assets/bahdev-encartes.png";

const Portal = () => (
  <ProductPage
    badge="Módulo de produto"
    title="Portal do Associado"
    description="Centralize comunicados, campanhas, pedidos, materiais e serviços em um único portal — com acesso por unidade, perfil e região."
    heroIcon={LayoutDashboard}
    screenshot={portalImg}
    features={[
      { icon: Bell, title: "Comunicados", desc: "Avisos segmentados com leitura confirmada." },
      { icon: Megaphone, title: "Campanhas", desc: "Briefing, materiais e acompanhamento." },
      { icon: FileText, title: "Pedidos & solicitações", desc: "Fluxo padronizado e rastreável." },
      { icon: Folder, title: "Biblioteca de materiais", desc: "Documentos, mídias e modelos." },
      { icon: Users, title: "Acesso por perfil", desc: "Permissões por função e unidade." },
      { icon: Wallet, title: "Área financeira", desc: "Pendências e extratos por unidade." },
    ]}
    benefits={[
      { icon: Zap, title: "Tudo num lugar só", desc: "Fim de planilhas, e-mails e grupos espalhados." },
      { icon: ShieldCheck, title: "Acesso controlado", desc: "Cada usuário vê apenas o que importa." },
      { icon: Smartphone, title: "Mobile-first", desc: "Acesso de qualquer dispositivo." },
      { icon: Clock, title: "Histórico completo", desc: "Tudo registrado e auditável." },
    ]}
    highlights={[
      "Comunicação direta com associados, sem ruído",
      "Padronização de processos em toda a rede",
      "Engajamento com leitura e confirmação de avisos",
      "Materiais sempre atualizados e disponíveis",
    ]}
    ctaTitle="Pronto para organizar sua rede?"
    ctaDesc="Fale com a Bahdev e conte o que sua operação precisa organizar."
  />
);

export default Portal;
