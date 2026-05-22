import { Router } from "express";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, "../data");
const DATA_FILE = path.join(DATA_DIR, "team.json");
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "thelix2025";

interface TeamMember {
  id: string;
  name: string;
  designation: string;
  image: string;
  createdAt: string;
}

function readMembers(): TeamMember[] {
  if (!existsSync(DATA_FILE)) return [];
  try {
    return JSON.parse(readFileSync(DATA_FILE, "utf-8"));
  } catch {
    return [];
  }
}

function writeMembers(members: TeamMember[]) {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(DATA_FILE, JSON.stringify(members, null, 2));
}

function auth(req: any, res: any): boolean {
  if (req.headers["x-admin-key"] !== ADMIN_PASSWORD) {
    res.status(401).json({ error: "Unauthorized" });
    return false;
  }
  return true;
}

export const teamRouter = Router();

teamRouter.get("/", (_req, res) => {
  res.json(readMembers());
});

teamRouter.post("/", (req, res) => {
  if (!auth(req, res)) return;
  const { name, designation, image } = req.body as Partial<TeamMember>;
  if (!name || !designation) {
    res.status(400).json({ error: "name and designation are required" });
    return;
  }
  const member: TeamMember = {
    id: Date.now().toString(),
    name: name.trim(),
    designation: designation.trim(),
    image: (image || "").trim(),
    createdAt: new Date().toISOString(),
  };
  const members = readMembers();
  members.push(member);
  writeMembers(members);
  res.status(201).json(member);
});

teamRouter.put("/:id", (req, res) => {
  if (!auth(req, res)) return;
  const { name, designation, image } = req.body as Partial<TeamMember>;
  if (!name || !designation) {
    res.status(400).json({ error: "name and designation are required" });
    return;
  }
  const members = readMembers();
  const idx = members.findIndex((m) => m.id === req.params.id);
  if (idx === -1) {
    res.status(404).json({ error: "Member not found" });
    return;
  }
  members[idx] = {
    ...members[idx],
    name: name.trim(),
    designation: designation.trim(),
    image: image !== undefined ? image.trim() : members[idx].image,
  };
  writeMembers(members);
  res.json(members[idx]);
});

teamRouter.delete("/:id", (req, res) => {
  if (!auth(req, res)) return;
  const members = readMembers();
  const filtered = members.filter((m) => m.id !== req.params.id);
  if (filtered.length === members.length) {
    res.status(404).json({ error: "Member not found" });
    return;
  }
  writeMembers(filtered);
  res.json({ ok: true });
});
