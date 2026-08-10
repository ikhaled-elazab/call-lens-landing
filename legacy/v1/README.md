# Call Lens — Conversation Intelligence Landing Page

A static, responsive HTML/CSS/JS landing page for **Call Lens**, a Conversation Intelligence product that analyzes sales and support calls, scores them against organization-defined guidelines, and generates coaching recommendations for operations managers.

## Structure

```
index.html                  Landing page markup
assets/css/styles.css        Design-token-driven styles (colors, type, spacing, components)
assets/js/main.js            Mobile nav, scroll reveal, lead-capture form validation
assets/img/                  Favicon, dashboard mockup SVG, workflow diagram SVG
docs/brand_brief.md          Brand/audience discovery notes
docs/copy_master.md          Section-by-section copy source of truth
docs/design_spec.md          Design tokens (color, type scale, spacing, components)
```

## Sections

1. **Hero** — value proposition + primary CTA + dashboard mockup visual
2. **Stats strip** — illustrative outcome highlights
3. **Features / Metrics** — 6 feature tiles covering analytics, insight extraction, guideline scoring, coaching workflows, trends, alerts
4. **How It Works** — 5-step workflow diagram (desktop SVG, stacked list on mobile)
5. **Coaching for Operations Managers** — narrative + 3 scenario cards
6. **Lead Capture / Demo Request** — validated form (name, email, company, team size, phone)
7. **Footer** — links + contact placeholder

## Running locally

No build step — plain static files.

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Notes / Placeholders

- Contact email (`hello@calllens.ai`), legal pages, and any customer stats are placeholders — see `[PLACEHOLDER]` markers in `docs/copy_master.md` and `docs/brand_brief.md`.
- The demo request form currently persists submissions to `localStorage` and shows a success message; wire `assets/js/main.js`'s submit handler to a real backend/CRM endpoint before production launch.
- Design tokens (colors, type scale, spacing) are defined as CSS custom properties in `assets/css/styles.css` and documented in `docs/design_spec.md`.
