import { Link } from "react-router-dom";

const FinalCTA = () => {
  return (
    <section className="py-20 bg-cream">
      <div className="container mx-auto text-center">
        <h2 className="font-grotesk text-3xl sm:text-4xl font-bold text-primary mb-6">
          Bereit, deine Immobilienfotos auf das nächste Level zu bringen?
        </h2>
        <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
          Starte jetzt mit 3 kostenlosen Bearbeitungen. Keine Kreditkarte, kein Vertrag.
        </p>
        <Link
          to="/registrieren"
          className="bg-accent text-accent-foreground px-10 py-4 rounded-xl text-lg font-semibold hover:brightness-110 transition-all shadow-lg shadow-accent/25"
        >
          Jetzt kostenlos testen
        </Link>
      </div>
    </section>
  );
};

export default FinalCTA;
