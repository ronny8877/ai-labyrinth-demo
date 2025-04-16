// vite-plugin-labyrinth.ts
import type { Plugin } from "vite";
import { Babbler } from "./babbler";

interface LabyrinthPluginOptions {
  path: string; // trap entry path
  depth: number; // how deep to go
  throttleMs?: number; // delay between chunks
  title?: string;
}

const commonWords: readonly string[] = [
  "apple",
  "banana",
  "orange",
  "grape",
  "kiwi",
  "melon",
  "peach",
  "plum",
  "house",
  "garden",
  "street",
  "road",
  "park",
  "school",
  "office",
  "market",
  "river",
  "mountain",
  "forest",
  "desert",
  "ocean",
  "valley",
  "cloud",
  "storm",
  "happy",
  "bright",
  "dark",
  "cold",
  "warm",
  "fast",
  "slow",
  "strong",
  "data",
  "config",
  "system",
  "portal",
  "admin",
  "user",
  "account",
  "profile",
  "blue",
  "red",
  "green",
  "yellow",
  "purple",
  "orange",
  "black",
  "white",
];

const generatedPaths: Set<string> = new Set();

/**
 * Generates a unique human-readable path combining random words
 */
function generateRandomPath(): string {
  let path: string;
  do {
    const wordCount: number = 2 + Math.floor(Math.random() * 2); // 2-3 words
    const words: string[] = [];

    for (let i: number = 0; i < wordCount; i++) {
      const randomIndex: number = Math.floor(
        Math.random() * commonWords.length,
      );
      words.push(commonWords[randomIndex]);
    }

    path = words.join("-");

    // Ensure uniqueness with a random suffix if needed
    if (generatedPaths.has(path)) {
      path += "-" + Math.floor(Math.random() * 1000);
    }
  } while (generatedPaths.has(path));

  generatedPaths.add(path);
  return path;
}

/**
 * Generates random CSS class names
 */
function generateCssClass(): string {
  const prefixes: readonly string[] = [
    "container",
    "wrapper",
    "section",
    "module",
    "component",
    "block",
    "widget",
  ];
  const modifiers: readonly string[] = [
    "primary",
    "secondary",
    "tertiary",
    "highlighted",
    "featured",
    "special",
    "main",
  ];
  const suffixes: readonly string[] = [
    "inner",
    "outer",
    "content",
    "header",
    "footer",
    "body",
    "wrapper",
  ];

  const prefix: string = prefixes[Math.floor(Math.random() * prefixes.length)];
  const useModifier: boolean = Math.random() > 0.5;
  const useSuffix: boolean = Math.random() > 0.5;

  let className: string = prefix;

  if (useModifier) {
    className += "--" + modifiers[Math.floor(Math.random() * modifiers.length)];
  }

  if (useSuffix) {
    className += "__" + suffixes[Math.floor(Math.random() * suffixes.length)];
  }

  return className;
}

