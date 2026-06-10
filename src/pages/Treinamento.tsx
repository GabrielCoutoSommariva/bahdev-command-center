import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Award,
  BarChart3,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Lock,
  Medal,
  Play,
  Search,
  Sparkles,
  Star,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { AnimatedBlock, SectionWrapper, containerVariants, itemVariants } from "@/components/sections/SectionWrapper";
import treinamentoBanner from "@/assets/dashboard-bahdev-treinamento.png";

type ProductModule = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

type Course = {
  category: string;
  title: string;
  desc: string;
  status: string;
  completion: string;
  students: string;
  tone: string;
};

const modules: ProductModule[] = [
  { icon: LayoutDashboard, title: "Dashboard executivo", desc: "KPIs de aprendizagem, conclusão, engajamento e certificados em um só painel." },
  { icon: BookOpen, title: "Cursos e módulos", desc: "Organize aulas, materiais, avaliações e status de publicação." },
  { icon: GraduationCap, title: "Trilhas de capacitação", desc: "Monte jornadas por cargo, equipe, unidade ou nível de maturidade." },
  { icon: Users, title: "Usuários e equipes", desc: "Controle acesso, progresso e desempenho por grupo ou colaborador." },
  { icon: CheckCircle2, title: "Avaliações", desc: "Valide conhecimento com provas, checks de conclusão e critérios de aprovação." },
  { icon: Trophy, title: "Gamificação", desc: "Ranking, conquistas e estímulos para aumentar adesão e recorrência." },
  { icon: Award, title: "Certificados", desc: "Emissão automática de certificados conforme regras de conclusão." },
  { icon: BarChart3, title: "Relatórios", desc: "Visões por curso, equipe, período, categoria e status de aprendizagem." },
];

const courses: Course[] = [
  {
    category: "Onboarding",
    title: "Onboarding de Novos Colaboradores",
    desc: "Cultura, processos e ferramentas essenciais para começar bem.",
    status: "Publicado",
    completion: "87%",
    students: "234",
    tone: "from-blue-600 to-blue-400",
  },
  {
    category: "Compliance",
    title: "Segurança da Informação",
    desc: "Boas práticas digitais, senhas, phishing e proteção de dados.",
    status: "Publicado",
    completion: "72%",
    students: "412",
    tone: "from-sky-300 to-blue-200",
  },
  {
    category: "Soft Skills",
    title: "Atendimento ao Cliente",
    desc: "Técnicas modernas de atendimento, empatia e resolução de conflitos.",
    status: "Publicado",
    completion: "65%",
    students: "156",
    tone: "from-indigo-400 to-blue-400",
  },
];

const benefits = [
  "Visão consolidada de aprendizagem para diretoria, RH, líderes e operação.",
  "Padronização de treinamento por equipe, unidade, cargo ou trilha obrigatória.",
  "Gestão completa do ciclo: criação, publicação, acompanhamento, avaliação e certificado.",
  "Indicadores claros para agir antes que baixa adesão vire problema operacional.",
];

const CourseCard = ({ course }: { course: Course }) => (
  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-card-hover">
    <div className={`relative h-24 bg-gradient-to-br ${course.tone}`}>
      <span className="absolute left-4 top-4 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-600">{course.status}</span>
      <BookOpen className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 text-white/90" />
      <button className="absolute right-4 top-4 rounded-lg bg-white/90 px-2.5 py-1 text-blue-600">•••</button>
    </div>
    <div className="p-5">
      <p className="text-xs font-medium text-slate-500">{course.category}</p>
      <h3 className="mt-1 font-bold text-slate-950">{course.title}</h3>
      <p className="mt-2 min-h-12 text-sm text-slate-600">{course.desc}</p>
      <div className="mt-4 flex items-center gap-6 border-b border-slate-100 pb-4 text-xs text-slate-500">
        <span className="flex items-center gap-1.5"><BookOpen className="h-3.5 w-3.5" />5 mód.</span>
        <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" />{course.students}</span>
        <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />4h 30min</span>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-slate-500">Conclusão <strong className="text-blue-600">{course.completion}</strong></span>
        <span className="rounded-lg border border-blue-100 px-3 py-1 text-xs font-semibold text-blue-600">Editar</span>
      </div>
    </div>
  </div>
);

