import { readContentSiteKey } from "../../src/lib/content/config";
import { loadLandingProjects } from "../../src/lib/content/load-landing-projects";
import { loadProjectPage } from "../../src/lib/content/load-project-page";

const siteKey = readContentSiteKey();
const expectedSlugs = ["lead-operations-desk", "repay", "agc-burya"];
const [directProjects, upworkProjects] = await Promise.all([
  loadLandingProjects({ siteKey, channel: "direct" }),
  loadLandingProjects({ siteKey, channel: "upwork" }),
]);

if (
  directProjects.map((project) => project.slug).join(",") !==
  expectedSlugs.join(",")
) {
  throw new Error(
    `Expected ordered projects ${expectedSlugs.join(", ")}, received ${directProjects.map((project) => project.slug).join(", ")}.`,
  );
}

if (directProjects.some((project) => !project.sourceUrl)) {
  throw new Error("The direct channel is missing a public project source URL.");
}

if (upworkProjects.some((project) => project.sourceUrl)) {
  throw new Error("The Upwork channel exposed a project source URL.");
}

for (const slug of expectedSlugs) {
  const [directPage, upworkPage] = await Promise.all([
    loadProjectPage({ siteKey, slug, channel: "direct" }),
    loadProjectPage({ siteKey, slug, channel: "upwork" }),
  ]);

  if (!directPage || !upworkPage) {
    throw new Error(`Project page ${slug} could not be loaded.`);
  }

  if (directPage.sections.length !== 3) {
    throw new Error(
      `Expected 3 sections for ${slug}, received ${directPage.sections.length}.`,
    );
  }

  if (upworkPage.project.sourceUrl) {
    throw new Error(`The Upwork project page ${slug} exposed a source URL.`);
  }

  if (!upworkPage.project.detailPath.startsWith("/upwork/projects/")) {
    throw new Error(`The Upwork project path for ${slug} is not channel-safe.`);
  }

  if (!upworkPage.nextProject.detailPath.startsWith("/upwork/projects/")) {
    throw new Error(
      `The next-project path from Upwork project ${slug} is not channel-safe.`,
    );
  }
}

console.log(
  `Verified ${directProjects.length} projects, their detail sections, cyclic next-project links, and the Upwork URL policy for ${siteKey}.`,
);
