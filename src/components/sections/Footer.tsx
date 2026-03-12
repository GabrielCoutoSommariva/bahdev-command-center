import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, Mail, Phone } from "lucide-react";

const WHATSAPP_URL = `https://wa.me/5551985901584?text=${encodeURIComponent("Olá, quero entender como a Bahdev pode funcionar na minha operação.")}`;

const Footer = () => (
  <footer className="bg-foreground text-background pb-20 md:pb-0">
    {/* Final CTA */}
    <div className="container mx-auto px-5 md:px-6 py-14 text-center border-b border-muted/10">
      <h2 className="text-section mb-3">Quer ver a Bahdev no seu cenário?</h2>
      <p className="text-sm opacity-70 max-w-md mx-auto mb-6">
        Em 30 minutos, mostramos como centralizar comunicação, workflow e indicadores.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Button variant="hero" size="lg" asChild>
          <a href="#demo">Solicitar demonstração <ArrowRight className="ml-2 h-4 w-4" /></a>
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
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold mb-2 opacity-80">Plataforma</p>
          <ul className="space-y-1.5 text-xs opacity-60">
            <li><a href="#solucao" className="hover:opacity-100">Solução</a></li>
            <li><a href="#como-funciona" className="hover:opacity-100">Como funciona</a></li>
            <li><a href="#beneficios" className="hover:opacity-100">Benefícios</a></li>
            <li><a href="#planos" className="hover:opacity-100">Planos</a></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold mb-2 opacity-80">Empresa</p>
          <ul className="space-y-1.5 text-xs opacity-60">
            <li><a href="#para-quem" className="hover:opacity-100">Para quem</a></li>
            <li><a href="#case" className="hover:opacity-100">Cases</a></li>
            <li><a href="#faq" className="hover:opacity-100">FAQ</a></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold mb-2 opacity-80">Contato</p>
          <ul className="space-y-1.5 text-xs opacity-60">
            <li><a href="#demo" className="hover:opacity-100">Demonstração</a></li>
            <li><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:opacity-100">WhatsApp</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-muted/10 text-center">
        <p className="text-xs opacity-40">© {new Date().getFullYear()} Bahdev. Todos os direitos reservados.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
