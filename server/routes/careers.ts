import { Router } from "express";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, "../data");
const DATA_FILE = path.join(DATA_DIR, "careers.json");
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "thelix2025";

interface Job {
  id: string;
  title: string;
  location: string;
  description: string;
  applyUrl: string;
  createdAt: string;
}

function readJobs(): Job[] {
  if (!existsSync(DATA_FILE)) return [];
  try {
    return JSON.parse(readFileSync(DATA_FILE, "utf-8"));
  } catch {
    return [];
  }
}

function writeJobs(jobs: Job[]) {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(DATA_FILE, JSON.stringify(jobs, null, 2));
}

function auth(req: any, res: any): boolean {
  if (req.headers["x-admin-key"] !== ADMIN_PASSWORD) {
    res.status(401).json({ error: "Unauthorized" });
    return false;
  }
  return true;
}

export const careersRouter = Router();

careersRouter.get("/", (_req, res) => {
  res.json(readJobs());
});

careersRouter.post("/", (req, res) => {
  if (!auth(req, res)) return;
  const { title, location, description, applyUrl } = req.body as Partial<Job>;
  if (!title || !location || !description || !applyUrl) {
    res.status(400).json({ error: "title, location, description and applyUrl are required" });
    return;
  }
  const job: Job = {
    id: Date.now().toString(),
    title: title.trim(),
    location: location.trim(),
    description: description.trim(),
    applyUrl: applyUrl.trim(),
    createdAt: new Date().toISOString(),
  };
  const jobs = readJobs();
  jobs.push(job);
  writeJobs(jobs);
  res.status(201).json(job);
});

careersRouter.put("/:id", (req, res) => {
  if (!auth(req, res)) return;
  const { title, location, description, applyUrl } = req.body as Partial<Job>;
  if (!title || !location || !description || !applyUrl) {
    res.status(400).json({ error: "title, location, description and applyUrl are required" });
    return;
  }
  const jobs = readJobs();
  const idx = jobs.findIndex((j) => j.id === req.params.id);
  if (idx === -1) { res.status(404).json({ error: "Job not found" }); return; }
  jobs[idx] = { ...jobs[idx], title: title.trim(), location: location.trim(), description: description.trim(), applyUrl: applyUrl.trim() };
  writeJobs(jobs);
  res.json(jobs[idx]);
});

careersRouter.delete("/:id", (req, res) => {
  if (!auth(req, res)) return;
  const jobs = readJobs();
  const filtered = jobs.filter((j) => j.id !== req.params.id);
  if (filtered.length === jobs.length) { res.status(404).json({ error: "Job not found" }); return; }
  writeJobs(filtered);
  res.json({ ok: true });
});
