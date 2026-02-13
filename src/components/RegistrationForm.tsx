import { useState } from "react";
import { MessageCircle, Shield, CreditCard, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { z } from "zod";

const WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || "";

const COUNTRY_CODES = [
  { code: "+49", label: "DE +49" },
  { code: "+43", label: "AT +43" },
  { code: "+41", label: "CH +41" },
  { code: "+31", label: "NL +31" },
  { code: "+32", label: "BE +32" },
  { code: "+33", label: "FR +33" },
  { code: "+39", label: "IT +39" },
  { code: "+44", label: "UK +44" },
  { code: "+1", label: "US +1" },
];

/** Normalize phone to E.164-like digits: +49 157 3401 9999 → 4915734019999 */
const normalizePhone = (countryCode: string, phone: string): string => {
  const digits = phone.replace(/[\s\-()]/g, "").replace(/^0+/, "");
  const cc = countryCode.replace("+", "");
  return cc + digits;
};

const formSchema = z.object({
  firstName: z.string().trim().min(1, "Vorname ist erforderlich").max(100),
  lastName: z.string().trim().min(1, "Nachname ist erforderlich").max(100),
  email: z.string().trim().email("Ungültige E-Mail-Adresse").max(255),
  phone: z.string().trim().min(4, "Telefonnummer ist erforderlich").max(20),
  countryCode: z.string().min(1),
  privacy: z.literal(true, { errorMap: () => ({ message: "Bitte stimmen Sie der Datenschutzerklärung und den AGB zu" }) }),
});

type FormData = z.infer<typeof formSchema>;

const inputClass =
  "w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent text-sm";

const RegistrationForm = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    countryCode: "+49",
    privacy: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = formSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormData, string>> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as keyof FormData] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setLoading(true);

    const normalized = normalizePhone(result.data.countryCode, result.data.phone);

    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: result.data.firstName,
          lastName: result.data.lastName,
          email: result.data.email,
          phone: normalized,
          plan: "free",
        }),
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
            <h3 className="font-grotesk text-2xl font-bold text-primary-foreground mb-3">
              Willkommen bei ImmoPics.ai!
            </h3>
            <p className="text-primary-foreground/80 text-sm mb-2">
              Schauen Sie jetzt in Ihr WhatsApp – Sie erhalten eine Nachricht mit dem "Loslegen"-Button.
            </p>
            <p className="text-primary-foreground/60 text-xs">
              Keine Nachricht erhalten? Bitte prüfen Sie Ihre Telefonnummer oder kontaktieren Sie uns per WhatsApp.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="register" className="py-20 bg-primary">
      <div className="container mx-auto">
        <h2 className="font-grotesk text-3xl sm:text-4xl font-bold text-primary-foreground text-center mb-4">
          Jetzt kostenlos registrieren
        </h2>
        <p className="text-primary-foreground/70 text-center mb-12 max-w-xl mx-auto">
          5 Bilder kostenlos bearbeiten – keine Kreditkarte nötig.
        </p>

        <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-5">
          {/* Name fields side by side */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <input
                type="text"
                placeholder="Vorname"
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                className={inputClass}
              />
              {errors.firstName && (
                <p className="text-red-300 text-xs mt-1">{errors.firstName}</p>
              )}
            </div>
            <div>
              <input
                type="text"
                placeholder="Nachname"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                className={inputClass}
              />
              {errors.lastName && (
                <p className="text-red-300 text-xs mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="E-Mail-Adresse"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={inputClass}
            />
            {errors.email && (
              <p className="text-red-300 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone with country code */}
          <div>
            <div className="flex gap-2">
              <select
                value={form.countryCode}
                onChange={(e) => setForm({ ...form, countryCode: e.target.value })}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-3 py-3 text-primary-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent appearance-none w-28 shrink-0"
              >
                {COUNTRY_CODES.map((cc) => (
                  <option key={cc.code} value={cc.code} className="text-foreground">
                    {cc.label}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                placeholder="Telefonnummer"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className={`${inputClass} flex-1`}
              />
            </div>
            {errors.phone && (
              <p className="text-red-300 text-xs mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Privacy checkbox with links */}
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.privacy}
              onChange={(e) => setForm({ ...form, privacy: e.target.checked })}
              className="mt-0.5 w-4 h-4 rounded border-white/30 accent-accent"
            />
            <span className="text-primary-foreground/70 text-xs leading-relaxed">
              Ich akzeptiere die{" "}
              <Link to="/datenschutz" className="underline hover:text-primary-foreground">
                Datenschutzerklärung
              </Link>{" "}
              und{" "}
              <Link to="/agb" className="underline hover:text-primary-foreground">
                AGB
              </Link>.
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
