import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Copy, KeyRound, ShieldCheck, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/bahdev-logo-blue.png";

type Enrollment = {
  id: string;
  qrCode: string;
  secret: string;
};

const AdminMfaSetup = () => {
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    void supabase.auth.mfa.listFactors().then(({ data }) => {
      if (data?.totp.some((factor) => factor.status === "verified")) {
        navigate("/admin/blog/verificar-2fa", { replace: true });
      }
    });
  }, [navigate]);

  const startEnrollment = async () => {
    setLoading(true);
    setError("");

    const { data: factors } = await supabase.auth.mfa.listFactors();
    const unverified =
      factors?.all.filter(
        (factor) => factor.factor_type === "totp" && factor.status === "unverified",
      ) ?? [];
    await Promise.all(unverified.map((factor) => supabase.auth.mfa.unenroll({ factorId: factor.id })));

    const { data, error: enrollError } = await supabase.auth.mfa.enroll({
      factorType: "totp",
      friendlyName: "Bahdev Blog Admin",
    });

    if (enrollError) {
      setError("Não foi possível iniciar a configuração. Tente novamente.");
      setLoading(false);
      return;
    }

    setEnrollment({ id: data.id, qrCode: data.totp.qr_code, secret: data.totp.secret });
    setLoading(false);
  };

  const verify = async () => {
    if (!enrollment || code.length !== 6) return;
    setLoading(true);
    setError("");

    const { data: challenge, error: challengeError } = await supabase.auth.mfa.challenge({
      factorId: enrollment.id,
    });

    if (challengeError) {
      setError("Não foi possível validar o código.");
      setLoading(false);
      return;
    }

    const { error: verifyError } = await supabase.auth.mfa.verify({
      factorId: enrollment.id,
      challengeId: challenge.id,
      code,
    });

    if (verifyError) {
      setError("Código inválido ou expirado. Gere um novo código e tente novamente.");
      setLoading(false);
      return;
    }

    navigate("/admin/blog", { replace: true });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-12 text-white">
      <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur md:p-9">
        <img src={logo} alt="Bahdev" className="h-10 w-auto brightness-0 invert" />
        <div className="mt-8 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/20 text-primary-glow">
          <Smartphone className="h-6 w-6" />
        </div>
        <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-primary-glow">Proteção obrigatória</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-[-0.03em]">Configure a autenticação em duas etapas</h1>
        <p className="mt-3 text-sm leading-6 text-white/60">
          Use Google Authenticator, Microsoft Authenticator, Authy ou outro aplicativo compatível com TOTP.
        </p>

        {!enrollment ? (
          <Button variant="hero" size="lg" className="mt-7 w-full" onClick={startEnrollment} disabled={loading}>
            <KeyRound className="h-4 w-4" />
            {loading ? "Preparando..." : "Ativar proteção em duas etapas"}
          </Button>
        ) : (
          <div className="mt-7 space-y-6">
            <div className="rounded-2xl bg-white p-5 text-center">
              <img src={enrollment.qrCode} alt="QR Code para configurar autenticação" className="mx-auto h-48 w-48" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/50">Ou informe esta chave</p>
              <div className="mt-2 flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 p-3">
                <code className="min-w-0 flex-1 break-all text-xs text-primary-glow">{enrollment.secret}</code>
                <button
                  type="button"
                  onClick={async () => {
                    await navigator.clipboard.writeText(enrollment.secret);
                    setCopied(true);
                    window.setTimeout(() => setCopied(false), 1600);
                  }}
                  className="rounded-lg p-2 text-white/50 hover:bg-white/10 hover:text-white"
                  aria-label="Copiar chave secreta"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
              <span className="mt-1 block h-4 text-xs text-emerald-300">{copied ? "Chave copiada" : ""}</span>
            </div>
            <label className="block">
              <span className="mb-2 block text-sm font-bold">Código de 6 dígitos</span>
              <input
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                value={code}
                onChange={(event) => setCode(event.target.value.replace(/\D/g, ""))}
                className="h-14 w-full rounded-xl border border-white/15 bg-white/5 px-4 text-center text-2xl font-bold tracking-[0.4em] outline-none focus:border-primary-glow"
                placeholder="000000"
              />
            </label>
            <Button variant="hero" size="lg" className="w-full" onClick={verify} disabled={loading || code.length !== 6}>
              <ShieldCheck className="h-4 w-4" />
              {loading ? "Validando..." : "Confirmar e entrar no painel"}
            </Button>
          </div>
        )}

        {error && <p role="alert" className="mt-5 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</p>}
      </div>
    </div>
  );
};

export default AdminMfaSetup;
