import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, Mail, Phone, MapPin } from "lucide-react";
import fecomercioSenacLogo from "../../assets/programa-fecomercio-senac.png";
import foundersClubPrimeLogo from "../../assets/programa-founders-club-prime.svg";
import iabLogo from "../../assets/programa-iab.png";
import membroCaldeiraLogo from "../../assets/programa-membro-caldeira.png";

const WHATSAPP_URL = `https://wa.me/5551985901584?text=${encodeURIComponent("Olá, quero entender como a Bahdev pode funcionar na minha operação.")}`;

const programGroups = [
  {
    title: "Programas que participamos",
    programs: [
      {
        name: "Fecomercio RS e Senac",
        logo: fecomercioSenacLogo,
        className: "w-72",
        imageClassName: "scale-125",
      },
      {
        name: "IAB",
        logo: iabLogo,
        className: "w-36",
        imageClassName: "scale-90",
      },
    ],
  },
  {
    title: "Membros",
    programs: [
      {
        name: "Founders Club Prime",
        logo: foundersClubPrimeLogo,
        className: "w-72",
      },
      {
        name: "Membro Caldeira",
        logo: membroCaldeiraLogo,
        className: "w-40",
        href: "https://institutocaldeira.org.br",
      },
    ],
  },
];

const Footer = () => (
  <footer className="bg-foreground text-background pb-20 md:pb-0">
    {/* Final CTA */}
    <div className="container mx-auto px-5 md:px-6 py-14 text-center border-b border-muted/10">
      <h2 className="text-section mb-3">Quer falar com a Bahdev?</h2>
      <p className="text-sm opacity-70 max-w-md mx-auto mb-6">
        Envie sua mensagem e retornamos com o melhor caminho para sua operação.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Button variant="hero" size="lg" className="text-white" asChild>
          <a href="/#demo">Fale conosco <ArrowRight className="ml-2 h-4 w-4" /></a>
        </Button>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm opacity-70 hover:opacity-100 transition-opacity">
          <MessageCircle className="h-4 w-4" /> WhatsApp
        </a>
      </div>
    </div>

    {/* Info */}
    <div className="container mx-auto px-5 md:px-6 py-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
        <div>
          <p className="font-extrabold mb-3">Bahdev</p>
          <p className="text-xs opacity-60 mb-3">Gestão centralizada para redes e associações.</p>
          <div className="space-y-1.5 text-xs opacity-60">
            <a href="mailto:atendimento@bahdev.com.br" className="flex items-center gap-1.5 hover:opacity-100"><Mail className="h-3 w-3" />atendimento@bahdev.com.br</a>
            <a href="tel:+5551985901584" className="flex items-center gap-1.5 hover:opacity-100"><Phone className="h-3 w-3" />(51) 98590-1584</a>
            <a href="https://maps.google.com/?q=Tv.+Sao+Jose,+455,+Navegantes,+Porto+Alegre,+RS" target="_blank" rel="noopener noreferrer" className="flex items-start gap-1.5 hover:opacity-100">
              <MapPin className="h-3 w-3 shrink-0 mt-0.5" />
              <span>Tv. São José, 455, Navegantes, Porto Alegre - RS, 90240-200</span>
            </a>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold mb-2 opacity-80">Plataforma</p>
          <ul className="space-y-1.5 text-xs opacity-60">
            <li><a href="/#solucao" className="hover:opacity-100">Solução</a></li>
            <li><a href="/#como-funciona" className="hover:opacity-100">Como funciona</a></li>
            <li><a href="/#beneficios" className="hover:opacity-100">Benefícios</a></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold mb-2 opacity-80">Empresa</p>
          <ul className="space-y-1.5 text-xs opacity-60">
            <li><a href="/#para-quem" className="hover:opacity-100">Para quem</a></li>
            <li><a href="/#case" className="hover:opacity-100">Cases</a></li>
            <li><a href="/blog" className="hover:opacity-100">Blog</a></li>
            <li><a href="/#faq" className="hover:opacity-100">FAQ</a></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold mb-2 opacity-80">Contato</p>
          <ul className="space-y-1.5 text-xs opacity-60">
            <li><a href="/#demo" className="hover:opacity-100">Fale conosco</a></li>
            <li><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:opacity-100">WhatsApp</a></li>
            <li><a href="/politica-de-privacidade" className="hover:opacity-100">Política de Privacidade</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-muted/10 grid gap-6 lg:grid-cols-2">
        {programGroups.map((group) => (
          <div key={group.title}>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] opacity-50 mb-4">
              {group.title}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {group.programs.map((program) => {
                const card = (
                  <div className={`${program.className} h-20 rounded-md bg-white px-4 py-3 shadow-sm`}>
                    <img
                      src={program.logo}
                      alt={program.name}
                      className={`h-full w-full object-contain object-center ${program.imageClassName ?? ""}`}
                      loading="lazy"
                    />
                  </div>
                );

                return program.href ? (
                  <a key={program.name} href={program.href} target="_blank" rel="noopener noreferrer" aria-label={`Abrir site ${program.name}`}>
                    {card}
                  </a>
                ) : (
                  <div key={program.name}>{card}</div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 pt-6 border-t border-muted/10 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-center">
        <p className="text-xs opacity-40">© {new Date().getFullYear()} Bahdev. Todos os direitos reservados.</p>
        <a href="/politica-de-privacidade" className="text-xs opacity-40 hover:opacity-80 underline underline-offset-2">
          Política de Privacidade
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
