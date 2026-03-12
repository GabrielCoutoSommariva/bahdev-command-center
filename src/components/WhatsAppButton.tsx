import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

const WHATSAPP_NUMBER = "5500000000000"; // Replace with actual number
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Olá, quero entender como a Bahdev pode funcionar na minha operação."
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

const tooltips = [
  "Fale com um especialista",
  "Tirar dúvidas no WhatsApp",
  "Quer ver no seu cenário?",
];

const WhatsAppButton = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipIndex, setTooltipIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  // Show tooltip after 8s, cycle every 20s
  useEffect(() => {
    const showTimer = setTimeout(() => {
      setShowTooltip(true);
    }, 8000);

    const cycleTimer = setInterval(() => {
      setTooltipIndex((prev) => (prev + 1) % tooltips.length);
      setShowTooltip(true);
    }, 20000);

    return () => {
      clearTimeout(showTimer);
      clearInterval(cycleTimer);
    };
  }, []);

  // Auto-hide tooltip after 5s
  useEffect(() => {
    if (showTooltip && !dismissed) {
      const hide = setTimeout(() => setShowTooltip(false), 5000);
      return () => clearTimeout(hide);
    }
  }, [showTooltip, dismissed]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3 md:bottom-8 md:right-8">
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && !dismissed && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="hidden sm:flex items-center gap-2 bg-card text-foreground rounded-xl px-4 py-3 shadow-card-hover text-sm font-medium max-w-[220px]"
          >
            <span>{tooltips[tooltipIndex]}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setDismissed(true);
                setShowTooltip(false);
              }}
              className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Fechar"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp FAB */}
      <motion.a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contato via WhatsApp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl transition-shadow"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
        <MessageCircle className="h-6 w-6 relative z-10" fill="currentColor" />
      </motion.a>
    </div>
  );
};

export default WhatsAppButton;
