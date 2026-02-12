const features = [
  { emoji: "🛋️", title: "Virtual Staging", desc: "Möblieren Sie leere Räume virtuell mit KI." },
  { emoji: "🌤️", title: "Himmel-Optimierung", desc: "Perfekter blauer Himmel – bei jedem Wetter." },
  { emoji: "✨", title: "Objekte entfernen", desc: "Störende Gegenstände einfach verschwinden lassen." },
  { emoji: "⚡", title: "Sofort-Ergebnisse", desc: "Bearbeitete Bilder in wenigen Sekunden." },
  { emoji: "🖼️", title: "HD-Qualität", desc: "Professionelle Auflösung für jedes Exposé." },
  { emoji: "💬", title: "WhatsApp-basiert", desc: "Kein Upload-Portal – einfach per Chat senden." },
];

const Features = () => (
  <section id="features" className="py-20">
    <div className="container mx-auto">
      <h2 className="font-fraunces text-3xl sm:text-4xl font-bold text-primary text-center mb-4">
        Alles, was Sie brauchen
      </h2>
      <p className="text-muted-foreground text-center mb-14 max-w-xl mx-auto">
        Unsere KI bietet alle wichtigen Bearbeitungsfunktionen für Immobilienfotos.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f) => (
          <div
            key={f.title}
            className="bg-card border border-border rounded-2xl p-6 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
          >
            <div className="w-12 h-12 bg-cream rounded-xl flex items-center justify-center text-2xl mb-4">
              {f.emoji}
            </div>
            <h3 className="font-fraunces text-lg font-semibold text-primary mb-1">{f.title}</h3>
            <p className="text-muted-foreground text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
