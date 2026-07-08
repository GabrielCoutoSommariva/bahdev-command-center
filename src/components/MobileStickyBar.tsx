import { type MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

const MobileStickyBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleDemoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const scrollToDemo = () => {
      document.getElementById("demo")?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    if (location.pathname !== "/") {
      navigate("/#demo");
      window.setTimeout(scrollToDemo, 100);
      return;
    }

    if (location.hash !== "#demo") {
      navigate("/#demo");
    }
    window.setTimeout(scrollToDemo, 0);
  };

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 2, type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-card/95 backdrop-blur-xl border-t border-border px-4 py-2.5 safe-bottom"
    >
      <Button variant="hero" size="lg" className="w-full" asChild>
        <a href="/#demo" onClick={handleDemoClick}>
          Fale conosco
          <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </Button>
    </motion.div>
  );
};

export default MobileStickyBar;
