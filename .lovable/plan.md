

## Fix: Formular springt auf Mobil beim Tippen

### Problem

Die fixierte Navigation oben wechselt beim Scrollen zwischen transparent und einem Blur-Hintergrund mit Schatten. Auf Mobilgeraeten oeffnet/schliesst die Bildschirmtastatur das Viewport, was Scroll-Events ausloest. Das fuehrt dazu, dass die Navigation staendig zwischen den beiden Zustaenden hin- und herspringt -- das Formular "zuckt".

### Loesung

In `src/components/Navigation.tsx` wird die Scroll-Erkennung so angepasst, dass auf der Registrierungsseite (`/registrieren`) die Navigation immer den festen (nicht-transparenten) Stil verwendet. So gibt es keinen Wechsel mehr, egal ob gescrollt wird oder nicht.

### Technische Aenderung

**Datei: `src/components/Navigation.tsx`**

- `useLocation()` ist bereits importiert
- Pruefen ob `location.pathname === "/registrieren"`
- Wenn ja: `scrolled`-Klasse immer anwenden (kein Wechsel)
- Das verhindert Layout-Shifts durch Tastatur-Scroll auf Mobil

```text
Vorher:
  const isScrolled = scrolled

Nachher:
  const isScrolled = scrolled || location.pathname !== "/"
```

So wird auf allen Unterseiten (nicht nur der Startseite) der feste Header-Stil verwendet, was das Springen komplett eliminiert.