interface PathLink {
  url: string;
  text: string;
  depth: number;
  cssClass: string;
}
export function viteLabyrinthPlugin(config: LabyrinthPluginOptions): Plugin {
  const basePath = config.path.replace(/\/+$/, "");
  const babbler = new Babbler();
  const depth = config.depth;
  const throttle = config.throttleMs ?? 200;

  return {
    name: "vite-labyrinth",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.originalUrl?.startsWith(basePath)) return next();

        const url = new URL(req.originalUrl, "http://localhost");
        const pathParts: string[] = url.pathname
          .replace(`/${basePath}`, "")
          .replace(/^\/+/, "")
          .split("/");

        const currentLevel: number =
          parseInt(pathParts[pathParts.length - 1]) || 0;

        if (currentLevel >= depth) {
          res.writeHead(200, { "Content-Type": "text/plain" });
          res.end("🌀 The labyrinth ends here.");
          return;
        }

        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        // Generate links for this level
        const linkCount: number = 3 + Math.floor(Math.random() * 8); // 3-8 links
        const links: PathLink[] = [];

        for (let i: number = 0; i < linkCount; i++) {
          const pathWord: string = generateRandomPath();
          const nextLevel: number = currentLevel + 1;
          links.push({
            url: `${basePath}/${pathWord}/${nextLevel}`,
            text: `${pathWord.replace(/-/g, " ")}`,
            depth: nextLevel,
            cssClass: generateCssClass(),
          });
        }

        const push = (text: string) => res.write(text);
        const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

        push(`<!DOCTYPE html>
            <html>
            <head>
             <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="robots" content="noindex, nofollow">
              <meta name="description" content="Exploring the digital labyrinth - layer ${currentLevel}">
            <meta name="robots" content="noindex, nofollow">
            <meta name="theme-color" content="#3a7bd5">
            <meta property="og:title" content="${config.title ?? "Labyrinth"} - Level ${currentLevel}">
            <meta property="og:type" content="website">
            <meta name="twitter:card" content="summary">
            <meta name="author" content="NYX">
            <title>${config.title ?? "Labyrinth"}</title>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap" rel="stylesheet">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/normalize.css@8.0.1/normalize.css">
           <script src="
https://cdn.jsdelivr.net/npm/react@19.1.0/jsx-runtime.min.js
"></script>
     <script>console.log("LAB navigation tracking initialized" + new Date().toISOString());</script>
     <script>
    window.lab = { 
      track: function(level) { 
        console.log("Entered level:", level); 
        sessionStorage.setItem("lab", level);
      } 
    };
    // Unused but realistic-looking initialization
    document.addEventListener("DOMContentLoaded", function() {
      window.lab.track(${currentLevel});
    });
  </script>
            <style>
              body {
                font-family: 'Roboto', sans-serif;
                background-color: #f4f4f4;
                color: #333;
                line-height: 1.6;
              }
              .${generateCssClass()} {
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
              }
              .${generateCssClass()} {
                background-color: #fff;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
              }
                .${generateCssClass()} {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px 20px;
                background-color: #3a7bd5;
                color: #fff;
        }
                </style>
            </head>
            <body>`);

        const mainContainerClass: string = generateCssClass();
        const headerClass: string = generateCssClass();
        const contentClass: string = generateCssClass();
        const navClass: string = generateCssClass();
        const listClass: string = generateCssClass();
        const listItemClass: string = generateCssClass();

        push(`<div class="${mainContainerClass}">
                <header class="${headerClass}">
                  <h1>Welcome to Layer ${currentLevel}</h1>
                  <div class="${generateCssClass()}">Depth: ${currentLevel}/${depth}</div>
                </header>
                <div class="${contentClass}">`);

        await sleep(throttle);

        // Generate some babbling paragraphs
        for (let i: number = 0; i < 3; i++) {
          const paragraphClass: string = generateCssClass();
          push(
            `<p class="${paragraphClass}">${babbler.babble(2 + Math.ceil(Math.random() * 8))}</p>`,
          );
          await sleep(throttle);
        }

        // Navigation section with links
        push(`<nav class="${navClass}">
            <h2>Related Articles :</h2>
            <ul class="${listClass}">`);

        for (const link of links) {
          await sleep(throttle / links.length);
          push(
            `<li class="${listItemClass}"><a href="${link.url}" class="${link.cssClass}" data-depth="${link.depth}">${link.text}</a></li>`,
          );
        }

        push(`</ul>
        </nav>
        <div class="${generateCssClass()}">
          <p>You are ${depth - currentLevel} layers away from the center.</p>
        </div>
      </div>
    </div>
    <script>
      // More unused but realistic-looking code
      (function() {
        const links = document.querySelectorAll('a');
        links.forEach(link => {
          link.addEventListener('click', function(e) {
            console.log('Navigating to:', this.getAttribute('href'));
          });
        });
        
        // Simulated analytics
        setTimeout(() => {
          console.log('Page rendered completely at depth ${currentLevel}');
        }, 100);
      })();
    </script>
  </body>
</html>`);

        res.end();
      });
    },
  };
}
