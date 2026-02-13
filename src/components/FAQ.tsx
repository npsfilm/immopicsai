import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "Wie funktioniert ImmoAI?", a: "Senden Sie einfach ein Foto Ihrer Immobilie per WhatsApp an uns. Unsere KI bearbeitet das Bild automatisch und sendet Ihnen das Ergebnis in wenigen Sekunden zurück." },
  { q: "Welche Bearbeitungen sind möglich?", a: "Virtual Staging, Himmeloptimierung, Objektentfernung, Helligkeit & Kontrast, HDR-Effekte und vieles mehr." },
  { q: "Wie lange dauert eine Bearbeitung?", a: "Standard-Bearbeitungen wie Himmeloptimierung dauern nur wenige Sekunden. Komplexere Aufgaben wie Virtual Staging können bis zu 2 Minuten dauern." },
  { q: "Ist meine Daten sicher?", a: "Ja, alle Daten werden verschlüsselt übertragen und nach der Bearbeitung automatisch gelöscht. Wir sind vollständig DSGVO-konform." },
  { q: "Kann ich ImmoAI kostenlos testen?", a: "Ja! Jeder neue Nutzer erhält 5 kostenlose Bildbearbeitungen zum Testen – ohne Kreditkarte." },
  { q: "Welche Bildformate werden unterstützt?", a: "Alle gängigen Formate: JPG, PNG, HEIC. Einfach per WhatsApp senden – wir kümmern uns um den Rest." },
  { q: "Kann ich Korrekturen anfordern?", a: "Selbstverständlich! Bei Pro- und Premium-Plänen können Sie unbegrenzt Korrekturen anfordern, bis das Ergebnis perfekt ist." },
  { q: "Wie kündige ich mein Abo?", a: "Sie können Ihr Abonnement jederzeit kündigen – einfach per WhatsApp-Nachricht oder in Ihrem Account. Keine versteckten Kosten." },
];

const FAQ = () => (
  <section id="faq" className="py-20">
    <div className="container mx-auto max-w-2xl lg:max-w-3xl">
      <h2 className="font-fraunces text-3xl sm:text-4xl font-bold text-primary text-center mb-14">
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
