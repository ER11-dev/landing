import type { ProjectContentAdapter } from "./adapter";
import { readContentSource } from "./config";
import { createSeedProjectContentAdapter } from "./seed-adapter";

function hasAstraEnv(env: Record<string, unknown>): boolean {
  return Boolean(
    env.ASTRA_DB_API_ENDPOINT &&
    env.ASTRA_DB_KEYSPACE &&
    env.ASTRA_DB_APPLICATION_TOKEN,
  );
}

export async function getProjectContentAdapter(): Promise<ProjectContentAdapter> {
  const source = readContentSource(import.meta.env);

  if (source === "seed" || !hasAstraEnv(import.meta.env)) {
    return createSeedProjectContentAdapter();
  }

  const { getAstraProjectContentAdapter } = await import("./astra/adapter");
  return getAstraProjectContentAdapter();
}
