import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Thomas M.",
    role: "Immobilienmakler, München",
    text: "Seit ich ImmoAI nutze, spare ich pro Exposé mindestens 30 Minuten. Die Qualität ist hervorragend!",
    stars: 5,
  },
  {
    name: "Sarah K.",
    role: "Hausverwaltung, Berlin",
    text: "Endlich professionelle Fotos ohne teuren Fotografen. Per WhatsApp – einfacher geht's nicht.",
    stars: 5,
  },
  {
    name: "Michael B.",
    role: "RE/MAX Partner, Hamburg",
    text: "Das Virtual Staging hat unsere Verkaufszeiten deutlich verkürzt. Absolut empfehlenswert!",
    stars: 5,
  },
];

const Testimonials = () => (
  <section className="py-20">
    <div className="container mx-auto">
      <h2 className="font-fraunces text-3xl sm:text-4xl font-bold text-primary text-center mb-14">
        Was unsere Kunden sagen
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="bg-card border border-border rounded-2xl p-6 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex gap-0.5 mb-4">
              {Array.from({ length: t.stars }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-accent text-accent" />
              ))}
            </div>
            <p className="text-foreground text-sm mb-5 leading-relaxed">"{t.text}"</p>
            <div>
              <p className="font-semibold text-primary text-sm">{t.name}</p>
              <p className="text-muted-foreground text-xs">{t.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
