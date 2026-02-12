const HeroSection = () => {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Radial gradient bg */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(var(--accent)/0.08)_0%,_transparent_60%)]" />

      <div className="container mx-auto text-center relative z-10 py-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-semibold mb-8 animate-fade-up">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent" />
          </span>
          5 Bilder kostenlos testen
        </div>

        <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-bold text-primary leading-tight max-w-4xl mx-auto mb-6 animate-fade-up [animation-delay:100ms]">
          Professionelle Exposé-Fotos in Sekunden – per WhatsApp
        </h1>

        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up [animation-delay:200ms]">
          Sende dein Immobilienfoto per WhatsApp und erhalte in Sekunden ein professionell bearbeitetes Bild zurück. KI-gestützt, schnell, einfach.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up [animation-delay:300ms]">
          <button
            onClick={() => scrollTo("#register")}
            className="bg-accent text-accent-foreground px-8 py-4 rounded-xl text-lg font-semibold hover:brightness-110 transition-all shadow-lg shadow-accent/25"
          >
            Jetzt kostenlos starten
          </button>
          <button
            onClick={() => scrollTo("#how-it-works")}
            className="border-2 border-primary/20 text-primary px-8 py-4 rounded-xl text-lg font-semibold hover:bg-primary/5 transition-all"
          >
            So funktioniert's
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
