const steps = [
  { num: "1", emoji: "📸", title: "Foto schicken", desc: "Schick dein Immobilienfoto per WhatsApp an Lumi und beschreib kurz was du willst." },
  { num: "2", emoji: "🤖", title: "Lumi bearbeitet", desc: "Unsere KI bearbeitet dein Bild in Sekunden – leer räumen, staging, HDR, Himmel und mehr." },
  { num: "3", emoji: "✅", title: "Ergebnis erhalten", desc: "Du bekommst dein fertig bearbeitetes Bild direkt per WhatsApp zurück. Fertig!" },
];

const HowItWorks = () => (
  <section id="how-it-works" className="py-20 bg-cream">
    <div className="container mx-auto">
      <h2 className="font-grotesk text-3xl sm:text-4xl font-bold text-primary text-center mb-4">
        So funktioniert's
      </h2>
      <p className="text-muted-foreground text-center mb-14 max-w-xl mx-auto">
        In nur 3 Schritten zu professionellen Exposé-Fotos.
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((s) => (
          <div key={s.num} className="text-center">
            <div className="w-14 h-14 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-5 font-grotesk">
              {s.emoji}
            </div>
            <h3 className="font-grotesk text-xl font-semibold text-primary mb-2">{s.title}</h3>
            <p className="text-muted-foreground text-sm">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
