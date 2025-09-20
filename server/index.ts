import { Hono } from "hono";

const app = new Hono();

const route = app
  .get("/", (c) => {
    return c.text("Hello Hono!");
  })
  .get("/api/people", (c) => {
    return c.json([
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
      { id: 3, name: "Charlie" },
    ]);
  });

export type AppType = typeof route;

export default app;
