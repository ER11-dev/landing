import {
  assembleProjectPage,
  ProjectSlugSchema,
  type ContentChannel,
  type ProjectPage,
} from "./domain";
import { getProjectContentAdapter } from "./runtime-adapter";

interface LoadProjectPageOptions {
  siteKey: string;
  slug: string;
  channel: ContentChannel;
}

export async function loadProjectPage({
  siteKey,
  slug,
  channel,
}: LoadProjectPageOptions): Promise<ProjectPage | null> {
  if (!ProjectSlugSchema.safeParse(slug).success) {
    return null;
  }

  const adapter = await getProjectContentAdapter();
  const [projectRows, sectionRows] = await Promise.all([
    adapter.findProjects({ siteKey, state: "published" }),
    adapter.findProjectSections({
      siteKey,
      projectSlug: slug,
      state: "published",
    }),
  ]);

  return assembleProjectPage({
    channel,
    projectRows,
    sectionRows,
    slug,
  });
}
