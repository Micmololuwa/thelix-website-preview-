import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FadeUp, FadeIn, StaggerGrid, StaggerItem, PageTransition } from "@/components/ui/motion";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  cover_image: string;
  author: string;
  category: string;
  date: string;
}

// ---- Hero ----
const BlogHero = () => (
  <section
    style={{
      background:
        "linear-gradient(180deg, rgba(196,223,232,1) 0%, rgba(246,246,245,1) 45%, rgba(242,209,192,1) 100%)",
    }}
  >
    <div className="max-w-[1440px] mx-auto px-6 lg:px-[100px] pt-16 pb-20 text-center flex flex-col items-center">
      <motion.h1
        className="text-4xl sm:text-5xl lg:text-[65px] font-bold text-black font-jakarta leading-tight mb-4"
        initial={{ opacity: 0, y: 36 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        Insights &amp; Stories from<br /> Thelix Holdings
      </motion.h1>
      <motion.p
        className="text-black/80 text-base leading-[25px] font-jakarta max-w-[620px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
      >
        Perspectives, updates, and ideas from the Thelix team — on technology, leadership,
        innovation, and the work we do every day.
      </motion.p>
    </div>
  </section>
);

// ---- Featured Post ----
const FeaturedPost = ({ post }: { post: BlogPost }) => (
  <section className="bg-white py-10 lg:py-14">
    <div className="max-w-[1440px] mx-auto px-6 lg:px-[100px]">
      <FadeIn>
        <Link
          to={`/blog/${post.slug}`}
          className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch group"
        >
          <div className="lg:flex-[1.4] flex-shrink-0">
            {post.cover_image ? (
              <img
                src={post.cover_image}
                alt={post.title}
                className="w-full h-[280px] sm:h-[380px] lg:h-full object-cover rounded-2xl group-hover:opacity-95 transition-opacity"
              />
            ) : (
              <div className="w-full h-[280px] sm:h-[380px] lg:h-full bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl" />
            )}
          </div>
          <div className="lg:flex-1 bg-[#f6f5f5] rounded-2xl p-6 lg:p-10 flex flex-col gap-5 justify-center">
            <div className="flex items-center gap-3 flex-wrap">
              {post.category && (
                <span className="text-xs font-medium font-jakarta text-thelix-orange bg-orange-50 border border-orange-200 px-2.5 py-0.5 rounded-full">
                  {post.category}
                </span>
              )}
              <time className="text-black/40 text-sm font-jakarta">{post.date}</time>
            </div>
            <h2 className="text-2xl sm:text-[28px] font-bold text-black font-jakarta tracking-tight leading-snug group-hover:text-thelix-orange transition-colors">
              {post.title}
            </h2>
            {post.excerpt && (
              <p className="text-black/60 text-base font-jakarta leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>
            )}
            <div className="flex items-center gap-3 mt-auto pt-2">
              {post.author && (
                <span className="text-black/50 text-sm font-jakarta">By {post.author}</span>
              )}
              <span className="text-thelix-orange text-sm font-medium font-jakarta ml-auto">
                Read article →
              </span>
            </div>
          </div>
        </Link>
      </FadeIn>
    </div>
  </section>
);

// ---- Post Card ----
const PostCard = ({ post }: { post: BlogPost }) => (
  <StaggerItem>
    <Link
      to={`/blog/${post.slug}`}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow h-full"
    >
      {post.cover_image ? (
        <img
          src={post.cover_image}
          alt={post.title}
          className="w-full h-48 object-cover group-hover:opacity-95 transition-opacity"
        />
      ) : (
        <div className="w-full h-48 bg-gradient-to-br from-orange-100 to-orange-50" />
      )}
      <div className="flex flex-col gap-3 p-5 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          {post.category && (
            <span className="text-xs font-medium font-jakarta text-thelix-orange bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-full">
              {post.category}
            </span>
          )}
          <time className="text-black/35 text-xs font-jakarta">{post.date}</time>
        </div>
        <h3 className="text-base font-bold text-black font-jakarta leading-snug group-hover:text-thelix-orange transition-colors line-clamp-2">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="text-black/55 text-sm font-jakarta leading-relaxed line-clamp-2 flex-1">
            {post.excerpt}
          </p>
        )}
        {post.author && (
          <p className="text-black/40 text-xs font-jakarta mt-auto pt-2">By {post.author}</p>
        )}
      </div>
    </Link>
  </StaggerItem>
);

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blog")
      .then((r) => r.json())
      .then((data) => {
        setPosts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const [featured, ...rest] = posts;

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-1">
          <BlogHero />

          {loading && (
            <div className="flex items-center justify-center py-24">
              <div className="w-8 h-8 border-2 border-thelix-orange border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {!loading && posts.length === 0 && (
            <div className="max-w-[1440px] mx-auto px-6 lg:px-[100px] py-24 text-center">
              <p className="text-black/40 font-jakarta text-base">No blog posts yet. Check back soon.</p>
            </div>
          )}

          {!loading && featured && <FeaturedPost post={featured} />}

          {!loading && rest.length > 0 && (
            <section className="bg-[#f6f5f5] py-12 lg:py-16">
              <div className="max-w-[1440px] mx-auto px-6 lg:px-[100px]">
                <FadeUp>
                  <h2 className="text-2xl font-bold text-black font-jakarta mb-8">More Articles</h2>
                </FadeUp>
                <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </StaggerGrid>
              </div>
            </section>
          )}
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
}
