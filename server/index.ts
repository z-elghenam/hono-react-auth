import { Hono } from "hono";
import { auth } from "./lib/auth";
import { todos } from "./routes/todo.routes";

const app = new Hono();

const route = app
  .on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw))
  .route("/api/todos", todos)
  .get("/people", (c) => {
    return c.json([
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
      { id: 3, name: "Charlie" },
    ]);
  });

export type AppType = typeof route;

export default app;
