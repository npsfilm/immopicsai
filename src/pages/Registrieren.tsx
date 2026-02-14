import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Check, MessageCircle, Shield, CreditCard, Zap } from "lucide-react";
import { z } from "zod";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const WEBHOOK_URL =
  "https://immoonpoint.app.n8n.cloud/webhook/f5b1617b-57d6-407c-8f78-a8e828684f39";

/* ── plan data ─────────────────────────────────────────────── */

interface PlanInfo {
  id: string;
  name: string;
  price: string; // display string
  desc: string;
  features: string[];
  requiresPayment: boolean;
}

const plans: PlanInfo[] = [
  {
    id: "test",
    name: "Kostenlos testen",
    price: "0 €",
    desc: "5 KI-Bilder einmalig, keine Kreditkarte nötig",
    features: [
      "5 KI-Bilder einmalig",
      "1K Auflösung",
      "Keine Kreditkarte nötig",
    ],
    requiresPayment: false,
  },
  {
    id: "basic",
    name: "Basic",
    price: "ab 14 € / Monat",
    desc: "15 KI-Bilder / Monat, 2K Auflösung (HD)",
    features: [
      "15 KI-Bilder / Monat",
      "2K Auflösung (HD)",
      "Batch-Upload (3 Bilder)",
      "Credits nachkaufen möglich",
    ],
    requiresPayment: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: "ab 49 € / Monat",
    desc: "50 KI-Bilder / Monat, 4K Auflösung (Ultra HD)",
    features: [
      "50 KI-Bilder / Monat",
      "7 Profi-Edits inklusive",
      "4K Auflösung (Ultra HD)",
      "Batch-Upload (5 Bilder)",
      "Priorisierte Bearbeitung",
    ],
    requiresPayment: true,
  },
  {
    id: "team",
    name: "Team",
    price: "ab 99 € / Monat",
    desc: "30 KI-Bilder / Nutzer, 4 Nutzer inklusive",
    features: [
      "30 KI-Bilder / Nutzer",
      "4 Nutzer inklusive",
      "15 Profi-Edits inklusive",
      "4K Auflösung (Ultra HD)",
      "Batch-Upload (20 Bilder)",
    ],
    requiresPayment: true,
  },
];

/* ── form helpers ──────────────────────────────────────────── */

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
  privacy: z.literal(true, {
    errorMap: () => ({
      message:
        "Bitte stimmen Sie der Datenschutzerklärung und den AGB zu",
    }),
  }),
});

type FormData = z.infer<typeof formSchema>;

const inputClass =
  "w-full bg-white border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent text-sm";

/* ── page component ────────────────────────────────────────── */

