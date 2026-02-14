import { useState } from "react";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

type BillingCycle = "monthly" | "quarterly" | "yearly";

interface PlanPricing {
  monthly: number;
  quarterly: number; // total for 3 months
  yearly: number; // total for 12 months
}

interface Plan {
  id: string;
  name: string;
  pricing: PlanPricing;
  desc: string;
  features: string[];
  cta: string;
  popular: boolean;
  badge?: string;
}

const plans: Plan[] = [
  {
    id: "test",
    name: "Testen",
    pricing: { monthly: 0, quarterly: 0, yearly: 0 },
    desc: "Zum Ausprobieren",
    features: [
      "5 KI-Bilder einmalig",
      "1K Auflösung",
      "Keine Kreditkarte nötig",
      "Ideal zum Ausprobieren",
    ],
    cta: "Kostenlos testen",
    popular: false,
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
      "Perfekt zum Einstieg",
    ],
    cta: "Basic starten",
    popular: false,
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
      "Für aktive Makler",
    ],
    cta: "Pro starten",
    popular: true,
    badge: "Beliebtester Plan",
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
      "Für Maklerbüros & Teams",
    ],
    cta: "Team starten",
    popular: false,
  },
];

const billingOptions: { key: BillingCycle; label: string; badge?: string }[] = [
  { key: "monthly", label: "Monatlich" },
  { key: "quarterly", label: "Quartalsweise", badge: "10% sparen" },
  { key: "yearly", label: "Jährlich", badge: "2 Monate gratis" },
];

function getDisplayPrice(plan: Plan, billing: BillingCycle): { price: string; original?: string; savingBadge?: string } {
  if (plan.id === "test") return { price: "0" };

  const monthly = plan.pricing.monthly;

  if (billing === "monthly") return { price: monthly.toFixed(0) };

  if (billing === "quarterly") {
    const effective = (plan.pricing.quarterly / 3);
    return {
      price: effective % 1 === 0 ? effective.toFixed(0) : effective.toFixed(2).replace(".", ","),
      original: monthly.toFixed(0),
      savingBadge: "-10%",
    };
  }

  // yearly
  const effective = (plan.pricing.yearly / 12);
  return {
    price: effective % 1 === 0 ? effective.toFixed(0) : effective.toFixed(2).replace(".", ","),
    original: monthly.toFixed(0),
    savingBadge: "2 Mon. gratis",
  };
}

const Pricing = () => {
  const [billing, setBilling] = useState<BillingCycle>("monthly");
  const navigate = useNavigate();

  return (
    <section id="pricing" className="py-20 bg-cream">
      <div className="container mx-auto">
        <h2 className="font-grotesk text-3xl sm:text-4xl font-bold text-primary text-center mb-4">
          Pläne für jedes Maklerbüro
        </h2>
        <p className="text-muted-foreground text-center mb-10 max-w-xl mx-auto">
          Starte kostenlos mit 5 Bildern. Alle Preise netto zzgl. MwSt.
        </p>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
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
                      billing === opt.key ? "text-accent-foreground/80" : "text-accent"
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
            const { price, original, savingBadge } = getDisplayPrice(plan, billing);

            return (
              <div
                key={plan.id}
                className={`relative bg-card rounded-2xl p-6 border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  plan.popular ? "border-accent shadow-lg scale-[1.02]" : "border-border"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                    {plan.badge}
                  </span>
                )}

                <h3 className="font-grotesk text-xl font-semibold text-primary uppercase tracking-wide">
                  {plan.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">{plan.desc}</p>

                <div className="mb-6">
                  {original && (
                    <span className="text-muted-foreground text-lg line-through mr-2">
                      {original}€
                    </span>
                  )}
                  <span className="font-grotesk text-4xl lg:text-5xl font-bold text-primary">
                    {price}€
                  </span>
                  <span className="text-muted-foreground text-sm"> / Monat</span>
                  {savingBadge && (
                    <span className="ml-2 bg-accent/10 text-accent text-xs font-bold px-2 py-0.5 rounded-full">
                      {savingBadge}
                    </span>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                      <Check className="w-4 h-4 text-accent flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => navigate(`/registrieren?plan=${plan.id}`)}
                  className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
                    plan.popular
                      ? "bg-accent text-accent-foreground hover:brightness-110 shadow-md shadow-accent/25"
                      : "bg-primary/10 text-primary hover:bg-primary/20"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            );
          })}
        </div>

        {/* Top-Up Section */}
        <div className="max-w-4xl mx-auto mt-20">
          <h3 className="font-grotesk text-2xl sm:text-3xl font-bold text-primary text-center mb-3">
            Mehr Bilder? Kein Problem.
          </h3>
          <p className="text-muted-foreground text-center mb-10 max-w-xl mx-auto">
            Kauf jederzeit Extra-Credits dazu – ohne Plan-Wechsel. Nur für aktive Abonnenten.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* KI-Bilder Top-Ups */}
            <div>
              <h4 className="font-grotesk text-lg font-semibold text-primary mb-4">
                KI-Bilder nachkaufen
              </h4>
              <div className="space-y-3">
                {[
                  { amount: 10, price: "9,90", perUnit: "0,99", badge: null },
                  { amount: 25, price: "19,90", perUnit: "0,80", badge: "Bestseller" },
                  { amount: 50, price: "34,90", perUnit: "0,70", badge: "Bester Preis" },
                ].map((topup) => (
                  <div
                    key={topup.amount}
                    className="relative flex items-center justify-between bg-card border border-border rounded-xl px-5 py-4 hover:border-accent/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📦</span>
                      <div>
                        <p className="font-semibold text-foreground text-sm">
                          {topup.amount} Bilder
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {topup.perUnit}€ / Bild
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-grotesk font-bold text-primary text-lg">
                        {topup.price}€
                      </p>
                    </div>
                    {topup.badge && (
                      <span className="absolute -top-2 right-4 bg-accent text-accent-foreground text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                        {topup.badge}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Profi-Edits Top-Ups */}
            <div>
              <h4 className="font-grotesk text-lg font-semibold text-primary mb-4">
                Profi-Edits nachkaufen
              </h4>
              <div className="space-y-3">
                {[
                  { amount: 10, price: "44,90", perUnit: "4,49", badge: null },
                  { amount: 15, price: "59,00", perUnit: "3,93", badge: "Bestseller" },
                  { amount: 30, price: "109,00", perUnit: "3,63", badge: "Bester Preis" },
                ].map((topup) => (
                  <div
                    key={topup.amount}
                    className="relative flex items-center justify-between bg-card border border-border rounded-xl px-5 py-4 hover:border-accent/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🎨</span>
                      <div>
                        <p className="font-semibold text-foreground text-sm">
                          {topup.amount} Edits
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {topup.perUnit}€ / Edit
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-grotesk font-bold text-primary text-lg">
                        {topup.price}€
                      </p>
                    </div>
                    {topup.badge && (
                      <span className="absolute -top-2 right-4 bg-accent text-accent-foreground text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                        {topup.badge}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="text-xs text-muted-foreground text-center mt-6">
            Top-Up Credits verfallen nicht am Monatsende. Profi-Edits werden von echten Bildbearbeitern durchgeführt – Lieferzeit: 24–48h.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
