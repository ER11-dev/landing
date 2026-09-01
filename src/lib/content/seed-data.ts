import type { ContentState, ProjectRow, ProjectSectionRow } from "./domain";

interface SeedContext {
  siteKey: string;
  state: ContentState;
}

type ProjectSeed = Omit<ProjectRow, "site_key" | "state">;
type ProjectSectionSeed = Omit<ProjectSectionRow, "site_key" | "state">;

const projectSeeds: ProjectSeed[] = [
  {
    project_slug: "lead-operations-desk",
    sort_order: 1,
    number: "01",
    type: "B2B CRM · Product / UX",
    title: "Lead operations desk",
    summary:
      "Interface work for a sales team handling lead queues, assignment, status tracking, and handoffs.",
    evidence: [
      "Workflow architecture",
      "Operational interface layouts",
      "Published case study",
    ],
    source_url: "https://ceofigma.vercel.app/case-siakera.html",
    source_action: "Open case study",
    source_hidden_label: "Source available in Upwork",
    accent: "magenta",
    owner_discipline: "Product / UX",
    link_policy: "public",
    seo_title: "Lead operations desk — ER11 project",
    seo_description:
      "A B2B CRM interface case covering lead queues, ownership, status tracking, and handoffs.",
    hero_kicker: "B2B CRM · Product / UX",
    hero_statement:
      "A sales operations interface organized around lead intake, ownership, and handoffs.",
    ui_variant: "lead-operations",
    artifact_labels: [
      "Siakera UI system",
      "Lead intake",
      "Traffic control",
      "Funnel flow",
      "Payment layer",
      "Dashboard",
      "Component library",
    ],
  },
  {
    project_slug: "repay",
    sort_order: 2,
    number: "02",
    type: "Fintech · Product / UX",
    title: "RePay",
    summary:
      "Interface work for a payment product covering public service information and a private management workspace.",
    evidence: [
      "Product interface design",
      "Payment-related screens",
      "Public website",
    ],
    source_url: "https://repay.ws/",
    source_action: "Open RePay",
    source_hidden_label: "Source available in Upwork",
    accent: "cyan",
    owner_discipline: "Product / UX",
    link_policy: "public",
    seo_title: "RePay — ER11 project",
    seo_description:
      "A fintech interface project spanning public payment information and a private management workspace.",
    hero_kicker: "Fintech · Product / UX",
    hero_statement:
      "A payment product interface connecting public service information with private operations screens.",
    ui_variant: "payment-operations",
    artifact_labels: [
      "RePay interface",
      "Public landing",
      "Private workspace",
      "Payment context",
      "Operations view",
      "Product design",
      "Source on record",
    ],
  },
  {
    project_slug: "agc-burya",
    sort_order: 3,
    number: "03",
    type: "Agency · UI/UX collaboration",
    title: "AGC Burya",
    summary:
      "UI/UX collaboration for an agency website, including information structure, visual direction, and interface layouts.",
    evidence: [
      "Information structure",
      "Visual direction",
      "Published Behance case",
    ],
    source_url:
      "https://www.behance.net/gallery/162252379/AGC-BURYA-UIUX-DESIGN",
    source_action: "Open Behance case",
    source_hidden_label: "Source available in Upwork",
    accent: "yellow",
    owner_discipline: "Product / UX",
    link_policy: "public",
    seo_title: "AGC Burya — ER11 project",
    seo_description:
      "An agency website UI/UX collaboration covering structure, visual direction, and interface layouts.",
    hero_kicker: "Agency · UI/UX collaboration",
    hero_statement:
      "An agency website collaboration shaped through information structure, visual direction, and final interface layouts.",
    ui_variant: "agency-collaboration",
    artifact_labels: [
      "AGC Burya interface",
      "Visual direction",
      "Information structure",
      "Interface layouts",
      "Agency collaboration",
      "Multiple owners",
      "Published case",
    ],
  },
];

const projectSectionSeeds: ProjectSectionSeed[] = [
  {
    project_slug: "lead-operations-desk",
    section_order: 1,
    section_key: "operational-context",
    eyebrow: "Context",
    title: "Lead work as an operating sequence",
    body: "The case documents a B2B sales workspace for reviewing incoming leads, assigning ownership, recording status, and handing work between team members.",
    items: ["Lead intake", "Owner assignment", "Handoff status"],
    layout: "narrative",
  },
  {
    project_slug: "lead-operations-desk",
    section_order: 2,
    section_key: "interface-ledger",
    eyebrow: "Interface",
    title: "Records, states, and follow-up actions",
    body: "The interface groups lead records with the status and follow-up information used during daily sales operations.",
    items: ["Queue views", "Lead records", "Status controls"],
    layout: "ledger",
  },
  {
    project_slug: "lead-operations-desk",
    section_order: 3,
    section_key: "published-artifacts",
    eyebrow: "Artifacts",
    title: "Workflow and interface material",
    body: "The published case study contains workflow structure and interface layouts for the lead operations desk.",
    items: ["Workflow map", "Queue layout", "Record layout"],
    layout: "proof",
  },
  {
    project_slug: "repay",
    section_order: 1,
    section_key: "product-scope",
    eyebrow: "Scope",
    title: "Public information and private operations",
    body: "The project covers a public-facing payment service website and a separate private management interface.",
    items: ["Service information", "Private workspace", "Payment states"],
    layout: "narrative",
  },
  {
    project_slug: "repay",
    section_order: 2,
    section_key: "payment-interface",
    eyebrow: "Interface",
    title: "Payment-related screens and controls",
    body: "The interface material organizes payment information, management actions, and operational states across the product surfaces.",
    items: ["Information hierarchy", "Management actions", "State views"],
    layout: "ledger",
  },
  {
    project_slug: "repay",
    section_order: 3,
    section_key: "public-artifacts",
    eyebrow: "Artifacts",
    title: "A public reference and private screen set",
    body: "The recorded public source covers the service-facing part of the project; private interface work is described without exposing access details.",
    items: ["Public landing", "Operations layouts", "Interface states"],
    layout: "proof",
  },
  {
    project_slug: "agc-burya",
    section_order: 1,
    section_key: "collaboration-scope",
    eyebrow: "Collaboration",
    title: "Structure and visual direction",
    body: "The agency website collaboration covers information structure, visual direction, and the preparation of interface layouts.",
    items: ["Content hierarchy", "Visual references", "Page layouts"],
    layout: "narrative",
  },
  {
    project_slug: "agc-burya",
    section_order: 2,
    section_key: "page-system",
    eyebrow: "System",
    title: "A consistent set of agency pages",
    body: "The interface work applies a shared visual language across the website's page structure and content areas.",
    items: ["Page hierarchy", "Shared interface rules", "Content modules"],
    layout: "ledger",
  },
  {
    project_slug: "agc-burya",
    section_order: 3,
    section_key: "behance-artifacts",
    eyebrow: "Artifacts",
    title: "Published UI/UX case material",
    body: "The Behance case presents the information structure, visual direction, and interface layouts prepared for the agency website.",
    items: ["Structure overview", "Visual direction", "Final layouts"],
    layout: "proof",
  },
];

export function createSeedRows({ siteKey, state }: SeedContext) {
  const common = {
    site_key: siteKey,
    state,
  };

  return {
    projects: projectSeeds.map((row): ProjectRow => ({ ...common, ...row })),
    projectSections: projectSectionSeeds.map((row): ProjectSectionRow => ({
      ...common,
      ...row,
    })),
  };
}
