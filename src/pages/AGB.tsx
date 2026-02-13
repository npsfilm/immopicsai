import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const AGB = () => (
  <main>
    <Navigation />
    <div className="container mx-auto px-4 pt-32 pb-16 max-w-3xl">
      <h1 className="text-3xl font-bold font-grotesk text-primary mb-8">
        Allgemeine Geschäftsbedingungen
      </h1>

      <div className="prose prose-sm max-w-none space-y-6 text-foreground/80">
        <section>
          <h2 className="text-lg font-semibold text-foreground">1. Geltungsbereich</h2>
          <p>
            Diese AGB gelten für die Nutzung des KI-Bildbearbeitungsdienstes ImmoPics.ai,
            betrieben von der NPS Media GmbH (nachfolgend „Anbieter"), Augsburg.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">2. Leistungsbeschreibung</h2>
          <p>
            Der Anbieter stellt eine KI-gestützte Bildbearbeitung für Immobilienbilder bereit.
            Die Nutzung erfolgt über WhatsApp und/oder die Upload-Seite. Bearbeitungen werden
            automatisiert durch KI (Google Gemini) durchgeführt.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">3. Nutzerkonto und Credits</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Die Registrierung erfolgt über WhatsApp.</li>
            <li>Jede Bildbearbeitung verbraucht einen Credit.</li>
            <li>Nicht genutzte Credits verfallen am Monatsende.</li>
            <li>Credits sind nicht übertragbar.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">4. Preise und Zahlung</h2>
          <p>
            Alle Preise verstehen sich netto zzgl. 19% MwSt. Die Abrechnung erfolgt monatlich
            über Stripe. Bei Jahresabonnements gilt ein Rabatt von 10%.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">5. Redo-Garantie</h2>
          <p>
            Bei Unzufriedenheit mit dem Ergebnis kann eine kostenlose Nachbearbeitung (Redo)
            angefordert werden. Der verbrauchte Credit wird zurückgebucht. Pro Bild ist ein
            Redo möglich.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">6. Profi-Bearbeitungen</h2>
          <p>
            Je nach Plan stehen zusätzlich menschliche Profi-Bearbeitungen zur Verfügung.
            Die Bearbeitungszeit beträgt in der Regel 24–48 Stunden.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">7. Nutzungsrechte</h2>
          <p>
            Der Nutzer behält alle Rechte an seinen Originalbildern. An den bearbeiteten
            Bildern erhält der Nutzer ein einfaches, zeitlich unbegrenztes Nutzungsrecht.
            Der Anbieter speichert Bilder für maximal 90 Tage.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">8. Haftung</h2>
          <p>
            KI-Ergebnisse können variieren. Der Anbieter garantiert keine bestimmte Qualität.
            Die Haftung für leicht fahrlässige Pflichtverletzungen ist auf den vertragstypisch
            vorhersehbaren Schaden begrenzt. Dies gilt nicht für Schäden aus der Verletzung von
            Leben, Körper oder Gesundheit.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">9. Kündigung</h2>
          <p>
            Monatsabonnements sind jederzeit zum Monatsende kündbar. Jahresabonnements können
            mit einer Frist von einem Monat zum Jahresende gekündigt werden. Der Free-Plan
            kann jederzeit ohne Kündigung genutzt werden.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">10. Schlussbestimmungen</h2>
          <p>
            Es gilt deutsches Recht. Gerichtsstand ist Augsburg, sofern der Nutzer Kaufmann,
            juristische Person des öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen
            ist. Sollte eine Bestimmung unwirksam sein, bleiben die übrigen Bestimmungen
            unberührt.
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

export default AGB;
