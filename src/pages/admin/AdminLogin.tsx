import { useEffect, useState, type FormEvent } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LockKeyhole, ShieldCheck } from "lucide-react";
import AdminPageMeta from "@/components/admin/AdminPageMeta";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/bahdev-logo-blue.png";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const destination = (location.state as { from?: string } | null)?.from || "/admin/blog";

  useEffect(() => {
    void supabase.auth.getSession().then(({ data }) => {
      setAuthenticated(Boolean(data.session));
      setChecking(false);
    });
  }, []);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) {
      setError("E-mail ou senha inválidos.");
      setLoading(false);
      return;
    }

    navigate(destination, { replace: true });
  };

  if (!checking && authenticated) return <Navigate to="/admin/blog" replace />;

  return (
    <div className="grid min-h-screen bg-slate-950 lg:grid-cols-[1.05fr_0.95fr]">
      <AdminPageMeta />
      <section className="relative hidden overflow-hidden p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-primary/30 blur-[120px]" />
        <div className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-cyan-400/20 blur-[100px]" />
        <img src={logo} alt="Bahdev" className="relative h-12 w-auto self-start brightness-0 invert" />
        <div className="relative max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary-glow">
            <ShieldCheck className="h-4 w-4" />
            Ambiente protegido
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-[-0.035em] xl:text-5xl">
            Conteúdo organizado, acesso sob controle.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-white/60">
            Crie, revise e publique matérias no blog da Bahdev em um espaço exclusivo para administradores autorizados.
          </p>
        </div>
        <p className="relative text-xs text-white/35">© {new Date().getFullYear()} Bahdev</p>
      </section>

      <section className="flex items-center justify-center bg-white px-6 py-12 sm:px-10">
        <div className="w-full max-w-md">
          <img src={logo} alt="Bahdev" className="mb-10 h-11 w-auto lg:hidden" />
          <div className="mb-8 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <LockKeyhole className="h-6 w-6" />
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Administração do blog</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.03em] text-slate-950">Entre na sua conta</h2>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            Não existe cadastro público. Apenas contas previamente autorizadas conseguem continuar.
          </p>

          <form onSubmit={submit} className="mt-8 space-y-5">
            <label className="block">
              <span className="mb-2 block text-sm font-bold text-slate-700">E-mail</span>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
                placeholder="seu@email.com"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-bold text-slate-700">Senha</span>
              <span className="relative block">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={8}
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="h-12 w-full rounded-xl border border-slate-200 px-4 pr-12 text-sm outline-none transition focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
                  placeholder="Sua senha"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 hover:text-slate-700"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </span>
            </label>

            {error && (
              <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                {error}
              </p>
            )}

            <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading || checking}>
              {loading ? "Entrando..." : "Entrar com segurança"}
            </Button>
          </form>

          <div className="mt-8 flex items-start gap-3 rounded-xl bg-slate-50 p-4 text-xs leading-5 text-slate-500">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
            Após a senha, será solicitado o código do seu aplicativo autenticador.
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminLogin;
