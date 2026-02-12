const steps = [
  { num: "1", title: "Registrieren", desc: "Kostenlos anmelden und WhatsApp-Nummer verknüpfen." },
  { num: "2", title: "Foto senden", desc: "Immobilienfoto einfach per WhatsApp an ImmoAI senden." },
  { num: "3", title: "Ergebnis erhalten", desc: "Professionell bearbeitetes Bild in Sekunden zurück." },
];

const HowItWorks = () => (
  <section id="how-it-works" className="py-20 bg-cream">
    <div className="container mx-auto">
      <h2 className="font-fraunces text-3xl sm:text-4xl font-bold text-primary text-center mb-4">
        So funktioniert's
      </h2>
      <p className="text-muted-foreground text-center mb-14 max-w-xl mx-auto">
        In nur 3 Schritten zu professionellen Exposé-Fotos.
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((s) => (
          <div key={s.num} className="text-center">
            <div className="w-14 h-14 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center text-xl font-bold mx-auto mb-5 font-fraunces">
              {s.num}
            </div>
            <h3 className="font-fraunces text-xl font-semibold text-primary mb-2">{s.title}</h3>
            <p className="text-muted-foreground text-sm">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
