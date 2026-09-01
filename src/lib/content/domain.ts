import { z } from "zod";

export const ContentStateSchema = z.enum(["draft", "published"]);
export const ContentChannelSchema = z.enum(["direct", "upwork"]);
export const ProjectUiVariantSchema = z.enum([
  "lead-operations",
  "payment-operations",
  "agency-collaboration",
]);
export const ProjectSectionLayoutSchema = z.enum([
  "narrative",
  "ledger",
  "proof",
]);
export const ProjectAccentSchema = z.enum(["magenta", "cyan", "yellow"]);
const HttpsUrlSchema = z
  .url()
  .refine((value) => new URL(value).protocol === "https:", {
    message: "Source URLs must use HTTPS",
  });
export const ProjectSlugSchema = z
  .string()
  .min(1)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

export type ContentState = z.infer<typeof ContentStateSchema>;
export type ContentChannel = z.infer<typeof ContentChannelSchema>;
export type ProjectUiVariant = z.infer<typeof ProjectUiVariantSchema>;
export type ProjectSectionLayout = z.infer<typeof ProjectSectionLayoutSchema>;
export type ProjectAccent = z.infer<typeof ProjectAccentSchema>;

const projectContentRowSchema = z.object({
  site_key: z.string().min(1),
  state: ContentStateSchema,
});

export const ProjectRowSchema = projectContentRowSchema
  .extend({
    project_slug: ProjectSlugSchema,
    sort_order: z.number().int().nonnegative(),
    number: z.string().min(1),
    type: z.string().min(1),
    title: z.string().min(1),
    summary: z.string().min(1),
    evidence: z.array(z.string().min(1)).min(1),
    source_url: HttpsUrlSchema.optional(),
    source_action: z.string().min(1),
    source_hidden_label: z.string().min(1),
    accent: ProjectAccentSchema,
    owner_discipline: z.string().min(1),
    link_policy: z.enum(["public", "private"]),
    seo_title: z.string().min(1),
    seo_description: z.string().min(1),
    hero_kicker: z.string().min(1),
    hero_statement: z.string().min(1),
    ui_variant: ProjectUiVariantSchema,
    artifact_labels: z.array(z.string().min(1)).length(7),
  })
  .superRefine((project, context) => {
    if (project.link_policy === "public" && !project.source_url) {
      context.addIssue({
        code: "custom",
        path: ["source_url"],
        message: "A public project requires a source URL",
      });
    }
  });

export const ProjectSectionRowSchema = projectContentRowSchema.extend({
  project_slug: ProjectSlugSchema,
  section_order: z.number().int().nonnegative(),
  section_key: ProjectSlugSchema,
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  body: z.string().min(1),
  items: z.array(z.string().min(1)),
  layout: ProjectSectionLayoutSchema,
});

export type ProjectRow = z.infer<typeof ProjectRowSchema>;
export type ProjectSectionRow = z.infer<typeof ProjectSectionRowSchema>;

export interface ProjectSummary {
  slug: string;
  number: string;
  type: string;
  title: string;
  summary: string;
  evidence: string[];
  sourceUrl?: string;
  sourceAction: string;
  sourceHiddenLabel: string;
  accent: ProjectAccent;
  ownerDiscipline: string;
  seoTitle: string;
  seoDescription: string;
  heroKicker: string;
  heroStatement: string;
  uiVariant: ProjectUiVariant;
  artifactLabels: string[];
  detailPath: string;
}

export interface ProjectSection {
  key: string;
  order: number;
  eyebrow: string;
  title: string;
  body: string;
  items: string[];
  layout: ProjectSectionLayout;
}

export interface ProjectPage {
  project: ProjectSummary;
  sections: ProjectSection[];
  nextProject: ProjectSummary;
}

export class ContentValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ContentValidationError";
  }
}

interface AssembleLandingProjectsInput {
  channel: ContentChannel;
  projectRows: unknown[];
}

interface AssembleProjectPageInput extends AssembleLandingProjectsInput {
  slug: string;
  sectionRows: unknown[];
}

interface UpworkTextRule {
  kind: string;
  matches: (value: string) => boolean;
}

