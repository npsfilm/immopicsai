

# ImmoAI Landing Page – Implementation Plan

## Overview
A conversion-optimized, mobile-first landing page for ImmoAI – an AI-powered real estate photo editing service via WhatsApp. Includes a one-pager with 14 sections and a portfolio subpage (/ergebnisse).

**Design:** Clean, white background with Navy (#233C63) and WhatsApp Green (#25D366) accents. Google Fonts: Fraunces (headlines) + Outfit (body text).

---

## Page 1: Main Landing Page (One-Pager)

### 1. Sticky Navigation
- Logo "ImmoAI" on the left, navigation links + green CTA button on the right
- Mobile: hamburger menu with full-width links
- Glass-effect background with shadow on scroll

### 2. Hero Section
- Animated green badge "5 Bilder kostenlos testen" with pulse dot
- Large headline: "Professionelle Exposé-Fotos in Sekunden – per WhatsApp"
- Two buttons: green primary CTA + outline secondary button
- Subtle radial gradient background (no images)
- Staggered fade-up animations on load

### 3. Trust Bar
- "Vertraut von Immobilienprofis" label with placeholder brand names (Engel & Völkers, RE/MAX, etc.)

### 4. Before/After Showcase
- 3-card grid showing sky replacement, virtual staging, and object removal
- Cards with hover lift effect
- Link to full portfolio page

### 5. How It Works (3 Steps)
- Step cards with numbered navy badges: Register → Send Photo → Get Result
- Off-white background section

### 6. Features (6-Card Grid)
- Virtual Staging, Sky Optimization, Object Removal, Instant Results, HD Quality, WhatsApp-based
- Emoji icons in cream-colored boxes

### 7. Target Audiences (4 Cards)
- Real estate agents, architects, property managers, private sellers
- 2×2 grid on desktop

### 8. Quality Guarantee
- Two-column layout: text on left explaining AI + human editing, vertical flow diagram on right
- Green highlight box for "unlimited corrections" promise

### 9. Pricing (3 Plans + Toggle)
- Monthly/Yearly toggle with animated slider and -20% badge
- Free (0€), Pro (49€/39€), Premium (129€/99€)
- Pro card highlighted with "Beliebt" badge
- Explanation box for "Profi-Bearbeitungen" below

### 10. Testimonials
- 3 placeholder testimonial cards with star ratings

### 11. Registration Form
- Navy background with glass-effect inputs
- 4 fields: Name, Email, WhatsApp number, Role dropdown
- Privacy checkbox + green submit button with WhatsApp icon
- Trust badges (DSGVO, no credit card, instant WhatsApp)
- Success state with confirmation message after submit
- POST to configurable webhook URL (n8n integration ready)

### 12. FAQ Accordion
- 8 questions with smooth expand/collapse animations
- Single-open behavior

### 13. Final CTA
- Cream background, headline + green CTA button for last-chance conversion

### 14. Footer
- Copyright, legal links (Impressum, Datenschutz, AGB)

---

## Page 2: Portfolio Page (/ergebnisse)

- Shared navigation and footer
- Mini hero with headline
- Filter tabs: Alle, Virtual Staging, Himmel, Objekte entfernen, Gesamtoptimierung
- Gallery grid with before/after placeholder cards (9-12 items)
- CTA at bottom linking back to registration form

---

## Animations & Interactions
- Scroll-reveal animations on all sections (fade up)
- Card hover effects (lift + shadow)
- Pricing toggle with smooth price transitions
- Accordion with chevron rotation
- Pulse animation on hero badge dot
- Nav shadow transition on scroll

---

## Technical Notes
- Fully responsive with breakpoints at 900px, 768px, and 400px
- Webhook URL for form submission will be configurable (placeholder for n8n)
- No backend needed initially – form submits to external webhook
- Placeholder images for before/after comparisons (to be replaced with real assets)
- All text content in German as specified in the blueprint

