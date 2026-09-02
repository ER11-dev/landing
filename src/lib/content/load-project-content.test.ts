import { describe, expect, test } from "bun:test";
import {
  assembleLandingProjects,
  assembleProjectPage,
  ContentValidationError,
} from "./domain";
import { loadLandingProjects } from "./load-landing-projects";
import { loadProjectPage } from "./load-project-page";
import { createSeedRows } from "./seed-data";

describe("project content", () => {
  test("returns landing projects in display order", () => {
    const rows = createSeedRows({ siteKey: "er11", state: "published" });
    const projects = assembleLandingProjects({
      channel: "direct",
      projectRows: [...rows.projects].reverse(),
    });

    expect(projects.map((project) => project.slug)).toEqual([
      "lead-operations-desk",
      "repay",
      "agc-burya",
    ]);
    expect(projects.map((project) => project.detailPath)).toEqual([
      "/projects/lead-operations-desk",
      "/projects/repay",
      "/projects/agc-burya",
    ]);
  });

  test("returns null for an unknown or invalid slug", () => {
    expect(
      loadProjectPage({
        slug: "unknown-project",
        channel: "direct",
      }),
    ).toBeNull();

    expect(
      loadProjectPage({
        slug: "../private",
        channel: "direct",
      }),
    ).toBeNull();
  });

  test("validates project sections with table-specific diagnostics", () => {
    const rows = createSeedRows({ siteKey: "er11", state: "published" });
    const invalidSection = {
      ...rows.projectSections[0],
      body: "",
    };

    expect(() =>
      assembleProjectPage({
        channel: "direct",
        projectRows: rows.projects,
        sectionRows: [invalidSection],
        slug: "lead-operations-desk",
      }),
    ).toThrow(ContentValidationError);

    expect(() =>
      assembleProjectPage({
        channel: "direct",
        projectRows: rows.projects,
        sectionRows: [invalidSection],
        slug: "lead-operations-desk",
      }),
    ).toThrow("content_project_sections row 1 is invalid: body");
  });

  test("strips source URLs and keeps internal paths inside Upwork", () => {
    const direct = loadLandingProjects({ channel: "direct" });
    const upwork = loadLandingProjects({ channel: "upwork" });
    const upworkPage = loadProjectPage({
      slug: "agc-burya",
      channel: "upwork",
    });

    expect(direct.every((project) => project.sourceUrl)).toBe(true);
    expect(upwork.every((project) => !("sourceUrl" in project))).toBe(true);
    expect(
      upwork.every((project) =>
        project.detailPath.startsWith("/upwork/projects/"),
      ),
    ).toBe(true);
    expect(upworkPage?.project.sourceUrl).toBeUndefined();
    expect(upworkPage?.nextProject.detailPath).toBe(
      "/upwork/projects/lead-operations-desk",
    );
  });

  test("rejects contact-shaped copy across every Upwork project text field", () => {
    const rows = createSeedRows({ siteKey: "er11", state: "published" });
    const project = rows.projects[0];
    const unsafeText = "Continue at https://outside.example/contact";
    const scalarFields = [
      "number",
      "type",
      "title",
      "summary",
      "source_action",
      "source_hidden_label",
      "owner_discipline",
      "seo_title",
      "seo_description",
      "hero_kicker",
      "hero_statement",
    ] as const;

    scalarFields.forEach((field) => {
      expect(() =>
        assembleLandingProjects({
          channel: "upwork",
          projectRows: [{ ...project, [field]: unsafeText }],
        }),
      ).toThrow(`content_projects.${field}`);
    });

    expect(() =>
      assembleLandingProjects({
        channel: "upwork",
        projectRows: [{ ...project, evidence: [unsafeText] }],
      }),
    ).toThrow("content_projects.evidence");

    expect(() =>
      assembleLandingProjects({
        channel: "upwork",
        projectRows: [
          {
            ...project,
            artifact_labels: [unsafeText, ...project.artifact_labels.slice(1)],
          },
        ],
      }),
    ).toThrow("content_projects.artifact_labels[0]");
  });

  test("rejects URLs, email addresses, phone numbers, and handles on Upwork", () => {
    const rows = createSeedRows({ siteKey: "er11", state: "published" });
    const project = rows.projects[0];
    const cases = [
      ["Review outside.example/contact", "URL or contact scheme"],
      ["Email hello@outside.example", "email address"],
      ["Call +1 (212) 555-0123", "phone number"],
      ["Message @outside_team", "social handle"],
      ["Review h\u200bttps://outside.example", "URL or contact scheme"],
      ["Email hello\uFF20outside\uFF0Eexample", "email address"],
    ] as const;

    cases.forEach(([summary, expectedKind]) => {
      expect(() =>
        assembleLandingProjects({
          channel: "upwork",
          projectRows: [{ ...project, summary }],
        }),
      ).toThrow(expectedKind);
    });

    expect(() =>
      assembleLandingProjects({
        channel: "direct",
        projectRows: [
          { ...project, summary: "Direct proof at outside.example/contact" },
        ],
      }),
    ).not.toThrow();

    const privateContact = "https://private.example/contact";
    try {
      assembleLandingProjects({
        channel: "upwork",
        projectRows: [{ ...project, summary: privateContact }],
      });
      throw new Error("Expected unsafe Upwork copy to be rejected");
    } catch (error) {
      expect(error).toBeInstanceOf(ContentValidationError);
      if (!(error instanceof ContentValidationError)) throw error;
      expect(error.message).not.toContain(privateContact);
    }
  });

  test("rejects contact-shaped copy across every Upwork section text field", () => {
    const rows = createSeedRows({ siteKey: "er11", state: "published" });
    const slug = "lead-operations-desk";
    const sections = rows.projectSections.filter(
      (section) => section.project_slug === slug,
    );
    const [firstSection, ...remainingSections] = sections;
    const unsafeText = "Continue at https://outside.example/contact";
    const scalarFields = ["eyebrow", "title", "body"] as const;

    scalarFields.forEach((field) => {
      expect(() =>
        assembleProjectPage({
          channel: "upwork",
          projectRows: rows.projects,
          sectionRows: [
            { ...firstSection, [field]: unsafeText },
            ...remainingSections,
          ],
          slug,
        }),
      ).toThrow(`content_project_sections.${field}`);
    });

    expect(() =>
      assembleProjectPage({
        channel: "upwork",
        projectRows: rows.projects,
        sectionRows: [
          { ...firstSection, items: [unsafeText] },
          ...remainingSections,
        ],
        slug,
      }),
    ).toThrow("content_project_sections.items");
  });
});
