// vite-plugin-labyrinth.ts
import type { Plugin } from "vite";
import { Babbler } from "./babbler";
import * as fs from "fs";
import * as path from "path";
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
  const useSuffix: boolean = Math.random() > 0.5;

  let className: string = prefix;

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
  
    // Keep track of generated paths for build
    const buildPaths = new Map<string, string>();
  
    // Generate HTML content for a given level (shared between dev and build)
    const generatePageContent = (currentLevel: number) => {
      // Generate links for this level
      const linkCount: number = 3 + Math.floor(Math.random() * 5); // 3-8 links
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
  
        // For build, track this generated path
        if (nextLevel < depth) {
          buildPaths.set(`${pathWord}/${nextLevel}`, `${currentLevel + 1}`);
        }
      }
  
      const mainContainerClass: string = generateCssClass();
      const headerClass: string = generateCssClass();
      const contentClass: string = generateCssClass();
      const navClass: string = generateCssClass();
      const listClass: string = generateCssClass();
      const listItemClass: string = generateCssClass();
      
      // Generate HTML content (the same HTML structure from your original code)
      let html = `<!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="robots" content="noindex, nofollow">
        <meta name="description" content="Exploring the digital labyrinth - layer ${currentLevel}">
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
        <script>console.log("LAB navigation tracking initialized" + new Date().toISOString());</script>
        <script>
          window.lab = { 
            track: function(level) { 
              console.log("Entered level:", level); 
              sessionStorage.setItem("lab", level);
            } 
          };
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
  
          /* ...rest of your CSS... */
          
          @media (max-width: 768px) {
            body { padding: 1rem 0.5rem; }
            .${mainContainerClass} { padding: 1.5rem; }
            .${headerClass} { padding: 1.25rem; }
            .${listClass} { grid-template-columns: 1fr; }
            h1 { font-size: 2rem; }
          }
          
          @media (max-width: 480px) {
            h1 { font-size: 1.75rem; }
            .${mainContainerClass} { padding: 1rem; }
          }
        </style>
      </head>
      <body>`;
  
      // Add container and content
      html += `<div class="${mainContainerClass}">
        <header class="${headerClass}">
          <h1>Welcome to Layer ${currentLevel}</h1>
          <div class="${generateCssClass()}">Page: ${currentLevel}/${depth}</div>
        </header>
        <div class="${contentClass}">`;
      
      // Add paragraphs
      for (let i = 0; i < 3; i++) {
        const paragraphClass = generateCssClass();
        html += `<p class="${paragraphClass}">${babbler.babble(2 + Math.ceil(Math.random() * 8))}</p>`;
      }
      
      // Navigation section
      html += `<nav class="${navClass}">
        <h2>Related Articles:</h2>
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
        (function() {
          const links = document.querySelectorAll('a');
          links.forEach(link => {
            link.addEventListener('click', function(e) {
              console.log('Navigating to:', this.getAttribute('href'));
            });
          });
          
          setTimeout(() => {
            console.log('Page rendered completely at depth ${currentLevel}');
          }, 100);
        })();
      </script>
      </body>
      </html>`;
      
      return { html, links };
    };
  
    return {
      name: "vite-labyrinth",
      // Development server handler (your existing code)
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (!req.originalUrl?.startsWith(basePath)) return next();
  
          const url = new URL(req.originalUrl, "http://localhost");
          const pathParts: string[] = url.pathname
            .replace(basePath, "")
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
          
          const { html } = generatePageContent(currentLevel);
          // In dev, we can write chunks, but here we'll just write it all at once
          res.end(html);
        });
      },
      // Build-time static file generation
      closeBundle() {
        // This runs at the end of the build process
        console.log("Generating labyrinth trap pages for production...");
        
        // Ensure the output directory exists
        const outputDir = path.resolve("dist");
        const trapDir = path.join(outputDir, basePath.replace(/^\//, ""));
        
        // Create entry point
        const entryPage = generatePageContent(0);
        
        // Ensure path exists
        if (!fs.existsSync(trapDir)) {
          fs.mkdirSync(trapDir, { recursive: true });
        }
        
        // Write the entry page
        fs.writeFileSync(path.join(trapDir, "index.html"), entryPage.html);
        
        // Generate all linked pages recursively
        const processedPaths = new Set<string>();
        const pathsToProcess = Array.from(buildPaths.keys());
        
        while (pathsToProcess.length > 0) {
          const currentPath = pathsToProcess.shift();
          
          if (!currentPath || processedPaths.has(currentPath)) continue;
          processedPaths.add(currentPath);
          
          const levelMatch = currentPath.match(/\/(\d+)$/);
          const currentLevel = levelMatch ? parseInt(levelMatch[1], 10) : 0;
          
          if (currentLevel >= depth) continue;
          
          const page = generatePageContent(currentLevel);
          const pagePath = path.join(trapDir, currentPath);
          const pageDir = path.dirname(pagePath);
          
          // Create directory if it doesn't exist
          if (!fs.existsSync(pageDir)) {
            fs.mkdirSync(pageDir, { recursive: true });
          }
          
          // Write the HTML file
          fs.writeFileSync(`${pagePath}.html`, page.html);
          
          // Add new linked paths to process
          for (const link of page.links) {
            const linkPath = link.url.replace(basePath, "").replace(/^\//, "");
            if (!processedPaths.has(linkPath) && link.depth < depth) {
              pathsToProcess.push(linkPath);
            }
          }
        }
        
        console.log(`Generated ${processedPaths.size + 1} labyrinth pages!`);
      }
    };
  }