import { AnimatedBlock } from "./SectionWrapper";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";

interface TrustCTAProps {
  headline: string;
  subtext: string;
  variant?: "light" | "blue";
}

const WHATSAPP_NUMBER = "5551985901584";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Olá, quero entender como a Bahdev pode funcionar na minha operação."
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

const TrustCTA = ({ headline, subtext, variant = "light" }: TrustCTAProps) => {
  const isBlue = variant === "blue";

  return (
    <section className={isBlue ? "bg-primary" : "bg-muted/30"}>
      <div className="container mx-auto px-6 py-14">
        <AnimatedBlock className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-5xl mx-auto">
          <div className={isBlue ? "text-primary-foreground" : ""}>
            <h3 className={`text-card-title mb-1 ${isBlue ? "" : "text-foreground"}`}>
              {headline}
            </h3>
            <p className={`text-body ${isBlue ? "opacity-80" : "text-muted-foreground"}`}>
              {subtext}
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Button
              variant={isBlue ? "default" : "hero"}
              size="lg"
              className={isBlue ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold" : ""}
              asChild
            >
              <a href="#demo">
                Solicitar demonstração
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                isBlue
                  ? "text-primary-foreground/80 hover:text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </div>
        </AnimatedBlock>
      </div>
    </section>
  );
};

export default TrustCTA;
