import {
  assembleProjectPage,
  ProjectSlugSchema,
  type ContentChannel,
  type ProjectPage,
} from "./domain";
import { createSeedRows } from "./seed-data";

interface LoadProjectPageOptions {
  slug: string;
  channel: ContentChannel;
}

export function loadProjectPage({
  slug,
  channel,
}: LoadProjectPageOptions): ProjectPage | null {
  if (!ProjectSlugSchema.safeParse(slug).success) {
    return null;
  }

  const { projects, projectSections } = createSeedRows({
    siteKey: "er11",
    state: "published",
  });

  return assembleProjectPage({
    channel,
    projectRows: projects,
    sectionRows: projectSections.filter((s) => s.project_slug === slug),
    slug,
  });
}
