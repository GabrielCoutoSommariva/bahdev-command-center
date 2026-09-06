import { Link, useLocation } from "react-router-dom";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEO from "@/components/SEO";
import { SectionWrapper, AnimatedBlock } from "@/components/sections/SectionWrapper";
import { ArrowLeft, Scale } from "lucide-react";

const LAST_UPDATE = "6 de setembro de 2026";

type PolicySection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  afterBullets?: string[];
};

const sections: PolicySection[] = [
  {
    title: "1. Aceitação dos termos",
    paragraphs: [
      "Estes Termos de Uso regem o acesso e a utilização da plataforma Bahdev, disponibilizada por Bahdev Serviços de Consultoria de TI LTDA, inscrita no CNPJ sob o nº 40.513.322/0001-59, com sede na Tv. São José, 455, Navegantes, Porto Alegre - RS, CEP 90240-200 (\"Bahdev\").",
      "Ao contratar, acessar ou utilizar a plataforma, a organização contratante (\"Cliente\") declara que leu, compreendeu e concorda com estes Termos. Caso não concorde, não deve utilizar a plataforma.",
    ],
  },
  {
    title: "2. Definições",
    bullets: [
      "Plataforma: o conjunto de módulos de software oferecidos pela Bahdev, incluindo portal, workflow, comunicação, indicadores e a plataforma de atendimento omnichannel.",
      "Cliente: a organização que contrata a plataforma, como associações, cooperativas, redes e franquias.",
      "Usuário Autorizado: pessoa indicada pelo Cliente para acessar a plataforma com credenciais próprias.",
      "Público Final: as pessoas com quem o Cliente se comunica por meio da plataforma, como associados, cooperados, clientes e contatos.",
    ],
  },
  {
    title: "3. Objeto e escopo",
    paragraphs: [
      "A Bahdev concede ao Cliente uma licença de uso não exclusiva, intransferível e revogável da plataforma, limitada ao prazo e às condições da proposta comercial ou do contrato firmado entre as partes.",
      "Os módulos ativos, os limites de uso e os valores são definidos nesse instrumento comercial. Em caso de divergência entre estes Termos e o contrato assinado, prevalece o contrato.",
    ],
  },
  {
    title: "4. Contas e credenciais",
    paragraphs: [
      "O Cliente é responsável por indicar seus Usuários Autorizados, manter os dados de cadastro atualizados e zelar pelo sigilo das credenciais de acesso.",
      "Todo acesso realizado com as credenciais do Cliente presume-se por ele realizado. O Cliente deve comunicar imediatamente à Bahdev qualquer suspeita de uso não autorizado.",
      "A Bahdev pode suspender credenciais em caso de risco à segurança da plataforma ou de terceiros, comunicando o Cliente.",
    ],
  },
  {
    title: "5. Integração com o WhatsApp Business",
    paragraphs: [
      "A plataforma permite que o Cliente conecte sua própria conta do WhatsApp Business, de titularidade dele, autorizando a Bahdev a operá-la em seu nome para fins de atendimento.",
      "Ao utilizar essa integração, o Cliente declara e se obriga a:",
    ],
    bullets: [
      "Ser o titular legítimo do número e da conta conectados.",
      "Cumprir os Termos de Serviço da Meta, a Política Comercial do WhatsApp e a Política de Mensagens Comerciais do WhatsApp, bem como qualquer política que venha a substituí-las.",
      "Obter e manter o consentimento (opt-in) das pessoas para quem envia mensagens, e atender aos pedidos de descadastramento (opt-out).",
      "Não utilizar a plataforma para envio de mensagens não solicitadas, spam, conteúdo enganoso, ilícito ou que viole direitos de terceiros.",
      "Responder pelo conteúdo das mensagens enviadas e pela base legal do tratamento dos dados do seu Público Final.",
    ],
    afterBullets: [
      "O descumprimento dessas obrigações pode acarretar restrições impostas pela Meta à conta do Cliente, incluindo suspensão, sobre as quais a Bahdev não tem ingerência.",
    ],
  },
  {
    title: "6. Condutas vedadas",
    paragraphs: ["É vedado ao Cliente e aos Usuários Autorizados:"],
    bullets: [
      "Utilizar a plataforma para finalidade ilícita ou contrária a estes Termos.",
      "Tentar obter acesso não autorizado a sistemas, dados ou contas de terceiros.",
      "Realizar engenharia reversa, cópia, descompilação ou redistribuição do software.",
      "Utilizar a plataforma para enviar código malicioso ou realizar atividade que comprometa sua disponibilidade ou segurança.",
      "Compartilhar credenciais com pessoas não autorizadas.",
    ],
  },
  {
    title: "7. Proteção de dados",
    paragraphs: [
      "No tratamento dos dados pessoais do Público Final, o Cliente é o controlador e a Bahdev atua como operadora, nos termos da Lei nº 13.709/2018 (LGPD) e da Política de Privacidade da Bahdev, disponível em https://www.bahdev.com.br/politica-de-privacidade, que integra estes Termos.",
      "O Cliente é responsável por informar seu Público Final sobre o tratamento de dados e por atender às solicitações de titulares, com o apoio da Bahdev.",
    ],
  },
  {
    title: "8. Propriedade intelectual",
    paragraphs: [
      "A plataforma, seu código, sua identidade visual, sua documentação e suas funcionalidades são de titularidade exclusiva da Bahdev. Estes Termos não transferem qualquer direito de propriedade intelectual ao Cliente.",
      "Os dados e conteúdos inseridos pelo Cliente na plataforma permanecem de titularidade dele.",
    ],
  },
  {
    title: "9. Disponibilidade, suporte e manutenção",
    paragraphs: [
      "A Bahdev empreende esforços para manter a plataforma disponível de forma contínua, podendo realizar manutenções programadas, preferencialmente com aviso prévio, e manutenções emergenciais quando necessário.",
      "A plataforma depende de serviços de terceiros, como provedores de infraestrutura e as APIs da Meta. Indisponibilidades decorrentes desses serviços não são imputáveis à Bahdev.",
      "Os canais e prazos de suporte são os definidos no contrato ou na proposta comercial.",
    ],
  },
  {
    title: "10. Valores e pagamento",
    paragraphs: [
      "Os valores, a periodicidade e as condições de reajuste são os previstos no instrumento comercial firmado entre as partes.",
      "Os custos cobrados pela Meta pelo envio de mensagens no WhatsApp são de responsabilidade do Cliente, conforme a tabela vigente da Meta, salvo se disposto de outra forma no contrato.",
    ],
  },
  {
    title: "11. Limitação de responsabilidade",
    paragraphs: [
      "A Bahdev não responde por danos indiretos, lucros cessantes ou perda de oportunidade decorrentes do uso ou da impossibilidade de uso da plataforma.",
      "A Bahdev não responde pelo conteúdo das mensagens enviadas pelo Cliente, pelas decisões tomadas com base nas informações da plataforma, nem por sanções aplicadas ao Cliente por terceiros, incluindo a Meta.",
      "A responsabilidade total da Bahdev fica limitada ao valor pago pelo Cliente nos 12 (doze) meses anteriores ao evento que originou a demanda, salvo disposição contratual diversa.",
    ],
  },
  {
    title: "12. Vigência, rescisão e devolução de dados",
    paragraphs: [
      "Estes Termos vigoram enquanto durar a relação contratual entre as partes.",
      "Encerrado o contrato, o Cliente poderá solicitar a exportação dos seus dados dentro do prazo de 30 (trinta) dias. Findo esse prazo, os dados são eliminados, ressalvadas as hipóteses de guarda obrigatória previstas em lei.",
      "A Bahdev pode suspender ou encerrar o acesso em caso de descumprimento destes Termos, de inadimplência ou de determinação legal.",
    ],
  },
  {
    title: "13. Alterações destes termos",
    paragraphs: [
      "A Bahdev pode atualizar estes Termos para refletir mudanças na plataforma, em serviços de terceiros ou na legislação. A versão vigente estará sempre publicada nesta página, com a data de atualização indicada no topo. Alterações relevantes serão comunicadas ao Cliente pelos canais de contato cadastrados.",
    ],
  },
  {
    title: "14. Legislação e foro",
    paragraphs: [
      "Estes Termos são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro da Comarca de Porto Alegre - RS para dirimir controvérsias, com renúncia a qualquer outro, por mais privilegiado que seja.",
    ],
  },
  {
    title: "15. Contato",
    bullets: [
      "E-mail: atendimento@bahdev.com.br",
      "Telefone/WhatsApp: (51) 98590-1584",
      "Endereço: Tv. São José, 455, Navegantes, Porto Alegre - RS, 90240-200",
    ],
  },
];

const TermosDeUso = () => {
  const { pathname } = useLocation();

  return (
    <>
      <SEO
        title="Termos de Uso | Bahdev"
        description="Condições de contratação e uso da plataforma Bahdev."
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
                <Scale className="h-4 w-4 text-primary-glow" />
                LEGAL
              </div>
              <h1 className="text-white text-[clamp(2rem,3.4vw,3.1rem)] font-extrabold leading-[1.08] tracking-tight">
                Termos de Uso
              </h1>
              <p className="mt-4 text-body text-white/65">
                Condições de contratação e uso da plataforma Bahdev.
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

export default TermosDeUso;
