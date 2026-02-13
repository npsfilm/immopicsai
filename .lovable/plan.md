

# Credit-Pruefung und Live-Aktualisierung

## Aenderungen

### 1. Detailliertere Credit-Warnung in `UploadArea.tsx`

Die bestehende Credit-Pruefung (Zeile 47: `hasEnoughCredits`) bleibt erhalten. Folgendes wird ergaenzt:

- **Ausfuehrlichere Fehlermeldung** unterhalb des Buttons: Statt nur "Nicht genug Credits (X uebrig)" wird angezeigt:
  > "Du hast X Bilder ausgewaehlt, aber nur Y Credits uebrig. Entferne Bilder oder upgrade deinen Plan."
  
  Mit einem Link zu `www.immopics.ai/upgrade`

- **Button-Text** bei zu wenig Credits bleibt: `"Nicht genug Credits (X uebrig)"`

### 2. Credits nach jedem Bild reduzieren in `Upload.tsx`

In der `doUpload`-Funktion (Zeile 71-96) wird nach jedem erfolgreichen Upload `setUser` aufgerufen, um die Credits im State um 1 zu reduzieren:

```typescript
// Nach erfolgreichem res.ok:
setUser(prev => prev ? { ...prev, credits: prev.credits - 1 } : prev);
```

Dadurch wird sichergestellt, dass beim naechsten Batch (via "Weitere Bilder hochladen") die reduzierten Credits korrekt angezeigt werden und der Credit-Check greift.

### 3. Credits an UploadArea live weitergeben

Die Credits werden bereits via `user.credits` an `UploadArea` weitergegeben (Zeile 127). Da `setUser` den State aktualisiert, wird die Komponente automatisch mit den neuen Credits gerendert -- keine zusaetzliche Aenderung noetig.

---

## Betroffene Dateien

- `src/components/upload/UploadArea.tsx` -- erweiterte Fehlermeldung mit Upgrade-Link
- `src/pages/Upload.tsx` -- Credit-Dekrement nach jedem erfolgreichen Upload
