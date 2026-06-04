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
  const path = `books/${id}.${ext}`;
  const { error } = await supabase.storage.from("images").upload(path, buffer, {
    contentType: mimeType,
    upsert: true,
  });
  if (error) throw error;
  const { data } = supabase.storage.from("images").getPublicUrl(path);
  return data.publicUrl;
}

export const booksRouter = Router();

booksRouter.get("/", async (_req, res) => {
  const { data, error } = await supabase
    .from("books")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) { res.status(500).json({ error: error.message }); return; }
  res.json(data.map((b) => ({ ...b, sellingUrl: b.selling_url, cover: b.cover_url })));
});

booksRouter.post("/", async (req, res) => {
  if (!await auth(req, res)) return;
  const { title, year, sellingUrl, cover } = req.body;
  if (!title || !year || !sellingUrl) {
    res.status(400).json({ error: "title, year, and sellingUrl are required" });
    return;
  }
  const id = Date.now().toString();
  let coverUrl = "";
  if (cover) {
    try { coverUrl = await uploadImage(cover, id); }
    catch (err: any) { res.status(500).json({ error: "Image upload failed: " + (err.message || "Unknown error") }); return; }
  }
  const { count } = await supabase.from("books").select("*", { count: "exact", head: true });
  const { data, error } = await supabase
    .from("books")
    .insert({ id, title: title.trim(), year: year.trim(), selling_url: sellingUrl.trim(), cover_url: coverUrl, sort_order: count ?? 0 })
    .select()
    .single();
  if (error) { res.status(500).json({ error: error.message }); return; }
  res.status(201).json({ ...data, sellingUrl: data.selling_url, cover: data.cover_url });
});

booksRouter.put("/:id", async (req, res) => {
  if (!await auth(req, res)) return;
  const { title, year, sellingUrl, cover } = req.body;
  if (!title || !year || !sellingUrl) {
    res.status(400).json({ error: "title, year, and sellingUrl are required" });
    return;
  }
  const update: any = { title: title.trim(), year: year.trim(), selling_url: sellingUrl.trim() };
  if (cover !== undefined) {
    if (cover) {
      try { update.cover_url = await uploadImage(cover, req.params.id); }
      catch (err: any) { res.status(500).json({ error: "Image upload failed: " + (err.message || "Unknown error") }); return; }
    } else {
      update.cover_url = "";
    }
  }
  const { data, error } = await supabase
    .from("books")
    .update(update)
    .eq("id", req.params.id)
    .select()
    .single();
  if (error) { res.status(error.code === "PGRST116" ? 404 : 500).json({ error: error.message }); return; }
  res.json({ ...data, sellingUrl: data.selling_url, cover: data.cover_url });
});

booksRouter.patch("/reorder", async (req, res) => {
  if (!await auth(req, res)) return;
  const { ids } = req.body;
  if (!Array.isArray(ids)) { res.status(400).json({ error: "ids array required" }); return; }
  const results = await Promise.all(
    ids.map((id, i) => supabase.from("books").update({ sort_order: i }).eq("id", id))
  );
  const failed = results.find((r) => r.error);
  if (failed?.error) { res.status(500).json({ error: failed.error.message }); return; }
  res.json({ ok: true });
});

booksRouter.delete("/:id", async (req, res) => {
  if (!await auth(req, res)) return;
  const { error } = await supabase.from("books").delete().eq("id", req.params.id);
  if (error) { res.status(500).json({ error: error.message }); return; }
  res.json({ ok: true });
});
