import { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, Link2, Check } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/ui/motion";
import { CategoryChip } from "@/lib/categoryColors.tsx";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  cover_image: string;
  author: string;
  category: string;
  date: string;
}

function processContent(html: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  doc.querySelectorAll<HTMLAnchorElement>("a[href^='data:'][download]").forEach((anchor) => {
    const href = anchor.getAttribute("href") ?? "";
    const filename = anchor.getAttribute("download") ?? "file";
    const isPDF = href.startsWith("data:application/pdf");
    const wrapper = doc.createElement("div");
    wrapper.className = "doc-attachment";
    if (isPDF) {
      wrapper.innerHTML = `
        <div class="doc-attachment-header">
          <span class="doc-attachment-name">📄 ${filename}</span>
          <a class="doc-attachment-dl" href="${href}" download="${filename}">Download</a>
        </div>
        <iframe class="doc-attachment-iframe" src="${href}" title="${filename}"></iframe>
      `;
    } else {
      wrapper.innerHTML = `
        <div class="doc-attachment-card">
          <span class="doc-attachment-name">📎 ${filename}</span>
          <a class="doc-attachment-dl" href="${href}" download="${filename}">Download</a>
        </div>
      `;
    }
    anchor.closest("p")?.replaceWith(wrapper) ?? anchor.replaceWith(wrapper);
  });
  return doc.body.innerHTML;
}

// ---- Share bar ----
const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.088 14.01l-2.948-.924c-.64-.203-.653-.64.136-.948l11.527-4.445c.535-.19 1.003.131.759.555z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

