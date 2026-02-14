

# Stripe Checkout Integration

## Ueberblick

Die Registrierung wird so angepasst, dass nach dem Absenden des Formulars:
1. Der n8n-Webhook eine Stripe Checkout URL zurueckgibt (fuer bezahlte Plaene)
2. Das Frontend den User direkt zu Stripe weiterleitet
3. Fuer den Test-Plan (kostenlos) bleibt der Flow wie bisher (kein Stripe)

Zusaetzlich werden alle Texte auf der gesamten Seite an die neue Preisliste angepasst (3 statt 5 kostenlose Bilder, korrekte Top-Up-Preise, Pixi statt Lumi, etc.).

---

## Betroffene Dateien

### 1. `src/pages/Registrieren.tsx` -- Checkout-Redirect nach Formular

**Aenderung in `handleSubmit`:**
- Nach erfolgreichem Webhook-Aufruf: Response-Body parsen
- Wenn `checkoutUrl` in der Antwort enthalten ist: `window.location.href = checkoutUrl`
- Wenn kein `checkoutUrl` (z.B. Test-Plan): weiterhin Success-Step anzeigen
- Loading-State bleibt aktiv waehrend der Redirect passiert

```text
Aktuell:
  fetch(WEBHOOK_URL, ...) -> setStep("success")

Neu:
  fetch(WEBHOOK_URL, ...) -> response.json()
  -> if (data.checkoutUrl) window.location.href = data.checkoutUrl
  -> else setStep("success")
```

**Textaenderungen:**
- Test-Plan: "3 KI-Bilder einmalig" statt "5 KI-Bilder einmalig"
- Success-Step fuer Test-Plan: "3 kostenlose Bearbeitungen" statt "5"
- Success-Step fuer bezahlte Plaene: Hinweis "Sie werden zur Zahlung weitergeleitet..."

### 2. `src/components/Pricing.tsx` -- Texte + Top-Up-Preise aktualisieren

- Test-Plan: "3 KI-Bilder einmalig" statt "5"
- Profi-Edits Top-Ups: Werte auf 10/15/30 Edits mit 44,90/59,00/109,00 EUR anpassen (die bestehenden Stripe-Produkte)
- Beschreibung unter Pricing: "Starte kostenlos mit 3 Bildern"

### 3. `src/components/HeroSection.tsx` -- Texte anpassen

- Badge: "3 Bilder kostenlos testen" statt "5"
- Subheadline: "Pixi" statt "Lumi"
- CTA-Text: "Kostenlos testen -- 3 Bilder gratis"

### 4. `src/components/FAQ.tsx` -- Texte anpassen

- "3 Bilder" statt "5 Bilder" bei kostenlosen Credits
- "Pixi" statt "Lumi"
- Neue FAQ-Fragen gemaess Preisliste (DSGVO, Nachbesserungen, etc.)

### 5. `src/components/FinalCTA.tsx` -- Text anpassen

- "3 kostenlosen Bearbeitungen" statt "5"

### 6. `src/components/RegistrationForm.tsx` -- Text anpassen

- "3 Bilder kostenlos" statt "5 Bilder kostenlos"

---

## Stripe Produkt/Preis-Mapping (bereits in Stripe vorhanden)

Die folgenden IDs werden NICHT im Code hardcoded -- sie werden von n8n verwaltet. n8n kennt die Price IDs und erstellt die Checkout Session serverseitig. Das Frontend schickt nur `plan` und `billing` an den Webhook.

Zur Referenz:

| Produkt | Monatlich | Quartalsweise | Jaehrlich |
|---------|-----------|---------------|-----------|
| Basic | price_1T0fbF... (14 EUR) | price_1T0fvc... (38 EUR) | price_1T0fjo... (140 EUR) |
| Pro | price_1T0g4B... (49 EUR) | price_1T0g3v...kQJk (132 EUR) | price_1T0g3v...QHyr (490 EUR) |
| Team | price_1T0gLH... (99 EUR) | price_1T0gL3...Dulo (267 EUR) | price_1T0gL3...JcED (990 EUR) |

Top-Ups (Einmalzahlung):
| Produkt | Preis-ID | Betrag |
|---------|----------|--------|
| 10 KI-Bilder | price_1T0gMK... | 9,90 EUR |
| 25 KI-Bilder | price_1T0gMj... | 19,90 EUR |
| 50 KI-Bilder | price_1T0gNA... | 34,90 EUR |
| 10 Profi-Edits | price_1T0gNx... | 44,90 EUR |
| 15 Profi-Edits | price_1T0gPE... | 59,00 EUR |
| 30 Profi-Edits | price_1T0gQV... | 109,00 EUR |

---

## Was n8n machen muss (nicht Teil dieser Implementierung)

Der n8n-Webhook muss so angepasst werden, dass er:
1. Fuer bezahlte Plaene (basic/pro/team) eine Stripe Checkout Session erstellt
2. Die `checkoutUrl` im Response-Body zurueckgibt: `{ "checkoutUrl": "https://checkout.stripe.com/..." }`
3. Fuer den Test-Plan keine Checkout URL zurueckgibt (der User wird direkt registriert)

Das Frontend erwartet folgendes Response-Format:
```text
Bezahlter Plan: { "checkoutUrl": "https://checkout.stripe.com/c/pay_..." }
Test-Plan: { "success": true } (oder beliebiges JSON ohne checkoutUrl)
```

---

## Zusammenfassung der Aenderungen

1. **Registrieren.tsx**: Checkout-Redirect-Logik + Textanpassungen (3 statt 5 Bilder)
2. **Pricing.tsx**: Textanpassungen (3 Bilder, korrekte Edit-Top-Ups 10/15/30)
3. **HeroSection.tsx**: "3 Bilder", "Pixi" statt "Lumi"
4. **FAQ.tsx**: "3 Bilder", "Pixi" statt "Lumi", erweiterte FAQs
5. **FinalCTA.tsx**: "3 Bearbeitungen"
6. **RegistrationForm.tsx**: "3 Bilder"

Keine Edge Functions noetig -- die gesamte Stripe-Logik laeuft ueber n8n.

