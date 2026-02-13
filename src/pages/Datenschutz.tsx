import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Datenschutz = () => (
  <main>
    <Navigation />
    <div className="container mx-auto px-4 pt-32 pb-16 max-w-3xl">
      <h1 className="text-3xl font-bold font-fraunces text-primary mb-8">Datenschutzerklärung</h1>

      <div className="prose prose-sm max-w-none space-y-6 text-foreground/80">
        <section>
          <h2 className="text-lg font-semibold text-foreground">1. Verantwortlicher</h2>
          <p>
            NPS Media GmbH (Marke: ImmoOnPoint / ImmoPics.ai)<br />
            Augsburg, Deutschland<br />
            E-Mail: info@immoonpoint.de
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">2. Erhobene Daten</h2>
          <p>Wir verarbeiten folgende personenbezogene Daten:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Vorname, Nachname, E-Mail-Adresse</li>
            <li>WhatsApp-Telefonnummer</li>
            <li>Hochgeladene Immobilienbilder</li>
            <li>Bearbeitungsanweisungen und Prompts</li>
            <li>Nutzungsdaten (Credits, Plan, Zeitstempel)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">3. Zweck der Verarbeitung</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Bereitstellung des KI-Bildbearbeitungsdienstes</li>
            <li>Nutzerverwaltung und Authentifizierung</li>
            <li>Abrechnung und Zahlungsabwicklung</li>
            <li>Kommunikation über WhatsApp</li>
          </ul>
          <p>Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung).</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">4. Einsatz von KI</h2>
          <p>
            Zur Bildbearbeitung setzen wir Google Gemini ein. Ihre Bilder werden zur
            Verarbeitung an die Google Cloud API übermittelt. Es findet keine Speicherung
            durch Google zu Trainingszwecken statt (API-Nutzung). Dieser Hinweis erfolgt
            gemäß den Transparenzanforderungen des EU AI Act.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">5. Auftragsverarbeiter</h2>
          <p>Wir setzen folgende Dienstleister ein (mit AVV):</p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Supabase</strong> – Datenbank und Authentifizierung (EU, Frankfurt)</li>
            <li><strong>Google Cloud</strong> – KI-Bildbearbeitung und Bildspeicher (Google Drive)</li>
            <li><strong>Meta</strong> – WhatsApp Business API</li>
            <li><strong>n8n Cloud</strong> – Workflow-Automatisierung (AWS Frankfurt, EU)</li>
            <li><strong>Vercel</strong> – Webseiten-Hosting</li>
            <li><strong>Stripe</strong> – Zahlungsabwicklung</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">6. Speicherdauer</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Bearbeitete Bilder: 90 Tage nach Erstellung</li>
            <li>Nutzungslogs: 12 Monate</li>
            <li>Vertragsdaten: Gemäß handels- und steuerrechtlichen Aufbewahrungsfristen</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">7. Ihre Rechte</h2>
          <p>Sie haben das Recht auf:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO)</li>
            <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
            <li>Löschung Ihrer Daten (Art. 17 DSGVO)</li>
            <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
            <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
            <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
          </ul>
          <p>Kontakt: info@immoonpoint.de</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">8. Aufsichtsbehörde</h2>
          <p>
            Bayerisches Landesamt für Datenschutzaufsicht (BayLDA)<br />
            Promenade 18, 91522 Ansbach<br />
            <a
              href="https://www.lda.bayern.de"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              www.lda.bayern.de
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">9. Cookies</h2>
          <p>
            Diese Webseite verwendet ausschließlich technisch notwendige Cookies
            (Supabase-Session). Es werden keine Tracking- oder Marketing-Cookies eingesetzt.
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

export default Datenschutz;
