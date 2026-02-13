const FinalCTA = () => {
  const scrollToRegister = () =>
    document.querySelector("#register")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="py-20 bg-cream">
      <div className="container mx-auto text-center">
        <h2 className="font-grotesk text-3xl sm:text-4xl font-bold text-primary mb-6">
          Bereit für professionelle Exposé-Fotos?
        </h2>
        <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
          Starten Sie jetzt kostenlos und überzeugen Sie sich selbst von der Qualität.
        </p>
        <button
          onClick={scrollToRegister}
          className="bg-accent text-accent-foreground px-10 py-4 rounded-xl text-lg font-semibold hover:brightness-110 transition-all shadow-lg shadow-accent/25"
        >
          5 Bilder kostenlos testen
        </button>
      </div>
    </section>
  );
};

export default FinalCTA;
