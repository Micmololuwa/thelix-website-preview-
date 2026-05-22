import { Router } from "express";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, "../data");
const DATA_FILE = path.join(DATA_DIR, "books.json");
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "thelix2025";

interface Book {
  id: string;
  title: string;
  year: string;
  sellingUrl: string;
  cover: string;
  createdAt: string;
}

function readBooks(): Book[] {
  if (!existsSync(DATA_FILE)) return [];
  try {
    return JSON.parse(readFileSync(DATA_FILE, "utf-8"));
  } catch {
    return [];
  }
}

function writeBooks(books: Book[]) {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(DATA_FILE, JSON.stringify(books, null, 2));
}

function auth(req: any, res: any): boolean {
  if (req.headers["x-admin-key"] !== ADMIN_PASSWORD) {
    res.status(401).json({ error: "Unauthorized" });
    return false;
  }
  return true;
}

export const booksRouter = Router();

booksRouter.get("/", (_req, res) => {
  res.json(readBooks());
});

booksRouter.post("/", (req, res) => {
  if (!auth(req, res)) return;
  const { title, year, sellingUrl, cover } = req.body as Partial<Book>;
  if (!title || !year || !sellingUrl) {
    res.status(400).json({ error: "title, year, and sellingUrl are required" });
    return;
  }
  const book: Book = {
    id: Date.now().toString(),
    title: title.trim(),
    year: year.trim(),
    sellingUrl: sellingUrl.trim(),
    cover: (cover || "").trim(),
    createdAt: new Date().toISOString(),
  };
  const books = readBooks();
  books.push(book);
  writeBooks(books);
  res.status(201).json(book);
});

booksRouter.put("/:id", (req, res) => {
  if (!auth(req, res)) return;
  const { title, year, sellingUrl, cover } = req.body as Partial<Book>;
  if (!title || !year || !sellingUrl) {
    res.status(400).json({ error: "title, year, and sellingUrl are required" });
    return;
  }
  const books = readBooks();
  const idx = books.findIndex((b) => b.id === req.params.id);
  if (idx === -1) {
    res.status(404).json({ error: "Book not found" });
    return;
  }
  books[idx] = {
    ...books[idx],
    title: title.trim(),
    year: year.trim(),
    sellingUrl: sellingUrl.trim(),
    cover: cover !== undefined ? cover.trim() : books[idx].cover,
  };
  writeBooks(books);
  res.json(books[idx]);
});

booksRouter.delete("/:id", (req, res) => {
  if (!auth(req, res)) return;
  const books = readBooks();
  const filtered = books.filter((b) => b.id !== req.params.id);
  if (filtered.length === books.length) {
    res.status(404).json({ error: "Book not found" });
    return;
  }
  writeBooks(filtered);
  res.json({ ok: true });
});
