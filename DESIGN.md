---
name: The Press Check
description: A proof-desk system where three production layers register into one dependable product.
colors:
  proof-paper: "#f4f1e8"
  proof-paper-bright: "#fffdf7"
  registration-ink: "#111"
  annotation-ink: "#4e4d49"
  hairline-rule: "rgba(17,17,17,.28)"
  process-cyan: "#00a6d6"
  process-cyan-ink: "#003d4e"
  process-magenta: "#e83e8c"
  process-magenta-ink: "#4c0827"
  process-yellow: "#f2cd00"
  process-yellow-ink: "#332b00"
  focus-green: "#087e49"
typography:
  display:
    fontFamily: "Oswald, sans-serif"
    fontSize: "clamp(58px, 5.3vw, 78px)"
    fontWeight: 600
    lineHeight: 0.94
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Oswald, sans-serif"
    fontSize: "clamp(44px, 5vw, 72px)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Oswald, sans-serif"
    fontSize: "clamp(34px, 3.5vw, 52px)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "normal"
  body:
    fontFamily: "Public Sans, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  proof-label:
    fontFamily: "Public Sans, sans-serif"
    fontSize: "10px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.06em"
rounded:
  square: "0"
  registration: "50%"
spacing:
  page-gutter: "clamp(24px, 4vw, 72px)"
  page-gutter-mobile: "20px"
  section-block: "clamp(90px, 10vw, 150px)"
components:
  press-control:
    backgroundColor: "transparent"
    textColor: "{colors.registration-ink}"
    typography: "{typography.proof-label}"
    rounded: "{rounded.square}"
    padding: "12px 16px"
  press-control-active:
    backgroundColor: "{colors.registration-ink}"
    textColor: "{colors.proof-paper-bright}"
    typography: "{typography.proof-label}"
    rounded: "{rounded.square}"
    padding: "12px 16px"
  proof-seal-action:
    backgroundColor: "{colors.process-magenta}"
    textColor: "{colors.proof-paper-bright}"
    typography: "{typography.title}"
    rounded: "{rounded.registration}"
    padding: "24px"
    size: "clamp(156px, 14vw, 210px)"
  upwork-action:
    backgroundColor: "{colors.proof-paper-bright}"
    textColor: "{colors.registration-ink}"
    typography: "{typography.title}"
    rounded: "{rounded.square}"
    padding: "18px 26px"
    height: "92px"
  proof-sheet:
    backgroundColor: "{colors.proof-paper-bright}"
    textColor: "{colors.registration-ink}"
    rounded: "{rounded.square}"
    padding: "26px"
  proof-index-cell:
    backgroundColor: "{colors.proof-paper}"
    textColor: "{colors.registration-ink}"
    typography: "{typography.proof-label}"
    rounded: "{rounded.square}"
    padding: "12px 9px"
    height: "70px"
  proof-index-cell-current:
    backgroundColor: "{colors.registration-ink}"
    textColor: "{colors.proof-paper-bright}"
    typography: "{typography.proof-label}"
    rounded: "{rounded.square}"
    padding: "12px 9px"
    height: "70px"
  role-band-product:
    backgroundColor: "{colors.process-magenta}"
    textColor: "{colors.process-magenta-ink}"
    typography: "{typography.title}"
    rounded: "{rounded.square}"
    padding: "14px 18px"
    height: "92px"
  offer-ticket-product:
    backgroundColor: "{colors.process-magenta}"
    textColor: "{colors.process-magenta-ink}"
    rounded: "{rounded.square}"
    padding: "26px"
  faq-disclosure:
    backgroundColor: "transparent"
    textColor: "{colors.registration-ink}"
    typography: "{typography.title}"
    rounded: "{rounded.square}"
    padding: "28px 64px 28px 0"
---

# Design System: The Press Check

## Overview

**Creative North Star: "The Press Check"**

This world behaves like a daylight press proof spread across a working desk: matte paper, dense registration ink, exposed process colors, crop marks, numbered annotations, and artifacts that invite inspection. It makes production readiness visible as a sequence of decisions and checks rather than decorating a generic SaaS pitch.

Three transparent production layers—Product / UX, Frontend, and Backend—are the recurring metaphor. Each has its own process color, but the system becomes complete only when the layers register into one proof. The tone is exacting and candid: evidence is labelled, owners are named, and unresolved facts remain visibly unresolved.

**Key Characteristics:**

- Proof-paper grounds with dense black structure and process cyan, magenta, and yellow used as owned fields.
- Compressed uppercase display type paired with plain, highly legible operational copy.
- Square proof sheets, ticket columns, ledgers, crop marks, calibration bars, and registration targets.
- One exceptional circular seal action; every other control and container remains rectilinear.
- Visible evidence states and accountable ownership instead of ornamental cards or unsupported claims.

