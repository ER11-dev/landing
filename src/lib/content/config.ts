import { z } from "zod";
import { ContentStateSchema, type ContentState } from "./domain";

export const ContentSourceSchema = z.enum(["astra", "seed"]);

export type ContentSource = z.infer<typeof ContentSourceSchema>;

export function readContentSource(
  env: NodeJS.ProcessEnv = process.env,
): ContentSource {
  const source = ContentSourceSchema.parse(
    env.CONTENT_SOURCE?.trim() || "astra",
  );

  if (
    source === "seed" &&
    (env.NODE_ENV === "production" || Boolean(env.VERCEL_ENV))
  ) {
    throw new Error(
      "CONTENT_SOURCE=seed is restricted to local development and tests",
    );
  }

  return source;
}

export function readContentSiteKey(
  env: NodeJS.ProcessEnv = process.env,
): string {
  return env.ASTRA_CONTENT_SITE_KEY?.trim() || "er11";
}

export function readContentState(
  env: NodeJS.ProcessEnv = process.env,
): ContentState {
  return ContentStateSchema.parse(
    env.ASTRA_CONTENT_STATE?.trim() || "published",
  );
}
