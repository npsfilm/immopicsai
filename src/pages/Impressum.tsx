import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Impressum = () => (
  <main>
    <Navigation />
    <div className="container mx-auto px-4 pt-32 pb-16 max-w-3xl">
      <h1 className="text-3xl font-bold font-fraunces text-primary mb-8">Impressum</h1>

      <div className="prose prose-sm max-w-none space-y-6 text-foreground/80">
        <section>
          <h2 className="text-lg font-semibold text-foreground">Angaben gemäß § 5 TMG</h2>
          <p>
            NPS Media GmbH<br />
            (Marke: ImmoOnPoint / ImmoPics.ai)<br />
            Augsburg, Deutschland
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">Kontakt</h2>
          <p>
            E-Mail: info@immoonpoint.de<br />
            WhatsApp: <a href="https://wa.me/4915734019999" className="text-accent hover:underline">+49 157 3401 9999</a>
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">Vertretungsberechtigter Geschäftsführer</h2>
          <p>Angaben werden nach Handelsregistereintrag ergänzt.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">Registereintrag</h2>
          <p>
            Registergericht: Amtsgericht Augsburg<br />
            Angaben werden nach Eintragung ergänzt.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">Umsatzsteuer-ID</h2>
          <p>
            Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG:<br />
            Wird nach Vergabe ergänzt.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
          <p>
            NPS Media GmbH<br />
            Augsburg, Deutschland
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">Streitschlichtung</h2>
          <p>
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS)
            bereit:{" "}
            <a
              href="https://ec.europa.eu/consumers/odr/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              https://ec.europa.eu/consumers/odr/
            </a>
          </p>
          <p>
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">Hinweis zum Einsatz von KI</h2>
          <p>
            ImmoPics.ai setzt künstliche Intelligenz (Google Gemini) zur Bearbeitung von
            Immobilienbildern ein. Die Ergebnisse werden automatisiert erstellt. Dieser Hinweis
            erfolgt gemäß den Transparenzanforderungen des EU AI Act.
          </p>
        </section>
      </div>

      <div className="mt-12 text-center">
        <Link to="/" className="text-accent hover:underline text-sm">
          ← Zurück zur Startseite
        </Link>
      </div>
    </div>
    <Footer />
  </main>
);

export default Impressum;
