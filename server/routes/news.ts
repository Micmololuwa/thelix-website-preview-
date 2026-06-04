import { Router, Request, Response } from "express";
import { supabase } from "../lib/supabase.js";
import { auth as checkAuth } from "../lib/auth.js";

export const newsRouter = Router();

newsRouter.get("/", async (_req, res) => {
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) { res.status(500).json({ error: error.message }); return; }
  res.json(data);
});

newsRouter.post("/fetch-meta", async (req: Request, res: Response) => {
  if (!await checkAuth(req, res)) return;
  const { url } = req.body;
  if (!url) { res.status(400).json({ error: "URL is required" }); return; }
  try {
    const response = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; ThelixBot/1.0; +https://thelixholdings.com)" },
    });
    const html = await response.text();

    const getMeta = (property: string): string => {
      const patterns = [
        new RegExp(`<meta[^>]+property=["']${property}["'][^>]+content=["']([^"']+)["']`, "i"),
        new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${property}["']`, "i"),
        new RegExp(`<meta[^>]+name=["']${property}["'][^>]+content=["']([^"']+)["']`, "i"),
        new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+name=["']${property}["']`, "i"),
      ];
      for (const p of patterns) {
        const m = html.match(p);
        if (m) return m[1].trim();
      }
      return "";
    };

    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const pageTitle = titleMatch ? titleMatch[1].trim() : "";
    const decodeEntities = (str: string) =>
      str.replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
        .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&apos;/g, "'");

    res.json({
      title: decodeEntities(getMeta("og:title") || pageTitle),
      description: decodeEntities(getMeta("og:description") || getMeta("description")),
      image: getMeta("og:image"),
      source: getMeta("og:site_name"),
    });
  } catch {
    res.status(400).json({ error: "Failed to fetch URL. Check that it is publicly accessible." });
  }
});

newsRouter.post("/", async (req: Request, res: Response) => {
  if (!await checkAuth(req, res)) return;
  const { title, description, image, url, date, source } = req.body;
  if (!title || !url) { res.status(400).json({ error: "Title and URL are required" }); return; }
  const id = Date.now().toString();
  const { count } = await supabase.from("news").select("*", { count: "exact", head: true });
  const { data, error } = await supabase
    .from("news")
    .insert({
      id,
      title,
      description: description || "",
      image: image || "",
      url,
      date: date || new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
      source: source || "",
      sort_order: count ?? 0,
    })
    .select()
    .single();
  if (error) { res.status(500).json({ error: error.message }); return; }
  res.json(data);
});

newsRouter.patch("/reorder", async (req: Request, res: Response) => {
  if (!await checkAuth(req, res)) return;
  const { ids } = req.body;
  if (!Array.isArray(ids)) { res.status(400).json({ error: "ids array required" }); return; }
  const results = await Promise.all(
    ids.map((id, i) => supabase.from("news").update({ sort_order: i }).eq("id", id))
  );
  const failed = results.find((r) => r.error);
  if (failed?.error) { res.status(500).json({ error: failed.error.message }); return; }
  res.json({ ok: true });
});

newsRouter.delete("/:id", async (req: Request, res: Response) => {
  if (!await checkAuth(req, res)) return;
  const { error } = await supabase.from("news").delete().eq("id", req.params.id);
  if (error) { res.status(500).json({ error: error.message }); return; }
  res.json({ success: true });
});
