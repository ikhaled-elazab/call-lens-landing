You are the design lead building the public landing page for **Call Lens**. Deliver one
self-contained HTML page — all CSS and JS inline, no CDN links, no external fonts unless
embedded, no build step. It must render correctly on its own, with nothing else to install
or compile.

## The product, in one paragraph

Companies already record their calls. Call Lens is the part that reads them. Calls arrive
from a phone system through an API or get dragged into the browser. Call Lens transcribes
them with word-level timings, works out who was speaking and which speaker is your
employee, computes twenty-two measures from those timings, then reads the transcript and
returns a summary, an outcome, a sentiment, the account risk, and the specific moments
worth coaching. Every single claim it produces carries the second it came from, so any of
it can be played back and checked.

Tagline: **See every conversation. Gain every insight.**

## Who the page is for, and its one job

Written for a **head of sales, support lead, or contact-centre manager** who already has
recordings and no time to listen to them. Secondary reader: the ops or IT person who will
ask where the data lives.

The page has one job: make that manager believe *this reads every call and shows me the
receipt*, then get them to book a walkthrough of their own calls. Not to explain AI, not
to list technology, not to win a feature comparison.

## Voice — the hardest constraint on this page

Call Lens sells on verifiability. The brand's whole posture is *we would rather hand you
the model than a number you cannot check*. The copy has to sound like that, which means it
reads flatter and more confident than normal SaaS marketing.

Rules:

- **Specific over clever.** "Twenty-two measures, computed from word timings" beats
  "powerful analytics". "The call ended without a date" beats "actionable insights".
- **Name the mechanism next to the claim.** Every benefit on this page must be traceable
  to the feature that produces it. If you cannot name the mechanism, cut the claim.
- **Say what is not known.** The product refuses to show a claim it cannot place on the
  timeline; the page should carry that same honesty as a selling point, not hide it.
- **No adjective stacking.** No "seamless", "powerful", "revolutionary", "cutting-edge",
  "unlock", "supercharge", "game-changing", "AI-powered" as a headline noun.
- **British-leaning plain English**, sentence case, active voice.
- **Brand name is always two words: "Call Lens".** Never callLens, never CallLens.

## Verified facts — the only material you may build with

Everything here is true of the shipping product. Use it, cut from it, rephrase it. Do not
add to it.

**Capture**
- Two ways in: an ingestion API for a dialler/PBX/contact-centre platform, and browser
  upload for everyone else (MP3, M4A, AAC, WAV, WebM, OGG, FLAC — up to 200 MB / 60 min).
- Idempotent submission: a retrying integration cannot create the same call twice.
- Scoped API keys, shown in full exactly once, revocable, with last-used recorded.
- Eleven named processing stages per call, each showing pending / running / succeeded /
  failed / skipped. When a stage stops, the call says which one and why.
- Audio normalised before analysis; waveform rendered for the whole call; in-page player
  jumps straight to any cited second.

**Speech and speakers**
- Word-level timings — this is what makes silence, overlap and response speed measurable
  rather than estimated.
- Language profiles per employee, set once. Shipping markets: **United States (en-US) and
  the Arabic markets — Egypt (ar-EG), Saudi Arabia (ar-SA), UAE (ar-AE)** — with dialect
  handled first rather than flattened into generic Arabic. Two speech providers supported
  so the platform is not hostage to one vendor.
- Speaker separation including true dual-channel recordings. The employee is identified by
  name, so every measure is taken against a person, never "speaker 1".
- One-click correction when the wrong speaker was marked; metrics recompute.
- Calls that cannot be matched to an employee go to a review queue rather than being
  silently dropped from the numbers.

**The twenty-two measures — computed, never produced by a model**
Employee talk time · others talk time · talk ratio · silence · overlap · longest employee
streak · longest other streak · monologues · employee interruptions · other interruptions ·
first response time · lead-in silence · median response time · mean response time ·
questions asked · open questions · closed questions · employee word count · others word
count · employee words per minute · others words per minute · calculation version.

The commercial argument for this: these are the numbers a target gets set against. A model
would move them between runs and a rep could argue with them. Computed measures are
reproducible and defensible in a performance review. When a measure cannot be taken, the
call names the reason and the call is excluded from averages rather than dragging them
down as a zero.

