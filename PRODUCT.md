# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

The primary users are prospective clients evaluating whether to hire the team through Upwork. Their exact industries, company stages, budgets, and buyer roles are still undecided.

The delivery team consists of:

- a frontend engineer;
- a UX/UI designer who also works as product manager;
- a senior Go backend engineer.

## Product Purpose

The landing page helps prospective Upwork clients understand the team, trust its ability to deliver, and take the next step toward a paid engagement. Success means generating qualified Upwork inquiries and orders without overstating the team's experience or results.

## Positioning

The team presents itself as a compact, senior product squad rather than three disconnected freelancers: product direction and UX, frontend implementation, and Go backend engineering can be handled together.

The initial niche is working B2B prototypes that perform in a demo but need product decisions, UX, frontend engineering, and production backend work before real users can rely on them. AI-assisted delivery may be part of a client's workflow, but it is not the main positioning claim.

## Operating Context

Prospective clients are expected to evaluate the team alongside other Upwork freelancers or agencies. The landing page supports that evaluation and should lead clients toward a hiring conversation on the team's single Upwork account.

The engagement model, project size, and delivery process are still undecided. For Upwork-originated prospects, the team uses one Upwork account and keeps that route free of separate member contact paths. The main public route may also support direct enquiries.

The external landing page is a proof layer. The single Upwork account remains the canonical conversation, verification, and transaction layer for Upwork prospects.

## Capabilities and Constraints

Confirmed capabilities are UX/UI design, product management, frontend engineering, and senior Go backend engineering.

The landing page must build trust and help win qualified work. Exact preferred frontend stack for client projects, supported backend scope, industries, availability, pricing, and guarantees remain undecided.

The landing implementation is intentionally dependency-light: Astro renders semantic HTML into a static production build, authored CSS/SVG geometry owns the visual system, and a small progressive-enhancement module handles interactions. This keeps the page fast, portable, and easy to host while the team validates the offer.

A version shared with Upwork prospects must not expose an email address, phone number, social handle, external booking tool, lead form, or other off-platform pre-contract contact path. The `/upwork` route follows this rule and returns the visitor to their Upwork messages. The main route provides an email-composer form and published direct contact paths.

## Evidence on Hand

The team composition and roles are confirmed. Research on Upwork mechanics, trust evidence, landing-page structure, and compliance is recorded in `research/upwork-landing-design.md`.

Alexander Tishchenko's public portfolio provides attributable Product / UX client experience, case links, and direct contact details. These may be used only with clear role attribution; they are not evidence for the whole team. No testimonials, Upwork metrics, certifications, quantified outcomes, or engineering client cases have been provided. Future work must not invent them.

## Product Principles

- Present one coordinated product team, not a loose list of skills.
- Reduce hiring risk with specific, verifiable evidence.
- Make the team's ownership boundaries and delivery process easy to understand.
- Optimize for qualified trust and fit rather than broad, unsupported claims.
- Keep the path from evaluation to an Upwork conversation direct.
