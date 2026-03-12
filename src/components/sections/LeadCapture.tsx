import { useState } from "react";
import { SectionWrapper, AnimatedBlock } from "./SectionWrapper";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Clock, UserCheck } from "lucide-react";
import { z } from "zod";

const leadSchema = z.object({
  name: z.string().trim().min(1, "Obrigatório").max(100),
  company: z.string().trim().min(1, "Obrigatório").max(200),
  role: z.string().trim().min(1, "Obrigatório").max(100),
  units: z.string().trim().min(1, "Selecione"),
  contact: z.string().trim().min(1, "Obrigatório").max(200),
});

type LeadData = z.infer<typeof leadSchema>;
const unitOptions = ["1-10", "11-50", "51-100", "101-500", "500+"];

const trustSignals = [
  { icon: Clock, text: "Resposta em até 24h" },
  { icon: Shield, text: "Sem compromisso" },
  { icon: UserCheck, text: "Consultivo" },
];

const LeadCapture = () => {
  const [form, setForm] = useState<LeadData>({ name: "", company: "", role: "", units: "", contact: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof LeadData, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: keyof LeadData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = leadSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof LeadData, string>> = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0] as keyof LeadData] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }
    console.log("Lead submitted:", result.data);
    setSubmitted(true);
  };

  const inputClass = "w-full px-3 py-2.5 rounded-lg bg-input text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all";

  if (submitted) {
    return (
      <SectionWrapper id="demo">
        <AnimatedBlock className="max-w-md mx-auto text-center">
          <div className="p-8 rounded-xl bg-card shadow-card">
            <h2 className="text-section text-foreground mb-3">Obrigado!</h2>
            <p className="text-sm text-muted-foreground">Entraremos em contato em breve.</p>
          </div>
        </AnimatedBlock>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper id="demo">
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
          <form onSubmit={handleSubmit} className="p-5 md:p-6 rounded-xl bg-card shadow-card space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <input className={inputClass} placeholder="Seu nome" value={form.name} onChange={(e) => handleChange("name", e.target.value)} />
                {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
              </div>
              <div>
                <input className={inputClass} placeholder="Empresa / Rede" value={form.company} onChange={(e) => handleChange("company", e.target.value)} />
                {errors.company && <p className="text-xs text-destructive mt-1">{errors.company}</p>}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <input className={inputClass} placeholder="Cargo" value={form.role} onChange={(e) => handleChange("role", e.target.value)} />
                {errors.role && <p className="text-xs text-destructive mt-1">{errors.role}</p>}
              </div>
              <div>
                <select className={inputClass} value={form.units} onChange={(e) => handleChange("units", e.target.value)}>
                  <option value="">Unidades</option>
                  {unitOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                {errors.units && <p className="text-xs text-destructive mt-1">{errors.units}</p>}
              </div>
            </div>
            <div>
              <input className={inputClass} placeholder="WhatsApp ou e-mail" value={form.contact} onChange={(e) => handleChange("contact", e.target.value)} />
              {errors.contact && <p className="text-xs text-destructive mt-1">{errors.contact}</p>}
            </div>
            <Button variant="hero" size="lg" type="submit" className="w-full">
              Agendar demonstração
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <p className="text-xs text-center text-muted-foreground/60">Sem compromisso.</p>
          </form>
        </AnimatedBlock>
      </div>
    </SectionWrapper>
  );
};

export default LeadCapture;
