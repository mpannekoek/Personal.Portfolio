import express from "express";
import type { Request, Response } from "express";

const app = express();
const port = Number(process.env.PORT) || 3001;

app.use(express.json());

app.get("/api/health", (_req: Request, res: Response) => {
  res.json({
    ok: true,
    service: "api",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/message", (_req: Request, res: Response) => {
  res.json({
    message: "Minimal Express API is running.",
  });
});

app.listen(port, "127.0.0.1", () => {
  console.log(`API listening on http://127.0.0.1:${port}`);
});
