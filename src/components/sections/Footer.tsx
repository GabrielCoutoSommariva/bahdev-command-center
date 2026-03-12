import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground text-background">
    {/* Final CTA */}
    <div className="container mx-auto px-6 py-20 text-center border-b border-muted/10">
      <h2 className="text-section mb-4">
        Sua operação precisa de visibilidade,<br className="hidden sm:block" /> não de mais improviso.
      </h2>
      <p className="text-body opacity-70 max-w-xl mx-auto mb-8">
        Agende uma demonstração consultiva e veja como a Bahdev se aplica ao seu cenário.
      </p>
      <Button variant="hero" size="xl" asChild>
        <a href="#demo">
          Agendar demonstração
          <ArrowRight className="ml-2 h-5 w-5" />
        </a>
      </Button>
    </div>

    {/* Footer links */}
    <div className="container mx-auto px-6 py-12">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <p className="text-lg font-extrabold mb-4">Bahdev</p>
          <p className="text-sm opacity-60 max-w-[30ch]">
            Plataforma de gestão centralizada para redes, associações e cooperativas.
          </p>
        </div>
        <div>
          <p className="text-caption font-semibold mb-3 opacity-80">Plataforma</p>
          <ul className="space-y-2 text-sm opacity-60">
            <li><a href="#solucao" className="hover:opacity-100 transition-opacity">Solução</a></li>
            <li><a href="#como-funciona" className="hover:opacity-100 transition-opacity">Como funciona</a></li>
            <li><a href="#beneficios" className="hover:opacity-100 transition-opacity">Benefícios</a></li>
            <li><a href="#planos" className="hover:opacity-100 transition-opacity">Planos</a></li>
          </ul>
        </div>
        <div>
          <p className="text-caption font-semibold mb-3 opacity-80">Empresa</p>
          <ul className="space-y-2 text-sm opacity-60">
            <li><a href="#para-quem" className="hover:opacity-100 transition-opacity">Para quem</a></li>
            <li><a href="#case" className="hover:opacity-100 transition-opacity">Cases</a></li>
            <li><a href="#faq" className="hover:opacity-100 transition-opacity">FAQ</a></li>
          </ul>
        </div>
        <div>
          <p className="text-caption font-semibold mb-3 opacity-80">Contato</p>
          <ul className="space-y-2 text-sm opacity-60">
            <li><a href="#demo" className="hover:opacity-100 transition-opacity">Agendar demonstração</a></li>
            <li><a href="#demo" className="hover:opacity-100 transition-opacity">Solicitar diagnóstico</a></li>
          </ul>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-muted/10 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-xs opacity-40">© {new Date().getFullYear()} Bahdev. Todos os direitos reservados.</p>
        <div className="flex items-center gap-6 text-xs opacity-40">
          <a href="#" className="hover:opacity-100 transition-opacity">Política de Privacidade</a>
          <a href="#" className="hover:opacity-100 transition-opacity">Termos de Uso</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
