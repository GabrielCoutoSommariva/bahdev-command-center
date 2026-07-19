import { useEffect, type ReactNode } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { LockKeyhole, LogOut, ShieldX } from "lucide-react";
import AdminPageMeta from "@/components/admin/AdminPageMeta";
import { Button } from "@/components/ui/button";
import { useAdminAccess } from "@/hooks/use-admin-access";
import { supabase } from "@/integrations/supabase/client";

type AdminProtectedRouteProps = {
  children: ReactNode;
  requireMfa?: boolean;
};

const ADMIN_IDLE_TIMEOUT_MS = 30 * 60 * 1000;

const AdminLoading = () => (
  <>
    <AdminPageMeta />
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
      <div className="text-center">
        <div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-white/20 border-t-primary-glow" />
        <p className="mt-4 text-sm text-white/60">Validando acesso seguro...</p>
      </div>
    </div>
  </>
);

const AdminProtectedRoute = ({ children, requireMfa = true }: AdminProtectedRouteProps) => {
  const access = useAdminAccess();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!access.session) return;

    let timeoutId = window.setTimeout(() => undefined, 0);
    const signOutAfterInactivity = () => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(async () => {
        await supabase.auth.signOut();
        navigate("/admin/blog/login", { replace: true });
      }, ADMIN_IDLE_TIMEOUT_MS);
    };

    const events: (keyof WindowEventMap)[] = ["pointerdown", "keydown", "scroll"];
    events.forEach((event) => window.addEventListener(event, signOutAfterInactivity, { passive: true }));
    signOutAfterInactivity();

    return () => {
      window.clearTimeout(timeoutId);
      events.forEach((event) => window.removeEventListener(event, signOutAfterInactivity));
    };
  }, [access.session, navigate]);

  if (access.loading) return <AdminLoading />;

  if (!access.session) {
    return <Navigate to="/admin/blog/login" replace state={{ from: location.pathname }} />;
  }

  if (!access.isAdmin) {
    return (
      <>
        <AdminPageMeta />
        <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl">
            <ShieldX className="mx-auto h-10 w-10 text-red-400" />
            <h1 className="mt-5 text-2xl font-bold">Acesso não autorizado</h1>
            <p className="mt-3 text-sm leading-6 text-white/60">
              Sua conta está autenticada, mas não está cadastrada como administradora do blog.
            </p>
            <Button
              variant="hero"
              size="lg"
              className="mt-6 w-full"
              onClick={async () => {
                await supabase.auth.signOut();
                navigate("/admin/blog/login", { replace: true });
              }}
            >
              <LogOut className="h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
      </>
    );
  }

  if (access.error && requireMfa) {
    return (
      <>
        <AdminPageMeta />
        <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
          <div className="max-w-md text-center">
            <LockKeyhole className="mx-auto h-10 w-10 text-primary-glow" />
            <h1 className="mt-4 text-xl font-bold">Não foi possível validar a segurança</h1>
            <p className="mt-2 text-sm text-white/60">Tente entrar novamente.</p>
          </div>
        </div>
      </>
    );
  }

  if (requireMfa && !access.hasVerifiedMfa) {
    return <Navigate to="/admin/blog/configurar-2fa" replace />;
  }

  if (requireMfa && access.currentAal !== "aal2") {
    return <Navigate to="/admin/blog/verificar-2fa" replace />;
  }

  return (
    <>
      <AdminPageMeta />
      {children}
    </>
  );
};

export default AdminProtectedRoute;
