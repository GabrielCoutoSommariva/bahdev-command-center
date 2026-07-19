import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { KeyRound, LogOut, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/bahdev-logo-blue.png";

const AdminMfaVerify = () => {
  const [factorId, setFactorId] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    void supabase.auth.mfa.listFactors().then(({ data }) => {
      const factor = data?.totp.find((item) => item.status === "verified");
      if (!factor) {
        navigate("/admin/blog/configurar-2fa", { replace: true });
        return;
      }
      setFactorId(factor.id);
    });
  }, [navigate]);

  const verify = async () => {
    if (!factorId || code.length !== 6) return;
    setLoading(true);
    setError("");

    const { data: challenge, error: challengeError } = await supabase.auth.mfa.challenge({ factorId });
    if (challengeError) {
      setError("Não foi possível iniciar a verificação.");
      setLoading(false);
      return;
    }

    const { error: verifyError } = await supabase.auth.mfa.verify({
      factorId,
      challengeId: challenge.id,
      code,
    });

    if (verifyError) {
      setError("Código inválido ou expirado.");
      setLoading(false);
      return;
    }

    navigate("/admin/blog", { replace: true });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-12 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-7 shadow-2xl md:p-9">
        <img src={logo} alt="Bahdev" className="h-10 w-auto brightness-0 invert" />
        <div className="mt-8 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/20 text-primary-glow">
          <KeyRound className="h-6 w-6" />
        </div>
        <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-primary-glow">Segunda etapa</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-[-0.03em]">Digite seu código</h1>
        <p className="mt-3 text-sm leading-6 text-white/60">
          Abra o aplicativo autenticador e informe o código temporário de seis dígitos.
        </p>

        <label className="mt-7 block">
          <span className="sr-only">Código de autenticação</span>
          <input
            autoFocus
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            value={code}
            onChange={(event) => setCode(event.target.value.replace(/\D/g, ""))}
            onKeyDown={(event) => {
              if (event.key === "Enter") void verify();
            }}
            className="h-16 w-full rounded-xl border border-white/15 bg-white/5 px-4 text-center text-3xl font-bold tracking-[0.45em] outline-none focus:border-primary-glow"
            placeholder="000000"
          />
        </label>

        {error && <p role="alert" className="mt-4 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</p>}

        <Button variant="hero" size="lg" className="mt-6 w-full" onClick={verify} disabled={loading || code.length !== 6 || !factorId}>
          <ShieldCheck className="h-4 w-4" />
          {loading ? "Validando..." : "Validar e acessar"}
        </Button>
        <button
          type="button"
          onClick={async () => {
            await supabase.auth.signOut();
            navigate("/admin/blog/login", { replace: true });
          }}
          className="mt-4 flex w-full items-center justify-center gap-2 py-2 text-xs font-semibold text-white/45 hover:text-white"
        >
          <LogOut className="h-3.5 w-3.5" />
          Entrar com outra conta
        </button>
      </div>
    </div>
  );
};

export default AdminMfaVerify;
