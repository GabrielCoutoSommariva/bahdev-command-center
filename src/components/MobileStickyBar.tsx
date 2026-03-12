import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const MobileStickyBar = () => (
  <motion.div
    initial={{ y: 100 }}
    animate={{ y: 0 }}
    transition={{ delay: 2, type: "spring", stiffness: 300, damping: 30 }}
    className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-card/95 backdrop-blur-xl border-t border-border px-4 py-2.5 safe-bottom"
  >
    <Button variant="hero" size="lg" className="w-full" asChild>
      <a href="#demo">
        Agendar demonstração
        <ArrowRight className="ml-2 h-4 w-4" />
      </a>
    </Button>
  </motion.div>
);

export default MobileStickyBar;
