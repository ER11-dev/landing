import { DataAPIClient, type Db } from "@datastax/astra-db-ts";
import { z } from "zod";

export { readContentSiteKey } from "../config";

const baseConfigSchema = z.object({
  ASTRA_DB_API_ENDPOINT: z.url(),
  ASTRA_DB_KEYSPACE: z.string().min(1),
});

export interface AstraContentConfig {
  endpoint: string;
  keyspace: string;
  token: string;
}

export function readAstraContentConfig(
  tokenKind: "runtime" | "admin",
  env: NodeJS.ProcessEnv = process.env,
): AstraContentConfig {
  const baseResult = baseConfigSchema.safeParse(env);
  const token =
    tokenKind === "admin"
      ? env.ASTRA_DB_ADMIN_TOKEN
      : env.ASTRA_DB_APPLICATION_TOKEN;

  if (!baseResult.success || !token) {
    const issues = [
      ...(baseResult.success
        ? []
        : baseResult.error.issues.map((issue) => issue.path.join("."))),
      !token &&
        (tokenKind === "admin"
          ? "ASTRA_DB_ADMIN_TOKEN"
          : "ASTRA_DB_APPLICATION_TOKEN"),
    ].filter(Boolean);

    throw new Error(
      `Astra DB configuration is invalid or missing: ${issues.join(", ")}`,
    );
  }

  return {
    endpoint: baseResult.data.ASTRA_DB_API_ENDPOINT,
    keyspace: baseResult.data.ASTRA_DB_KEYSPACE,
    token,
  };
}

export function createAstraDb(tokenKind: "runtime" | "admin" = "runtime"): Db {
  const config = readAstraContentConfig(tokenKind);
  const client = new DataAPIClient();

  return client.db(config.endpoint, {
    keyspace: config.keyspace,
    token: config.token,
  });
}
