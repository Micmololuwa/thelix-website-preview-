import "dotenv/config";
import express from "express";
import cors from "cors";
import { newsRouter } from "./routes/news.js";
import { teamRouter } from "./routes/team.js";
import { careersRouter } from "./routes/careers.js";

export function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json({ limit: "15mb" }));
  app.use(express.urlencoded({ extended: true, limit: "15mb" }));

  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.use("/api/news", newsRouter);
  app.use("/api/team", teamRouter);
  app.use("/api/careers", careersRouter);

  return app;
}
