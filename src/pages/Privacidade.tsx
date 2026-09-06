import { Link, useLocation } from "react-router-dom";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEO from "@/components/SEO";
import { SectionWrapper, AnimatedBlock } from "@/components/sections/SectionWrapper";
import { ArrowLeft, ShieldCheck } from "lucide-react";

const LAST_UPDATE = "6 de setembro de 2026";

type PolicySection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  afterBullets?: string[];
};

const sections: PolicySection[] = [
  {
    title: "1. Quem somos",
    paragraphs: [
      "A Bahdev (\"nós\") é a controladora dos dados pessoais tratados por meio do site www.bahdev.com.br. Esta política também cobre a plataforma de software contratada por organizações clientes, situação em que a Bahdev atua como operadora, tratando dados em nome dessas organizações — conforme detalhado na seção 10. Estamos localizados na Tv. São José, 455, Navegantes, Porto Alegre - RS, CEP 90240-200.",
      "Esta Política de Privacidade explica, de forma transparente, quais dados pessoais coletamos, por que coletamos, como usamos e quais são os seus direitos, em conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 — LGPD).",
    ],
  },
  {
    title: "2. Quais dados coletamos",
    paragraphs: ["Coletamos dados pessoais nas seguintes situações:"],
    bullets: [
      "Formulário de contato: nome, empresa (opcional), contato (WhatsApp ou e-mail) e o conteúdo da mensagem que você nos envia.",
      "Contato por WhatsApp ou e-mail: os dados que você compartilhar diretamente conosco por esses canais, como número de telefone, e-mail e o teor das conversas.",
      "Dados de navegação: quando você visita o site, coletamos automaticamente, por meio de cookies e tecnologias similares, informações como endereço IP, tipo de dispositivo e navegador, páginas visitadas, origem do acesso e tempo de permanência.",
    ],
    afterBullets: [
      "Não solicitamos nem coletamos intencionalmente dados pessoais sensíveis (como saúde, religião ou biometria) por meio deste site.",
    ],
  },
  {
    title: "3. Para que usamos os seus dados",
    paragraphs: ["Utilizamos os dados pessoais coletados para as seguintes finalidades:"],
    bullets: [
      "Responder às suas solicitações de contato, dúvidas e pedidos de demonstração (execução de procedimentos preliminares a contrato, art. 7º, V, da LGPD).",
      "Entrar em contato comercial quando você solicita ser contatado (legítimo interesse e consentimento, art. 7º, IX e I).",
      "Medir e melhorar o desempenho do site, entender como os visitantes o utilizam e aprimorar nosso conteúdo (legítimo interesse, art. 7º, IX).",
      "Cumprir obrigações legais ou regulatórias, quando aplicável (art. 7º, II).",
    ],
  },
  {
    title: "4. Cookies e tecnologias de medição",
    paragraphs: [
      "Este site utiliza o Google Tag Manager e ferramentas de análise do Google para entender o uso das páginas (por exemplo, quais seções são mais visitadas). Essas ferramentas podem utilizar cookies e identificadores para coletar dados de navegação de forma agregada.",
      "Também utilizamos armazenamento local do navegador (localStorage/sessionStorage) para funcionalidades técnicas do site, como o roteamento interno de páginas — sem finalidade de rastreamento.",
      "Você pode gerenciar ou bloquear cookies nas configurações do seu navegador. Isso não impede o uso do site, mas pode afetar métricas de navegação.",
    ],
  },
  {
    title: "5. Com quem compartilhamos os dados",
    paragraphs: [
      "Não vendemos seus dados pessoais. Compartilhamos dados apenas com operadores que nos ajudam a manter o site e o atendimento funcionando:",
    ],
    bullets: [
      "Formspree: processa o envio das mensagens do formulário de contato até a nossa equipe.",
      "Google (Tag Manager/Analytics): mede a audiência e o uso do site.",
      "Provedores de hospedagem e infraestrutura do site e do blog.",
      "Meta (WhatsApp): quando você opta por falar conosco pelo WhatsApp, a conversa é processada pela plataforma da Meta, sujeita também às políticas dela.",
    ],
    afterBullets: [
      "Alguns desses fornecedores podem armazenar dados fora do Brasil. Nesses casos, a transferência internacional ocorre com base nas salvaguardas previstas na LGPD (art. 33), como cláusulas contratuais e padrões de segurança adequados.",
    ],
  },
  {
    title: "6. Por quanto tempo guardamos os dados",
    paragraphs: [
      "Mantemos os dados de contato pelo tempo necessário para atender à sua solicitação e ao relacionamento comercial decorrente dela. Dados de navegação são retidos pelos prazos padrão das ferramentas de análise utilizadas.",
      "Após esses períodos, os dados são excluídos ou anonimizados, salvo quando a manutenção for necessária para cumprimento de obrigação legal ou exercício regular de direitos.",
    ],
  },
  {
    title: "7. Como protegemos os dados",
    paragraphs: [
      "Adotamos medidas técnicas e organizacionais para proteger os dados pessoais contra acessos não autorizados, perda, alteração ou divulgação indevida — incluindo criptografia em trânsito (HTTPS), controle de acesso restrito e uso de fornecedores com boas práticas de segurança.",
    ],
  },
  {
    title: "8. Seus direitos",
    paragraphs: [
      "Nos termos do art. 18 da LGPD, você pode solicitar a qualquer momento:",
    ],
    bullets: [
      "Confirmação da existência de tratamento e acesso aos seus dados.",
      "Correção de dados incompletos, inexatos ou desatualizados.",
      "Anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade.",
      "Portabilidade dos dados, observados os regulamentos aplicáveis.",
      "Informação sobre com quem compartilhamos seus dados.",
      "Revogação do consentimento e eliminação dos dados tratados com base nele.",
    ],
    afterBullets: [
      "Para exercer qualquer desses direitos, escreva para atendimento@bahdev.com.br. Responderemos no menor prazo possível, dentro dos limites legais.",
    ],
  },
  {
    title: "9. Crianças e adolescentes",
    paragraphs: [
      "O site institucional da Bahdev é direcionado a empresas e profissionais. Não coletamos intencionalmente, por meio do site, dados pessoais de crianças ou adolescentes.",
      "Na plataforma, eventuais dados de crianças ou adolescentes tratados em nome de uma organização cliente são de responsabilidade dessa organização, que é a controladora desses dados — a Bahdev atua apenas como operadora, conforme a seção 10.",
    ],
  },
  {
    title: "10. Dados tratados na plataforma Bahdev",
    paragraphs: [
      "Além do site institucional, a Bahdev oferece uma plataforma de software contratada por organizações clientes, como associações, cooperativas, redes e franquias. Nesse contexto, a organização cliente é a controladora dos dados pessoais de seus associados, clientes e contatos, e a Bahdev atua como operadora, tratando esses dados exclusivamente para executar o serviço contratado e segundo as instruções dessa organização.",
      "Quando a organização cliente conecta sua própria conta do WhatsApp Business à plataforma, autorizando esse acesso no momento da conexão, passamos a tratar em nome dela:",
    ],
    bullets: [
      "Identificação da conta e do número de WhatsApp Business autorizados.",
      "Mensagens trocadas entre a organização e o público dela.",
      "Modelos de mensagem utilizados em comunicados e notificações.",
      "Status de envio, entrega e leitura dessas mensagens.",
    ],
    afterBullets: [
      "Esses dados são utilizados apenas para operar o atendimento daquela organização dentro da plataforma. Não são vendidos, não são compartilhados com terceiros para finalidades próprias da Bahdev, não são usados para publicidade e não são combinados com dados de outras organizações clientes. Ao término do contrato, são eliminados ou devolvidos à organização, conforme instrução dela.",
      "Titulares que desejem exercer seus direitos sobre dados tratados na plataforma devem procurar a organização controladora com quem se relacionam. A Bahdev apoia essa organização no atendimento da solicitação, no prazo e na forma previstos em contrato.",
    ],
  },
  {
    title: "11. Alterações desta política",
    paragraphs: [
      "Podemos atualizar esta Política de Privacidade para refletir mudanças no site, em ferramentas utilizadas ou na legislação. A versão vigente estará sempre publicada nesta página, com a data de atualização indicada no topo.",
    ],
  },
  {
    title: "12. Contato",
    paragraphs: [
      "Em caso de dúvidas sobre esta política ou sobre o tratamento dos seus dados pessoais, fale com a gente:",
    ],
    bullets: [
      "E-mail: atendimento@bahdev.com.br",
      "Telefone/WhatsApp: (51) 98590-1584",
      "Endereço: Tv. São José, 455, Navegantes, Porto Alegre - RS, 90240-200",
    ],
  },
];

