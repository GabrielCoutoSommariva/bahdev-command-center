import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_URL = `https://wa.me/5551985901584?text=${encodeURIComponent(
  "Olá, li um conteúdo no blog e quero entender como a Bahdev pode ajudar minha operação.",
)}`;

const BlogCTA = () => (
  <section className="rounded-3xl bg-foreground px-6 py-10 text-center text-background md:px-12 md:py-14">
    <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-primary-glow">
      Da estratégia para a prática
    </p>
    <h2 className="mx-auto max-w-2xl text-2xl font-bold leading-tight md:text-3xl">
      Quer organizar a gestão, a comunicação ou o atendimento da sua rede?
    </h2>
    <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-background/70 md:text-base">
      Conte como sua operação funciona. A Bahdev ajuda a desenhar o caminho e conectar as soluções certas.
    </p>
    <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
      <Button asChild variant="hero" size="lg">
        <a href="/#demo">
          Fale conosco
          <ArrowRight className="h-4 w-4" />
        </a>
      </Button>
      <Button asChild variant="cta-outline-white" size="lg">
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </a>
      </Button>
    </div>
  </section>
);

export default BlogCTA;
