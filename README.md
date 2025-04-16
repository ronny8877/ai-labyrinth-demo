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
import type { APIContext, APIRoute } from "astro";
import { Babbler } from "../../../babbler";
import { createLabyrinthPage } from "../../../labrynth"; // Import the function

export const GET: APIRoute = async (ctx: APIContext) => {
  try {
    const depth = 50;
    const throttleMs = 200;
    const title = "Labyrinth";
    const basePath = "/trap/bots"; // Adjust as needed for your route
    const babbler = new Babbler();

    const url = new URL(ctx.url, "http://localhost");
    const pathParts: string[] = url.pathname
      .replace(basePath, "")
      .replace(/^\/+/, "")
      .split("/");

    const currentLevel: number =
      parseInt(pathParts[pathParts.length - 1]) || 0;

    if (currentLevel >= depth) {
      return new Response("Maximum depth reached", { status: 400 });
    }

    const { html } = await createLabyrinthPage({
      basePath,
      currentLevel,
      depth,
      title,
      throttleMs,
      babbler,
    });

    // Return the generated HTML as a response
    return new Response(html, {
      headers: {
        "Content-Type": "text/html",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Error in GET request:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
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
