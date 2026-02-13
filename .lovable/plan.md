

# /Upload-Seite fuer ImmoPics.ai

## Voraussetzung: Supabase verbinden

Aktuell ist kein Supabase-Projekt verbunden. Die Upload-Seite benoetigt Supabase fuer die PIN-Verifizierung (Query auf die `users`-Tabelle). Bevor die Seite funktioniert, muss Lovable Cloud oder ein externes Supabase-Projekt verbunden werden. Ich werde den Supabase-Client und die Seite bereits vorbereiten, damit alles sofort funktioniert, sobald Supabase verbunden ist.

Ausserdem wird die Environment Variable `VITE_N8N_WEBHOOK_URL` benoetigt fuer den Bild-Upload an n8n.

---

## Neue Dateien

### 1. `src/integrations/supabase/client.ts`
- Supabase JS Client Setup mit `import.meta.env.VITE_SUPABASE_URL` und `VITE_SUPABASE_ANON_KEY`

### 2. `src/pages/Upload.tsx`
- Hauptseite mit Multi-Step-Flow, gesteuert ueber `useState`
- Steps: `"no-token"` | `"pin"` | `"upload"` | `"uploading"` | `"success"` | `"error"`

**Step-Komponenten (alle inline in Upload.tsx oder als separate Dateien):**

### 3. `src/components/upload/NoTokenScreen.tsx`
- Fehlerseite wenn kein `?token=` Parameter
- WhatsApp-Button zu `https://wa.me/4915734019999`

### 4. `src/components/upload/PinEntry.tsx`
- 4 einzelne OTP-Felder mit der bestehenden `InputOTP`-Komponente (shadcn)
- Auto-Focus, Backspace-Navigation, Keyboard-Support
- Shake-Animation bei falschem PIN (CSS keyframe)
- Max 3 Versuche, danach 5-Min-Sperre (Timer im State)
- "Zugang bestaetigen" Button
- Supabase-Query: `users` WHERE `upload_token` = token AND `upload_pin` = pin

### 5. `src/components/upload/UploadArea.tsx`
- Sticky Header: "ImmoPics.ai" Logo + Vorname + Plan-Badge
- Stats-Bar: Credits | Aufloesung (1K/2K/4K) | Max Bilder
- Drag-and-Drop Zone mit `onDragOver`/`onDrop` Events
- File-Input fuer Klick-Upload (accept: jpeg, png, webp, heic)
- Thumbnail-Grid (4:3 Aspect Ratio) mit Dateiname, Groesse, X-Button
- Toggle "Eine Anweisung fuer alle" vs "Pro Bild eine Anweisung" (Segmented Control)
- Textarea(s) fuer Anweisungen
- Submit-Button mit dynamischem Text und Credit-Check
- Plan-Logik: `{ free: { res: '1K', max: 1 }, starter: { res: '2K', max: 5 }, pro: { res: '4K', max: 5 }, team: { res: '4K', max: 20 } }`

### 6. `src/components/upload/UploadProgress.tsx`
- Fortschrittsanzeige: "Bild X von Y wird hochgeladen..."
- Progress-Bar mit der bestehenden `Progress`-Komponente
- "Pixi arbeitet..." Text mit Spinner

### 7. `src/components/upload/SuccessScreen.tsx`
- Erfolgs-Icon, Bestaetigung, zwei Buttons (weitere Bilder / WhatsApp)

### 8. `src/components/upload/ErrorScreen.tsx`
- Fehlermeldung + Retry-Button

---

## Route hinzufuegen

In `src/App.tsx`: Neue Route `<Route path="/upload" element={<Upload />} />`

---

## Styling und Animationen

- Nutzt bestehendes Design-System (Navy als Primary, Teal als Accent, Space Grotesk + Outfit)
- Neue CSS-Keyframes in `index.css`: `shake` fuer falsche PIN, `fade-in` fuer Seitenuebergaenge
- Branding: "ImmoPics.ai" (nicht "ImmoAI") mit Sparkles-Icon aus Lucide
- Footer: "ImmoPics.ai - NPS Media GmbH - DSGVO-konform"
- Border-Radius: 16px (`rounded-2xl`)
- Mobile-first: 2-Spalten-Grid < 640px, 3 Spalten bis 1024px, 4 Spalten darueber (max-w-[800px] zentriert)
- Button-Hover: `hover:-translate-y-px`
- Drag-Over: `scale-[1.01]` + Hintergrundwechsel

---

## Upload-Logik (Schritt 4)

- Jedes Bild wird als Base64 per `FileReader.readAsDataURL()` gelesen
- Einzeln per `fetch()` an `import.meta.env.VITE_N8N_WEBHOOK_URL` gesendet
- JSON Body: `{ token, phone_number, image_base64, image_name, prompt, plan, mime_type }`
- Sequentieller Upload mit Fortschrittsanzeige
- Bei Fehler: Abbruch mit Error-Screen + Retry

---

## Sicherheit

- Kein localStorage/sessionStorage -- bei Reload erneute PIN-Eingabe
- Token und PIN werden nie im UI angezeigt
- Nur gefilterte Daten aus Supabase geladen (nie komplette Tabelle)
- Rate-Limiting: 3 Versuche, dann 5-Min-Sperre (clientseitig via State + Timestamp)
- Error-Meldungen mit `role="alert"` fuer Accessibility

---

## Technische Details

```text
Upload.tsx (State-Machine)
  |
  |-- no token? --> NoTokenScreen
  |-- has token --> PinEntry
  |                   |
  |                   |--> Supabase query (users table)
  |                   |--> success --> UploadArea
  |                   |--> fail (max 3x) --> lockout 5min
  |
  |-- UploadArea
  |     |-- file selection (drag/drop + click)
  |     |-- instruction mode toggle
  |     |-- submit --> UploadProgress
  |
  |-- UploadProgress --> SuccessScreen
  |                  --> ErrorScreen --> retry
```

