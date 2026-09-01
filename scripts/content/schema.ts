import { createAstraDb } from "../../src/lib/content/astra/config";
import {
  CONTENT_TABLES,
  ensureContentTables,
} from "../../src/lib/content/astra/schema";

const db = createAstraDb("admin");

await ensureContentTables(db);

console.log(
  `Astra project content schema is ready: ${Object.values(CONTENT_TABLES).join(", ")}`,
);
