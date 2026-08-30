# v0 prompt — three-person Upwork product team landing page

Create a production-quality, responsive landing page for a three-person product team that wins qualified work through Upwork.

## Product truth

The team is:

- one UX/UI designer who also acts as product manager;
- one frontend engineer;
- one senior Go backend engineer.

Position them as one coordinated product-delivery team, not as a generic agency and not as three unrelated freelancers. The external page is a proof layer; Upwork profiles are the verification, communication, and hiring layer. Do not invent client names, logos, testimonials, Upwork badges, ratings, earnings, years of experience, project counts, performance metrics, awards, prices, timelines, or business outcomes.

The page must communicate this within ten seconds:

> One small team from product decisions to production.

Supporting copy:

> Product direction and UX, frontend engineering, and senior Go backend delivery—planned and shipped together by three named specialists.

Primary CTA: **Discuss your project on Upwork**  
Secondary CTA: **See selected work**

Under the primary CTA, add quiet microcopy: “Pre-contract communication and hiring stay on Upwork.” The CTA must use a clearly named `UPWORK_PROFILE_URL` placeholder.

## Visual direction — “Shared Delivery Dossier”

Create a proof-first visual system inspired by a working product delivery room: decision logs, annotated interface frames, ownership lanes, release checklists, and architecture sheets. It must feel precise, human, and quietly confident—not like a consultancy template.

- Use a cool off-white canvas, near-black ink text, muted blue-gray rules, and one decisive cobalt accent. No gradients.
- Use Hanken Grotesk or a similarly clear, characterful grotesk. Use a system monospace only for small artifact labels and metadata.
- Use a disciplined 12-column desktop grid, strong left alignment, generous space, crisp 1px rules, and restrained 4–8px corner radii.
- Prefer full-width compositions, ruled sections, annotated screenshots, and connected layouts over a page made from floating cards.
- Use authentic portrait placeholders labeled with each person’s role. Do not use AI people or stock-office photography.
- Motion should be subtle and functional: line drawing, role-lane highlighting, and gentle project reveals. Respect `prefers-reduced-motion` and never hide important content behind animation.
- The memorable visual device is an interactive ownership map connecting **Product & UX → Frontend + Go backend → Release**. Hovering or focusing a role highlights the decisions and deliverables that person owns. On mobile, it becomes a simple vertical sequence.

## Page structure

### 1. Minimal navigation

Use a text placeholder for the team name, links to Work, Team, Approach, and FAQ, plus the Upwork CTA. Keep it compact and sticky after the hero begins to scroll.

### 2. Hero

Build an asymmetric split layout. On the left: a small label “3 specialists · 1 delivery team,” the headline, supporting copy, primary Upwork CTA, and secondary work link. On the right: the ownership map, showing all three disciplines converging on one release. Let the next case-study artifact peek into the bottom of the first viewport so proof is immediately visible.

Do not use an abstract 3D illustration, orb, browser-window collage, code rain, or generic dashboard.

### 3. Verified proof rail

Create a data-driven `verifiedProof` section that is hidden by default. It may later show real linked Upwork signals such as Job Success Score, jobs, hours, public reviews, or earned badges. Do not render fake zero values or placeholder ratings when the data is absent.

### 4. Selected work — the dominant section

Design two large case-study previews before listing services. Each case study must have fields for:

- client situation or starting problem;
- exact scope owned by this team or an individual member;
- named contributors;
- key product or technical decision;
- shipped artifact;
- measured outcome, only when supplied;
- verification link, only when supplied.

Use obvious bracketed placeholders such as `[Project name]` and `[Add verified outcome]`; never generate plausible-looking fake proof. Give product UI evidence the most visual space. For Go/backend work, use a clear system-flow diagram or operational artifact rather than decorative server imagery.

### 5. One team, three ownership zones

Show the three real people in one connected composition, not three equal pricing-style cards. Use these placeholders:

- `[Name]` — UX/UI Designer & Product Manager
- `[Name]` — Frontend Engineer
- `[Name]` — Senior Go Backend Engineer

For each person, provide editable fields for “Owns,” “Delivers,” and their individual Upwork profile URL. Include a short handoff diagram that shows shared planning and parallel frontend/backend delivery.

### 6. Ways to work together

Present three buying paths based on the client’s situation, not three disciplines:

- **Define** — clarify the product, flows, scope, and delivery plan;
- **Build** — coordinated UX, frontend, and Go backend implementation;
- **Improve** — redesign, modernization, performance, or product rescue.

Treat these as editable engagement models. Do not add prices, guarantees, or durations.

### 7. Delivery approach

Create a concise horizontal sequence on desktop and vertical sequence on mobile:

**Align → Define → Build in visible increments → Verify → Hand off**

Make the artifact produced at each stage visible. Keep the language practical; avoid generic agency process copy.

### 8. FAQ

Include accessible accordion items for:

- Can we hire the full team or one specialist?
- Who communicates with us day to day?
- How do frontend and backend work run together?
- How do you estimate a project?
- Where do pre-contract conversations happen?

Use concise placeholder answers where a real operating decision has not yet been supplied.

### 9. Final conversion section

End with a decisive cobalt field, the line “Bring us the product problem, not a finished specification,” the primary Upwork CTA, and the platform-compliance microcopy. Do not add a contact form, email, phone number, social links, external chat, or booking calendar.

## Content and compliance rules

- Mention Upwork in plain text only; do not use the Upwork logo or imply endorsement.
- Every pre-contract conversion action must return to the supplied Upwork agency or member profile.
- Do not include contact information anywhere, including case-study images or linked-work captions.
- Do not claim work belonged to the whole team if it was completed by only one member; make contributor attribution explicit.
- Avoid empty claims such as “world-class,” “award-winning,” “top,” “best,” “reliable,” or “professional.” Prove capability through work, decisions, ownership, and linked evidence.
- Centralize all editable content in `data/site-content.ts` so names, links, projects, proof, and FAQs can be replaced without editing components.

## Implementation requirements

- Use Next.js App Router, TypeScript, Tailwind CSS, and shadcn/ui where useful, but customize components so the page does not look like stock shadcn.
- Build semantic, accessible HTML with keyboard-visible focus, WCAG AA contrast, descriptive alt text, and a logical heading order.
- Make the page excellent at 1440px, 1024px, 768px, and 390px widths. No horizontal overflow.
- Use `next/image`, responsive image sizes, lazy loading below the fold, and no heavy animation library unless genuinely necessary.
- Add a small development-only content-readiness checklist that reports missing names, Upwork URLs, portraits, case-study artifacts, and proof fields; it must not appear in production.
- Create reusable components for the ownership map, case-study preview, team profile, engagement path, process step, FAQ, and Upwork CTA.
- Deliver a polished `/upwork` landing route plus the content data file. Treat it as a dedicated contact-free version that can safely be linked from proposals and portfolio items. Use placeholders honestly and make the result ready for real evidence to be inserted.

## Explicitly avoid

Generic SaaS gradients, glassmorphism, neon-on-black, excessive pill UI, large rounded card grids, animated marquees, technology-logo clouds, fake terminal windows, fake testimonials, fake metrics, tilted device mockups, stock-office imagery, scroll hijacking, custom cursors, and vague “we build digital experiences” copy.

Prioritize trust, proof, role clarity, and a direct path back to Upwork over visual spectacle.
