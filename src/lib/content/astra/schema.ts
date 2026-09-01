import { Table, type Db } from "@datastax/astra-db-ts";
import type { ProjectRow, ProjectSectionRow } from "../domain";

export const CONTENT_TABLES = {
  projects: "content_projects",
  projectSections: "content_project_sections",
} as const;

export const projectTableDefinition = Table.schema({
  columns: {
    site_key: "text",
    state: "text",
    project_slug: "text",
    sort_order: "int",
    number: "text",
    type: "text",
    title: "text",
    summary: "text",
    evidence: {
      type: "list",
      valueType: "text",
    },
    source_url: "text",
    source_action: "text",
    source_hidden_label: "text",
    accent: "text",
    owner_discipline: "text",
    link_policy: "text",
    seo_title: "text",
    seo_description: "text",
    hero_kicker: "text",
    hero_statement: "text",
    ui_variant: "text",
    artifact_labels: {
      type: "list",
      valueType: "text",
    },
  },
  primaryKey: {
    partitionBy: ["site_key"],
    partitionSort: {
      state: 1,
      project_slug: 1,
    },
  },
});

export const projectSectionTableDefinition = Table.schema({
  columns: {
    site_key: "text",
    project_slug: "text",
    state: "text",
    section_order: "int",
    section_key: "text",
    eyebrow: "text",
    title: "text",
    body: "text",
    items: {
      type: "list",
      valueType: "text",
    },
    layout: "text",
  },
  primaryKey: {
    partitionBy: ["site_key", "project_slug"],
    partitionSort: {
      state: 1,
      section_order: 1,
      section_key: 1,
    },
  },
});

export type ProjectTableRow = ProjectRow;
export type ProjectTablePrimaryKey = Pick<
  ProjectTableRow,
  "site_key" | "state" | "project_slug"
>;
export type ProjectSectionTableRow = ProjectSectionRow;
export type ProjectSectionTablePrimaryKey = Pick<
  ProjectSectionTableRow,
  "site_key" | "project_slug" | "state" | "section_order" | "section_key"
>;

export function getContentTables(db: Db) {
  return {
    projects: db.table<ProjectTableRow, ProjectTablePrimaryKey>(
      CONTENT_TABLES.projects,
    ),
    projectSections: db.table<
      ProjectSectionTableRow,
      ProjectSectionTablePrimaryKey
    >(CONTENT_TABLES.projectSections),
  };
}

export async function ensureContentTables(db: Db): Promise<void> {
  await Promise.all([
    db.createTable(CONTENT_TABLES.projects, {
      definition: projectTableDefinition,
      ifNotExists: true,
    }),
    db.createTable(CONTENT_TABLES.projectSections, {
      definition: projectSectionTableDefinition,
      ifNotExists: true,
    }),
  ]);
}
