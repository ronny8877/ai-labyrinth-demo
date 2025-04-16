# 🌀 vite-labyrinth

**Trap disrespectful AI crawlers in a never-ending loop of babble.**  
Built for [Vite](https://vitejs.dev/) and works beautifully with [Astro](https://astro.build/).

---

## 👁️‍🗨️ What Is This?

Some bots don’t play nice. They ignore your `robots.txt`, scan your entire site, and burn your bandwidth like it’s a buffet.

This plugin generates an **infinite labyrinth of pages** with human-like babbling text. If a crawler hits the trap path (that _you_ define), it gets stuck crawling useless content forever — or at least wastes a lot of time before escaping.

---

## 🛠️ How It Works

- You configure a trap path like `/trap/curious-bots`
- Add that path to your `robots.txt` as `Disallow: /trap/curious-bots`
- On any public page, link to that trap (invisibly) like:

  ```html
  <a href="/trap/curious-bots" style="display:none">nothing to see here</a>
  ```

- Good bots will avoid it. Bad bots will descend into madness.

- Each page loads with:

- "AI"-generated gibberish that sounds human

- A link to a deeper level in the labyrinth

- Throttled responses to keep connections open and slow down crawlers

```typescript
import { defineConfig } from "astro/config";
import { viteLabyrinthPlugin } from "vite-plugin-bot-labyrinth";

export default defineConfig({
  vite: {
    plugins: [
      viteLabyrinthPlugin({
        path: "/trap/curious-bots",
        depth: 100,
        throttleMs: 300,
        title: "Lost in the Labyrinth",
      }),
    ],
  },
});
```

Then in public/robots.txt:

```text
User-agent: *
Disallow: /trap/curious-bots

```

And optionally drop a hidden link somewhere:

```html
<a href="/trap/curious-bots" style="display:none">secret</a>
```

---

# ⚠️ Legal + Ethical Reminder

This is not malware. It serves HTML.
It’s up to the bots to obey robots.txt. You’re just giving them something to chew on if they don't.

Use responsibly.
