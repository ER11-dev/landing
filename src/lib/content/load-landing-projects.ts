import { assembleLandingProjects } from "./domain";
import type { ContentChannel, ProjectSummary } from "./domain";
import { getProjectContentAdapter } from "./runtime-adapter";

interface LoadLandingProjectsOptions {
  siteKey: string;
  channel: ContentChannel;
}

export async function loadLandingProjects({
  siteKey,
  channel,
}: LoadLandingProjectsOptions): Promise<ProjectSummary[]> {
  const adapter = await getProjectContentAdapter();
  const projectRows = await adapter.findProjects({
    siteKey,
    state: "published",
  });

  return assembleLandingProjects({ channel, projectRows });
}
