import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const WHATSAPP_NUMBER = "5551985901584";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Olá, quero entender como a Bahdev pode funcionar na minha operação."
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

const MobileStickyBar = () => (
  <motion.div
    initial={{ y: 100 }}
    animate={{ y: 0 }}
    transition={{ delay: 2, type: "spring", stiffness: 300, damping: 30 }}
    className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-card/95 backdrop-blur-xl border-t border-border px-4 py-3 safe-bottom"
  >
    <div className="flex items-center gap-3">
      <Button variant="hero" size="lg" className="flex-1" asChild>
        <a href="#demo">
          Agendar demonstração
          <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </Button>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#25D366] text-white shrink-0 hover:opacity-90 transition-opacity"
      >
        <MessageCircle className="h-5 w-5" fill="currentColor" />
      </a>
    </div>
  </motion.div>
);

export default MobileStickyBar;
