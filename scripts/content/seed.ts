import { createAstraDb } from "../../src/lib/content/astra/config";
import {
  ensureContentTables,
  getContentTables,
} from "../../src/lib/content/astra/schema";
import {
  readContentSiteKey,
  readContentState,
} from "../../src/lib/content/config";
import { createSeedRows } from "../../src/lib/content/seed-data";

const siteKey = readContentSiteKey();
const state = readContentState();
const db = createAstraDb("admin");

await ensureContentTables(db);

const tables = getContentTables(db);
const rows = createSeedRows({ siteKey, state });

await Promise.all(
  rows.projects.map(async (row) => {
    const { site_key, state, project_slug, ...values } = row;

    await tables.projects.updateOne(
      { site_key, state, project_slug },
      { $set: values },
    );
  }),
);

await Promise.all(
  rows.projectSections.map(async (row) => {
    const {
      site_key,
      project_slug,
      state,
      section_order,
      section_key,
      ...values
    } = row;

    await tables.projectSections.updateOne(
      { site_key, project_slug, state, section_order, section_key },
      { $set: values },
    );
  }),
);

console.log(
  `Upserted ${rows.projects.length} projects and ${rows.projectSections.length} project sections for ${siteKey}/${state}.`,
);
