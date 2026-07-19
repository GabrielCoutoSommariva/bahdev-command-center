import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { BookOpen, ExternalLink, FilePlus2, LayoutDashboard, LogOut, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/bahdev-logo-blue.png";

const navigation = [
  { label: "Visão geral", to: "/admin/blog", icon: LayoutDashboard, end: true },
  { label: "Nova matéria", to: "/admin/blog/novo", icon: FilePlus2, end: false },
];

const AdminLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    void supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? ""));
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/admin/blog/login", { replace: true });
  };

  const sidebar = (
    <>
      <div className="flex h-20 items-center border-b border-white/10 px-6">
        <img src={logo} alt="Bahdev" className="h-10 w-auto brightness-0 invert" />
      </div>
      <div className="flex flex-1 flex-col justify-between overflow-y-auto p-4">
        <div>
          <div className="mb-5 px-2">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary-glow">Administração</p>
            <p className="mt-1 text-sm font-semibold text-white">Blog Bahdev</p>
          </div>
          <nav className="space-y-1" aria-label="Menu administrativo">
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-colors",
                    isActive
                      ? "bg-primary text-white shadow-lg shadow-primary/20"
                      : "text-white/60 hover:bg-white/5 hover:text-white",
                  )
                }
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            ))}
            <Link
              to="/blog"
              target="_blank"
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-white/60 transition-colors hover:bg-white/5 hover:text-white"
            >
              <BookOpen className="h-4 w-4" />
              Ver blog
              <ExternalLink className="ml-auto h-3.5 w-3.5" />
            </Link>
          </nav>
        </div>

        <div className="border-t border-white/10 pt-4">
          <p className="truncate px-3 text-xs text-white/45">{email}</p>
          <button
            type="button"
            onClick={signOut}
            className="mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-white/60 transition-colors hover:bg-red-500/10 hover:text-red-300"
          >
            <LogOut className="h-4 w-4" />
            Sair com segurança
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-slate-100 text-slate-950">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col bg-slate-950 lg:flex">
        {sidebar}
      </aside>

      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-5 lg:hidden">
        <img src={logo} alt="Bahdev" className="h-9 w-auto" />
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Abrir menu administrativo"
          className="rounded-lg border border-slate-200 p-2"
        >
          <Menu className="h-5 w-5" />
        </button>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
            aria-label="Fechar menu"
          />
          <aside className="relative flex h-full w-72 flex-col bg-slate-950 text-white shadow-2xl">
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Fechar menu administrativo"
              className="absolute right-4 top-5 rounded-lg p-2 text-white/60 hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </button>
            {sidebar}
          </aside>
        </div>
      )}

      <main className="min-h-screen lg:pl-64">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
