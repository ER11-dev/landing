import { assembleLandingProjects } from "./domain";
import type { ContentChannel, ProjectSummary } from "./domain";
import { createSeedRows } from "./seed-data";

interface LoadLandingProjectsOptions {
  channel: ContentChannel;
}

export function loadLandingProjects({
  channel,
}: LoadLandingProjectsOptions): ProjectSummary[] {
  const { projects } = createSeedRows({ siteKey: "er11", state: "published" });

  return assembleLandingProjects({ channel, projectRows: projects });
}
