import ProductPage from "@/components/ProductPage";
import {
  BarChart4, TrendingUp, PieChart, Map, Filter, Download,
  Eye, Layers, Zap, Target, Clock, ShieldCheck,
} from "lucide-react";
import dashImg from "@/assets/farmacias-dashboard.png";

const Dashboards = () => (
  <ProductPage
    badge="Módulo de produto"
    title="Dashboards & BI"
    description="Indicadores por unidade, região e setor — com visão consolidada para tomada de decisão rápida e baseada em dados."
    heroIcon={BarChart4}
    screenshot={dashImg}
    features={[
      { icon: TrendingUp, title: "KPIs em tempo real", desc: "Métricas atualizadas continuamente." },
      { icon: PieChart, title: "Visões personalizadas", desc: "Painéis por área, região ou função." },
      { icon: Map, title: "Análise geográfica", desc: "Mapas e visões por região." },
      { icon: Filter, title: "Filtros dinâmicos", desc: "Cruze dados sem precisar de TI." },
      { icon: Download, title: "Exportação", desc: "PDF, Excel e CSV em poucos cliques." },
      { icon: Layers, title: "Drill-down", desc: "Do consolidado ao detalhe por unidade." },
    ]}
    benefits={[
      { icon: Eye, title: "Visibilidade total", desc: "Entenda sua operação de cima a baixo." },
      { icon: Zap, title: "Decisão rápida", desc: "Menos achismo, mais ação baseada em dados." },
      { icon: Target, title: "Foco no que importa", desc: "Indicadores certos para cada perfil." },
      { icon: ShieldCheck, title: "Dados seguros", desc: "Acesso por permissão e auditável." },
    ]}
    highlights={[
      "Painéis prontos para gestão e diretoria",
      "Comparativo entre unidades, regiões e períodos",
      "Indicadores financeiros, comerciais e operacionais",
      "Integração com ERPs, CRMs e fontes externas",
    ]}
    ctaTitle="Transforme dados em decisão"
    ctaDesc="Veja como sua operação fica clara com dashboards personalizados para sua realidade."
  />
);

export default Dashboards;
