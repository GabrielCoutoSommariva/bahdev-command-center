import { useState } from "react";
import { SectionWrapper, AnimatedBlock } from "./SectionWrapper";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { z } from "zod";

const leadSchema = z.object({
  name: z.string().trim().min(1, "Nome é obrigatório").max(100),
  company: z.string().trim().min(1, "Empresa é obrigatória").max(200),
  role: z.string().trim().min(1, "Cargo é obrigatório").max(100),
  units: z.string().trim().min(1, "Selecione uma opção"),
  challenge: z.string().trim().min(1, "Descreva seu desafio").max(500),
  contact: z.string().trim().min(1, "Informe um contato").max(200),
});

type LeadData = z.infer<typeof leadSchema>;

const unitOptions = ["1-10", "11-50", "51-100", "101-500", "500+"];

const LeadCapture = () => {
  const [form, setForm] = useState<LeadData>({
    name: "", company: "", role: "", units: "", challenge: "", contact: "",
  });
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
        const field = issue.path[0] as keyof LeadData;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }
    // TODO: Save to Lovable Cloud
    console.log("Lead submitted:", result.data);
    setSubmitted(true);
  };

  const inputClass = "w-full px-4 py-3 rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all";

  if (submitted) {
    return (
      <SectionWrapper id="demo">
        <AnimatedBlock className="max-w-xl mx-auto text-center">
          <div className="p-12 rounded-2xl bg-card shadow-card">
            <h2 className="text-section text-foreground mb-4">Obrigado!</h2>
            <p className="text-body text-muted-foreground">
              Recebemos seus dados. Nossa equipe entrará em contato em breve para
              agendar sua demonstração consultiva.
            </p>
          </div>
        </AnimatedBlock>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper id="demo">
      <div className="grid lg:grid-cols-2 gap-16 items-start max-w-5xl mx-auto">
        <AnimatedBlock>
          <p className="text-caption text-primary font-semibold mb-3 uppercase tracking-wider">
            Demonstração
          </p>
          <h2 className="text-section text-foreground mb-6">
            Veja a Bahdev aplicada ao seu cenário
          </h2>
          <p className="text-body text-muted-foreground max-w-[50ch] mb-6">
            Em poucos minutos, mostramos o fluxo ideal para sua rede.
            Comece pelo que mais dói. Evolua sem travar a operação.
          </p>
          <ul className="space-y-3 text-body text-muted-foreground">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
              Demonstração personalizada para seu cenário
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
              Diagnóstico dos principais gargalos
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
              Recomendação de módulos sob medida
            </li>
          </ul>
        </AnimatedBlock>

        <AnimatedBlock delay={0.15}>
          <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-card shadow-card space-y-4">
            <div>
              <label htmlFor="lead-name" className="text-caption text-foreground mb-1 block">Nome</label>
              <input id="lead-name" className={inputClass} placeholder="Seu nome completo" value={form.name} onChange={(e) => handleChange("name", e.target.value)} />
              {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="lead-company" className="text-caption text-foreground mb-1 block">Empresa / Rede</label>
              <input id="lead-company" className={inputClass} placeholder="Nome da empresa ou rede" value={form.company} onChange={(e) => handleChange("company", e.target.value)} />
              {errors.company && <p className="text-xs text-destructive mt-1">{errors.company}</p>}
            </div>
            <div>
              <label htmlFor="lead-role" className="text-caption text-foreground mb-1 block">Cargo</label>
              <input id="lead-role" className={inputClass} placeholder="Ex: Diretor de operações" value={form.role} onChange={(e) => handleChange("role", e.target.value)} />
              {errors.role && <p className="text-xs text-destructive mt-1">{errors.role}</p>}
            </div>
            <div>
              <label htmlFor="lead-units" className="text-caption text-foreground mb-1 block">Número de unidades</label>
              <select id="lead-units" className={inputClass} value={form.units} onChange={(e) => handleChange("units", e.target.value)}>
                <option value="">Selecione</option>
                {unitOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt} unidades</option>
                ))}
              </select>
              {errors.units && <p className="text-xs text-destructive mt-1">{errors.units}</p>}
            </div>
            <div>
              <label htmlFor="lead-challenge" className="text-caption text-foreground mb-1 block">Principal desafio hoje</label>
              <textarea id="lead-challenge" className={`${inputClass} resize-none`} rows={3} placeholder="Descreva brevemente o principal gargalo da sua operação" value={form.challenge} onChange={(e) => handleChange("challenge", e.target.value)} />
              {errors.challenge && <p className="text-xs text-destructive mt-1">{errors.challenge}</p>}
            </div>
            <div>
              <label htmlFor="lead-contact" className="text-caption text-foreground mb-1 block">WhatsApp ou e-mail</label>
              <input id="lead-contact" className={inputClass} placeholder="Seu melhor contato" value={form.contact} onChange={(e) => handleChange("contact", e.target.value)} />
              {errors.contact && <p className="text-xs text-destructive mt-1">{errors.contact}</p>}
            </div>
            <Button variant="hero" size="lg" type="submit" className="w-full mt-2">
              Agendar demonstração
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </AnimatedBlock>
      </div>
    </SectionWrapper>
  );
};

export default LeadCapture;
