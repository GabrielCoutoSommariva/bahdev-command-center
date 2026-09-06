import ProductPage from "@/components/ProductPage";
import SessonDashboardMockup from "@/components/mockups/SessonDashboardMockup";
import {
  CalendarCheck, CalendarClock, Users, NotebookPen, Wallet, FileCheck2,
  MessageCircle, BellRing, Clock, Globe, ShieldCheck,
} from "lucide-react";

const Sesson = () => (
  <ProductPage
    badge="Produto Bahdev"
    title="Sesson"
    description="Agenda, clientes e financeiro num só lugar. A plataforma da Bahdev para o profissional autônomo organizar a rotina de atendimentos sem depender de planilhas ou grupos de WhatsApp."
    heroIcon={CalendarCheck}
    screenshotSlot={<SessonDashboardMockup className="max-w-md mx-auto" />}
    features={[
      { icon: CalendarClock, title: "Agenda inteligente", desc: "Compromissos do dia, da semana e do mês num painel único." },
      { icon: Users, title: "Cadastro de clientes", desc: "Contato, histórico e preferências organizados por cliente." },
      { icon: NotebookPen, title: "Prontuário e anotações", desc: "Registre evolução e observações de cada atendimento." },
      { icon: Wallet, title: "Painel financeiro", desc: "Receitas, pendências e recebimentos num só lugar." },
      { icon: FileCheck2, title: "Declarações automáticas", desc: "Emita comprovantes de atendimento em poucos cliques." },
      { icon: MessageCircle, title: "Lembretes por WhatsApp", desc: "Reduza faltas com confirmações e avisos automáticos." },
    ]}
    benefits={[
      { icon: BellRing, title: "Menos faltas", desc: "Confirmações automáticas reduzem cancelamentos de última hora." },
      { icon: Clock, title: "Mais tempo de atendimento", desc: "Menos tempo organizando agenda, mais tempo com o cliente." },
      { icon: Globe, title: "Imagem profissional", desc: "Página pública própria para apresentar seu trabalho." },
      { icon: ShieldCheck, title: "Dados organizados", desc: "Histórico e financeiro sempre à mão, sem planilhas soltas." },
    ]}
    highlights={[
      "Página pública personalizada com seus serviços",
      "Agendamento online disponível 24 horas por dia",
      "Lembretes e confirmações automáticas por WhatsApp",
      "Painel financeiro simples, sem depender de planilhas",
    ]}
    ctaTitle="Pronto para organizar sua agenda?"
    ctaDesc="Fale com a Bahdev e conheça o Sesson para a sua rotina de atendimentos."
  />
);

export default Sesson;
