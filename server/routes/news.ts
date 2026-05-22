import { Router, Request, Response } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, "../data");
const DATA_FILE = path.join(DATA_DIR, "news.json");

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "thelix2025";

interface Article {
  id: string;
  title: string;
  description: string;
  image: string;
  url: string;
  date: string;
  source: string;
  createdAt: string;
}

function readNews(): Article[] {
  if (!fs.existsSync(DATA_FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  } catch {
    return [];
  }
}

function writeNews(data: Article[]) {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

function checkAuth(req: Request, res: Response): boolean {
  const key = req.headers["x-admin-key"];
  if (key !== ADMIN_PASSWORD) {
    res.status(401).json({ error: "Unauthorized" });
    return false;
  }
  return true;
}

export const newsRouter = Router();

// GET all articles
newsRouter.get("/", (_req, res) => {
  res.json(readNews());
});

// POST fetch Open Graph metadata from a URL
newsRouter.post("/fetch-meta", async (req: Request, res: Response) => {
  if (!checkAuth(req, res)) return;
  const { url } = req.body;
  if (!url) {
    res.status(400).json({ error: "URL is required" });
    return;
  }
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; ThelixBot/1.0; +https://thelixholdings.com)",
      },
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

// POST create new article
newsRouter.post("/", (req: Request, res: Response) => {
  if (!checkAuth(req, res)) return;
  const { title, description, image, url, date, source } = req.body;
  if (!title || !url) {
    res.status(400).json({ error: "Title and URL are required" });
    return;
  }
  const articles = readNews();
  const newArticle: Article = {
    id: Date.now().toString(),
    title,
    description: description || "",
    image: image || "",
    url,
    date: date || new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
    source: source || "",
    createdAt: new Date().toISOString(),
  };
  articles.unshift(newArticle);
  writeNews(articles);
  res.json(newArticle);
});

// DELETE article by id
newsRouter.delete("/:id", (req: Request, res: Response) => {
  if (!checkAuth(req, res)) return;
  const articles = readNews();
  const filtered = articles.filter((a) => a.id !== req.params.id);
  if (filtered.length === articles.length) {
    res.status(404).json({ error: "Article not found" });
    return;
  }
  writeNews(filtered);
  res.json({ success: true });
});