function ShareBar({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "";
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const copyLink = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="flex items-center gap-4 pt-10 mt-10 border-t border-gray-100">
      <span className="text-sm font-medium font-jakarta text-black/60">Share</span>
      <div className="flex items-center gap-3">
        <a
          href={`https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank" rel="noopener noreferrer"
          className="w-9 h-9 rounded-full bg-[#229ED9] text-white flex items-center justify-center hover:opacity-85 transition-opacity"
          title="Share on Telegram"
        >
          <TelegramIcon />
        </a>
        <a
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank" rel="noopener noreferrer"
          className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center hover:opacity-80 transition-opacity"
          title="Share on X"
        >
          <TwitterIcon />
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank" rel="noopener noreferrer"
          className="w-9 h-9 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-85 transition-opacity"
          title="Share on Facebook"
        >
          <FacebookIcon />
        </a>
        <button
          onClick={copyLink}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-600 text-sm font-jakarta font-medium hover:bg-blue-100 transition-colors"
        >
          {copied ? <Check size={14} /> : <Link2 size={14} />}
          {copied ? "Copied!" : "Copy link"}
        </button>
      </div>
    </div>
  );
}

// ---- Suggested posts ----
function SuggestedPosts({ currentSlug }: { currentSlug: string }) {
  const [posts, setPosts] = useState<Omit<BlogPost, "content">[]>([]);

  useEffect(() => {
    fetch("/api/blog")
      .then((r) => r.json())
      .then((data) => {
        if (!Array.isArray(data)) return;
        const others = data.filter((p) => p.slug !== currentSlug);
        // shuffle then take 3
        const shuffled = others.sort(() => 0.5 - Math.random()).slice(0, 3);
        setPosts(shuffled);
      })
      .catch(() => {});
  }, [currentSlug]);

  if (posts.length === 0) return null;

  return (
    <section className="bg-[#f6f5f5] py-14">
      <div className="max-w-[1100px] mx-auto px-6">
        <h2 className="text-2xl font-bold text-black font-jakarta mb-8">More to read</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
            >
              {post.cover_image ? (
                <img src={post.cover_image} alt={post.title} className="w-full h-44 object-cover group-hover:opacity-95 transition-opacity" />
              ) : (
                <div className="w-full h-44 bg-gradient-to-br from-orange-100 to-orange-50" />
              )}
              <div className="flex flex-col gap-2.5 p-5">
                <div className="flex items-center gap-2 flex-wrap">
                  {post.category && <CategoryChip category={post.category} />}
                  {post.date && <time className="text-black/35 text-xs font-jakarta">{post.date}</time>}
                </div>
                <h3 className="text-sm font-bold text-black font-jakarta leading-[1.5] group-hover:text-thelix-orange transition-colors line-clamp-2">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-black/50 text-xs font-jakarta leading-relaxed line-clamp-2">{post.excerpt}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/blog/${slug}`)
      .then((r) => {
        if (!r.ok) { setNotFound(true); setLoading(false); return null; }
        return r.json();
      })
      .then((data) => {
        if (data) setPost(data);
        setLoading(false);
      })
      .catch(() => { setNotFound(true); setLoading(false); });
  }, [slug]);

  const processedContent = useMemo(
    () => (post?.content ? processContent(post.content) : ""),
    [post?.content]
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-2 border-thelix-orange border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center gap-4 px-6">
          <p className="text-2xl font-bold text-black font-jakarta">Post not found</p>
          <Link to="/blog" className="text-thelix-orange text-sm font-jakarta hover:underline">← Back to Blog</Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-1">

          {/* Wide image zone */}
          <div className="max-w-[1100px] mx-auto px-6 pt-10 lg:pt-14">
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-black/40 hover:text-black font-jakarta transition-colors mb-5"
            >
              <ChevronLeft size={16} /> Back to Blog
            </Link>

            {post.cover_image && (
              <motion.div
                className="w-full rounded-2xl overflow-hidden"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
              >
                <img src={post.cover_image} alt={post.title} className="w-full object-cover" style={{ aspectRatio: "16 / 9" }} />
              </motion.div>
            )}
          </div>

          {/* Narrow text content */}
          <div className="max-w-[780px] mx-auto px-6 pt-8 pb-4">
            <motion.div className="flex items-center gap-3 flex-wrap mb-4" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
              {post.category && <CategoryChip category={post.category} />}
              <time className="text-black/40 text-sm font-jakarta">{post.date}</time>
            </motion.div>

            <motion.h1
              className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-black font-jakarta leading-[1.5] tracking-tight mb-4"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15 }}
            >
              {post.title}
            </motion.h1>

            {post.author && (
              <motion.p className="text-black/45 text-sm font-jakarta mb-10 pb-8 border-b border-gray-100" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
                By {post.author}
              </motion.p>
            )}

            <motion.div
              className="
                prose prose-base max-w-none
                prose-headings:font-jakarta prose-headings:font-bold prose-headings:text-black
                prose-p:text-black/75 prose-p:font-jakarta prose-p:leading-relaxed
                prose-li:font-jakarta prose-li:text-black/75
                prose-strong:text-black
                prose-a:text-thelix-orange prose-a:no-underline hover:prose-a:underline
                prose-img:rounded-xl
                [&_.doc-attachment]:my-6 [&_.doc-attachment]:rounded-xl [&_.doc-attachment]:overflow-hidden [&_.doc-attachment]:border [&_.doc-attachment]:border-gray-200
                [&_.doc-attachment-header]:flex [&_.doc-attachment-header]:items-center [&_.doc-attachment-header]:justify-between [&_.doc-attachment-header]:px-4 [&_.doc-attachment-header]:py-3 [&_.doc-attachment-header]:bg-gray-50 [&_.doc-attachment-header]:border-b [&_.doc-attachment-header]:border-gray-200
                [&_.doc-attachment-name]:text-sm [&_.doc-attachment-name]:font-medium [&_.doc-attachment-name]:font-jakarta [&_.doc-attachment-name]:text-black
                [&_.doc-attachment-dl]:text-xs [&_.doc-attachment-dl]:font-medium [&_.doc-attachment-dl]:font-jakarta [&_.doc-attachment-dl]:text-thelix-orange [&_.doc-attachment-dl]:no-underline
                [&_.doc-attachment-iframe]:w-full [&_.doc-attachment-iframe]:h-[500px] [&_.doc-attachment-iframe]:border-0
                [&_.doc-attachment-card]:flex [&_.doc-attachment-card]:items-center [&_.doc-attachment-card]:justify-between [&_.doc-attachment-card]:px-4 [&_.doc-attachment-card]:py-4 [&_.doc-attachment-card]:bg-gray-50
              "
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.25 }}
              dangerouslySetInnerHTML={{ __html: processedContent }}
            />

            {/* Share bar */}
            <ShareBar title={post.title} />
          </div>

          {/* Suggested posts */}
          <div className="mt-10">
            <SuggestedPosts currentSlug={post.slug} />
          </div>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
}