const LearningExperiencePreview = () => (
  <div className="grid gap-6 lg:grid-cols-[1.8fr_0.9fr]">
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-xl shadow-blue-950/5">
      <div className="relative flex h-72 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#061b41] via-[#062b66] to-[#04132f]">
        <button className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-blue-600 shadow-xl">
          <Play className="ml-1 h-9 w-9 fill-current" />
        </button>
        <div className="absolute inset-x-6 bottom-6 flex items-center gap-4 text-white">
          <Play className="h-4 w-4 fill-current" />
          <div className="h-2 flex-1 rounded-full bg-white/15">
            <div className="h-full w-2/3 rounded-full bg-blue-500" />
          </div>
          <span className="text-xs font-semibold">06:18 / 15:00</span>
        </div>
      </div>
      <div className="p-3 md:p-5">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-600">Aula 4 · Módulo 2</p>
        <h3 className="mt-2 text-2xl font-black tracking-tight text-slate-950">Aplicações práticas</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Uma experiência de estudo guiada com vídeo, materiais complementares, progresso do módulo e liberação da próxima aula conforme regras de conclusão.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {['Apostila completa.pdf', 'Exercícios resolvidos.pdf'].map((file) => (
            <div key={file} className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700">
              <FileText className="h-4 w-4 text-blue-600" />
              {file}
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-blue-950/5">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-black text-slate-950">Aulas do módulo</h3>
        <span className="text-sm font-bold text-slate-700">50%</span>
      </div>
      <div className="mb-6 h-2 rounded-full bg-slate-200">
        <div className="h-full w-1/2 rounded-full bg-blue-600" />
      </div>
      <div className="space-y-3">
        {[
          ['Boas-vindas ao curso', '5 min', CheckCircle2, true],
          ['Objetivos e expectativas', '8 min', CheckCircle2, true],
          ['Conceitos básicos', '12 min', CheckCircle2, true],
          ['Aplicações práticas', '15 min', Play, false],
          ['Estudo de caso', '20 min', Clock, false],
          ['Tópicos avançados', '18 min', Lock, false],
        ].map(([title, time, Icon, done]) => {
          const LessonIcon = Icon as LucideIcon;

          return (
            <div key={title as string} className={`flex items-center gap-3 rounded-xl border px-4 py-3 ${title === 'Aplicações práticas' ? 'border-blue-500 bg-blue-50/40' : 'border-slate-200'}`}>
              <LessonIcon className={`h-5 w-5 ${done ? 'text-blue-500' : 'text-slate-400'}`} />
              <div>
                <p className="text-sm font-bold text-slate-800">{title as string}</p>
                <p className="text-xs text-slate-500">{time as string}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

const Treinamento = () => (
  <>
    <Navbar />
    <main className="pt-16">
      <SectionWrapper className="overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(11,107,255,0.16),transparent_36%),linear-gradient(180deg,rgba(11,107,255,0.08),rgba(255,255,255,1)_70%)]">
        <div className="mb-8">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 rounded-full bg-white/80 py-2 pl-3 pr-4 text-sm font-semibold text-primary shadow-sm ring-1 ring-primary/10 transition-colors hover:bg-primary/10"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Voltar ao site
          </Link>
        </div>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.45fr] lg:items-center">
          <AnimatedBlock>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary">
              <Sparkles className="h-4 w-4" />
              Novo módulo de produto
            </div>
            <h1 className="text-hero text-foreground">Treinamento Capacitação</h1>
            <p className="mt-5 text-body-lg text-muted-foreground">
              Um painel completo para administrar treinamentos, cursos, trilhas, alunos, equipes, certificados e indicadores de aprendizagem com visão total do produto.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="hero" size="lg">
                <a href="/#demo">Agendar demonstração</a>
              </Button>
              <Button asChild variant="hero-outline" size="lg">
                <a href="#visao-produto">Ver visão do painel</a>
              </Button>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-3 text-center">
              {['Cursos', 'Trilhas', 'Certificados'].map((item) => (
                <div key={item} className="rounded-2xl border border-primary/10 bg-white/80 px-3 py-4 shadow-sm">
                  <p className="text-sm font-bold text-foreground">{item}</p>
                  <p className="mt-1 text-xs text-muted-foreground">em um só lugar</p>
                </div>
              ))}
            </div>
          </AnimatedBlock>
          <AnimatedBlock delay={0.1}>
            <div className="overflow-hidden rounded-[1.75rem] border border-white/70 bg-white shadow-2xl shadow-blue-950/10">
              <img
                src={treinamentoBanner}
                alt="Dashboard de treinamento com indicadores, gráfico de conclusões, status dos alunos e progresso por equipe"
                className="w-full"
                loading="eager"
              />
            </div>
          </AnimatedBlock>
        </div>
      </SectionWrapper>

      <SectionWrapper id="visao-produto" className="bg-white">
        <AnimatedBlock className="mx-auto mb-10 max-w-3xl text-center">
          <p className="text-caption font-semibold uppercase tracking-wider text-primary">Visão total do produto</p>
          <h2 className="mt-2 text-section text-foreground">Tudo que a gestão precisa para acompanhar capacitação</h2>
          <p className="mt-3 text-body text-muted-foreground">
            O Treinamento Capacitação combina operação diária, experiência de estudo e indicadores executivos para que RH, liderança e administração saibam exatamente onde agir.
          </p>
        </AnimatedBlock>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {modules.map((item) => (
            <motion.div key={item.title} variants={itemVariants} className="rounded-2xl border border-border bg-card p-5 shadow-card transition-shadow hover:shadow-card-hover">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-card-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </SectionWrapper>

      <SectionWrapper className="bg-muted/30">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <AnimatedBlock className="max-w-2xl">
            <p className="text-caption font-semibold uppercase tracking-wider text-primary">Gestão de cursos</p>
            <h2 className="mt-2 text-section text-foreground">Catálogo organizado, pesquisável e acionável</h2>
            <p className="mt-3 text-body text-muted-foreground">
              Controle cursos publicados, rascunhos, categorias, módulos, alunos vinculados e evolução de conclusão com visual limpo para operação diária.
            </p>
          </AnimatedBlock>
          <AnimatedBlock delay={0.1} className="flex gap-2 rounded-2xl border border-border bg-white p-2 shadow-sm">
            <div className="flex min-w-0 items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-500">
              <Search className="h-4 w-4" />
              Buscar cursos...
            </div>
            <div className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-600">Status</div>
          </AnimatedBlock>
        </div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-5 md:grid-cols-3"
        >
          {courses.map((course) => (
            <motion.div key={course.title} variants={itemVariants}>
              <CourseCard course={course} />
            </motion.div>
          ))}
        </motion.div>
      </SectionWrapper>

      <SectionWrapper>
        <AnimatedBlock className="mx-auto mb-10 max-w-3xl text-center">
          <p className="text-caption font-semibold uppercase tracking-wider text-primary">Experiência do aluno</p>
          <h2 className="mt-2 text-section text-foreground">Aprendizagem guiada, mensurável e pronta para escalar</h2>
          <p className="mt-3 text-body text-muted-foreground">
            Além do painel administrativo, o módulo organiza a jornada de estudo com player, lista de aulas, materiais, progresso e regras de conclusão.
          </p>
        </AnimatedBlock>
        <AnimatedBlock delay={0.1}>
          <LearningExperiencePreview />
        </AnimatedBlock>
      </SectionWrapper>

      <SectionWrapper className="bg-foreground text-background">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <AnimatedBlock>
            <p className="text-caption font-semibold uppercase tracking-wider text-primary">Por que usar</p>
            <h2 className="mt-2 text-section">Capacitação conectada com a operação</h2>
            <p className="mt-4 text-body text-background/70">
              O Treinamento Capacitação não é apenas uma área de cursos. Ele funciona como uma central de gestão para garantir padronização, acompanhamento e evolução contínua das equipes.
            </p>
          </AnimatedBlock>
          <AnimatedBlock delay={0.1}>
            <div className="grid gap-3">
              {benefits.map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <p className="text-sm leading-6 text-background/80">{item}</p>
                </div>
              ))}
            </div>
          </AnimatedBlock>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <AnimatedBlock className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-primary p-8 text-white md:p-12">
          <div className="grid gap-8 md:grid-cols-[1fr_0.8fr] md:items-center">
            <div>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                <Medal className="h-6 w-6" />
              </div>
              <h2 className="text-section">Quer ver o Treinamento Capacitação no seu cenário?</h2>
              <p className="mt-4 text-body text-white/85">
                Em uma demonstração, mostramos como estruturar cursos, trilhas, equipes, certificados e dashboards com a realidade da sua operação.
              </p>
            </div>
            <div className="rounded-2xl bg-white/12 p-5">
              <div className="mb-5 flex items-center gap-1 text-yellow-300">
                {[1, 2, 3, 4, 5].map((item) => <Star key={item} className="h-5 w-5 fill-current" />)}
              </div>
              <p className="text-sm leading-6 text-white/90">Ideal para redes, associações e operações que precisam treinar times distribuídos com controle, indicadores e experiência simples.</p>
              <Button asChild variant="hero-light" size="lg" className="mt-6 w-full !text-primary hover:!text-primary">
                <a href="/#demo" className="!text-primary hover:!text-primary">
                  Solicitar demonstração
                  <ChevronRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </AnimatedBlock>
      </SectionWrapper>
    </main>
    <Footer />
    <WhatsAppButton />
  </>
);

export default Treinamento;
