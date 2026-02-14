import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "Wie funktioniert ImmoPics.ai?",
    a: 'Schick ein Foto per WhatsApp an unsere Nummer und schreib dazu was du willst – z.B. „Raum leer machen" oder „Möbel modern einrichten". Pixi, unsere KI, bearbeitet das Bild und schickt dir das Ergebnis innerhalb von Sekunden zurück.',
  },
  {
    q: "Wer ist Pixi?",
    a: "Pixi ist unser KI-Assistent. Du schreibst Pixi per WhatsApp wie einem Kollegen – Foto schicken, sagen was du willst, Ergebnis bekommen. Kein Login, keine App, keine Einarbeitungszeit.",
  },
  {
    q: "Was kostet ein einzelnes Bild?",
    a: "Ab 0,70€ pro Bild mit einem Top-Up-Paket. Im Basic-Plan zahlst du effektiv 0,93€ pro Bild, im Pro-Plan 0,98€. Zum Testen bekommst du 3 Bilder komplett kostenlos.",
  },
  {
    q: "Was ist ein Profi-Edit?",
    a: "Wenn die KI nicht das gewünschte Ergebnis liefert, kannst du das Bild an einen echten Bildbearbeiter übergeben. Der bearbeitet es manuell und liefert innerhalb von 24–48 Stunden. Profi-Edits sind im Pro- und Team-Plan inklusive oder einzeln als Top-Up buchbar.",
  },
  {
    q: "Kann ich kostenlos testen?",
    a: "Ja! Du bekommst 3 KI-Bildbearbeitungen kostenlos, ohne Kreditkarte. Einfach registrieren, Foto schicken, fertig.",
  },
  {
    q: "Brauche ich eine App?",
    a: "Nein. ImmoPics.ai funktioniert komplett über WhatsApp. Einfach Foto schicken – kein Download, kein Login, kein Einlernen nötig.",
  },
  {
    q: "Was passiert wenn meine Credits aufgebraucht sind?",
    a: "Du kannst jederzeit Extra-Credits als Top-Up nachkaufen, ohne deinen Plan zu wechseln. Oder du upgradest auf einen höheren Plan für mehr monatliche Credits.",
  },
  {
    q: "Was ist der Unterschied zwischen KI-Bearbeitung und Profi-Edit?",
    a: "Die KI-Bearbeitung durch Pixi dauert Sekunden und ist perfekt für Standard-Aufgaben: Räume leeren, Möbel staging, Himmel tauschen, HDR. Profi-Edits werden von echten Bildbearbeitern durchgeführt – ideal für komplexe Aufträge, die präzise Handarbeit erfordern. Lieferzeit: 24–48h.",
  },
  {
    q: "Kann ich meinen Plan jederzeit wechseln?",
    a: "Ja. Du kannst jederzeit upgraden oder downgraden. Beim Upgrade wird der neue Plan sofort aktiv, beim Downgrade zum Ende der aktuellen Abrechnungsperiode.",
  },
  {
    q: "Sind die Bilder kommerziell nutzbar?",
    a: "Ja, alle bearbeiteten Bilder darfst du uneingeschränkt kommerziell nutzen – für Exposés, Immobilienportale, Social Media und Printmaterialien.",
  },
  {
    q: "Ist ImmoPics.ai DSGVO-konform?",
    a: "Ja. Unsere Server stehen in der EU, wir haben Auftragsverarbeitungsverträge mit allen Dienstleistern, und deine Bilder werden nach 90 Tagen automatisch gelöscht. Details findest du in unserer Datenschutzerklärung.",
  },
  {
    q: "Was passiert wenn ich nicht zufrieden bin?",
    a: "Du bekommst 2 kostenlose Nachbesserungen pro Bild. Beschreib einfach was anders sein soll und Pixi versucht es nochmal. Wenn die KI nicht weiterkommt, kannst du das Bild an einen Profi-Editor übergeben.",
  },
  {
    q: "Welche Zahlungsmethoden werden akzeptiert?",
    a: "Wir akzeptieren alle gängigen Kreditkarten, SEPA-Lastschrift, Apple Pay und Google Pay über unseren Zahlungspartner Stripe.",
  },
];

const FAQ = () => (
  <section id="faq" className="py-20">
    <div className="container mx-auto max-w-2xl lg:max-w-3xl">
      <h2 className="font-grotesk text-3xl sm:text-4xl font-bold text-primary text-center mb-14">
        Häufige Fragen
      </h2>

      <Accordion type="single" collapsible className="space-y-2">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`item-${i}`} className="border border-border rounded-xl px-5 bg-card">
            <AccordionTrigger className="text-left text-primary font-medium hover:no-underline text-sm">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FAQ;