**The Registration Rule.** Color layers may separate for inspection, but the resolved state must read as one dependable product rather than three disconnected services.

## Colors

The palette borrows the literal logic of print production: warm paper and black ink carry the information while process colors identify ownership and make large structural fields memorable.

### Primary

- **Registration Ink:** The default text, rule, navigation, and dark-section color; it creates the dense technical frame.
- **Proof Paper:** The warm matte page ground; use Bright Proof Paper for sheets, inset application canvases, and high-contrast actions.
- **Process Magenta:** Product / UX ownership and the primary conversion seal.

### Secondary

- **Process Cyan:** Frontend ownership, active interface marks, and the second production layer.

### Tertiary

- **Process Yellow:** Backend ownership and the third production layer.
- **Focus Green:** Reserved for visible keyboard focus and positive fit markers. It is a utility signal, not a fourth discipline color.

### Neutral

- **Annotation Ink:** Explanatory copy, status text, and secondary proof notes.
- **Hairline Rule:** Internal dividers and quiet table structure where full Registration Ink would be too heavy.
- **Discipline Inks:** The dark magenta, cyan, and yellow inks provide readable text on their matching process fields.

**The Process Ownership Rule.** Magenta means Product / UX, cyan means Frontend, and yellow means Backend. Keep the number or role label with the color so ownership never depends on hue alone.

**The Ink Hierarchy Rule.** Use solid Registration Ink for boundaries and commitments, Hairline Rule for internal subdivisions, and Annotation Ink for context. Do not blur those levels into a gray-on-gray interface.

## Typography

**Display Font:** Oswald (with sans-serif fallback)  
**Body Font:** Public Sans (with sans-serif fallback)  
**Label Font:** Public Sans (with sans-serif fallback)

**Character:** Oswald supplies the compressed, industrial voice of proof headlines, ticket titles, and registration numbers. Public Sans makes the surrounding evidence readable and neutral, so the page feels like a working production document rather than a poster.

### Hierarchy

- **Display:** Condensed, uppercase, tightly tracked, and nearly solid-set; reserve it for the primary claim and major conversion statement. On narrow screens it scales to a taller, narrower block rather than collapsing into ordinary display type.
- **Headline:** Uppercase section propositions with balanced wrapping and a deliberately short measure, generally no more than 18 characters wide by CSS measure.
- **Title:** Uppercase artifact and engagement names inside proof sheets and tickets.
- **Body:** Public Sans at a compact editorial size, with generous line height. Explanatory copy generally stays within 34–56 characters of measure; FAQ responses may extend to 72 characters.
- **Proof Label:** Bold uppercase metadata with restrained tracking. Use it for ticket numbers, artifact state, ownership, and source notes—not for paragraphs.

**The Two-Voice Rule.** Oswald makes the assertion; Public Sans supplies the evidence. Do not add a decorative third family or set long explanatory copy in the condensed face.

## Layout

Desktop pages use a fixed 86px proof index inset 10px from the viewport, while the main canvas begins after that rail. Content uses a fluid page gutter and large vertical section rhythm. The hero deliberately layers a narrow claim block with a large center-right product proof; at wide sizes the proof overlaps the hero field, and the magenta seal overlaps its lower edge.

Proof artifacts use explicit grids rather than free-floating cards: three-column ownership bands, ticket columns, decision ledgers, and table-like readiness rows. A 1px rule usually defines the grid. Large color bands may run full width; neutral sections remain on proof paper with generous unboxed breathing room.

At 1360px and below, the hero proof leaves its absolute overlap and flows beneath the claim. At 1120px and below, offer tickets and team plates become single-column runs. At 760px and below, the fixed rail becomes a 58px sticky top bar, the main gutter becomes 20px, and multi-column ledgers stack. The three vertical proof films become three horizontal, stacked registration rows. The circular seal becomes a full-width rectangular action, preserving its priority without forcing desktop geometry onto a small screen.

**The Artifact Transformation Rule.** Responsive design changes the proof artifact's orientation and structure; it does not merely shrink the desktop composition.

## Elevation & Depth

The system is flat by default. Paper color, overlap, transparency, and ink rules create depth. Only the hero product proof and the primary seal lift from the desk: the proof uses a restrained neutral paper shadow, while the seal uses a compact magenta-tinted offset shadow that grows slightly on hover. Everything else—tickets, team plates, ledger rows, disclosures, and navigation—stays rule-bound and shadowless.

### Shadow Vocabulary

- **Proof Lift:** `0 18px 32px rgba(17,17,17,.12)` gives the annotated product proof a quiet paper separation.
- **Seal Lift:** `0 16px 28px rgba(76,8,39,.24)` identifies the exceptional circular action; hover deepens it to `0 20px 38px rgba(76,8,39,.3)`.

**The Flat Desk Rule.** A shadow means an object is physically lifted or actionable. Never cast ambient shadows on every container.

## Shapes