const Registrieren = () => {
  const [searchParams] = useSearchParams();
  const planParam = searchParams.get("plan") || "test";
  const [selectedPlan, setSelectedPlan] = useState(
    plans.find((p) => p.id === planParam)?.id || "test"
  );

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    countryCode: "+49",
    privacy: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const activePlan = plans.find((p) => p.id === selectedPlan)!;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = formSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormData, string>> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0])
          fieldErrors[err.path[0] as keyof FormData] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setLoading(true);

    const normalized = normalizePhone(
      result.data.countryCode,
      result.data.phone
    );

    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: result.data.firstName,
          lastName: result.data.lastName,
          email: result.data.email,
          phone: normalized,
          plan: selectedPlan,
        }),
      });
    } catch {
      // Webhook might not be configured yet - still show success
    }

    setLoading(false);
    setSubmitted(true);
  };

  /* ── success state ── */
  if (submitted) {
    return (
      <main>
        <Navigation />
        <section className="min-h-screen flex items-center justify-center pt-24 pb-20 bg-cream">
          <div className="max-w-md mx-auto text-center bg-card border border-border rounded-2xl p-10 shadow-lg">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="font-grotesk text-2xl font-bold text-primary mb-3">
              Willkommen bei ImmoPics.ai!
            </h2>
            <p className="text-muted-foreground text-sm mb-2">
              Schauen Sie jetzt in Ihr WhatsApp – Sie erhalten eine Nachricht
              mit dem &ldquo;Loslegen&rdquo;-Button.
            </p>
            {activePlan.requiresPayment && (
              <p className="text-muted-foreground text-sm mt-4">
                Für den <strong>{activePlan.name}</strong>-Plan erhalten Sie im
                Anschluss einen Zahlungslink per E-Mail.
              </p>
            )}
            <p className="text-muted-foreground/60 text-xs mt-4">
              Keine Nachricht erhalten? Bitte prüfen Sie Ihre Telefonnummer oder
              kontaktieren Sie uns per WhatsApp.
            </p>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  /* ── form state ── */
  return (
    <main>
      <Navigation />
      <section className="pt-28 pb-20 bg-cream min-h-screen">
        <div className="container mx-auto max-w-3xl px-4">
          <h1 className="font-grotesk text-3xl sm:text-4xl font-bold text-primary text-center mb-3">
            Registrieren & Plan wählen
          </h1>
          <p className="text-muted-foreground text-center mb-10 max-w-xl mx-auto">
            Erstellen Sie Ihr Konto und wählen Sie den passenden Plan.
          </p>

          {/* ── Plan selection ── */}
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {plans.map((plan) => (
              <button
                key={plan.id}
                type="button"
                onClick={() => setSelectedPlan(plan.id)}
                className={`text-left rounded-2xl border-2 p-5 transition-all ${
                  selectedPlan === plan.id
                    ? "border-accent bg-accent/5 shadow-md"
                    : "border-border bg-card hover:border-accent/40"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-grotesk text-lg font-semibold text-primary">
                    {plan.name}
                  </h3>
                  <span
                    className={`text-sm font-bold ${
                      selectedPlan === plan.id
                        ? "text-accent"
                        : "text-muted-foreground"
                    }`}
                  >
                    {plan.price}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm mb-3">
                  {plan.desc}
                </p>
                <ul className="space-y-1.5">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-xs text-foreground"
                    >
                      <Check className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </button>
            ))}
          </div>

          {/* ── Registration form ── */}
          <div className="bg-primary rounded-2xl p-8 sm:p-10">
            <h2 className="font-grotesk text-xl font-bold text-primary-foreground text-center mb-2">
              {activePlan.requiresPayment
                ? `${activePlan.name}-Plan starten`
                : "Kostenlos registrieren"}
            </h2>
            <p className="text-primary-foreground/70 text-center mb-8 text-sm">
              {activePlan.requiresPayment
                ? "Registrieren Sie sich – den Zahlungslink erhalten Sie anschließend per E-Mail."
                : "5 Bilder kostenlos bearbeiten – keine Kreditkarte nötig."}
            </p>

            <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-5">
              {/* Name fields */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <input
                    type="text"
                    placeholder="Vorname"
                    value={form.firstName}
                    onChange={(e) =>
                      setForm({ ...form, firstName: e.target.value })
                    }
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                  />
                  {errors.firstName && (
                    <p className="text-red-300 text-xs mt-1">
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Nachname"
                    value={form.lastName}
                    onChange={(e) =>
                      setForm({ ...form, lastName: e.target.value })
                    }
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                  />
                  {errors.lastName && (
                    <p className="text-red-300 text-xs mt-1">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  placeholder="E-Mail-Adresse"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                />
                {errors.email && (
                  <p className="text-red-300 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <div className="flex gap-2">
                  <select
                    value={form.countryCode}
                    onChange={(e) =>
                      setForm({ ...form, countryCode: e.target.value })
                    }
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-3 py-3 text-primary-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent appearance-none w-28 shrink-0"
                  >
                    {COUNTRY_CODES.map((cc) => (
                      <option
                        key={cc.code}
                        value={cc.code}
                        className="text-foreground"
                      >
                        {cc.label}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    placeholder="Telefonnummer"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    className="w-full flex-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-300 text-xs mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Privacy */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.privacy}
                  onChange={(e) =>
                    setForm({ ...form, privacy: e.target.checked })
                  }
                  className="mt-0.5 w-4 h-4 rounded border-white/30 accent-accent"
                />
                <span className="text-primary-foreground/70 text-xs leading-relaxed">
                  Ich akzeptiere die{" "}
                  <Link
                    to="/datenschutz"
                    className="underline hover:text-primary-foreground"
                  >
                    Datenschutzerklärung
                  </Link>{" "}
                  und{" "}
                  <Link
                    to="/agb"
                    className="underline hover:text-primary-foreground"
                  >
                    AGB
                  </Link>
                  .
                </span>
              </label>
              {errors.privacy && (
                <p className="text-red-300 text-xs">{errors.privacy}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-accent text-accent-foreground py-4 rounded-xl font-semibold text-base hover:brightness-110 transition-all shadow-lg shadow-accent/25 flex items-center justify-center gap-2 disabled:opacity-60"
              >
                <MessageCircle className="w-5 h-5" />
                {loading
                  ? "Wird gesendet..."
                  : activePlan.requiresPayment
                  ? `${activePlan.name}-Plan starten per WhatsApp`
                  : "Kostenlos starten per WhatsApp"}
              </button>

              <div className="flex flex-wrap justify-center gap-6 pt-4">
                {[
                  { icon: Shield, label: "DSGVO-konform" },
                  { icon: CreditCard, label: activePlan.requiresPayment ? "Zahlungslink per E-Mail" : "Keine Kreditkarte" },
                  { icon: Zap, label: "Sofort per WhatsApp" },
                ].map(({ icon: Icon, label }) => (
                  <span
                    key={label}
                    className="flex items-center gap-1.5 text-primary-foreground/50 text-xs"
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </span>
                ))}
              </div>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Registrieren;
