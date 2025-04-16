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