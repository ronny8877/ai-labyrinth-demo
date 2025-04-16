// @ts-check
import { defineConfig } from "astro/config";
import { viteLabyrinthPlugin } from "./src/labrynth";

// https://astro.build/config
export default defineConfig({
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
});
