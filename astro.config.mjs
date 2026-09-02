import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";

export default defineConfig({
  site: "https://er11-dev.vercel.app",
  output: "static",
  publicDir: "./assets",
  adapter: vercel({
    isr: {
      expiration: 300,
    },
  }),
});
