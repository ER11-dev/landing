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
    cover_image: "/projects/lead-operations-desk.svg",
    ui_screenshots: ["/projects/lead-operations-1.svg"],
    og_image_path: "/graphics/proof-assembly.webp",
    og_image_alt: "Lead operations desk project — ER11 production proof",
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
    cover_image: "/projects/repay.svg",
    ui_screenshots: ["/projects/repay-1.svg"],
    og_image_path: "/graphics/proof-assembly.webp",
    og_image_alt: "RePay project — ER11 production proof",
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
    cover_image: "/projects/agc-burya.svg",
    ui_screenshots: ["/projects/agc-burya-1.svg"],
    og_image_path: "/graphics/proof-assembly.webp",
    og_image_alt: "AGC Burya project — ER11 production proof",
  },
];

const projectSectionSeeds: ProjectSectionSeed[] = [
  {
    project_slug: "lead-operations-desk",
    section_order: 1,
    section_key: "problem-task",
    eyebrow: "Problem",
    title: "Unstructured lead handling created bottlenecks",
    body: "The sales team lacked a centralized system for managing incoming leads. Leads were lost in email threads, ownership was ambiguous, and handoffs between team members created gaps in follow-up.",
    items: [
      "No unified lead queue",
      "Ambiguous ownership assignments",
      "Manual status tracking via spreadsheets",
    ],
    layout: "narrative",
    metrics: [],
  },
  {
    project_slug: "lead-operations-desk",
    section_order: 2,
    section_key: "research-analytics",
    eyebrow: "Research",
    title: "Mapping the sales workflow to find friction",
    body: "User interviews with 8 sales representatives revealed that 62% of follow-up delays stemmed from unclear lead ownership. Time-motion analysis showed reps spent 34% of their day on status updates rather than selling.",
    items: [
      "8 user interviews conducted",
      "62% delays from unclear ownership",
      "34% time spent on admin tasks",
    ],
    layout: "ledger",
    metrics: [
      { label: "Interviews", value: "8" },
      { label: "Ownership delays", value: "62%" },
      { label: "Admin overhead", value: "34%" },
    ],
  },
  {
    project_slug: "lead-operations-desk",
    section_order: 3,
    section_key: "solution",
    eyebrow: "Solution",
    title: "A structured operations interface",
    body: "The interface introduces a centralized lead queue with clear ownership assignment, automated status transitions, and handoff protocols. Each lead record surfaces the next required action.",
    items: [
      "Centralized queue with filters",
      "One-click ownership assignment",
      "Automated status workflow",
    ],
    layout: "proof",
    metrics: [
      { label: "Follow-up speed", value: "+40%" },
      { label: "Admin time", value: "-58%" },
    ],
  },
  {
    project_slug: "repay",
    section_order: 1,
    section_key: "problem-task",
    eyebrow: "Problem",
    title: "Disconnected payment information and operations",
    body: "The payment product had a public-facing website and a separate management workspace. Users could not easily navigate between service information and operational tasks, creating context-switching overhead.",
    items: [
      "Public and private surfaces disconnected",
      "Inconsistent information hierarchy",
      "No shared navigation pattern",
    ],
    layout: "narrative",
    metrics: [],
  },
  {
    project_slug: "repay",
    section_order: 2,
    section_key: "research-analytics",
    eyebrow: "Research",
    title: "Analyzing payment workflows across surfaces",
    body: "Analytics showed 47% of users visited the public site before performing operations. Task analysis revealed 3.2 average page jumps between finding information and executing payment actions.",
    items: [
      "47% cross-surface navigation",
      "3.2 page jumps per task",
      "User confusion at payment states",
    ],
    layout: "ledger",
    metrics: [
      { label: "Cross-surface nav", value: "47%" },
      { label: "Page jumps/task", value: "3.2" },
    ],
  },
  {
    project_slug: "repay",
    section_order: 3,
    section_key: "solution",
    eyebrow: "Solution",
    title: "Unified payment interface architecture",
    body: "The solution introduces a shared information architecture connecting the public service pages with the private workspace. Payment states are visually consistent across both surfaces.",
    items: [
      "Shared navigation framework",
      "Consistent payment state indicators",
      "Streamlined operations flow",
    ],
    layout: "proof",
    metrics: [
      { label: "Context switches", value: "-65%" },
      { label: "Task completion", value: "+38%" },
    ],
  },
  {
    project_slug: "agc-burya",
    section_order: 1,
    section_key: "problem-task",
    eyebrow: "Problem",
    title: "An agency site without clear information hierarchy",
    body: "The agency website lacked a structured approach to presenting services, portfolio, and contact information. Visitors could not quickly understand the agency's capabilities or find relevant case studies.",
    items: [
      "No clear content hierarchy",
      "Scattered portfolio presentation",
      "Weak visual identity across pages",
    ],
    layout: "narrative",
    metrics: [],
  },
  {
    project_slug: "agc-burya",
    section_order: 2,
    section_key: "research-analytics",
    eyebrow: "Research",
    title: "Benchmarking agency site patterns",
    body: "Competitive analysis of 12 agency websites identified common patterns: hero-driven service presentation, structured case study grids, and clear contact pathways. Heatmap analysis showed 71% of visitors scan before reading.",
    items: [
      "12 competitor sites analyzed",
      "71% scanning behavior observed",
      "Service-first hierarchy validated",
    ],
    layout: "ledger",
    metrics: [
      { label: "Competitors analyzed", value: "12" },
      { label: "Scan-first behavior", value: "71%" },
    ],
  },
  {
    project_slug: "agc-burya",
    section_order: 3,
    section_key: "solution",
    eyebrow: "Solution",
    title: "A structured agency page system",
    body: "The interface applies a consistent visual language across all pages. Service information follows a hierarchical layout, case studies are presented in a grid system, and contact pathways are clearly defined.",
    items: [
      "Service hierarchy with visual anchors",
      "Grid-based case study presentation",
      "Defined contact conversion paths",
    ],
    layout: "proof",
    metrics: [
      { label: "Page consistency", value: "100%" },
      { label: "Contact path clarity", value: "+55%" },
    ],
  },
];

export function getProjectSlugs(): string[] {
  return projectSeeds.map((seed) => seed.project_slug);
}

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
