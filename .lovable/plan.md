

# Desktop-Optimierung, neue Farbe und neue Schrift

## Was sich andert

### 1. Neue Accent-Farbe: Teal / Petrol
Die WhatsApp-gruene Accent-Farbe (`hsl(145, 75%, 49%)`) wird durch ein elegantes Teal ersetzt. Dies betrifft alle Buttons, Badges, Toggle-Elemente, Check-Icons und Highlight-Boxen auf der gesamten Seite.

- **Neue Accent-Farbe:** `hsl(172, 66%, 40%)` (ein sattes Petrol/Teal, ca. `#22A699`)
- Die `--whatsapp`-Variable wird ebenfalls angepasst bzw. entfernt, da sie nicht mehr relevant ist

**Betroffene Dateien:** `src/index.css` (CSS-Variablen)

### 2. Neue Headline-Schrift: Space Grotesk
Fraunces (Serif) wird durch Space Grotesk (geometric sans-serif) ersetzt, das einen modernen, tech-orientierten AI-Look vermittelt.

- Google Fonts Link in `index.html` aktualisieren (Fraunces raus, Space Grotesk rein)
- `tailwind.config.ts`: Font-Family Mapping anpassen
- `src/index.css`: Font-Referenzen aktualisieren
- Alle Komponenten verwenden bereits `font-fraunces`-Klasse -- diese wird umbenannt zu `font-space` oder die Utility-Klasse wird intern auf Space Grotesk umgemappt

**Betroffene Dateien:** `index.html`, `tailwind.config.ts`, `src/index.css`, ggf. alle Komponenten mit `font-fraunces`

### 3. Desktop-Layout-Optimierungen (Mobile bleibt unverandert)
Verbesserungen die nur ab `md:` / `lg:` Breakpoints greifen:

- **Hero:** Mehr vertikalen Whitespace, grossere Headline-Font-Size auf Desktop (`lg:text-7xl`)
- **Before/After, Features, Testimonials:** Grossere Card-Padding und bessere Grid-Abstande auf Desktop
- **Pricing:** Mehr Spacing zwischen den Karten, grossere Schrift fur Preise auf Desktop
- **Quality Guarantee:** Besseres horizontales Layout mit mehr Platz zwischen Text und Flow-Diagram
- **FAQ:** Breiterer Max-Width auf Desktop (von `max-w-2xl` auf `max-w-3xl`)
- **Container:** Max-Width von `1200px` auf `1280px` erhohen fur mehr Luft

---

## Technische Details

### index.html
- Fraunces Google Font durch Space Grotesk ersetzen

### src/index.css
- `--accent` von `145 75% 49%` auf `172 66% 40%` andern
- `--whatsapp` ebenfalls auf den neuen Teal-Wert setzen
- Font-Familie in `h1-h6` Regel auf `'Space Grotesk'` andern
- `.font-fraunces` Utility auf `'Space Grotesk'` umstellen

### tailwind.config.ts
- `fontFamily.fraunces` auf `["Space Grotesk", "sans-serif"]` andern
- Container `2xl` Screen auf `1280px`

### Komponenten-Dateien
Alle Dateien die `font-fraunces` oder `accent`/`text-accent` verwenden, funktionieren automatisch uber die CSS-Variablen und Tailwind-Utilities -- keine manuellen Anderungen in den Komponenten notig fur Farbe und Font.

Desktop-spezifische Layout-Tweaks werden in folgenden Dateien vorgenommen:
- `HeroSection.tsx` - grossere Headline, mehr Padding
- `BeforeAfterShowcase.tsx` - Card-Spacing
- `Features.tsx` - Grid-Gap
- `Pricing.tsx` - Desktop-Spacing
- `QualityGuarantee.tsx` - Layout-Balance
- `FAQ.tsx` - breiterer Container
- `Testimonials.tsx` - Card-Padding
