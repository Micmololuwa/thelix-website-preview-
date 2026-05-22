import { Router } from "express";
import { supabase } from "../lib/supabase.js";
import { auth } from "../lib/auth.js";

async function uploadImage(base64: string, id: string): Promise<string> {
  if (!base64 || !base64.startsWith("data:")) return base64;
  const match = base64.match(/^data:(image\/\w+);base64,(.+)$/);
  if (!match) return base64;
  const mimeType = match[1];
  const buffer = Buffer.from(match[2], "base64");
  const ext = mimeType.split("/")[1];
  const path = `team/${id}.${ext}`;
  const { error } = await supabase.storage.from("images").upload(path, buffer, {
    contentType: mimeType,
    upsert: true,
  });
  if (error) throw error;
  const { data } = supabase.storage.from("images").getPublicUrl(path);
  return data.publicUrl;
}

export const teamRouter = Router();

teamRouter.get("/", async (_req, res) => {
  const { data, error } = await supabase
    .from("team_members")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) { res.status(500).json({ error: error.message }); return; }
  res.json(data);
});

teamRouter.post("/", async (req, res) => {
  if (!await auth(req, res)) return;
  const { name, designation, image } = req.body;
  if (!name || !designation) {
    res.status(400).json({ error: "name and designation are required" });
    return;
  }
  const id = Date.now().toString();
  const imageUrl = image ? await uploadImage(image, id).catch(() => "") : "";
  const { data, error } = await supabase
    .from("team_members")
    .insert({ id, name: name.trim(), designation: designation.trim(), image_url: imageUrl })
    .select()
    .single();
  if (error) { res.status(500).json({ error: error.message }); return; }
  res.status(201).json({ ...data, image: data.image_url });
});

teamRouter.put("/:id", async (req, res) => {
  if (!await auth(req, res)) return;
  const { name, designation, image } = req.body;
  if (!name || !designation) {
    res.status(400).json({ error: "name and designation are required" });
    return;
  }
  const update: any = { name: name.trim(), designation: designation.trim() };
  if (image !== undefined) {
    update.image_url = image ? await uploadImage(image, req.params.id).catch(() => "") : "";
  }
  const { data, error } = await supabase
    .from("team_members")
    .update(update)
    .eq("id", req.params.id)
    .select()
    .single();
  if (error) { res.status(error.code === "PGRST116" ? 404 : 500).json({ error: error.message }); return; }
  res.json({ ...data, image: data.image_url });
});

teamRouter.delete("/:id", async (req, res) => {
  if (!await auth(req, res)) return;
  const { error } = await supabase.from("team_members").delete().eq("id", req.params.id);
  if (error) { res.status(500).json({ error: error.message }); return; }
  res.json({ ok: true });
});