const Privacidade = () => {
  const { pathname } = useLocation();

  return (
    <>
      <SEO
        title="Política de Privacidade | Bahdev"
        description="Saiba como a Bahdev coleta, usa e protege os seus dados pessoais, em conformidade com a LGPD."
        path={pathname}
      />
      <Navbar />
      <main>
        {/* Hero */}
        <SectionWrapper className="relative overflow-hidden !pt-28 md:!pt-32 !pb-12 md:!pb-14 bg-[linear-gradient(160deg,hsl(220_60%_9%),hsl(220_53%_15%)_55%,hsl(214_82%_20%))]">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-24 w-[480px] h-[480px] rounded-full bg-primary/25 blur-3xl" />
          </div>
          <div className="relative">
            <div className="mb-8 pt-4">
              <Link
                to="/"
                className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 backdrop-blur py-2 pl-3 pr-4 text-sm font-semibold text-white/90 transition-colors hover:bg-white/20"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                Voltar ao site
              </Link>
            </div>
            <AnimatedBlock className="max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 backdrop-blur px-4 py-2 text-sm font-bold text-white/90">
                <ShieldCheck className="h-4 w-4 text-primary-glow" />
                LGPD
              </div>
              <h1 className="text-white text-[clamp(2rem,3.4vw,3.1rem)] font-extrabold leading-[1.08] tracking-tight">
                Política de Privacidade
              </h1>
              <p className="mt-4 text-body text-white/65">
                Como a Bahdev coleta, usa e protege os seus dados pessoais.
              </p>
              <p className="mt-3 text-xs text-white/45">Última atualização: {LAST_UPDATE}</p>
            </AnimatedBlock>
          </div>
        </SectionWrapper>

        {/* Conteúdo */}
        <SectionWrapper className="bg-white">
          <div className="max-w-3xl mx-auto space-y-8">
            {sections.map((section) => (
              <AnimatedBlock key={section.title}>
                <div className="rounded-2xl border border-border/60 bg-card p-6 md:p-7 shadow-card">
                  <h2 className="text-lg md:text-xl font-extrabold text-foreground mb-3">{section.title}</h2>
                  {section.paragraphs?.map((p) => (
                    <p key={p} className="text-sm md:text-[15px] leading-7 text-muted-foreground mb-3 last:mb-0">
                      {p}
                    </p>
                  ))}
                  {section.bullets && (
                    <ul className="space-y-2 mb-3 last:mb-0">
                      {section.bullets.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm md:text-[15px] leading-7 text-muted-foreground">
                          <span className="mt-[11px] h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.afterBullets?.map((p) => (
                    <p key={p} className="text-sm md:text-[15px] leading-7 text-muted-foreground mb-3 last:mb-0">
                      {p}
                    </p>
                  ))}
                </div>
              </AnimatedBlock>
            ))}
          </div>
        </SectionWrapper>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default Privacidade;
