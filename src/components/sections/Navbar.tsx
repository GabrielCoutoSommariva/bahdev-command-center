import { type MouseEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import logoBlue from "../../assets/bahdev-logo-blue.png";

const WHATSAPP_URL = `https://wa.me/5551985901584?text=${encodeURIComponent("Olá, quero falar com a Bahdev.")}`;

const navLinks = [
  { label: "Produtos", href: "/#produtos" },
  { label: "Como funciona", href: "/#como-funciona" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/#faq" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleDemoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setOpen(false);

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
    <header className="fixed top-3 left-0 right-0 z-50 px-3 sm:px-6">
      <div className="container mx-auto max-w-5xl flex items-center justify-between h-14 rounded-full border border-border/70 bg-card/85 backdrop-blur-xl shadow-card px-4 sm:px-6">
        <Link to="/" aria-label="Bahdev — voltar à página inicial" className="flex items-center">
          <img
            src={logoBlue}
            alt="Bahdev"
            className="h-8 w-auto object-contain"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-caption text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost" size="sm" className="rounded-full" asChild>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </Button>
          <Button variant="hero" size="default" asChild>
            <a href="/#demo" onClick={handleDemoClick}>Fale conosco</a>
          </Button>
        </div>

        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={cn(
        "md:hidden container mx-auto max-w-5xl mt-2 overflow-hidden rounded-2xl transition-all duration-300",
        open ? "max-h-96 border border-border bg-card shadow-card-hover" : "max-h-0"
      )}>
        <div className="px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-body text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Button variant="hero" size="lg" className="mt-2" asChild>
            <a href="/#demo" onClick={handleDemoClick}>Fale conosco</a>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
