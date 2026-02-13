import { Link } from "react-router-dom";

const items = [
  { title: "Himmel-Optimierung", desc: "Trüber Himmel wird zu strahlendem Blau", emoji: "🌤️" },
  { title: "Virtual Staging", desc: "Leere Räume professionell einrichten", emoji: "🛋️" },
  { title: "Objekte entfernen", desc: "Störende Objekte einfach verschwinden lassen", emoji: "✨" },
];

const BeforeAfterShowcase = () => (
  <section className="py-20">
    <div className="container mx-auto">
      <h2 className="font-grotesk text-3xl sm:text-4xl font-bold text-primary text-center mb-4">
        Vorher → Nachher
      </h2>
      <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
        Überzeugen Sie sich selbst von der Qualität unserer KI-Bildbearbeitung.
      </p>

      <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
        {items.map((item) => (
          <div
            key={item.title}
            className="group bg-card rounded-2xl border border-border p-6 lg:p-8 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
          >
            <div className="bg-cream rounded-xl h-48 flex items-center justify-center text-6xl mb-5">
              {item.emoji}
            </div>
            <h3 className="font-grotesk text-xl font-semibold text-primary mb-2">{item.title}</h3>
            <p className="text-muted-foreground text-sm">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link
          to="/ergebnisse"
          className="text-accent font-semibold hover:underline inline-flex items-center gap-1"
        >
          Alle Ergebnisse ansehen →
        </Link>
      </div>
    </div>
  </section>
);

export default BeforeAfterShowcase;
