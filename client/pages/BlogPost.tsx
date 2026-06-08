import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/ui/motion";

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
          <Link to="/blog" className="text-thelix-orange text-sm font-jakarta hover:underline">
            ← Back to Blog
          </Link>
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
          <div className="max-w-[780px] mx-auto px-6 pt-10 lg:pt-14 pb-10 lg:pb-14">
            {/* Back link */}
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-black/40 hover:text-black font-jakarta transition-colors mb-8"
            >
              <ChevronLeft size={16} />
              Back to Blog
            </Link>

            {/* Meta */}
            <motion.div
              className="flex items-center gap-3 flex-wrap mb-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              {post.category && (
                <span className="text-xs font-medium font-jakarta text-thelix-orange bg-orange-50 border border-orange-200 px-2.5 py-0.5 rounded-full">
                  {post.category}
                </span>
              )}
              <time className="text-black/40 text-sm font-jakarta">{post.date}</time>
            </motion.div>

            {/* Title */}
            <motion.h1
              className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-black font-jakarta leading-normal tracking-tight mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.08 }}
            >
              {post.title}
            </motion.h1>

            {post.author && (
              <motion.p
                className="text-black/45 text-sm font-jakarta mb-10 pb-8 border-b border-gray-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.18 }}
              >
                By {post.author}
              </motion.p>
            )}

            {/* Cover image — inside content column, below meta */}
            {post.cover_image && (
              <motion.div
                className="w-full rounded-2xl overflow-hidden mb-10"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.2 }}
              >
                <img
                  src={post.cover_image}
                  alt={post.title}
                  className="w-full object-cover"
                  style={{ aspectRatio: "16 / 9" }}
                />
              </motion.div>
            )}

            {/* Content */}
            <motion.div
              className="prose prose-base prose-headings:font-jakarta prose-headings:font-bold prose-headings:text-black prose-p:text-black/75 prose-p:font-jakarta prose-p:leading-relaxed prose-li:font-jakarta prose-li:text-black/75 prose-strong:text-black prose-a:text-thelix-orange prose-a:no-underline hover:prose-a:underline max-w-none"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25 }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
}
