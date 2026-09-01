import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";

export default defineConfig({
  site: "https://upwork-orpin.vercel.app",
  output: "static",
  publicDir: "./assets",
  adapter: vercel({
    isr: {
      expiration: 300,
    },
  }),
  server: {
    allowedHosts: ["5abnhh-92-36-45-93.ru.tuna.am"],
  },
});
