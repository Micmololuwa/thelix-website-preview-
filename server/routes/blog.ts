import { Router, Request, Response } from "express";
import { supabase } from "../lib/supabase.js";
import { auth as checkAuth } from "../lib/auth.js";

export const blogRouter = Router();

// Public: get all published posts
blogRouter.get("/", async (_req, res) => {
  const { data, error } = await supabase
    .from("blog")
    .select("id,title,slug,excerpt,cover_image,author,category,date,published,sort_order")
    .eq("published", true)
    .order("sort_order", { ascending: true });
  if (error) { res.status(500).json({ error: error.message }); return; }
  res.json(data);
});

// Public: get single post by slug
blogRouter.get("/:slug", async (req: Request, res: Response) => {
  const { data, error } = await supabase
    .from("blog")
    .select("*")
    .eq("slug", req.params.slug)
    .eq("published", true)
    .single();
  if (error || !data) { res.status(404).json({ error: "Post not found" }); return; }
  res.json(data);
});

// Admin: get all posts (including drafts)
blogRouter.get("/admin/all", async (req: Request, res: Response) => {
  if (!await checkAuth(req, res)) return;
  const { data, error } = await supabase
    .from("blog")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) { res.status(500).json({ error: error.message }); return; }
  res.json(data);
});

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

// Admin: create post
blogRouter.post("/", async (req: Request, res: Response) => {
  if (!await checkAuth(req, res)) return;
  const { title, content, excerpt, cover_image, author, category, date, published } = req.body;
  if (!title || !content) { res.status(400).json({ error: "Title and content are required" }); return; }

  const id = Date.now().toString();
  const baseSlug = slugify(title);
  // ensure uniqueness by appending id suffix if slug exists
  const { data: existing } = await supabase.from("blog").select("slug").eq("slug", baseSlug).single();
  const slug = existing ? `${baseSlug}-${id}` : baseSlug;

  const { count } = await supabase.from("blog").select("*", { count: "exact", head: true });
  const { data, error } = await supabase
    .from("blog")
    .insert({
      id,
      title,
      slug,
      content,
      excerpt: excerpt || "",
      cover_image: cover_image || "",
      author: author || "",
      category: category || "",
      date: date || new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
      published: published ?? false,
      sort_order: count ?? 0,
    })
    .select()
    .single();
  if (error) { res.status(500).json({ error: error.message }); return; }
  res.json(data);
});

// Admin: update post
blogRouter.put("/:id", async (req: Request, res: Response) => {
  if (!await checkAuth(req, res)) return;
  const { title, content, excerpt, cover_image, author, category, date, published } = req.body;
  const { data, error } = await supabase
    .from("blog")
    .update({ title, content, excerpt, cover_image, author, category, date, published })
    .eq("id", req.params.id)
    .select()
    .single();
  if (error) { res.status(500).json({ error: error.message }); return; }
  res.json(data);
});

// Admin: reorder
blogRouter.patch("/reorder", async (req: Request, res: Response) => {
  if (!await checkAuth(req, res)) return;
  const { ids } = req.body;
  if (!Array.isArray(ids)) { res.status(400).json({ error: "ids array required" }); return; }
  const results = await Promise.all(
    ids.map((id, i) => supabase.from("blog").update({ sort_order: i }).eq("id", id))
  );
  const failed = results.find((r) => r.error);
  if (failed?.error) { res.status(500).json({ error: failed.error.message }); return; }
  res.json({ ok: true });
});

// Admin: delete post
blogRouter.delete("/:id", async (req: Request, res: Response) => {
  if (!await checkAuth(req, res)) return;
  const { error } = await supabase.from("blog").delete().eq("id", req.params.id);
  if (error) { res.status(500).json({ error: error.message }); return; }
  res.json({ success: true });
});
