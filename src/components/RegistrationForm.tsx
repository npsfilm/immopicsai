import { Link } from "react-router-dom";
import { MessageCircle, Shield, CreditCard, Zap } from "lucide-react";

const RegistrationForm = () => {
  return (
    <section id="register" className="py-20 bg-primary">
      <div className="container mx-auto text-center">
        <h2 className="font-grotesk text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">
          Jetzt kostenlos registrieren
        </h2>
        <p className="text-primary-foreground/70 mb-8 max-w-xl mx-auto">
          3 Bilder kostenlos bearbeiten – keine Kreditkarte nötig. Starten Sie
          in wenigen Sekunden per WhatsApp.
        </p>

        <Link
          to="/registrieren"
          className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-10 py-4 rounded-xl text-lg font-semibold hover:brightness-110 transition-all shadow-lg shadow-accent/25"
        >
          <MessageCircle className="w-5 h-5" />
          Kostenlos starten per WhatsApp
        </Link>

        <div className="flex flex-wrap justify-center gap-6 pt-8">
          {[
            { icon: Shield, label: "DSGVO-konform" },
            { icon: CreditCard, label: "Keine Kreditkarte" },
            { icon: Zap, label: "Sofort per WhatsApp" },
          ].map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="flex items-center gap-1.5 text-primary-foreground/50 text-xs"
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;
