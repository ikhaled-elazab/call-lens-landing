# Call Lens — Landing Page (v2)

A single, self-contained `index.html` — all CSS inline, no CDN links, no external fonts,
no build step. Built to the brief in `pasted-1.md`.

## Why v2 replaced v1

The brief in `pasted-1.md` mandates a fundamentally different artefact than the previous
build: one self-contained HTML file (no separate CSS/JS/assets), copy sourced strictly from
a locked "verified facts" list (no invented stats, no customer logos), a specific nine-part
argument structure anchored on a time-axis/timecode-citation design language, and an
explicit prohibition on generic B2B SaaS visual defaults. The old multi-file build
(`legacy/v1/`) is kept for reference but is not part of the shipping page.

## Running locally

No build step.

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Design system (summary — see commit history / chat for the full token plan)

- **Signature element:** a horizontal time axis with two speaker-channel traces
  (`--channel-a` blue, `--channel-b` orange); findings are markers pinned to the second
  they reference.
- **Colour:** 6 named tokens, light palette on bare `:root`, dark deltas under
  `@media (prefers-color-scheme: dark)`. `--channel-b-text` is a WCAG-AA-safe darker
  variant of the orange accent, used for small text labels (the pure accent hex fails
  AA contrast on paper backgrounds at small sizes).
- **Type:** three roles — display, body, data (monospace, `tabular-nums`) — all system
  font stacks, no webfont embed (kept the file dependency-free; flagged as a trade-off,
  approved by stakeholder).
- **Risk taken:** a genuine `dir="rtl"` Arabic block where the embedded time-axis SVG is
  explicitly not mirrored — proving the RTL/LTR-timeline claim structurally rather than
  asserting it in prose. An English gloss for screen readers is `.visually-hidden` rather
  than visible, so the visual proof isn't undercut by a sentence restating it.

## Quality floor verified

- No horizontal scroll on the body at 360 / 768 / 1440px viewport widths (Playwright
  `scrollWidth` vs `clientWidth` check).
- Zero WCAG 2A/2AA violations (axe-core scan) in both light and dark colour schemes.
- Logical, sequential keyboard tab order confirmed.
- `prefers-reduced-motion: reduce` short-circuits the hero playhead animation to its end
  state; with motion off, the page is fully legible and complete.
- No JavaScript in the page at all — nothing to degrade if JS is disabled.
- Single HTML file, verified to parse cleanly with Python's `html.parser`.

## What's illustrative, and what's real

Every fabricated element on the page is explicitly labelled as such:

- The hero time-axis graphic and the "what comes back from one call" worked example are
  captioned "Illustration of the output, not a customer's call/data."
- The "In development" section is copy-locked to future tense and visually separated
  (dashed border) from shipping features.
- No customer logos, testimonials, star ratings, or invented percentages appear anywhere.

## `legacy/v1/`

The original build (separate CSS/JS/SVG assets, navy/teal palette, generic SaaS copy)
is preserved here for reference. It does not reflect the current brief and is not linked
from the shipping page.
