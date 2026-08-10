# Call Lens — Landing Page (v3)

A single, self-contained `index.html` — all CSS and fonts inline as `data:` URIs, no CDN
links, no build step. Built to the brief in `docs/brief.md` / `pasted-1.md`.

## Why v3 replaced v2

The brief was updated with the product's real shipping design system and a hard rule:
**the palette is not the page's to invent — it is inherited from the app**
(`callLens-frontend/src/app/globals.css`), plus the real type stack (**Geist** /
**Geist Mono** / **Noto Sans Arabic**, embedded, not a system-font substitute). v2 had
invented a plausible-looking but wrong palette (warm cream + blue/terracotta) and system
fonts standing in for a "display face" — both explicitly called out and corrected in the
updated brief. v3 replaces every colour and font decision with the real ones.

## Running locally

No build step.

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Design system

**Colour — the shipping product's tokens, used verbatim, not retuned:**

| Token | Light | Dark | Role |
|---|---|---|---|
| `--ink-900` | `#1e1a2b` | `#ededed` | headings |
| `--ink-700` | `#443f55` | `#c7c7c7` | body |
| `--ink-500` | `#6a6480` | `#a0a0a0` | captions |
| `--page` | `#f4f3f7` | `#000000` (true black) | page background |
| `--card` | `#ffffff` | `#1a1a1a` | raised surfaces |
| `--border` | `#e7e5ee` | `#242424` | hairlines |
| `--primary` | `#7133e6` | `#9f6ffb` | buttons/links |
| `--playhead` | `#e08a1e` | (fixed) | **reserved** — the moment a citation points at |

`--playhead` is spent on exactly one thing: the timeline's playhead and citation markers —
the same colour the product itself uses for "the moment being listened to." It is never
used as a status colour, warning, or decoration anywhere else on the page.

Sentiment uses its own three-value scale (`--sentiment-pos/neu/neg`), deliberately
distinct from status colours, because a negative-sentiment call is a fact, not an error.

**Fixed dark surface (`--surface-dark`, `--surface-dark-line`, `--surface-dark-label`):**
the time-axis instrument panel, the RTL demo block, and the neutral outcome pill use a
surface colour that does **not** flip under `prefers-color-scheme: dark` — it is meant to
read as a mixing-console face in both page themes. (An earlier pass reused `--ink-900` for
this, which is correct in light mode but turns near-white in dark mode against white
label text — a real contrast failure the axe-core scan caught and this token fixes.)

**Type — the product's real stack, embedded as subsetted `woff2` `data:` URIs:**
- **Geist** (400/600/700) — display and body text.
- **Geist Mono** (400/600/700) — every timecode, ratio, duration, and measure, with
  `font-feature-settings:"tnum"` so columns of numbers don't jitter.
- **Noto Sans Arabic** (400/700) — declared in the *same* font stack as Geist/Geist Mono
  (not a `:lang(ar)` swap), because font fallback is per-glyph: this is what lets a single
  declaration cover Latin-inside-Arabic and digits-inside-Arabic correctly.
- All three subsetted to only the glyphs the page actually uses (~211KB combined
  base64), so the whole page — including working fonts with zero external requests —
  fits in about 240KB.

**Signature element:** a horizontal time axis with two speaker-channel traces; findings
are markers pinned to the second they reference, with a playhead that sweeps once on
load (fully gated behind `prefers-reduced-motion: no-preference`).

**Risk taken:** a genuine `dir="rtl"` Arabic block where the embedded time-axis SVG is
explicitly not mirrored — proving the RTL/LTR-timeline claim structurally rather than
asserting it in prose. An English gloss for screen readers is `.visually-hidden` rather
than visible, so the visual proof isn't undercut by a sentence restating it.

## Quality floor verified

- No horizontal scroll on the body at 360 / 768 / 1440px viewport widths, in both light
  and dark colour schemes (Playwright `scrollWidth` vs `clientWidth` check, 6 combinations).
- Zero WCAG 2A/2AA violations (axe-core scan) in both light and dark colour schemes.
- All 8 embedded font faces confirmed **actually loaded** via `document.fonts` (not just
  declared) — `getComputedStyle` on real headings/data spans resolves to `Geist` /
  `Geist Mono`, not a fallback.
- Logical, sequential keyboard tab order confirmed.
- `prefers-reduced-motion: reduce` short-circuits the hero playhead animation to its end
  state; with motion off, the page is fully legible and complete.
- No JavaScript in the page at all — nothing to degrade if JS is disabled.
- Single HTML file, verified to parse cleanly with Python's `html.parser`.
- Zero external network references (checked for stray `http(s)://` URLs outside SVG
  namespace declarations and `mailto:` links).

## What's illustrative, and what's real

- The hero time-axis graphic and the "what comes back from one call" worked example are
  captioned "Illustration of the output, not a customer's call/data."
- The "In development" section is copy-locked to future tense and visually separated
  (dashed border) from shipping features.
- No customer logos, testimonials, star ratings, or invented percentages appear anywhere.

## `legacy/v1/`

The original build (separate CSS/JS/SVG assets, navy/teal invented palette, generic SaaS
copy) is preserved here for reference. It does not reflect the current brief and is not
linked from the shipping page.
