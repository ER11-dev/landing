---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: []
---

# Landing surface brief

- Scope: public desktop-first landing page at `index.html`; mode: Persuade.
- Audience: B2B founder, product lead, or operator with an AI-built prototype that works in a demo but is not ready for real users.
- Job: understand that one senior three-person team can own product decisions, interface quality, frontend delivery, and a production backend without handoffs between separate vendors.
- Primary action: continue the conversation on Upwork. The public Upwork-shared version exposes no email, phone, social link, calendar, or off-platform form.
- Proof: one clearly labelled team-built reference product, an honest production-readiness checklist, named responsibilities, and links/placeholders for real Upwork profiles only. No invented clients, metrics, reviews, badges, or guarantees.
- Direction: “The Press Check.” A proof-desk visual system makes three transparent production layers align into one finished product. Approved comp: `.impeccable/mocks/press-check-b-proof-desk.png` (delegated selection).
- Memorable moment: the hero’s three misregistered layers converge on the finished interface as the visitor explores the proof marks; on reduced motion and mobile, the transformation becomes a clear step sequence.
- Physical scene: a founder reviews a daylight press proof at a shared worktable, so the page is bright, matte, exacting, and visibly annotated rather than dark or glossy.

## Composition and implementation inventory

| Ingredient | Commitment | Medium |
| --- | --- | --- |
| Vertical proof index | 72–88px desktop rail; section numbers, three role markers, crop/registration marks | semantic HTML + CSS |
| Hero headline | five to six compressed lines; roughly 45% of first viewport width; heavier and taller than every other type layer | semantic HTML with local/system condensed fallback |
| Product proof | large interface spanning the center-right; black sidebar, neutral application canvas, three translucent vertical process layers, callout marks | semantic HTML + CSS + authored SVG-like CSS charts |
| Primary action | large circular/elliptical proof-seal action overlapping hero and discipline strips; honest Upwork label, never “approved” or “verified” | semantic anchor + CSS |
| Discipline strips | full-width magenta, cyan, yellow bands with large numbers, role names, scope summaries, and ownership arrow | semantic HTML + CSS |
| Reference product | clearly labelled synthetic/team-built product UI; no client identity; visible decisions and release-readiness evidence | semantic HTML + CSS |
| Offers | three productized engagements presented as numbered proof tickets, not generic cards | semantic HTML + CSS |
| Team | three named-person placeholders with explicit replacement copy and role/accountability; no fabricated bios | semantic HTML + CSS |
| Registration texture | subtle fixed paper grain, registration crosses, calibration bar, crop lines; low-density and non-interactive | CSS + inline SVG/data texture if needed |
| Mobile | rail becomes top proof strip; hero proof becomes stacked steps; CTA becomes rectangular; discipline strips remain full bleed | responsive CSS |

## System extracted from approved comp

- Component grammar: bordered proof sheets, numbered annotations, flat bands, tabular ledgers, one oversized seal action.
- Corner language: predominantly square; only registration circles, status dots, and the main proof seal are round.
- Lines: 1px black rules, 2px annotation leaders, 4–6px section ownership bars.
- Elevation: near-flat; only translucent sheets and the seal may cast a restrained offset paper shadow.
- Type ramp: 12px proof notes, 14–18px UI/labels, 28–42px section titles, clamp(56px, 7vw, 116px) condensed hero.
- Color strategy: Full palette with white/black ground and process magenta, cyan, yellow as large owned fields.
- Motion: one orchestrated registration sequence in the hero; modest strip arrow movement on hover; everything remains visible without animation.

## Unresolved replacements

- Team name and individual names.
- Final Upwork team/agency or profile URLs.
- Real screenshots and factual story for the reference product, if it should replace the labelled team-built demonstration.
