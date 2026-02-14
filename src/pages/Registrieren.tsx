import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  Check,
  MessageCircle,
  Shield,
  CreditCard,
  Zap,
  ArrowLeft,
  Sparkles,
  Users,
  Star,
  Gift,
} from "lucide-react";
import { z } from "zod";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const WEBHOOK_URL =
  "https://immoonpoint.app.n8n.cloud/webhook/f5b1617b-57d6-407c-8f78-a8e828684f39";

/* ── types ────────────────────────────────────────────────── */

type BillingCycle = "monthly" | "quarterly" | "yearly";
type Step = "plan" | "form" | "success";

interface PlanInfo {
  id: string;
  name: string;
  pricing: { monthly: number; quarterly: number; yearly: number };
  desc: string;
  features: string[];
  cta: string;
  popular: boolean;
  badge?: string;
  requiresPayment: boolean;
}

/* ── plan data ────────────────────────────────────────────── */

const plans: PlanInfo[] = [
  {
    id: "test",
    name: "Testen",
    pricing: { monthly: 0, quarterly: 0, yearly: 0 },
    desc: "Zum Ausprobieren",
    features: [
      "3 KI-Bilder einmalig",
      "1K Auflösung",
      "Keine Kreditkarte nötig",
    ],
    cta: "Kostenlos testen",
    popular: false,
    requiresPayment: false,
  },
  {
    id: "basic",
    name: "Basic",
    pricing: { monthly: 14, quarterly: 38, yearly: 140 },
    desc: "Perfekt zum Einstieg",
    features: [
      "15 KI-Bilder / Monat",
      "2K Auflösung (HD)",
      "Batch-Upload (3 Bilder)",
      "Credits nachkaufen möglich",
    ],
    cta: "Basic starten",
    popular: false,
    requiresPayment: true,
  },
  {
    id: "pro",
    name: "Pro",
    pricing: { monthly: 49, quarterly: 132, yearly: 490 },
    desc: "Für aktive Makler",
    features: [
      "50 KI-Bilder / Monat",
      "7 Profi-Edits inklusive",
      "4K Auflösung (Ultra HD)",
      "Batch-Upload (5 Bilder)",
      "Priorisierte Bearbeitung",
    ],
    cta: "Pro starten",
    popular: true,
    badge: "Beliebtester Plan",
    requiresPayment: true,
  },
  {
    id: "team",
    name: "Team",
    pricing: { monthly: 99, quarterly: 267, yearly: 990 },
    desc: "Für Maklerbüros & Teams",
    features: [
      "30 KI-Bilder / Nutzer",
      "4 Nutzer inklusive",
      "15 Profi-Edits inklusive",
      "4K Auflösung (Ultra HD)",
      "Batch-Upload (20 Bilder)",
    ],
    cta: "Team starten",
    popular: false,
    requiresPayment: true,
  },
];

const billingOptions: { key: BillingCycle; label: string; badge?: string }[] = [
  { key: "monthly", label: "Monatlich" },
  { key: "quarterly", label: "Quartalsweise", badge: "10 % sparen" },
  { key: "yearly", label: "Jährlich", badge: "2 Monate gratis" },
];

/* ── pricing helper ───────────────────────────────────────── */

function getDisplayPrice(
  plan: PlanInfo,
  billing: BillingCycle
): { price: string; original?: string; savingBadge?: string } {
  if (plan.id === "test") return { price: "0" };

  const monthly = plan.pricing.monthly;
  if (billing === "monthly") return { price: monthly.toFixed(0) };

  if (billing === "quarterly") {
    const effective = plan.pricing.quarterly / 3;
    return {
      price:
        effective % 1 === 0
          ? effective.toFixed(0)
          : effective.toFixed(2).replace(".", ","),
      original: monthly.toFixed(0),
      savingBadge: "-10 %",
    };
  }

  const effective = plan.pricing.yearly / 12;
  return {
    price:
      effective % 1 === 0
        ? effective.toFixed(0)
        : effective.toFixed(2).replace(".", ","),
    original: monthly.toFixed(0),
    savingBadge: "2 Mon. gratis",
  };
}

/* ── form helpers ─────────────────────────────────────────── */

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

/* ── plan icons ───────────────────────────────────────────── */

const planIcons: Record<string, typeof Sparkles> = {
  test: Gift,
  basic: Star,
  pro: Sparkles,
  team: Users,
};

/* ── page component ───────────────────────────────────────── */