const UPWORK_TEXT_RULES: UpworkTextRule[] = [
  {
    kind: "email address",
    matches: (value) =>
      /\b[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?(?:\.[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?)+\b/iu.test(
        value,
      ),
  },
  {
    kind: "URL or contact scheme",
    matches: (value) =>
      /\b(?:https?|ftp):\/\/[^\s<]+|\b(?:mailto|tel|sms|facetime):[^\s<]+|\bwww\.[^\s<]+/iu.test(
        value,
      ) ||
      /\b(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}\b(?:[/?#][^\s<]*)?/iu.test(
        value,
      ),
  },
  {
    kind: "social handle",
    matches: (value) =>
      /(?:^|[^\p{L}\p{N}._%+-])@[a-z0-9_][a-z0-9_.-]{1,29}\b/iu.test(value),
  },
  {
    kind: "phone number",
    matches: (value) =>
      /(?<![\p{L}\p{N}])\+?\d(?:[\s().-]*\d){7,14}(?![\p{L}\p{N}])/u.test(
        value,
      ),
  },
];

function assertUpworkSafeValue(field: string, value: unknown): void {
  if (typeof value === "string") {
    const normalizedValue = value.normalize("NFKC").replace(/\p{Cf}/gu, "");
    const violatedRule = UPWORK_TEXT_RULES.find((rule) =>
      rule.matches(normalizedValue),
    );
    if (!violatedRule) return;

    throw new ContentValidationError(
      `${field} contains an off-platform ${violatedRule.kind}`,
    );
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) =>
      assertUpworkSafeValue(`${field}[${index}]`, item),
    );
    return;
  }

  if (value && typeof value === "object") {
    Object.entries(value).forEach(([key, nestedValue]) =>
      assertUpworkSafeValue(`${field}.${key}`, nestedValue),
    );
  }
}

function assertUpworkSafeProject(project: ProjectRow): void {
  const projectCopy = Object.fromEntries(
    Object.entries(project).filter(([key]) => key !== "source_url"),
  );

  assertUpworkSafeValue("content_projects", projectCopy);
}

function assertUpworkSafeSection(section: ProjectSectionRow): void {
  assertUpworkSafeValue("content_project_sections", section);
}

function parseRows<T>(
  schema: z.ZodType<T>,
  tableName: string,
  rows: unknown[],
): T[] {
  return rows.map((row, index) => {
    const result = schema.safeParse(row);

    if (!result.success) {
      const issues = result.error.issues
        .map((issue) => `${issue.path.join(".") || "row"}: ${issue.message}`)
        .join("; ");

      throw new ContentValidationError(
        `${tableName} row ${index + 1} is invalid: ${issues}`,
      );
    }

    return result.data;
  });
}

function projectDetailPath(channel: ContentChannel, slug: string): string {
  const prefix = channel === "upwork" ? "/upwork" : "";
  return `${prefix}/projects/${encodeURIComponent(slug)}`;
}

function toProjectSummary(
  project: ProjectRow,
  channel: ContentChannel,
): ProjectSummary {
  if (channel === "upwork") assertUpworkSafeProject(project);

  const sourceUrl =
    channel === "direct" && project.link_policy === "public"
      ? project.source_url
      : undefined;

  return {
    slug: project.project_slug,
    number: project.number,
    type: project.type,
    title: project.title,
    summary: project.summary,
    evidence: [...project.evidence],
    ...(sourceUrl ? { sourceUrl } : {}),
    sourceAction: project.source_action,
    sourceHiddenLabel: project.source_hidden_label,
    accent: project.accent,
    ownerDiscipline: project.owner_discipline,
    seoTitle: project.seo_title,
    seoDescription: project.seo_description,
    heroKicker: project.hero_kicker,
    heroStatement: project.hero_statement,
    uiVariant: project.ui_variant,
    artifactLabels: [...project.artifact_labels],
    detailPath: projectDetailPath(channel, project.project_slug),
  };
}

export function assembleLandingProjects({
  channel,
  projectRows,
}: AssembleLandingProjectsInput): ProjectSummary[] {
  const parsedProjects = parseRows(
    ProjectRowSchema,
    "content_projects",
    projectRows,
  ).sort(
    (left, right) =>
      left.sort_order - right.sort_order ||
      left.project_slug.localeCompare(right.project_slug),
  );

  if (parsedProjects.length === 0) {
    throw new ContentValidationError(
      "content_projects contains no published projects",
    );
  }

  const projectSlugs = new Set<string>();

  return parsedProjects.map((project) => {
    if (projectSlugs.has(project.project_slug)) {
      throw new ContentValidationError(
        `content_projects contains duplicate project ${project.project_slug}`,
      );
    }

    projectSlugs.add(project.project_slug);
    return toProjectSummary(project, channel);
  });
}

export function assembleProjectPage({
  channel,
  projectRows,
  sectionRows,
  slug,
}: AssembleProjectPageInput): ProjectPage | null {
  const slugResult = ProjectSlugSchema.safeParse(slug);
  if (!slugResult.success) {
    return null;
  }

  const projects = assembleLandingProjects({ channel, projectRows });
  const projectIndex = projects.findIndex(
    (project) => project.slug === slugResult.data,
  );

  if (projectIndex === -1) {
    return null;
  }

  const parsedSections = parseRows(
    ProjectSectionRowSchema,
    "content_project_sections",
    sectionRows,
  ).sort(
    (left, right) =>
      left.section_order - right.section_order ||
      left.section_key.localeCompare(right.section_key),
  );

  if (parsedSections.length === 0) {
    throw new ContentValidationError(
      `content_project_sections contains no published sections for ${slugResult.data}`,
    );
  }

  const sectionKeys = new Set<string>();
  const sections = parsedSections.map((section): ProjectSection => {
    if (section.project_slug !== slugResult.data) {
      throw new ContentValidationError(
        `content_project_sections contains section ${section.section_key} for unexpected project ${section.project_slug}`,
      );
    }

    if (sectionKeys.has(section.section_key)) {
      throw new ContentValidationError(
        `content_project_sections contains duplicate section ${section.section_key}`,
      );
    }

    sectionKeys.add(section.section_key);

    if (channel === "upwork") assertUpworkSafeSection(section);

    return {
      key: section.section_key,
      order: section.section_order,
      eyebrow: section.eyebrow,
      title: section.title,
      body: section.body,
      items: [...section.items],
      layout: section.layout,
    };
  });

  return {
    project: projects[projectIndex],
    sections,
    nextProject: projects[(projectIndex + 1) % projects.length],
  };
}
