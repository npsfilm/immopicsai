const audiences = [
  { emoji: "🏢", title: "Immobilienmakler", desc: "Exposés schneller erstellen, mehr Abschlüsse erzielen." },
  { emoji: "📐", title: "Architekten", desc: "Entwürfe und Projekte optimal präsentieren." },
  { emoji: "🏠", title: "Hausverwalter", desc: "Objekte professionell dokumentieren und vermarkten." },
  { emoji: "🔑", title: "Privatverkäufer", desc: "Eigene Immobilie wie vom Profi fotografiert." },
];

const TargetAudiences = () => (
  <section className="py-20 bg-cream">
    <div className="container mx-auto">
      <h2 className="font-fraunces text-3xl sm:text-4xl font-bold text-primary text-center mb-4">
        Für wen ist ImmoAI?
      </h2>
      <p className="text-muted-foreground text-center mb-14 max-w-xl mx-auto">
        ImmoAI unterstützt jeden, der Immobilien professionell präsentieren möchte.
      </p>

      <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {audiences.map((a) => (
          <div
            key={a.title}
            className="bg-card border border-border rounded-2xl p-6 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
          >
            <span className="text-3xl mb-3 block">{a.emoji}</span>
            <h3 className="font-fraunces text-lg font-semibold text-primary mb-1">{a.title}</h3>
            <p className="text-muted-foreground text-sm">{a.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TargetAudiences;
