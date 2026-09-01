import type { ProjectContentAdapter } from "./adapter";
import { readContentSource } from "./config";
import { createSeedProjectContentAdapter } from "./seed-adapter";

export async function getProjectContentAdapter(): Promise<ProjectContentAdapter> {
  if (readContentSource(import.meta.env) === "seed") {
    return createSeedProjectContentAdapter();
  }

  const { getAstraProjectContentAdapter } = await import("./astra/adapter");
  return getAstraProjectContentAdapter();
}
