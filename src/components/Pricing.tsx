import { useState } from "react";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    monthlyPrice: 0,
    yearlyPrice: 0,
    desc: "Zum Ausprobieren",
    features: ["5 Bilder / Monat", "Standard-Qualität", "WhatsApp-Zugang", "48h Bearbeitungszeit"],
    cta: "Kostenlos starten",
    popular: false,
  },
  {
    name: "Pro",
    monthlyPrice: 49,
    yearlyPrice: 39,
    desc: "Für aktive Makler",
    features: ["50 Bilder / Monat", "HD-Qualität", "Alle Bearbeitungsarten", "Sofort-Ergebnisse", "5 Profi-Bearbeitungen"],
    cta: "Pro wählen",
    popular: true,
  },
  {
    name: "Premium",
    monthlyPrice: 129,
    yearlyPrice: 99,
    desc: "Für Teams & Agenturen",
    features: ["Unbegrenzte Bilder", "HD-Qualität", "Alle Bearbeitungsarten", "Sofort-Ergebnisse", "20 Profi-Bearbeitungen", "Prioritäts-Support"],
    cta: "Premium wählen",
    popular: false,
  },
];

const Pricing = () => {
  const [yearly, setYearly] = useState(false);

  const scrollToRegister = () =>
    document.querySelector("#register")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="pricing" className="py-20 bg-cream">
      <div className="container mx-auto">
        <h2 className="font-fraunces text-3xl sm:text-4xl font-bold text-primary text-center mb-4">
          Einfache, transparente Preise
        </h2>
        <p className="text-muted-foreground text-center mb-10 max-w-xl mx-auto">
          Starten Sie kostenlos – upgraden Sie, wenn Sie mehr brauchen.
        </p>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <span className={`text-sm font-medium ${!yearly ? "text-primary" : "text-muted-foreground"}`}>Monatlich</span>
          <button
            onClick={() => setYearly(!yearly)}
            className={`relative w-14 h-7 rounded-full transition-colors ${yearly ? "bg-accent" : "bg-border"}`}
          >
            <span
              className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                yearly ? "translate-x-7" : "translate-x-1"
              }`}
            />
          </button>
          <span className={`text-sm font-medium ${yearly ? "text-primary" : "text-muted-foreground"}`}>
            Jährlich
          </span>
          {yearly && (
            <span className="bg-accent text-accent-foreground text-xs font-bold px-2 py-0.5 rounded-full">
              -20%
            </span>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-card rounded-2xl p-6 border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                plan.popular ? "border-accent shadow-lg scale-[1.02]" : "border-border"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-xs font-bold px-4 py-1 rounded-full">
                  Beliebt
                </span>
              )}
              <h3 className="font-fraunces text-xl font-semibold text-primary">{plan.name}</h3>
              <p className="text-muted-foreground text-sm mb-4">{plan.desc}</p>
              <div className="mb-6">
                <span className="font-fraunces text-4xl lg:text-5xl font-bold text-primary">
                  {yearly ? plan.yearlyPrice : plan.monthlyPrice}€
                </span>
                <span className="text-muted-foreground text-sm"> / Monat</span>
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
                onClick={scrollToRegister}
                className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
                  plan.popular
                    ? "bg-accent text-accent-foreground hover:brightness-110 shadow-md shadow-accent/25"
                    : "bg-primary/10 text-primary hover:bg-primary/20"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto mt-10 bg-card border border-border rounded-xl p-5 text-center">
          <p className="text-sm text-muted-foreground">
            <strong className="text-primary">Was sind Profi-Bearbeitungen?</strong> Komplexe Aufgaben wie Virtual Staging oder aufwändige Retuschen, 
            die über einfache Optimierungen hinausgehen. Standard-Bearbeitungen (Helligkeit, Kontrast, Himmel) sind immer inklusive.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
