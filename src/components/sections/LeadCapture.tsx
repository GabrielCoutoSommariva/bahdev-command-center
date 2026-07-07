import { useState } from "react";
import { SectionWrapper, AnimatedBlock } from "./SectionWrapper";
import { Button } from "@/components/ui/button";
import { Shield, Clock, UserCheck, Send } from "lucide-react";
import { z } from "zod";

const leadSchema = z.object({
  name: z.string().trim().min(1, "Obrigatório").max(100),
  company: z.string().trim().min(1, "Obrigatório").max(200),
  role: z.string().trim().min(1, "Obrigatório").max(100),
  units: z.string().trim().min(1, "Selecione"),
  contact: z.string().trim().min(1, "Obrigatório").max(200),
  message: z.string().trim().max(1000, "Máximo de 1000 caracteres"),
});

type LeadData = z.infer<typeof leadSchema>;
const unitOptions = ["1-10", "11-50", "51-100", "101-500", "500+"];

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xykqpdlz";

const trustSignals = [
  { icon: Clock, text: "Resposta em até 24h" },
  { icon: Shield, text: "Sem compromisso" },
  { icon: UserCheck, text: "Consultivo" },
];

const LeadCapture = () => {
  const [form, setForm] = useState<LeadData>({ name: "", company: "", role: "", units: "", contact: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof LeadData, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (field: keyof LeadData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    if (submitError) setSubmitError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    const result = leadSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof LeadData, string>> = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0] as keyof LeadData] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    const { name, company, role, units, contact, message } = result.data;
    const formattedMessage =
      `Novo lead pelo site Bahdev\n\n` +
      `Nome: ${name}\n` +
      `Empresa / Rede: ${company}\n` +
      `Cargo: ${role}\n` +
      `Unidades: ${units}\n` +
      `Contato: ${contact}\n` +
      `Mensagem: ${message || "Não informado"}`;

    setSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: "Novo lead pelo site Bahdev",
          name,
          company,
          role,
          units,
          contact,
          question: message,
          message: formattedMessage,
        }),
      });

      if (!response.ok) {
        throw new Error("Formspree request failed");
      }

      setSubmitted(true);
    } catch {
      setSubmitError("Não foi possível enviar agora. Tente novamente em alguns instantes.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "w-full px-3 py-2.5 rounded-lg bg-input text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all";
  const labelClass = "block text-xs font-semibold text-foreground/80 mb-1.5";

  if (submitted) {
    return (
      <SectionWrapper id="demo" className="scroll-mt-24">
        <AnimatedBlock className="max-w-md mx-auto text-center">
          <div className="p-8 rounded-xl bg-card shadow-card">
            <h2 className="text-section text-foreground mb-3">Tudo certo!</h2>
            <p className="text-sm text-muted-foreground">
              Recebemos seus dados. Em breve entraremos em contato para agendar a demonstração.
            </p>
          </div>
        </AnimatedBlock>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper id="demo" className="scroll-mt-24">
      <div className="grid lg:grid-cols-2 gap-10 items-start max-w-4xl mx-auto">
        <AnimatedBlock>
          <p className="text-caption text-primary font-semibold mb-2 uppercase tracking-wider">Demonstração</p>
          <h2 className="text-section text-foreground mb-4">Veja a Bahdev no seu cenário</h2>
          <p className="text-body text-muted-foreground max-w-[45ch] mb-5">
            Em poucos minutos, mostramos o fluxo ideal para sua rede.
          </p>
          <div className="flex flex-wrap gap-4">
            {trustSignals.map((s) => (
              <span key={s.text} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <s.icon className="h-3.5 w-3.5 text-primary" />
                {s.text}
              </span>
            ))}
          </div>
        </AnimatedBlock>

        <AnimatedBlock delay={0.1}>
          <form onSubmit={handleSubmit} className="p-5 md:p-6 rounded-xl bg-card shadow-card space-y-4">
            <div>
              <label className={labelClass} htmlFor="lead-name">Nome</label>
              <input id="lead-name" name="name" className={inputClass} placeholder="Seu nome" value={form.name} onChange={(e) => handleChange("name", e.target.value)} />
              {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className={labelClass} htmlFor="lead-company">Empresa / Rede</label>
              <input id="lead-company" name="company" className={inputClass} placeholder="Nome da empresa ou rede" value={form.company} onChange={(e) => handleChange("company", e.target.value)} />
              {errors.company && <p className="text-xs text-destructive mt-1">{errors.company}</p>}
            </div>
            <div>
              <label className={labelClass} htmlFor="lead-role">Cargo</label>
              <input id="lead-role" name="role" className={inputClass} placeholder="Seu cargo" value={form.role} onChange={(e) => handleChange("role", e.target.value)} />
              {errors.role && <p className="text-xs text-destructive mt-1">{errors.role}</p>}
            </div>
            <div>
              <label className={labelClass} htmlFor="lead-units">Quantidade de unidades</label>
              <select id="lead-units" name="units" className={inputClass} value={form.units} onChange={(e) => handleChange("units", e.target.value)}>
                <option value="">Selecione uma faixa</option>
                {unitOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              {errors.units && <p className="text-xs text-destructive mt-1">{errors.units}</p>}
            </div>
            <div>
              <label className={labelClass} htmlFor="lead-contact">Contato</label>
              <input id="lead-contact" name="contact" className={inputClass} placeholder="WhatsApp ou e-mail" value={form.contact} onChange={(e) => handleChange("contact", e.target.value)} />
              {errors.contact && <p className="text-xs text-destructive mt-1">{errors.contact}</p>}
            </div>
            <div>
              <label className={labelClass} htmlFor="lead-message">Mensagem</label>
              <textarea
                id="lead-message"
                name="message"
                className={`${inputClass} min-h-24 resize-none`}
                placeholder="Deixe uma dúvida, necessidade ou contexto da sua operação"
                value={form.message}
                onChange={(e) => handleChange("message", e.target.value)}
              />
              {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
            </div>
            {submitError && <p className="text-xs text-destructive text-center">{submitError}</p>}
            <Button variant="hero" size="lg" type="submit" className="w-full" disabled={submitting}>
              {submitting ? "Enviando..." : "Solicitar demonstração"}
              <Send className="ml-2 h-4 w-4" />
            </Button>
            <p className="text-xs text-center text-muted-foreground/60">
              Seus dados serão enviados com segurança para nossa equipe.
            </p>
          </form>
        </AnimatedBlock>
      </div>
    </SectionWrapper>
  );
};

export default LeadCapture;
