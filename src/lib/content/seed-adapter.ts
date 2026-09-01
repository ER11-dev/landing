import type { ProjectContentAdapter } from "./adapter";
import { createSeedRows } from "./seed-data";

export function createSeedProjectContentAdapter(): ProjectContentAdapter {
  return {
    async findProjects({ siteKey, state }) {
      return createSeedRows({ siteKey, state }).projects;
    },
    async findProjectSections({ siteKey, projectSlug, state }) {
      return createSeedRows({ siteKey, state }).projectSections.filter(
        (section) => section.project_slug === projectSlug,
      );
    },
  };
}
