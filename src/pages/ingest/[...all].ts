import type { APIRoute } from "astro";

export const prerender = false;

const POSTHOG_HOST = "https://eu.i.posthog.com";

export const ALL: APIRoute = async ({ request, url }) => {
  const targetPath = url.pathname.replace(/^\/ingest/, "");
  const targetUrl = `${POSTHOG_HOST}${targetPath}${url.search}`;

  const headers = new Headers(request.headers);
  headers.delete("host");

  const body =
    request.method !== "GET" && request.method !== "HEAD"
      ? await request.arrayBuffer()
      : undefined;

  const response = await fetch(targetUrl, {
    method: request.method,
    headers,
    body,
  });

  const responseHeaders = new Headers(response.headers);
  responseHeaders.delete("transfer-encoding");
  responseHeaders.delete("content-encoding");

  return new Response(response.body, {
    status: response.status,
    headers: responseHeaders,
  });
};
