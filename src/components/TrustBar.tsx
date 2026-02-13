const brands = ["Engel & Völkers", "RE/MAX", "Von Poll", "McMakler", "Homeday"];

const TrustBar = () => (
  <section className="py-10 border-y border-border/50">
    <div className="container mx-auto text-center">
      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6 font-semibold">
        Vertraut von Immobilienprofis
      </p>
      <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12">
        {brands.map((b) => (
          <span key={b} className="text-muted-foreground/40 font-semibold text-lg font-grotesk">
            {b}
          </span>
        ))}
      </div>
    </div>
  </section>
);

export default TrustBar;
