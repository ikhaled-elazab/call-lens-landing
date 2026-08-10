# Design Spec — Call Lens (v0.1)

## Color Tokens
- `--navy-950`: #0B1E39 (primary dark bg / hero)
- `--navy-900`: #0F2647 (secondary dark surface)
- `--navy-800`: #16335E (card surface on dark)
- `--teal-500`: #14B8A6 (primary accent / CTA)
- `--teal-400`: #2DD4BF (hover accent)
- `--teal-100`: #CCFBF1 (accent tint bg)
- `--ink-900`: #0F172A (body text on light)
- `--ink-600`: #475569 (secondary text)
- `--slate-100`: #F1F5F9 (light section bg)
- `--white`: #FFFFFF
- `--danger-500`: #EF4444 (form error)
- `--success-500`: #22C55E (positive metric)

## Typography
- Font family: 'Inter', system-ui, -apple-system, sans-serif (Google Fonts, loaded via CDN link with fallback stack)
- Type scale: H1 48/56 (mobile 32/40), H2 36/44 (mobile 28/36), H3 22/30, Body-lg 18/28, Body 16/26, Small 14/20
- Weights: 700 headlines, 600 subheads/labels, 400 body

## Spacing Scale (rem)
0.25, 0.5, 0.75, 1, 1.5, 2, 3, 4, 6, 8 — section vertical padding: 6rem desktop / 3rem mobile

## Breakpoints
- Mobile: 375px base
- Tablet: 768px
- Desktop: 1280px+
- Container max-width: 1200px, 24px side gutter mobile / 40px desktop

## Grid
12-column grid on desktop, 24px gutters; single column stack under 768px.

## Components
- **Primary Button**: bg teal-500, text navy-950, radius 8px, padding 14px 28px, weight 600; hover bg teal-400; focus ring 2px teal-100 offset 2px.
- **Secondary Button**: transparent bg, 1px border rgba(255,255,255,.3) on dark / ink-900 on light, text inherits.
- **Feature Card**: bg white, radius 16px, shadow 0 8px 24px rgba(15,23,42,.06), padding 32px, icon chip teal-100 bg + teal-500 icon.
- **Coaching Scenario Card**: bg navy-900, text white, radius 16px, left accent bar 4px teal-500, padding 28px.
- **Form Field**: radius 8px, border 1px slate-300, padding 12px 14px, focus border teal-500 + 2px teal-100 ring; error state border danger-500 + helper text danger-500.
- **Dashboard Mockup Graphic**: SVG built from spec tokens — call score ring (teal-500 on navy-800), 3 metric bars, sentiment sparkline, coaching recommendation chip.

## Motion
- Section reveal: fade + translateY(12px) on scroll, 400ms ease-out, respects `prefers-reduced-motion`.
- Button hover: 150ms background-color transition.

## Accessibility
- Min contrast ratio 4.5:1 body text; CTA teal-500 on navy-950 passes AA for large text.
- All interactive elements keyboard-focusable with visible focus ring.
- Form fields have associated `<label>` and `aria-describedby` for error text.
