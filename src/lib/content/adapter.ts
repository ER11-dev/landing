import type { ContentState, ProjectRow, ProjectSectionRow } from "./domain";

interface FindProjectsInput {
  siteKey: string;
  state: ContentState;
}

interface FindProjectSectionsInput extends FindProjectsInput {
  projectSlug: string;
}

export interface ProjectContentAdapter {
  findProjects(input: FindProjectsInput): Promise<ProjectRow[]>;
  findProjectSections(
    input: FindProjectSectionsInput,
  ): Promise<ProjectSectionRow[]>;
}
