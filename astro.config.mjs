// @ts-check
import { defineConfig } from "astro/config";
import { viteLabyrinthPlugin } from "./src/labrynth";
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import node from "@astrojs/node";
// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [mdx(), sitemap()],
  output:"server",

  vite: {
    plugins: [
      viteLabyrinthPlugin({
        path: "/trap/the-robots",
        depth: 50,
        throttleMs: 300,
        title: "Forbidden Forest for Bots",
      }),
    ],
  },

  adapter: node({
    mode: "standalone",
  }),
});