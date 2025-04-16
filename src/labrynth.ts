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



export function createLabyrinthPage(options: {
  basePath: string;
  currentLevel: number;
  depth: number;
  title?: string;
  throttleMs?: number;
  babbler: Babbler;
}): Promise<{ html: string; links: PathLink[] }> {
  const {
    basePath,
    currentLevel,
    depth,
    title,
    throttleMs = 200,
    babbler,
  } = options;

  return new Promise(async (resolve) => {
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

    const mainContainerClass: string = generateCssClass();
    const headerClass: string = generateCssClass();
    const contentClass: string = generateCssClass();
    const navClass: string = generateCssClass();
    const listClass: string = generateCssClass();
    const listItemClass: string = generateCssClass();

    let html = `<!DOCTYPE html>
<html>
<head>
 <meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex, nofollow">
  <meta name="description" content="Exploring the digital labyrinth - layer ${currentLevel}">
<meta name="robots" content="noindex, nofollow">
<meta name="theme-color" content="#3a7bd5">
<meta property="og:title" content="${title ?? "Labyrinth"} - Level ${currentLevel}">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary">
<meta name="author" content="NYX">
<title>${title ?? "Labyrinth"}</title>
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
  :root {
    --primary-color: #3a7bd5;
    --primary-dark: #2c5ea0;
    --secondary-color: #00b4d8;
    --accent-color: #f72585;
    --text-color: #333;
    --text-light: #666;
    --bg-color: #f4f4f4;
    --card-bg: #ffffff;
    --shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    --border-radius: 8px;
    --transition: all 0.3s ease;
  }
  
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Roboto', sans-serif;
    background-color: var(--bg-color);
    color: var(--text-color);
    line-height: 1.6;
    padding: 2rem 0.5rem;
    font-size: 16px;
  }

  h1, h2, h3 {
    font-weight: 700;
    margin-bottom: 1rem;
    color: var(--primary-dark);
    line-height: 1.2;
  }

  h1 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }
  
  h2 {
    font-size: 1.8rem;
    border-bottom: 2px solid var(--primary-color);
    padding-bottom: 0.5rem;
    margin-top: 1.5rem;
  }

  p {
    margin-bottom: 1.5rem;
    color: var(--text-light);
  }

  a {
    color: var(--primary-color);
    text-decoration: none;
    transition: var(--transition);
    font-weight: 500;
    position: relative;
  }
  
  a:hover {
    color: var(--primary-dark);
    text-decoration: underline;
  }
  
  .${mainContainerClass} {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    background: var(--card-bg);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
  }
  
  .${headerClass} {
    margin-bottom: 2rem;
    padding: 1.5rem 2rem;
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: white;
    border-radius: var(--border-radius);
    position: relative;
    overflow: hidden;
  }
  
  .${headerClass}::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.05),
      rgba(255, 255, 255, 0.05) 10px,
      rgba(255, 255, 255, 0) 10px,
      rgba(255, 255, 255, 0) 20px
    );
  }
  
  .${contentClass} {
    margin-bottom: 2.5rem;
    line-height: 1.7;
  }
  
  .${navClass} {
    margin-top: 3rem;
    padding: 1.5rem;
    background-color: rgba(58, 123, 213, 0.05);
    border-radius: var(--border-radius);
    border-left: 4px solid var(--primary-color);
  }
  
  .${listClass} {
    list-style-type: none;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 1rem;
    margin-top: 1rem;
  }
  
  .${listItemClass} {
    margin-bottom: 0.75rem;
    transition: var(--transition);
  }
  
  .${listItemClass} a {
    display: block;
    padding: 0.75rem 1rem;
    background-color: rgba(58, 123, 213, 0.1);
    border-radius: var(--border-radius);
    transition: var(--transition);
  }
  
  .${listItemClass} a:hover {
    background-color: rgba(58, 123, 213, 0.2);
    transform: translateY(-2px);
    box-shadow: var(--shadow);
    text-decoration: none;
  }
  
  @media (max-width: 768px) {
    body {
      padding: 1rem 0.5rem;
    }
    
    .${mainContainerClass} {
      padding: 1.5rem;
    }
    
    .${headerClass} {
      padding: 1.25rem;
    }
    
    .${listClass} {
      grid-template-columns: 1fr;
    }
    
    h1 {
      font-size: 2rem;
    }
  }
  
  @media (max-width: 480px) {
    h1 {
      font-size: 1.75rem;
    }
    
    .${mainContainerClass} {
      padding: 1rem;
    }
  }
</style>
</head>
<body>`;

    html += `<div class="${mainContainerClass}">
      <header class="${headerClass}">
        <h1>Welcome to Layer ${currentLevel}</h1>
        <div class="${generateCssClass()}">Depth: ${currentLevel}/${depth}</div>
      </header>
      <div class="${contentClass}">`;

    // Babbling paragraphs
    for (let i: number = 0; i < 3; i++) {
      const paragraphClass: string = generateCssClass();
      html += `<p class="${paragraphClass}">${babbler.babble(2 + Math.ceil(Math.random() * 8))}</p>`;
    }

    // Navigation section with links
    html += `<nav class="${navClass}">
      <h2>Related Articles :</h2>
      <ul class="${listClass}">`;

    for (const link of links) {
      html += `<li class="${listItemClass}"><a href="${link.url}" class="${link.cssClass}" data-depth="${link.depth}">${link.text}</a></li>`;
    }

    html += `</ul>
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
</html>`;

    resolve({ html, links });
  });
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

        // Use the extracted function to generate the page
        const { html } = await createLabyrinthPage({
          basePath,
          currentLevel,
          depth,
          title: config.title,
          throttleMs: throttle,
          babbler,
        });

        res.end(html);
      });
    },
  };
}