The default corner is square. Proof sheets, tickets, buttons, ledgers, navigation cells, disclosure rows, and application panels use hard rectilinear edges. Lines remain purposeful: 1px ink rules establish sheets and rows, 2–3px lines emphasize actions or ownership, 5px top bars claim a discipline, and the hero seal alone uses an 8px double border.

Circles are semantic marks, not a general softness layer. They are limited to registration targets, ownership dots, graph points, queue indicators, and the large desktop seal. Crop marks and square-ended SVG strokes keep the drafting language consistent.

**The One Seal Rule.** One oversized circular action may break the square system on desktop. Do not turn tags, controls, tickets, or navigation into pills.

## Components

### Proof Index Navigation

The desktop index is a narrow, fixed table of contents with numbered cells, current-section inversion, discipline markers, and a registration target. Hover and `aria-current` both invert the active cell to Registration Ink on Bright Proof Paper. On mobile it becomes the sticky top bar with a 44px minimum mark and action target.

### Press Check Control

- **Shape:** Square, transparent control with a 1px Registration Ink border.
- **Default:** Bold uppercase proof label plus a registration icon.
- **Hover / Active:** Inverts to Registration Ink with Bright Proof Paper text. The pressed state is exposed through `aria-pressed`, and the adjacent live status describes whether layers are separated or registered.
- **Focus:** Uses the shared 3px Focus Green outline with a 4px offset.

### Registration Proof

The signature proof contains three translucent, multiply blended ownership films over a neutral application frame. On desktop the films are vertical and begin visibly misregistered; activating the press check aligns them over 850ms. On mobile they become horizontal stacked bands and register vertically. After 750ms the proof resolves automatically for motion-capable visitors, but the control always lets the visitor separate and recombine it.

For `prefers-reduced-motion: reduce`, smooth scrolling is disabled, transitions collapse to 0.01ms, and the proof renders immediately in its registered state. Meaning and controls remain available without animation.

### Proof Sheets, Ledgers, and Tickets

Proof sheets are Bright Proof Paper with 1px Registration Ink boundaries and flat internal divisions. Ledgers align item, inspection detail, and owner into explicit columns; mobile rows stack the same fields without losing their labels. Offer tickets are three contiguous process-color columns with ruled inventories and strong bottom actions, not detached cards. Team plates reuse the same three-column ownership grammar and keep replacement notes visible until factual identity data exists.

### Role Bands

Each discipline owns a full-width process field with a large sequence number, role name, scope summary, and directional arrow. Hover motion is limited to a 5px arrow translation over 220ms; the field itself does not float or round.

### Upwork Actions

The desktop hero action is the sole circular proof seal: magenta, double-ringed, rotated, and lifted. At mobile size it becomes square and full width. The final Upwork action is always a large rectangular Bright Proof Paper panel with a 3px discipline-ink border and an arrow; its visible note must identify a temporary destination until the real team or agency URL is installed.

### FAQ Disclosures

Questions are large Oswald rows separated by 1px rules. The native `details` element owns state; the plus mark rotates into a minus over 180ms. Answers stay in Public Sans with a readable 72-character maximum measure.

**The Proof Before Claim Rule.** Demonstration UI, metrics, client identity, and ownership status must be visibly labelled where they appear. A polished container must never make provisional evidence look verified.

## Do's and Don'ts

### Do:

- **Do** preserve the paper, ink, and process-color hierarchy; pair every discipline color with its number or role label.
- **Do** build new content as proof artifacts: sheets, tickets, ledgers, bands, calibration marks, or clearly annotated interface evidence.
- **Do** keep component boundaries square and use 1px rules as the default structure; reserve heavier lines for actions and ownership.
- **Do** preserve semantic headings, the skip link, visible keyboard focus, 44px mobile targets, `aria-current`, `aria-pressed`, live status, and reduced-motion behavior.
- **Do** label synthetic or team-built work explicitly and keep missing names, profiles, screenshots, and URLs as visible replacement states.
- **Do** keep the public conversion path on Upwork; the external page is a proof layer, while Upwork remains the verification and transaction layer.

### Don't:

- **Don't** drift into a generic SaaS hero, a wall of floating agency cards, glossy gradients, glass panels, or uniformly rounded components.
- **Don't** distribute shadows across tickets, ledgers, navigation, or team plates; only a physically lifted proof or the single seal earns elevation.
- **Don't** invent client names, biographies, portfolio outcomes, testimonials, metrics, badges, guarantees, certifications, prices, or deadlines.
- **Don't** publish with “Add name,” temporary Upwork destinations, or other explicit replacement notes unresolved. These are honest production blockers, not finished claims.
- **Don't** use process color as the only carrier of meaning, and don't repurpose magenta, cyan, or yellow for unrelated states.
- **Don't** add off-platform pre-contract contact details, lead forms, booking tools, or social routes to the Upwork-facing version.
