import { Hono } from "hono";
import { auth } from "./lib/auth";
import { todos } from "./routes/todo.routes";
import { serveStatic } from "hono/bun";
import { logger } from "hono/logger";

const app = new Hono();

const route = app
  .use(logger())
  .on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw))
  .route("/api/todos", todos)
  // Serve static assets (CSS, JS, images, etc.)
  .use("/assets/*", serveStatic({ root: "./client/dist" }))
  .use("/static/*", serveStatic({ root: "./client/dist" }))
  // Catch-all route - serve index.html for all other routes
  .get("*", serveStatic({ path: "./client/dist/index.html" }));

export type AppType = typeof route;

export default app;