const Registrieren = () => {
  const [searchParams] = useSearchParams();
  const planParam = searchParams.get("plan");
  const billingParam = searchParams.get("billing") as BillingCycle | null;

  const hasValidPlan = !!planParam && plans.some((p) => p.id === planParam);

  const [step, setStep] = useState<Step>(hasValidPlan ? "form" : "plan");
  const [selectedPlan, setSelectedPlan] = useState(
    hasValidPlan ? planParam! : "pro"
  );
  const [billing, setBilling] = useState<BillingCycle>(
    billingParam &&
      (["monthly", "quarterly", "yearly"] as string[]).includes(billingParam)
      ? billingParam
      : "monthly"
  );

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    countryCode: "+49",
    privacy: false,
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormData, string>>
  >({});
  const [loading, setLoading] = useState(false);

  const activePlan = plans.find((p) => p.id === selectedPlan)!;
  const { price, original, savingBadge } = getDisplayPrice(activePlan, billing);
  const PlanIcon = planIcons[activePlan.id] || Sparkles;

  /* ── handlers ── */

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    setStep("form");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: result.data.firstName,
          lastName: result.data.lastName,
          email: result.data.email,
          phone: normalized,
          plan: selectedPlan,
          billing,
        }),
      });

      const data = await response.json();

      if (data.checkoutUrl) {
        // Redirect to Stripe Checkout – keep loading state active
        window.location.href = data.checkoutUrl;
        return;
      }
    } catch {
      // webhook may not be configured yet – still show success
    }

    setLoading(false);
    setStep("success");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ── step indicator ── */

  const stepsMeta = [
    { key: "plan", label: "Plan wählen" },
    { key: "form", label: "Registrieren" },
    { key: "success", label: "Loslegen" },
  ];
  const stepIndex = stepsMeta.findIndex((s) => s.key === step);

  const StepIndicator = () => (
    <div className="flex items-center justify-center gap-2 sm:gap-4 mb-12">
      {stepsMeta.map((s, i) => (
        <div key={s.key} className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                i < stepIndex
                  ? "bg-accent text-accent-foreground"
                  : i === stepIndex
                  ? "bg-primary text-primary-foreground"
                  : "bg-border text-muted-foreground"
              }`}
            >
              {i < stepIndex ? <Check className="w-4 h-4" /> : i + 1}
            </div>
            <span
              className={`text-sm font-medium hidden sm:block ${
                i <= stepIndex ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {s.label}
            </span>
          </div>
          {i < stepsMeta.length - 1 && (
            <div
              className={`w-8 sm:w-16 h-0.5 ${
                i < stepIndex ? "bg-accent" : "bg-border"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  /* ─────────────────────────────────────────────────────────
     STEP 1 — Plan Selection
  ───────────────────────────────────────────────────────── */

  const PlanStep = () => (
    <div className="animate-fade-in">
      <h1 className="font-grotesk text-3xl sm:text-4xl lg:text-5xl font-bold text-primary text-center mb-3">
        Wählen Sie Ihren Plan
      </h1>
      <p className="text-muted-foreground text-center mb-10 max-w-xl mx-auto">
        Starten Sie kostenlos oder wählen Sie den Plan, der zu Ihrem
        Maklerbüro passt. Alle Preise netto zzgl. MwSt.
      </p>

      {/* Billing Toggle */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex bg-card border border-border rounded-2xl p-1 gap-1">
          {billingOptions.map((opt) => (
            <button
              key={opt.key}
              onClick={() => setBilling(opt.key)}
              className={`relative px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                billing === opt.key
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span>{opt.label}</span>
              {opt.badge && (
                <span
                  className={`block text-[10px] font-bold ${
                    billing === opt.key
                      ? "text-accent-foreground/80"
                      : "text-accent"
                  }`}
                >
                  {opt.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Plan Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {plans.map((plan) => {
          const dp = getDisplayPrice(plan, billing);
          const Icon = planIcons[plan.id] || Sparkles;

          return (
            <div
              key={plan.id}
              className={`relative bg-card rounded-2xl p-6 border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer group ${
                plan.popular
                  ? "border-accent shadow-lg scale-[1.02]"
                  : "border-border hover:border-accent/40"
              }`}
              onClick={() => handleSelectPlan(plan.id)}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                  {plan.badge}
                </span>
              )}

              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-accent" />
                </div>
                <h3 className="font-grotesk text-xl font-semibold text-primary uppercase tracking-wide">
                  {plan.name}
                </h3>
              </div>
              <p className="text-muted-foreground text-sm mb-4">{plan.desc}</p>

              <div className="mb-6">
                {dp.original && (
                  <span className="text-muted-foreground text-lg line-through mr-2">
                    {dp.original}&euro;
                  </span>
                )}
                <span className="font-grotesk text-4xl font-bold text-primary">
                  {dp.price}&euro;
                </span>
                <span className="text-muted-foreground text-sm"> / Monat</span>
                {dp.savingBadge && (
                  <span className="ml-2 bg-accent/10 text-accent text-xs font-bold px-2 py-0.5 rounded-full">
                    {dp.savingBadge}
                  </span>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2 text-sm text-foreground"
                  >
                    <Check className="w-4 h-4 text-accent flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectPlan(plan.id);
                }}
                className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
                  plan.popular
                    ? "bg-accent text-accent-foreground hover:brightness-110 shadow-md shadow-accent/25"
                    : "bg-primary/10 text-primary hover:bg-primary/20 group-hover:bg-accent group-hover:text-accent-foreground"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );

  /* ─────────────────────────────────────────────────────────
     STEP 2 — Registration Form
  ───────────────────────────────────────────────────────── */

  const FormStep = () => (
    <div className="animate-fade-in">
      {/* Back link */}
      <div className="flex justify-center mb-8">
        <button
          onClick={() => setStep("plan")}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Plan ändern
        </button>
      </div>

      <div className="grid lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
        {/* Left: Plan summary */}
        <div className="lg:col-span-2">
          <div className="bg-card rounded-2xl border-2 border-accent p-6 lg:sticky lg:top-28">
            {activePlan.badge && (
              <span className="inline-block bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full mb-4">
                {activePlan.badge}
              </span>
            )}

            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <PlanIcon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-grotesk text-2xl font-bold text-primary">
                {activePlan.name}
              </h3>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              {activePlan.desc}
            </p>

            <div className="mb-6">
              {original && (
                <span className="text-muted-foreground text-lg line-through mr-2">
                  {original}&euro;
                </span>
              )}
              <span className="font-grotesk text-4xl font-bold text-primary">
                {price}&euro;
              </span>
              <span className="text-muted-foreground text-sm"> / Monat</span>
              {savingBadge && (
                <span className="ml-2 bg-accent/10 text-accent text-xs font-bold px-2 py-0.5 rounded-full">
                  {savingBadge}
                </span>
              )}
            </div>

            {/* Billing toggle (compact) */}
            <div className="flex bg-muted rounded-xl p-1 gap-1 mb-6">
              {billingOptions.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => setBilling(opt.key)}
                  className={`flex-1 px-2 py-2 rounded-lg text-xs font-medium transition-all text-center ${
                    billing === opt.key
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <ul className="space-y-3">
              {activePlan.features.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-2 text-sm text-foreground"
                >
                  <Check className="w-4 h-4 text-accent flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: Form */}
        <div className="lg:col-span-3">
          <div className="bg-card rounded-2xl border border-border p-6 sm:p-8 shadow-sm">
            <h2 className="font-grotesk text-2xl font-bold text-primary mb-2">
              {activePlan.requiresPayment
                ? `${activePlan.name}-Plan starten`
                : "Kostenlos registrieren"}
            </h2>
            <p className="text-muted-foreground text-sm mb-8">
              {activePlan.requiresPayment
                ? "Registrieren Sie sich – Sie werden anschließend zur Zahlung weitergeleitet."
                : "3 Bilder kostenlos bearbeiten – keine Kreditkarte nötig."}
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name fields */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Vorname
                  </label>
                  <input
                    type="text"
                    placeholder="Max"
                    value={form.firstName}
                    onChange={(e) =>
                      setForm({ ...form, firstName: e.target.value })
                    }
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-sm transition-all"
                  />
                  {errors.firstName && (
                    <p className="text-destructive text-xs mt-1">
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Nachname
                  </label>
                  <input
                    type="text"
                    placeholder="Mustermann"
                    value={form.lastName}
                    onChange={(e) =>
                      setForm({ ...form, lastName: e.target.value })
                    }
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-sm transition-all"
                  />
                  {errors.lastName && (
                    <p className="text-destructive text-xs mt-1">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  E-Mail-Adresse
                </label>
                <input
                  type="email"
                  placeholder="max@beispiel.de"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-sm transition-all"
                />
                {errors.email && (
                  <p className="text-destructive text-xs mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Telefonnummer (WhatsApp)
                </label>
                <div className="flex gap-2">
                  <select
                    value={form.countryCode}
                    onChange={(e) =>
                      setForm({ ...form, countryCode: e.target.value })
                    }
                    className="bg-background border border-border rounded-xl px-3 py-3 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent w-28 shrink-0 transition-all"
                  >
                    {COUNTRY_CODES.map((cc) => (
                      <option key={cc.code} value={cc.code}>
                        {cc.label}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    placeholder="123 4567890"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    className="w-full flex-1 bg-background border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-sm transition-all"
                  />
                </div>
                {errors.phone && (
                  <p className="text-destructive text-xs mt-1">
                    {errors.phone}
                  </p>
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
                  className="mt-0.5 w-4 h-4 rounded border-border accent-accent"
                />
                <span className="text-muted-foreground text-xs leading-relaxed">
                  Ich akzeptiere die{" "}
                  <Link
                    to="/datenschutz"
                    className="underline hover:text-primary"
                  >
                    Datenschutzerklärung
                  </Link>{" "}
                  und{" "}
                  <Link to="/agb" className="underline hover:text-primary">
                    AGB
                  </Link>
                  .
                </span>
              </label>
              {errors.privacy && (
                <p className="text-destructive text-xs">{errors.privacy}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-accent text-accent-foreground py-4 rounded-xl font-semibold text-base hover:brightness-110 transition-all shadow-lg shadow-accent/25 flex items-center justify-center gap-2 disabled:opacity-60"
              >
                <MessageCircle className="w-5 h-5" />
                {loading
                  ? activePlan.requiresPayment ? "Weiterleitung zur Zahlung ..." : "Wird gesendet ..."
                  : activePlan.requiresPayment
                  ? `${activePlan.name}-Plan starten`
                  : "Kostenlos starten per WhatsApp"}
              </button>

              <div className="flex flex-wrap justify-center gap-6 pt-2">
                {[
                  { icon: Shield, label: "DSGVO-konform" },
                  {
                    icon: CreditCard,
                    label: activePlan.requiresPayment
                      ? "Sichere Zahlung via Stripe"
                      : "Keine Kreditkarte",
                  },
                  { icon: Zap, label: "Sofort per WhatsApp" },
                ].map(({ icon: Icon, label }) => (
                  <span
                    key={label}
                    className="flex items-center gap-1.5 text-muted-foreground text-xs"
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </span>
                ))}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  /* ─────────────────────────────────────────────────────────
     STEP 3 — Success
  ───────────────────────────────────────────────────────── */

  const SuccessStep = () => (
    <div className="max-w-lg mx-auto animate-fade-in">
      <div className="bg-card border border-border rounded-2xl p-8 sm:p-10 text-center shadow-lg">
        <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
          <MessageCircle className="w-8 h-8 text-accent" />
        </div>

        <h2 className="font-grotesk text-2xl sm:text-3xl font-bold text-primary mb-3">
          Willkommen bei ImmoPics.ai!
        </h2>

        <div className="bg-accent/5 border border-accent/20 rounded-xl p-4 mb-6">
          <p className="text-foreground text-sm font-medium mb-1">
            Ihr gewählter Plan
          </p>
          <p className="font-grotesk text-lg font-bold text-primary">
            {activePlan.name}
            {activePlan.requiresPayment && <> &ndash; {price}&euro; / Monat</>}
          </p>
        </div>

        <p className="text-muted-foreground text-sm mb-2">
          Schauen Sie jetzt in Ihr WhatsApp &ndash; Sie erhalten eine Nachricht
          mit dem &ldquo;Loslegen&rdquo;-Button.
        </p>

        {!activePlan.requiresPayment && (
          <p className="text-muted-foreground text-sm mt-4 bg-muted/50 rounded-lg p-3">
            Sie haben <strong>3 kostenlose Bearbeitungen</strong> erhalten. Schicken Sie einfach ein Foto per WhatsApp!
          </p>
        )}

        <p className="text-muted-foreground/60 text-xs mt-6">
          Keine Nachricht erhalten? Bitte prüfen Sie Ihre Telefonnummer oder
          kontaktieren Sie uns per WhatsApp.
        </p>
      </div>
    </div>
  );

  /* ── render ── */

  return (
    <main>
      <Navigation />
      <section className="pt-28 pb-20 bg-cream min-h-screen">
        <div className="container mx-auto px-4">
          <StepIndicator />
          {step === "plan" && <PlanStep />}
          {step === "form" && <FormStep />}
          {step === "success" && <SuccessStep />}
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Registrieren;
