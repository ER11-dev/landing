import type { ProjectContentAdapter } from "../adapter";
import { createAstraDb } from "./config";
import { getContentTables } from "./schema";

let runtimeAdapter: ProjectContentAdapter | undefined;

export function getAstraProjectContentAdapter(): ProjectContentAdapter {
  runtimeAdapter ??= createAstraProjectContentAdapter();
  return runtimeAdapter;
}

export function createAstraProjectContentAdapter(): ProjectContentAdapter {
  const tables = getContentTables(createAstraDb("runtime"));

  return {
    async findProjects({ siteKey, state }) {
      return tables.projects
        .find({
          site_key: siteKey,
          state,
        })
        .toArray();
    },
    async findProjectSections({ siteKey, projectSlug, state }) {
      return tables.projectSections
        .find({
          site_key: siteKey,
          project_slug: projectSlug,
          state,
        })
        .toArray();
    },
  };
}