**Understanding**
- Plain-language summary, in the language the call was held in.
- Five judgments per call: what the customer wanted, whether they can decide, whether
  budget was disclosed, how firm the timeline is, how it ended.
- One of four outcomes: committed / follow-up agreed / declined / unresolved.
- Sentiment on a five-point scale, plus a risk level for the account.
- Every judgment carries a timecode and jumps to the supporting transcript line.
- Citations are validated against the real transcript before storage — a claim pointing at
  a moment that does not exist is refused, not displayed.
- Re-running a call adds a version rather than overwriting what a decision was made on.

**Coaching**
- Seven moment types: coachable, risk, missed close, no next step agreed, strong
  discovery, price pushback, competitor mentioned.
- Risks typed (churn, compliance, competitor, pricing, expectations) and graded low /
  medium / high.
- Each moment gives a **"try instead"** line — a concrete alternative sentence, not a grade.
- One org-wide feed, filterable by rep, date range, moment type and severity, with totals
  and high-severity counts before you open anything.

**Scoring**
- Your own scorecard templates: your criteria, your weights.
- Scored automatically against measured behaviour (e.g. a talk-ratio band, a minimum
  number of open questions), with criterion-level evidence.
- Honest partial scoring: it reports how many criteria could be evaluated and withholds a
  total when none could. Changing a scorecard never rewrites scores already given.

**Reporting and integrations**
- Headline tiles, per-day trends, outcome distribution, sentiment — rolled up nightly.
- Break down by company, department or individual over any date range.
- Data freshness is stated: you are told when it was last calculated and how many calls are
  not yet counted.
- Employee directory with your own payroll/CRM codes, nested departments, company phone
  numbers. Org history is kept, not overwritten — moving someone in March does not rewrite
  last year's report.
- Signed webhook to your CRM as each call completes, per-endpoint secret, multiple
  endpoints, on-demand test events showing response code and latency, delivery history, and
  a readiness check before switching on.
- CSV export of any filtered call list.

**Trust**
- Tenant isolation enforced by the database itself on every query, not by application code.
  The application's own database account was never granted the ability to bypass it. Outside
  an authorised session a query returns nothing at all rather than someone else's rows.
- Recording links expire on a window you configure. Every authorisation and every refusal is
  logged with who asked, which call, from which address.
- Retention period set on your contract and visible in the product. Deletion by period or
  call by call.
- Subject erasure produces a **receipt** of what was removed — and names anything that could
  not be erased instead of glossing over it.
- Data residency options.

**The workspace**
- Interface translated and switched per person, not imposed per company.
- Genuine right-to-left support, not a mirrored stylesheet. The one thing that never flips
  is the call's time axis, because time does not run backwards in any language.
- Light and dark, both contrast-checked. Command palette. Keyboard navigable throughout.
- Honest states everywhere: when something is missing, loading or impossible, the screen
  says which and what to do next.

**The productivity argument — use the real shape of it**
A call reviewed by ear runs in real time. A call reviewed in Call Lens is a summary, five
judgments and the flagged moments, each with a timecode: read the page, play the two
seconds that matter. The honest framing is *coverage*, not hours saved — the same
management time that reviews eight calls per person per month reaches forty. **5× coverage,
roughly the same hours.** Or hold coverage flat and take the hours back instead. Present it
as a model the reader can run on their own numbers, not as a case study.

**Who it is built for:** sales teams, customer support, collections and recovery, contact
centres. Pick the framings that fit your layout; do not invent a fifth.

## What you must not put on this page

- **No invented customers.** No testimonials, no logo wall, no named companies, no
  "trusted by 500 teams", no star ratings, no headshots.
- **No invented numbers.** No "40% more revenue", no percentages that are not in the facts
  above. The 5× is a stated model on stated assumptions and must be shown as such.
- **No pricing tiers** — there are none to publish. Use a single "see it read your own
  calls" call to action.
- **Roadmap must be labelled.** Transcript search, ask-your-calls, a shared taxonomy
  library, and custom extraction fields are **in development or planned**. Include them only
  in a clearly marked section, in future tense. Never in the hero, never in a feature grid
  alongside shipping features.
