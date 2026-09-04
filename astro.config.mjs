import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";

export default defineConfig({
  site: "https://er11-dev.vercel.app",
  output: "static",
  publicDir: "./assets",
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/upwork"),
    }),
  ],
  adapter: vercel(),
});
