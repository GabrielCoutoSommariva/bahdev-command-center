import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, X, ArrowRight } from "lucide-react";

const STORAGE_KEY = "bahdev_solutions_popup_dismissed";

const SolutionsPopup = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    let shown = false;
    const onScroll = () => {
      if (shown) return;
      const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (scrolled > 0.35) {
        shown = true;
        setOpen(true);
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const timer = window.setTimeout(() => {
      if (!shown) {
        shown = true;
        setOpen(true);
        window.removeEventListener("scroll", onScroll);
      }
    }, 18000);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(timer);
    };
  }, []);

  const dismiss = () => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className="fixed z-50 left-4 right-4 bottom-24 md:left-auto md:right-8 md:bottom-8 md:w-[360px] rounded-2xl bg-card border border-border shadow-2xl overflow-hidden"
        >
          <div className="relative p-5">
            <button
              onClick={dismiss}
              aria-label="Fechar"
              className="absolute top-3 right-3 p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <motion.div
                animate={{ rotate: [0, 12, -8, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 1.6 }}
                className="p-1.5 rounded-lg bg-primary/10"
              >
                <Sparkles className="h-4 w-4 text-primary" />
              </motion.div>
              <span className="text-[10px] font-semibold text-primary uppercase tracking-wider">
                Novidade
              </span>
            </div>

            <h3 className="font-bold text-card-foreground mb-1.5 pr-6">
              Conheça nossas outras soluções
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Da plataforma Omnichannel ao Portal do Associado — descubra todos os módulos Bahdev.
            </p>

            <div className="flex items-center gap-2">
              <a
                href="#produtos"
                onClick={dismiss}
                className="flex-1 inline-flex items-center justify-center gap-1 text-sm font-semibold text-white bg-primary hover:bg-primary/90 rounded-lg px-3 py-2 transition-colors"
              >
                Ver produtos <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                to="/omnichannel"
                onClick={dismiss}
                className="text-sm font-semibold text-primary hover:underline px-2"
              >
                Omnichannel
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SolutionsPopup;
