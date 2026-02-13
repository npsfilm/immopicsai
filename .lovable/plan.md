
# Registrierungs-Webhook auf eigene URL umstellen

## Aenderung

In `src/components/RegistrationForm.tsx` nutzt das Formular aktuell die allgemeine `VITE_N8N_WEBHOOK_URL` Umgebungsvariable fuer den Registrierungs-Webhook. Diese wird durch die dedizierte Registrierungs-URL ersetzt:

```
https://immoonpoint.app.n8n.cloud/webhook/f5b1617b-57d6-407c-8f78-a8e828684f39
```

Konkret wird Zeile 6 geaendert: Statt `import.meta.env.VITE_N8N_WEBHOOK_URL` wird die URL direkt als Konstante gesetzt. Die gesendeten Daten (firstName, lastName, email, phone, plan) bleiben unveraendert.

### Betroffene Datei
- `src/components/RegistrationForm.tsx` -- Zeile 6: Webhook-URL Konstante aendern
