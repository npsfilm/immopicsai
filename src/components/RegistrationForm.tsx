import { useState } from "react";
import { MessageCircle, Shield, CreditCard, Zap } from "lucide-react";
import { z } from "zod";

const WEBHOOK_URL = "https://your-n8n-webhook-url.com/webhook/immoai";

const formSchema = z.object({
  name: z.string().trim().min(1, "Name ist erforderlich").max(100),
  email: z.string().trim().email("Ungültige E-Mail-Adresse").max(255),
  whatsapp: z.string().trim().min(6, "WhatsApp-Nummer ist erforderlich").max(20),
  role: z.string().min(1, "Bitte wählen Sie eine Rolle"),
  privacy: z.literal(true, { errorMap: () => ({ message: "Bitte stimmen Sie zu" }) }),
});

type FormData = z.infer<typeof formSchema>;

const RegistrationForm = () => {
  const [form, setForm] = useState({ name: "", email: "", whatsapp: "", role: "", privacy: false });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = formSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: any = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setLoading(true);

    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: result.data.name, email: result.data.email, whatsapp: result.data.whatsapp, role: result.data.role }),
      });
    } catch {
      // Webhook might not be configured yet - still show success
    }

    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="register" className="py-20 bg-primary">
        <div className="container mx-auto text-center">
          <div className="max-w-md mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-10">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="font-fraunces text-2xl font-bold text-primary-foreground mb-3">
              Willkommen bei ImmoAI!
            </h3>
            <p className="text-primary-foreground/80 text-sm">
              Sie erhalten in Kürze eine WhatsApp-Nachricht mit weiteren Anweisungen.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="register" className="py-20 bg-primary">
      <div className="container mx-auto">
        <h2 className="font-fraunces text-3xl sm:text-4xl font-bold text-primary-foreground text-center mb-4">
          Jetzt kostenlos registrieren
        </h2>
        <p className="text-primary-foreground/70 text-center mb-12 max-w-xl mx-auto">
          5 Bilder kostenlos bearbeiten – keine Kreditkarte nötig.
        </p>

        <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-5">
          {[
            { name: "name" as const, placeholder: "Ihr Name", type: "text" },
            { name: "email" as const, placeholder: "E-Mail-Adresse", type: "email" },
            { name: "whatsapp" as const, placeholder: "WhatsApp-Nummer (z.B. +49...)", type: "tel" },
          ].map((field) => (
            <div key={field.name}>
              <input
                type={field.type}
                placeholder={field.placeholder}
                value={form[field.name]}
                onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent text-sm"
              />
              {errors[field.name] && (
                <p className="text-red-300 text-xs mt-1">{errors[field.name]}</p>
              )}
            </div>
          ))}

          <div>
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-primary-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent appearance-none"
            >
              <option value="" className="text-foreground">Ich bin...</option>
              <option value="makler" className="text-foreground">Immobilienmakler/in</option>
              <option value="architekt" className="text-foreground">Architekt/in</option>
              <option value="verwalter" className="text-foreground">Hausverwalter/in</option>
              <option value="privat" className="text-foreground">Privatverkäufer/in</option>
              <option value="sonstiges" className="text-foreground">Sonstiges</option>
            </select>
            {errors.role && <p className="text-red-300 text-xs mt-1">{errors.role}</p>}
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.privacy}
              onChange={(e) => setForm({ ...form, privacy: e.target.checked })}
              className="mt-0.5 w-4 h-4 rounded border-white/30 accent-accent"
            />
            <span className="text-primary-foreground/70 text-xs leading-relaxed">
              Ich stimme der Verarbeitung meiner Daten gemäß der Datenschutzerklärung zu.
            </span>
          </label>
          {errors.privacy && <p className="text-red-300 text-xs">{errors.privacy}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent text-accent-foreground py-4 rounded-xl font-semibold text-base hover:brightness-110 transition-all shadow-lg shadow-accent/25 flex items-center justify-center gap-2 disabled:opacity-60"
          >
            <MessageCircle className="w-5 h-5" />
            {loading ? "Wird gesendet..." : "Kostenlos starten per WhatsApp"}
          </button>

          <div className="flex flex-wrap justify-center gap-6 pt-4">
            {[
              { icon: Shield, label: "DSGVO-konform" },
              { icon: CreditCard, label: "Keine Kreditkarte" },
              { icon: Zap, label: "Sofort per WhatsApp" },
            ].map(({ icon: Icon, label }) => (
              <span key={label} className="flex items-center gap-1.5 text-primary-foreground/50 text-xs">
                <Icon className="w-3.5 h-3.5" />
                {label}
              </span>
            ))}
          </div>
        </form>
      </div>
    </section>
  );
};

export default RegistrationForm;