- **No fake certification badges** (SOC 2, ISO, HIPAA, GDPR seals). Describe the actual
  controls above instead.
- **No sample call presented as a customer's data.** If you show an example call — and you
  should — label it as an illustration of the output.

## Page structure

Roughly this argument, in this order. Section count and naming are yours.

1. **Hero.** The tension, stated flatly: every call is recorded, almost none are read. Then
   the promise: Call Lens reads all of them and tells you which ten need you today.
2. **What comes back from one call.** The single most important section on the page. Show a
   real-shaped output for one illustrative three-minute call — timecoded findings, the
   outcome, the sentiment, a couple of the measures, one coaching moment with its "try
   instead" line. The reader should understand the product from this block alone.
3. **Why the numbers are trustworthy.** Computed, not inferred. Reproducible. Cited to the
   second. Refused when uncitable.
4. **What it does on every call, automatically.** The inventory, grouped and scannable.
5. **What changes in a manager's week.** Coverage, the coaching feed, follow-ups that stop
   leaking, call admin that disappears into the CRM.
6. **Trust.** Isolation, recordings, retention, erasure.
7. **A first month.** Weeks one, two, three — no new phone system, no retraining.
8. **In development**, labelled.
9. **Close.** One call to action: watch it read a week of your own calls.

## Design direction

Do the planning pass first. Before writing any code, write out a compact token system —
4–6 named colours with hex values, the typefaces for display / body / data roles, the
layout concept, and the one signature element the page will be remembered by. Then check it
against this brief and revise anything that reads like the design you would produce for any
B2B SaaS page.

**The subject's own materials are the design vocabulary.** This product's world is made of
waveforms, a time axis, timecodes, two speakers on two channels, transcript lines, and
citations that point back at a second of audio. That is where the visual identity should
come from — not from generic dashboard chrome, not from an abstract gradient blob.

**The strongest candidate for the signature element is the time axis.** Everything Call Lens
produces is anchored to a second. A page whose spine is a horizontal timeline — findings
hanging off the moments they came from — argues the product's core claim structurally
rather than in a sentence. Take that or beat it, but the signature must encode something
true about the product, not decorate it.

**Typography must carry weight.** You need a genuinely characterful display face and a data
face with tabular figures — timecodes, ratios and durations appear all over this page and
they should look like instrument readings, not body copy. Do not use the same
Inter-plus-a-serif pairing that every AI-designed page ships with.

**Avoid the three defaults.** Do not produce: cream background with high-contrast serif and
terracotta accent; near-black with a single acid-green or vermilion accent; or a broadsheet
layout of hairline rules and zero border radius. If you find yourself heading toward one,
change direction and say what you changed.

**Motion, if any, should serve the timeline.** A playhead moving across a call, findings
revealing at the second they occur, a waveform drawing in — one orchestrated moment beats
scattered scroll effects. Respect `prefers-reduced-motion` fully; the page must be complete
and legible with motion off.

**Take one real risk and justify it.** A well-earned candidate: prove the right-to-left
claim on the page itself rather than asserting it — an Arabic block that genuinely reads
right-to-left while the call's time axis inside it still runs left-to-right. The regional
depth (Egyptian, Saudi and Emirati dialects handled as dialects) is a real differentiator
against generic international tools and deserves more than a bullet.

## Quality floor — not optional, not announced

- Responsive to 360px with no horizontal scroll on the body. Wide blocks scroll inside
  their own container.
- Visible keyboard focus on every interactive element; logical tab order.
- Contrast meets WCAG AA in both themes.
- Light and dark both work. Define the light palette on bare `:root`, redefine only the
  changed tokens under `@media (prefers-color-scheme: dark)`, and give `body` an explicit
  background colour.
- Semantic headings in order, real landmarks, alt text on anything meaningful.
- `prefers-reduced-motion` honoured.
- Any interactive demo degrades to something legible with JavaScript disabled.

## Process

1. Write the token plan and the copy deck for each section. Show me both before building.
2. Build the page from the approved plan, deriving every colour and type decision from it.
3. Critique your own output — screenshot it if you can — and cut one thing before you hand
   it over. Tell me what you cut and why.