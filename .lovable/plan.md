
## Abstand zwischen PIN-Kacheln

Die PIN-Eingabe ist bereits 6-stellig (das ist korrekt implementiert). Das Problem ist, dass die 6 Kacheln direkt aneinander kleben ohne Abstand.

### Aenderung

In `src/components/upload/PinEntry.tsx` wird der `InputOTPGroup`-Container mit einer `gap-2` Klasse versehen, damit zwischen den einzelnen Slots ein Abstand entsteht. Ausserdem muessen die Slots von `border-y border-r` (geteilte Raender) auf vollstaendige individuelle Borders umgestellt werden, damit jede Kachel als eigenstaendige Box erscheint.

### Betroffene Datei
- `src/components/upload/PinEntry.tsx` -- `gap-2` auf `InputOTPGroup` und individuelle Border-Klassen auf jedem Slot
