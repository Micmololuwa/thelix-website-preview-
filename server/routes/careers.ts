import { Router } from "express";
import { supabase } from "../lib/supabase.js";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "thelix2025";

function auth(req: any, res: any): boolean {
  if (req.headers["x-admin-key"] !== ADMIN_PASSWORD) {
    res.status(401).json({ error: "Unauthorized" });
    return false;
  }
  return true;
}

export const careersRouter = Router();

careersRouter.get("/", async (_req, res) => {
  const { data, error } = await supabase
    .from("careers")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) { res.status(500).json({ error: error.message }); return; }
  res.json(data.map((j) => ({ ...j, applyUrl: j.apply_url })));
});

careersRouter.post("/", async (req, res) => {
  if (!auth(req, res)) return;
  const { title, location, description, applyUrl } = req.body;
  if (!title || !location || !description || !applyUrl) {
    res.status(400).json({ error: "title, location, description and applyUrl are required" });
    return;
  }
  const id = Date.now().toString();
  const { data, error } = await supabase
    .from("careers")
    .insert({ id, title: title.trim(), location: location.trim(), description: description.trim(), apply_url: applyUrl.trim() })
    .select()
    .single();
  if (error) { res.status(500).json({ error: error.message }); return; }
  res.status(201).json({ ...data, applyUrl: data.apply_url });
});

careersRouter.put("/:id", async (req, res) => {
  if (!auth(req, res)) return;
  const { title, location, description, applyUrl } = req.body;
  if (!title || !location || !description || !applyUrl) {
    res.status(400).json({ error: "title, location, description and applyUrl are required" });
    return;
  }
  const { data, error } = await supabase
    .from("careers")
    .update({ title: title.trim(), location: location.trim(), description: description.trim(), apply_url: applyUrl.trim() })
    .eq("id", req.params.id)
    .select()
    .single();
  if (error) { res.status(error.code === "PGRST116" ? 404 : 500).json({ error: error.message }); return; }
  res.json({ ...data, applyUrl: data.apply_url });
});

careersRouter.delete("/:id", async (req, res) => {
  if (!auth(req, res)) return;
  const { error } = await supabase.from("careers").delete().eq("id", req.params.id);
  if (error) { res.status(500).json({ error: error.message }); return; }
  res.json({ ok: true });
});
